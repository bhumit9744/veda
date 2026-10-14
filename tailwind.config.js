/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#9b7b5a',
        'primary-hover': '#7c6248',
        secondary: '#f8f6f4',
        'text-dark': '#000000',
        'text-light': '#3a3a3a',
        'brand-gold': '#9a7c4f',
        'bg-beige': '#f5f3f0',
        
        // Veda Specific - Light Theme Palette
        'veda-ivory': '#F4F1E8',
        'veda-limestone': '#EAE5D8',
        'veda-white': '#FAF9F5',
        'veda-forest': '#18231D',
        'veda-deep-olive': '#394636',
        'veda-olive': '#66745B',
        'veda-text-secondary': '#687067',
        'veda-text-muted': '#8D9188',
        'veda-gold': '#B59A68',
        'veda-gold-light': '#D8C9A7',
        'veda-border': '#D8D3C6',
        'veda-soft-green': '#E4E8DE',

        // Veda Specific from remote
        'veda-base': '#F2EEE6',
        'veda-earth': '#8C7C6D',
        'veda-accent': '#9b7b5a',
      },
      backgroundImage: {
        'veda-radial-glow': 'radial-gradient(circle at 30% 20%, #101C0C 0%, #071109 40%, #000201 100%)',
      },
      fontFamily: {
        'codec': ['"Codec Pro"', '"Codec"', '"Outfit"', 'sans-serif'],
        'sans': ['"Codec Pro"', '"Codec"', '"Outfit"', 'sans-serif'],
        'display': ['"Codec Pro"', '"Codec"', '"Outfit"', 'sans-serif'],
        'body': ['"Codec Pro"', '"Codec"', '"Outfit"', 'sans-serif'],
        'serif': ['"Codec Pro"', '"Codec"', '"Outfit"', 'sans-serif'],
        'editorial': ['"Codec Pro"', '"Codec"', '"Outfit"', 'sans-serif'],
        'bebas': ['"Codec Pro"', '"Codec"', '"Outfit"', 'sans-serif'],
        'veda-serif': ['"Codec Pro"', '"Codec"', '"Outfit"', 'sans-serif'],
        'veda-sans': ['"Codec Pro"', '"Codec"', '"Outfit"', 'sans-serif']
      }
    },
  },
  plugins: [],
}
