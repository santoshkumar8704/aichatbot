/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accenturePurple: '#A100FF',
        accenturePurpleLight: '#B380FF',
        backgroundColor: '#000000',
        chatBoxColor: '#333333',
      },
    },
  },
  plugins: [],
}

