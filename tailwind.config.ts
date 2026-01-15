import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Agora 'font-sans' será Montserrat
        sans: ['var(--font-montserrat)', 'sans-serif'],
        // Você pode usar 'font-serif' ou 'font-poppins' para a Poppins
        serif: ['var(--font-poppins)', 'serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
      colors: {
        gold: {
          500: '#D4AF37',
          600: '#B4941F',
        }
      },
    },
  },
  plugins: [],
};
export default config;