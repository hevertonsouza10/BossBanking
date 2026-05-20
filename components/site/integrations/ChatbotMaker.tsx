'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    CBM?: {
      ChatbotId: string;
      StartWebChat: () => Promise<unknown>;
    };
    cbAsyncInit?: () => void;
  }
}

export default function ChatbotMaker() {
  useEffect(() => {
    const startChat = () => {
      if (!window.CBM) {
        return;
      }

      window.CBM.ChatbotId = 'cb126088892';
      window.CBM.StartWebChat().catch((reason) => {
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
      if (window.CBM) {
        startChat();
      } else {
        existingScript.addEventListener('load', startChat, { once: true });
        window.setTimeout(() => {
          if (!window.CBM && existingScript.isConnected) {
            existingScript.remove();
            injectScript();
          }
        }, 3000);
      }
      return;
    }

    injectScript();
  }, []);

  return null;
}
