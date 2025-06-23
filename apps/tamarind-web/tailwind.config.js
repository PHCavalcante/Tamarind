/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
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
      fadeIn: {
        "0%": { transform: "translateY(-10px)", opacity: "0" },
        "100%": { transform: "translateY(0)", opacity: "1" },
      },
      fadeOut: {
        "0%": { transform: "translateY(0)", opacity: "1" },
        "100%": { transform: "translateY(-10px)", opacity: "0" },
      },
      bounce: {
        "0%, 100%": {
          transform: "translateY(-25%)",
          "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
        },
        "50%": {
          transform: "none",
          "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
        },
      },
      pulse: {
        "0%, 100%": {
          transform: "scale(1)",
          opacity: "1",
        },
        "50%": {
          transform: "scale(1.05)",
          opacity: "0.5",
        },
      },
    },
    animation: {
      typing: "typing 1s steps(20) alternate",
      spin: "spin 1s linear infinite",
      snackBarIn: "fadeIn 0.4s ease-in-out forwards",
      snackBarOut: "fadeOut 0.4s ease-in-out 2.7s forwards",
      bounce: "bounce 0.5s infinite",
      pulse: "pulse 1s infinite",
    },
  },
  plugins: [],
  safelist: [
    "border-l-red-500",
    "border-l-green-500",
    "border-l-blue-500",
    "border-l-yellow-500",
    "border-l-purple-500",
    "border-l-teal-500",
    "border-l-pink-500",
    "border-l-orange-500",
    "border-l-red-700",
  ],
};

