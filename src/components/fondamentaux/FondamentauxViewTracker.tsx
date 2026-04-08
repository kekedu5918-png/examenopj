'use client';

import { useEffect } from 'react';

import { FONDAMENTAUX_VUES_STORAGE_KEY } from './fondamentaux-theme';

/** Enregistre la fiche comme « vue » pour la jauge d’exploration sur /fondamentaux. */
export function FondamentauxViewTracker({ ficheId }: { ficheId: string }) {
  useEffect(() => {
    try {
      const raw = localStorage.getItem(FONDAMENTAUX_VUES_STORAGE_KEY);
      const arr = raw ? (JSON.parse(raw) as unknown) : [];
      if (!Array.isArray(arr)) return;
      const next = arr.filter((x): x is string => typeof x === 'string');
      if (!next.includes(ficheId)) {
        next.push(ficheId);
        localStorage.setItem(FONDAMENTAUX_VUES_STORAGE_KEY, JSON.stringify(next));
      }
    } catch {
      /* ignore */
    }
  }, [ficheId]);

  return null;
}
