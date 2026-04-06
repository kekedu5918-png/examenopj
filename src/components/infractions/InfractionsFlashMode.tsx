'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight, Filter, X } from 'lucide-react';

import { FlashcardRichText } from '@/components/flashcards/flashcard-rich-text';
import { MOTION_INITIAL_FOR_SEO } from '@/components/home/motion';
import type { InfractionCatalogItem } from '@/data/recapitulatif-data';
import { cn } from '@/utils/cn';
import {
  buildFlashDeck,
  flashSessionSummary,
  loadFlashResults,
  saveFlashMark,
} from '@/utils/flash-infractions-storage';
import {
  classifyMoral,
  condenseMaterielKeys,
  derivePeineFromLegal,
  moralKindBadgeClass,
  moralKindLabel,
  stripMdBold,
} from '@/utils/infraction-display-derive';

type FascOpt = 'all' | 'F01' | 'F02';

type Props = {
  filtered: InfractionCatalogItem[];
};

export function InfractionsFlashMode({ filtered }: Props) {
  const [fasc, setFasc] = useState<FascOpt>('all');
  const [onlyArevoir, setOnlyArevoir] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [deck, setDeck] = useState<InfractionCatalogItem[]>([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [phase, setPhase] = useState<'play' | 'summary'>('play');
  const [hintOn, setHintOn] = useState(true);

  const rebuildDeck = useCallback(() => {
    setDeck(buildFlashDeck(filtered, { fasc, onlyArevoir, shuffle }));
    setIndex(0);
    setFlipped(false);
    setPhase('play');
  }, [fasc, filtered, onlyArevoir, shuffle]);

  useEffect(() => {
    rebuildDeck();
  }, [rebuildDeck]);

  useEffect(() => {
    const t = window.setTimeout(() => setHintOn(false), 5000);
    return () => window.clearTimeout(t);
  }, [index]);

  const current = deck[index];
  const total = deck.length;
  const progress = total > 0 ? (index + (flipped ? 0.5 : 0)) / total : 0;

  const goNext = useCallback(() => {
    if (!deck.length) return;
    if (index >= deck.length - 1) {
      setPhase('summary');
      return;
    }
    setIndex((i) => i + 1);
    setFlipped(false);
  }, [deck.length, index]);

  const goPrev = useCallback(() => {
    if (index <= 0) return;
    setIndex((i) => i - 1);
    setFlipped(false);
  }, [index]);

  const toggleFlip = useCallback(() => {
    setFlipped((f) => !f);
  }, []);

  const markSu = useCallback(() => {
    if (!current) return;
    saveFlashMark(current.id, 'su');
    goNext();
  }, [current, goNext]);

  const markArevoir = useCallback(() => {
    if (!current) return;
    saveFlashMark(current.id, 'arevoir');
    goNext();
  }, [current, goNext]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (phase === 'summary') return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'Space' || e.key === 'Enter') {
        e.preventDefault();
        toggleFlip();
      }
      if (e.key === 'ArrowRight' || e.key === 'l' || e.key === 'L') {
        e.preventDefault();
        goNext();
      }
      if (e.key === 'ArrowLeft' || e.key === 'h' || e.key === 'H') {
        e.preventDefault();
        goPrev();
      }
      if (e.key === '1') {
        e.preventDefault();
        markSu();
      }
      if (e.key === '2') {
        e.preventDefault();
        markArevoir();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev, markArevoir, markSu, phase, toggleFlip]);

  if (phase === 'summary' && total > 0) {
    const r = loadFlashResults();
    let mastered = 0;
    for (const d of deck) {
      if (r[d.id]?.status === 'su') mastered++;
    }
    const summary = flashSessionSummary(deck);
    const pct = Math.round((mastered / total) * 100);
    const c = 2 * Math.PI * 52;
    const dash = (c * pct) / 100;
    return (
      <div className='mx-auto flex max-w-2xl flex-col items-center px-4 py-10'>
        <h2 className='font-display text-2xl font-bold text-white'>Session terminée</h2>
        <div className='relative mt-8 h-36 w-36'>
          <svg className='-rotate-90' viewBox='0 0 120 120' aria-hidden>
            <circle cx='60' cy='60' r='52' fill='none' stroke='rgba(255,255,255,0.1)' strokeWidth='10' />
            <motion.circle
              cx='60'
              cy='60'
              r='52'
              fill='none'
              stroke='#4F6EF7'
              strokeWidth='10'
              strokeLinecap='round'
              initial={{ strokeDasharray: `0 ${c}` }}
              animate={{ strokeDasharray: `${dash} ${c}` }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            />
          </svg>
          <div className='absolute inset-0 flex flex-col items-center justify-center'>
            <span className='text-3xl font-bold text-white'>{mastered}</span>
            <span className='text-xs text-[#8888A0]'>/ {total} maîtrisées</span>
          </div>
        </div>
        <p className='mt-6 text-center text-[#F0F0F5]'>
          {summary.su} connues · {summary.arevoir} à revoir
        </p>
        <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
          <button
            type='button'
            onClick={() => {
              setOnlyArevoir(true);
            }}
            className='rounded-xl bg-[#F59E0B]/20 px-5 py-2.5 text-sm font-semibold text-[#F59E0B] ring-1 ring-[#F59E0B]/35'
          >
            Relancer les « À revoir »
          </button>
          <button
            type='button'
            onClick={() => {
              setOnlyArevoir(false);
            }}
            className='rounded-xl border border-white/15 bg-white/[0.06] px-5 py-2.5 text-sm font-semibold text-white'
          >
            Recommencer tout
          </button>
          <Link
            href='/infractions?vue=tableau'
            className='rounded-xl bg-[#4F6EF7] px-5 py-2.5 text-center text-sm font-semibold text-white'
          >
            Voir le tableau complet
          </Link>
        </div>
      </div>
    );
  }

  if (!deck.length) {
    return (
      <div className='mx-auto max-w-2xl px-4 py-12 text-center text-[#8888A0]'>
        <p>Aucune infraction dans ce jeu avec les filtres choisis.</p>
        <button
          type='button'
          onClick={() => {
            setOnlyArevoir(false);
            rebuildDeck();
          }}
          className='mt-4 text-[#4F6EF7] underline'
        >
          Réinitialiser les filtres
        </button>
      </div>
    );
  }

  return (
    <div className='mx-auto flex max-w-4xl flex-col gap-6 px-4 pb-16 lg:flex-row'>
      <aside className='hidden w-full shrink-0 space-y-4 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 lg:block lg:w-56'>
        <p className='text-xs font-bold uppercase tracking-wider text-[#8888A0]'>Filtres</p>
        <div className='space-y-2'>
          <p className='text-xs text-[#8888A0]'>Fascicule</p>
          {(['all', 'F01', 'F02'] as const).map((f) => (
            <label key={f} className='flex cursor-pointer items-center gap-2 text-sm text-[#F0F0F5]'>
              <input
                type='radio'
                name='flash-fasc'
                checked={fasc === f}
                onChange={() => setFasc(f)}
                className='rounded border-white/20 bg-white/10 text-[#4F6EF7]'
              />
              {f === 'all' ? 'Tous' : f}
            </label>
          ))}
        </div>
        <label className='flex cursor-pointer items-center gap-2 text-sm text-[#F0F0F5]'>
          <input
            type='checkbox'
            checked={onlyArevoir}
            onChange={(e) => setOnlyArevoir(e.target.checked)}
            className='rounded border-white/20 bg-white/10 text-[#4F6EF7]'
          />
          Mode révision ciblée (À revoir)
        </label>
        <label className='flex cursor-pointer items-center gap-2 text-sm text-[#F0F0F5]'>
          <input
            type='checkbox'
            checked={shuffle}
            onChange={(e) => setShuffle(e.target.checked)}
            className='rounded border-white/20 bg-white/10 text-[#4F6EF7]'
          />
          Ordre aléatoire
        </label>
      </aside>

      <div className='min-w-0 flex-1'>
        <div className='mb-4 flex items-center justify-between lg:hidden'>
          <button
            type='button'
            onClick={() => setFiltersOpen(true)}
            className='inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-white'
            aria-expanded={filtersOpen}
          >
            <Filter className='h-4 w-4' />
            Filtres
          </button>
        </div>

        {filtersOpen ? (
          <div className='fixed inset-0 z-50 flex flex-col bg-[#0a0a12]/95 p-4 lg:hidden'>
            <div className='mb-4 flex justify-end'>
              <button type='button' aria-label='Fermer les filtres' onClick={() => setFiltersOpen(false)}>
                <X className='h-6 w-6 text-white' />
              </button>
            </div>
            <div className='space-y-4'>
              {(['all', 'F01', 'F02'] as const).map((f) => (
                <label key={f} className='flex items-center gap-2 text-[#F0F0F5]'>
                  <input
                    type='radio'
                    name='flash-fasc-m'
                    checked={fasc === f}
                    onChange={() => setFasc(f)}
                  />
                  {f === 'all' ? 'Tous' : f}
                </label>
              ))}
              <label className='flex items-center gap-2 text-[#F0F0F5]'>
                <input type='checkbox' checked={onlyArevoir} onChange={(e) => setOnlyArevoir(e.target.checked)} />
                À revoir uniquement
              </label>
              <label className='flex items-center gap-2 text-[#F0F0F5]'>
                <input type='checkbox' checked={shuffle} onChange={(e) => setShuffle(e.target.checked)} />
                Aléatoire
              </label>
              <button
                type='button'
                onClick={() => setFiltersOpen(false)}
                className='w-full rounded-xl bg-[#4F6EF7] py-3 font-semibold text-white'
              >
                Appliquer
              </button>
            </div>
          </div>
        ) : null}

        <div className='mb-4 text-center'>
          <p className='text-sm text-[#8888A0]'>
            {index + 1} / {total} infractions
          </p>
          <div className='mt-2 h-2 overflow-hidden rounded-full bg-white/[0.08]'>
            <motion.div
              className='h-full rounded-full bg-[#4F6EF7]'
              initial={false}
              animate={{ width: `${Math.min(100, progress * 100)}%` }}
              transition={{ duration: 0.35 }}
            />
          </div>
        </div>

        <div className='mx-auto max-w-xl' style={{ perspective: 1000 }}>
          <motion.div
            className='relative min-h-[320px] cursor-pointer'
            style={{ transformStyle: 'preserve-3d' }}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={toggleFlip}
            role='button'
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFlip();
              }
            }}
            aria-label={flipped ? 'Masquer le détail' : 'Afficher le détail'}
          >
            <div
              className='absolute inset-0 flex flex-col justify-center rounded-2xl border border-white/[0.1] bg-gradient-to-br from-[#16161F] to-[#0d0d14] p-8 backface-hidden'
              style={{ backfaceVisibility: 'hidden' }}
            >
              {current ? (
                <>
                  <div className='flex flex-wrap gap-2'>
                    <span className='rounded-md border border-white/10 bg-white/[0.06] px-2 py-0.5 text-xs font-bold text-[#8888A0]'>
                      {current.fascicule}
                    </span>
                    <span className='rounded-md bg-[#4F6EF7]/20 px-2 py-0.5 text-xs font-semibold text-[#4F6EF7]'>
                      {current.groupTitle}
                    </span>
                  </div>
                  <h3 className='mt-4 text-2xl font-bold leading-snug text-white'>
                    <FlashcardRichText text={current.infraction} inline />
                  </h3>
                  <p className='mt-3 inline-block w-fit rounded-lg bg-[#4F6EF7]/15 px-2 py-1 font-[family-name:var(--font-jetbrains-mono),ui-monospace,monospace] text-sm text-[#4F6EF7]'>
                    {current.legal}
                  </p>
                  <p className='mt-auto pt-6 text-center text-xs text-[#8888A0]'>Appuyez pour révéler</p>
                </>
              ) : null}
            </div>
            <div
              className='absolute inset-0 flex flex-col justify-center rounded-2xl border border-white/[0.1] bg-gradient-to-br from-[#16161F] to-[#0d0d14] p-8'
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              {current ? (
                <div className='space-y-4 text-left text-sm text-[#F0F0F5]'>
                  <div>
                    <p className='text-xs font-bold uppercase tracking-wide text-[#8888A0]'>Élément matériel</p>
                    <p className='mt-1 leading-relaxed'>{condenseMaterielKeys(current.materiel)}</p>
                    <p className='mt-2 line-clamp-4 text-xs text-[#8888A0]'>{stripMdBold(current.materiel)}</p>
                  </div>
                  <div>
                    <p className='text-xs font-bold uppercase tracking-wide text-[#8888A0]'>Élément moral</p>
                    <span
                      className={cn(
                        'mt-1 inline-flex rounded-md px-2 py-0.5 text-xs font-semibold',
                        moralKindBadgeClass(classifyMoral(current.moral)),
                      )}
                    >
                      {moralKindLabel(classifyMoral(current.moral))}
                    </span>
                  </div>
                  <div>
                    <p className='text-xs font-bold uppercase tracking-wide text-[#8888A0]'>Peine</p>
                    <p className='mt-1 font-[family-name:var(--font-jetbrains-mono),ui-monospace,monospace]'>
                      {derivePeineFromLegal(current.legal).label}
                    </p>
                  </div>
                  <div>
                    <p className='text-xs font-bold uppercase tracking-wide text-[#8888A0]'>Repères</p>
                    <p className='mt-1 text-xs'>
                      {current.noteExamen
                        ? current.noteExamen
                        : stripMdBold(current.legal).slice(0, 160)}
                      {stripMdBold(current.legal).length > 160 ? '…' : ''}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {hintOn ? (
            <motion.p
              initial={MOTION_INITIAL_FOR_SEO}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='mt-4 text-center text-xs text-[#8888A0]'
            >
              Espace / Entrée · retourner · ← → ou H L · naviguer · 1 « Su » · 2 « À revoir »
            </motion.p>
          ) : null}
        </AnimatePresence>

        <div className='mt-8 flex flex-wrap items-center justify-center gap-3'>
          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            disabled={index <= 0}
            aria-label='Infraction précédente'
            className='inline-flex items-center gap-1 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-35'
          >
            <ChevronLeft className='h-4 w-4' />
            Précédent
          </button>
          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              markSu();
            }}
            aria-label='Marquer comme sue'
            className='inline-flex items-center gap-1 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500'
          >
            <Check className='h-4 w-4' />
            Su
          </button>
          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              markArevoir();
            }}
            aria-label='Marquer à revoir'
            className='inline-flex items-center gap-1 rounded-xl bg-[#F59E0B]/90 px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#F59E0B]'
          >
            À revoir
          </button>
          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label='Infraction suivante'
            className='inline-flex items-center gap-1 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-white'
          >
            Suivant
            <ChevronRight className='h-4 w-4' />
          </button>
        </div>
      </div>
    </div>
  );
}
