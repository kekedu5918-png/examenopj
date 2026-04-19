'use client';

import { type RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';

const DEFAULT_DURATION_MS = 450;

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

export type UseIntersectionCounterOptions = {
  finalValue: number;
  /** `false` si `prefers-reduced-motion: reduce` — pas d’interpolation, valeur finale seule. */
  animate: boolean;
  durationMs?: number;
  threshold?: number;
  rootMargin?: string;
};

/**
 * Compteur entier 0 → `finalValue` au premier passage visible dans le viewport (une fois terminé).
 * Si l’élément quitte le viewport pendant l’animation : annulation du RAF et saut à `finalValue`.
 */
export function useIntersectionCounter(
  targetRef: RefObject<Element | null>,
  {
    finalValue,
    animate,
    durationMs = DEFAULT_DURATION_MS,
    threshold = 0.15,
    rootMargin = '0px',
  }: UseIntersectionCounterOptions,
): number {
  const [value, setValue] = useState(finalValue);
  const completedRef = useRef(false);
  const runningRef = useRef(false);
  const rafRef = useRef(0);

  useLayoutEffect(() => {
    if (!animate) {
      setValue(finalValue);
      return;
    }
    setValue(0);
    completedRef.current = false;
  }, [animate, finalValue]);

  useEffect(() => {
    if (!animate) {
      return;
    }

    const el = targetRef.current;
    if (!el) {
      return;
    }

    const cancelRaf = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
    };

    const finishEarly = () => {
      cancelRaf();
      runningRef.current = false;
      setValue(finalValue);
      completedRef.current = true;
    };

    const tick = (now: number, startTime: number) => {
      const t = Math.min(1, (now - startTime) / durationMs);
      const eased = easeOutCubic(t);
      setValue(Math.round(eased * finalValue));
      if (t < 1) {
        rafRef.current = requestAnimationFrame((n) => tick(n, startTime));
      } else {
        setValue(finalValue);
        runningRef.current = false;
        completedRef.current = true;
        rafRef.current = 0;
      }
    };

    const startAnim = () => {
      if (completedRef.current || runningRef.current) {
        return;
      }
      runningRef.current = true;
      cancelRaf();
      setValue(0);
      const startTime = performance.now();
      rafRef.current = requestAnimationFrame((n) => tick(n, startTime));
    };

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) {
          return;
        }
        if (entry.isIntersecting) {
          startAnim();
        } else if (runningRef.current) {
          finishEarly();
        }
      },
      { threshold, rootMargin },
    );

    obs.observe(el);

    return () => {
      obs.disconnect();
      cancelRaf();
      runningRef.current = false;
    };
  }, [animate, durationMs, finalValue, rootMargin, threshold, targetRef]);

  return value;
}
