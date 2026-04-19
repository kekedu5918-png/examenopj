'use client';

import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';

export type ThemeName = 'dark' | 'light';

/** Réactiver avec la Phase 1bis une fois les composants legacy migrés en light. */
export const LIGHT_MODE_ENABLED = false;

const STORAGE_KEY = 'theme';

function normalizeTheme(t: ThemeName): ThemeName {
  if (!LIGHT_MODE_ENABLED && t === 'light') return 'dark';
  return t;
}

type ThemeContextValue = {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyDomTheme(theme: ThemeName) {
  if (typeof document === 'undefined') return;
  const resolved = normalizeTheme(theme);
  document.documentElement.classList.toggle('dark', resolved === 'dark');
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setThemeState] = useState<ThemeName>('dark');

  const setTheme = useCallback((t: ThemeName) => {
    const resolved = normalizeTheme(t);
    setThemeState(resolved);
    try {
      localStorage.setItem(STORAGE_KEY, resolved);
    } catch {
      /* ignore */
    }
    applyDomTheme(resolved);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const rawNext: ThemeName = prev === 'dark' ? 'light' : 'dark';
      const next = normalizeTheme(rawNext);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
      applyDomTheme(next);
      return next;
    });
  }, []);

  useLayoutEffect(() => {
    let initial: ThemeName = 'dark';
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') initial = stored;
    } catch {
      /* ignore */
    }
    const resolved = normalizeTheme(initial);
    setThemeState(resolved);
    applyDomTheme(resolved);
    if (resolved !== initial) {
      try {
        localStorage.setItem(STORAGE_KEY, resolved);
      } catch {
        /* ignore */
      }
    }
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme doit être utilisé dans ThemeProvider');
  }
  return ctx;
}
