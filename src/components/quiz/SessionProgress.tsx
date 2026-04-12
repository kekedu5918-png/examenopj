'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, Heart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/utils/cn';

export interface SessionProgressProps {
  current: number;
  total: number;
  lives: number;
  xpGained: number;
  streak: number;
  onQuit: () => void;
}

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);
  const prev = ref.current;
  ref.current = value;
  return prev;
}

export function SessionProgress({
  current,
  total,
  lives,
  xpGained,
  streak,
  onQuit,
}: SessionProgressProps) {
  const reduceMotion = useReducedMotion();
  const [quitOpen, setQuitOpen] = useState(false);

  const livesClamped = Math.min(3, Math.max(0, Math.floor(lives)));
  const prevLives = usePrevious(livesClamped);
  const [shakeKey, setShakeKey] = useState(0);

  const progressPct = total > 0 ? Math.min(100, (current / total) * 100) : 0;

  useEffect(() => {
    if (reduceMotion) return;
    if (prevLives === undefined) return;
    if (livesClamped < prevLives) {
      setShakeKey((k) => k + 1);
    }
  }, [livesClamped, prevLives, reduceMotion]);

  const easeOut = [0.22, 1, 0.36, 1] as const;
  const headerTransition = reduceMotion ? { duration: 0 } : { duration: 0.3, ease: easeOut };
  const barTransition = reduceMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 120, damping: 22, mass: 0.85 };
  const shakeTransition = reduceMotion ? { duration: 0 } : { duration: 0.45, ease: easeOut };

  function handleQuitConfirm() {
    setQuitOpen(false);
    onQuit();
  }

  return (
    <>
      <motion.header
        role="banner"
        initial={reduceMotion ? false : { y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={headerTransition}
        className={cn(
          'sticky top-0 z-50 flex h-12 w-full shrink-0 items-center gap-2 border-b px-2 md:gap-3 md:px-4',
          'border-[var(--ds-border)] bg-[color-mix(in_srgb,var(--ds-bg-primary)_88%,transparent)] backdrop-blur-md',
          'supports-[backdrop-filter]:bg-[color-mix(in_srgb,var(--ds-bg-primary)_78%,transparent)]',
          'dark:border-white/10 dark:bg-[color-mix(in_srgb,var(--ds-bg-primary)_90%,transparent)]',
          'dark:supports-[backdrop-filter]:bg-[color-mix(in_srgb,var(--ds-bg-primary)_82%,transparent)]',
        )}
      >
        <button
          type="button"
          onClick={() => setQuitOpen(true)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[var(--ds-text-muted)] transition hover:bg-[var(--ds-bg-elevated)] hover:text-[var(--ds-text-primary)] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[var(--ds-accent)]"
          aria-label="Quitter la session"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden />
        </button>

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 px-1">
          <div
            className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--ds-bg-elevated)] ring-1 ring-[var(--ds-border)] dark:ring-white/10"
            role="progressbar"
            aria-valuenow={Math.round(progressPct)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Progression ${current} sur ${total}`}
          >
            <motion.div
              className="h-full rounded-full bg-[var(--ds-accent)]"
              initial={false}
              animate={{ width: `${progressPct}%` }}
              transition={barTransition}
            />
          </div>
          <p className="text-center text-[10px] font-medium tabular-nums text-[var(--ds-text-muted)] md:text-xs">
            {current}/{total}
          </p>
        </div>

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
          className="flex shrink-0 items-center gap-2 md:gap-3"
        >
          <div
            className="flex items-center gap-0.5"
            role="img"
            aria-label={`${livesClamped} vie${livesClamped > 1 ? 's' : ''} sur 3`}
          >
            {[0, 1, 2].map((i) => {
              const full = i < livesClamped;
              const wasFull = prevLives !== undefined && i < prevLives;
              const justLost =
                prevLives !== undefined && wasFull && !full && i === prevLives - 1;

              return (
                <motion.span
                  key={i}
                  initial={false}
                  animate={
                    reduceMotion
                      ? { scale: 1, opacity: full ? 1 : 0.35 }
                      : justLost
                        ? { scale: [1, 0, 0], opacity: [1, 0, 0] }
                        : { scale: full ? 1 : 0.85, opacity: full ? 1 : 0.35 }
                  }
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : justLost
                        ? { duration: 0.35, times: [0, 0.55, 1], ease: 'easeInOut' }
                        : { type: 'spring', stiffness: 420, damping: 28 }
                  }
                  className="inline-flex"
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

          <span className="font-mono text-[11px] font-semibold tabular-nums text-amber-600 dark:text-amber-400 md:text-xs">
            ⚡{xpGained} XP
          </span>

          {streak > 0 ? (
            <span
              className="text-[11px] font-semibold tabular-nums text-orange-600 dark:text-orange-400 md:text-xs"
              aria-label={`Série : ${streak}`}
            >
              🔥{streak}
            </span>
          ) : null}
        </motion.div>
      </motion.header>

      <Dialog open={quitOpen} onOpenChange={setQuitOpen}>
        <DialogContent className="border-[var(--ds-border)] bg-[var(--ds-bg-primary)] text-[var(--ds-text-primary)] sm:max-w-md [&>button]:hidden">
          <DialogHeader>
            <DialogTitle>Quitter la session ?</DialogTitle>
            <DialogDescription className="text-[var(--ds-text-muted)]">
              Ta progression de cette session sera perdue.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" className="border-red-500/50 text-red-700 hover:bg-red-500/10 dark:text-red-300" onClick={handleQuitConfirm}>
              Quitter
            </Button>
            <Button type="button" onClick={() => setQuitOpen(false)}>
              Continuer →
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
