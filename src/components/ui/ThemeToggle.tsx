'use client';

import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/components/providers/ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      type='button'
      onClick={toggleTheme}
      aria-label='Basculer le thème'
      aria-pressed={isDark}
      className='flex h-12 w-12 min-h-[48px] min-w-[48px] shrink-0 items-center justify-center rounded-lg border border-ds-border bg-ds-bg-secondary text-ds-text-primary shadow-sm transition-colors hover:bg-ds-bg-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ds-accent'
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
    >
      <motion.span
        key={isDark ? 'dark' : 'light'}
        initial={{ rotate: -45, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className='inline-flex'
      >
        {isDark ? (
          <Moon className='h-[18px] w-[18px]' aria-hidden />
        ) : (
          <Sun className='h-[18px] w-[18px]' aria-hidden />
        )}
      </motion.span>
    </motion.button>
  );
}
