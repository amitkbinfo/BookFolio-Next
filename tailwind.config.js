/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50:  '#f4f1ee',
          100: '#e8e3dc',
          200: '#d1c8ba',
          300: '#b9ad98',
          400: '#a29275',
          500: '#8b7760',
          600: '#6f5e4c',
          700: '#53463a',
          800: '#372e27',
          900: '#1c1713',
          950: '#0e0c09',
        },
        amber: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        sage: {
          50:  '#f0f4f1',
          100: '#d9e5db',
          200: '#b4cbb8',
          300: '#8db195',
          400: '#669771',
          500: '#4a7c54',
          600: '#3a6242',
          700: '#2b4931',
          800: '#1c3121',
          900: '#0e1810',
        },
        cream: '#faf8f5',
        parchment: '#f2ede5',
      },
      fontFamily: {
        serif:   ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in':     'fadeIn 0.6s ease-out',
        'slide-up':    'slideUp 0.5s ease-out',
        'float':       'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:  { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(20px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        float:   { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-10px)' } },
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
