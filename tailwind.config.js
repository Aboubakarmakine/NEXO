/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nexo-navy': '#0D1B2A',
        'nexo-teal': '#1A6B72',
        'nexo-teal-light': '#2A9A96',
        'nexo-green': '#3AAB5C',
        'nexo-green-dark': '#1F7A3D',
        'nexo-off-white': '#F7F8FA',
        'nexo-light-gray': '#E8ECF0',
        'nexo-mid-gray': '#8C9BAD',
        'nexo-amber': '#D4831A',
        'nexo-purple': '#5B4FBE',
        'nexo-silver': '#9BA8B5',
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      borderRadius: {
        'btn': '6px',
        'card': '12px',
        'input': '8px',
        'pill': '999px',
      },
      boxShadow: {
        'card': '0 4px 24px rgba(13,27,42,0.08)',
        'card-hover': '0 12px 40px rgba(13,27,42,0.14)',
        'btn': '0 4px 16px rgba(26,107,114,0.25)',
      },
      spacing: {
        'xs': '8px',
        'sm': '16px',
        'md': '24px',
        'lg': '32px',
        'xl': '48px',
        '2xl': '64px',
        '3xl': '96px',
        '4xl': '128px',
      },
    },
  },
  plugins: [],
}
