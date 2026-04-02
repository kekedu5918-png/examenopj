'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

import { type QuizQuestion } from '@/data/types';
import { GlassCard } from '@/components/ui/GlassCard';
import { LANDING_EASE } from '@/components/home/motion';
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

export function QuizInterface({ questions, onComplete }: QuizInterfaceProps) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const advanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const answeringRef = useRef(false);

  const total = questions.length;
  const q = questions[index];
  const isLast = index >= total - 1;

  const clearAdvance = useCallback(() => {
    if (advanceRef.current) {
      clearTimeout(advanceRef.current);
      advanceRef.current = null;
    }
  }, []);

  useEffect(() => () => clearAdvance(), [clearAdvance]);

  const progressPct = total > 0 ? ((index + (locked ? 1 : 0)) / total) * 100 : 0;

  function handlePick(optionIdx: number) {
    if (locked || !q || answeringRef.current) return;
    answeringRef.current = true;
    setPicked(optionIdx);
    setLocked(true);
    const ok = optionIdx === q.correctIndex;

    setScore((prev) => {
      const newScore = prev + (ok ? 1 : 0);
      clearAdvance();
      advanceRef.current = setTimeout(() => {
        advanceRef.current = null;
        answeringRef.current = false;
        if (isLast) onComplete(newScore, total);
        else {
          setIndex((i) => i + 1);
          setPicked(null);
          setLocked(false);
        }
      }, 2000);
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
      <div className='mb-6 h-1 w-full overflow-hidden rounded-full bg-white/10'>
        <motion.div
          className='h-full rounded-full bg-cyan-500'
          initial={false}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.35, ease }}
        />
      </div>

      <div className='mb-6 flex items-center justify-between text-sm'>
        <span className='text-gray-400'>
          Question <span className='font-semibold text-white'>{index + 1}</span> / {total}
        </span>
        <span className='text-emerald-400'>
          Score : ✓ <span className='font-bold'>{score}</span>
        </span>
      </div>

      <AnimatePresence mode='wait'>
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3, ease }}
        >
          <GlassCard padding='p-6 md:p-8'>
            <span
              className={cn(
                'inline-flex rounded-full border px-2.5 py-0.5 text-xs font-bold',
                domainBadge[q.domaine]
              )}
            >
              F{String(q.fascicule).padStart(2, '0')}
            </span>
            <h2 className='mt-4 text-xl font-semibold leading-relaxed text-white'>{q.question}</h2>

            <div className='mt-6 flex flex-col gap-3'>
              {q.options.map((opt, i) => {
                const letter = letters[i] ?? String(i + 1);
                let state: 'idle' | 'correct' | 'wrong' | 'dim' = 'idle';
                if (picked !== null) {
                  if (i === q.correctIndex) state = 'correct';
                  else if (i === picked) state = 'wrong';
                  else state = 'dim';
                }
                return (
                  <button
                    key={i}
                    type='button'
                    disabled={locked}
                    onClick={() => handlePick(i)}
                    className={cn(
                      'flex w-full items-start gap-3 rounded-xl border p-4 text-left text-base text-gray-300 transition-all duration-200',
                      state === 'idle' && 'border-white/10 bg-white/[0.03] hover:border-cyan-500/30 hover:bg-white/[0.06]',
                      state === 'correct' && 'border-emerald-500/40 bg-emerald-500/15',
                      state === 'wrong' && 'border-red-500/40 bg-red-500/15',
                      state === 'dim' && 'pointer-events-none opacity-45'
                    )}
                  >
                    <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.05] text-sm font-bold text-gray-200'>
                      {letter}
                    </span>
                    <span className='min-w-0 flex-1 pt-0.5'>{opt}</span>
                    {state === 'correct' ? (
                      <Check className='mt-1 h-5 w-5 shrink-0 text-emerald-400' strokeWidth={2.5} />
                    ) : null}
                    {state === 'wrong' ? <X className='mt-1 h-5 w-5 shrink-0 text-red-400' strokeWidth={2.5} /> : null}
                  </button>
                );
              })}
            </div>

            {picked !== null && q.explication ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className='mt-6 rounded-xl border border-blue-500/20 bg-blue-500/[0.05] p-4 text-sm leading-relaxed text-gray-400'
              >
                {q.explication}
              </motion.div>
            ) : null}
          </GlassCard>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
