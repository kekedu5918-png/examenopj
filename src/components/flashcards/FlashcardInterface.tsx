'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight, RotateCw, Shuffle, X } from 'lucide-react';

import type { Flashcard } from '@/data/flashcards-data';
import { cn } from '@/utils/cn';
import { splitRecapElements } from '@/utils/recap-bullets';

import { FlashcardRichText } from './flashcard-rich-text';
import type { FlashcardFacet, PreparedFlashcard } from './types';

const VERSO_TEXT = 'text-[15px] leading-snug tracking-tight text-gray-100 sm:text-base sm:leading-relaxed';

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 280 : -280, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? 280 : -280, opacity: 0 }),
};

const flipTransition = { type: 'spring' as const, stiffness: 280, damping: 28 };

const facetLabel: Record<FlashcardFacet, string> = {
  materiel: 'Élément matériel',
  moral: 'Élément moral',
  materielMoral: 'Éléments matériel et moral',
};

const facetBadge: Record<FlashcardFacet, { text: string; className: string; glow: string }> = {
  materiel: {
    text: 'ÉLÉMENT MATÉRIEL',
    className: 'bg-red-500/20 text-red-300 border-red-500/35',
    glow: 'rgba(239,68,68,0.1)',
  },
  moral: {
    text: 'ÉLÉMENT MORAL',
    className: 'bg-orange-500/20 text-orange-200 border-orange-500/35',
    glow: 'rgba(249,115,22,0.1)',
  },
  materielMoral: {
    text: 'MATÉRIEL + MORAL',
    className: 'bg-violet-500/20 text-violet-200 border-violet-500/35',
    glow: 'rgba(139,92,246,0.1)',
  },
};

