/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#f7f7f5',
        surface: '#ffffff',
        'surface-muted': '#f1f1ee',
        text: '#171717',
        'text-muted': '#6b6b67',
        border: '#deded8',
        'border-strong': '#c9c9c1',
        primary: '#f97316',
        'primary-hover': '#ea580c',
        'primary-soft': '#fff1e8',
        success: '#16803c',
        warning: '#a16207',
        danger: '#c2410c',
        info: '#2563eb',
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        prose: '760px',
        'reading': '780px',
      },
    },
  },
  plugins: [],
};