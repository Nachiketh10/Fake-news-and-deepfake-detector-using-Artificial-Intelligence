export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00ffcc',
        secondary: '#33ffe0',
        accent: '#00ced1',
        darkbg: '#0d0d0d',
        cardbg: '#1e1e1e'
      },
      fontFamily: { inter: ['Inter', 'sans-serif'] }
    },
  },
  plugins: [],
}
