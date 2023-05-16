/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        highlight: 'inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
      },
      screens: {
        narrow: { raw: '(max-aspect-ratio: 3 / 2)' },
        wide: { raw: '(min-aspect-ratio: 3 / 2)' },
        'taller-than-854': { raw: '(min-height: 854px)' },
      },
      colors: {
        myColor: {
          "50": "#eef3ed",
          "100": "#dee7db",
          "200": "#bccfb6",
          "300": "#9bb692",
          "400": "#799e6d",
          "500": "#588649",
          "600": "#466b3a",
          "700": "#35502c",
          "800": "#23361d",
          "900": "#121b0f",
        }
    },
  },
  plugins: [],
}
}