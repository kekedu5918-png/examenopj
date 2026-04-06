'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Keyboard, X } from 'lucide-react';

import { GlassCard } from '@/components/ui/GlassCard';
import { type QuizQuestion } from '@/data/types';
import { cn } from '@/utils/cn';

import { isHardcoreAnswerCorrect } from './quiz-hardcore-match';

const domainBadge: Record<QuizQuestion['domaine'], string> = {
  DPS: 'bg-red-500/20 text-red-300 border-red-500/30',
  DPG: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
  'Procédure pénale': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
};

type Props = {
  questions: QuizQuestion[];
  onComplete: (correct: number, total: number) => void;
};

export function QuizInterfaceHardcore({ questions, onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [input, setInput] = useState('');
  const [locked, setLocked] = useState(false);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);
  const advanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const answeringRef = useRef(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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

  useEffect(() => {
    if (!locked) {
      inputRef.current?.focus();
    }
  }, [locked, index]);

  const progressPct = total > 0 ? ((index + (locked ? 1 : 0)) / total) * 100 : 0;

  function advance(ok: boolean) {
    setScore((prev) => {
      const newScore = prev + (ok ? 1 : 0);
      clearAdvance();
      advanceRef.current = setTimeout(() => {
        advanceRef.current = null;
        answeringRef.current = false;
        if (isLast) {
          onComplete(newScore, total);
        } else {
          setIndex((i) => i + 1);
          setInput('');
          setLocked(false);
          setLastCorrect(null);
        }
      }, 2600);
      return newScore;
    });
  }

  function handleSubmit() {
    if (locked || !q || answeringRef.current) return;
    const trimmed = input.trim();
    if (!trimmed) return;
    answeringRef.current = true;
    setLocked(true);
    const ok = isHardcoreAnswerCorrect(trimmed, q);
    setLastCorrect(ok);
    advance(ok);
  }

  if (!q || total === 0) {
    return (
      <GlassCard padding='p-8' className='mx-auto max-w-2xl text-center text-gray-400'>
        Aucune question pour cette sélection.
      </GlassCard>
    );
  }

  const expected = q.options[q.correctIndex];

  return (
    <div className='mx-auto w-full max-w-2xl px-4 pb-16 pt-4'>
      <div className='mb-4 flex flex-wrap items-center justify-center gap-2 rounded-xl border border-amber-500/25 bg-amber-950/20 px-3 py-2 text-center text-xs text-amber-100/85 sm:text-sm'>
        <Keyboard className='h-4 w-4 shrink-0 text-amber-400' aria-hidden />
        <span>
          <strong className='text-amber-200'>Mode hardcore</strong> — pas de QCM : saisissez la réponse puis validez (Ctrl+Entrée ou bouton).
        </span>
      </div>

      <div className='mb-6 h-1 w-full overflow-hidden rounded-full bg-white/10'>
        <motion.div
          className='h-full rounded-full bg-amber-500'
          initial={false}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>

      <div className='mb-6 flex items-center justify-between text-sm'>
        <span className='text-gray-400'>
          Question <span className='font-semibold text-white'>{index + 1}</span> / {total}
        </span>
        <span className='inline-flex items-center gap-1.5 text-emerald-400'>
          Score :
          <Check className='size-4' strokeWidth={2.5} aria-hidden />
          <span className='font-bold'>{score}</span>
        </span>
      </div>

      <AnimatePresence mode='wait'>
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
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

            <div className='mt-6'>
              <label htmlFor={`hardcore-input-${q.id}`} className='sr-only'>
                Votre réponse
              </label>
              <textarea
                ref={inputRef}
                id={`hardcore-input-${q.id}`}
                rows={3}
                value={input}
                disabled={locked}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                placeholder='Votre réponse…'
                className={cn(
                  'w-full resize-y rounded-xl border bg-black/30 px-4 py-3 text-base text-white placeholder:text-slate-600',
                  'border-white/15 focus:border-amber-500/40 focus:outline-none focus:ring-2 focus:ring-amber-500/25',
                  locked && 'cursor-not-allowed opacity-70'
                )}
                autoComplete='off'
                spellCheck={false}
              />
              <div className='mt-3 flex flex-wrap items-center gap-3'>
                <button
                  type='button'
                  disabled={locked || !input.trim()}
                  onClick={handleSubmit}
                  className={cn(
                    'rounded-xl px-5 py-2.5 text-sm font-semibold transition-opacity',
                    'bg-amber-500/90 text-navy-950 hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-35'
                  )}
                >
                  Valider
                </button>
                <span className='text-xs text-slate-500'>Astuce : Ctrl+Entrée pour valider rapidement.</span>
              </div>
            </div>

            {locked && lastCorrect !== null ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  'mt-6 rounded-xl border p-4',
                  lastCorrect
                    ? 'border-emerald-500/35 bg-emerald-500/10'
                    : 'border-red-500/35 bg-red-500/10'
                )}
                role='status'
                aria-live='polite'
              >
                <div className='flex items-start gap-2'>
                  {lastCorrect ? (
                    <Check className='mt-0.5 h-5 w-5 shrink-0 text-emerald-400' strokeWidth={2.5} />
                  ) : (
                    <X className='mt-0.5 h-5 w-5 shrink-0 text-red-400' strokeWidth={2.5} />
                  )}
                  <div className='min-w-0'>
                    <p className={cn('font-semibold', lastCorrect ? 'text-emerald-200' : 'text-red-200')}>
                      {lastCorrect ? 'Bonne réponse' : 'Réponse incorrecte'}
                    </p>
                    {!lastCorrect ? (
                      <p className='mt-2 text-sm leading-relaxed text-slate-300'>
                        Réponse attendue : <span className='font-medium text-white'>{expected}</span>
                      </p>
                    ) : null}
                  </div>
                </div>
                {q.explication ? (
                  <p className='mt-4 border-t border-white/10 pt-4 text-sm leading-relaxed text-slate-400'>
                    {q.explication}
                  </p>
                ) : null}
              </motion.div>
            ) : null}
          </GlassCard>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
