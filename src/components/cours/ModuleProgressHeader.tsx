'use client';

import { motion, useReducedMotion } from 'framer-motion';

type ModuleProgressHeaderProps = {
  currentModuleNumber: number;
  percentage: number;
};

export function ModuleProgressHeader({ currentModuleNumber, percentage }: ModuleProgressHeaderProps) {
  const shouldReduce = useReducedMotion();

  return (
    <div className='module-progress-bar' aria-label='Progression du programme'>
      <span>Module F{String(currentModuleNumber).padStart(2, '0')} / 15</span>
      <div className='progress-track' aria-hidden>
        <motion.div
          className='progress-fill'
          initial={shouldReduce ? { width: `${percentage.toFixed(1)}%` } : { width: 0 }}
          animate={{ width: `${percentage.toFixed(1)}%` }}
          transition={{
            duration: 1.1,
            ease: [0.34, 1.56, 0.64, 1],
            delay: 0.4,
          }}
        />
      </div>
      <span>{percentage.toFixed(1)}%</span>
    </div>
  );
}
