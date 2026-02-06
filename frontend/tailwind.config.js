/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Intent UI supports dark mode
  theme: {
    extend: {},
  },
  plugins: [
    require("tailwindcss-animate"), // Intent UI often uses this
    require("tailwindcss-react-aria-components"), // Crucial for React Aria
  ],
};
