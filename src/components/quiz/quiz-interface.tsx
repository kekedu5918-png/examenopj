'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, ChevronRight, Keyboard, X, Zap } from 'lucide-react';

import { LANDING_EASE } from '@/components/home/motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { type QuizQuestion } from '@/data/types';
import { cn } from '@/utils/cn';

const ease = [...LANDING_EASE] as [number, number, number, number];

const domainBadge: Record<QuizQuestion['domaine'], string> = {
  DPS: 'bg-red-500/20 text-red-300 border-red-500/30',
  DPG: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
  'Procédure pénale': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
};

const letters = ['A', 'B', 'C', 'D'] as const;

type QuizInterfaceProps = {
  questions: QuizQuestion[];
  onComplete: (correct: number, total: number) => void;
};

/** Burst "+1" affiché sur bonne réponse */
function XPBurst({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key='xp'
          initial={{ opacity: 1, y: 0, scale: 1 }}
          animate={{ opacity: 0, y: -48, scale: 1.4 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className='pointer-events-none fixed right-8 top-1/3 z-50 font-mono text-2xl font-black text-emerald-400 drop-shadow-lg'
          aria-hidden
        >
          +1 ✓
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function QuizInterface({ questions, onComplete }: QuizInterfaceProps) {
  const shouldReduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [showXP, setShowXP] = useState(false);
  const [showKb, setShowKb] = useState(false);
  const advanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const answeringRef = useRef(false);

  const total = questions.length;
  const q = questions[index];
  const isLast = index >= total - 1;
  const progressPct = total > 0 ? ((index + (locked ? 1 : 0)) / total) * 100 : 0;

  const clearAdvance = useCallback(() => {
    if (advanceRef.current) { clearTimeout(advanceRef.current); advanceRef.current = null; }
  }, []);

  useEffect(() => () => clearAdvance(), [clearAdvance]);

  /* Keyboard shortcuts: A/B/C/D ou 1/2/3/4 */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (locked || answeringRef.current || !q) return;
      const map: Record<string, number> = { a: 0, b: 1, c: 2, d: 3, '1': 0, '2': 1, '3': 2, '4': 3 };
      const idx = map[e.key.toLowerCase()];
      if (idx !== undefined && idx < q.options.length) handlePick(idx);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  function handlePick(optionIdx: number) {
    if (locked || !q || answeringRef.current) return;
    answeringRef.current = true;
    setPicked(optionIdx);
    setLocked(true);
    const ok = optionIdx === q.correctIndex;
    if (ok && !shouldReduce) { setShowXP(true); setTimeout(() => setShowXP(false), 800); }
    setScore((prev) => {
      const newScore = prev + (ok ? 1 : 0);
      clearAdvance();
      advanceRef.current = setTimeout(() => {
        advanceRef.current = null;
        answeringRef.current = false;
        if (isLast) onComplete(newScore, total);
        else { setIndex((i) => i + 1); setPicked(null); setLocked(false); }
      }, 1800);
      return newScore;
    });
  }

  if (!q || total === 0) {
    return (
      <GlassCard padding='p-8' className='mx-auto max-w-2xl text-center text-gray-400'>
        Aucune question pour cette sélection.
      </GlassCard>
    );
  }

  return (
    <div className='mx-auto w-full max-w-2xl px-4 pb-16 pt-4'>
      <XPBurst show={showXP} />

      {/* Barre de progression segmentée */}
      <div className='mb-5 flex gap-1' role='progressbar' aria-valuenow={index + 1} aria-valuemax={total}>
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'h-1.5 flex-1 overflow-hidden rounded-full transition-all duration-300',
              i < index ? 'bg-emerald-500' : i === index ? 'bg-blue-400' : 'bg-white/[0.08]',
            )}
          >
            {i === index && (
              <motion.div
                className='h-full rounded-full bg-blue-400'
                initial={{ width: '0%' }}
                animate={{ width: locked ? '100%' : '40%' }}
                transition={{ duration: locked ? 1.8 : 0.3, ease: 'linear' }}
              />
            )}
          </div>
        ))}
      </div>

      {/* En-tête stats */}
      <div className='mb-5 flex items-center justify-between'>
        <div className='flex items-center gap-2 text-sm text-slate-400'>
          <span>Q <span className='font-bold text-white'>{index + 1}</span>/{total}</span>
          {q.domaine && (
            <span className={cn('hidden rounded-full border px-2 py-0.5 text-[11px] font-bold sm:inline-flex', domainBadge[q.domaine])}>
              F{String(q.fascicule).padStart(2, '0')} · {q.domaine}
            </span>
          )}
        </div>
        <div className='flex items-center gap-3'>
          <span className='flex items-center gap-1.5 text-sm font-semibold text-emerald-400'>
            <Check className='size-3.5' strokeWidth={2.5} aria-hidden />
            {score}
          </span>
          <button
            type='button'
            onClick={() => setShowKb((v) => !v)}
            className='rounded-lg border border-white/10 p-1.5 text-slate-500 transition hover:text-slate-300'
            title='Raccourcis clavier'
            aria-label='Afficher les raccourcis clavier'
          >
            <Keyboard className='h-3.5 w-3.5' aria-hidden />
          </button>
        </div>
      </div>

      {/* Raccourcis clavier (toggle) */}
      <AnimatePresence>
        {showKb && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className='mb-4 overflow-hidden'
          >
            <div className='flex flex-wrap items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-2.5 text-xs text-slate-400'>
              <span className='font-semibold text-slate-300'>Raccourcis :</span>
              {['A', 'B', 'C', 'D'].map((k) => (
                <span key={k} className='inline-flex items-center gap-1'>
                  <kbd className='rounded border border-white/15 bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10px] text-slate-300'>{k}</kbd>
                </span>
              ))}
              <span>ou</span>
              {['1', '2', '3', '4'].map((k) => (
                <span key={k} className='inline-flex items-center gap-1'>
                  <kbd className='rounded border border-white/15 bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10px] text-slate-300'>{k}</kbd>
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode='wait'>
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -32 }}
          transition={{ duration: 0.28, ease }}
        >
          <GlassCard padding='p-6 md:p-8' topGlow>
            <div className='mb-5'>
              <span className={cn('inline-flex rounded-full border px-2.5 py-0.5 text-xs font-bold sm:hidden', domainBadge[q.domaine])}>
                F{String(q.fascicule).padStart(2, '0')}
              </span>
              <h2 className='mt-3 text-lg font-semibold leading-relaxed text-white sm:text-xl'>{q.question}</h2>
            </div>

            <div className='flex flex-col gap-2.5'>
              {q.options.map((opt, i) => {
                const letter = letters[i] ?? String(i + 1);
                let state: 'idle' | 'correct' | 'wrong' | 'dim' = 'idle';
                if (picked !== null) {
                  if (i === q.correctIndex) state = 'correct';
                  else if (i === picked) state = 'wrong';
                  else state = 'dim';
                }
                return (
                  <motion.button
                    key={i}
                    type='button'
                    disabled={locked}
                    onClick={() => handlePick(i)}
                    animate={
                      shouldReduce || picked === null || picked !== i ? {} :
                        state === 'correct'
                          ? { scale: [1, 1.015, 1] }
                          : state === 'wrong'
                            ? { x: [0, -6, 6, -4, 4, 0] }
                            : {}
                    }
                    transition={shouldReduce ? undefined : { duration: state === 'correct' ? 0.35 : 0.3 }}
                    className={cn(
                      'group flex w-full items-start gap-3 rounded-xl border p-3.5 text-left text-sm text-slate-300 transition-all duration-200 md:p-4',
                      state === 'idle' && 'border-white/[0.07] bg-white/[0.02] hover:border-blue-500/40 hover:bg-blue-500/[0.05] hover:text-white',
                      state === 'correct' && 'border-emerald-500/50 bg-emerald-500/10 text-white shadow-[0_0_16px_rgba(34,197,94,0.1)]',
                      state === 'wrong' && 'border-red-500/40 bg-red-500/10',
                      state === 'dim' && 'pointer-events-none border-white/[0.04] opacity-35',
                    )}
                  >
                    <span className={cn(
                      'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors',
                      state === 'idle' && 'bg-white/[0.05] text-slate-400 group-hover:bg-blue-500/20 group-hover:text-blue-300',
                      state === 'correct' && 'bg-emerald-500/30 text-emerald-300',
                      state === 'wrong' && 'bg-red-500/25 text-red-300',
                      state === 'dim' && 'bg-white/[0.03] text-slate-600',
                    )}>
                      {letter}
                    </span>
                    <span className='min-w-0 flex-1 pt-0.5 leading-relaxed'>{opt}</span>
                    {state === 'correct' && <Check className='mt-0.5 h-4 w-4 shrink-0 text-emerald-400' strokeWidth={2.5} />}
                    {state === 'wrong' && <X className='mt-0.5 h-4 w-4 shrink-0 text-red-400' strokeWidth={2.5} />}
                  </motion.button>
                );
              })}
            </div>

            {/* Explication */}
            <AnimatePresence>
              {picked !== null && q.explication ? (
                <motion.div
                  initial={{ opacity: 0, y: 8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className='mt-5 overflow-hidden'
                >
                  <div className='rounded-xl border border-blue-500/20 bg-blue-500/[0.05] px-4 py-3 text-sm leading-relaxed text-slate-300'>
                    <span className='mr-2 font-semibold text-blue-300'>
                      <Zap className='inline h-3.5 w-3.5 text-blue-400' aria-hidden />
                      {' '}À retenir :
                    </span>
                    {q.explication}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </GlassCard>
        </motion.div>
      </AnimatePresence>

      {/* Prochain auto-avance hint */}
      {locked && !isLast && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className='mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-600'
        >
          <ChevronRight className='h-3.5 w-3.5' aria-hidden />
          Passage automatique à la question suivante…
        </motion.p>
      )}
    </div>
  );
}
