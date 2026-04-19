'use client';

import { useEffect } from 'react';

import { LIGHT_MODE_ENABLED, useTheme } from '@/components/providers/ThemeProvider';

/**
 * Synchronise `theme_hint` (API `/api/user-preferences`) avec le thème local.
 *
 * Règle de priorité :
 * - Si `localStorage.theme` est déjà `light` ou `dark`, on ne l’écrase pas (choix explicite sur l’appareil).
 * - Sinon, au premier chargement connecté : appliquer `theme_hint` serveur (`light` / `dark` / `system` / null).
 * - `system` ou absence de ligne : suit `prefers-color-scheme`.
 */
export function ThemeHintSync() {
  const { setTheme } = useTheme();

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        if (localStorage.getItem('theme')) return;
      } catch {
        return;
      }

      const res = await fetch('/api/user-preferences', { credentials: 'include' });
      if (!res.ok || cancelled) return;

      const data = (await res.json()) as { themeHint?: string | null };
      const hint = data.themeHint ?? null;

      if (hint === 'light' || hint === 'dark') {
        setTheme(hint);
        return;
      }

      if (!LIGHT_MODE_ENABLED) {
        setTheme('dark');
        return;
      }

      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    })();

    return () => {
      cancelled = true;
    };
  }, [setTheme]);

  return null;
}
