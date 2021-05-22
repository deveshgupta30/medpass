const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        quickSand: ["Quicksand", "sans-serif"],
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      rose: colors.rose,
      fuchsia: colors.fuchsia,
      teal: colors.teal,
      emerald: colors.emerald,
      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      red: colors.red,
      yellow: colors.amber,
      blue: colors.blue,
      violet: colors.violet,
    },
  },
  variants: {
    extend: { borderColor: ["disabled"] },
  },
  plugins: [require("@tailwindcss/forms")],
};
