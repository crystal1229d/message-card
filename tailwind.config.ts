import type { Config } from 'tailwindcss'
const konstaConfig = require('konsta/config')

const config: Config = konstaConfig({
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'media',
  theme: {
    // colors: {
    //   'letter-red': '#FF3030',
    //   'letter-orange': '#FF993F',
    //   'letter-yellow': '#FFF665',
    //   'letter-pink': '#FFC0CB',
    //   'letter-green': '#44CB44',
    //   'letter-blue': '#85C2FF',
    //   'letter-purple': '#AC3EBB',
    //   'letter-black': '#6F6F6F',
    //   'letter-white': '#E8E8E4',
    // },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  variants: {
    extend: {},
  },
  konsta: {
    colors: {
      primary: '#6C0BA9',
    },
  },
  plugins: [],
})

export default config
