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
          DEFAULT: '#606c38',
          dark: '#283618',
        },
        secondary: {
          DEFAULT: '#dda15e',
          dark: '#bc6c25',
        },
        background: {
          DEFAULT: '#fefae0',
          card: '#f5ebd0',
        },
        text: {
          DEFAULT: '#283618',
          secondary: '#606c38',
          light: '#fefae0',
        },
      },
    },
  },
  plugins: [],
}