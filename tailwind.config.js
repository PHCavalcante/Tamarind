/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      animation: {
        modal: "fadeScaleIn 0.3s ease-out"
      }
    },
    keyframes: {
      fadeScaleIn: {
        "0%": { opacity: 0, transform: "scale(0.9)" },
        "100%": { opacity: 1, transform: "scale(1)" },
      },
    }
  },
  plugins: [],
}

