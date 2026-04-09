import type { Metadata } from 'next';
import { DM_Sans, Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Preloader from '@/components/Preloader';
import CookieConsentGate from '@/components/site/layout/CookieConsentGate';

const GTM_ID = 'GTM-TKLBZQH9';

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
  metadataBase: new URL(process.env.SITE_URL || 'https://www.bossbanking.com.br'),
  applicationName: 'Boss Ledger',
  title: {
    default: 'Boss Ledger | Agência para empresas',
    template: '%s | Boss Ledger',
  },
  description:
    'A Boss Ledger é uma agência com soluções financeiras, cartões, benefícios e inteligência para empresas.',
  icons: {
    icon: '/brand/logo%20simples.svg',
    shortcut: '/brand/logo%20simples.svg',
    apple: '/brand/logo%20simples.svg',
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
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>
      <body className="bg-obsidian text-white antialiased">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
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
        <CookieConsentGate />
        {children}
      </body>
    </html>
  );
}
