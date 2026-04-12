'use client';

import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { ModuleDetail } from '@/components/learning/ModuleDetail';
import { ModuleNode } from '@/components/learning/ModuleNode';
import { PathConnector } from '@/components/learning/PathConnector';
import { ProgressHeader } from '@/components/learning/ProgressHeader';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/utils/cn';

const XP_PER_SEGMENT = 600;

export interface LearningPathLesson {
  lessonId: string;
  title: string;
  href: string;
  type: 'discovery' | 'training' | 'consolidation' | 'case' | 'exam';
  estimatedMinutes: number;
  xpReward: number;
  status: 'locked' | 'unlocked' | 'completed' | 'needs_review';
  lastScore: number | null;
}

export interface LearningPathModule {
  id: string;
  slug: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  completionPercent: number;
  lessons: LearningPathLesson[];
}

export interface LearningPathProps {
  modules: LearningPathModule[];
  userStreak: number;
  userXp: number;
  userLevel: number;
  lives: number;
  daysUntilExam?: number;
}

function findActiveModuleIndex(modules: LearningPathModule[]): number {
  for (let i = 0; i < modules.length; i++) {
    if (i > 0 && modules[i - 1]!.completionPercent < 80) {
      continue;
    }
    if (modules[i]!.completionPercent < 100) {
      return i;
    }
  }
  return -1;
}

function isPathLocked(modules: LearningPathModule[], index: number): boolean {
  if (index === 0) return false;
  return modules[index - 1]!.completionPercent < 80;
}

export function LearningPath({
  modules,
  userStreak,
  userXp,
  userLevel,
  lives,
  daysUntilExam,
}: LearningPathProps) {
  const reduceMotion = useReducedMotion();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const activeIndex = useMemo(() => findActiveModuleIndex(modules), [modules]);

  /** Aucune progression sur aucun module → verrouillage visuel plus fort (grayscale) sur les modules 2+. */
  const allModulesAtZeroPercent = useMemo(
    () => modules.length > 0 && modules.every((m) => m.completionPercent === 0),
    [modules],
  );

  const levelFloor = Math.max(0, (userLevel - 1) * XP_PER_SEGMENT);
  const xpCurrent = Math.max(0, userXp - levelFloor);
  const xpNextLevel = XP_PER_SEGMENT;

  const selectedModule = useMemo(
    () => modules.find((m) => m.slug === selectedSlug) ?? null,
    [modules, selectedSlug],
  );

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.08,
      },
    },
  };

  const rowVariants = {
    hidden: reduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 380, damping: 28 },
    },
  };

  const showLockedToast = () => {
    toast({
      title: 'Module verrouillé',
      description: 'Termine le module précédent d’abord (au moins 80 %).',
    });
  };

  return (
    <div className="min-h-screen bg-[var(--ds-bg-primary)] pb-24 pt-2">
      <ProgressHeader
        streak={userStreak}
        xpCurrent={xpCurrent}
        xpNextLevel={xpNextLevel}
        level={userLevel}
        lives={lives}
        daysUntilExam={daysUntilExam}
      />

      <motion.div
        className="mx-auto flex max-w-md flex-col px-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {modules.map((mod, index) => {
          const align: 'left' | 'right' = index % 2 === 0 ? 'left' : 'right';
          const pathLocked = isPathLocked(modules, index);
          const isActive = activeIndex === index;
          const connectorCompleted = mod.completionPercent >= 100;
          const nextAlign: 'left' | 'right' = (index + 1) % 2 === 0 ? 'left' : 'right';

          return (
            <motion.div key={mod.id} variants={rowVariants} className="flex flex-col">
              <div
                className={cn(
                  'flex w-full',
                  align === 'left' ? 'justify-start pl-2' : 'justify-end pr-2',
                )}
              >
                <ModuleNode
                  module={{
                    id: mod.id,
                    title: mod.title,
                    color: mod.color,
                    icon: mod.icon,
                    completionPercent: mod.completionPercent,
                  }}
                  lessons={mod.lessons}
                  pathLocked={pathLocked}
                  lockedVisualHard={allModulesAtZeroPercent}
                  isActive={isActive}
                  index={index}
                  onOpen={() => setSelectedSlug(mod.slug)}
                  onLockedPathClick={showLockedToast}
                />
              </div>

              {index < modules.length - 1 && (
                <PathConnector
                  from={align}
                  to={nextAlign}
                  completed={connectorCompleted}
                />
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {selectedModule && (
        <ModuleDetail
          module={{
            id: selectedModule.id,
            slug: selectedModule.slug,
            title: selectedModule.title,
            description: selectedModule.description,
            color: selectedModule.color,
            icon: selectedModule.icon,
            completionPercent: selectedModule.completionPercent,
          }}
          lessons={selectedModule.lessons}
          isOpen
          onClose={() => setSelectedSlug(null)}
        />
      )}
    </div>
  );
}
