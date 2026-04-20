'use client';

import { useCallback, useEffect, useState } from 'react';

export const INFRACTION_MAITRISE_STORAGE_KEY = 'opj-infractions-maitrise-v1' as const;

type MaitrisePayload = { v: 1; ids: string[] };

function parsePayload(raw: string | null): Set<string> {
  if (!raw) return new Set();
  try {
    const p = JSON.parse(raw) as MaitrisePayload;
    if (p?.v === 1 && Array.isArray(p.ids)) return new Set(p.ids);
  } catch {
    /* ignore */
  }
  return new Set();
}

/**
 * Persistance « Je maîtrise » par id d’infraction — hydratation après mount (pas de mismatch SSR).
 */
export function useInfractionMaitrise() {
  const [ids, setIds] = useState<Set<string> | null>(null);

  useEffect(() => {
    setIds(parsePayload(typeof window !== 'undefined' ? localStorage.getItem(INFRACTION_MAITRISE_STORAGE_KEY) : null));
  }, []);

  const toggle = useCallback((id: string) => {
    setIds((prev) => {
      const base = prev ?? new Set<string>();
      const next = new Set(base);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        const payload: MaitrisePayload = { v: 1, ids: [...next] };
        localStorage.setItem(INFRACTION_MAITRISE_STORAGE_KEY, JSON.stringify(payload));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const has = useCallback((id: string) => ids?.has(id) ?? false, [ids]);

  return { ready: ids !== null, has, toggle };
}
