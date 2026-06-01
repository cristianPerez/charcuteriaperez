/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(30 20% 86%)',
        input: 'hsl(30 20% 86%)',
        ring: 'hsl(22 26% 25%)',
        background: 'hsl(36 30% 94%)',
        foreground: 'hsl(24 29% 12%)',
        primary: {
          DEFAULT: 'hsl(24 29% 12%)',
          foreground: 'hsl(36 30% 94%)',
        },
        secondary: {
          DEFAULT: 'hsl(32 33% 90%)',
          foreground: 'hsl(24 29% 12%)',
        },
        muted: {
          DEFAULT: 'hsl(30 20% 92%)',
          foreground: 'hsl(24 13% 38%)',
        },
        card: {
          DEFAULT: 'hsl(0 0% 100%)',
          foreground: 'hsl(24 29% 12%)',
        },
      },
      borderRadius: {
        lg: '0.85rem',
        md: '0.65rem',
        sm: '0.45rem',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