const facetFrontChallenge: Record<FlashcardFacet, string> = {
  materiel: "Tu te souviens de l'élément matériel ?",
  moral: "Tu te souviens de l'élément moral ?",
  materielMoral: "Tu te souviens des éléments matériel et moral ?",
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
    if (!card.materiel.length) return <p className={`${VERSO_TEXT} text-gray-500`}>—</p>;
    return (
      <ul className='list-none space-y-3'>
        {card.materiel.map((line, i) => (
          <li key={i} className='flex gap-3 border-b border-white/[0.07] pb-3 last:border-b-0 last:pb-0'>
            <span className='mt-0.5 shrink-0 text-lg leading-none text-amber-400' aria-hidden>•</span>
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
    if (!m) return <p className={`${VERSO_TEXT} text-gray-500`}>—</p>;
    const moralParts = splitRecapElements(m);
    if (moralParts.length <= 1) {
      return <FlashcardRichText text={m} className={`${VERSO_TEXT} [&_p]:text-gray-100`} />;
    }
    return (
      <ul className='list-none space-y-3'>
        {moralParts.map((line, i) => (
          <li key={i} className='flex gap-3 border-b border-white/[0.07] pb-3 last:border-b-0 last:pb-0'>
            <span className='mt-0.5 shrink-0 text-lg leading-none text-amber-400' aria-hidden>•</span>
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
  const shouldReduce = useReducedMotion();
  const { card, facet } = prepared;
  const [flipped, setFlipped] = useState(false);
  const toggleFlip = useCallback(() => setFlipped((f) => !f), []);

  /* Keyboard shortcuts */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggleFlip(); }
      if (e.key === 'ArrowLeft') onPrevious();
      if (e.key === 'ArrowRight') onNext();
      if (flipped) {
        if (e.key === '1') onAnswer('dontKnow');
        if (e.key === '2') onAnswer('review');
        if (e.key === '3') onAnswer('know');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [toggleFlip, onAnswer, onPrevious, onNext, flipped]);

  const badge = `F${String(fasciculeNum).padStart(2, '0')}`;
  const b = facetBadge[facet];
  const progressPct = total > 0 ? ((counts.know + counts.review + counts.dontKnow) / total) * 100 : 0;

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
      {/* En-tête avec progression et compteurs */}
      <div className='mb-4'>
        {/* Progress bar */}
        <div className='mb-3 flex items-center gap-3'>
          <div className='h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]'>
            <motion.div
              className='h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400'
              initial={false}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
          <span className='text-xs font-medium text-slate-500'>{index + 1}/{total}</span>
        </div>

        {/* Compteurs */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <span className='rounded-full bg-white/[0.03] px-2.5 py-1 text-xs text-slate-500'>{badge}</span>
            <span className='hidden text-xs text-slate-600 sm:inline'>{fasciculeLabel}</span>
          </div>
          <div className='flex gap-2 text-xs font-semibold'>
            <span className='flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/[0.07] px-2.5 py-1 text-emerald-400'>
              <Check className='size-3' strokeWidth={2.5} aria-hidden />
              {counts.know}
            </span>
            <span className='flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/[0.07] px-2.5 py-1 text-amber-400'>
              ~ {counts.review}
            </span>
            <span className='flex items-center gap-1 rounded-full border border-red-500/20 bg-red-500/[0.07] px-2.5 py-1 text-red-400'>
              <X className='size-3' strokeWidth={2.5} aria-hidden />
              {counts.dontKnow}
            </span>
          </div>
        </div>
      </div>

      {/* Carte 3D flip */}
      <div className='mx-auto w-full' style={{ perspective: '1200px' }}>
        <motion.div
          role='button'
          tabIndex={0}
          aria-label={flipped ? 'Cliquer pour voir le recto' : 'Cliquer pour révéler la réponse'}
          onClick={toggleFlip}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleFlip(); } }}
          className='relative min-h-[360px] w-full cursor-pointer touch-manipulation rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 sm:min-h-[400px]'
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={flipTransition}
        >
          {/* RECTO */}
          <div
            className='absolute inset-0 flex min-h-[360px] flex-col overflow-hidden rounded-3xl sm:min-h-[400px]'
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}
          >
            {/* Fond gradient premium */}
            <div className='absolute inset-0 bg-gradient-to-br from-[#111E38] via-[#0E1B30] to-[#0A1220]' />
            {/* Top highlight */}
            <div className='absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent' />
            {/* Border */}
            <div className='absolute inset-0 rounded-3xl ring-1 ring-white/[0.09]' />

            <div className='relative z-10 flex h-full flex-col p-6'>
              <div className='flex items-start justify-between gap-2'>
                <span className='rounded-full bg-white/[0.06] px-2.5 py-0.5 text-xs font-semibold text-slate-300'>{badge}</span>
                <span className={cn('rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-wider', b.className)}>
                  {b.text}
                </span>
              </div>

              <div className='flex flex-1 flex-col items-center justify-center gap-5 px-2 py-4'>
                <h3 className='text-center font-sans text-2xl font-extrabold tracking-tight text-white'>{card.nom}</h3>

                {card.legal?.trim() ? (
                  <div className='w-full max-w-sm rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-center'>
                    <p className='text-[10px] font-bold uppercase tracking-widest text-slate-500'>Cadre légal</p>
                    <div className='mt-2 max-h-32 overflow-y-auto text-xs leading-relaxed text-slate-300 [-webkit-overflow-scrolling:touch]'>
                      <FlashcardRichText text={card.legal.trim()} className='[&_em]:text-slate-200 [&_p]:text-slate-300' />
                    </div>
                  </div>
                ) : null}

                <p className='max-w-xs text-center text-sm font-medium text-amber-200/80'>
                  {facetFrontChallenge[facet]}
                </p>
              </div>

              <div className='flex items-center justify-center gap-2 text-xs text-slate-600'>
                <motion.span
                  animate={shouldReduce ? {} : { opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <RotateCw className='h-3.5 w-3.5' aria-hidden />
                </motion.span>
                <span>Appuyer ou <kbd className='rounded border border-white/10 bg-white/[0.05] px-1 font-mono text-[10px]'>Espace</kbd> pour retourner</span>
              </div>
            </div>
          </div>

          {/* VERSO */}
          <div
            className='absolute inset-0 flex min-h-[360px] flex-col overflow-hidden rounded-3xl sm:min-h-[400px]'
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className='absolute inset-0 bg-gradient-to-br from-[#0D1B2A] via-[#0A1520] to-[#060E18]' />
            <div className='absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent' />
            <div className='absolute inset-0 rounded-3xl ring-1 ring-white/[0.09]' />

            <div className='relative z-10 flex h-full flex-col p-6'>
              <div className='mb-4 flex justify-center'>
                <span className={cn('rounded-full border px-3 py-1 text-xs font-bold tracking-wide', b.className)}>
                  {b.text}
                </span>
              </div>

              <div className='min-h-0 flex-1 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]'>
                <VersoContent card={card} facet={facet} />
              </div>

              {card.versoFooter?.trim() ? (
                <div className='mt-3 shrink-0 border-t border-white/[0.07] pt-3 text-center text-xs leading-snug text-amber-400/80'>
                  <FlashcardRichText text={card.versoFooter.trim()} className='[&_p]:mb-1 [&_p]:last:mb-0' />
                </div>
              ) : null}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Boutons de réponse — visibles seulement au verso */}
      <motion.div
        className='mt-5'
        initial={false}
        animate={{ opacity: flipped ? 1 : 0, y: flipped ? 0 : 8, pointerEvents: flipped ? 'auto' : 'none' }}
        transition={{ duration: 0.25 }}
      >
        <p className='mb-3 text-center text-xs text-slate-600'>Comment ça s&apos;est passé ?</p>
        <div className='grid grid-cols-3 gap-2.5'>
          <button
            type='button'
            onClick={() => onAnswer('dontKnow')}
            className='group flex flex-col items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/[0.06] py-3.5 text-center transition hover:border-red-500/40 hover:bg-red-500/12 active:scale-95'
          >
            <X className='h-5 w-5 text-red-400 group-hover:scale-110 transition-transform' aria-hidden />
            <span className='text-xs font-semibold text-red-400'>Je ne sais pas</span>
            <kbd className='hidden rounded border border-red-500/20 px-1.5 font-mono text-[9px] text-red-600 sm:block'>1</kbd>
          </button>
          <button
            type='button'
            onClick={() => onAnswer('review')}
            className='group flex flex-col items-center gap-2 rounded-2xl border border-amber-500/20 bg-amber-500/[0.06] py-3.5 text-center transition hover:border-amber-500/40 hover:bg-amber-500/12 active:scale-95'
          >
            <RotateCw className='h-5 w-5 text-amber-400 group-hover:rotate-180 transition-transform duration-500' aria-hidden />
            <span className='text-xs font-semibold text-amber-400'>À revoir</span>
            <kbd className='hidden rounded border border-amber-500/20 px-1.5 font-mono text-[9px] text-amber-600 sm:block'>2</kbd>
          </button>
          <button
            type='button'
            onClick={() => onAnswer('know')}
            className='group flex flex-col items-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] py-3.5 text-center transition hover:border-emerald-500/40 hover:bg-emerald-500/12 active:scale-95'
          >
            <Check className='h-5 w-5 text-emerald-400 group-hover:scale-110 transition-transform' aria-hidden />
            <span className='text-xs font-semibold text-emerald-400'>Je sais !</span>
            <kbd className='hidden rounded border border-emerald-500/20 px-1.5 font-mono text-[9px] text-emerald-600 sm:block'>3</kbd>
          </button>
        </div>
      </motion.div>

      {/* Navigation */}
      <div className='mt-4 flex items-center justify-between gap-2'>
        <button
          type='button'
          onClick={onPrevious}
          className='inline-flex items-center gap-1.5 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2.5 text-xs text-slate-400 transition hover:bg-white/[0.06] hover:text-white'
        >
          <ChevronLeft className='size-3.5' aria-hidden />
          Précédente
        </button>
        <button
          type='button'
          onClick={onRandom}
          className='inline-flex items-center gap-1.5 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2.5 text-xs text-slate-400 transition hover:bg-white/[0.06] hover:text-white'
        >
          <Shuffle className='size-3.5' aria-hidden />
          Aléatoire
        </button>
        <button
          type='button'
          onClick={onNext}
          className='inline-flex items-center gap-1.5 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2.5 text-xs text-slate-400 transition hover:bg-white/[0.06] hover:text-white'
        >
          Suivante
          <ChevronRight className='size-3.5' aria-hidden />
        </button>
      </div>
    </motion.div>
  );
}
