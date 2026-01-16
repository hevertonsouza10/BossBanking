/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // se usar src/, deixe também:
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
  keyframes: {
    loader: {
      '0%': { transform: 'translateX(-100%)' },
      '100%': { transform: 'translateX(300%)' },
    },
  },
  animation: {
    loader: 'loader 1.4s infinite ease-in-out',
  },
},
  },
  plugins: [],
}
