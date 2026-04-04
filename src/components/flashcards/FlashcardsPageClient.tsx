'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';

import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { fasciculesList } from '@/data/fascicules-list';
import { type Flashcard, flashcardsData } from '@/data/flashcards-data';
import { recordFlashcardReview } from '@/features/examenopj/actions/record-flashcard-review';

import { FlashcardInterface } from './FlashcardInterface';
import { FlashcardResult } from './FlashcardResult';
import { recordFlashcardAnswer } from './flashcards-progress';
import type { ContentStudyMode, FlashcardFacet, PreparedFlashcard } from './types';

function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

function cardHasPlayableFacet(c: Flashcard, mode: ContentStudyMode): boolean {
  const hasL = !!c.legal?.trim();
  const hasMM = !!c.materielMoralComplet?.trim();
  const hasM = (c.materiel?.length ?? 0) > 0;
  const hasMo = !!c.moral?.trim();
  if (mode === 'legal') return hasL;
  if (mode === 'materiel') return hasMM || hasM;
  if (mode === 'moral') return hasMM || hasMo;
  return hasL || hasMM || hasM || hasMo;
}

function filterCardsByMode(cards: Flashcard[], mode: ContentStudyMode): Flashcard[] {
  return cards.filter((c) => cardHasPlayableFacet(c, mode));
}

function pickFacet(card: Flashcard, mode: ContentStudyMode): FlashcardFacet {
  const hasL = !!card.legal?.trim();
  const hasMM = !!card.materielMoralComplet?.trim();
  const hasM = (card.materiel?.length ?? 0) > 0;
  const hasMo = !!card.moral?.trim();

  if (mode === 'legal') return 'legal';
  if (mode === 'materiel') {
    if (hasMM) return 'materielMoral';
    return 'materiel';
  }
  if (mode === 'moral') {
    if (hasMM) return 'materielMoral';
    return 'moral';
  }
  const opts: FlashcardFacet[] = [];
  if (hasL) opts.push('legal');
  if (hasMM) opts.push('materielMoral');
  if (!hasMM) {
    if (hasM) opts.push('materiel');
    if (hasMo) opts.push('moral');
  }
  if (opts.length === 0) return 'legal';
  return opts[Math.floor(Math.random() * opts.length)]!;
}

function prepareDeck(cards: Flashcard[], mode: ContentStudyMode): PreparedFlashcard[] {
  const prepared: PreparedFlashcard[] = cards.map((card) => ({
    card,
    facet: pickFacet(card, mode),
  }));
  return shuffle(prepared);
}

function fasciculeMeta(num: number) {
  return fasciculesList.find((f) => f.numero === num);
}

type CategoryFilter = 'all' | 'atteintes-aux-biens' | 'atteintes-aux-personnes';

function progressScopeFromUI(category: CategoryFilter, fascicule: number | 'all'): string {
  if (category !== 'all') return `c:${category}`;
  if (fascicule === 'all') return 'all';
  return String(fascicule);
}

function cardMatchesProgressScope(card: Flashcard, scope: string): boolean {
  if (scope === 'all') return true;
  if (scope.startsWith('c:')) return card.categorieSlug === scope.slice(2);
  if (/^\d+$/.test(scope)) return card.fascicule === Number(scope);
  return true;
}

const CAT_QUERY: Record<string, CategoryFilter> = {
  'atteintes-aux-biens': 'atteintes-aux-biens',
  'atteintes-aux-personnes': 'atteintes-aux-personnes',
};

