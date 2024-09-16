import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
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
        contrast: '#7741FB',
      },
      colors: {
        danger: '#A94442',
        warning: '#F28000',
        contrast: '#7741FB',
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
  plugins: [require('tailwindcss-animate')],
}
export default config
