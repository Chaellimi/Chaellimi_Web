import scrollbarHide from 'tailwind-scrollbar-hide';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          default: '#FF6A00',
          hover: '#E55F00',
          accent: '#FF9C55',
          light: '#FFF0E5',
        },
        gray: {
          black: '#1F1F1F',
          600: '#5C5C5C',
          500: '#848484',
          400: '#A5A5A5',
          300: '#C9C9C9',
          200: '#DEDEDE',
          100: '#EFEFEF',
          50: '#F7F7F7',
          white: '#FFFFFF',
        },
        red: {
          300: '#DE2518',
          200: '#F02B1D',
          100: '#FFEFEE',
        },
        green: {
          300: '#0AAC40',
          200: '#12BD4B',
          100: '#E4FFED',
        },
        blue: {
          300: '#2E88E0',
          200: '#3396F9',
          100: '#EBF5FF',
        },
      },
      fontSize: {
        Lg: [
          '44px',
          {
            lineHeight: '140%',
            letterSpacing: '-0.05em',
            fontWeight: '600',
            fontFamily: 'NotoSans-SemiBlod',
          },
        ],
        h1: [
          '24px',
          {
            lineHeight: '150%',
            letterSpacing: '-0.04em',
            fontWeight: '700',
            fontFamily: 'NotoSans-Blod',
          },
        ],
        h2: [
          '20px',
          {
            lineHeight: '140%',
            letterSpacing: '-0.04em',
            fontWeight: '700',
            fontFamily: 'NotoSans-Blod',
          },
        ],
        h3: [
          '18px',
          {
            lineHeight: '140%',
            letterSpacing: '-0.04em',
            fontWeight: '600',
            fontFamily: 'NotoSans-SemiBlod',
          },
        ],

        b1: [
          '17px',
          {
            lineHeight: '150%',
            letterSpacing: '-0.02em',
            fontWeight: '500',
            fontFamily: 'NotoSans-Medium',
          },
        ],
        b2: [
          '16px',
          {
            lineHeight: '150%',
            letterSpacing: '-0.02em',
            fontWeight: '500',
            fontFamily: 'NotoSans-Medium',
          },
        ],
        b3: [
          '14px',
          {
            lineHeight: '150%',
            letterSpacing: '-0.02em',
            fontWeight: '500',
            fontFamily: 'NotoSans-Medium',
          },
        ],

        he: [
          '16px',
          {
            lineHeight: '140%',
            letterSpacing: '-0.04em',
            fontWeight: '600',
            fontFamily: 'NotoSans-SemiBlod',
          },
        ],
        fn: [
          '13px',
          {
            lineHeight: '150%',
            letterSpacing: '-0.03em',
            fontWeight: '400',
            fontFamily: 'NotoSans-Regular',
          },
        ],

        c1: [
          '12px',
          {
            lineHeight: '140%',
            letterSpacing: '-0.02em',
            fontWeight: '400',
            fontFamily: 'NotoSans-Medium',
          },
        ],
        c2: [
          '11px',
          {
            lineHeight: '140%',
            letterSpacing: '-0.02em',
            fontWeight: '500',
            fontFamily: 'NotoSans-Medium',
          },
        ],

        bn1: [
          '18px',
          {
            lineHeight: '100%',
            letterSpacing: '-0.02em',
            fontWeight: '500',
            fontFamily: 'NotoSans-Medium',
          },
        ],
        bn2: [
          '16px',
          {
            lineHeight: '100%',
            letterSpacing: '-0.02em',
            fontWeight: '500',
            fontFamily: 'NotoSans-Medium',
          },
        ],
        bn3: [
          '14px',
          {
            lineHeight: '100%',
            letterSpacing: '-0.02em',
            fontWeight: '500',
            fontFamily: 'NotoSans-Medium',
          },
        ],
      },
    },
  },
  plugins: [scrollbarHide],
};
