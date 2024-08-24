/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '300px', // Definir xs como un breakpoint opcional, por ejemplo, a 480px
      },
      fontSize: {
        xxs: '8px', // Define el tamaño de fuente 'xxs' como 8px
      },
    },
  },
  important: true,
  plugins: [],
}

