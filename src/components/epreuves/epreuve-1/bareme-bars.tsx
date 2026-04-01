'use client';

import { motion } from 'framer-motion';

import { LANDING_EASE } from '@/components/home/motion';

const ease = [...LANDING_EASE] as [number, number, number, number];

const items = [
  { label: 'Démonstration (corps du devoir)', pts: '15 pts', widthPct: 75, barClass: 'bg-gradient-to-r from-red-500 to-orange-500' },
  { label: 'Présentation', pts: '2 pts', widthPct: 10, barClass: 'bg-blue-500' },
  { label: 'Conclusion', pts: '2 pts', widthPct: 10, barClass: 'bg-emerald-500' },
  { label: 'Introduction', pts: '1 pt', widthPct: 5, barClass: 'bg-gold-400' },
] as const;

export function BaremeBars() {
  return (
    <div className='space-y-3'>
      {items.map((item, i) => (
        <div key={item.label} className='relative h-12 overflow-hidden rounded-lg bg-white/[0.06]'>
          <motion.div
            className={`absolute inset-y-0 left-0 rounded-lg ${item.barClass}`}
            initial={{ width: '0%' }}
            whileInView={{ width: `${item.widthPct}%` }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.85, ease, delay: i * 0.08 }}
            style={{ willChange: 'width' }}
          />
          <div className='relative z-10 flex h-full items-center justify-between gap-3 px-4 text-sm font-semibold'>
            <span className='min-w-0 truncate text-white drop-shadow-sm'>{item.label}</span>
            <span className='shrink-0 tabular-nums text-white drop-shadow-sm'>{item.pts}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
