/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // UASH brand palette (extracted from live site Elementor kit)
        brand: {
          50:  '#E8ECEE',
          100: '#C2CBD0',
          200: '#8FA0A8',
          300: '#5D7580',
          400: '#36555F',
          500: '#112C35',  // primary brand accent
          600: '#0D2229',
          700: '#08181C',
          800: '#040D10',
          900: '#020607',
        },
        surface: {
          50:  '#FFFFFF',
          100: '#FAFAFA',
          200: '#F1F1F1',  // light gray surface
          300: '#E5E5E5',
          400: '#D4D4D4',
        },
        ink: {
          DEFAULT: '#202020',
          primary: '#202020',
          body:    '#333333',
          muted:   '#6B6B6B',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Playfair', 'Georgia', 'serif'],
        sans: ['"Work Sans"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
}
