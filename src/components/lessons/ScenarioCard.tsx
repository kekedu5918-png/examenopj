'use client';

import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Star } from 'lucide-react';

import { cn } from '@/utils/cn';

export type ScenarioDifficulty = 1 | 2 | 3;

export interface ScenarioCardProps {
  situation: string;
  question: string;
  answer: string;
  difficulty: ScenarioDifficulty;
  className?: string;
}

function DifficultyStars({ level }: { level: ScenarioDifficulty }) {
  return (
    <div className='flex items-center gap-0.5' role='img' aria-label={`Difficulté ${level} sur 3`}>
      {[1, 2, 3].map((n) => (
        <Star
          key={n}
          className={cn(
            'h-3.5 w-3.5',
            n <= level ? 'fill-amber-400 text-amber-500' : 'text-ds-border',
          )}
          aria-hidden
        />
      ))}
    </div>
  );
}

export function ScenarioCard({
  situation,
  question,
  answer,
  difficulty,
  className,
}: ScenarioCardProps) {
  const [open, setOpen] = useState(false);
  const [selfCheck, setSelfCheck] = useState<'correct' | 'wrong' | null>(null);
  const contentId = useId();

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      className={cn(
        'overflow-hidden rounded-xl border border-amber-500/25 bg-amber-500/[0.08] shadow-sm dark:bg-amber-500/[0.1]',
        className,
      )}
    >
      <header className='flex flex-wrap items-center justify-between gap-2 border-b border-amber-500/20 px-4 py-3'>
        <div className='flex items-center gap-2'>
          <span className='text-lg' aria-hidden>
            🚨
          </span>
          <span className='text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-200'>
            Cas pratique
          </span>
        </div>
        <DifficultyStars level={difficulty} />
      </header>

      <div className='space-y-3 px-4 py-4'>
        <div>
          <p className='text-[10px] font-semibold uppercase tracking-wide text-ds-text-muted'>
            Situation
          </p>
          <p className='mt-1 text-sm leading-relaxed text-ds-text-primary'>{situation}</p>
        </div>
        <div>
          <p className='text-[10px] font-semibold uppercase tracking-wide text-ds-text-muted'>
            Question
          </p>
          <p className='mt-1 text-sm font-medium leading-relaxed text-ds-text-primary'>{question}</p>
        </div>

        <button
          type='button'
          onClick={() => {
            setOpen((o) => !o);
            if (open) setSelfCheck(null);
          }}
          aria-expanded={open}
          aria-controls={contentId}
          className='flex w-full items-center justify-between gap-2 rounded-lg border border-ds-border bg-ds-bg-primary/60 px-3 py-2 text-left text-sm font-medium text-ds-accent transition-colors hover:bg-ds-bg-elevated dark:bg-ds-bg-secondary/40'
        >
          {open ? 'Masquer la correction' : 'Voir la correction'}
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className='h-4 w-4 shrink-0' aria-hidden />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              id={contentId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className='overflow-hidden'
            >
              <div className='rounded-lg border border-ds-border bg-ds-bg-secondary/80 px-3 py-3 text-sm leading-relaxed text-ds-text-primary'>
                {answer}
              </div>

              {selfCheck === null ? (
                <div className='mt-3 flex flex-wrap gap-2'>
                  <button
                    type='button'
                    onClick={() => setSelfCheck('correct')}
                    className='flex-1 rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-3 py-2 text-xs font-semibold text-emerald-800 transition-colors hover:bg-emerald-500/25 dark:text-emerald-200'
                  >
                    J’avais bon ✓
                  </button>
                  <button
                    type='button'
                    onClick={() => setSelfCheck('wrong')}
                    className='flex-1 rounded-lg border border-red-500/40 bg-red-500/15 px-3 py-2 text-xs font-semibold text-red-800 transition-colors hover:bg-red-500/25 dark:text-red-200'
                  >
                    J’avais faux ✗
                  </button>
                </div>
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className='mt-3 text-center text-xs text-ds-text-muted'
                >
                  {selfCheck === 'correct'
                    ? 'Bravo — ancrage mémoriel renforcé.'
                    : 'Note la règle et réessaie plus tard : la répétition fait progresser.'}
                </motion.p>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

export function ExampleUsage() {
  return (
    <ScenarioCard
      situation="Il est 22h30, vous venez d'interpeller un suspect en flagrance à son domicile."
      question='Pouvez-vous perquisitionner son domicile immédiatement ?'
      answer='Non — Art. 59 CPP : la perquisition nocturne est interdite sauf autorisation du juge des libertés et de la détention (sauf circonstances exceptionnelles encadrées).'
      difficulty={2}
    />
  );
}
