/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './utils/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        day: {
          light: '#ffefa0',
          dark: '#2a2a72',
        },
        night: {
          light: '#2a2a72',
          dark: '#0d0d40',
        },
      },
    },
  },
  plugins: [],
};
