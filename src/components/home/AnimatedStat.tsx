'use client';

import { useEffect, useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

import { cn } from '@/utils/cn';

const DURATION_MS = 1500;

type AnimatedStatProps = {
  finalValue: number;
  suffix?: string;
  label: string;
  /** Anime dès le montage (ex. stats visibles sur mobile sans attendre l’intersection). */
  animateOnMount?: boolean;
  /** `light` : fond clair (section compteurs homepage). */
  variant?: 'default' | 'light';
};

export function AnimatedStat({
  finalValue,
  suffix = '',
  label,
  animateOnMount = false,
  variant = 'default',
}: AnimatedStatProps) {
  const numRef = useRef<HTMLSpanElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapperRef, { once: true, margin: '0px 0px -10% 0px' });
  const shouldReduce = useReducedMotion();
  const shouldRun = animateOnMount || inView;

  useEffect(() => {
    if (!numRef.current) return;
    if (shouldReduce) {
      numRef.current.textContent = `${finalValue}${suffix}`;
      return;
    }
    if (!shouldRun) {
      numRef.current.textContent = `0${suffix}`;
      return;
    }

    const duration = DURATION_MS;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.ceil(eased * finalValue);
      if (numRef.current) numRef.current.textContent = `${value}${suffix}`;
      if (t < 1) raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [finalValue, suffix, shouldReduce, shouldRun]);

  const light = variant === 'light';

  return (
    <div
      ref={wrapperRef}
      className={cn(
        light
          ? 'text-left'
          : 'rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-3 text-center',
      )}
    >
      <strong
        ref={numRef}
        className={cn(light ? 'font-display text-2xl font-semibold tracking-tight text-orde-slate900' : 'text-lg font-bold text-white')}
      >
        0{suffix}
      </strong>
      <p className={cn(light ? 'mt-1 text-sm text-slate-600' : 'text-[11px] text-examen-inkMuted')}>{label}</p>
    </div>
  );
}
