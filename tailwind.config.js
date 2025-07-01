/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {"nunito":["Nunito Sans"]},
      colors: {
        customPurple: {
          300: '#d8b4fe',
        },
        customBlue: {
          900: 'hsl(209, 23%, 22%)',
          950: 'hsl(207, 26%, 17%)',
        },
        customGrey: {
          950: 'hsl(200, 15%, 8%)',
          400: 'hsl(0, 0%, 50%)',
          50: 'hsl(0, 0%, 99%)',
        },
      },
    },
  },
  plugins: [],
}

