'use client';

import { type RefObject, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen, Gavel, MessageCircle } from 'lucide-react';

import { ContentReviewStrip } from '@/components/content/ContentReviewStrip';
import { FlashcardRichText } from '@/components/flashcards/flashcard-rich-text';
import { MOTION_INITIAL_FOR_SEO } from '@/components/home/motion';
import { InfractionDetailBubble } from '@/components/infractions/InfractionDetailBubble';
import { InfractionsTable } from '@/components/infractions/InfractionsTable';
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

  const filtered = useMemo(() => {
    const q = stripForSearch(query.trim());
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
  }, [catalog, catalogIndex, query, familyFilter, prioriteTier]);

  const openInListe = (id: string) => {
    const p = new URLSearchParams(searchParams.toString());
    p.set('vue', 'liste');
    p.set('focus', id);
    router.replace(`${pathname}?${p.toString()}`, { scroll: false });
  };

  const listRef = useRef<HTMLDivElement>(null);

  return (
    <InteriorPageShell maxWidth='6xl' glow={SHELL_GLOW.infractions} pad='default'>
      <h1 className='sr-only'>Référentiel des infractions</h1>
      <SectionTitle
        badge='RÉFÉRENTIEL'
        badgeClassName='text-rose-200'
        title='Infractions'
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
              <option value='all'>Toutes (ordre du programme officiel)</option>
              <option value='core'>Uniquement prioritaires</option>
              <option value='freq'>Uniquement très probables</option>
              <option value='secours'>Uniquement à sécuriser</option>
            </select>
          </div>
        </div>
        <div>
          <p className='mb-2 text-xs font-medium text-gray-500'>Famille d’infractions</p>
          <p className='mb-2 text-[11px] text-gray-600'>Coche une ou plusieurs familles pour restreindre la liste.</p>
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
        <p className='flex flex-wrap items-center gap-2 text-sm text-gray-500'>
          <BookOpen className='h-4 w-4 text-amber-400/80' aria-hidden />
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
                            'overflow-hidden rounded-2xl border bg-gradient-to-br from-[#12121c] via-[#0e0e16] to-[#0a0a0f] shadow-[0_16px_44px_-22px_rgba(0,0,0,0.75)] ring-1 ring-white/[0.04]',
                            'transition-[box-shadow,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-amber-500/20 hover:shadow-[0_22px_50px_-20px_rgba(251,191,36,0.12)]',
                            isFocused
                              ? 'border-[#4F6EF7] ring-2 ring-[#4F6EF7]/45'
                              : 'border-white/[0.09]',
                          )}
                        >
                          <div className='flex flex-col gap-4 p-4 sm:flex-row sm:items-stretch sm:justify-between sm:p-5'>
                            <div className='min-w-0 flex-1'>
                              <button
                                type='button'
                                onClick={() => setSelected(item)}
                                className='group w-full rounded-xl text-left transition-colors hover:bg-white/[0.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50'
                              >
                                <div className='flex gap-3'>
                                  <span
                                    className='mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-500/35 bg-gradient-to-br from-amber-500/15 to-amber-600/5 text-amber-200 shadow-inner shadow-amber-900/20'
                                    aria-hidden
                                  >
                                    <MessageCircle className='h-[18px] w-[18px]' />
                                  </span>
                                  <div className='min-w-0 flex-1 space-y-2.5'>
                                    <p className='text-[11px] font-medium uppercase tracking-[0.14em] text-gray-500'>
                                      {item.groupTitle}
                                    </p>
                                    <div className='flex flex-wrap items-center gap-2'>
                                      <h2 className='font-display text-lg font-bold leading-snug text-white md:text-xl'>
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
                                    <p className='font-[family-name:var(--font-jetbrains-mono),ui-monospace,monospace] text-xs text-cyan-300/90'>
                                      {item.legal}
                                    </p>
                                    <div className='flex flex-wrap items-center gap-2 pt-0.5'>
                                      <span
                                        className={cn(
                                          'inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 font-[family-name:var(--font-jetbrains-mono),ui-monospace,monospace] text-[11px] font-semibold',
                                          peineTierTextClass(derivePeineFromLegal(item.legal).tier),
                                        )}
                                      >
                                        <Gavel className='h-3 w-3 opacity-80' aria-hidden />
                                        {derivePeineFromLegal(item.legal).label}
                                      </span>
                                      <span className='text-[11px] text-slate-500'>Fiche express · oral & écrit</span>
                                    </div>
                                  </div>
                                </div>
                              </button>
                            </div>

                            <div className='flex shrink-0 flex-col justify-center gap-2 border-t border-white/[0.06] pt-3 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0'>
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

    </>
  );
}
