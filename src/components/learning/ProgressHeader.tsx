'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Heart } from 'lucide-react';

import { cn } from '@/utils/cn';

export interface ProgressHeaderProps {
  streak: number;
  xpCurrent: number;
  xpNextLevel: number;
  level: number;
  lives: number;
  daysUntilExam?: number;
}

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);
  const prev = ref.current;
  ref.current = value;
  return prev;
}

export function ProgressHeader({
  streak,
  xpCurrent,
  xpNextLevel,
  level,
  lives,
  daysUntilExam,
}: ProgressHeaderProps) {
  const reduceMotion = useReducedMotion();
  const livesClamped = Math.min(3, Math.max(0, Math.floor(lives)));
  const prevLives = usePrevious(livesClamped);
  const prevStreak = usePrevious(streak);

  const [streakPulse, setStreakPulse] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  const xpPct =
    xpNextLevel > 0 ? Math.min(100, Math.round((xpCurrent / xpNextLevel) * 1000) / 10) : 100;

  useEffect(() => {
    if (reduceMotion) return;
    if (prevStreak === undefined) return;
    if (streak > prevStreak) {
      setStreakPulse(true);
      const t = window.setTimeout(() => setStreakPulse(false), 700);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, [streak, prevStreak, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    if (prevLives === undefined) return;
    if (livesClamped < prevLives) {
      setShakeKey((k) => k + 1);
    }
  }, [livesClamped, prevLives, reduceMotion]);

  const instant = reduceMotion ? { duration: 0 } : undefined;
  const easeOut = [0.22, 1, 0.36, 1] as const;

  const headerTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.3, ease: easeOut };

  const streakSpring = reduceMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 500, damping: 18, mass: 0.6 };

  const xpBarTransition = reduceMotion
    ? { duration: 0 }
    : { type: 'tween' as const, ease: easeOut, duration: 0.45 };

  const shakeTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.45, ease: easeOut };

  return (
    <motion.header
      role='banner'
      initial={reduceMotion ? false : { y: -20, opacity: 0 }}
      animate={reduceMotion ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }}
      transition={headerTransition}
      className={cn(
        'sticky top-0 z-50 flex w-full items-center justify-between gap-2 border-b px-3 md:gap-4 md:px-4',
        'h-12 md:h-14',
        'border-[var(--ds-border)] bg-[color-mix(in_srgb,var(--ds-bg-primary)_88%,transparent)] backdrop-blur-md',
        'supports-[backdrop-filter]:bg-[color-mix(in_srgb,var(--ds-bg-primary)_78%,transparent)]',
        'dark:border-white/10 dark:bg-[color-mix(in_srgb,var(--ds-bg-primary)_90%,transparent)]',
        'dark:supports-[backdrop-filter]:bg-[color-mix(in_srgb,var(--ds-bg-primary)_82%,transparent)]',
      )}
    >
      <motion.div
        key={shakeKey}
        initial={false}
        animate={
          reduceMotion
            ? { x: 0 }
            : {
                x: [0, -5, 5, -4, 4, -2, 2, 0],
              }
        }
        transition={shakeTransition}
        className='flex min-w-0 flex-1 items-center justify-between gap-2 md:gap-4'
      >
        {/* Gauche — streak */}
        <div className='flex min-w-0 shrink-0 items-center gap-1.5 md:gap-2'>
          <motion.span
            aria-hidden
            className={cn(
              'inline-flex select-none text-lg leading-none md:text-xl',
              streak <= 0 && 'opacity-40 grayscale',
            )}
            animate={
              reduceMotion
                ? { scale: 1 }
                : streakPulse
                  ? { scale: [1, 1.4, 1] }
                  : { scale: 1 }
            }
            transition={streakSpring}
          >
            🔥
          </motion.span>
          <span
            className='font-mono text-sm font-semibold tabular-nums text-[var(--ds-text-primary)] md:text-base'
            aria-label={`Série : ${streak} jour${streak > 1 ? 's' : ''}`}
          >
            {streak}
          </span>
        </div>

        {/* Centre — XP */}
        <div className='mx-auto flex w-full max-w-[240px] min-w-0 flex-col gap-0.5'>
          <div className='flex items-center justify-between gap-2 text-[10px] font-medium uppercase tracking-wide text-[var(--ds-text-muted)] md:text-[11px]'>
            <span className='shrink-0'>Niv.{level}</span>
            <span className='min-w-0 truncate tabular-nums'>
              {xpCurrent}/{xpNextLevel} XP
            </span>
          </div>
          <div
            className='h-2 w-full overflow-hidden rounded-full bg-[var(--ds-bg-elevated)] ring-1 ring-[var(--ds-border)] dark:ring-white/10'
            role='progressbar'
            aria-valuenow={xpPct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Progression XP niveau ${level}`}
          >
            <motion.div
              className='h-full rounded-full bg-[var(--ds-accent)]'
              initial={false}
              animate={{ width: `${xpPct}%` }}
              transition={xpBarTransition}
            />
          </div>
        </div>

        {/* Droite — vies + badge examen */}
        <div className='flex shrink-0 flex-wrap items-center justify-end gap-1.5 md:gap-2'>
          <div
            className='flex items-center gap-0.5'
            role='img'
            aria-label={`${livesClamped} vie${livesClamped > 1 ? 's' : ''} sur 3`}
          >
            {[0, 1, 2].map((i) => {
              const full = i < livesClamped;
              const wasFull = prevLives !== undefined && i < prevLives;
              const justLost = prevLives !== undefined && wasFull && !full && i === prevLives - 1;

              return (
                <motion.span
                  key={i}
                  initial={false}
                  animate={
                    reduceMotion
                      ? { scale: 1, opacity: full ? 1 : 0.35 }
                      : justLost
                        ? { scale: [1, 0, 0.9], opacity: [1, 0, 0.45] }
                        : { scale: full ? 1 : 0.85, opacity: full ? 1 : 0.35 }
                  }
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : justLost
                        ? { duration: 0.35, times: [0, 0.55, 1], ease: 'easeInOut' }
                        : { type: 'spring', stiffness: 420, damping: 28 }
                  }
                  className='inline-flex'
                >
                  <Heart
                    className={cn(
                      'h-4 w-4 md:h-[18px] md:w-[18px]',
                      full
                        ? 'fill-red-500 text-red-500'
                        : 'fill-none text-[var(--ds-text-muted)] opacity-80',
                    )}
                    strokeWidth={full ? 0 : 1.75}
                    aria-hidden
                  />
                </motion.span>
              );
            })}
          </div>
          {typeof daysUntilExam === 'number' && daysUntilExam >= 0 ? (
            <span
              className='rounded-full border border-amber-500/35 bg-amber-500/15 px-2 py-0.5 font-mono text-[10px] font-semibold text-amber-800 tabular-nums dark:text-amber-200'
              title='Jours avant examen'
            >
              📅 {daysUntilExam}j
            </span>
          ) : null}
        </div>
      </motion.div>
    </motion.header>
  );
}
