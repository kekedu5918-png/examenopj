'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { cn } from '@/utils/cn';

export interface FlashCardProps {
  term: string;
  definition: string;
  example?: string;
  article?: string;
  category?: string;
  cardNumber: number;
  totalCards: number;
  onKnew: () => void;
  onDidntKnow: () => void;
}

export function FlashCard({
  term,
  definition,
  example,
  article,
  category,
  cardNumber,
  totalCards,
  onKnew,
  onDidntKnow,
}: FlashCardProps) {
  const reduceMotion = useReducedMotion();
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(false);
  }, [cardNumber, term]);

  function handleKnew() {
    onKnew();
    setIsFlipped(false);
  }

  function handleDidntKnow() {
    onDidntKnow();
    setIsFlipped(false);
  }

  const cardSurface =
    'flex min-h-[280px] w-full cursor-pointer flex-col rounded-2xl border border-[var(--ds-border)] bg-[var(--ds-bg-elevated)] p-6 shadow-sm dark:border-white/10';

  return (
    <div className="flex w-full max-w-lg flex-col gap-6">
      <p className="text-center text-xs font-medium text-[var(--ds-text-muted)]">
        <span className="tabular-nums">
          {cardNumber}/{totalCards}
        </span>{' '}
        cartes
      </p>

      {reduceMotion ? (
        <div className="relative">
          <AnimatePresence mode="wait" initial={false}>
            {!isFlipped ? (
              <motion.button
                key="front"
                type="button"
                className={cn(cardSurface, 'items-center justify-between text-center')}
                onClick={() => setIsFlipped(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex w-full flex-col items-center gap-4">
                  {category ? (
                    <span className="rounded-full border border-[color-mix(in_srgb,var(--ds-accent)_35%,transparent)] bg-[color-mix(in_srgb,var(--ds-accent)_12%,transparent)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--ds-accent)]">
                      {category}
                    </span>
                  ) : null}
                  <p className="text-2xl font-bold leading-tight text-[var(--ds-text-primary)]">{term}</p>
                </div>
                <p className="text-xs text-[var(--ds-text-muted)] opacity-50">Appuyer pour révéler</p>
              </motion.button>
            ) : (
              <motion.div
                key="back"
                role="presentation"
                className={cn(cardSurface, 'cursor-default gap-4')}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-base leading-relaxed text-[var(--ds-text-primary)]">{definition}</p>
                {example ? (
                  <p className="text-sm italic leading-relaxed text-[var(--ds-text-primary)] opacity-80">{example}</p>
                ) : null}
                {article ? (
                  <span className="inline-flex w-fit rounded-md border border-[var(--ds-border)] bg-[var(--ds-bg-primary)] px-2.5 py-1 text-xs font-medium text-[var(--ds-text-muted)]">
                    {article}
                  </span>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="relative [perspective:1200px]" style={{ perspective: '1200px' }}>
          <motion.div
            className="relative h-[min(320px,70vh)] w-full"
            style={{ transformStyle: 'preserve-3d' }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          >
            <button
              type="button"
              className="absolute inset-0 flex h-full w-full flex-col items-center justify-between rounded-2xl border border-[var(--ds-border)] bg-[var(--ds-bg-elevated)] p-6 text-center shadow-sm [backface-visibility:hidden] dark:border-white/10"
              style={{ transform: 'rotateY(0deg)', WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
              onClick={() => setIsFlipped(true)}
              disabled={isFlipped}
              aria-label="Voir la définition"
            >
              <div className="flex w-full flex-col items-center gap-4">
                {category ? (
                  <span className="rounded-full border border-[color-mix(in_srgb,var(--ds-accent)_35%,transparent)] bg-[color-mix(in_srgb,var(--ds-accent)_12%,transparent)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--ds-accent)]">
                    {category}
                  </span>
                ) : null}
                <p className="text-2xl font-bold leading-tight text-[var(--ds-text-primary)]">{term}</p>
              </div>
              <p className="text-xs text-[var(--ds-text-muted)] opacity-50">Appuyer pour révéler</p>
            </button>

            <div
              className="absolute inset-0 flex h-full w-full cursor-default flex-col gap-4 overflow-y-auto rounded-2xl border border-[var(--ds-border)] bg-[var(--ds-bg-elevated)] p-6 shadow-sm [backface-visibility:hidden] dark:border-white/10"
              style={{
                transform: 'rotateY(180deg)',
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden',
              }}
            >
              <p className="text-base leading-relaxed text-[var(--ds-text-primary)]">{definition}</p>
              {example ? (
                <p className="text-sm italic leading-relaxed text-[var(--ds-text-primary)] opacity-80">{example}</p>
              ) : null}
              {article ? (
                <span className="inline-flex w-fit rounded-md border border-[var(--ds-border)] bg-[var(--ds-bg-primary)] px-2.5 py-1 text-xs font-medium text-[var(--ds-text-muted)]">
                  {article}
                </span>
              ) : null}
            </div>
          </motion.div>
        </div>
      )}

      <AnimatePresence>
        {isFlipped ? (
          <motion.div
            key="actions"
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            transition={
              reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 30 }
            }
            className="flex flex-col gap-3 sm:flex-row"
          >
            <button
              type="button"
              className="flex-1 rounded-xl border border-green-500/40 bg-green-500/10 py-3 text-sm font-semibold text-green-800 transition hover:bg-green-500/15 dark:text-green-200"
              onClick={handleKnew}
            >
              ✓ Je savais
            </button>
            <button
              type="button"
              className="flex-1 rounded-xl border border-red-500/40 bg-red-500/10 py-3 text-sm font-semibold text-red-800 transition hover:bg-red-500/15 dark:text-red-200"
              onClick={handleDidntKnow}
            >
              ✗ À revoir
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
