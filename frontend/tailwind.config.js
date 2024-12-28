/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGray: '#333333',
        customDarkGray: '#1A1A1A',
        customBorderFull: '#5A5A5A',
      },
    },
  },
  plugins: [],
}

