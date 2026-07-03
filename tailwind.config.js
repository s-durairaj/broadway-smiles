/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B5E3C',
          dark: '#2C1A0E',
        },
        accent: {
          DEFAULT: '#D4760A',
          light: '#FDF0E0',
        },
        muted: '#7A6052',
        warm: {
          border: '#E8D5C0',
        },
        emergency: '#C0392B',
      },
      fontFamily: {
        body: ['Lato', 'sans-serif'],
        heading: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
