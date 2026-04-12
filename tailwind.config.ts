import type { Config } from 'tailwindcss';

/** @type {import('tailwindcss').Config} */
const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        navy: {
          50: '#f0f3f9',
          100: '#d9e2f0',
          200: '#b3c5e1',
          300: '#8da8d2',
          400: '#6b8fc6',
          500: '#1e3a5f',
          600: '#1a3354',
          700: '#12283e',
          800: '#0d1f33',
          900: '#0a1628',
          950: '#060e18',
        },
        gold: {
          300: '#e8c36a',
          400: '#d4a843',
          500: '#c49a38',
          600: '#a07d2e',
        },
        /** Design system ExamenOPJ — « Ordre & Maîtrise » + compat historique */
        examen: {
          canvas: '#0C1B33',
          raised: '#152238',
          card: '#152238',
          accent: '#2563EB',
          accentHover: '#3B82F6',
          premium: '#7C3AED',
          ink: '#F8FAFC',
          inkMuted: '#94A3B8',
          success: '#22C55E',
          warning: '#F59E0B',
          danger: '#EF4444',
        },
        orde: {
          navy900: '#0C1B33',
          navy800: '#152238',
          navy700: '#1E3050',
          blue500: '#2563EB',
          blue400: '#3B82F6',
          blue600: '#1D4ED8',
          gold500: '#D4A853',
          gold400: '#E5BE6A',
          slate50: '#F8FAFC',
          slate900: '#0F172A',
        },
        ds: {
          'bg-primary': 'var(--ds-bg-primary)',
          'bg-secondary': 'var(--ds-bg-secondary)',
          'bg-elevated': 'var(--ds-bg-elevated)',
          border: 'var(--ds-border)',
          'text-primary': 'var(--ds-text-primary)',
          'text-muted': 'var(--ds-text-muted)',
          accent: 'var(--ds-accent)',
          success: 'var(--ds-success)',
          warning: 'var(--ds-warning)',
        },
      },
      boxShadow: {
        'ex-card': '0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)',
        'ex-card-hover': '0 8px 32px rgba(79,110,247,0.15), 0 0 0 1px rgba(79,110,247,0.3)',
        'ex-premium-glow': '0 0 40px rgba(124,58,237,0.2)',
        'ex-blue-glow': '0 0 24px rgba(37,99,235,0.35)',
        'ex-blue-glow-lg': '0 0 48px rgba(37,99,235,0.25), 0 0 96px rgba(37,99,235,0.1)',
        'ex-glass': '0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)',
        'ex-glass-hover': '0 8px 40px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.09)',
        'ex-inset-top': 'inset 0 1px 0 rgba(255,255,255,0.08)',
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: [
          'var(--font-inter)',
          'var(--font-dm-sans)',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        display: ['var(--font-instrument-serif)', 'Georgia', 'ui-serif', 'serif'],
        body: ['var(--font-dm-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'monospace'],
        alt: ['var(--font-montserrat-alternates)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow':
          'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(37, 99, 235, 0.15), transparent)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'spin-slow': {
          '0%': { rotate: '0deg' },
          '100%': { rotate: '360deg' },
        },
        'hero-pulse-blue': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.08' },
          '50%': { transform: 'scale(1.2)', opacity: '0.11' },
        },
        'hero-pulse-gold': {
          '0%, 100%': { transform: 'scale(1.15)', opacity: '0.05' },
          '50%': { transform: 'scale(1)', opacity: '0.08' },
        },
        'scroll-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
        'countdown-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
        'ex-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'ex-shimmer': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'ex-pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.65', transform: 'scale(1.15)' },
        },
        'ex-glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 16px rgba(37,99,235,0.25)' },
          '50%': { boxShadow: '0 0 32px rgba(37,99,235,0.45)' },
        },
        'ex-fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'ex-slide-in': {
          '0%': { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'spin-slow': 'spin 10s linear infinite',
        'hero-pulse-blue': 'hero-pulse-blue 8s ease-in-out infinite',
        'hero-pulse-gold': 'hero-pulse-gold 12s ease-in-out infinite',
        'scroll-bounce': 'scroll-bounce 2s ease-in-out infinite',
        'countdown-pulse': 'countdown-pulse 3s ease-in-out infinite',
        'ex-float': 'ex-float 3s ease-in-out infinite',
        'ex-shimmer': 'ex-shimmer 2.2s linear infinite',
        shimmer: 'shimmer 2s ease-in-out infinite',
        'ex-pulse-dot': 'ex-pulse-dot 2s ease-in-out infinite',
        'ex-glow-pulse': 'ex-glow-pulse 2.5s ease-in-out infinite',
        'ex-fade-up': 'ex-fade-up 0.5s ease-out forwards',
        'ex-slide-in': 'ex-slide-in 0.4s ease-out forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};

export default config;
