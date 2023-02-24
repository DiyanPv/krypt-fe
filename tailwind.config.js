/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      screens: {
        'sm': { 'raw': '(max-height: 500px)' },
        
      }
    }
  },
  plugins: [],
}