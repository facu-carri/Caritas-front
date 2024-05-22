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
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-25%)' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        bounce: 'bounce 1s infinite',
        spin: 'spin 3s linear infinite',
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

