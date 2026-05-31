/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['DM Sans', 'ui-sans-serif', 'sans-serif'],
        display: ['Syne',    'ui-sans-serif', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
