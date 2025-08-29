/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{vue,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors:{
        primary:'#FFFFF',
        secondary:'#00000'
      }
    },
  },
  darkMode:'class',
  mode:'jit',
  plugins: [],
}

