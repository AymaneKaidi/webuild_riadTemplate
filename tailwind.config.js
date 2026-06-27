/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: '#F4F0EA',
        terracotta: {
          DEFAULT: '#C45A45',
          dark: '#A8452F',
          light: '#E87D69',
        },
        teal: {
          DEFAULT: '#2B5B54',
          light: '#6CBBAF',
        },
        charcoal: '#222525',
      },
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        heading: ['Cormorant Garamond', 'serif'],
        'body-ar': ['Tajawal', 'sans-serif'],
        'heading-ar': ['Markazi Text', 'serif'],
      },
    },
  },
  plugins: [],
}
