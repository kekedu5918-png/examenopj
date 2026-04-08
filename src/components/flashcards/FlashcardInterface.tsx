'use client';

import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight, RotateCw, Shuffle, X } from 'lucide-react';

import type { Flashcard } from '@/data/flashcards-data';
import { splitRecapElements } from '@/utils/recap-bullets';

import { FlashcardRichText } from './flashcard-rich-text';
import type { FlashcardFacet, PreparedFlashcard } from './types';

const VERSO_TEXT =
  'text-[15px] leading-snug tracking-tight text-gray-100 sm:text-base sm:leading-relaxed';

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? 300 : -300, opacity: 0 }),
};

const flipTransition = { type: 'spring' as const, stiffness: 300, damping: 30 };

const facetLabel: Record<FlashcardFacet, string> = {
  materiel: 'Élément matériel',
  moral: 'Élément moral',
  materielMoral: 'Éléments matériel et moral',
};

const facetBadge: Record<FlashcardFacet, { text: string; className: string }> = {
  materiel: { text: 'ÉLÉMENT MATÉRIEL', className: 'bg-red-500/25 text-red-300 border-red-500/40' },
  moral: { text: 'ÉLÉMENT MORAL', className: 'bg-orange-500/25 text-orange-200 border-orange-500/40' },
  materielMoral: {
    text: 'MATÉRIEL + MORAL',
    className: 'bg-violet-500/25 text-violet-200 border-violet-500/40',
  },
};

/** Question affichée au recto (le cadre légal est rappelé sous le titre). */
const facetFrontChallenge: Record<FlashcardFacet, string> = {
  materiel: 'Tu te souviens de l’élément matériel ?',
  moral: 'Tu te souviens de l’élément moral ?',
  materielMoral: 'Tu te souviens des éléments matériel et moral ?',
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
  if (facet === 'materielMoral' && card.materielMoralComplet?.trim()) {
    return (
      <FlashcardRichText
        text={card.materielMoralComplet}
        className={`${VERSO_TEXT} [&_p]:mb-2 [&_p]:text-gray-100 [&_strong]:text-white`}
      />
    );
  }
  if (facet === 'materiel') {
    if (!card.materiel.length) {
      return <p className={`${VERSO_TEXT} text-gray-500`}>—</p>;
    }
    return (
      <ul className='list-none space-y-3'>
        {card.materiel.map((line, i) => (
          <li
            key={i}
            className='flex gap-3 border-b border-white/[0.07] pb-3 last:border-b-0 last:pb-0'
          >
            <span className='mt-0.5 shrink-0 text-lg leading-none text-amber-400' aria-hidden>
              •
            </span>
            <div className={`min-w-0 flex-1 break-words ${VERSO_TEXT}`}>
              <FlashcardRichText text={line} inline />
            </div>
          </li>
        ))}
      </ul>
    );
  }
  if (facet === 'moral') {
    const m = card.moral?.trim() ?? '';
    if (!m) {
      return <p className={`${VERSO_TEXT} text-gray-500`}>—</p>;
    }
    const moralParts = splitRecapElements(m);
    if (moralParts.length <= 1) {
      return <FlashcardRichText text={m} className={`${VERSO_TEXT} [&_p]:text-gray-100`} />;
    }
    return (
      <ul className='list-none space-y-3'>
        {moralParts.map((line, i) => (
          <li
            key={i}
            className='flex gap-3 border-b border-white/[0.07] pb-3 last:border-b-0 last:pb-0'
          >
            <span className='mt-0.5 shrink-0 text-lg leading-none text-amber-400' aria-hidden>
              •
            </span>
            <div className={`min-w-0 flex-1 break-words ${VERSO_TEXT}`}>
              <FlashcardRichText text={line} inline />
            </div>
          </li>
        ))}
      </ul>
    );
  }
  return <p className={`${VERSO_TEXT} text-gray-500`}>—</p>;
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
          <span className='inline-flex items-center gap-1 text-emerald-400'>
            <Check className='size-3.5' strokeWidth={2.5} aria-hidden />
            {counts.know}
          </span>
          <span className='text-amber-400'>~ {counts.review}</span>
          <span className='inline-flex items-center gap-1 text-red-400'>
            <X className='size-3.5' strokeWidth={2.5} aria-hidden />
            {counts.dontKnow}
          </span>
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
          className='relative min-h-[380px] w-full cursor-pointer touch-manipulation rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 sm:min-h-[420px]'
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={flipTransition}
        >
          <div
            className='absolute inset-0 flex min-h-[380px] flex-col rounded-3xl border-2 border-white/[0.1] bg-gradient-to-br from-navy-800 to-navy-900 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.3)] sm:min-h-[420px]'
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
            <div className='flex flex-1 flex-col items-center justify-center gap-4 px-4'>
              <h3 className='text-center font-display text-2xl font-bold text-white'>{card.nom}</h3>
              {card.legal?.trim() ? (
                <div className='max-w-md rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center'>
                  <p className='text-xs font-semibold uppercase tracking-wide text-slate-400'>Cadre légal</p>
                  <div className='mt-2 max-h-40 overflow-y-auto text-sm leading-snug text-slate-200 [-webkit-overflow-scrolling:touch]'>
                    <FlashcardRichText text={card.legal.trim()} className='[&_em]:text-slate-200 [&_p]:text-slate-200' />
                  </div>
                </div>
              ) : null}
              <p className='max-w-xs text-center text-base font-medium text-amber-200/90'>
                {facetFrontChallenge[facet]}
              </p>
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
            className='absolute inset-0 flex min-h-[380px] flex-col rounded-3xl border-2 border-white/[0.1] bg-gradient-to-br from-navy-900 to-navy-950 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.3)] sm:min-h-[420px]'
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
            <div className='flex min-h-0 flex-1 flex-col py-2'>
              <div className='min-h-[min(52dvh,320px)] flex-1 overflow-y-auto overscroll-y-contain px-1 [-webkit-overflow-scrolling:touch] sm:min-h-[240px] sm:max-h-[min(58vh,400px)]'>
                <VersoContent card={card} facet={facet} />
              </div>
            </div>
            {card.versoFooter?.trim() ? (
              <div className='shrink-0 border-t border-white/10 px-2 pt-3 text-center text-sm leading-snug text-gold-400/95'>
                <FlashcardRichText text={card.versoFooter.trim()} className='[&_p]:mb-1 [&_p]:last:mb-0' />
              </div>
            ) : null}
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
          className='inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-gray-200 transition hover:bg-white/[0.08]'
        >
          <ChevronLeft className='size-4' aria-hidden />
          Précédente
        </button>
        <button
          type='button'
          onClick={onRandom}
          className='inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-gray-200 transition hover:bg-white/[0.08]'
        >
          <Shuffle className='size-4' aria-hidden />
          Aléatoire
        </button>
        <button
          type='button'
          onClick={onNext}
          className='inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-gray-200 transition hover:bg-white/[0.08]'
        >
          Suivante
          <ChevronRight className='size-4' aria-hidden />
        </button>
      </div>
    </motion.div>
  );
}
