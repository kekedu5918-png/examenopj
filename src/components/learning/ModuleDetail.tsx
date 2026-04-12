'use client';

import { useEffect, useId, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

import { cn } from '@/utils/cn';

export interface ModuleDetailProps {
  module: {
    id: string;
    slug: string;
    title: string;
    description: string;
    color: string;
    icon: string;
    completionPercent: number;
  };
  lessons: Array<{
    lessonId: string;
    title: string;
    href: string;
    type: 'discovery' | 'training' | 'consolidation' | 'case' | 'exam';
    estimatedMinutes: number;
    xpReward: number;
    status: 'locked' | 'unlocked' | 'completed' | 'needs_review';
    lastScore: number | null;
  }>;
  isOpen: boolean;
  onClose: () => void;
}

const TYPE_EMOJI: Record<ModuleDetailProps['lessons'][number]['type'], string> = {
  discovery: '📖',
  training: '🎯',
  consolidation: '⚡',
  case: '🔍',
  exam: '📝',
};

const TYPE_RING: Record<ModuleDetailProps['lessons'][number]['type'], string> = {
  discovery: 'ring-blue-500/40 bg-blue-500/10 text-blue-600 dark:text-blue-300',
  training: 'ring-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300',
  consolidation: 'ring-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-300',
  case: 'ring-violet-500/40 bg-violet-500/10 text-violet-600 dark:text-violet-300',
  exam: 'ring-rose-500/40 bg-rose-500/10 text-rose-600 dark:text-rose-300',
};

function useIsMdUp(): boolean {
  const [md, setMd] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 768px)').matches : false,
  );
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const fn = () => setMd(mq.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);
  return md;
}

function useBodyScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

function resolveCta(lessons: ModuleDetailProps['lessons']): {
  kind: 'continue' | 'review' | 'hidden';
  href?: string;
} {
  if (lessons.length === 0) return { kind: 'hidden' };

  const firstUnlocked = lessons.find((l) => l.status === 'unlocked');
  if (firstUnlocked) {
    return { kind: 'continue', href: firstUnlocked.href };
  }

  const allLocked = lessons.every((l) => l.status === 'locked');
  if (allLocked) {
    return { kind: 'hidden' };
  }

  const allCompleted = lessons.every((l) => l.status === 'completed');
  if (allCompleted) {
    return { kind: 'review', href: lessons[0]?.href };
  }

  return { kind: 'hidden' };
}

