/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,njk,md}",
    "./src/_includes/**/*.{html,njk}",
    "./src/_data/**/*.json"
  ],
  theme: {
    extend: {
      colors: {
        'eagle-green': '#2d5016', // Eagle East Aviation brand green
        'eagle-green-light': '#4a7c23',
        'eagle-green-dark': '#1a3009'
      },
      fontFamily: {
        'assistant': ['Assistant', 'sans-serif']
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}