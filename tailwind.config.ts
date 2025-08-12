import { heroui } from '@heroui/react';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/containers/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  important: true,
  theme: {
    extend: {
      colors: {
        primary: {
          20: '#F4E5FF',
          40: '#B95CFF',
          DEFAULT: '#9200FE',
          80: '#6300AC',
          100: '#34005B',
        },
        secondary: {
          20: '#EAF0FF',
          40: '#BFD1FA',
          50: '#BFD1FA',
          80: '#233B75',
          DEFAULT: '#010B23',
        },
        tertiary: {
          20: '#FFB7F3',
          40: '#FF5CE4',
          DEFAULT: '#FF00D6',
          80: '#AD0091',
          100: '#5C004D',
        },
        neutral: {
          20: '#FFFFFF',
          40: '#CCCCCC',
          50: '#A3A3A3',
          80: '#666666',
          100: '#000000',
        },
        error: {
          DEFAULT: '#F44336',
        },
        success: {
          DEFAULT: '#09A809',
        },
      },
      spacing: {
        none: '0px',
        'extra-small': '4px',
        small: '8px',
        'semi-regular': '12px',
        regular: '16px',
        'semi-medium': '20px',
        medium: '24px',
        'semi-large': '28px',
        large: '32px',
        'extra-large': '36px',
        full: '40px',
      },
    },
  },
  plugins: [
    heroui({
      addCommonColors: true,
    }),
  ],
};

export default config;
