'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const COOKIE_CONSENT_KEY = 'bossledger_cookie_consent';
const COOKIE_CONSENT_EVENT = 'bossledger:cookie-consent-changed';

type ConsentState = 'loading' | 'accepted' | 'essential-only' | 'unset';

export default function CookieConsentGate() {
  const [consentState, setConsentState] = useState<ConsentState>('loading');

  useEffect(() => {
    const storedValue = window.localStorage.getItem(COOKIE_CONSENT_KEY);

    if (storedValue === 'accepted' || storedValue === 'essential-only') {
      setConsentState(storedValue);
      return;
    }

    setConsentState('unset');
  }, []);

  useEffect(() => {
    function handleOpenPreferences() {
      window.localStorage.removeItem(COOKIE_CONSENT_KEY);
      setConsentState('unset');
    }

    window.addEventListener('bossledger:open-cookie-preferences', handleOpenPreferences);

    return () => {
      window.removeEventListener('bossledger:open-cookie-preferences', handleOpenPreferences);
    };
  }, []);

  function handleConsentUpdate(nextState: Exclude<ConsentState, 'loading' | 'unset'>) {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, nextState);
    setConsentState(nextState);
    window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: nextState }));
  }

  const shouldShowBanner = consentState === 'unset';

  return (
    <>
      {shouldShowBanner ? (
        <div className="fixed inset-x-3 bottom-3 z-[70] md:inset-x-6 md:bottom-6">
          <div className="soft-glass-panel relative mx-auto max-w-4xl overflow-hidden rounded-[1.75rem] border border-[rgba(230,194,122,0.14)] px-5 py-5 shadow-[0_28px_70px_rgba(0,0,0,0.34)] md:px-7 md:py-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,162,77,0.12),transparent_28%),linear-gradient(180deg,rgba(12,12,13,0.9),rgba(6,6,7,0.94))]" />
            <button
              type="button"
              aria-label="Fechar aviso de cookies"
              onClick={() => handleConsentUpdate('essential-only')}
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg leading-none text-white/72 transition hover:border-[rgba(230,194,122,0.3)] hover:text-white"
            >
              X
            </button>
            <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl space-y-3">
                <span className="inline-flex rounded-full border border-[rgba(230,194,122,0.18)] bg-[rgba(201,162,77,0.08)] px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[#e6c27a]">
                  Termos de cookies
                </span>
                <div className="space-y-2">
                  <p
                    className="text-xl font-semibold tracking-[-0.04em] text-[#f7f3ea] md:text-2xl"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Este site usa cookies para operação, segurança e atendimento.
                  </p>
                  <p className="max-w-xl text-sm leading-7 text-white/68 md:text-[0.96rem]">
                    Ao aceitar, podemos ativar recursos adicionais de navegação e segurança. Se preferir, você pode
                    consultar primeiro todas as políticas e documentos institucionais.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:max-w-sm sm:items-stretch">
                <Link
                  href="/compliance"
                  className="lux-button lux-button-dark min-h-[3rem] px-5 py-3 text-[0.62rem] tracking-[0.18em]"
                >
                  Ver todas as políticas
                </Link>
                <button
                  type="button"
                  onClick={() => handleConsentUpdate('accepted')}
                  className="lux-button lux-button-gold min-h-[3rem] px-5 py-3 text-[0.62rem] tracking-[0.2em]"
                >
                  Estou ciente
                </button>
                <p className="max-w-sm text-xs leading-5 text-white/60">
                  Ao continuar navegando em nosso site poderão ser ativados recursos adicionais de operação e segurança.
                  Em caso de dúvidas, consulte nossas políticas e documentos institucionais a qualquer momento.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
