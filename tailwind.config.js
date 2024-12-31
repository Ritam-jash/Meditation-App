/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sunset: '#FF7E5F',
        night: '#1A1B26',
        beach: '#87CEEB',
        dawn: '#FFB6C1',
        mountain: '#4B5563',
        forest: '#228B22',
      },
    },
  },
  plugins: [],
}