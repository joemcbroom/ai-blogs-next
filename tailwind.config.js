/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/hooks/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        tertiary: "var(--color-tertiary)",
      },
      maxWidth: {
        "8xl": "106rem",
      },
      gridTemplateColumns: {
        "auto-fit": "repeat(auto-fit, minmax(250px, 1fr))",
      }
    },
    plugins: [],
  }
}

