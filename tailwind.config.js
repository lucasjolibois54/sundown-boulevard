/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        // colors
        'blue-hover': '#007DDB',
        'bgColorDark': '#121212',
        'cat-btn': '#232323',
        'cat-text': '#7B7B7B',
        
        'main-color': '#007DDB',
        'dark-bg': '#151515',

        'main-text': '#F6F6F6',
        'sec-light-text': '#D2D6D7',
        'cat-btn': '#232323',
        'cat-text': '#7B7B7B',
        'project-text': '#75757E',
      }
    },
  },
  plugins: [],
}
