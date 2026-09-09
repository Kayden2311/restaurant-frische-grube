/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0b',
        surface: '#141416',
        parchment: '#f4f1ec',
        muted: 'rgba(244, 241, 236, 0.55)',
        subtle: 'rgba(244, 241, 236, 0.2)',
        faint: 'rgba(244, 241, 236, 0.12)',
        whatsapp: '#25D366',
        gold: '#f5c97a',
        candle: '#ffe4b5',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
