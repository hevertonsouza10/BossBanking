import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const MIN_FILL_MS = 2000;
const FORMSUBMIT_URL = 'https://formsubmit.co/ajax';
const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';
const RESEND_API_URL = 'https://api.resend.com/emails';

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

type ResendErrorResponse = {
  message?: string;
  name?: string;
};

type FormSubmitParsedResponse = {
  json: FormSubmitResponse | null;
  text: string;
};

class InviteDeliveryError extends Error {
  readonly status: number;

  constructor(message: string, status = 502) {
    super(message);
    this.name = 'InviteDeliveryError';
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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
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

function getSiteUrl(request: NextRequest) {
  const configuredUrl =
    process.env.SITE_URL?.trim() || process.env.NEXT_PUBLIC_SITE_URL?.trim() || getRequestOrigin(request);

  return configuredUrl.replace(/\/+$/, '');
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

function getInviteRecipient() {
  return process.env.INVITE_RECIPIENT_EMAIL?.trim() || getFormSubmitTarget();
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

function getResendApiKey() {
  return process.env.RESEND_API_KEY?.trim() ?? '';
}

function getResendFromEmail() {
  return process.env.RESEND_FROM_EMAIL?.trim() || 'Boss Ledger <onboarding@resend.dev>';
}

function buildInviteEmailHtml(data: InvitePayload, request: NextRequest) {
  const origin = getSiteUrl(request) || 'Origem nao informada';
  const submittedAt = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

  return `
    <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#111827">
      <h1 style="margin-bottom:16px;">Nova solicitacao de convite</h1>
      <p style="margin:0 0 16px;">Um novo lead enviou o formulario do site.</p>
      <table style="border-collapse:collapse;width:100%;max-width:720px;">
        <tbody>
          <tr><td style="padding:8px;border:1px solid #e5e7eb;"><strong>Nome</strong></td><td style="padding:8px;border:1px solid #e5e7eb;">${escapeHtml(data.fullName)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #e5e7eb;"><strong>E-mail</strong></td><td style="padding:8px;border:1px solid #e5e7eb;">${escapeHtml(data.email)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #e5e7eb;"><strong>Telefone</strong></td><td style="padding:8px;border:1px solid #e5e7eb;">${escapeHtml(data.phone)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #e5e7eb;"><strong>Empresa</strong></td><td style="padding:8px;border:1px solid #e5e7eb;">${escapeHtml(data.company)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #e5e7eb;"><strong>Origem</strong></td><td style="padding:8px;border:1px solid #e5e7eb;">${escapeHtml(origin)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #e5e7eb;"><strong>Enviado em</strong></td><td style="padding:8px;border:1px solid #e5e7eb;">${escapeHtml(submittedAt)}</td></tr>
        </tbody>
      </table>
      <h2 style="margin:24px 0 8px;">Mensagem</h2>
      <p style="white-space:pre-wrap;border:1px solid #e5e7eb;padding:12px;border-radius:8px;">${escapeHtml(data.message)}</p>
    </div>
  `.trim();
}

function buildInviteEmailText(data: InvitePayload, request: NextRequest) {
  const origin = getSiteUrl(request) || 'Origem nao informada';
  const submittedAt = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

  return [
    'Nova solicitacao de convite',
    '',
    `Nome: ${data.fullName}`,
    `E-mail: ${data.email}`,
    `Telefone: ${data.phone}`,
    `Empresa: ${data.company}`,
    `Origem: ${origin}`,
    `Enviado em: ${submittedAt}`,
    '',
    'Mensagem:',
    data.message,
  ].join('\n');
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

async function sendViaResend(request: NextRequest, data: InvitePayload) {
  const apiKey = getResendApiKey();

  if (!apiKey) {
    throw new InviteDeliveryError('RESEND_API_KEY nao configurada.', 503);
  }

  const response = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': randomUUID(),
    },
    body: JSON.stringify({
      from: getResendFromEmail(),
      to: [getInviteRecipient()],
      reply_to: data.email,
      subject: getFormSubject(),
      html: buildInviteEmailHtml(data, request),
      text: buildInviteEmailText(data, request),
    }),
    cache: 'no-store',
  });

  if (response.ok) {
    return;
  }

  const result = (await response.json().catch(() => null)) as ResendErrorResponse | null;

  throw new InviteDeliveryError(result?.message || `Resend responded with status ${response.status}`, response.status);
}

async function submitFormSubmit(payload: URLSearchParams, target: string, headers: Record<string, string>) {
  const response = await fetch(`${FORMSUBMIT_URL}/${target}`, {
    method: 'POST',
    headers,
    body: payload,
    cache: 'no-store',
  });

  const rawText = await response.text();
  let result: FormSubmitResponse | null = null;

  if (rawText) {
    try {
      result = JSON.parse(rawText) as FormSubmitResponse;
    } catch {
      result = null;
    }
  }

  return {
    response,
    parsed: {
      json: result,
      text: rawText,
    } satisfies FormSubmitParsedResponse,
  };
}

async function forwardToFormSubmit(request: NextRequest, data: InvitePayload) {
  const payload = new URLSearchParams();
  const origin = getRequestOrigin(request);
  const siteUrl = getSiteUrl(request);

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
  payload.append('_url', `${siteUrl}/convites`);

  const baseHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  let { response, parsed } = await submitFormSubmit(payload, getInviteRecipient(), {
    ...baseHeaders,
    ...(origin
      ? {
          Origin: origin,
          Referer: `${origin}/convites`,
        }
      : {}),
  });

  if (response.status === 403 && origin) {
    ({ response, parsed } = await submitFormSubmit(payload, getInviteRecipient(), baseHeaders));
  }

  if (!response.ok) {
    const activationMessage = parsed.text.match(/This form needs Activation[^"]*/i)?.[0];

    throw new InviteDeliveryError(
      parsed.json?.message ||
        activationMessage ||
        `FormSubmit responded with status ${response.status}`,
      response.status,
    );
  }

  if (String(parsed.json?.success).toLowerCase() === 'false') {
    throw new InviteDeliveryError(parsed.json?.message || 'FormSubmit rejected the submission.', 400);
  }

  return parsed.json;
}

async function deliverInvite(request: NextRequest, data: InvitePayload) {
  if (getResendApiKey()) {
    await sendViaResend(request, data);
    return;
  }

  await forwardToFormSubmit(request, data);
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
    await deliverInvite(request, validation.data);

    return json({ message: 'Solicitacao recebida com sucesso.' });
  } catch (error) {
    console.error('Invite form delivery failed', error);

    if (error instanceof InviteDeliveryError) {
      if (error.message.includes('RESEND_API_KEY')) {
        return json({ message: 'O envio de e-mail ainda nao foi configurado neste ambiente.' }, { status: 503 });
      }

      if (error.message.includes('needs Activation')) {
        return json(
          { message: 'O formulario ainda precisa ser ativado no FormSubmit. Verifique o e-mail contato@bossbanking.com.br e clique no link de ativacao.' },
          { status: 400 },
        );
      }

      if (error.status === 403) {
        return json(
          {
            message:
              'O FormSubmit recusou o envio. Confira se FORMSUBMIT_TARGET esta correto e se o formulario desse e-mail ja foi ativado no link enviado pelo FormSubmit.',
          },
          { status: 502 },
        );
      }

      return json({ message: error.message }, { status: error.status });
    }

    return json({ message: 'Nao foi possivel enviar agora. Tente novamente em instantes.' }, { status: 502 });
  }
}
