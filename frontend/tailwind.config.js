// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          azul: {
            50: "#f4f8fb",
            100: "#e7f0f7",
            200: "#cbdfec",
            300: "#9dc4dc",
            400: "#68a5c8",
            500: "#4589b2",
            600: "#3878a4", //color original
            700: "#2a597a",
            800: "#264c66",
            900: "#244156",
            950: "#182a39",
            DEFAULT: "#3878a4",
          },
          rosa: {
            50: "#fcf4f4",
            100: "#fae9ea",
            200: "#f5d6da",
            300: "#ecb5bb",
            400: "#e3919d", //color original
            500: "#d26174",
            600: "#bd415c",
            700: "#9e324c",
            800: "#852c45",
            900: "#72293f",
            950: "#3f121f",
            DEFAULT: "#e3919d",
          },
          azulclaro: {
            50: "#eff9ff",
            100: "#d8efff", //color original
            200: "#b8e6ff",
            300: "#79d3ff",
            400: "#32bdfe",
            500: "#07a6f0",
            600: "#0084ce",
            700: "#0069a6",
            800: "#035989",
            900: "#094a71",
            950: "#062e4b",
            DEFAULT: "#d8efff",
          },
          negro: "#060606",
          blanco: "#FBFBFB",
        },
      },
      dark: {
        colors: {
          azul: {
            50: "#f4f8fb",
            100: "#e7f0f7",
            200: "#cbdfec",
            300: "#9dc4dc",
            400: "#68a5c8",
            500: "#4589b2",
            600: "#3878a4", //color original
            700: "#2a597a",
            800: "#264c66",
            900: "#244156",
            950: "#182a39",
            DEFAULT: "#3878a4",
          },
          rosa: {
            50: "#fcf4f4",
            100: "#fae9ea",
            200: "#f5d6da",
            300: "#ecb5bb",
            400: "#e3919d", //color original
            500: "#d26174",
            600: "#bd415c",
            700: "#9e324c",
            800: "#852c45",
            900: "#72293f",
            950: "#3f121f",
            DEFAULT: "#e3919d",
          },
          azulclaro: {
            50: "#eff9ff",
            100: "#d8efff", //color original
            200: "#b8e6ff",
            300: "#79d3ff",
            400: "#32bdfe",
            500: "#07a6f0",
            600: "#0084ce",
            700: "#0069a6",
            800: "#035989",
            900: "#094a71",
            950: "#062e4b",
            DEFAULT: "#d8efff",
          },
          negro: "#FFEC9E",// el negro ahora es blanco
          blanco: "#182a39",// el blanco ahora es negro
        },
      },
    },
  })],
};
