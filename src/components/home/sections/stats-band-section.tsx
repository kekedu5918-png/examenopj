'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, Brain, FileEdit, Scale } from 'lucide-react';

import { LANDING_EASE } from '@/components/home/motion';
import { cn } from '@/utils/cn';

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

type StatTileProps = {
  icon: typeof BookOpen;
  value: number;
  suffix?: string;
  label: string;
  iconClass: string;
  delay: number;
};

function StatTile({ icon: Icon, value, suffix = '', label, iconClass, delay }: StatTileProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-12%' });
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
        <p className='font-display text-3xl font-bold tabular-nums text-gray-100'>
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
          <StatTile icon={BookOpen} value={11} label='Fascicules officiels' iconClass='text-blue-400' delay={0} />
          <StatTile icon={Scale} value={45} label='Infractions détaillées' iconClass='text-red-400' delay={0.08} />
          <StatTile icon={FileEdit} value={3} label='Épreuves couvertes' iconClass='text-gold-400' delay={0.16} />
          <StatTile icon={Brain} value={200} suffix='+' label='Questions de quiz' iconClass='text-green-400' delay={0.24} />
        </div>
      </div>
    </section>
  );
}
