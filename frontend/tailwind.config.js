// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        azul: "#3878A4",
        rosa: "#E3919D",
        azulclaro: "#D8EFFF",
        negro: "#060606",
        blanco: "#FBFBFB"
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};