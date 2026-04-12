'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

import { cn } from '@/utils/cn';

const STEP_LABELS = ['Situation', 'Forces', 'Diagnostic', 'Résultats'] as const;

export interface OnboardingStepIndicatorProps {
  /** 0 = écran d’accueil (composant masqué), 1 à 4 = étapes. */
  currentStep: number;
  /** Nombre d’étapes affichées (hors welcome) ; défaut 4. */
  totalSteps?: number;
}

export function OnboardingStepIndicator({ currentStep, totalSteps = 4 }: OnboardingStepIndicatorProps) {
  const reduceMotion = useReducedMotion();
  const count = Math.min(Math.max(1, totalSteps), STEP_LABELS.length);

  if (currentStep < 1) {
    return null;
  }

  const activeIndex = Math.min(Math.max(0, currentStep - 1), count - 1);
  const labels = STEP_LABELS.slice(0, count);

  return (
    <div
      className={cn(
        'sticky top-0 z-40 border-b border-border/60 py-3 backdrop-blur-md',
        'bg-background/80 supports-[backdrop-filter]:bg-background/70',
        'dark:bg-slate-950/85 dark:supports-[backdrop-filter]:bg-slate-950/75',
      )}
      role='navigation'
      aria-label="Progression de l'onboarding"
    >
      <div className='mx-auto flex w-full max-w-lg items-start justify-between px-2'>
        {Array.from({ length: count }, (_, index) => {
          const isPast = index < activeIndex;
          const isActive = index === activeIndex;
          const isFuture = index > activeIndex;
          const label = labels[index];

          return (
            <div key={label} className='flex flex-1 flex-col items-center'>
              <div className='flex w-full items-center'>
                {index > 0 ? (
                  <div
                    className={cn(
                      'h-0.5 flex-1 rounded-full',
                      currentStep > index ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600',
                      isFuture && 'opacity-50',
                    )}
                    aria-hidden
                  />
                ) : (
                  <div className='flex-1' aria-hidden />
                )}

                <div className='relative flex shrink-0 items-center justify-center px-0.5'>
                  {isPast ? (
                    <CheckCircle className='size-5 text-green-500' strokeWidth={2} aria-hidden />
                  ) : isActive ? (
                    <motion.span
                      className='block size-5 rounded-full bg-[var(--ds-accent,cyan-500)] shadow-sm ring-2 ring-[var(--ds-accent,cyan-500)]/35'
                      initial={false}
                      animate={reduceMotion ? { scale: 1.2 } : { scale: [1.2, 1.28, 1.2] }}
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                      }
                      aria-current='step'
                    />
                  ) : (
                    <span
                      className='block size-5 rounded-full border-2 border-slate-400 opacity-50 dark:border-slate-500'
                      aria-hidden
                    />
                  )}
                </div>

                {index < count - 1 ? (
                  <div
                    className={cn(
                      'h-0.5 flex-1 rounded-full',
                      currentStep > index + 1 ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600',
                      isFuture && 'opacity-50',
                    )}
                    aria-hidden
                  />
                ) : (
                  <div className='flex-1' aria-hidden />
                )}
              </div>

              <span
                className={cn(
                  'mt-1.5 max-w-[4.5rem] text-center text-[10px] font-medium leading-tight',
                  isActive && 'text-[var(--ds-accent,cyan-600)] dark:text-cyan-400',
                  isPast && 'text-green-600 dark:text-green-400',
                  isFuture && 'text-muted-foreground opacity-60',
                )}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
