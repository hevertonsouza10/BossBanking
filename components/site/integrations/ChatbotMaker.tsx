'use client';

import { useEffect } from 'react';

declare global {
  var CBM:
    | {
        ChatbotId: string;
        StartWebChat: () => Promise<unknown>;
      }
    | undefined;

  interface Window {
    cbAsyncInit?: () => void;
  }
}

export default function ChatbotMaker() {
  useEffect(() => {
    let hasStarted = false;

    const startChat = () => {
      if (typeof CBM === 'undefined' || hasStarted) {
        return;
      }

      hasStarted = true;
      CBM.ChatbotId = 'cb126088892';
      CBM.StartWebChat().catch((reason) => {
        hasStarted = false;
        console.warn('[Boss Ledger] ChatbotMaker failed to start', reason);
      });
    };

    const injectScript = () => {
      const firstScript = document.getElementsByTagName('script')[0];
      const script = document.createElement('script');

      script.id = 'cbm-jssdk';
      script.src = 'https://webchat.chatbotmaker.io/cbm-jssdk.js';
      script.async = true;
      script.addEventListener('load', startChat, { once: true });
      script.addEventListener(
        'error',
        () => {
          console.warn('[Boss Ledger] ChatbotMaker script failed to load');
        },
        { once: true },
      );

      if (firstScript?.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      } else {
        document.head.appendChild(script);
      }
    };

    window.cbAsyncInit = startChat;

    const existingScript = document.getElementById('cbm-jssdk') as HTMLScriptElement | null;
    if (existingScript) {
      if (typeof CBM !== 'undefined') {
        startChat();
      } else {
        existingScript.addEventListener('load', startChat, { once: true });
      }
      return;
    }

    injectScript();
  }, []);

  return null;
}
