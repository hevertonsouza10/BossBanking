'use client';

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import ChatbotMaker from '@/components/site/integrations/ChatbotMaker';

const COOKIE_CONSENT_KEY = 'bossledger_cookie_consent';

type ConsentState = 'loading' | 'accepted' | 'essential-only' | 'unset';

const CHAT_POPUP_DESKTOP_STYLES = {
  position: 'fixed',
  right: 'clamp(0.75rem, 2.6vw, 1.75rem)',
  left: 'auto',
  top: 'auto',
  bottom: 'calc(clamp(1rem, 2.6vw, 1.75rem) + 5.2rem)',
  width: 'min(22rem, calc(100vw - 1.5rem))',
  maxWidth: 'calc(100vw - 1.5rem)',
  height: 'min(35rem, calc(100vh - 8rem))',
  borderRadius: '1.45rem',
  overflow: 'hidden',
} satisfies Partial<CSSStyleDeclaration>;

const CHAT_POPUP_MOBILE_STYLES = {
  position: 'fixed',
  right: '0.75rem',
  left: 'auto',
  top: 'auto',
  bottom: '5.8rem',
  width: 'min(21.25rem, calc(100vw - 1.5rem))',
  maxWidth: 'calc(100vw - 1.5rem)',
  height: 'min(31.5rem, calc(100vh - 7rem))',
  borderRadius: '1.35rem',
  overflow: 'hidden',
} satisfies Partial<CSSStyleDeclaration>;

const CHAT_LAUNCHER_STYLES = {
  display: 'block',
  position: 'fixed',
  right: 'clamp(1rem, 2.6vw, 1.75rem)',
  bottom: 'clamp(1rem, 2.6vw, 1.75rem)',
  zIndex: '50000',
} satisfies Partial<CSSStyleDeclaration>;

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
  }

  const shouldLoadChatbot = consentState === 'accepted';
  const shouldShowBanner = consentState === 'unset';
  const shouldShowChatActivator = consentState === 'essential-only';

  useEffect(() => {
    if (!shouldLoadChatbot) {
      return;
    }

    const mobileQuery = window.matchMedia('(max-width: 640px)');

    function applyCompactChatStyles() {
      const popup = document.querySelector<HTMLElement>('.__talkjs_popup');
      const launcher = document.querySelector<HTMLElement>('#__talkjs_launcher');
      const iframe = document.querySelector<HTMLIFrameElement>(
        'iframe[name="____talkjs__chat__ui_internal"]',
      );

      if (popup) {
        Object.assign(popup.style, mobileQuery.matches ? CHAT_POPUP_MOBILE_STYLES : CHAT_POPUP_DESKTOP_STYLES);
      }

      if (launcher) {
        Object.assign(launcher.style, CHAT_LAUNCHER_STYLES);
      }

      if (iframe) {
        Object.assign(iframe.style, {
          width: '100%',
          height: '100%',
          border: '0',
          borderRadius: 'inherit',
        });
      }
    }

    applyCompactChatStyles();

    const observer = new MutationObserver(applyCompactChatStyles);
    observer.observe(document.body, { childList: true, subtree: true });
    mobileQuery.addEventListener('change', applyCompactChatStyles);
    window.addEventListener('resize', applyCompactChatStyles);

    return () => {
      observer.disconnect();
      mobileQuery.removeEventListener('change', applyCompactChatStyles);
      window.removeEventListener('resize', applyCompactChatStyles);
    };
  }, [shouldLoadChatbot]);

  return (
    <>
      {shouldLoadChatbot ? (
        <ChatbotMaker />
      ) : null}

      {shouldShowChatActivator ? (
        <button
          type="button"
          aria-label="Ativar atendimento por chat"
          onClick={() => handleConsentUpdate('accepted')}
          className="fixed bottom-4 right-4 z-[60] inline-flex min-h-[3.6rem] items-center gap-3 rounded-[1.2rem] border border-[rgba(255,235,186,0.2)] bg-[#d2a14b] px-4 py-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#0b0b0c] shadow-[0_18px_42px_rgba(0,0,0,0.32),0_12px_28px_rgba(201,162,77,0.22)] transition hover:-translate-y-0.5 hover:bg-[#ddb25f] focus:outline-none focus:ring-2 focus:ring-[#e6c27a] focus:ring-offset-2 focus:ring-offset-[#050505] md:bottom-7 md:right-7"
        >
          <MessageCircle aria-hidden="true" className="h-5 w-5 shrink-0" strokeWidth={2.3} />
          <span>Ativar chat</span>
        </button>
      ) : null}

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
                    Ao aceitar, podemos ativar recursos adicionais, como o atendimento por chat. Se preferir, você pode
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
                  Ao continuar navegando em nosso site poderão ser ativados recursos adicionais como atendimento por
                  chat. Em caso de dúvidas, consulte nossas políticas e documentos institucionais a qualquer momento.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
