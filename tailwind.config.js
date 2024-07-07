/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/utils/**/*.{js,ts,jsx,tsx}',
    './src/styles/**/*.{css}',
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
