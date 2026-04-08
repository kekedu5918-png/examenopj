'use client';

import { motion } from 'framer-motion';

type FlashcardResultProps = {
  know: number;
  review: number;
  dontKnow: number;
  onReviewWeak: () => void;
  onRestartAll: () => void;
  onChangeFascicule: () => void;
};

function StatCircle({
  value,
  total,
  label,
  strokeClass,
}: {
  value: number;
  total: number;
  label: string;
  strokeClass: string;
}) {
  const r = 44;
  const c = 2 * Math.PI * r;
  const ratio = total > 0 ? value / total : 0;
  const dash = ratio * c;
  return (
    <div className='flex flex-col items-center gap-2 text-center'>
      <svg width={112} height={112} viewBox='0 0 112 112' className='shrink-0'>
        <circle cx='56' cy='56' r={r} fill='none' stroke='currentColor' strokeWidth='6' className='text-white/10' />
        <circle
          cx='56'
          cy='56'
          r={r}
          fill='none'
          strokeWidth='6'
          strokeLinecap='round'
          strokeDasharray={`${dash} ${c}`}
          transform='rotate(-90 56 56)'
          className={strokeClass}
        />
        <text
          x='56'
          y='56'
          textAnchor='middle'
          dominantBaseline='central'
          className='fill-gray-100 font-display text-2xl font-bold'
        >
          {value}
        </text>
      </svg>
      <p className='max-w-[140px] text-sm text-gray-400'>{label}</p>
    </div>
  );
}

export function FlashcardResult({
  know,
  review,
  dontKnow,
  onReviewWeak,
  onRestartAll,
  onChangeFascicule,
}: FlashcardResultProps) {
  const total = know + review + dontKnow;

  return (
    <motion.div
      className='mx-auto max-w-2xl space-y-10 px-4 py-8'
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
    >
      <h3 className='text-center font-display text-2xl font-bold text-gray-100'>Session terminée</h3>
      <div className='flex flex-wrap items-start justify-center gap-8 md:gap-12'>
        <StatCircle
          value={know}
          total={total}
          label='cartes maîtrisées'
          strokeClass='stroke-emerald-400'
        />
        <StatCircle
          value={review}
          total={total}
          label='cartes à revoir'
          strokeClass='stroke-amber-400'
        />
        <StatCircle
          value={dontKnow}
          total={total}
          label='cartes à apprendre'
          strokeClass='stroke-red-400'
        />
      </div>
      <div className='flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center'>
        <button
          type='button'
          onClick={onReviewWeak}
          className='rounded-xl bg-amber-500/10 px-6 py-4 text-sm font-medium text-amber-200 transition hover:bg-amber-500/20'
        >
          Revoir les non maîtrisées
        </button>
        <button
          type='button'
          onClick={onRestartAll}
          className='rounded-xl bg-white/10 px-6 py-4 text-sm font-medium text-gray-200 transition hover:bg-white/15'
        >
          Recommencer tout
        </button>
        <button
          type='button'
          onClick={onChangeFascicule}
          className='rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4 text-sm font-semibold text-white shadow-lg transition hover:opacity-95'
        >
          Changer de module
        </button>
      </div>
    </motion.div>
  );
}
