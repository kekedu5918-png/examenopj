'use client';

import { useEffect, useState } from 'react';

/**
 * Valeur différée pour limiter le travail sur les filtres (Phase 2D.2.a — 150 ms).
 */
export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(t);
  }, [value, delayMs]);

  return debounced;
}
