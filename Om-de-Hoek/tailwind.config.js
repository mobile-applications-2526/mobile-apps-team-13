/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        blue: '#2548BC',
        red: '#CB0000',
        white: '#FFFFFF',
        black: '#100D08',
        gray: '#828282', 
      }
    },
  },
  plugins: [],
}

