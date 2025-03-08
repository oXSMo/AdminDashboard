/** @type {import('tailwindcss').Config} */
export default {
 darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/preline/preline.js"
  ],
  theme: {
    extend: {
      colors: {
        pri: "#FFFFFE",
        sec: "#132731",
        ter: "#ED562A",
        qua: "#171717",
        fif: "#262626"
      },
    },
  },
  plugins: [require('preline/plugin')],
}