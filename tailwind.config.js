/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,vue}'],
  theme: {
    extend: {

      // it is  to   add new custom colors
      colors:{
        "doderoll-gold":"#F79F1A",
        "apple-green":"#046E1B",
        "dire-wolf":"#292727"
      }
    },
    // this part  is  means  that  the font family  is  Montserrat
    fontFamily:{
      Monterrat:"Montserrat,sans-serif",
      playfair: ['"Playfair Display"', 'serif'],

    },
    // like mx-auto
    container:{
      center: true,
      padding: '2rem',
    },

  },
  plugins: [],
}

