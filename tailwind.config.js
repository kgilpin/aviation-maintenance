/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1e40af',
          dark: '#1e3a8a',
        },
      },
      fontFamily: {
        sans: ['Roboto', 'system-ui', '-apple-system', 'sans-serif'],
        'heading': ['Rajdhani', 'sans-serif'], // For headings and titles
        'body': ['Roboto', 'system-ui', '-apple-system', 'sans-serif'], // For body text
      },
      backgroundImage: {
        'gradient-falcon': 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)',
      },
    },
  },
  plugins: [],
}

