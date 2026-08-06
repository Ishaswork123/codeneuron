/** @type {import('tailwindcss').Config} */
module.exports = {
  // Ensure Tailwind scans index.html in the root directory
  content: ["./index.html", "./src/**/*.{html,js}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkbg: '#0b0f17',
        surface: '#111827',
        surfaceBorder: 'rgba(255, 255, 255, 0.08)',
        brand: {
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          accent: '#8b5cf6'
        }
      }
    },
  },
  plugins: [],
}