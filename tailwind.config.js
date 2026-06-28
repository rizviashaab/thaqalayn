/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: "#F2EBDD",
        ink: "#1F2421",
        emerald: "#1C4D3E",
        gold: "#A8843A",
        clay: "#9C5B4A",
      },
      fontFamily: {
        display: ["Amiri", "serif"],
        body: ["Lora", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
