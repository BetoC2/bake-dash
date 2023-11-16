/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-gray': '#E1E1E1',
        'main-white': '#FFFFFF',
        'main-dark': '#222222',
        'main-green': '#AEF3B3',
        'main-red': '#FFBAB5',
        'main-blue': '#CCE1FE',
        'secondary-dark': '#B8B8B8',
      },
    },
  },
  plugins: [],
}