export function FlashcardsPageClient() {
  const searchParams = useSearchParams();
  const [phase, setPhase] = useState<'select' | 'play' | 'result'>('select');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [fascicule, setFascicule] = useState<number | 'all'>('all');
  const [contentMode, setContentMode] = useState<ContentStudyMode>('mixed');
  const [deck, setDeck] = useState<PreparedFlashcard[]>([]);
  const deckRef = useRef(deck);
  deckRef.current = deck;

  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  indexRef.current = index;
  const [direction, setDirection] = useState(1);
  const [know, setKnow] = useState(0);
  const [review, setReview] = useState(0);
  const [dontKnow, setDontKnow] = useState(0);
  const [sessionReviewIds, setSessionReviewIds] = useState<string[]>([]);
  const [sessionDontKnowIds, setSessionDontKnowIds] = useState<string[]>([]);

  const exitToResultRef = useRef(false);
  const lastModeRef = useRef<ContentStudyMode>('mixed');
  const lastScopeRef = useRef<string>('all');

  useEffect(() => {
    const q = searchParams.get('cat');
    if (q && CAT_QUERY[q]) setCategoryFilter(CAT_QUERY[q]!);
  }, [searchParams]);

  useEffect(() => {
    const fid = searchParams.get('f');
    if (!fid) return;
    const n = Number.parseInt(fid, 10);
    if (!Number.isNaN(n)) {
      setFascicule(n);
      setCategoryFilter('all');
      return;
    }
    const meta = fasciculesList.find((f) => f.id === fid);
    if (meta) {
      setFascicule(meta.numero);
      setCategoryFilter('all');
    }
  }, [searchParams]);

  const progressScope = useMemo(
    () => progressScopeFromUI(categoryFilter, fascicule),
    [categoryFilter, fascicule]
  );

  const filteredSource = useMemo(() => {
    if (categoryFilter !== 'all') {
      return flashcardsData.filter((c) => c.categorieSlug === categoryFilter);
    }
    if (fascicule === 'all') return flashcardsData;
    return flashcardsData.filter((c) => c.fascicule === fascicule);
  }, [categoryFilter, fascicule]);

  const playableForMode = useMemo(
    () => filterCardsByMode(filteredSource, contentMode),
    [filteredSource, contentMode]
  );

  const startSession = useCallback(
    (cards: Flashcard[], mode: ContentStudyMode, scope: string) => {
      if (cards.length === 0) return;
      lastModeRef.current = mode;
      lastScopeRef.current = scope;
      setDeck(prepareDeck(cards, mode));
      setIndex(0);
      setDirection(1);
      setKnow(0);
      setReview(0);
      setDontKnow(0);
      setSessionReviewIds([]);
      setSessionDontKnowIds([]);
      exitToResultRef.current = false;
      setPhase('play');
    },
    []
  );

  const handleStart = () => {
    startSession(playableForMode, contentMode, progressScope);
  };

  const handleExitComplete = useCallback(() => {
    if (exitToResultRef.current) {
      exitToResultRef.current = false;
      setPhase('result');
    }
  }, []);

  const handleAnswer = useCallback(
    (kind: 'know' | 'review' | 'dontKnow') => {
      const d = deckRef.current;
      const i = indexRef.current;
      if (i < 0 || i >= d.length) return;
      const current = d[i]!;
      const id = current.card.id;
      recordFlashcardAnswer(progressScope, id, kind);
      void recordFlashcardReview({ cardId: id, scope: progressScope, bucket: kind });

      if (kind === 'know') setKnow((n) => n + 1);
      else if (kind === 'review') {
        setReview((n) => n + 1);
        setSessionReviewIds((r) => [...r, id]);
      } else {
        setDontKnow((n) => n + 1);
        setSessionDontKnowIds((r) => [...r, id]);
      }

      setDirection(1);
      setIndex((prev) => {
        const next = prev + 1;
        if (next >= d.length) exitToResultRef.current = true;
        return next;
      });
    },
    [progressScope]
  );

  const handlePrevious = () => {
    setDirection(-1);
    setIndex((i) => Math.max(0, i - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setIndex((i) => Math.min(deckRef.current.length - 1, i + 1));
  };

  const handleRandom = () => {
    const len = deckRef.current.length;
    if (len <= 1) return;
    setDirection(1);
    const cur = indexRef.current;
    setIndex(() => {
      let j = Math.floor(Math.random() * len);
      if (j === cur) j = (j + 1) % len;
      return j;
    });
  };

  const handleReviewWeak = () => {
    const weak = new Set([...sessionReviewIds, ...sessionDontKnowIds]);
    const cards = flashcardsData.filter((c) => weak.has(c.id));
    const scope = lastScopeRef.current;
    const scoped = cards.filter((c) => cardMatchesProgressScope(c, scope));
    if (scoped.length === 0) {
      setPhase('select');
      return;
    }
    const mode = lastModeRef.current;
    startSession(filterCardsByMode(scoped, mode), mode, scope);
  };

  const handleRestartAll = () => {
    const scope = lastScopeRef.current;
    const mode = lastModeRef.current;
    const cards = flashcardsData.filter((c) => cardMatchesProgressScope(c, scope));
    startSession(filterCardsByMode(cards, mode), mode, scope);
  };

  const handleChangeFascicule = () => {
    setPhase('select');
    setDeck([]);
    setIndex(0);
  };

  const modeToggle = (mode: ContentStudyMode, label: string, activeClass: string, idleClass: string) => {
    const active = contentMode === mode;
    return (
      <button
        type='button'
        onClick={() => setContentMode(mode)}
        className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
          active ? activeClass : idleClass
        }`}
      >
        {label}
      </button>
    );
  };

  const prepared = index < deck.length ? deck[index] : null;
  const fascMeta = prepared ? fasciculeMeta(prepared.card.fascicule) : null;

  return (
    <div className='container pb-16 pt-10'>
      <SectionTitle
        badge='MÉMORISATION'
        badgeClassName='bg-amber-500/20 text-amber-300'
        title='Flashcards'
        subtitle='Révisez en retournant les cartes'
        className='mb-10'
      />

      {phase === 'select' && (
        <GlassCard className='mx-auto max-w-xl space-y-8' padding='p-8'>
          <div className='space-y-2'>
            <label htmlFor='flash-categorie' className='text-sm font-medium text-gray-300'>
              Catégorie
            </label>
            <select
              id='flash-categorie'
              value={categoryFilter}
              onChange={(e) => {
                const v = e.target.value as CategoryFilter;
                setCategoryFilter(v);
              }}
              className='w-full rounded-xl border border-white/10 bg-navy-900/80 px-4 py-3 text-gray-100 outline-none focus:border-amber-500/40 focus:ring-2 focus:ring-amber-500/20'
            >
              <option value='all'>Toutes les catégories</option>
              <option value='atteintes-aux-biens'>Atteintes aux biens</option>
              <option value='atteintes-aux-personnes'>Atteintes aux personnes</option>
            </select>
            <p className='text-xs text-gray-500'>
              Liens directs :{' '}
              <a className='text-amber-300/90 underline' href='/flashcards?cat=atteintes-aux-biens'>
                biens
              </a>
              {' · '}
              <a className='text-amber-300/90 underline' href='/flashcards?cat=atteintes-aux-personnes'>
                personnes
              </a>
            </p>
          </div>

          <div className='space-y-2'>
            <label htmlFor='flash-fascicule' className='text-sm font-medium text-gray-300'>
              Fascicule
            </label>
            <select
              id='flash-fascicule'
              disabled={categoryFilter !== 'all'}
              value={fascicule === 'all' ? 'all' : String(fascicule)}
              onChange={(e) => {
                const v = e.target.value;
                setFascicule(v === 'all' ? 'all' : Number(v));
              }}
              className='w-full rounded-xl border border-white/10 bg-navy-900/80 px-4 py-3 text-gray-100 outline-none focus:border-amber-500/40 focus:ring-2 focus:ring-amber-500/20 disabled:cursor-not-allowed disabled:opacity-45'
            >
              <option value='all'>Tous les fascicules</option>
              {fasciculesList.map((f) => (
                <option key={f.numero} value={f.numero}>
                  F{f.numero.toString().padStart(2, '0')} — {f.titre}
                </option>
              ))}
            </select>
            {categoryFilter !== 'all' ? (
              <p className='text-xs text-gray-500'>Choisissez « Toutes les catégories » pour filtrer par numéro de fascicule.</p>
            ) : null}
          </div>

          <div className='space-y-3'>
            <p className='text-sm font-medium text-gray-300'>Contenu à réviser</p>
            <div className='flex flex-wrap gap-2'>
              {modeToggle(
                'materiel',
                'Élément matériel',
                'border-red-500/50 bg-red-500/20 text-red-200',
                'border-white/10 bg-white/[0.03] text-gray-400 hover:border-red-500/30'
              )}
              {modeToggle(
                'moral',
                'Élément moral',
                'border-orange-500/50 bg-orange-500/20 text-orange-200',
                'border-white/10 bg-white/[0.03] text-gray-400 hover:border-orange-500/30'
              )}
              {modeToggle(
                'legal',
                'Élément légal',
                'border-blue-500/50 bg-blue-500/20 text-blue-200',
                'border-white/10 bg-white/[0.03] text-gray-400 hover:border-blue-500/30'
              )}
              {modeToggle(
                'mixed',
                'Tout mélangé',
                'border-gray-400/50 bg-gray-500/20 text-gray-200',
                'border-white/10 bg-white/[0.03] text-gray-400 hover:border-gray-500/30'
              )}
            </div>
          </div>

          {filteredSource.length === 0 ? (
            <p className='text-sm text-amber-200/90'>Aucune flashcard pour ce fascicule pour le moment.</p>
          ) : null}
          {filteredSource.length > 0 && playableForMode.length === 0 ? (
            <p className='text-sm text-amber-200/90'>
              Aucune carte pour ce mode de révision (essayez « Tout mélangé » ou un autre type de contenu).
            </p>
          ) : null}

          <button
            type='button'
            disabled={playableForMode.length === 0}
            onClick={handleStart}
            className='w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-4 text-center text-base font-semibold text-white shadow-lg transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-40'
          >
            Commencer →
          </button>
        </GlassCard>
      )}

      {phase === 'play' && (
        <div className='mx-auto max-w-lg'>
          <AnimatePresence mode='wait' custom={direction} onExitComplete={handleExitComplete}>
            {prepared && fascMeta ? (
              <FlashcardInterface
                key={`${prepared.card.id}-${prepared.facet}-${index}`}
                prepared={prepared}
                index={index}
                total={deck.length}
                direction={direction}
                fasciculeLabel={fascMeta.titre}
                fasciculeNum={prepared.card.fascicule}
                counts={{ know, review, dontKnow }}
                onAnswer={handleAnswer}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onRandom={handleRandom}
              />
            ) : null}
          </AnimatePresence>
        </div>
      )}

      {phase === 'result' && (
        <FlashcardResult
          know={know}
          review={review}
          dontKnow={dontKnow}
          onReviewWeak={handleReviewWeak}
          onRestartAll={handleRestartAll}
          onChangeFascicule={handleChangeFascicule}
        />
      )}
    </div>
  );
}
