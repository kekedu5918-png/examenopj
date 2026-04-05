'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useToast } from '@/components/ui/use-toast';
import type { Categorie, Fiche } from '@/data/fondamentaux-data';
import { cn } from '@/utils/cn';

import { FONDAMENTAUX_VUES_STORAGE_KEY, FREEMIUM_UNLOCKED_IDS } from './fondamentaux-theme';
import { FondamentauxCard } from './FondamentauxCard';
import { FondamentauxCoveragePanel } from './FondamentauxCoveragePanel';
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

export function FondamentauxPage({ fiches, categories, contentLocked = false }: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const [filtre, setFiltre] = useState<FiltreCategorie>('all');
  const [viewedIds, setViewedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    setViewedIds(readViewedIds());
  }, []);

  useEffect(() => {
    const refresh = () => setViewedIds(readViewedIds());
    window.addEventListener('focus', refresh);
    document.addEventListener('visibilitychange', refresh);
    return () => {
      window.removeEventListener('focus', refresh);
      document.removeEventListener('visibilitychange', refresh);
    };
  }, []);

  /** Anciens liens #fiche-… → page plein écran. */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash;
    if (!hash.startsWith('#fiche-')) return;
    const ficheId = hash.slice('#fiche-'.length);
    const fiche = fiches.find((x) => x.id === ficheId);
    if (fiche) {
      router.replace(`/fondamentaux/${ficheId}`);
    }
  }, [fiches, router]);

  const isLocked = useCallback(
    (id: string) => contentLocked && !FREEMIUM_UNLOCKED_IDS.has(id),
    [contentLocked],
  );

  const fichesFiltrees = useMemo(() => {
    return fiches.filter((f) => filtre === 'all' || f.categorie === filtre);
  }, [fiches, filtre]);

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
        <p className='mb-6 text-center text-sm text-slate-500'>
          Cliquez sur une fiche pour l’ouvrir en <strong className='text-slate-300'>pleine page</strong> (synthèse
          lisible, tableau et liens quiz / module).
        </p>
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
              />
            );
          })}
        </div>

        {fichesFiltrees.length === 0 ? (
          <p className='py-16 text-center text-slate-500'>Aucune fiche dans cette catégorie.</p>
        ) : null}
      </div>

      <FondamentauxCoveragePanel />
    </div>
  );
}
