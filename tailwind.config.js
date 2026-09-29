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
        
        // Veda Specific - Dark Cinematic Palette
        'veda-dark-1': '#06130C', // Base deep green
        'veda-dark-2': '#0A1D12',
        'veda-dark-3': '#0D2417',
        'veda-dark-4': '#193A27',
        'veda-ivory': '#F0EBDD',  // Typography warm ivory
        'veda-gold': '#C7A34A',   // Accent muted gold
        
        // Legacy colors kept for backward compatibility until fully refactored
        'veda-black': '#000201',
        'veda-deep-black': '#020603',
        'veda-deep-green': '#071109',
        'veda-forest': '#101C0C',
        'veda-moss': '#35401B',
        'veda-warm-highlight': '#B29B55',
        'veda-text': '#F1F0E8',
        'veda-muted-text': '#A8ADA2',
      },
      backgroundImage: {
        'veda-radial-glow': 'radial-gradient(circle at 30% 20%, #101C0C 0%, #071109 40%, #000201 100%)',
      },
      fontFamily: {
        'display': ['"Neue Montreal"', '"Helvetica Neue"', 'sans-serif'],
        'body': ['"Inter"', '"Helvetica"', 'sans-serif'],
        'veda-serif': ['"Cormorant Garamond"', 'Georgia', 'serif'],
        'veda-sans': ['"Outfit"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
