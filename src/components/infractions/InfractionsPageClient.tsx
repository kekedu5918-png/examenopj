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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import {
  fasciculeToFamily,
  groupInfractionsByFamilyForList,
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

function stripForSearch(s: string): string {
  return s
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .toLowerCase();
}

function familyAccordionValue(item: InfractionCatalogItem): string {
  return `fam:${fasciculeToFamily(item.fascicule)}`;
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
  const listByFamily = searchParams.get('group') === 'famille';

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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key !== 'g' && e.key !== 'G') return;
      e.preventDefault();
      const u = new URL(window.location.href);
      if (u.searchParams.get('group') === 'famille') u.searchParams.delete('group');
      else u.searchParams.set('group', 'famille');
      router.replace(`${u.pathname}${u.search}${u.hash}`, { scroll: false });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [router]);

  const filtered = useMemo(() => {
    const q = stripForSearch(query.trim());
    const list = catalog.filter((item) => {
      if (!matchesInfractionFamily(item, familyFilter)) return false;
      if (prioriteTier !== 'all' && (item.priorite ?? 'secours') !== prioriteTier) return false;
      if (!q) return true;
      const hay = `${stripForSearch(item.infraction)} ${stripForSearch(item.legal)} ${stripForSearch(item.groupTitle)} ${stripForSearch(item.materiel)} ${stripForSearch(item.moral)}`;
      return hay.includes(q);
    });
    return list.sort((a, b) => {
      const pa = PRIORITE_ORDER[(a.priorite ?? 'secours') as RecapPriorite];
      const pb = PRIORITE_ORDER[(b.priorite ?? 'secours') as RecapPriorite];
      if (pa !== pb) return pa - pb;
      const g = a.groupTitle.localeCompare(b.groupTitle, 'fr');
      if (g !== 0) return g;
      return stripForSearch(a.infraction).localeCompare(stripForSearch(b.infraction), 'fr');
    });
  }, [catalog, query, familyFilter, prioriteTier]);

  const toggleListGrouping = () => {
    const p = new URLSearchParams(searchParams.toString());
    if (listByFamily) p.delete('group');
    else p.set('group', 'famille');
    router.replace(`${pathname}?${p.toString()}`, { scroll: false });
  };

  const openInListe = (id: string) => {
    const p = new URLSearchParams(searchParams.toString());
    p.set('vue', 'liste');
    p.set('focus', id);
    router.replace(`${pathname}?${p.toString()}`, { scroll: false });
  };

  const listRef = useRef<HTMLDivElement>(null);

  return (
    <div className='container pb-20 pt-10'>
      <h1 className='sr-only'>Référentiel des infractions</h1>
      <SectionTitle
        badge='RÉFÉRENTIEL'
        badgeClassName='bg-slate-500/20 text-slate-300'
        title='Infractions'
        subtitle='Pour chaque infraction : élément légal (référence Code pénal), élément matériel et élément moral essentiels — à croiser avec Légifrance. Liste plate par défaut ; touche G ou bouton ci‑dessous pour regrouper par famille (personnes, biens, route…). Filtre famille et probabilité à l’examen : le plus attendu d’abord.'
        className='mb-6'
      />

      <ViewToggle className='mb-6' />

      <ContentReviewStrip className='mb-8' />

      <GlassCard className='mb-8 space-y-4 p-6' padding=''>
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
              <option value='all'>Toutes (tri du + au − probable)</option>
              <option value='core'>Uniquement prioritaires</option>
              <option value='freq'>Uniquement très probables</option>
              <option value='secours'>Uniquement à sécuriser</option>
            </select>
          </div>
        </div>
        <div>
          <p className='mb-2 text-xs font-medium text-gray-500'>Famille d’infractions (filtre)</p>
          <p className='mb-2 text-[11px] text-gray-600'>Réduit la liste aux catégories ci‑dessous (indépendant du regroupement d’affichage).</p>
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
        <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
          <p className='text-sm text-gray-400'>
            Affichage :{' '}
            <strong className='text-gray-200'>{listByFamily ? 'regroupé par famille' : 'liste plate'}</strong>
            {' · '}
            <kbd className='rounded border border-white/15 bg-white/5 px-1.5 py-0.5 font-mono text-[11px] text-gray-300'>
              G
            </kbd>{' '}
            pour basculer
          </p>
          <button
            type='button'
            onClick={toggleListGrouping}
            className='shrink-0 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium text-gray-200 transition hover:bg-white/[0.08]'
          >
            {listByFamily ? 'Liste plate' : 'Regrouper par famille'}
          </button>
        </div>
        <div className='flex flex-col gap-3 rounded-xl border border-emerald-500/25 bg-emerald-950/35 p-4 sm:flex-row sm:items-center sm:justify-between'>
          <p className='text-sm text-gray-300'>
            Chaque session flashcards est <strong className='text-emerald-200'>mélangée</strong> : complète la lecture ligne par ligne
            ici, puis enchaîne pour ancrer L / M / M.
          </p>
          <div className='flex flex-shrink-0 flex-wrap gap-2'>
            <Link
              href='/flashcards'
              className='inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-emerald-500'
            >
              Session flashcards (tout le programme)
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
              ? ' — ordre : probabilité examen (prioritaire → à sécuriser), puis thème'
              : ' — filtre strate actif'}
          </span>
        </p>
      </GlassCard>

      <InfractionsViewBody
        vue={vue}
        filtered={filtered}
        focusId={focusId}
        listRef={listRef}
        openInListe={openInListe}
        selected={selected}
        setSelected={setSelected}
        listByFamily={listByFamily}
      />

      {filtered.length === 0 ? (
        <p className='py-12 text-center text-gray-500'>Aucune infraction ne correspond à ta recherche.</p>
      ) : null}
    </div>
  );
}

