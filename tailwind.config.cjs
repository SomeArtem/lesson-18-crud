/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: '#ffcc00'
      }
    },
  },
  plugins: [],
};

