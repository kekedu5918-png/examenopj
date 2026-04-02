'use client';

import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, RotateCw, X } from 'lucide-react';

import type { Flashcard } from '@/data/flashcards-data';

import type { FlashcardFacet, PreparedFlashcard } from './types';

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? 300 : -300, opacity: 0 }),
};

const flipTransition = { type: 'spring' as const, stiffness: 300, damping: 30 };

const facetLabel: Record<FlashcardFacet, string> = {
  materiel: 'Élément matériel',
  moral: 'Élément moral',
  legal: 'Élément légal',
};

const facetBadge: Record<FlashcardFacet, { text: string; className: string }> = {
  materiel: { text: 'ÉLÉMENT MATÉRIEL', className: 'bg-red-500/25 text-red-300 border-red-500/40' },
  moral: { text: 'ÉLÉMENT MORAL', className: 'bg-orange-500/25 text-orange-200 border-orange-500/40' },
  legal: { text: 'ÉLÉMENT LÉGAL', className: 'bg-blue-500/25 text-blue-200 border-blue-500/40' },
};

type FlashcardInterfaceProps = {
  prepared: PreparedFlashcard;
  index: number;
  total: number;
  direction: number;
  fasciculeLabel: string;
  fasciculeNum: number;
  counts: { know: number; review: number; dontKnow: number };
  onAnswer: (kind: 'know' | 'review' | 'dontKnow') => void;
  onPrevious: () => void;
  onNext: () => void;
  onRandom: () => void;
};

function VersoContent({ card, facet }: { card: Flashcard; facet: FlashcardFacet }) {
  if (facet === 'materiel') {
    return (
      <ul className='list-none space-y-2.5 text-base leading-relaxed text-gray-200'>
        {card.materiel.map((line, i) => (
          <li key={i} className='flex gap-2'>
            <span className='shrink-0 text-gold-400'>•</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
    );
  }
  if (facet === 'moral') {
    return <p className='text-base leading-relaxed text-gray-200'>{card.moral}</p>;
  }
  return <p className='text-base leading-relaxed text-gray-200'>{card.legal}</p>;
}

export function FlashcardInterface({
  prepared,
  index,
  total,
  direction,
  fasciculeLabel,
  fasciculeNum,
  counts,
  onAnswer,
  onPrevious,
  onNext,
  onRandom,
}: FlashcardInterfaceProps) {
  const { card, facet } = prepared;
  const [flipped, setFlipped] = useState(false);

  const toggleFlip = useCallback(() => setFlipped((f) => !f), []);

  const badge = `F${String(fasciculeNum).padStart(2, '0')}`;
  const b = facetBadge[facet];

  return (
    <motion.div
      custom={direction}
      variants={slideVariants}
      initial='enter'
      animate='center'
      exit='exit'
      transition={{ type: 'spring', stiffness: 320, damping: 32 }}
      className='mx-auto w-full max-w-lg'
    >
      <div className='mb-4 flex items-center justify-between gap-4'>
        <p className='text-sm text-gray-400'>
          Carte {index + 1} / {total}
        </p>
        <div className='flex flex-wrap items-center justify-end gap-3 text-sm'>
          <span className='text-emerald-400'>
            ✓ {counts.know}
          </span>
          <span className='text-amber-400'>~ {counts.review}</span>
          <span className='text-red-400'>✗ {counts.dontKnow}</span>
        </div>
      </div>

      <div className='mx-auto w-full' style={{ perspective: '1200px' }}>
        <motion.div
          role='button'
          tabIndex={0}
          onClick={toggleFlip}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleFlip();
            }
          }}
          className='relative min-h-[320px] w-full cursor-pointer touch-manipulation rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60'
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={flipTransition}
        >
          <div
            className='absolute inset-0 flex flex-col rounded-3xl border-2 border-white/[0.1] bg-gradient-to-br from-navy-800 to-navy-900 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.3)]'
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(0deg)',
            }}
          >
            <div className='flex flex-col gap-1'>
              <span className='inline-flex w-fit rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-gray-300'>
                {badge}
              </span>
              <span className='text-xs text-gray-500'>{fasciculeLabel}</span>
            </div>
            <div className='flex flex-1 flex-col items-center justify-center px-4'>
              <h3 className='text-center font-display text-2xl font-bold text-white'>{card.nom}</h3>
            </div>
            <p className='text-center text-xs text-gold-400'>→ {facetLabel[facet]}</p>
            <div className='mt-2 flex items-center justify-center gap-2 text-sm text-gray-500'>
              <span>Touchez pour retourner</span>
              <motion.span
                animate={{ opacity: [0.45, 1, 0.45] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <RotateCw className='h-4 w-4' aria-hidden />
              </motion.span>
            </div>
          </div>

          <div
            className='absolute inset-0 flex flex-col rounded-3xl border-2 border-white/[0.1] bg-gradient-to-br from-navy-900 to-navy-950 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.3)]'
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className='flex justify-center'>
              <span
                className={`rounded-full border px-3 py-1 text-xs font-bold tracking-wide ${b.className}`}
              >
                {b.text}
              </span>
            </div>
            <div className='flex flex-1 items-center overflow-y-auto py-4'>
              <div className='max-h-[220px] w-full overflow-y-auto px-2 sm:max-h-none sm:overflow-visible'>
                <VersoContent card={card} facet={facet} />
              </div>
            </div>
            <p className='text-center text-sm text-gold-400'>{card.legal}</p>
          </div>
        </motion.div>
      </div>

      <div className='mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3'>
        <button
          type='button'
          onClick={() => onAnswer('dontKnow')}
          className='flex flex-col items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/[0.08] p-4 text-center transition hover:bg-red-500/15'
        >
          <X className='h-5 w-5 text-red-400' aria-hidden />
          <span className='text-sm text-red-400'>Je ne sais pas</span>
        </button>
        <button
          type='button'
          onClick={() => onAnswer('review')}
          className='flex flex-col items-center justify-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/[0.08] p-4 text-center transition hover:bg-amber-500/15'
        >
          <RotateCw className='h-5 w-5 text-amber-400' aria-hidden />
          <span className='text-sm text-amber-400'>À revoir</span>
        </button>
        <button
          type='button'
          onClick={() => onAnswer('know')}
          className='flex flex-col items-center justify-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.08] p-4 text-center transition hover:bg-emerald-500/15'
        >
          <Check className='h-5 w-5 text-emerald-400' aria-hidden />
          <span className='text-sm text-emerald-400'>Je sais</span>
        </button>
      </div>

      <div className='mt-4 flex flex-wrap gap-3'>
        <button
          type='button'
          onClick={onPrevious}
          className='rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-gray-200 transition hover:bg-white/[0.08]'
        >
          ◀ Précédente
        </button>
        <button
          type='button'
          onClick={onRandom}
          className='rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-gray-200 transition hover:bg-white/[0.08]'
        >
          🔀 Aléatoire
        </button>
        <button
          type='button'
          onClick={onNext}
          className='rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-gray-200 transition hover:bg-white/[0.08]'
        >
          Suivante ▶
        </button>
      </div>
    </motion.div>
  );
}
