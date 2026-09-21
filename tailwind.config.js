/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#007360',
          secondary: '#43AB98',
        },
        text: {
          dark: '#333333',
        },
        bg: {
          warm: '#FFFBF3',
        },
        accent: {
          orange: '#FF9F00',
          yellow: '#FFDE00',
        },
        secondary: {
          green: {
            dark: '#008C45',
            light: '#38B942',
          },
          blue: '#0057A9',
          gold: '#FFC936',
        },
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
