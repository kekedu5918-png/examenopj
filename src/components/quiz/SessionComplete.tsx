'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';

export interface SessionCompleteProps {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  xpGained: number;
  streakAfter: number;
  isPersonalBest: boolean;
  mistakeTopics?: string[];
  onContinue: () => void;
  onReviewMistakes: () => void;
}

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

function mentionForScore(score: number): { text: string; className: string } {
  if (score >= 90) return { text: '🏆 PARFAIT !', className: 'text-amber-500' };
  if (score >= 70) return { text: '⭐ TRÈS BIEN !', className: 'text-green-500' };
  if (score >= 50) return { text: '💪 BIEN JOUÉ !', className: 'text-blue-500' };
  return { text: '📚 Continue !', className: 'text-slate-400' };
}

export function SessionComplete({
  score,
  totalQuestions,
  correctAnswers,
  xpGained,
  streakAfter,
  isPersonalBest,
  mistakeTopics,
  onContinue,
  onReviewMistakes,
}: SessionCompleteProps) {
  const reduceMotion = useReducedMotion();
  const [displayScore, setDisplayScore] = useState(0);
  const confettiFired = useRef(false);

  const targetScore = Math.min(100, Math.max(0, Math.round(score)));
  const mention = mentionForScore(targetScore);
  const hasMistakes = (mistakeTopics?.length ?? 0) > 0;

  useEffect(() => {
    const start = performance.now();
    const durationMs = 1500;
    let raf = 0;

    function tick(now: number) {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / durationMs);
      setDisplayScore(Math.round(targetScore * easeOutCubic(t)));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      }
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [targetScore]);

  useEffect(() => {
    if (reduceMotion || targetScore < 70 || confettiFired.current) return;
    confettiFired.current = true;

    let cancelled = false;
    void import('canvas-confetti').then((mod) => {
      if (cancelled) return;
      mod.default({
        particleCount: 130,
        spread: 72,
        origin: { x: 0.5, y: 0.65 },
        colors: ['#2563eb', '#3b82f6', '#f59e0b', '#22c55e'],
      });
    });

    return () => {
      cancelled = true;
    };
  }, [reduceMotion, targetScore]);

  const totalDuration = 1.6 + 1.5;

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-center px-6 py-10 text-center">
      <p
        className={cn('font-display text-4xl font-bold tabular-nums md:text-5xl', 'text-[var(--ds-text-primary)]')}
        aria-live="polite"
      >
        {displayScore}%
      </p>

      <p className={cn('mt-4 text-xl font-bold md:text-2xl', mention.className)}>{mention.text}</p>

      {isPersonalBest ? (
        <motion.div
          initial={reduceMotion ? { scale: 1 } : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={
            reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 22 }
          }
          className="mt-4 inline-flex rounded-full border border-amber-500/40 bg-amber-500/15 px-4 py-1.5 text-sm font-semibold text-amber-700 dark:text-amber-200"
        >
          🎯 Nouveau record !
        </motion.div>
      ) : null}

      <p className="mt-6 text-sm text-[var(--ds-text-muted)]">
        {correctAnswers}/{totalQuestions} bonnes réponses
      </p>

      <div className="relative mt-4 h-10 w-full overflow-visible">
        <motion.p
          className="absolute inset-x-0 font-mono text-lg font-semibold text-amber-600 dark:text-amber-400"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 1, 1, 0], y: [0, 0, 0, -30] }}
          transition={{
            duration: totalDuration,
            times: [0, 1.6 / totalDuration, (1.6 + 0.01) / totalDuration, 1],
            ease: 'easeOut',
          }}
        >
          +{xpGained} XP
        </motion.p>
      </div>

      {streakAfter > 1 ? (
        <p className="mt-10 text-sm font-medium text-orange-600 dark:text-orange-400">
          🔥 Série de {streakAfter} jours !
        </p>
      ) : null}

      {hasMistakes ? (
        <div className="mt-8 w-full text-left">
          <p className="mb-3 text-center text-sm font-semibold text-[var(--ds-text-primary)]">Points à revoir :</p>
          <ul className="flex flex-wrap justify-center gap-2">
            {mistakeTopics?.map((topic) => (
              <li
                key={topic}
                className="rounded-full border border-red-500/45 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-800 dark:text-red-200"
              >
                {topic}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
        <Button type="button" className="w-full sm:w-auto" onClick={onContinue}>
          Leçon suivante →
        </Button>
        {hasMistakes ? (
          <Button type="button" variant="outline" className="w-full sm:w-auto" onClick={onReviewMistakes}>
            Revoir mes erreurs
          </Button>
        ) : null}
      </div>
    </div>
  );
}
