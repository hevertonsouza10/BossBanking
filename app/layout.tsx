import type { Metadata } from 'next';
import './globals.css';
import Preloader from '@/components/Preloader';

export const metadata: Metadata = {
  metadataBase: new URL('https://bossledger.example'),
  applicationName: 'Boss Ledger',
  title: {
    default: 'Boss Ledger | Fintech para empresas',
    template: '%s | Boss Ledger',
  },
  description:
    'A Boss Ledger e uma fintech com solucoes financeiras, cartoes, beneficios e inteligencia para empresas.',
  icons: {
    icon: '/brand/boss-ledger-logo.svg',
    shortcut: '/brand/boss-ledger-logo.svg',
    apple: '/brand/boss-ledger-logo.svg',
  },
  openGraph: {
    title: 'Boss Ledger | Fintech para empresas',
    description:
      'A Boss Ledger e uma fintech com solucoes financeiras, cartoes, beneficios e inteligencia para empresas.',
    images: [
      {
        url: '/brand/boss-ledger-logo.svg',
        alt: 'Logo da Boss Ledger',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Boss Ledger | Fintech para empresas',
    description:
      'A Boss Ledger e uma fintech com solucoes financeiras, cartoes, beneficios e inteligencia para empresas.',
    images: ['/brand/boss-ledger-logo.svg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
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
        {children}
      </body>
    </html>
  );
}
