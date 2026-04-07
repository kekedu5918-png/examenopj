'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useToast } from '@/components/ui/use-toast';
import type { Categorie, Fiche } from '@/data/fondamentaux-data';
import { groupFichesByProgramme } from '@/data/fondamentaux-display-order';
import { getEstimatedMinutesForFiche } from '@/data/fondamentaux-quiz-href';
import { cn } from '@/utils/cn';

import {
  CAT_ORDER,
  FONDAMENTAUX_VUES_STORAGE_KEY,
  FREEMIUM_UNLOCKED_IDS,
} from './fondamentaux-theme';
import { FondamentauxCard } from './FondamentauxCard';
import { FondamentauxCoveragePanel } from './FondamentauxCoveragePanel';
import { type FiltreCategorie, FondamentauxFilters, type VueOrganisationFondamentaux } from './FondamentauxFilters';
import { FondamentauxHero } from './FondamentauxHero';
import { FondamentauxPremiumGate } from './FondamentauxPremiumGate';
import { FondamentauxStructuredIntro } from './FondamentauxStructuredIntro';

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
  const [vueOrganisation, setVueOrganisation] = useState<VueOrganisationFondamentaux>('programme');
  const [prioriteExamenOnly, setPrioriteExamenOnly] = useState(false);
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
    let list = fiches.filter((f) => filtre === 'all' || f.categorie === filtre);
    if (prioriteExamenOnly) {
      list = list.filter((f) => f.indispensableExamen);
    }
    return list;
  }, [fiches, filtre, prioriteExamenOnly]);

  const programmeGroups = useMemo(() => groupFichesByProgramme(fichesFiltrees), [fichesFiltrees]);

  const themeGroups = useMemo(() => {
    const m = new Map<Categorie, Fiche[]>();
    for (const f of fichesFiltrees) {
      m.set(f.categorie, [...(m.get(f.categorie) ?? []), f]);
    }
    return CAT_ORDER.map((c) => ({
      categorie: c,
      label: categories[c].label,
      couleurKey: categories[c].couleur,
      fiches: [...(m.get(c) ?? [])].sort((a, b) => {
        if (Boolean(b.indispensableExamen) !== Boolean(a.indispensableExamen)) {
          return a.indispensableExamen ? -1 : 1;
        }
        return a.titre.localeCompare(b.titre, 'fr', { sensitivity: 'base' });
      }),
    })).filter((g) => g.fiches.length > 0);
  }, [fichesFiltrees, categories]);

  const renderCard = (fi: Fiche, index: number) => {
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
            estimatedMinutes={getEstimatedMinutesForFiche(fi)}
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
        estimatedMinutes={getEstimatedMinutesForFiche(fi)}
      />
    );
  };

  const onPremiumBackdrop = useCallback(() => {
    toast({
      title: 'Contenu Premium',
      description: 'Abonnez-vous pour accéder à toutes les fiches fondamentales.',
    });
  }, [toast]);

  return (
    <div className='min-h-[calc(100vh-4rem)] bg-navy-950'>
      <FondamentauxStructuredIntro />
      <FondamentauxHero fiches={fiches} categories={categories} viewedCount={viewedIds.size} />
      <FondamentauxFilters
        fiches={fiches}
        categories={categories}
        value={filtre}
        onChange={setFiltre}
        vueOrganisation={vueOrganisation}
        onVueOrganisationChange={setVueOrganisation}
        prioriteExamenOnly={prioriteExamenOnly}
        onPrioriteExamenOnlyChange={setPrioriteExamenOnly}
      />

      <div id='fiches-gratuites' className='mx-auto max-w-6xl scroll-mt-28 px-4 py-8 sm:px-6 lg:px-8'>
        <p className='mb-6 text-center text-sm text-slate-500'>
          Ouvrez une fiche en <strong className='text-slate-300'>pleine page</strong> : parcours{' '}
          <strong className='text-slate-400'>accroche → en bref → repères → pièges → à retenir → synthèse</strong>
          , badge <strong className='font-mono text-slate-400'>F##</strong>, puis quiz et module.
        </p>
        <div key={`${filtre}-${vueOrganisation}`} className='space-y-12'>
          {vueOrganisation === 'programme'
            ? programmeGroups.map((group, gi) => (
                <section key={group.fasciculeNumero ?? `hors-${gi}`} aria-labelledby={`sec-prog-${gi}`}>
                  <div className='mb-5 flex flex-wrap items-end justify-between gap-2 border-b border-white/10 pb-3'>
                    <h2
                      id={`sec-prog-${gi}`}
                      className='font-display text-lg font-semibold tracking-tight text-white sm:text-xl'
                    >
                      {group.titre}
                    </h2>
                    <span className='text-xs tabular-nums text-slate-500'>
                      {group.fiches.length} fiche{group.fiches.length > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3'>
                    {group.fiches.map((fi, index) => renderCard(fi, gi * 50 + index))}
                  </div>
                </section>
              ))
            : themeGroups.map((group, gi) => (
                <section key={group.categorie} aria-labelledby={`sec-theme-${group.categorie}`}>
                  <div className='mb-5 flex flex-wrap items-end justify-between gap-2 border-b border-white/10 pb-3'>
                    <h2
                      id={`sec-theme-${group.categorie}`}
                      className='font-display text-lg font-semibold tracking-tight text-white sm:text-xl'
                    >
                      {group.label}
                    </h2>
                    <span className='text-xs tabular-nums text-slate-500'>
                      {group.fiches.length} fiche{group.fiches.length > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3'>
                    {group.fiches.map((fi, index) => renderCard(fi, gi * 50 + index))}
                  </div>
                </section>
              ))}
        </div>

        {fichesFiltrees.length === 0 ? (
          <p className='py-16 text-center text-slate-500'>
            {prioriteExamenOnly
              ? 'Aucune fiche « indispensable examen » dans cette catégorie. Essayez « Tout » ou désactivez le filtre.'
              : 'Aucune fiche dans cette catégorie.'}
          </p>
        ) : null}
      </div>

      <FondamentauxCoveragePanel />
    </div>
  );
}
