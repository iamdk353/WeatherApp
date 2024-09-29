/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/main.js"],
  purge: {
    options: {
      safelist: [
        "bg-clear",
        "bg-clouds",
        "bg-rain",
        "bg-mist",
        "bg-snow",
        "bg-haze",
        "bg-fog",
      ],
    },
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
