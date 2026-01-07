import animate from 'tailwindcss-animate'
import { setupInspiraUI } from '@inspira-ui/plugins'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  safelist: ['dark'],
  prefix: '',
  content: [
    './app.vue',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './composables/**/*.{js,ts}',
    './utils/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      fontSize: {
        sm: '0.750rem',
        base: '1rem',
        xl: '1.333rem',
        '2xl': '1.777rem',
        '3xl': '2.369rem',
        '4xl': '3.158rem',
        '5xl': '4.210rem',
      },
      fontFamily: {
        heading: ['Mukta Mahee', 'sans-serif'],
        body: ['Mukta Mahee', 'sans-serif'],
      },
      fontWeight: {
        normal: '400',
        bold: '700',
      },
      colors: {
        // Semantic tokens (kept for existing component compatibility)
        border: 'rgb(var(--background-200) / <alpha-value>)',
        input: 'rgb(var(--background-200) / <alpha-value>)',
        ring: 'rgb(var(--primary-500) / <alpha-value>)',
        foreground: 'rgb(var(--text-950) / <alpha-value>)',

        // Text palette
        text: {
          50: 'rgb(var(--text-50) / <alpha-value>)',
          100: 'rgb(var(--text-100) / <alpha-value>)',
          200: 'rgb(var(--text-200) / <alpha-value>)',
          300: 'rgb(var(--text-300) / <alpha-value>)',
          400: 'rgb(var(--text-400) / <alpha-value>)',
          500: 'rgb(var(--text-500) / <alpha-value>)',
          600: 'rgb(var(--text-600) / <alpha-value>)',
          700: 'rgb(var(--text-700) / <alpha-value>)',
          800: 'rgb(var(--text-800) / <alpha-value>)',
          900: 'rgb(var(--text-900) / <alpha-value>)',
          950: 'rgb(var(--text-950) / <alpha-value>)',
          DEFAULT: 'rgb(var(--text-950) / <alpha-value>)',
        },

        // Background palette
        background: {
          50: 'rgb(var(--background-50) / <alpha-value>)',
          100: 'rgb(var(--background-100) / <alpha-value>)',
          200: 'rgb(var(--background-200) / <alpha-value>)',
          300: 'rgb(var(--background-300) / <alpha-value>)',
          400: 'rgb(var(--background-400) / <alpha-value>)',
          500: 'rgb(var(--background-500) / <alpha-value>)',
          600: 'rgb(var(--background-600) / <alpha-value>)',
          700: 'rgb(var(--background-700) / <alpha-value>)',
          800: 'rgb(var(--background-800) / <alpha-value>)',
          900: 'rgb(var(--background-900) / <alpha-value>)',
          950: 'rgb(var(--background-950) / <alpha-value>)',
          DEFAULT: 'rgb(var(--background-50) / <alpha-value>)',
        },

        // Primary palette
        primary: {
          50: 'rgb(var(--primary-50) / <alpha-value>)',
          100: 'rgb(var(--primary-100) / <alpha-value>)',
          200: 'rgb(var(--primary-200) / <alpha-value>)',
          300: 'rgb(var(--primary-300) / <alpha-value>)',
          400: 'rgb(var(--primary-400) / <alpha-value>)',
          500: 'rgb(var(--primary-500) / <alpha-value>)',
          600: 'rgb(var(--primary-600) / <alpha-value>)',
          700: 'rgb(var(--primary-700) / <alpha-value>)',
          800: 'rgb(var(--primary-800) / <alpha-value>)',
          900: 'rgb(var(--primary-900) / <alpha-value>)',
          950: 'rgb(var(--primary-950) / <alpha-value>)',
          DEFAULT: 'rgb(var(--primary-500) / <alpha-value>)',
          foreground: 'rgb(var(--text-50) / <alpha-value>)',
        },

        // Secondary palette
        secondary: {
          50: 'rgb(var(--secondary-50) / <alpha-value>)',
          100: 'rgb(var(--secondary-100) / <alpha-value>)',
          200: 'rgb(var(--secondary-200) / <alpha-value>)',
          300: 'rgb(var(--secondary-300) / <alpha-value>)',
          400: 'rgb(var(--secondary-400) / <alpha-value>)',
          500: 'rgb(var(--secondary-500) / <alpha-value>)',
          600: 'rgb(var(--secondary-600) / <alpha-value>)',
          700: 'rgb(var(--secondary-700) / <alpha-value>)',
          800: 'rgb(var(--secondary-800) / <alpha-value>)',
          900: 'rgb(var(--secondary-900) / <alpha-value>)',
          950: 'rgb(var(--secondary-950) / <alpha-value>)',
          DEFAULT: 'rgb(var(--secondary-500) / <alpha-value>)',
          foreground: 'rgb(var(--text-50) / <alpha-value>)',
        },

        // Accent palette
        accent: {
          50: 'rgb(var(--accent-50) / <alpha-value>)',
          100: 'rgb(var(--accent-100) / <alpha-value>)',
          200: 'rgb(var(--accent-200) / <alpha-value>)',
          300: 'rgb(var(--accent-300) / <alpha-value>)',
          400: 'rgb(var(--accent-400) / <alpha-value>)',
          500: 'rgb(var(--accent-500) / <alpha-value>)',
          600: 'rgb(var(--accent-600) / <alpha-value>)',
          700: 'rgb(var(--accent-700) / <alpha-value>)',
          800: 'rgb(var(--accent-800) / <alpha-value>)',
          900: 'rgb(var(--accent-900) / <alpha-value>)',
          950: 'rgb(var(--accent-950) / <alpha-value>)',
          DEFAULT: 'rgb(var(--accent-500) / <alpha-value>)',
          foreground: 'rgb(var(--text-50) / <alpha-value>)',
        },

        // Kept for Nuxt UI / Shadcn compatibility
        destructive: {
          DEFAULT: 'rgb(var(--secondary-500) / <alpha-value>)',
          foreground: 'rgb(var(--text-50) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'rgb(var(--background-200) / <alpha-value>)',
          foreground: 'rgb(var(--text-600) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'rgb(var(--background-50) / <alpha-value>)',
          foreground: 'rgb(var(--text-950) / <alpha-value>)',
        },
        card: {
          DEFAULT: 'rgb(var(--background-50) / <alpha-value>)',
          foreground: 'rgb(var(--text-950) / <alpha-value>)',
        },
      },
      borderRadius: {
        xl: 'calc(var(--radius) + 4px)',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },

  plugins: [animate, setupInspiraUI],
}
