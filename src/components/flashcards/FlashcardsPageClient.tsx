'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { flashcardsData } from '@/data/flashcards-data';
import { fasciculesList } from '@/data/fascicules-list';

import { FlashcardInterface } from './FlashcardInterface';
import { FlashcardResult } from './FlashcardResult';
import { recordFlashcardAnswer } from './flashcards-progress';
import type { ContentStudyMode, FlashcardFacet, PreparedFlashcard } from './types';

const FACETS: FlashcardFacet[] = ['materiel', 'moral', 'legal'];

function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

function prepareDeck(cards: (typeof flashcardsData)[number][], mode: ContentStudyMode): PreparedFlashcard[] {
  const prepared: PreparedFlashcard[] = cards.map((card) => ({
    card,
    facet: mode === 'mixed' ? FACETS[Math.floor(Math.random() * 3)]! : mode,
  }));
  return shuffle(prepared);
}

function fasciculeMeta(num: number) {
  return fasciculesList.find((f) => f.numero === num);
}

export function FlashcardsPageClient() {
  const [phase, setPhase] = useState<'select' | 'play' | 'result'>('select');
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
  const lastFasciculeRef = useRef<number | 'all'>('all');

  const filteredSource = useMemo(() => {
    if (fascicule === 'all') return flashcardsData;
    return flashcardsData.filter((c) => c.fascicule === fascicule);
  }, [fascicule]);

  const startSession = useCallback(
    (cards: (typeof flashcardsData)[number][], mode: ContentStudyMode, fasc: number | 'all') => {
      if (cards.length === 0) return;
      lastModeRef.current = mode;
      lastFasciculeRef.current = fasc;
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
    startSession(filteredSource, contentMode, fascicule);
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
      recordFlashcardAnswer(fascicule, id, kind);

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
    [fascicule]
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
    const fasc = lastFasciculeRef.current;
    const scoped =
      fasc === 'all' ? cards : cards.filter((c) => c.fascicule === fasc);
    if (scoped.length === 0) {
      setPhase('select');
      return;
    }
    startSession(scoped, lastModeRef.current, fasc);
  };

  const handleRestartAll = () => {
    const fasc = lastFasciculeRef.current;
    const mode = lastModeRef.current;
    const cards =
      fasc === 'all' ? flashcardsData : flashcardsData.filter((c) => c.fascicule === fasc);
    startSession(cards, mode, fasc);
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
            <label htmlFor='flash-fascicule' className='text-sm font-medium text-gray-300'>
              Fascicule
            </label>
            <select
              id='flash-fascicule'
              value={fascicule === 'all' ? 'all' : String(fascicule)}
              onChange={(e) => {
                const v = e.target.value;
                setFascicule(v === 'all' ? 'all' : Number(v));
              }}
              className='w-full rounded-xl border border-white/10 bg-navy-900/80 px-4 py-3 text-gray-100 outline-none focus:border-amber-500/40 focus:ring-2 focus:ring-amber-500/20'
            >
              <option value='all'>Toutes les infractions</option>
              {fasciculesList.map((f) => (
                <option key={f.numero} value={f.numero}>
                  F{f.numero.toString().padStart(2, '0')} — {f.titre}
                </option>
              ))}
            </select>
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

          <button
            type='button'
            disabled={filteredSource.length === 0}
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
