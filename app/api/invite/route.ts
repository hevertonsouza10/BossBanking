import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const MIN_FILL_MS = 2000;
const FORMSUBMIT_URL = 'https://formsubmit.co/ajax';
const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';

type InvitePayload = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  website: string;
  startedAt: number;
  recaptchaToken: string;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RecaptchaVerifyResponse = {
  success?: boolean;
  'error-codes'?: string[];
};

type FormSubmitResponse = {
  success?: boolean | string;
  message?: string;
};

class InviteFormForwardError extends Error {
  readonly status: number;

  constructor(message: string, status = 502) {
    super(message);
    this.name = 'InviteFormForwardError';
    this.status = status;
  }
}

declare global {
  var __inviteRateLimitStore: Map<string, RateLimitEntry> | undefined;
}

const inviteRateLimitStore = globalThis.__inviteRateLimitStore ?? new Map<string, RateLimitEntry>();

if (!globalThis.__inviteRateLimitStore) {
  globalThis.__inviteRateLimitStore = inviteRateLimitStore;
}

function json(body: Record<string, string>, init?: ResponseInit) {
  return NextResponse.json(body, {
    ...init,
    headers: {
      'Cache-Control': 'no-store',
      ...init?.headers,
    },
  });
}

function normalizeWhitespace(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

function normalizeMessage(value: string) {
  return value.replace(/\r\n/g, '\n').trim();
}

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');

  return forwardedFor?.split(',')[0]?.trim() || realIp || '';
}

function getRequestOrigin(request: NextRequest) {
  const origin = request.headers.get('origin');

  if (origin) {
    return origin;
  }

  const forwardedProto = request.headers.get('x-forwarded-proto');
  const forwardedHost = request.headers.get('x-forwarded-host');
  const host = forwardedHost ?? request.headers.get('host');

  if (!host) {
    return '';
  }

  const protocol = forwardedProto ?? 'https';

  return `${protocol}://${host}`;
}

function getClientAddress(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') ?? 'unknown';
  const ip = getClientIp(request) || 'unknown';

  return `${ip}:${userAgent.slice(0, 80)}`;
}

function isRateLimited(key: string) {
  const now = Date.now();
  const existing = inviteRateLimitStore.get(key);

  if (!existing || existing.resetAt <= now) {
    inviteRateLimitStore.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { limited: false, remainingMs: WINDOW_MS };
  }

  existing.count += 1;
  inviteRateLimitStore.set(key, existing);

  return {
    limited: existing.count > MAX_ATTEMPTS,
    remainingMs: Math.max(existing.resetAt - now, 0),
  };
}

function isAllowedOrigin(request: NextRequest) {
  const origin = request.headers.get('origin');
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host');

  if (!origin || !host) {
    return true;
  }

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function readString(value: unknown) {
  return typeof value === 'string' ? value : '';
}

function validateInvitePayload(payload: unknown) {
  if (!payload || typeof payload !== 'object') {
    return { ok: false as const, message: 'Solicitacao invalida.' };
  }

  const body = payload as Record<string, unknown>;

  const data: InvitePayload = {
    fullName: normalizeWhitespace(readString(body.fullName)),
    email: normalizeWhitespace(readString(body.email)).toLowerCase(),
    phone: normalizeWhitespace(readString(body.phone)),
    company: normalizeWhitespace(readString(body.company)),
    message: normalizeMessage(readString(body.message)),
    website: normalizeWhitespace(readString(body.website)),
    startedAt: Number(body.startedAt) || 0,
    recaptchaToken: normalizeWhitespace(readString(body.recaptchaToken)),
  };

  if (data.website) {
    return { ok: true as const, data, botLike: true };
  }

  if (!data.fullName || data.fullName.length < 3 || data.fullName.length > 120) {
    return { ok: false as const, message: 'Informe um nome valido.' };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.email.length > 160) {
    return { ok: false as const, message: 'Informe um e-mail valido.' };
  }

  if (!data.phone || data.phone.length < 8 || data.phone.length > 30) {
    return { ok: false as const, message: 'Informe um telefone valido.' };
  }

  if (!data.company || data.company.length < 2 || data.company.length > 120) {
    return { ok: false as const, message: 'Informe o nome da empresa ou negocio.' };
  }

  if (!data.message || data.message.length < 10 || data.message.length > 2000) {
    return { ok: false as const, message: 'Escreva uma mensagem com pelo menos 10 caracteres.' };
  }

  if (!data.startedAt || Date.now() - data.startedAt < MIN_FILL_MS) {
    return { ok: true as const, data, botLike: true };
  }

  if (!data.recaptchaToken) {
    return { ok: false as const, message: 'Confirme o reCAPTCHA antes de enviar sua solicitacao.' };
  }

  return { ok: true as const, data, botLike: false };
}

function getFormSubmitTarget() {
  return process.env.FORMSUBMIT_TARGET?.trim() || 'contato@bossbanking.com.br';
}

function getFormSubject() {
  return process.env.INVITE_SUBJECT?.trim() || 'Solicitacao de convite - Boss Ledger';
}

function getBlacklist() {
  return (
    process.env.FORMSUBMIT_BLACKLIST?.trim() ||
    'viagra,casino,adult content,porn,crypto pump,seo package,backlink service'
  );
}

function getRecaptchaSecret() {
  return process.env.RECAPTCHA_SECRET_KEY?.trim() ?? '';
}

async function verifyRecaptcha(request: NextRequest, token: string) {
  const secret = getRecaptchaSecret();

  if (!secret) {
    return { success: false as const, configured: false as const, errors: ['missing-input-secret'] };
  }

  const payload = new URLSearchParams({
    secret,
    response: token,
  });

  const remoteIp = getClientIp(request);

  if (remoteIp) {
    payload.append('remoteip', remoteIp);
  }

  const response = await fetch(RECAPTCHA_VERIFY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: payload,
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`reCAPTCHA verify responded with status ${response.status}`);
  }

  const result = (await response.json()) as RecaptchaVerifyResponse;

  return {
    success: Boolean(result.success),
    configured: true as const,
    errors: result['error-codes'] ?? [],
  };
}

