/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#32006E',
        secondary: '#2F2E41',
        tertiary: '#85754D',
        quaternary: '#858585',
        quinary: '#D9D9D9',
      },
      fontFamily: {
        'open-sans': ['Open Sans', 'sans-serif'],
        'encode-sans': ['Encode Sans', 'sans-serif']
      },
    },
  },
  plugins: [],
}