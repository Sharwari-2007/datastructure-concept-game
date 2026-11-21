/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        game: {
          bg: '#090d16',
          card: '#0f172a',
          cardLight: '#1e293b',
          border: '#1e293b',
          cyan: '#06b6d4',
          blue: '#3b82f6',
          purple: '#8b5cf6',
          neon: '#00f2fe',
          pink: '#ec4899',
          gold: '#eab308',
          success: '#10b981',
          warning: '#f59e0b',
          danger: '#ef4444'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'Consolas', 'monospace'],
        gaming: ['Rajdhani', 'Orbitron', 'sans-serif']
      },
      boxShadow: {
        'neon-cyan': '0 0 15px rgba(6, 182, 212, 0.4)',
        'neon-purple': '0 0 15px rgba(139, 92, 246, 0.4)',
        'neon-gold': '0 0 15px rgba(234, 179, 8, 0.4)',
        'glow': '0 0 25px rgba(59, 130, 246, 0.35)'
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite'
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: 1, filter: 'drop-shadow(0 0 12px rgba(6, 182, 212, 0.6))' },
          '50%': { opacity: 0.7, filter: 'drop-shadow(0 0 4px rgba(6, 182, 212, 0.2))' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' }
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      }
    },
  },
  plugins: [],
};
