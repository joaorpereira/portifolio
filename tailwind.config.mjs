/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
        ],
        display: ['Instrument Sans', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        /** Green-tinted neutrals (surfaces, borders, text) */
        ink: {
          50: '#f4faf7',
          100: '#e8f2ec',
          200: '#cfdfd6',
          300: '#a3c0b2',
          400: '#739a86',
          500: '#567d6c',
          600: '#446558',
          700: '#395349',
          800: '#31453d',
          900: '#2b3c35',
          950: '#141f1a',
        },
        accent: {
          DEFAULT: '#059669',
          muted: '#34d399',
        },
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
      },
    },
  },
  plugins: [],
};
