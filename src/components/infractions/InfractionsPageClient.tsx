'use client';

import { type RefObject, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { BookOpen, MessageCircle } from 'lucide-react';

import { ContentReviewStrip } from '@/components/content/ContentReviewStrip';
import { FlashcardRichText } from '@/components/flashcards/flashcard-rich-text';
import { MOTION_INITIAL_FOR_SEO } from '@/components/home/motion';
import { InfractionDetailBubble } from '@/components/infractions/InfractionDetailBubble';
import { InfractionsFlashMode } from '@/components/infractions/InfractionsFlashMode';
import { InfractionsTable } from '@/components/infractions/InfractionsTable';
import { type InfractionsViewMode, parseInfractionsVue, ViewToggle } from '@/components/infractions/ViewToggle';
import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import {
  INFRACTION_FAMILY_OPTIONS,
  type InfractionFamily,
  matchesInfractionFamily,
} from '@/data/infractions-family-filter';
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

function flashcardsHrefForRecapFilter(f: RecapFasciculeFilter): string {
  if (f === 'all') return '/flashcards';
  if (f === 'f01p1' || f === 'f01p2') return '/flashcards?f=1';
  const n = { f02: 2, f03: 3, f04: 4, f05: 5, f06: 6, f07: 7 }[f] as number | undefined;
  if (typeof n === 'number') return `/flashcards?f=${n}`;
  return '/flashcards';
}

function flashcardsFilterLabel(f: RecapFasciculeFilter): string {
  if (f === 'all') return 'tout le programme';
  if (f === 'f01p1') return 'F01 · P1';
  if (f === 'f01p2') return 'F01 · P2';
  return f.toUpperCase();
}

function matchesInfractionFascicleFilter(item: InfractionCatalogItem, filter: RecapFasciculeFilter): boolean {
  if (filter === 'all') return true;
  if (filter === 'f01p1') return item.fascicule === 'F01' && item.fasciculePart === 'Partie 1';
  if (filter === 'f01p2') return item.fascicule === 'F01' && item.fasciculePart === 'Partie 2';
  return item.fascicule === FASCICULE_FILTER_MAP[filter];
}

/** Séparateur de clé groupe (peu probable dans les titres catalogue). */
const LIST_GROUP_SEP = '\u{001e}';

function listGroupValue(item: InfractionCatalogItem): string {
  return [item.fascicule, item.fasciculePart ?? '', item.groupTitle].join(LIST_GROUP_SEP);
}

/** Regroupe par thème et trie comme le référentiel (ordre fascicule / section), pas par priorité examen. */
function groupFilteredForListAccordion(
  items: InfractionCatalogItem[],
  catalogOrder: Map<string, number>,
) {
  const map = new Map<string, InfractionCatalogItem[]>();
  for (const item of items) {
    const v = listGroupValue(item);
    const arr = map.get(v) ?? [];
    arr.push(item);
    map.set(v, arr);
  }
  const entries = [...map.entries()].sort(([, groupA], [, groupB]) => {
    const idxA = Math.min(...groupA.map((i) => catalogOrder.get(i.id) ?? 99999));
    const idxB = Math.min(...groupB.map((i) => catalogOrder.get(i.id) ?? 99999));
    return idxA - idxB;
  });
  return entries.map(([value, groupItems]) => {
    const sortedItems = [...groupItems].sort(
      (a, b) => (catalogOrder.get(a.id) ?? 0) - (catalogOrder.get(b.id) ?? 0),
    );
    const [fa, pa, theme] = value.split(LIST_GROUP_SEP);
    const partLabel = pa ? ` · ${pa}` : '';
    return {
      value,
      items: sortedItems,
      triggerTitle: `${fa}${partLabel} — ${theme}`,
    };
  });
}

type InfractionsPageClientProps = {
  initialQuery?: string;
};

export function InfractionsPageClient({ initialQuery = '' }: InfractionsPageClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(initialQuery);
  const [fascFilter, setFascFilter] = useState<RecapFasciculeFilter>('all');
  const [familyFilter, setFamilyFilter] = useState<InfractionFamily>('all');
  const [prioriteTier, setPrioriteTier] = useState<RecapPriorite | 'all'>('all');
  const [selected, setSelected] = useState<InfractionCatalogItem | null>(null);
  const [deepLinkReady, setDeepLinkReady] = useState(false);

  const vue = useMemo(() => parseInfractionsVue(searchParams.get('vue')) ?? 'liste', [searchParams]);
  const focusId = searchParams.get('focus');

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

  const catalog = useMemo(() => enrichInfractionCatalog(getInfractionsCatalog()), []);

  const catalogIndex = useMemo(() => {
    const m = new Map<string, number>();
    catalog.forEach((item, i) => m.set(item.id, i));
    return m;
  }, [catalog]);

  useEffect(() => {
    if (typeof window === 'undefined' || catalog.length === 0) return;
    const id = new URLSearchParams(window.location.search).get('inf');
    if (id) {
      const found = catalog.find((x) => x.id === id);
      if (found) setSelected(found);
    }
    setDeepLinkReady(true);
  }, [catalog]);

  useEffect(() => {
    if (typeof window === 'undefined' || !deepLinkReady) return;
    const u = new URL(window.location.href);
    if (selected) u.searchParams.set('inf', selected.id);
    else u.searchParams.delete('inf');
    const nextPath = `${u.pathname}${u.search}${u.hash}`;
    if (nextPath !== `${window.location.pathname}${window.location.search}${window.location.hash}`) {
      window.history.replaceState(null, '', nextPath);
    }
  }, [selected, deepLinkReady]);

  const flashSessionHref = useMemo(() => flashcardsHrefForRecapFilter(fascFilter), [fascFilter]);
  const flashLabel = useMemo(() => flashcardsFilterLabel(fascFilter), [fascFilter]);

  const filtered = useMemo(() => {
    const q = stripForSearch(query.trim());
    const list = catalog.filter((item) => {
      if (!matchesInfractionFamily(item, familyFilter)) return false;
      if (!matchesInfractionFascicleFilter(item, fascFilter)) return false;
      if (prioriteTier !== 'all' && (item.priorite ?? 'secours') !== prioriteTier) return false;
      if (!q) return true;
      const hay = `${stripForSearch(item.infraction)} ${stripForSearch(item.legal)} ${stripForSearch(item.groupTitle)} ${stripForSearch(item.materiel)} ${stripForSearch(item.moral)}`;
      return hay.includes(q);
    });
    const byCatalogOrder = (a: InfractionCatalogItem, b: InfractionCatalogItem) =>
      (catalogIndex.get(a.id) ?? 0) - (catalogIndex.get(b.id) ?? 0);
    if (prioriteTier === 'all') {
      return list.sort(byCatalogOrder);
    }
    return list.sort((a, b) => {
      const pa = PRIORITE_ORDER[(a.priorite ?? 'secours') as RecapPriorite];
      const pb = PRIORITE_ORDER[(b.priorite ?? 'secours') as RecapPriorite];
      if (pa !== pb) return pa - pb;
      return byCatalogOrder(a, b);
    });
  }, [catalog, catalogIndex, query, fascFilter, familyFilter, prioriteTier]);

  const openInListe = (id: string) => {
    const p = new URLSearchParams(searchParams.toString());
    p.set('vue', 'liste');
    p.set('focus', id);
    router.replace(`${pathname}?${p.toString()}`, { scroll: false });
  };

  const listRef = useRef<HTMLDivElement>(null);

  return (
    <InteriorPageShell maxWidth='6xl' glow='rose' pad='default'>
      <h1 className='sr-only'>Référentiel des infractions</h1>
      <SectionTitle
        badge='RÉFÉRENTIEL'
        badgeClassName='text-rose-200'
        title='Infractions'
        titleGradient
        size='display'
        subtitle='55 infractions à maîtriser pour l’épreuve 1. Pour chacune : élément légal, matériel, moral et repères d’examen. Utilise le filtre par fascicule et la recherche pour cibler tes révisions. Familles (personnes, biens…) et probabilité à l’examen : le plus attendu d’abord.'
        className='mb-6'
      />

      <ViewToggle className='mb-6' />

      <ContentReviewStrip className='mb-8' />

      <GlassCard radius='3xl' topGlow className='mb-8 space-y-4 p-6' padding=''>
        <div className='flex flex-col gap-4 lg:flex-row lg:items-end'>
          <div className='min-w-0 flex-1 space-y-2'>
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
          <div className='w-full shrink-0 space-y-1 lg:w-56'>
            <label htmlFor='inf-strate' className='text-xs font-medium text-gray-500'>
              Probabilité à l’examen
            </label>
            <select
              id='inf-strate'
              value={prioriteTier}
              onChange={(e) => setPrioriteTier(e.target.value as RecapPriorite | 'all')}
              className='w-full rounded-xl border border-white/10 bg-navy-900/90 px-3 py-3 text-sm text-gray-100 outline-none focus:border-amber-500/40 focus:ring-2 focus:ring-amber-500/20'
            >
              <option value='all'>Toutes (ordre référentiel F01–F07)</option>
              <option value='core'>Uniquement prioritaires</option>
              <option value='freq'>Uniquement très probables</option>
              <option value='secours'>Uniquement à sécuriser</option>
            </select>
          </div>
        </div>
        <div>
          <p className='mb-2 text-xs font-medium text-gray-500'>Famille d’infractions</p>
          <p className='mb-2 text-[11px] text-gray-600'>Regroupement lisible : personnes, biens, route, etc. (croise avec le fascicule ci‑dessous si besoin.)</p>
          <div className='flex flex-wrap gap-2'>
            {INFRACTION_FAMILY_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type='button'
                title={opt.hint}
                onClick={() => setFamilyFilter(opt.id)}
                className={`rounded-xl border px-3 py-2 text-left text-sm font-medium transition ${
                  familyFilter === opt.id
                    ? 'border-rose-500/50 bg-rose-500/15 text-rose-50'
                    : 'border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/20'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className='mb-2 text-xs font-medium text-gray-500'>Affiner par fascicule (programme officiel)</p>
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
        <div className='flex flex-col gap-3 rounded-xl border border-emerald-500/25 bg-emerald-950/35 p-4 sm:flex-row sm:items-center sm:justify-between'>
          <p className='text-sm text-gray-300'>
            Chaque session flashcards est <strong className='text-emerald-200'>mélangée</strong> : complète la lecture ligne par ligne
            ici, puis enchaîne pour ancrer L / M / M.
          </p>
          <div className='flex flex-shrink-0 flex-wrap gap-2'>
            <Link
              href={flashSessionHref}
              className='inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-emerald-500'
            >
              Session flashcards ({flashLabel})
            </Link>
            <Link
              href='/cours/enquetes'
              className='inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-center text-sm font-medium text-gray-200 hover:bg-white/10'
            >
              Alpha / Bravo
            </Link>
          </div>
        </div>
        <p className='flex flex-wrap items-center gap-2 text-sm text-gray-500'>
          <BookOpen className='h-4 w-4 text-amber-400/80' aria-hidden />
          <span>
            {filtered.length} infraction{filtered.length > 1 ? 's' : ''}
            {prioriteTier === 'all'
              ? ' — ordre : référentiel officiel (fascicule / thème), comme dans le programme'
              : ' — filtre strate actif ; sous-ordre : référentiel officiel'}
          </span>
        </p>
      </GlassCard>

      <InfractionsViewBody
        vue={vue}
        filtered={filtered}
        catalogIndex={catalogIndex}
        focusId={focusId}
        listRef={listRef}
        openInListe={openInListe}
        selected={selected}
        setSelected={setSelected}
      />

      {filtered.length === 0 ? (
        <p className='py-12 text-center text-gray-500'>Aucune infraction ne correspond à ta recherche.</p>
      ) : null}
    </InteriorPageShell>
  );
}

function InfractionsListView({
  filtered,
  catalogIndex,
  focusId,
  listRef,
  selected,
  setSelected,
}: {
  filtered: InfractionCatalogItem[];
  catalogIndex: Map<string, number>;
  focusId: string | null;
  listRef: RefObject<HTMLDivElement>;
  selected: InfractionCatalogItem | null;
  setSelected: (v: InfractionCatalogItem | null) => void;
}) {
  const groups = useMemo(
    () => groupFilteredForListAccordion(filtered, catalogIndex),
    [filtered, catalogIndex],
  );
  const [openValues, setOpenValues] = useState<string[]>([]);

  useEffect(() => {
    if (!focusId) return;
    const item = filtered.find((i) => i.id === focusId);
    if (!item) return;
    const v = listGroupValue(item);
    setOpenValues((prev) => (prev.includes(v) ? prev : [...prev, v]));
  }, [focusId, filtered]);

  useEffect(() => {
    if (!focusId) return;
    const id = `infraction-row-${focusId}`;
    const scroll = () => document.getElementById(id)?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    scroll();
    const t = window.setTimeout(scroll, 220);
    return () => clearTimeout(t);
  }, [focusId, openValues, filtered]);

  return (
    <>
      <InfractionDetailBubble
        item={selected}
        open={selected !== null}
        onOpenChange={(o) => {
          if (!o) setSelected(null);
        }}
      />

      <div ref={listRef} className='space-y-4'>
        <Accordion type='multiple' value={openValues} onValueChange={setOpenValues} className='space-y-3'>
          {groups.map((g, groupIndex) => (
            <AccordionItem
              key={g.value}
              value={g.value}
              className='overflow-hidden rounded-2xl border border-white/10 border-b-0 bg-navy-950/40'
            >
              <AccordionTrigger className='px-4 py-3 text-left text-base hover:no-underline'>
                <span className='font-sans font-semibold text-white'>{g.triggerTitle}</span>
                <span className='ml-2 shrink-0 text-xs font-normal text-gray-500'>({g.items.length})</span>
              </AccordionTrigger>
              <AccordionContent className='px-3 pb-4 pt-0'>
                <div className='space-y-3'>
                  {g.items.map((item, itemIndex) => {
                    const index =
                      groups.slice(0, groupIndex).reduce((s, x) => s + x.items.length, 0) + itemIndex;
                    const pTier = (item.priorite ?? 'secours') as RecapPriorite;
                    const badge = PRIORITE_EXAMEN_BADGE[pTier];
                    const isFocused = focusId === item.id;
                    return (
                      <motion.div
                        id={`infraction-row-${item.id}`}
                        key={item.id}
                        initial={MOTION_INITIAL_FOR_SEO}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.28,
                          delay: Math.min(index * 0.02, 0.35),
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                      >
                        <article
                          className={cn(
                            'rounded-2xl border bg-gradient-to-br from-navy-950/90 via-navy-950/70 to-navy-950/50 shadow-lg',
                            'transition-[box-shadow,border-color,transform] duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-950/20',
                            isFocused
                              ? 'border-[#4F6EF7] ring-2 ring-[#4F6EF7]/50 hover:border-[#4F6EF7]'
                              : 'border-white/10 hover:border-amber-500/25',
                          )}
                        >
                          <div className='flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between'>
                            <div className='min-w-0 flex-1'>
                              <button
                                type='button'
                                onClick={() => setSelected(item)}
                                className='group w-full rounded-xl text-left transition-colors hover:bg-white/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50'
                              >
                                <div className='flex gap-3'>
                                  <span
                                    className='mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-300 transition group-hover:border-amber-400/50 group-hover:bg-amber-500/20'
                                    aria-hidden
                                  >
                                    <MessageCircle className='h-4 w-4' />
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
                                    <p className='text-xs font-medium text-amber-400/90'>
                                      Ouvrir la fiche en bulle → matériel, moral, Légifrance
                                    </p>
                                  </div>
                                </div>
                              </button>
                            </div>

                            <div className='flex shrink-0 flex-col gap-2 sm:items-end sm:pt-1'>
                              {item.flashcardsCat ? (
                                <Link
                                  href={`/flashcards?cat=${item.flashcardsCat}`}
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
                      </motion.div>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
}

function InfractionsViewBody({
  vue,
  filtered,
  catalogIndex,
  focusId,
  listRef,
  openInListe,
  selected,
  setSelected,
}: {
  vue: InfractionsViewMode;
  filtered: InfractionCatalogItem[];
  catalogIndex: Map<string, number>;
  focusId: string | null;
  listRef: RefObject<HTMLDivElement>;
  openInListe: (id: string) => void;
  selected: InfractionCatalogItem | null;
  setSelected: (v: InfractionCatalogItem | null) => void;
}) {
  return (
    <>
      {vue === 'tableau' ? <InfractionsTable rows={filtered} onOpenInListe={openInListe} /> : null}

      {vue === 'liste' ? (
        <InfractionsListView
          filtered={filtered}
          catalogIndex={catalogIndex}
          focusId={focusId}
          listRef={listRef}
          selected={selected}
          setSelected={setSelected}
        />
      ) : null}

      {vue === 'flashcard' ? <InfractionsFlashMode filtered={filtered} /> : null}
    </>
  );
}
