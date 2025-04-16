import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          darkest: '#2C3424',
          dark: '#4C583E',
          base: '#768064',
          light: '#959581',
          lightest: '#DADED8',
        },
      },
      fontFamily: {
        seasons: ['"the-seasons"', 'sans-serif'],
        goudy: ['"ltc-goudy-oldstyle-pro"', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config 
