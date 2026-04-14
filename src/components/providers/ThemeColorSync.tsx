'use client';

import { useEffect } from 'react';

import { useTheme } from '@/components/providers/ThemeProvider';

const LIGHT = '#f8fafc';
const DARK = '#0C1B33';

/**
 * Aligne la balise meta theme-color avec le thème choisi (localStorage),
 * car `viewport.themeColor` statique suit seulement prefers-color-scheme.
 */
export function ThemeColorSync() {
  const { theme } = useTheme();

  useEffect(() => {
    const content = theme === 'dark' ? DARK : LIGHT;
    document.querySelectorAll('meta[name="theme-color"]').forEach((el) => {
      el.setAttribute('content', content);
    });
  }, [theme]);

  return null;
}
