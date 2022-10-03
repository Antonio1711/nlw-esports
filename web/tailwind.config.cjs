/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        galaxy: "url('/background-galaxy.png')",
        'nlw-gradient': 'linear-gradient(89.86deg, #9572FC 0%, #43E7AD 50.52%, #E1D55D 100%)',
        'game-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)',
      },
      animation: {
        fade: 'fadeOut 5s ease-in-out',
      },
      keyframes: {
        fadeOut: {
          '0%': { transform: ['translateX(calc(100% + 10px))'] },
          '15%': { transform: ['translateX(0)'] },
          '100%': { opacity: ['0'] },
        },
      },
    },
  },
  plugins: [],
}
