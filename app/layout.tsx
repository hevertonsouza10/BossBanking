import type { Metadata } from 'next';
import { DM_Sans, Inter } from 'next/font/google';
import './globals.css';
import Preloader from '@/components/Preloader';
import ChatbotMaker from '@/components/site/integrations/ChatbotMaker';
import GoogleTagManager from '@/components/site/integrations/GoogleTagManager';
import CookieConsentGate from '@/components/site/layout/CookieConsentGate';

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
        <GoogleTagManager />
        <ChatbotMaker />
        <CookieConsentGate />
        {children}
      </body>
    </html>
  );
}
