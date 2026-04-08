'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

import { cn } from '@/utils/cn';

import { GlassCard } from './GlassCard';

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

type StatCardProps = {
  icon: LucideIcon;
  value: number;
  label: string;
  color: string;
  className?: string;
};

export function StatCard({ icon: Icon, value, label, color, className }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1400;
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(value * easeOutCubic(t)));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, value]);

  return (
    <div ref={ref}>
      <GlassCard hover className={cn('flex flex-col gap-3', className)} padding='p-6'>
        <div className='flex items-center gap-3'>
          <div className={cn('rounded-xl bg-white/[0.06] p-2.5', color)}>
            <Icon className='h-6 w-6' strokeWidth={1.75} />
          </div>
          <span className='font-display text-3xl font-bold tabular-nums text-white'>{display}</span>
        </div>
        <p className='text-sm text-gray-400'>{label}</p>
      </GlassCard>
    </div>
  );
}
