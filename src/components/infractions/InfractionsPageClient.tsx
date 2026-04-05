'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, ChevronDown } from 'lucide-react';

import { FlashcardRichText } from '@/components/flashcards/flashcard-rich-text';
import { RecapBulletCell } from '@/components/recapitulatif/RecapBulletCell';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import {
  getInfractionsCatalog,
  type InfractionCatalogItem,
  infractionToRecapFilter,
  PRIORITE_EXAMEN_BADGE,
  PRIORITE_ORDER,
  type RecapFasciculeFilter,
  type RecapFasciculeId,
  type RecapPriorite,
} from '@/data/recapitulatif-data';
import { cn } from '@/utils/cn';
import { enrichInfractionCatalog } from '@/utils/enrich-infractions-catalog';

function stripForSearch(s: string): string {
  return s
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .toLowerCase();
}

const FASCICULE_FILTER_MAP: Record<Exclude<RecapFasciculeFilter, 'all' | 'f01p1' | 'f01p2'>, RecapFasciculeId> = {
  f02: 'F02',
  f03: 'F03',
  f04: 'F04',
  f05: 'F05',
  f06: 'F06',
  f07: 'F07',
};

function matchesInfractionFascicleFilter(
  item: InfractionCatalogItem,
  filter: RecapFasciculeFilter,
): boolean {
  if (filter === 'all') return true;
  if (filter === 'f01p1') return item.fascicule === 'F01' && item.fasciculePart === 'Partie 1';
  if (filter === 'f01p2') return item.fascicule === 'F01' && item.fasciculePart === 'Partie 2';
  return item.fascicule === FASCICULE_FILTER_MAP[filter];
}

type InfractionsPageClientProps = {
  initialQuery?: string;
};

