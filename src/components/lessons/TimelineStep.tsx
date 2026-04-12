'use client';

import { motion } from 'framer-motion';

import { cn } from '@/utils/cn';

export interface TimelineStepItem {
  number: number;
  title: string;
  description: string;
  duration?: string;
  article?: string;
}

export interface TimelineStepProps {
  steps: TimelineStepItem[];
  className?: string;
}

const listVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function TimelineStep({ steps, className }: TimelineStepProps) {
  return (
    <motion.ol
      variants={listVariants}
      initial='hidden'
      whileInView='show'
      viewport={{ once: true, margin: '-24px' }}
      className={cn('relative list-none space-y-0 pl-0', className)}
    >
      <span
        className='absolute left-[15px] top-3 bottom-3 w-px bg-gradient-to-b from-blue-500/50 via-ds-border to-emerald-500/40'
        aria-hidden
      />
      {steps.map((step, index) => {
        const isFirst = index === 0;
        const isLast = index === steps.length - 1;
        const only = steps.length === 1;
        return (
          <motion.li
            key={`${step.number}-${step.title}`}
            variants={itemVariants}
            className='relative flex gap-4 pb-8 last:pb-0'
          >
            <div
              className={cn(
                'relative z-[1] flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                'border-2 border-ds-border bg-ds-bg-primary text-ds-text-primary shadow-sm',
                only && 'border-blue-500/60 text-blue-600 dark:text-blue-400',
                !only && isFirst && 'border-blue-500/60 text-blue-600 dark:text-blue-400',
                !only && isLast && 'border-emerald-500/60 text-emerald-600 dark:text-emerald-400',
                !only && !isFirst && !isLast && 'border-amber-500/50 text-amber-700 dark:text-amber-300',
              )}
              aria-hidden
            >
              {step.number}
            </div>
            <div className='min-w-0 flex-1 pt-0.5'>
              <div className='flex flex-wrap items-baseline gap-2'>
                <h3 className='text-sm font-semibold text-ds-text-primary'>{step.title}</h3>
                {step.duration ? (
                  <span className='rounded-md bg-ds-bg-elevated px-1.5 py-0.5 text-[10px] font-medium text-ds-text-muted'>
                    {step.duration}
                  </span>
                ) : null}
                {step.article ? (
                  <span className='text-[10px] font-medium text-ds-accent'>{step.article}</span>
                ) : null}
              </div>
              <p className='mt-1 text-sm leading-relaxed text-ds-text-muted'>{step.description}</p>
            </div>
          </motion.li>
        );
      })}
    </motion.ol>
  );
}

export function ExampleUsage() {
  const steps: TimelineStepItem[] = [
    {
      number: 1,
      title: 'Interpellation / qualification',
      description: 'Information des droits, qualification initiale des faits.',
      duration: 'Immédiat',
    },
    {
      number: 2,
      title: 'Entrée en GAV',
      description: 'Début du décompte légal et information de la personne.',
      article: 'Art. 63 CPP',
    },
    {
      number: 3,
      title: 'Fin de la mesure',
      description: 'Levée, prolongation ou conversion selon la procédure.',
      duration: '24h → 48h max',
      article: 'Art. 63-4',
    },
  ];
  return <TimelineStep steps={steps} />;
}
