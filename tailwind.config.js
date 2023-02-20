/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    themes: [
      {
        forest: {
          ...require("daisyui/src/colors/themes")["[data-theme=forest]"],
          primary: "purple",
          "primary-focus": "purple",
        },
      },
    ],
  },
}
