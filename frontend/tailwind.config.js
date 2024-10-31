const colors = require("tailwindcss/colors");
const typography = require("@tailwindcss/typography");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/renderer/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: colors.neutral["100"],
        foreground: colors.neutral["950"],
        border: colors.neutral["400"],
        ring: colors.neutral["900"],
        primary: {
          DEFAULT: colors.neutral["950"],
          foreground: colors.neutral["100"],
        },
        secondary: {
          DEFAULT: colors.neutral["200"],
          foreground: colors.neutral["900"],
        },
        accent: {
          DEFAULT: colors.neutral["500"],
          foreground: colors.neutral["100"],
        },
        muted: {
          DEFAULT: colors.neutral["400"],
          foreground: colors.neutral["500"],
        },
      },
    },
  },
  plugins: [typography],
};
