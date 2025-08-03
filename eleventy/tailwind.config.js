/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,njk,md}",
    "./src/_includes/**/*.{html,njk}",
    "./src/_data/**/*.json"
  ],
  theme: {
    screens: {
      'xs': '360px',
      'sm': '480px', 
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        'eagle-green': '#2d5016', // Eagle East Aviation brand green
        'eagle-green-light': '#4a7c23',
        'eagle-green-dark': '#1a3009'
      },
      fontFamily: {
        'system': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
        'assistant': ['Assistant', 'sans-serif']
      },
      fontSize: {
        'display-1': '2.5rem',
        'display-2': '2rem',
      },
      width: {
        '55': '13.75rem',  // 220px
        '62': '15.625rem', // 250px  
        '70': '17.5rem',   // 280px
      },
      height: {
        '15': '3.75rem',   // 60px
      },
      transitionDuration: {
        '600': '600ms',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}