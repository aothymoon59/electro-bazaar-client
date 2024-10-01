/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // "primary-main": "#021224",
        "primary-main": "#2A2F4F",
        "primary-light": "#EAEAEC",
        "primary-lighter": "#F7F7F7",
        "primary-dark": "#0E0F27",
      },
      screens: {
        xs: "375px", // Custom breakpoint for screens >= 375px
        sm: "576px", // Custom breakpoint for screens >= 576px
        md: "768px", // Custom breakpoint for screens >= 768px
        lg: "992px", // Custom breakpoint for screens >= 992px
        xl: "1280px", // Custom breakpoint for screens >= 1280px
        xxl: "1440px", // Custom breakpoint for screens >= 1440px
      },
    },
  },
  plugins: [require("daisyui")],
  corePlugins: {
    preflight: false,
  },
  important: true,
};
