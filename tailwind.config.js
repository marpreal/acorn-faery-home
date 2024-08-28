/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
       screens: {
        'xs': '1010px',
      },
      fontFamily: {
        'dancing-script': ['Dancing Script', 'cursive'],
      },
    },
  },
  plugins: [],
}