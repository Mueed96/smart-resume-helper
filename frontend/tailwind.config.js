const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
          hover: '#2563EB',
        },
        accent: {
          DEFAULT: '#10B981',
        },
        error: {
          DEFAULT: '#F43F5E',
        },
        background: '#F9FAFB', // Reverted
        surface: '#FFFFFF',
        text: {
          heading: '#111827', // Reverted
          body: '#374151',
          subtle: '#6B7280',
        },
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-once': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.15)' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        'pulse-once': 'pulse-once 0.8s ease-out',
      },
      animationDelay: {
        1000: '1000ms',
        2000: '2000ms',
      },
    },
  },
  plugins: [require('tailwindcss-animation-delay')],
};