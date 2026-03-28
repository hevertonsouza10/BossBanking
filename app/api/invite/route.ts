import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const MIN_FILL_MS = 2000;
const FORMSUBMIT_URL = 'https://formsubmit.co/ajax';

type InvitePayload = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  website: string;
  startedAt: number;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

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

function getClientAddress(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const userAgent = request.headers.get('user-agent') ?? 'unknown';
  const ip = forwardedFor?.split(',')[0]?.trim() || realIp || 'unknown';

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
    return { ok: false as const, message: 'Solicitação inválida.' };
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
  };

  if (data.website) {
    return { ok: true as const, data, botLike: true };
  }

  if (!data.fullName || data.fullName.length < 3 || data.fullName.length > 120) {
    return { ok: false as const, message: 'Informe um nome válido.' };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.email.length > 160) {
    return { ok: false as const, message: 'Informe um e-mail válido.' };
  }

  if (!data.phone || data.phone.length < 8 || data.phone.length > 30) {
    return { ok: false as const, message: 'Informe um telefone válido.' };
  }

  if (!data.company || data.company.length < 2 || data.company.length > 120) {
    return { ok: false as const, message: 'Informe o nome da empresa ou negócio.' };
  }

  if (!data.message || data.message.length < 10 || data.message.length > 2000) {
    return { ok: false as const, message: 'Escreva uma mensagem com pelo menos 10 caracteres.' };
  }

  if (!data.startedAt || Date.now() - data.startedAt < MIN_FILL_MS) {
    return { ok: true as const, data, botLike: true };
  }

  return { ok: true as const, data, botLike: false };
}

function getFormSubmitTarget() {
  return process.env.FORMSUBMIT_TARGET?.trim() || 'contato@bossbanking.com.br';
}

function getFormSubject() {
  return process.env.INVITE_SUBJECT?.trim() || 'Solicitação de convite - Boss Ledger';
}

function getBlacklist() {
  return (
    process.env.FORMSUBMIT_BLACKLIST?.trim() ||
    'viagra,casino,adult content,porn,crypto pump,seo package,backlink service'
  );
}

async function forwardToFormSubmit(data: InvitePayload) {
  const payload = new FormData();

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

  return fetch(`${FORMSUBMIT_URL}/${getFormSubmitTarget()}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: payload,
    cache: 'no-store',
  });
}

export async function POST(request: NextRequest) {
  if (!isAllowedOrigin(request)) {
    return json({ message: 'Origem não autorizada.' }, { status: 403 });
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
    return json({ message: 'Não foi possível processar a solicitação.' }, { status: 400 });
  }

  const validation = validateInvitePayload(payload);

  if (!validation.ok) {
    return json({ message: validation.message }, { status: 400 });
  }

  if (validation.botLike) {
    return json({ message: 'Solicitação recebida com sucesso.' });
  }

  try {
    const response = await forwardToFormSubmit(validation.data);

    if (!response.ok) {
      throw new Error(`FormSubmit responded with status ${response.status}`);
    }

    return json({ message: 'Solicitação recebida com sucesso.' });
  } catch (error) {
    console.error('Invite form forward failed', error);
    return json({ message: 'Não foi possível enviar agora. Tente novamente em instantes.' }, { status: 502 });
  }
}
