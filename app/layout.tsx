import type { Metadata } from 'next';
import { DM_Sans, Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Preloader from '@/components/Preloader';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bossledger.example'),
  applicationName: 'Boss Ledger',
  title: {
    default: 'Boss Ledger | Agência para empresas',
    template: '%s | Boss Ledger',
  },
  description:
    'A Boss Ledger é uma agência com soluções financeiras, cartões, benefícios e inteligência para empresas.',
  icons: {
    icon: '/brand/boss-ledger-logo.svg',
    shortcut: '/brand/boss-ledger-logo.svg',
    apple: '/brand/boss-ledger-logo.svg',
  },
  openGraph: {
    title: 'Boss Ledger | Agência para empresas',
    description:
      'A Boss Ledger é uma agência com soluções financeiras, cartões, benefícios e inteligência para empresas.',
    images: [
      {
        url: '/brand/boss-ledger-logo.svg',
        alt: 'Logo da Boss Ledger',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Boss Ledger | Agência para empresas',
    description:
      'A Boss Ledger é uma agência com soluções financeiras, cartões, benefícios e inteligência para empresas.',
    images: ['/brand/boss-ledger-logo.svg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${dmSans.variable}`}>
      <body className="bg-obsidian text-white antialiased">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute h-0 w-0 opacity-0"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="glass-distortion" x="0" y="0" width="100%" height="100%" filterUnits="objectBoundingBox">
            <feTurbulence type="fractalNoise" baseFrequency="0.003 0.006" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="24" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
        <Preloader />
        <Script id="chatbotmaker-webchat" strategy="afterInteractive">
          {`
            window.cbAsyncInit = function () {
              CBM.ChatbotId = "cb126088892";
              CBM.StartWebChat().then(function (webChat) {
              }).catch(function (reason) {
              });
            };
            (function (d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) { return; }
              js = d.createElement(s); js.id = id;
              js.src = "https://webchat.chatbotmaker.io/cbm-jssdk.js";
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'cbm-jssdk'));
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
