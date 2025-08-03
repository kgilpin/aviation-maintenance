/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1e40af',
        'primary-dark': '#1e3a8a',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'sans-serif'],
        'company': ['Kalam', 'script', 'cursive'], // Script font for company name
        'aviation': ['Open Sans Condensed', 'sans-serif'], // Aviation industry font
        'script': ['Kalam', 'script', 'cursive'], // Alternative script font
      },
      backgroundImage: {
        'gradient-falcon': 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)',
      },
    },
  },
  plugins: [],
}

