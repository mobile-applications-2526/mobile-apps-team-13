/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2548BC',
        },
        background: {
          DEFAULT: '#FFFFFF',
        },
        text: {
          DEFAULT: '#000000',
          secondary: '#828282',
          light: '#FFFFFF',
        },
      },
    },
  },
  plugins: [],
}