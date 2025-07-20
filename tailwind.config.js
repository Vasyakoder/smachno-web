// tailwind.config.js
/** @type {import('tailwindcss').Config} */
const aspectRatio = require('@tailwindcss/aspect-ratio');
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
safelist: [
  'bg-red-500',
  'bg-red-600',
  'text-white',
  'px-2',
  'py-1',
  'text-xs',
  'font-bold',
  'rounded-md',
  'shadow-md',
  'z-30',
  'absolute',
  'top-2',
  'left-2',
  'bg-testRed', // если ты используешь этот кастомный цвет

  // для категорий — тоже лучше заранее зафиксировать
  'bg-yellow-100',
  'text-yellow-800',
  'bg-pink-100',
  'text-pink-800',
  'bg-red-100',
  'text-red-800',
  'bg-orange-100',
  'text-orange-800',
  'bg-purple-100',
  'text-purple-800',
  'bg-blue-100',
  'text-blue-800',
  'bg-gray-100',
  'text-gray-800',
],

  theme: {
    extend: {
      colors: {
         testRed: colors.red[600],
      },
    },
  },
  plugins: [aspectRatio],
};
