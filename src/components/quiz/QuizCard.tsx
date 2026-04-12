'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';

export interface QuizCardProps {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  article?: string;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (isCorrect: boolean, selectedIndex: number) => void;
}

export function QuizCard({
  question,
  options,
  correctIndex,
  explanation,
  article,
  questionNumber,
  totalQuestions,
  onAnswer,
}: QuizCardProps) {
  const reduceMotion = useReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const answered = selectedIndex !== null;

  const isCorrectChoice = answered && selectedIndex === correctIndex;
  const progressPct =
    totalQuestions > 0 ? Math.min(100, (questionNumber / totalQuestions) * 100) : 0;

  function handleOptionClick(index: number) {
    if (answered) return;
    setSelectedIndex(index);
  }

  function handleContinue() {
    if (selectedIndex === null) return;
    onAnswer(selectedIndex === correctIndex, selectedIndex);
  }

  const springPop = reduceMotion ? { scale: 1 } : { scale: [1, 1.05, 1] };

  return (
    <div className="flex w-full max-w-2xl flex-col gap-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-medium text-[var(--ds-text-muted)]">
          <span className="tabular-nums">
            {questionNumber}/{totalQuestions}
          </span>
        </div>
        <div
          className="h-2 w-full overflow-hidden rounded-full bg-[var(--ds-bg-elevated)] ring-1 ring-[var(--ds-border)] dark:ring-white/10"
          role="progressbar"
          aria-valuenow={Math.round(progressPct)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Question ${questionNumber} sur ${totalQuestions}`}
        >
          <motion.div
            className="h-full rounded-full bg-[var(--ds-accent)]"
            initial={false}
            animate={{ width: `${progressPct}%` }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: 'spring', stiffness: 120, damping: 22, mass: 0.8 }
            }
          />
        </div>
      </div>

      <div>
        <p className="text-base font-semibold leading-snug text-[var(--ds-text-primary)] md:text-lg">
          {question}
        </p>
      </div>

      <div
        className={cn('flex flex-col gap-3', answered && 'pointer-events-none')}
        role="group"
        aria-label="Choix de réponse"
      >
        {options.map((label, index) => {
          const isSelected = answered && selectedIndex === index;
          const isCorrectOption = index === correctIndex;
          const showAsCorrect = answered && isCorrectOption;
          const showAsWrong = answered && isSelected && !isCorrectOption;
          const showCorrectSpring = answered && isCorrectOption && isSelected && isCorrectChoice;

          return (
            <motion.button
              key={index}
              type="button"
              onClick={() => handleOptionClick(index)}
              disabled={answered}
              className={cn(
                'relative flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-colors md:text-base',
                'border-[var(--ds-border)] bg-[var(--ds-bg-elevated)] text-[var(--ds-text-primary)]',
                'hover:border-[color-mix(in_srgb,var(--ds-accent)_30%,transparent)] hover:bg-[color-mix(in_srgb,var(--ds-accent)_10%,transparent)]',
                !answered && 'cursor-pointer',
                answered && !isSelected && !isCorrectOption && 'opacity-50',
                showAsCorrect &&
                  'border-green-500 bg-green-500/10 dark:border-green-500 dark:bg-green-500/10',
                showAsWrong &&
                  'border-red-500 bg-red-500/10 dark:border-red-500 dark:bg-red-500/10',
              )}
              animate={showCorrectSpring && !reduceMotion ? springPop : { scale: 1 }}
              transition={
                showCorrectSpring && !reduceMotion
                  ? { type: 'spring', stiffness: 520, damping: 24 }
                  : { duration: reduceMotion ? 0 : 0.2 }
              }
            >
              {showAsCorrect ? (
                <CheckCircle
                  className="h-5 w-5 shrink-0 text-green-600 dark:text-green-400"
                  aria-hidden
                />
              ) : null}
              {showAsWrong ? (
                <XCircle className="h-5 w-5 shrink-0 text-red-600 dark:text-red-400" aria-hidden />
              ) : null}
              <span className="min-w-0 flex-1">{label}</span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {answered && selectedIndex !== null ? (
          <motion.div
            key="feedback"
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: 'spring', stiffness: 380, damping: 32 }
            }
            className={cn(
              'overflow-hidden rounded-xl border shadow-sm',
              isCorrectChoice
                ? 'border-green-500/40 bg-green-500/5 dark:border-green-500/30'
                : 'border-red-500/40 bg-red-500/5 dark:border-red-500/30',
            )}
          >
            <div
              className={cn(
                'px-4 py-3 text-sm font-semibold',
                isCorrectChoice
                  ? 'bg-green-500/15 text-green-800 dark:text-green-200'
                  : 'bg-red-500/15 text-red-800 dark:text-red-200',
              )}
            >
              {isCorrectChoice ? 'Bonne réponse !' : 'Pas tout à fait...'}
            </div>
            <div className="space-y-3 border-t border-[var(--ds-border)] bg-[var(--ds-bg-primary)] p-4 dark:border-white/10">
              <p className="text-sm leading-relaxed text-[var(--ds-text-primary)]">{explanation}</p>
              {article ? (
                <span className="inline-flex rounded-md border border-[var(--ds-border)] bg-[var(--ds-bg-elevated)] px-2.5 py-1 text-xs font-medium text-[var(--ds-text-muted)]">
                  {article}
                </span>
              ) : null}
              <Button type="button" className="w-full" onClick={handleContinue}>
                Continuer →
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
