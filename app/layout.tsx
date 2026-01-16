import './globals.css'
import { Montserrat, Poppins } from 'next/font/google'

import Preloader from '@/components/Preloader'


const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700'],
})

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${montserrat.variable} ${poppins.variable}`}>
        <Preloader />
        {children}
      </body>
    </html>
  )
}