export function ModuleDetail({ module, lessons, isOpen, onClose }: ModuleDetailProps) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const isMdUp = useIsMdUp();
  const titleId = useId();
  const descId = useId();
  const [mounted, setMounted] = useState(false);
  const [shakeLessonId, setShakeLessonId] = useState<string | null>(null);
  const [lockedTip, setLockedTip] = useState(false);

  useEffect(() => setMounted(true), []);
  useBodyScrollLock(isOpen);

  const ease = [0.22, 1, 0.36, 1] as const;
  const fast = reduceMotion ? { duration: 0 } : { duration: 0.2, ease };
  const panelSpring = reduceMotion ? { duration: 0 } : { type: 'spring' as const, stiffness: 420, damping: 34 };

  const listContainer = {
    hidden: {},
    show: {
      transition: reduceMotion ? {} : { staggerChildren: 0.05, delayChildren: 0.06 },
    },
  };

  const listItem = {
    hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.25, ease } },
  };

  const cta = resolveCta(lessons);

  const onLessonActivate = (lesson: ModuleDetailProps['lessons'][number]) => {
    if (lesson.status === 'locked') {
      if (!reduceMotion) {
        setShakeLessonId(lesson.lessonId);
        window.setTimeout(() => setShakeLessonId(null), 420);
      }
      setLockedTip(true);
      window.setTimeout(() => setLockedTip(false), 2800);
      return;
    }
    router.push(lesson.href);
    onClose();
  };

  const onCta = () => {
    if (cta.kind === 'continue' && cta.href) {
      router.push(cta.href);
      onClose();
    } else if (cta.kind === 'review' && cta.href) {
      router.push(cta.href);
      onClose();
    }
  };

  if (!mounted) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            key='module-detail-backdrop'
            type='button'
            aria-label='Fermer le panneau'
            className='fixed inset-0 z-[200] m-0 cursor-default border-0 bg-black p-0'
            initial={{ opacity: 0 }}
            animate={{ opacity: reduceMotion ? 0.6 : 0.6 }}
            exit={{ opacity: 0 }}
            transition={fast}
            onClick={onClose}
          />

          <motion.div
            key='module-detail-panel'
            role='dialog'
            aria-modal='true'
            aria-labelledby={titleId}
            aria-describedby={descId}
            className={cn(
              'fixed z-[201] flex w-full flex-col overflow-hidden shadow-2xl',
              'border border-[var(--ds-border)] bg-[var(--ds-bg-primary)] text-[var(--ds-text-primary)]',
              'dark:border-white/10',
              'bottom-0 left-0 right-0 max-h-[85vh] rounded-t-[24px]',
              'md:bottom-auto md:left-1/2 md:top-1/2 md:max-h-[min(90vh,720px)] md:max-w-lg md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl',
            )}
            initial={isMdUp ? { opacity: 0, scale: 0.95 } : { y: '100%' }}
            animate={isMdUp ? { opacity: 1, scale: 1 } : { y: 0 }}
            exit={isMdUp ? { opacity: 0, scale: 0.95 } : { y: '100%' }}
            transition={isMdUp ? panelSpring : { ...fast, ...panelSpring }}
          >
            <div className='flex shrink-0 items-start justify-between gap-3 border-b border-[var(--ds-border)] p-4 pb-3 dark:border-white/10'>
              <div className='flex min-w-0 flex-1 gap-3'>
                <span
                  className='flex h-12 w-12 shrink-0 items-center justify-center text-5xl leading-none'
                  aria-hidden
                >
                  {typeof module.icon === 'string' ? module.icon : ''}
                </span>
                <div className='min-w-0'>
                  <div className='flex flex-wrap items-center gap-2'>
                    <h2 id={titleId} className='font-display text-lg font-bold leading-tight md:text-xl'>
                      {module.title}
                    </h2>
                    <span className='rounded-full border border-[var(--ds-border)] bg-[var(--ds-bg-elevated)] px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-[var(--ds-text-muted)] dark:border-white/10'>
                      {Math.round(module.completionPercent)}% complété
                    </span>
                  </div>
                  <p id={descId} className='mt-1 line-clamp-2 text-sm text-[var(--ds-text-muted)]'>
                    {module.description}
                  </p>
                  <div
                    className={cn(
                      'mt-3 h-2 w-full overflow-hidden rounded-full bg-[var(--ds-bg-elevated)] ring-1 ring-[var(--ds-border)] dark:ring-white/10',
                    )}
                    role='progressbar'
                    aria-valuenow={Math.round(module.completionPercent)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className='h-full rounded-full'
                      style={{
                        width: `${Math.min(100, Math.max(0, module.completionPercent))}%`,
                        background: `linear-gradient(145deg, ${module.color}, color-mix(in srgb, ${module.color} 75%, #000000))`,
                      }}
                    />
                  </div>
                </div>
              </div>
              <button
                type='button'
                onClick={onClose}
                className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[var(--ds-text-muted)] transition hover:bg-[var(--ds-bg-elevated)] hover:text-[var(--ds-text-primary)]'
                aria-label='Fermer'
              >
                <X className='h-5 w-5' strokeWidth={2} />
              </button>
            </div>

            <div className='min-h-0 flex-1 overflow-y-auto px-3 py-3 md:px-4'>
              {lockedTip ? (
                <p
                  className='mb-2 rounded-lg border border-amber-500/35 bg-amber-500/10 px-3 py-2 text-xs text-amber-900 dark:text-amber-100'
                  role='status'
                >
                  Complète la leçon précédente d&apos;abord.
                </p>
              ) : null}

              <motion.ul className='space-y-2' variants={listContainer} initial='hidden' animate='show'>
                {lessons.map((lesson) => {
                  const locked = lesson.status === 'locked';
                  const shake = shakeLessonId === lesson.lessonId;

                  return (
                    <motion.li key={lesson.lessonId} variants={listItem}>
                      <motion.div
                        animate={
                          reduceMotion || !shake ? { x: 0 } : { x: [0, -6, 6, -5, 5, 0] }
                        }
                        transition={reduceMotion ? { duration: 0 } : { duration: 0.38, ease }}
                      >
                        <button
                          type='button'
                          onClick={() => onLessonActivate(lesson)}
                          title={locked ? 'Complète la leçon précédente d’abord' : undefined}
                          className={cn(
                            'flex w-full items-start gap-3 rounded-xl border border-transparent px-3 py-3 text-left transition',
                            locked
                              ? 'cursor-not-allowed opacity-60'
                              : 'hover:border-[var(--ds-border)] hover:bg-[var(--ds-bg-elevated)] dark:hover:border-white/10',
                          )}
                        >
                          <span
                            className={cn(
                              'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg ring-1',
                              TYPE_RING[lesson.type],
                            )}
                            aria-hidden
                          >
                            {TYPE_EMOJI[lesson.type]}
                          </span>
                          <div className='min-w-0 flex-1'>
                            <p className='font-medium leading-snug text-[var(--ds-text-primary)]'>
                              {lesson.title}
                            </p>
                            <p className='mt-0.5 font-mono text-[11px] text-[var(--ds-text-muted)]'>
                              {lesson.estimatedMinutes} min · +{lesson.xpReward} XP
                            </p>
                            <div className='mt-2 flex flex-wrap items-center gap-2'>
                              {lesson.status === 'locked' ? (
                                <span className='inline-flex items-center gap-1 rounded-md bg-[var(--ds-bg-elevated)] px-2 py-0.5 text-xs text-[var(--ds-text-muted)]'>
                                  🔒 Verrouillée
                                </span>
                              ) : null}
                              {lesson.status === 'unlocked' ? (
                                <span className='inline-flex items-center rounded-md bg-[color-mix(in_srgb,var(--ds-accent)_18%,transparent)] px-2 py-0.5 text-xs font-semibold text-[var(--ds-accent)]'>
                                  Commencer →
                                </span>
                              ) : null}
                              {lesson.status === 'completed' ? (
                                <span className='inline-flex items-center gap-1 rounded-md bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300'>
                                  ✓{' '}
                                  {typeof lesson.lastScore === 'number'
                                    ? `${Math.round(lesson.lastScore)}%`
                                    : 'OK'}
                                </span>
                              ) : null}
                              {lesson.status === 'needs_review' ? (
                                <span className='inline-flex items-center gap-1 rounded-md bg-orange-500/15 px-2 py-0.5 text-xs font-medium text-orange-800 dark:text-orange-200'>
                                  🔄 À réviser
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </button>
                      </motion.div>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </div>

            {cta.kind !== 'hidden' ? (
              <div className='shrink-0 border-t border-[var(--ds-border)] p-3 dark:border-white/10 md:p-4'>
                <button
                  type='button'
                  onClick={onCta}
                  className='w-full rounded-xl bg-[var(--ds-accent)] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 active:opacity-90'
                >
                  {cta.kind === 'continue' ? 'Continuer le module →' : 'Tout réviser ⭐'}
                </button>
              </div>
            ) : null}
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
