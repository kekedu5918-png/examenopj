'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useToast } from '@/components/ui/use-toast';
import type { Categorie, Fiche } from '@/data/fondamentaux-data';
import { cn } from '@/utils/cn';

import { FONDAMENTAUX_VUES_STORAGE_KEY, FREEMIUM_UNLOCKED_IDS } from './fondamentaux-theme';
import { FondamentauxCard } from './FondamentauxCard';
import { FondamentauxCoveragePanel } from './FondamentauxCoveragePanel';
import { FondamentauxDrawer } from './FondamentauxDrawer';
import { type FiltreCategorie, FondamentauxFilters } from './FondamentauxFilters';
import { FondamentauxHero } from './FondamentauxHero';
import { FondamentauxPremiumGate } from './FondamentauxPremiumGate';

interface Props {
  fiches: Fiche[];
  categories: Record<Categorie, { label: string; couleur: string }>;
  /** Utilisateur en freemium : partie des fiches floutées. */
  contentLocked?: boolean;
}

function readViewedIds(): Set<string> {
  if (typeof window === 'undefined') {
    return new Set();
  }
  try {
    const raw = localStorage.getItem(FONDAMENTAUX_VUES_STORAGE_KEY);
    if (!raw) {
      return new Set();
    }
    const arr = JSON.parse(raw) as unknown;
    if (!Array.isArray(arr)) {
      return new Set();
    }
    return new Set(arr.filter((x): x is string => typeof x === 'string'));
  } catch {
    return new Set();
  }
}

function persistViewedIds(ids: Set<string>) {
  try {
    localStorage.setItem(FONDAMENTAUX_VUES_STORAGE_KEY, JSON.stringify([...ids]));
  } catch {
    /* ignore */
  }
}

export function FondamentauxPage({ fiches, categories, contentLocked = false }: Props) {
  const { toast } = useToast();
  const [filtre, setFiltre] = useState<FiltreCategorie>('all');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerFiche, setDrawerFiche] = useState<Fiche | null>(null);
  const [viewedIds, setViewedIds] = useState<Set<string>>(new Set());
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setViewedIds(readViewedIds());
  }, []);

  useEffect(
    () => () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    },
    []
  );

  /** Lien profond `/fondamentaux#fiche-…` : afficher la bonne catégorie puis faire défiler jusqu’à la carte. */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash;
    if (!hash.startsWith('#fiche-')) return;
    const ficheId = hash.slice('#fiche-'.length);
    const fiche = fiches.find((x) => x.id === ficheId);
    if (fiche) setFiltre(fiche.categorie);
  }, [fiches]);

  const isLocked = useCallback(
    (id: string) => contentLocked && !FREEMIUM_UNLOCKED_IDS.has(id),
    [contentLocked]
  );

  const fichesFiltrees = useMemo(() => {
    return fiches.filter((f) => filtre === 'all' || f.categorie === filtre);
  }, [fiches, filtre]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const id = window.location.hash.slice(1);
    if (!id.startsWith('fiche-')) return;
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 280);
    return () => window.clearTimeout(t);
  }, [fichesFiltrees, filtre]);

  const registerView = useCallback((id: string) => {
    setViewedIds((prev) => {
      if (prev.has(id)) {
        return prev;
      }
      const next = new Set(prev);
      next.add(id);
      persistViewedIds(next);
      return next;
    });
  }, []);

  const openDrawer = useCallback(
    (fiche: Fiche, fromEl: HTMLElement | null) => {
      if (isLocked(fiche.id)) {
        return;
      }
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      returnFocusRef.current = fromEl;
      registerView(fiche.id);
      setDrawerFiche(fiche);
      setDrawerOpen(true);
    },
    [isLocked, registerView]
  );

  const onDrawerOpenChange = useCallback((open: boolean) => {
    setDrawerOpen(open);
    if (!open) {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
      closeTimerRef.current = setTimeout(() => {
        setDrawerFiche(null);
        closeTimerRef.current = null;
      }, 320);
    } else if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const onPremiumBackdrop = useCallback(() => {
    toast({
      title: 'Contenu Premium',
      description: 'Abonnez-vous pour accéder à toutes les fiches fondamentales.',
    });
  }, [toast]);

  return (
    <div className='min-h-[calc(100vh-4rem)] bg-navy-950'>
      <FondamentauxHero fiches={fiches} categories={categories} viewedCount={viewedIds.size} />
      <FondamentauxFilters fiches={fiches} categories={categories} value={filtre} onChange={setFiltre} />

      <div className='mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8'>
        <div
          key={filtre}
          className={cn('grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3')}
        >
          {fichesFiltrees.map((fi, index) => {
            const cat = categories[fi.categorie];
            const locked = isLocked(fi.id);
            if (locked) {
              return (
                <FondamentauxPremiumGate key={fi.id} locked onBackdropClick={onPremiumBackdrop}>
                  <FondamentauxCard
                    fiche={fi}
                    categorieLabel={cat.label}
                    couleurKey={cat.couleur}
                    index={index}
                    locked
                  />
                </FondamentauxPremiumGate>
              );
            }
            return (
              <FondamentauxCard
                key={fi.id}
                fiche={fi}
                categorieLabel={cat.label}
                couleurKey={cat.couleur}
                index={index}
                onOpen={(el) => openDrawer(fi, el)}
              />
            );
          })}
        </div>

        {fichesFiltrees.length === 0 ? (
          <p className='py-16 text-center text-slate-500'>Aucune fiche dans cette catégorie.</p>
        ) : null}
      </div>

      <FondamentauxCoveragePanel />

      {drawerFiche ? (
        <FondamentauxDrawer
          fiche={drawerFiche}
          open={drawerOpen}
          onOpenChange={onDrawerOpenChange}
          categories={categories}
          returnFocusRef={returnFocusRef}
        />
      ) : null}
    </div>
  );
}
