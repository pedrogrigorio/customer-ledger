import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderColor: {
        primary: '#D9D9D9',
      },
      textColor: {
        primary: '#333437',
        secondary: '#5C5E64',
        terciary: '#767D92',
        placeholder: '#ABB0B4',
      },
      colors: {
        button: {
          primary: {
            DEFAULT: '#7741FB',
            hover: '#6b3be2',
          },
        },
        table: {
          header: '#F9F8FA',
        },
        sidebar: {
          hover: '#F6F6F6',
        },
      },
    },
  },
  plugins: [],
}
export default config