async function forwardToFormSubmit(request: NextRequest, data: InvitePayload) {
  const payload = new FormData();
  const origin = getRequestOrigin(request);

  payload.append('name', data.fullName);
  payload.append('email', data.email);
  payload.append('phone', data.phone);
  payload.append('company', data.company);
  payload.append('message', data.message);
  payload.append('_subject', getFormSubject());
  payload.append('_template', 'table');
  payload.append('_replyto', data.email);
  payload.append('_blacklist', getBlacklist());
  payload.append('_captcha', 'false');
  payload.append('_url', `${origin}/convites`);

  const response = await fetch(`${FORMSUBMIT_URL}/${getFormSubmitTarget()}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      ...(origin
        ? {
            Origin: origin,
            Referer: `${origin}/convites`,
          }
        : {}),
    },
    body: payload,
    cache: 'no-store',
  });

  const result = (await response.json().catch(() => null)) as FormSubmitResponse | null;

  if (!response.ok) {
    throw new InviteFormForwardError(result?.message || `FormSubmit responded with status ${response.status}`, response.status);
  }

  if (String(result?.success).toLowerCase() === 'false') {
    throw new InviteFormForwardError(result?.message || 'FormSubmit rejected the submission.', 400);
  }

  return result;
}

export async function POST(request: NextRequest) {
  if (!isAllowedOrigin(request)) {
    return json({ message: 'Origem nao autorizada.' }, { status: 403 });
  }

  const rateLimit = isRateLimited(getClientAddress(request));

  if (rateLimit.limited) {
    return json(
      { message: 'Muitas tentativas em pouco tempo. Aguarde alguns minutos e tente novamente.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil(rateLimit.remainingMs / 1000)),
        },
      },
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return json({ message: 'Nao foi possivel processar a solicitacao.' }, { status: 400 });
  }

  const validation = validateInvitePayload(payload);

  if (!validation.ok) {
    return json({ message: validation.message }, { status: 400 });
  }

  if (validation.botLike) {
    return json({ message: 'Solicitacao recebida com sucesso.' });
  }

  try {
    const recaptcha = await verifyRecaptcha(request, validation.data.recaptchaToken);

    if (!recaptcha.configured) {
      return json({ message: 'A verificacao de seguranca nao esta configurada.' }, { status: 503 });
    }

    if (!recaptcha.success) {
      return json({ message: 'Nao foi possivel confirmar o reCAPTCHA. Tente novamente.' }, { status: 400 });
    }
  } catch (error) {
    console.error('Invite form reCAPTCHA verification failed', error);
    return json({ message: 'Nao foi possivel validar a verificacao de seguranca. Tente novamente em instantes.' }, { status: 502 });
  }

  try {
    await forwardToFormSubmit(request, validation.data);

    return json({ message: 'Solicitacao recebida com sucesso.' });
  } catch (error) {
    console.error('Invite form forward failed', error);

    if (error instanceof InviteFormForwardError) {
      if (error.message.includes('needs Activation')) {
        return json(
          { message: 'O formulario ainda precisa ser ativado no FormSubmit. Verifique o e-mail contato@bossbanking.com.br e clique no link de ativacao.' },
          { status: 400 },
        );
      }

      return json({ message: error.message }, { status: error.status });
    }

    return json({ message: 'Nao foi possivel enviar agora. Tente novamente em instantes.' }, { status: 502 });
  }
}
