'use client';

import { type RefObject, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, BookOpen, Check, Gavel, MessageCircle } from 'lucide-react';

import { ContentReviewStrip } from '@/components/content/ContentReviewStrip';
import { FlashcardRichText } from '@/components/flashcards/flashcard-rich-text';
import { InfractionDetailBubble } from '@/components/infractions/InfractionDetailBubble';
import { getCardVariants } from '@/components/infractions/infractions-motion';
import { InfractionsTable } from '@/components/infractions/InfractionsTable';
import { useInfractionMaitrise } from '@/components/infractions/use-infraction-maitrise';
import { type InfractionsViewMode, parseInfractionsVue, ViewToggle } from '@/components/infractions/ViewToggle';
import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
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
  type RecapPriorite,
} from '@/data/recapitulatif-data';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { cn } from '@/utils/cn';
import { enrichInfractionCatalog } from '@/utils/enrich-infractions-catalog';
import { derivePeineFromLegal, peineTierTextClass } from '@/utils/infraction-display-derive';

function stripForSearch(s: string): string {
  return s
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .toLowerCase();
}

/** Séparateur de clé groupe (peu probable dans les titres catalogue). */
const LIST_GROUP_SEP = '\u{001e}';

function listGroupValue(item: InfractionCatalogItem): string {
  return [item.fascicule, item.fasciculePart ?? '', item.groupTitle].join(LIST_GROUP_SEP);
}

