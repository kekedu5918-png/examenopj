'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, Brain, FileEdit, ListOrdered } from 'lucide-react';

import { LANDING_EASE } from '@/components/home/motion';
import { cn } from '@/utils/cn';

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

const STATS = [
  { value: 15, label: 'Fascicules officiels', suffix: '', icon: BookOpen, iconClass: 'text-blue-400', delay: 0 },
  { value: 150, label: 'Infractions détaillées', suffix: '+', icon: ListOrdered, iconClass: 'text-red-400', delay: 0.08 },
  { value: 3, label: 'Épreuves couvertes', suffix: '', icon: FileEdit, iconClass: 'text-gold-400', delay: 0.16 },
  { value: 500, label: 'Questions de quiz', suffix: '+', icon: Brain, iconClass: 'text-green-400', delay: 0.24 },
] as const;

type StatTileProps = {
  icon: (typeof STATS)[number]['icon'];
  value: number;
  suffix?: string;
  label: string;
  iconClass: string;
  delay: number;
};

function StatTile({ icon: Icon, value, suffix = '', label, iconClass, delay }: StatTileProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.25, margin: '0px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
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

  useEffect(() => {
    const id = window.setTimeout(() => {
      setDisplay((d) => (d < value ? value : d));
    }, 2400);
    return () => window.clearTimeout(id);
  }, [value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: LANDING_EASE, delay }}
      className='will-change-transform'
    >
      <div className='rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 text-center'>
        <div className={cn('mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.06]', iconClass)}>
          <Icon className='h-7 w-7' strokeWidth={1.75} />
        </div>
        <p className='font-display text-3xl font-bold tabular-nums text-gray-100' aria-label={`${display}${suffix} ${label}`}>
          {display}
          {suffix}
        </p>
        <p className='mt-2 text-sm text-gray-400'>{label}</p>
      </div>
    </motion.div>
  );
}

export function StatsBandSection() {
  return (
    <section className='py-24'>
      <div className='h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent' aria-hidden />
      <div className='border-y border-white/5 bg-navy-900/50 py-12 backdrop-blur-sm'>
        <div className='mx-auto grid max-w-4xl grid-cols-2 gap-6 px-6 md:grid-cols-4'>
          {STATS.map((s) => (
            <StatTile
              key={s.label}
              icon={s.icon}
              value={s.value}
              suffix={s.suffix}
              label={s.label}
              iconClass={s.iconClass}
              delay={s.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