function InfractionsListView({
  filtered,
  focusId,
  listRef,
  selected,
  setSelected,
  listByFamily,
}: {
  filtered: InfractionCatalogItem[];
  focusId: string | null;
  listRef: RefObject<HTMLDivElement>;
  selected: InfractionCatalogItem | null;
  setSelected: (v: InfractionCatalogItem | null) => void;
  listByFamily: boolean;
}) {
  const groups = useMemo(() => groupInfractionsByFamilyForList(filtered), [filtered]);
  const [openValues, setOpenValues] = useState<string[]>([]);

  useEffect(() => {
    if (listByFamily) setOpenValues(groups.map((g) => g.value));
  }, [listByFamily, groups]);

  useEffect(() => {
    if (!focusId || !listByFamily) return;
    const item = filtered.find((i) => i.id === focusId);
    if (!item) return;
    const v = familyAccordionValue(item);
    setOpenValues((prev) => (prev.includes(v) ? prev : [...prev, v]));
  }, [focusId, filtered, listByFamily]);

  useEffect(() => {
    if (!focusId) return;
    const id = `infraction-row-${focusId}`;
    const scroll = () => document.getElementById(id)?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    scroll();
    const t = window.setTimeout(scroll, 220);
    return () => clearTimeout(t);
  }, [focusId, openValues, filtered, listByFamily]);

  const renderCard = (item: InfractionCatalogItem, index: number) => {
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
                    <p className='text-xs font-medium uppercase tracking-wide text-gray-500'>{item.groupTitle}</p>
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
                    <p className='text-xs font-medium text-amber-400/90'>Fiche → matériel, moral, Légifrance</p>
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
                <span className='max-w-[11rem] text-right text-xs text-gray-500'>Voir la page Flashcards.</span>
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
  };

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
        {!listByFamily ? (
          <div className='space-y-3'>{filtered.map((item, index) => renderCard(item, index))}</div>
        ) : (
          <Accordion type='multiple' value={openValues} onValueChange={setOpenValues} className='space-y-3'>
            {groups.map((g, groupIndex) => (
              <AccordionItem
                key={g.value}
                value={g.value}
                className='overflow-hidden rounded-2xl border border-white/10 border-b-0 bg-navy-950/40'
              >
                <AccordionTrigger className='px-4 py-3 text-left text-base hover:no-underline'>
                  <span className='font-display font-semibold text-white'>{g.label}</span>
                <span className='ml-2 shrink-0 text-xs font-normal text-gray-500'>({g.items.length})</span>
              </AccordionTrigger>
              <AccordionContent className='px-3 pb-4 pt-0'>
                <div className='space-y-3'>
                  {g.items.map((item, itemIndex) => {
                    const index =
                      groups.slice(0, groupIndex).reduce((s, x) => s + x.items.length, 0) + itemIndex;
                    return renderCard(item, index);
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        )}
      </div>
    </>
  );
}

function InfractionsViewBody({
  vue,
  filtered,
  focusId,
  listRef,
  openInListe,
  selected,
  setSelected,
  listByFamily,
}: {
  vue: InfractionsViewMode;
  filtered: InfractionCatalogItem[];
  focusId: string | null;
  listRef: RefObject<HTMLDivElement>;
  openInListe: (id: string) => void;
  selected: InfractionCatalogItem | null;
  setSelected: (v: InfractionCatalogItem | null) => void;
  listByFamily: boolean;
}) {
  return (
    <>
      {vue === 'tableau' ? <InfractionsTable rows={filtered} onOpenInListe={openInListe} /> : null}

      {vue === 'liste' ? (
        <InfractionsListView
          filtered={filtered}
          focusId={focusId}
          listRef={listRef}
          selected={selected}
          setSelected={setSelected}
          listByFamily={listByFamily}
        />
      ) : null}

      {vue === 'flashcard' ? <InfractionsFlashMode filtered={filtered} /> : null}
    </>
  );
}
