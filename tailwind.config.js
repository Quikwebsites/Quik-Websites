/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-futura-pt)',
      },

      colors: {
        darkGreen: '#16240D',
        lightGreen: '#B6F4D0',
        midGreen: '#739A88',

        textDark: '#1E1E1E',

        greenGradientColor1: '#15D866',
        greenGradientColor2: '#079844',

        success5: '#F0FDF4',
        success50: '#22C55E',
        destructive5: '#FFF1F2',
        destructive50: '#F43F5E',
        warning5: '#FFFBEB',
        warning50: '#F59E0B',
        brand5: '#EEF2FF',
        brand50: '#4F46E5',

        gray5: '#F8FAFC',
        gray20: '#E2E8F0',
        gray30: '#CBD5E1',
        gray40: '#94A3B8',
        gray60: '#475569',
        gray80: '#1E293B',
        gray200: '#E3E8EF',
        gray300: '#F4F7FE',
        gray500: '#E0E5F2',
        gray600: '#A3AED0',
        gray900: '#111729',

        // background: 'var(--background)',
        // foreground: 'var(--foreground)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
