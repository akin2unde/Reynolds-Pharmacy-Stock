/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        primary:
        {
          100:'#DFECEB',
          200:'#BBD2CE',
          300:'#94B6B4',
          400:'#6D8A88',
          dark:'#4F5C56',
          darkest:'#0F1B1A'
        },
        utility:'#A55B06',
        control:'#B4955A'
      }
    },
  },
  plugins: [],
}

