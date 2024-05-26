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
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        spin: 'spin 3s linear infinite',
      },
      dropShadow: {
        'white-multi': [
          '2px 0 0 rgba(0, 0, 0, 1)',
          '0 2px 0 rgba(0, 0, 0, 1)',
          '-2px 0 0 rgba(0, 0, 0, 1)',
          '0 -2px 0 rgba(0, 0, 0, 1)',
        ],
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

