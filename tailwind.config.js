/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      screens: {
        sm: { raw: "(max-width: 600px)" },
      },
    },
  },
  plugins: [],
};
