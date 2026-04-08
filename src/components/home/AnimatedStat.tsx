'use client';

import { useEffect, useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

type AnimatedStatProps = {
  finalValue: number;
  suffix?: string;
  label: string;
};

export function AnimatedStat({ finalValue, suffix = '', label }: AnimatedStatProps) {
  const numRef = useRef<HTMLSpanElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapperRef, { once: true, margin: '-15% 0px -15% 0px' });
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (!numRef.current) return;
    if (shouldReduce || !inView) {
      numRef.current.textContent = `${finalValue}${suffix}`;
      return;
    }

    const duration = 1800;
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
  }, [finalValue, suffix, shouldReduce, inView]);

  return (
    <div ref={wrapperRef} className='rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-3 text-center'>
      <strong ref={numRef} className='text-lg font-bold text-white'>
        0{suffix}
      </strong>
      <p className='text-[11px] text-examen-inkMuted'>{label}</p>
    </div>
  );
}
