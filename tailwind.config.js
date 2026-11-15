/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#070707',
          900: '#0d0d0d',
          800: '#141414',
          700: '#1c1c1c',
          600: '#262626',
          500: '#333333',
          400: '#4a4a4a',
        },
        gold: {
          600: '#a67c2e',
          500: '#c79a3f',
          400: '#d4af37',
          300: '#e0c56a',
          200: '#ecd99a',
          100: '#f6ecca',
        },
        red: {
          700: '#6b0f12',
          600: '#8b1216',
          500: '#a0171c',
          400: '#c01e24',
          300: '#d8403e',
        },
        cream: {
          300: '#e8e0d0',
          200: '#f0ead8',
          100: '#f7f2e7',
          50: '#fdfbf5',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'flicker': 'flicker 3s ease-in-out infinite',
        'ember': 'ember 4s linear infinite',
        'steam': 'steam 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        flicker: {
          '0%, 100%': { opacity: '0.8' },
          '25%': { opacity: '0.9' },
          '50%': { opacity: '0.7' },
          '75%': { opacity: '1' },
        },
        ember: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0' },
          '20%': { opacity: '0.6' },
          '100%': { transform: 'translateY(-200px) scale(0)', opacity: '0' },
        },
        steam: {
          '0%': { transform: 'translateY(0) translateX(0) scale(1)', opacity: '0' },
          '30%': { opacity: '0.4' },
          '100%': { transform: 'translateY(-120px) translateX(20px) scale(1.5)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
};
