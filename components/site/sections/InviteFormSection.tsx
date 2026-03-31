'use client';

import Script from 'next/script';
import { type FormEvent, useEffect, useRef, useState } from 'react';
import Container from '@/components/site/ui/Container';
import Reveal from '@/components/site/ui/Reveal';
import type { InviteFormSection as InviteFormSectionType } from '@/lib/cms/types';
import { keepBossLedgerTogether } from '@/lib/utils';

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  website: string;
};

type FormSubmitResponse = {
  success?: boolean | string;
  message?: string;
};

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      render: (
        container: HTMLElement,
        parameters: {
          sitekey: string;
          theme?: 'light' | 'dark';
          callback?: (token: string) => void;
          'expired-callback'?: () => void;
          'error-callback'?: () => void;
        },
      ) => number;
      reset: (widgetId?: number) => void;
    };
  }
}

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim() ?? '';
const FORMSUBMIT_TARGET =
  process.env.NEXT_PUBLIC_FORMSUBMIT_TARGET?.trim() ?? 'contato@bossbanking.com.br';

const initialFormState: FormState = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  message: '',
  website: '',
};

export default function InviteFormSection({ section }: { section: InviteFormSectionType }) {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [startedAt] = useState(() => Date.now());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isRecaptchaLoaded, setIsRecaptchaLoaded] = useState(false);
  const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const recaptchaContainerRef = useRef<HTMLDivElement | null>(null);
  const recaptchaWidgetIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY || !isRecaptchaLoaded || !window.grecaptcha || !recaptchaContainerRef.current) {
      return;
    }

    if (recaptchaWidgetIdRef.current !== null) {
      setIsRecaptchaReady(true);
      return;
    }

    window.grecaptcha.ready(() => {
      if (!recaptchaContainerRef.current || recaptchaWidgetIdRef.current !== null) {
        return;
      }

      const widgetId = window.grecaptcha?.render(recaptchaContainerRef.current, {
        sitekey: RECAPTCHA_SITE_KEY,
        theme: 'dark',
        callback: (token) => {
          setRecaptchaToken(token);
          setSubmitError(null);
        },
        'expired-callback': () => {
          setRecaptchaToken('');
        },
        'error-callback': () => {
          setIsRecaptchaReady(false);
          setRecaptchaToken('');
          setSubmitError('Nao foi possivel carregar a verificacao de seguranca. Recarregue a pagina e tente novamente.');
        },
      });

      recaptchaWidgetIdRef.current = widgetId ?? null;
      setIsRecaptchaReady(true);
    });
  }, [isRecaptchaLoaded]);

  const resetRecaptcha = () => {
    setRecaptchaToken('');

    if (window.grecaptcha && recaptchaWidgetIdRef.current !== null) {
      window.grecaptcha.reset(recaptchaWidgetIdRef.current);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!FORMSUBMIT_TARGET) {
      setSubmitError('O destino do formulario ainda nao foi configurado neste ambiente.');
      return;
    }

    if (!RECAPTCHA_SITE_KEY) {
      setSubmitError('O reCAPTCHA ainda nao foi configurado neste ambiente.');
      return;
    }

    if (!isRecaptchaReady) {
      setSubmitError('A verificacao de seguranca ainda esta carregando. Tente novamente em alguns segundos.');
      return;
    }

    if (!recaptchaToken) {
      setSubmitError('Confirme o reCAPTCHA antes de enviar sua solicitacao.');
      return;
    }

    setIsSubmitting(true);
    setIsSubmitted(false);
    setSubmitError(null);

    try {
      if (formState.website || Date.now() - startedAt < 2000) {
        setIsSubmitted(true);
        setFormState(initialFormState);
        return;
      }

      const payload = new FormData();

      payload.append('name', formState.fullName);
      payload.append('email', formState.email);
      payload.append('phone', formState.phone);
      payload.append('company', formState.company);
      payload.append('message', formState.message);
      payload.append('_subject', section.subject || 'Solicitacao de convite - Boss Ledger');
      payload.append('_template', 'table');
      payload.append('_replyto', formState.email);
      payload.append(
        '_blacklist',
        'viagra,casino,adult content,porn,crypto pump,seo package,backlink service',
      );
      payload.append('_captcha', 'false');
      payload.append(
        '_url',
        typeof window !== 'undefined' ? `${window.location.origin}/convites` : '/convites',
      );

      const response = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_TARGET}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: payload,
      });

      const result = (await response.json().catch(() => null)) as FormSubmitResponse | null;

      if (!response.ok || String(result?.success).toLowerCase() === 'false') {
        throw new Error(result?.message || `FormSubmit responded with status ${response.status}`);
      }

      setIsSubmitted(true);
      setFormState(initialFormState);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Nao foi possivel enviar agora. Tente novamente em instantes.');
    } finally {
      setIsSubmitting(false);
      resetRecaptcha();
    }
  };

  return (
    <section className="relative py-24 md:py-32" data-scroll-scene="true">
      {RECAPTCHA_SITE_KEY ? (
        <Script
          id="google-recaptcha"
          src="https://www.google.com/recaptcha/api.js?render=explicit"
          strategy="afterInteractive"
          onReady={() => setIsRecaptchaLoaded(true)}
          onError={() => {
            setIsRecaptchaLoaded(false);
            setIsRecaptchaReady(false);
            setSubmitError('Nao foi possivel carregar o script do reCAPTCHA. Recarregue a pagina e tente novamente.');
          }}
        />
      ) : null}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(221,178,95,0.08),transparent_22%),linear-gradient(180deg,rgba(7,7,7,0),rgba(5,5,5,0.68)_18%,rgba(5,5,5,0.92))]" />
      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-[0.84fr_1.16fr] lg:items-start">
          <Reveal className="space-y-6 lg:sticky lg:top-[140px]">
            <div className="inline-flex w-fit items-center gap-3 rounded-full border border-[#ddb25f]/15 bg-white/[0.03] px-4 py-2 text-[0.62rem] uppercase tracking-[0.28em] text-[#ddb25f]">
              <span className="h-2 w-2 rounded-full bg-[#ddb25f]" />
              {section.eyebrow ?? 'Pre-cadastro'}
            </div>

            <div className="space-y-5">
              <h2 className="max-w-xl font-[family:var(--font-sans)] text-[2.4rem] font-semibold leading-[0.96] tracking-[-0.06em] text-white md:text-[3.6rem]">
                {keepBossLedgerTogether(section.title)}
              </h2>
              {section.subtitle ? (
                <p className="text-[0.74rem] uppercase tracking-[0.34em] text-[#e1c58f]/90 md:text-[0.8rem]">
                  {keepBossLedgerTogether(section.subtitle)}
                </p>
              ) : null}
              <p className="max-w-xl text-[0.98rem] leading-8 text-white/64 md:text-[1.04rem]">
                {keepBossLedgerTogether(section.description)}
              </p>
            </div>

            <div className="soft-glass-pill relative inline-flex w-fit max-w-full items-center gap-3 rounded-full px-5 py-3 text-left">
              <span className="text-[0.58rem] uppercase tracking-[0.26em] text-white/42">Assunto fixo</span>
              <span className="text-[0.78rem] font-medium uppercase tracking-[0.18em] text-white/82">{section.subject}</span>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="cta-luxury-shell relative overflow-hidden rounded-[2rem] p-[1px]">
              <div className="cta-luxury-panel relative overflow-hidden rounded-[calc(2rem-1px)] px-5 py-6 md:px-8 md:py-8">
                <div className="pointer-events-none absolute inset-x-[10%] top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,236,196,0.74),transparent)]" />
                <div className="pointer-events-none absolute right-[8%] top-6 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(230,194,122,0.18),transparent_70%)] blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 left-[10%] h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_72%)] blur-3xl" />

                <form onSubmit={handleSubmit} className="relative z-10 space-y-5" noValidate>
                  <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden opacity-0" aria-hidden="true">
                    <label htmlFor="invite-website">Website</label>
                    <input
                      id="invite-website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formState.website}
                      onChange={(event) => setFormState((current) => ({ ...current, website: event.target.value }))}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field
                      label="Nome completo"
                      autoComplete="name"
                      value={formState.fullName}
                      onChange={(value) => setFormState((current) => ({ ...current, fullName: value }))}
                    />
                    <Field
                      label="E-mail"
                      type="email"
                      autoComplete="email"
                      value={formState.email}
                      onChange={(value) => setFormState((current) => ({ ...current, email: value }))}
                    />
                    <Field
                      label="Telefone / WhatsApp"
                      autoComplete="tel"
                      value={formState.phone}
                      onChange={(value) => setFormState((current) => ({ ...current, phone: value }))}
                    />
                    <Field
                      label="Empresa ou negocio"
                      autoComplete="organization"
                      value={formState.company}
                      onChange={(value) => setFormState((current) => ({ ...current, company: value }))}
                    />
                  </div>

                  <Field
                    label="Mensagem"
                    multiline
                    placeholder={section.messagePlaceholder}
                    value={formState.message}
                    onChange={(value) => setFormState((current) => ({ ...current, message: value }))}
                  />

                  <div className="space-y-3">
                    <div
                      ref={recaptchaContainerRef}
                      className="inline-flex min-h-[78px] max-w-full overflow-x-auto rounded-[1.15rem] border border-white/10 bg-white/[0.02] p-2"
                    />

                    {!RECAPTCHA_SITE_KEY ? (
                      <p className="text-sm leading-6 text-white/52">Configure `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` para habilitar a verificacao.</p>
                    ) : !isRecaptchaReady ? (
                      <p className="text-sm leading-6 text-white/52">Carregando verificacao de seguranca...</p>
                    ) : null}
                  </div>

                  <div className="flex flex-col gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="lux-button lux-button-gold min-h-[3.3rem] w-full justify-center px-7 text-[0.7rem] tracking-[0.22em] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:min-w-[17rem]"
                    >
                      {isSubmitting ? 'Enviando...' : section.buttonLabel}
                    </button>

                    {isSubmitted ? (
                      <p className="rounded-[1rem] border border-[#ddb25f]/16 bg-[#ddb25f]/[0.06] px-4 py-3 text-sm leading-6 text-white/82">
                        {section.successMessage}
                      </p>
                    ) : null}

                    {submitError ? (
                      <p className="rounded-[1rem] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-white/76">
                        {submitError}
                      </p>
                    ) : null}
                  </div>
                </form>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mx-auto mt-10 max-w-4xl">
          <p className="text-center text-[0.95rem] leading-8 text-white/56 md:text-[1rem]">
            {keepBossLedgerTogether(section.bottomText)}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  autoComplete,
  type = 'text',
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  type?: 'text' | 'email';
  multiline?: boolean;
}) {
  const baseClassName =
    'w-full rounded-[1.15rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015)),linear-gradient(180deg,rgba(19,19,21,0.9),rgba(8,8,10,0.92))] px-4 py-3.5 text-[0.96rem] leading-6 text-white outline-none transition duration-200 placeholder:text-white/28 focus:border-[#ddb25f]/34 focus:bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.018)),linear-gradient(180deg,rgba(21,21,24,0.94),rgba(10,10,12,0.96))]';

  return (
    <label className="block space-y-2">
      <span className="block text-[0.64rem] font-medium uppercase tracking-[0.24em] text-white/48">{label}</span>
      {multiline ? (
        <textarea
          required
          rows={6}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={(event) => onChange(event.target.value)}
          className={`${baseClassName} resize-none`}
        />
      ) : (
        <input
          required
          type={type}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={(event) => onChange(event.target.value)}
          className={baseClassName}
        />
      )}
    </label>
  );
}
