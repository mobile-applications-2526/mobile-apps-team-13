module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  presets: [require("nativewind/preset")],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        blue: '#2548BC',
        red: '#CB0000',
        white: '#FFFFFF',
        black: '#100D08',
        gray: '#828282', 
      },
      fontFamily: {
        'comfortaa-bold': ['ComfortaaBold'],
        'comfortaa-light': ['ComfortaaLight'],
        'comfortaa-medium': ['ComfortaaMedium'],
        'comfortaa-regular': ['ComfortaaRegular'],
        'comfortaa-semibold': ['ComfortaaSemiBold'],
},
    },
  },
  plugins: [],
}
