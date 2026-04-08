'use client';

import { WrittenExamDaysCount } from '@/components/home/hydration-safe-day-counts';

export function GuideIntroLead() {
  return (
    <p className='mt-4 text-lg leading-relaxed text-gray-400'>
      Un plan de bataille en 3 phases pour décrocher votre habilitation en juin 2026.{' '}
      <span className='text-gray-200'>
        <WrittenExamDaysCount className='tabular-nums' /> jours
      </span>
      , 3 épreuves, une méthode.
    </p>
  );
}
