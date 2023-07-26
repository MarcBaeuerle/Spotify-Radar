/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
            fontFamily: {
                mont: 'Montserrat, sans-serif',
                ubuntu: 'Ubuntu, sans-serif',
                rale: 'Raleway, sans-serif',
            }
        },
  },
  plugins: [],
}

