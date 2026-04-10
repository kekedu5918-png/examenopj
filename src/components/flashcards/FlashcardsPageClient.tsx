'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { Brain, Layers, Shuffle } from 'lucide-react';

import {
  FreemiumDailyQuotaProgress,
  FreemiumFlashcardsDailyLimitWall,
} from '@/components/access/freemium-daily-quota';
import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { fasciculesList } from '@/data/fascicules-list';
import { type Flashcard, flashcardsData } from '@/data/flashcards-data';
import {
  addDailyFlashcardReviewCount,
  getDailyFlashcardReviewCount,
} from '@/features/access/daily-quota-client';
import type { ContentAccessSnapshot } from '@/features/access/get-content-access';
import { recordFlashcardReview } from '@/features/examenopj/actions/record-flashcard-review';
import { cn } from '@/utils/cn';

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
  const hasMM = !!c.materielMoralComplet?.trim();
  const hasM = (c.materiel?.length ?? 0) > 0;
  const hasMo = !!c.moral?.trim();
  if (mode === 'materiel') return hasMM || hasM;
  if (mode === 'moral') return hasMM || hasMo;
  return hasMM || hasM || hasMo;
}

function filterCardsByMode(cards: Flashcard[], mode: ContentStudyMode): Flashcard[] {
  return cards.filter((c) => cardHasPlayableFacet(c, mode));
}

