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
        neon: {
          cyan: '#00FFFF',
          'cyan-dark': '#00CCCC',
          purple: '#A855F7',
          'purple-dark': '#9333EA',
          green: '#22C55E',
          'green-dark': '#16A34A',
          pink: '#EC4899',
          'pink-dark': '#DB2777',
          yellow: '#EAB308',
          'yellow-dark': '#CA8A04',
          blue: '#00FFFF', // Alias for cyan
        },
        dark: {
          bg: '#0A0A0A',
          surface: '#1A1A1A',
          border: '#2A2A2A',
        }
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'monospace'],
        'space': ['Space Grotesk', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00FFFF, 0 0 10px #00FFFF, 0 0 15px #00FFFF' },
          '100%': { boxShadow: '0 0 10px #00FFFF, 0 0 20px #00FFFF, 0 0 30px #00FFFF' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