export function InfractionsPageClient({ initialQuery = '' }: InfractionsPageClientProps) {
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const t = window.setTimeout(() => {
      const trimmed = query.trim();
      const next = new URL(window.location.href);
      if (trimmed) next.searchParams.set('q', trimmed);
      else next.searchParams.delete('q');
      const path = `${next.pathname}${next.search}`;
      if (path !== `${window.location.pathname}${window.location.search}`) {
        window.history.replaceState(null, '', path);
      }
    }, 450);
    return () => window.clearTimeout(t);
  }, [query]);
  const [fascFilter, setFascFilter] = useState<RecapFasciculeFilter>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const catalog = useMemo(() => enrichInfractionCatalog(getInfractionsCatalog()), []);

  const filtered = useMemo(() => {
    const q = stripForSearch(query.trim());
    const list = catalog.filter((item) => {
      if (!matchesInfractionFascicleFilter(item, fascFilter)) return false;
      if (!q) return true;
      const hay = `${stripForSearch(item.infraction)} ${stripForSearch(item.legal)} ${stripForSearch(item.groupTitle)} ${stripForSearch(item.materiel)} ${stripForSearch(item.moral)}`;
      return hay.includes(q);
    });
    return list.sort((a, b) => {
      const pa = PRIORITE_ORDER[(a.priorite ?? 'secours') as RecapPriorite];
      const pb = PRIORITE_ORDER[(b.priorite ?? 'secours') as RecapPriorite];
      if (pa !== pb) return pa - pb;
      const fasc = a.fascicule.localeCompare(b.fascicule);
      if (fasc !== 0) return fasc;
      return a.groupTitle.localeCompare(b.groupTitle) || a.id.localeCompare(b.id);
    });
  }, [catalog, query, fascFilter]);

  const toggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className='container pb-20 pt-10'>
      <h1 className='sr-only'>Référentiel des infractions</h1>
      <SectionTitle
        badge='RÉFÉRENTIEL'
        badgeClassName='bg-slate-500/20 text-slate-300'
        title='Infractions'
        subtitle='F01 à F07 : tri par priorité examen (à maîtriser en premier). Détail des éléments au clic — enchaîne avec flashcards et tableau récap.'
        className='mb-8'
      />

      <GlassCard className='mb-8 space-y-4 p-6' padding=''>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
          <div className='max-w-md flex-1 space-y-2'>
            <label htmlFor='inf-search' className='text-sm font-medium text-gray-300'>
              Rechercher une infraction
            </label>
            <input
              id='inf-search'
              type='search'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Ex. : extorsion, 223-1, vol…'
              className='w-full rounded-xl border border-white/10 bg-navy-900/80 px-4 py-3 text-gray-100 outline-none placeholder:text-gray-600 focus:border-amber-500/40 focus:ring-2 focus:ring-amber-500/20'
            />
          </div>
          <div className='flex flex-wrap gap-2'>
            {(
              [
                ['all', 'Tous'],
                ['f01p1', 'F01 P1'],
                ['f01p2', 'F01 P2'],
                ['f02', 'F02'],
                ['f03', 'F03'],
                ['f04', 'F04'],
                ['f05', 'F05'],
                ['f06', 'F06'],
                ['f07', 'F07'],
              ] as const
            ).map(([v, label]) => (
              <button
                key={v}
                type='button'
                onClick={() => setFascFilter(v)}
                className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${
                  fascFilter === v
                    ? 'border-amber-500/50 bg-amber-500/15 text-amber-100'
                    : 'border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/20'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <p className='flex flex-wrap items-center gap-2 text-sm text-gray-500'>
          <BookOpen className='h-4 w-4 text-amber-400/80' aria-hidden />
          <span>
            {filtered.length} infraction{filtered.length > 1 ? 's' : ''} — ordre : priorité examen → fascicule
          </span>
        </p>
      </GlassCard>

      <ul className='space-y-4'>
        {filtered.map((item: InfractionCatalogItem, index: number) => {
          const open = expandedId === item.id;
          const pTier = (item.priorite ?? 'secours') as RecapPriorite;
          const badge = PRIORITE_EXAMEN_BADGE[pTier];
          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: Math.min(index * 0.02, 0.35), ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <article className='rounded-2xl border border-white/10 bg-navy-950/50 shadow-lg transition-[box-shadow,border-color] duration-300 hover:border-amber-500/15 hover:shadow-lg hover:shadow-amber-900/10'>
                <div className='flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between'>
                  <div className='min-w-0 flex-1'>
                    <button
                      type='button'
                      onClick={() => toggle(item.id)}
                      aria-expanded={open}
                      className='group w-full rounded-xl text-left transition-colors hover:bg-white/[0.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50'
                    >
                      <div className='flex gap-3'>
                        <span
                          className={cn(
                            'mt-1 shrink-0 text-gray-500 transition-transform duration-200',
                            open && 'rotate-180',
                          )}
                          aria-hidden
                        >
                          <ChevronDown className='h-5 w-5' />
                        </span>
                        <div className='min-w-0 flex-1 space-y-2 pb-1'>
                          <p className='text-xs font-medium uppercase tracking-wide text-gray-500'>
                            {item.fascicule}
                            {item.fasciculePart ? ` · ${item.fasciculePart}` : ''} · {item.groupTitle}
                          </p>
                          <div className='flex flex-wrap items-center gap-2'>
                            <h2 className='font-display text-lg font-bold text-white md:text-xl'>
                              <FlashcardRichText text={item.infraction} inline />
                            </h2>
                            <span
                              className={cn(
                                'rounded-lg border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide',
                                badge.className,
                              )}
                            >
                              {badge.label}
                            </span>
                          </div>
                          <p className='text-sm text-gray-400'>
                            <span className='text-gray-500'>Élément légal : </span>
                            {item.legal}
                          </p>
                          <p className='text-xs text-amber-400/80'>
                            {open ? 'Masquer le détail' : 'Afficher éléments matériel, moral et repères'}
                          </p>
                        </div>
                      </div>
                    </button>

                    {open ? (
                      <div
                        id={`inf-detail-${item.id}`}
                        className='mt-4 space-y-5 border-t border-white/10 pt-4 pl-8 sm:pl-11'
                      >
                        {(item.tentative || item.complicite) && (
                          <div className='flex flex-wrap gap-2'>
                            {item.tentative ? (
                              <span className='rounded-lg border border-violet-500/35 bg-violet-500/15 px-3 py-1 text-xs font-semibold text-violet-200'>
                                Tentative : {item.tentative}
                              </span>
                            ) : null}
                            {item.complicite ? (
                              <span className='rounded-lg border border-cyan-500/35 bg-cyan-500/15 px-3 py-1 text-xs font-semibold text-cyan-200'>
                                Complicité : {item.complicite}
                              </span>
                            ) : null}
                          </div>
                        )}

                        <div>
                          <h3 className='mb-2 text-xs font-bold uppercase tracking-wide text-emerald-400/90'>
                            Élément matériel
                          </h3>
                          <RecapBulletCell text={item.materiel} />
                        </div>
                        <div>
                          <h3 className='mb-2 text-xs font-bold uppercase tracking-wide text-emerald-400/90'>
                            Élément moral
                          </h3>
                          <RecapBulletCell text={item.moral} />
                        </div>
                        {!item.tentative && !item.complicite && item.flashcardsCat ? (
                          <p className='text-xs text-gray-500'>
                            Pour tentative, complicité ou détail pédagogique complet, utilise les flashcards de la
                            catégorie.
                          </p>
                        ) : null}
                      </div>
                    ) : null}
                  </div>

                  <div className='flex shrink-0 flex-col gap-2 sm:items-end sm:pt-1'>
                    {item.flashcardsCat ? (
                      <Link
                        href={`/entrainement/flashcards?cat=${item.flashcardsCat}`}
                        onClick={(e) => e.stopPropagation()}
                        className='inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:opacity-95'
                      >
                        Réviser en flashcards
                      </Link>
                    ) : (
                      <span className='max-w-[11rem] text-right text-xs text-gray-500'>
                        Fiches sur la page Flashcards (filtre par module F).
                      </span>
                    )}
                    <Link
                      href={`/entrainement/recapitulatif?f=${infractionToRecapFilter(item)}`}
                      onClick={(e) => e.stopPropagation()}
                      className='text-center text-sm text-emerald-400/90 underline-offset-2 hover:underline'
                    >
                      Voir le tableau récapitulatif
                    </Link>
                  </div>
                </div>
              </article>
            </motion.li>
          );
        })}
      </ul>

      {filtered.length === 0 ? (
        <p className='py-12 text-center text-gray-500'>Aucune infraction ne correspond à ta recherche.</p>
      ) : null}
    </div>
  );
}
