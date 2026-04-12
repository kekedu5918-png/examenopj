'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { KeyboardEvent } from 'react';

import { cn } from '@/utils/cn';

export type ModuleNodeLessonStatus =
  | 'locked'
  | 'unlocked'
  | 'completed'
  | 'needs_review';

export interface ModuleNodeLesson {
  lessonId: string;
  status: ModuleNodeLessonStatus;
}

export interface ModuleNodeModule {
  id: string;
  title: string;
  color: string;
  icon: string;
  completionPercent: number;
}

export interface ModuleNodeProps {
  module: ModuleNodeModule;
  lessons: ModuleNodeLesson[];
  pathLocked: boolean;
  /**
   * Parcours encore vierge (0 % partout) : verrouillage parcours en grayscale sur la bulle.
   * Sinon : bulle verrouillée mais colorée à ~60 % d’opacité (envie de progresser).
   */
  lockedVisualHard?: boolean;
  isActive: boolean;
  index: number;
  onOpen: () => void;
  onLockedPathClick: () => void;
}

const BUBBLE = 88;
const CX = BUBBLE / 2;
const CY = BUBBLE / 2;
const R = 34;
const STROKE = 4;
const CIRC = 2 * Math.PI * R;

export function ModuleNode({
  module,
  lessons,
  pathLocked,
  lockedVisualHard = false,
  isActive,
  index,
  onOpen,
  onLockedPathClick,
}: ModuleNodeProps) {
  const reduceMotion = useReducedMotion();
  const pct = Math.min(100, Math.max(0, module.completionPercent));
  const offset = CIRC * (1 - pct / 100);

  const allLessonsLocked = lessons.length > 0 && lessons.every((l) => l.status === 'locked');
  const needsReview = lessons.some((l) => l.status === 'needs_review');
  const complete100 = pct >= 100;

  const handleClick = () => {
    if (pathLocked) {
      onLockedPathClick();
      return;
    }
    onOpen();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={cn(
        'flex max-w-[120px] flex-col items-center gap-1.5',
        pathLocked && 'pointer-events-auto cursor-not-allowed',
      )}
    >
      <motion.div
        className={cn(
          'relative',
          pathLocked &&
            (lockedVisualHard ? 'opacity-50 grayscale' : 'opacity-[0.6]'),
        )}
        animate={
          isActive && !reduceMotion
            ? {
                scale: [1, 1.03, 1],
              }
            : { scale: 1 }
        }
        transition={
          isActive && !reduceMotion
            ? { repeat: Infinity, duration: 2.2, ease: 'easeInOut' }
            : { duration: 0 }
        }
      >
        <motion.button
          type="button"
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className={cn(
            'relative flex h-[88px] w-[88px] shrink-0 items-center justify-center rounded-full shadow-md outline-none ring-offset-2 ring-offset-[var(--ds-bg-primary)] transition focus-visible:ring-2 focus-visible:ring-[var(--ds-accent)]',
            pathLocked ? 'cursor-not-allowed' : 'cursor-pointer',
          )}
          style={{
            background: `linear-gradient(145deg, ${module.color}, color-mix(in srgb, ${module.color} 75%, #000000))`,
          }}
          aria-label={`Module ${index + 1} — ${module.title}, ${pct} pour cent complété${pathLocked ? ', verrouillé' : ''}`}
          aria-disabled={pathLocked}
          whileTap={
            pathLocked || reduceMotion
              ? undefined
              : { scale: 0.95, transition: { type: 'spring', stiffness: 520, damping: 28 } }
          }
        >
          <svg
            className="pointer-events-none absolute inset-0 h-[88px] w-[88px]"
            viewBox={`0 0 ${BUBBLE} ${BUBBLE}`}
            aria-hidden
          >
            <circle
              cx={CX}
              cy={CY}
              r={R}
              fill="none"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth={STROKE}
            />
            <circle
              cx={CX}
              cy={CY}
              r={R}
              fill="none"
              stroke="rgba(255,255,255,0.92)"
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={offset}
              transform={`rotate(-90 ${CX} ${CY})`}
            />
          </svg>

          <span className="relative z-[1] select-none text-[32px] leading-none">
            {typeof module.icon === 'string' ? module.icon : ''}
          </span>

          {complete100 && (
            <span
              className="pointer-events-none absolute bottom-1 right-1 z-[2] text-lg leading-none drop-shadow"
              aria-hidden
            >
              ⭐
            </span>
          )}

          {allLessonsLocked && (
            <span
              className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center rounded-full bg-black/25 text-2xl"
              aria-hidden
            >
              🔒
            </span>
          )}

          {needsReview && (
            <motion.span
              className="absolute -right-0.5 -top-0.5 z-[3] flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-[var(--ds-warning)] px-1 text-xs font-bold text-[var(--ds-bg-primary)] shadow-sm"
              aria-label="Révision recommandée"
              animate={
                reduceMotion
                  ? { opacity: 1 }
                  : {
                      opacity: [1, 0.4, 1],
                    }
              }
              transition={
                reduceMotion
                  ? undefined
                  : { repeat: Infinity, duration: 1.4, ease: 'easeInOut' }
              }
            >
              !
            </motion.span>
          )}
        </motion.button>
      </motion.div>

      <p className="line-clamp-2 w-full text-center text-sm font-medium leading-snug text-[var(--ds-text-primary)]">
        {module.title}
      </p>
      <p className="text-sm font-semibold tabular-nums text-[var(--ds-accent)]">{pct}%</p>
    </div>
  );
}
