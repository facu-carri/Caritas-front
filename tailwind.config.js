/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navbar-blue': '#BACDE3',
      },
    }
  },
  daisyui: {
    darkTheme: "light", // name of one of the included themes for dark mode
  },
  plugins: [
    daisyui
  ],
}

