/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xxsm': '355px',
      // => @media (min-width: 355px) { ... }

      'xsm': '375px',
      // => @media (min-width: 375px) { ... }

      'bigxsm': '392px',
      // => @media (min-width: 375px) { ... }

      'semixsm': '408px',
      // => @media (min-width: 408px) { ... }

      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'md-blog-img': '791px',
      // => @media (min-width: 791px) { ... }

      'lg-blog-img': '839px',
      // => @media (min-width: 839px) { ... }

      'md-lg': '878px',
      // => @media (min-width: 878px) { ... }

      'md-lg-bigger': '915px',
      // => @media (min-width: 915px) { ... }

      'sm-lg': '696px',
      // => @media (min-width: 696px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'biggerlg': '1039px',
      // => @media (min-width: 1039px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }

      '3xl': '1836px',
      // => @media (min-width: 1636px) { ... }
    },
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