/** Regroupe par thème et trie comme le référentiel officiel, pas par priorité examen. */
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
    const [, , theme] = value.split(LIST_GROUP_SEP);
    return {
      value,
      items: sortedItems,
      triggerTitle: theme ?? '',
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
  const [familyFilter, setFamilyFilter] = useState<InfractionFamily>('all');
  const [prioriteTier, setPrioriteTier] = useState<RecapPriorite | 'all'>('all');
  const [selected, setSelected] = useState<InfractionCatalogItem | null>(null);
  const [deepLinkReady, setDeepLinkReady] = useState(false);

  const debouncedQuery = useDebouncedValue(query, 150);
  const shouldReduceMotion = usePrefersReducedMotion();
  const maitrise = useInfractionMaitrise();

  const vue = useMemo(() => parseInfractionsVue(searchParams.get('vue')) ?? 'liste', [searchParams]);
  const focusId = searchParams.get('focus');

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const trimmed = debouncedQuery.trim();
    const next = new URL(window.location.href);
    if (trimmed) next.searchParams.set('q', trimmed);
    else next.searchParams.delete('q');
    const path = `${next.pathname}${next.search}`;
    if (path !== `${window.location.pathname}${window.location.search}`) {
      window.history.replaceState(null, '', path);
    }
  }, [debouncedQuery]);

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

  const filtered = useMemo(() => {
    const q = stripForSearch(debouncedQuery.trim());
    const list = catalog.filter((item) => {
      if (!matchesInfractionFamily(item, familyFilter)) return false;
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
  }, [catalog, catalogIndex, debouncedQuery, familyFilter, prioriteTier]);

  const openInListe = (id: string) => {
    const p = new URLSearchParams(searchParams.toString());
    p.set('vue', 'liste');
    p.set('focus', id);
    router.replace(`${pathname}?${p.toString()}`, { scroll: false });
  };

  const listRef = useRef<HTMLDivElement>(null);

  return (
    <InteriorPageShell maxWidth='6xl' glow={SHELL_GLOW.infractions} pad='default'>
      <SectionTitle
        badge='RÉFÉRENTIEL'
        badgeClassName='text-rose-200'
        title='Infractions'
        titleAs='h1'
        titleGradient
        size='display'
        subtitle='55 infractions à maîtriser pour l’épreuve 1. Pour chacune : élément légal, matériel, moral et repères d’examen. Filtre par famille (personnes, biens, etc.) et probabilité ; la recherche affine ta sélection.'
        className='mb-6'
      />

      <ViewToggle className='mb-6' />

      <ContentReviewStrip className='mb-8' />

      <GlassCard radius='3xl' topGlow className='mb-8 space-y-4 p-6' padding=''>
        <div className='flex flex-col gap-4 lg:flex-row lg:items-end'>
          <div className='min-w-0 flex-1 space-y-2'>
            <label htmlFor='inf-search' className='text-sm font-medium text-ij-text'>
              Rechercher une infraction
            </label>
            <input
              id='inf-search'
              data-testid='infractions-search'
              type='search'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Ex. : extorsion, 223-1, vol…'
              className='w-full rounded-xl border border-ij-border bg-ij-surface-2 px-4 py-3 text-ij-text outline-none placeholder:text-ij-text-subtle focus:border-ij-accent/40 focus:ring-2 focus:ring-ij-accent/20'
            />
          </div>
          <div className='w-full shrink-0 space-y-1 lg:w-56'>
            <label htmlFor='inf-strate' className='text-xs font-medium text-ij-text-muted'>
              Probabilité à l’examen
            </label>
            <select
              id='inf-strate'
              value={prioriteTier}
              onChange={(e) => setPrioriteTier(e.target.value as RecapPriorite | 'all')}
              className='w-full rounded-xl border border-ij-border bg-ij-surface-2 px-3 py-3 text-sm text-ij-text outline-none focus:border-ij-accent/40 focus:ring-2 focus:ring-ij-accent/20'
            >
              <option value='all'>Toutes (ordre du programme officiel)</option>
              <option value='core'>Uniquement prioritaires</option>
              <option value='freq'>Uniquement très probables</option>
              <option value='secours'>Uniquement à sécuriser</option>
            </select>
          </div>
        </div>
        <div>
          <p className='mb-2 text-xs font-medium text-ij-text-muted'>Famille d’infractions</p>
          <p className='mb-2 text-[11px] text-ij-text-muted'>Coche une ou plusieurs familles pour restreindre la liste.</p>
          <div className='flex flex-wrap gap-2'>
            {INFRACTION_FAMILY_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type='button'
                title={opt.hint}
                onClick={() => setFamilyFilter(opt.id)}
                className={`rounded-xl border px-3 py-2 text-left text-sm font-medium transition ${
                  familyFilter === opt.id
                    ? 'border-ij-accent/50 bg-ij-accent/15 text-ij-text'
                    : 'border-ij-border bg-ij-bg/50 text-ij-text-muted hover:border-ij-border hover:bg-ij-text/[0.03]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <p className='flex flex-wrap items-center gap-2 font-ij-sans text-sm text-ij-text-muted'>
          <BookOpen className='h-4 w-4 text-ij-accent/80' aria-hidden />
          <span>
            {filtered.length} infraction{filtered.length > 1 ? 's' : ''}
            {prioriteTier === 'all'
              ? ' — ordre : thèmes du programme officiel'
              : ' — filtre probabilité actif ; sous-ordre : programme officiel'}
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
        shouldReduceMotion={shouldReduceMotion}
        maitriseReady={maitrise.ready}
        hasMaitrise={maitrise.has}
        toggleMaitrise={maitrise.toggle}
      />

      {filtered.length === 0 ? (
        <p className='py-12 text-center text-ij-text-subtle'>Aucune infraction ne correspond à ta recherche.</p>
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
  shouldReduceMotion,
  maitriseReady,
  hasMaitrise,
  toggleMaitrise,
}: {
  filtered: InfractionCatalogItem[];
  catalogIndex: Map<string, number>;
  focusId: string | null;
  listRef: RefObject<HTMLDivElement>;
  selected: InfractionCatalogItem | null;
  setSelected: (v: InfractionCatalogItem | null) => void;
  shouldReduceMotion: boolean;
  maitriseReady: boolean;
  hasMaitrise: (id: string) => boolean;
  toggleMaitrise: (id: string) => void;
}) {
  const groups = useMemo(
    () => groupFilteredForListAccordion(filtered, catalogIndex),
    [filtered, catalogIndex],
  );
  const [openValues, setOpenValues] = useState<string[]>([]);

  const cardVariants = useMemo(() => getCardVariants(shouldReduceMotion), [shouldReduceMotion]);

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

  const rmAttr = shouldReduceMotion ? 'true' : 'false';

  return (
    <>
      <InfractionDetailBubble
        item={selected}
        open={selected !== null}
        onOpenChange={(o) => {
          if (!o) setSelected(null);
        }}
      />

      <div
        ref={listRef}
        data-testid='infractions-grid'
        data-reduced-motion={rmAttr}
        className='min-h-[min(60vh,32rem)] space-y-4'
      >
        <Accordion type='multiple' value={openValues} onValueChange={setOpenValues} className='space-y-3'>
          {groups.map((g) => (
            <AccordionItem
              key={g.value}
              value={g.value}
              className='overflow-hidden rounded-2xl border border-ij-border border-b-0 bg-ij-surface-2/70'
            >
              <AccordionTrigger className='px-4 py-3 text-left text-base hover:no-underline'>
                <span className='font-ij-sans font-semibold text-ij-text'>{g.triggerTitle}</span>
                <span className='ml-2 shrink-0 text-xs font-normal text-ij-text-muted'>({g.items.length})</span>
              </AccordionTrigger>
              <AccordionContent className='px-3 pb-4 pt-0'>
                <div className='space-y-3'>
                  <AnimatePresence initial={false} mode='popLayout'>
                    {g.items.map((item) => {
                      const pTier = (item.priorite ?? 'secours') as RecapPriorite;
                      const badge = PRIORITE_EXAMEN_BADGE[pTier];
                      const isFocused = focusId === item.id;
                      const mastered = hasMaitrise(item.id);
                      return (
                        <motion.div
                          id={`infraction-row-${item.id}`}
                          key={item.id}
                          layout={false}
                          variants={cardVariants}
                          initial='initial'
                          animate='animate'
                          exit='exit'
                          data-testid='infraction-card'
                          data-reduced-motion={rmAttr}
                        >
                          <article
                            className={cn(
                              'overflow-hidden rounded-2xl border bg-gradient-to-br from-ij-surface via-ij-surface-2 to-ij-bg shadow-ij-card ring-1 ring-ij-border/40',
                              'transition-[box-shadow,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-ij-accent/20 hover:shadow-[0_22px_50px_-20px_rgba(212,168,83,0.12)]',
                              isFocused
                                ? 'border-ij-accent ring-2 ring-ij-accent/45'
                                : 'border-ij-border/90',
                            )}
                          >
                            <div className='flex flex-col gap-4 p-4 sm:flex-row sm:items-stretch sm:justify-between sm:p-5'>
                              <div className='min-w-0 flex-1'>
                                <button
                                  type='button'
                                  onClick={() => setSelected(item)}
                                  className='group w-full rounded-xl text-left transition-colors hover:bg-ij-text/[0.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-ij-accent/50'
                                >
                                  <div className='flex gap-3'>
                                    <span
                                      className='mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ij-accent/35 bg-gradient-to-br from-ij-accent/15 to-ij-accent-soft/20 text-ij-accent shadow-inner shadow-ij-card'
                                      aria-hidden
                                    >
                                      <MessageCircle className='h-[18px] w-[18px]' />
                                    </span>
                                    <div className='min-w-0 flex-1 space-y-2.5'>
                                      <p className='text-[11px] font-medium uppercase tracking-[0.14em] text-ij-text-subtle'>
                                        {item.groupTitle}
                                      </p>
                                      <div className='flex flex-wrap items-center gap-2'>
                                        <h2 className='font-ij-display text-lg font-bold leading-snug text-ij-text md:text-xl'>
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
                                      <p className='font-[family-name:var(--font-jetbrains-mono),ui-monospace,monospace] text-xs text-ij-accent/90'>
                                        {item.legal}
                                      </p>
                                      <div className='flex flex-wrap items-center gap-2 pt-0.5'>
                                        <span
                                          className={cn(
                                            'inline-flex items-center gap-1.5 rounded-lg border border-ij-border bg-ij-text/[0.04] px-2.5 py-1 font-ij-mono text-[11px] font-semibold',
                                            peineTierTextClass(derivePeineFromLegal(item.legal).tier),
                                          )}
                                        >
                                          <Gavel className='h-3 w-3 opacity-80' aria-hidden />
                                          {derivePeineFromLegal(item.legal).label}
                                        </span>
                                        <span className='text-[11px] text-ij-text-subtle'>Fiche express · oral & écrit</span>
                                      </div>
                                    </div>
                                  </div>
                                </button>
                              </div>

                              <div className='flex shrink-0 flex-col justify-center gap-2 border-t border-ij-border/60 pt-3 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0'>
                                <button
                                  type='button'
                                  disabled={!maitriseReady}
                                  aria-pressed={mastered}
                                  aria-label={mastered ? 'Retirer de mes infractions maîtrisées' : 'Marquer comme maîtrisée'}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleMaitrise(item.id);
                                  }}
                                  className={cn(
                                    'inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-center text-sm font-semibold transition',
                                    mastered
                                      ? 'border-ij-success/40 bg-ij-success/12 text-ij-text'
                                      : 'border-ij-border bg-ij-text/[0.04] text-ij-text-muted hover:border-ij-accent/35 hover:text-ij-text',
                                    !maitriseReady && 'opacity-60',
                                  )}
                                >
                                  <Check className={cn('h-4 w-4 shrink-0', mastered ? 'opacity-100' : 'opacity-40')} aria-hidden />
                                  Je maîtrise
                                </button>
                                <Link
                                  href={`/entrainement/recapitulatif?f=${infractionToRecapFilter(item)}`}
                                  onClick={(e) => e.stopPropagation()}
                                  className='inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-center text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/18'
                                >
                                  <BookOpen className='h-4 w-4 shrink-0 opacity-90' aria-hidden />
                                  Récap synthèse
                                  <ArrowUpRight className='h-3.5 w-3.5 opacity-80' aria-hidden />
                                </Link>
                              </div>
                            </div>
                          </article>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
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
  shouldReduceMotion,
  maitriseReady,
  hasMaitrise,
  toggleMaitrise,
}: {
  vue: InfractionsViewMode;
  filtered: InfractionCatalogItem[];
  catalogIndex: Map<string, number>;
  focusId: string | null;
  listRef: RefObject<HTMLDivElement>;
  openInListe: (id: string) => void;
  selected: InfractionCatalogItem | null;
  setSelected: (v: InfractionCatalogItem | null) => void;
  shouldReduceMotion: boolean;
  maitriseReady: boolean;
  hasMaitrise: (id: string) => boolean;
  toggleMaitrise: (id: string) => void;
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
          shouldReduceMotion={shouldReduceMotion}
          maitriseReady={maitriseReady}
          hasMaitrise={hasMaitrise}
          toggleMaitrise={toggleMaitrise}
        />
      ) : null}

    </>
  );
}
