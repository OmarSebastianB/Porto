import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        retro: {
          green: '#2d5016',
          ink: '#1c1912',
          paper: '#ebe4d8',
          'paper-dark': '#e0d6c8',
          sepia: '#6b5b4f',
          border: '#9c8b7a',
          'border-light': '#c4b59a',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config
