'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
import { useToast } from '@/components/ui/use-toast';
import type { Categorie, Fiche } from '@/data/fondamentaux-data';
import { groupFichesByProgramme } from '@/data/fondamentaux-display-order';
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

function programmeGroupKey(g: { fasciculeNumero: number | null }): string {
  return g.fasciculeNumero != null ? `f${g.fasciculeNumero}` : 'transverse';
}

function programmeGroupTabLabel(g: { fasciculeNumero: number | null; titre: string; fiches: Fiche[] }): string {
  const n = g.fiches.length;
  if (g.fasciculeNumero == null) {
    return `Transverses (${n})`;
  }
  return `F${g.fasciculeNumero.toString().padStart(2, '0')} (${n})`;
}

export function FondamentauxPage({ fiches, categories, contentLocked = false }: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const [filtre, setFiltre] = useState<FiltreCategorie>('all');
  const [vueOrganisation, setVueOrganisation] = useState<VueOrganisationFondamentaux>('programme');
  const [prioriteExamenOnly, setPrioriteExamenOnly] = useState(false);
  const [viewedIds, setViewedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProgrammeKey, setActiveProgrammeKey] = useState<string | null>(null);

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
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter((f) => f.titre.toLowerCase().includes(q));
    }
    return list;
  }, [fiches, filtre, prioriteExamenOnly, searchQuery]);

  const programmeGroups = useMemo(() => groupFichesByProgramme(fichesFiltrees), [fichesFiltrees]);

  useEffect(() => {
    if (vueOrganisation !== 'programme') return;
    const keys = programmeGroups.map(programmeGroupKey);
    if (keys.length === 0) return;
    setActiveProgrammeKey((prev) => (prev && keys.includes(prev) ? prev : keys[0]));
  }, [programmeGroups, vueOrganisation]);

  const activeProgrammeGroup = useMemo(() => {
    if (vueOrganisation !== 'programme' || programmeGroups.length === 0) return null;
    const k = activeProgrammeKey ?? programmeGroupKey(programmeGroups[0]);
    return programmeGroups.find((g) => programmeGroupKey(g) === k) ?? programmeGroups[0];
  }, [programmeGroups, vueOrganisation, activeProgrammeKey]);

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
    const viewed = viewedIds.has(fi.id);
    if (locked) {
      return (
        <FondamentauxPremiumGate key={fi.id} locked onBackdropClick={onPremiumBackdrop}>
          <FondamentauxCard
            fiche={fi}
            categorieLabel={cat.label}
            couleurKey={cat.couleur}
            index={index}
            locked
            viewed={viewed}
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
        viewed={viewed}
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
    <InteriorPageShell maxWidth='full' glow={SHELL_GLOW.fondamentaux} pad='none' className='min-h-[calc(100vh-4rem)]'>
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

      <div className='mx-auto max-w-6xl px-4 pb-2 pt-4 sm:px-6 lg:px-8'>
        <label htmlFor='fond-search' className='mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500'>
          Recherche par titre
        </label>
        <input
          id='fond-search'
          type='search'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Filtrer en temps réel…'
          className='w-full rounded-xl border border-white/10 bg-navy-900/80 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-500/40 focus:ring-2 focus:ring-emerald-500/15'
        />
      </div>

      <div id='fiches-gratuites' className='mx-auto max-w-6xl scroll-mt-28 px-4 py-8 sm:px-6 lg:px-8'>
        <p className='mb-6 text-center text-sm text-slate-500'>
          Ouvrez une fiche en <strong className='text-slate-300'>pleine page</strong> : parcours{' '}
          <strong className='text-slate-400'>accroche → en bref → repères → pièges → à retenir → synthèse</strong>
          , badge <strong className='font-mono text-slate-400'>F##</strong>, puis quiz et module.
        </p>
        <div key={`${filtre}-${vueOrganisation}-${searchQuery}`} className='space-y-12'>
          {vueOrganisation === 'programme' && programmeGroups.length > 0 ? (
            <div className='lg:grid lg:grid-cols-[192px_1fr] lg:items-start lg:gap-6'>
              {/* Sidebar sticky — desktop seulement */}
              <aside className='hidden lg:block'>
                <nav
                  aria-label='Fascicules F01–F15'
                  className='sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl border border-white/[0.07] bg-white/[0.02] p-3 [-ms-overflow-style:none] [scrollbar-width:thin]'
                >
                  <p className='mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-600'>Programme</p>
                  <div className='space-y-0.5'>
                    {programmeGroups.map((group) => {
                      const key = programmeGroupKey(group);
                      const active = key === (activeProgrammeKey ?? programmeGroupKey(programmeGroups[0]));
                      const viewed = group.fiches.filter((f) => viewedIds.has(f.id)).length;
                      const pct = group.fiches.length > 0 ? Math.round((viewed / group.fiches.length) * 100) : 0;
                      return (
                        <button
                          key={key}
                          type='button'
                          onClick={() => setActiveProgrammeKey(key)}
                          className={cn(
                            'flex w-full flex-col rounded-xl px-3 py-2 text-left text-xs font-medium transition',
                            active
                              ? 'bg-emerald-500/15 text-emerald-200'
                              : 'text-slate-500 hover:bg-white/[0.04] hover:text-slate-300',
                          )}
                        >
                          <span className='truncate'>{programmeGroupTabLabel(group)}</span>
                          {pct > 0 && (
                            <span className='mt-1 h-1 w-full overflow-hidden rounded-full bg-white/[0.08]'>
                              <span
                                className='block h-full rounded-full bg-emerald-500/60 transition-[width] duration-300'
                                style={{ width: `${pct}%` }}
                                aria-hidden
                              />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </nav>
              </aside>

              {/* Contenu + onglets mobiles */}
              <div className='min-w-0'>
                {/* Onglets mobile : scroll horizontal */}
                <div className='-mx-1 flex gap-2 overflow-x-auto pb-2 pt-1 [-ms-overflow-style:none] [scrollbar-width:thin] lg:hidden sm:mx-0'>
                  {programmeGroups.map((group) => {
                    const key = programmeGroupKey(group);
                    const active = key === (activeProgrammeKey ?? programmeGroupKey(programmeGroups[0]));
                    return (
                      <button
                        key={key}
                        type='button'
                        onClick={() => setActiveProgrammeKey(key)}
                        className={cn(
                          'shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition',
                          active
                            ? 'border-emerald-500/50 bg-emerald-500/15 text-emerald-100'
                            : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20 hover:text-slate-200',
                        )}
                      >
                        {programmeGroupTabLabel(group)}
                      </button>
                    );
                  })}
                </div>

                {activeProgrammeGroup ? (
                  <section aria-labelledby='sec-prog-active'>
                    <div className='mb-4 space-y-2'>
                      <div className='flex flex-wrap items-end justify-between gap-2 border-b border-white/10 pb-3'>
                        <h2 id='sec-prog-active' className='font-display text-lg font-semibold tracking-tight text-white sm:text-xl'>
                          {activeProgrammeGroup.titre}
                        </h2>
                      </div>
                      <div className='flex h-2 overflow-hidden rounded-full bg-white/[0.06]'>
                        <div
                          className='h-full rounded-full bg-emerald-500/80 transition-[width] duration-500'
                          style={{
                            width: `${activeProgrammeGroup.fiches.length ? (activeProgrammeGroup.fiches.filter((f) => viewedIds.has(f.id)).length / activeProgrammeGroup.fiches.length) * 100 : 0}%`,
                          }}
                          aria-hidden
                        />
                      </div>
                      <p className='text-xs text-slate-500'>
                        {activeProgrammeGroup.fiches.filter((f) => viewedIds.has(f.id)).length}/
                        {activeProgrammeGroup.fiches.length} fiches consultées dans ce fascicule
                      </p>
                    </div>
                    <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-3'>
                      {activeProgrammeGroup.fiches.map((fi, index) => renderCard(fi, index))}
                    </div>
                  </section>
                ) : null}
              </div>
            </div>
          ) : null}
          {vueOrganisation === 'theme'
            ? themeGroups.map((group, gi) => (
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
              ))
            : null}
        </div>

        {fichesFiltrees.length === 0 ? (
          <p className='py-16 text-center text-slate-500'>
            {searchQuery.trim()
              ? 'Aucune fiche ne correspond à cette recherche.'
              : prioriteExamenOnly
                ? 'Aucune fiche « indispensable examen » dans cette catégorie. Essayez « Tout » ou désactivez le filtre.'
                : 'Aucune fiche dans cette catégorie.'}
          </p>
        ) : null}
      </div>

      <FondamentauxCoveragePanel />
    </InteriorPageShell>
  );
}