function pickFacet(card: Flashcard, mode: ContentStudyMode): FlashcardFacet {
  const hasMM = !!card.materielMoralComplet?.trim();
  const hasM = (card.materiel?.length ?? 0) > 0;
  const hasMo = !!card.moral?.trim();

  if (mode === 'materiel') {
    if (hasMM) return 'materielMoral';
    return 'materiel';
  }
  if (mode === 'moral') {
    if (hasMM) return 'materielMoral';
    return 'moral';
  }
  const opts: FlashcardFacet[] = [];
  if (hasMM) opts.push('materielMoral');
  if (!hasMM) {
    if (hasM) opts.push('materiel');
    if (hasMo) opts.push('moral');
  }
  if (opts.length === 0) return 'materiel';
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

type FlashcardsPageClientProps = {
  initialAccess?: ContentAccessSnapshot;
};

export function FlashcardsPageClient({ initialAccess }: FlashcardsPageClientProps) {
  const searchParams = useSearchParams();

  const access: ContentAccessSnapshot = initialAccess ?? {
    tier: 'full',
    maxQuizQuestionsPerDay: null,
    maxFlashcardsPerDay: null,
  };
  const maxFlashcardsPerDay = access.maxFlashcardsPerDay;

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
  const [fcQuotaTick, setFcQuotaTick] = useState(0);

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

  useEffect(() => {
    if (phase === 'select') setFcQuotaTick((t) => t + 1);
  }, [phase]);

  const flashUsedToday = useMemo(() => {
    if (maxFlashcardsPerDay == null) return 0;
    void fcQuotaTick;
    return getDailyFlashcardReviewCount();
  }, [maxFlashcardsPerDay, fcQuotaTick]);

  const flashRemainingToday = useMemo(() => {
    if (maxFlashcardsPerDay == null) return null;
    return Math.max(0, maxFlashcardsPerDay - flashUsedToday);
  }, [maxFlashcardsPerDay, flashUsedToday]);

  const flashSelectBlocked =
    phase === 'select' && maxFlashcardsPerDay != null && flashUsedToday >= maxFlashcardsPerDay;

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
      let prepared = prepareDeck(cards, mode);
      if (maxFlashcardsPerDay != null) {
        const rem = Math.max(0, maxFlashcardsPerDay - getDailyFlashcardReviewCount());
        if (rem === 0) return;
        prepared = prepared.slice(0, rem);
      }
      setDeck(prepared);
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
    [maxFlashcardsPerDay]
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

      if (maxFlashcardsPerDay != null) {
        addDailyFlashcardReviewCount(1);
      }

      setDirection(1);
      setIndex((prev) => {
        const next = prev + 1;
        if (next >= d.length) exitToResultRef.current = true;
        return next;
      });
    },
    [progressScope, maxFlashcardsPerDay]
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

  const prepared = index < deck.length ? deck[index] : null;
  const fascMeta = prepared ? fasciculeMeta(prepared.card.fascicule) : null;

  return (
    <InteriorPageShell maxWidth='6xl' glow='amber' pad='compact'>
      <SectionTitle
        badge='MÉMORISATION'
        badgeClassName='text-amber-200'
        title='Flashcards'
        titleGradient
        size='display'
        subtitle='Révisez en retournant les cartes — même référentiel que le récap et les quiz.'
        className='mb-10'
      />

      {phase === 'select' && maxFlashcardsPerDay != null && flashUsedToday < maxFlashcardsPerDay ? (
        <FreemiumDailyQuotaProgress used={flashUsedToday} max={maxFlashcardsPerDay} unit='flashcards' />
      ) : null}

      {flashSelectBlocked ? <FreemiumFlashcardsDailyLimitWall /> : null}

      {phase === 'select' && !flashSelectBlocked ? (
        <div className='mx-auto max-w-2xl'>
          {/* Main config card */}
          <div className='relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#0f1d3a]/80 to-[#0a0f1e]/80 p-6 shadow-2xl shadow-black/40 md:p-8'>
            <div className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent' />
            <div
              className='pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-15 blur-3xl'
              style={{ background: 'radial-gradient(circle, #f59e0b, transparent 70%)' }}
              aria-hidden
            />

            <div className='relative space-y-8'>
              {/* ── Catégorie ── */}
              <div className='space-y-3'>
                <p className='text-[10px] font-black uppercase tracking-[0.15em] text-slate-500'>Catégorie</p>
                <div className='flex flex-wrap gap-2'>
                  {(
                    [
                      { value: 'all', label: 'Toutes les cartes' },
                      { value: 'atteintes-aux-biens', label: 'Atteintes aux biens' },
                      { value: 'atteintes-aux-personnes', label: 'Atteintes aux personnes' },
                    ] as const
                  ).map((cat) => (
                    <button
                      key={cat.value}
                      type='button'
                      onClick={() => { setCategoryFilter(cat.value); if (cat.value !== 'all') setFascicule('all'); }}
                      className={cn(
                        'rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-150',
                        categoryFilter === cat.value
                          ? 'border-amber-500/50 bg-amber-500/15 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.15)]'
                          : 'border-white/[0.08] bg-white/[0.02] text-slate-400 hover:border-white/20 hover:bg-white/[0.05] hover:text-slate-200',
                      )}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Module F01–F15 ── */}
              {categoryFilter === 'all' ? (
                <div className='space-y-3'>
                  <p className='text-[10px] font-black uppercase tracking-[0.15em] text-slate-500'>Module thématique</p>
                  <div className='flex flex-wrap gap-1.5'>
                    <button
                      type='button'
                      onClick={() => setFascicule('all')}
                      className={cn(
                        'rounded-full border px-3 py-1.5 text-xs font-bold transition-all duration-150',
                        fascicule === 'all'
                          ? 'border-amber-500/50 bg-amber-500/15 text-amber-200'
                          : 'border-white/[0.08] bg-white/[0.02] text-slate-500 hover:border-white/15 hover:text-slate-300',
                      )}
                    >
                      Tous
                    </button>
                    {fasciculesList.map((f) => (
                      <button
                        key={f.numero}
                        type='button'
                        onClick={() => setFascicule(f.numero)}
                        title={f.titre}
                        className={cn(
                          'rounded-full border px-3 py-1.5 text-xs font-bold transition-all duration-150',
                          fascicule === f.numero
                            ? 'border-amber-500/50 bg-amber-500/15 text-amber-200'
                            : 'border-white/[0.08] bg-white/[0.02] text-slate-500 hover:border-white/15 hover:text-slate-300',
                        )}
                      >
                        F{String(f.numero).padStart(2, '0')}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* ── Contenu à réviser ── */}
              <div className='space-y-3'>
                <p className='text-[10px] font-black uppercase tracking-[0.15em] text-slate-500'>Contenu à réviser</p>
                <div className='grid grid-cols-3 gap-3'>
                  {(
                    [
                      { value: 'materiel' as const, label: 'Élément matériel', desc: 'Acte, résultat, lien causal', icon: Layers, active: 'border-rose-500/40 bg-rose-500/[0.08] text-rose-200', activeIcon: 'text-rose-400' },
                      { value: 'moral' as const, label: 'Élément moral', desc: 'Intention ou imprudence', icon: Brain, active: 'border-orange-500/40 bg-orange-500/[0.08] text-orange-200', activeIcon: 'text-orange-400' },
                      { value: 'mixed' as const, label: 'Tout mélangé', desc: 'Matériel + moral aléatoire', icon: Shuffle, active: 'border-amber-500/40 bg-amber-500/[0.08] text-amber-200', activeIcon: 'text-amber-400' },
                    ]
                  ).map((m) => {
                    const Icon = m.icon;
                    const isActive = contentMode === m.value;
                    return (
                      <button
                        key={m.value}
                        type='button'
                        onClick={() => setContentMode(m.value)}
                        className={cn(
                          'relative flex flex-col gap-2.5 overflow-hidden rounded-xl border p-4 text-left transition-all duration-200',
                          isActive
                            ? m.active + ' shadow-lg'
                            : 'border-white/[0.07] bg-white/[0.02] text-slate-400 hover:border-white/[0.14] hover:bg-white/[0.04]',
                        )}
                      >
                        {isActive && <div className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-40' />}
                        <Icon className={cn('h-5 w-5 shrink-0', isActive ? m.activeIcon : 'text-slate-600')} strokeWidth={1.75} />
                        <span className='text-sm font-bold leading-tight'>{m.label}</span>
                        <span className={cn('text-[10px] leading-snug', isActive ? 'opacity-70' : 'text-slate-600')}>{m.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── Messages d'état ── */}
              {filteredSource.length === 0 ? (
                <p className='rounded-xl border border-amber-500/20 bg-amber-500/[0.07] px-4 py-3 text-sm text-amber-200/90'>
                  Aucune flashcard pour ce module pour le moment.
                </p>
              ) : null}
              {filteredSource.length > 0 && playableForMode.length === 0 ? (
                <p className='rounded-xl border border-amber-500/20 bg-amber-500/[0.07] px-4 py-3 text-sm text-amber-200/90'>
                  Aucune carte pour ce mode — essayez &laquo;&nbsp;Tout mélangé&nbsp;&raquo;.
                </p>
              ) : null}

              {/* ── Stats + CTA ── */}
              {playableForMode.length > 0 ? (
                <div className='space-y-4'>
                  <div className='flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm'>
                    <span className='text-slate-400'>Cartes disponibles</span>
                    <div className='flex items-center gap-2'>
                      <span className='font-bold tabular-nums text-amber-300'>{playableForMode.length}</span>
                      <span className='text-slate-600'>·</span>
                      <span className='text-slate-500'>~{Math.max(1, Math.ceil(playableForMode.length * 0.25))} min</span>
                    </div>
                  </div>
                  <button
                    type='button'
                    disabled={flashRemainingToday === 0}
                    onClick={handleStart}
                    className='group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-4 text-center text-base font-bold text-white shadow-[0_8px_24px_rgba(245,158,11,0.22)] transition-all duration-200 hover:shadow-[0_12px_32px_rgba(245,158,11,0.35)] hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-40'
                  >
                    <span className='relative z-10'>Lancer la session →</span>
                    <div className='absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full' />
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

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
    </InteriorPageShell>
  );
}
