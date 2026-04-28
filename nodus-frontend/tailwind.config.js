/** @type {import('tailwindcss').Config} */
export default {

  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        // Primary Accent
        indigo: {
          electric: "#4F46E5",
        },
        // Backgrounds
        surface: {
          white: "#FFFFFF",
          gray: "#F9FAFB",
        },
        // Typography
        content: {
          charcoal: "#111827",
          slate: "#4B5563",
        },
        // Borders
        outline: {
          subtle: "#E5E7EB",
        },
      },
      fontFamily: {
        // Inter is set as the default sans-serif for body text
        sans: ["Inter", "sans-serif"],
        // Space Grotesk specifically for technical headings
        display: ['"Space Grotesk"', "sans-serif"],
      },
      borderRadius: {
        // 8px corner radius
        nodus: "8px",
      },
      boxShadow: {
        // Flat, subtle shadow favoring the 1px border aesthetic
        flat: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};