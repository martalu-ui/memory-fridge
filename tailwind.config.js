/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        body: ['"Quicksand"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        hand: ['"Caveat"', 'cursive'],
      },
      colors: {
        cream: {
          DEFAULT: '#F7F0E4',
          soft: '#FBF6EC',
          deep: '#EFE4D2',
        },
        char: {
          DEFAULT: '#2E2A24',
          soft: '#3A342C',
        },
        sage: { DEFAULT: '#AFC3A9', deep: '#8FA888' },
        blush: { DEFAULT: '#EFC3C2', deep: '#E3A5A6' },
        butter: { DEFAULT: '#F3D98B', deep: '#E8C463' },
        sky: { DEFAULT: '#A9C7D8', deep: '#87AFC4' },
        terracotta: { DEFAULT: '#E3A182', deep: '#D3855F' },
        lavender: { DEFAULT: '#C9BFDD', deep: '#AEA0CB' },
      },
      boxShadow: {
        magnet: '0 1px 2px rgba(40,30,20,0.15), 0 6px 14px -4px rgba(40,30,20,0.28)',
        'magnet-lift': '0 4px 8px rgba(40,30,20,0.18), 0 16px 28px -8px rgba(40,30,20,0.32)',
        fridge: '0 20px 60px -15px rgba(60,45,30,0.35), 0 8px 20px -8px rgba(60,45,30,0.2)',
        soft: '0 2px 10px rgba(40,30,20,0.08)',
        card: '0 20px 50px -12px rgba(40,30,20,0.35)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(0.3) rotate(-8deg)', opacity: '0' },
          '60%': { transform: 'scale(1.08) rotate(3deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(var(--rot,0deg))', opacity: '1' },
        },
      },
      animation: {
        pop: 'pop 0.55s cubic-bezier(.34,1.56,.64,1) both',
      },
    },
  },
  plugins: [],
}
