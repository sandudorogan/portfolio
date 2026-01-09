import animate from 'tailwindcss-animate'
import { setupInspiraUI } from '@inspira-ui/plugins'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './app/**/*.{vue,js,ts}',
  ],
  theme: {
    extend: {
      // Custom font sizes for typography scale
      fontSize: {
        sm: '0.750rem',
        base: '1rem',
        xl: '1.333rem',
        '2xl': '1.777rem',
        '3xl': '2.369rem',
        '4xl': '3.158rem',
        '5xl': '4.210rem',
      },
    },
  },

  plugins: [animate, setupInspiraUI],
}
