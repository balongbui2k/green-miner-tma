/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
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
