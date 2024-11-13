/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Lufga Regular", "sans-serif"],
      "pixelify-sans": ["Pixelify Sans", "sans-serif"],
    },
    extend: {
      fontFamily: {
        pixelify: ["Pixelify Sans", "sans-serif"],
        pixelSansSerifCondensed: ["Pixel Sans Serif Condensed"],
        pixelSansSerif: ["Pixel Sans Serif"],
      },
      colors: {
        background: "#151515",
        primary: "#FF8343",
        brown: "#43200E",
        hr: "#383838",
        yellow: "#FFBD42",
        subtext: "#A1A1A1",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar": {
          "scrollbar-width": "none", // Firefox
          "-ms-overflow-style": "none", // IE 10+
          "&::-webkit-scrollbar": {
            display: "none", // Chrome, Safari
          },
        },
      });
    },
  ],
};
