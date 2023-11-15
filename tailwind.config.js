/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-gray': '#F9F9F9',
        'main-white': '#FFFFFF',
        'main-dark': '#222222',
        'main-green': '#DFFDE1',
        'main-red': '#FFBAB5',
        'secondary-dark': '#B8B8B8',
      },
    },
  },
  plugins: [],
}
