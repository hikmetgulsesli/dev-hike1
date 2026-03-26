import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0a0a0f',
          elevated: '#111113',
          subtle: '#1a1a1f',
          overlay: 'rgba(10, 10, 15, 0.8)',
        },
        primary: {
          DEFAULT: '#10b981',
          hover: '#059669',
          muted: 'rgba(16, 185, 129, 0.2)',
        },
        accent: {
          DEFAULT: '#6366f1',
          alt: '#8b5cf6',
          muted: 'rgba(99, 102, 241, 0.2)',
        },
        text: {
          primary: '#fafafa',
          secondary: '#a1a1aa',
          muted: '#6b7280',
          inverse: '#0a0a0f',
        },
        border: {
          DEFAULT: '#27272a',
          hover: '#3f3f46',
          active: '#10b981',
        },
        success: '#22c55e',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'SF Mono', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(16, 185, 129, 0.3)',
        'glow-primary-lg': '0 0 40px rgba(16, 185, 129, 0.4)',
        'glow-accent': '0 0 20px rgba(99, 102, 241, 0.3)',
        'glow-primary-sm': '0 0 10px rgba(16, 185, 129, 0.2)',
      },
    },
  },
  plugins: [],
}
export default config
