import type { Metadata } from 'next';
import { Montserrat, Poppins } from 'next/font/google';
import './globals.css';
import Preloader from '@/components/Preloader';
// Configurando Montserrat (Fonte Principal - Textos, Menus, Corpo)
const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

// Configurando Poppins (Fonte Secundária - Títulos, Detalhes, Números)
const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Bos Bank | Private Banking & Tax Intelligence',
  description: 'O primeiro banco focado em inteligência tributária para alta renda.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  
    <html lang="pt-BR">
      <body>
        <Preloader />
        {children}
      </body>
    </html>
  );
}



