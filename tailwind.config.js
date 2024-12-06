/** @type {import('tailwindcss').Config} */
import animatedPlugin from 'tailwindcss-animated';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors : {
      'awashama': {
        toolightgreen : '#ecfccb',
        lightgreen : '#7ABF36',
        darkgreen : '#4D8C30',
        yellow : '#EFE449',
        black : '#020617',
        darkgray : '#334155',
        gray: '#475569',
        lightgray: '#94a3b8',
        white : '#f1f5f9',
      }
    },
    extend: {
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [
    animatedPlugin
  ],
}

