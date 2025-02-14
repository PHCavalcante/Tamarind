/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      animation: {
        modal: "fadeScaleIn 0.3s ease-out",
      },
    },
    keyframes: {
      fadeScaleIn: {
        "0%": { opacity: 0, transform: "scale(0.9)" },
        "100%": { opacity: 1, transform: "scale(1)" },
      },
      typing: {
        "0%": {
          width: "0%",
          visibility: "hidden",
        },
        "100%": {
          width: "100%",
        },
      },
      spin: {
        "0%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(360deg)" },
      },
    },
    animation: {
      typing: "typing 1s steps(20) alternate",
      spin: "spin 1s linear infinite",
    },
  },
  plugins: [],
};

