import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Preloader from '@/components/Preloader';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bossledger.example'),
  title: {
    default: 'Boss Ledger | Private Banking Digital',
    template: '%s | Boss Ledger',
  },
  description:
    'Plataforma digital premium para banking, cartões, benefícios e inteligência financeira.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} bg-obsidian text-white antialiased`}
      >
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
