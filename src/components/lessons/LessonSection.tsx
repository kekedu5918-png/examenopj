'use client';

import { motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';

import { cn } from '@/utils/cn';

export interface LessonSectionProps extends PropsWithChildren {
  title: string;
  subtitle?: string;
  sectionNumber: number;
  totalSections: number;
  className?: string;
}

export function LessonSection({
  title,
  subtitle,
  sectionNumber,
  totalSections,
  children,
  className,
}: LessonSectionProps) {
  const pct = Math.min(100, Math.max(0, (sectionNumber / totalSections) * 100));

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{ duration: 0.35 }}
      className={cn('space-y-6', className)}
      aria-labelledby={`lesson-section-${sectionNumber}-title`}
    >
      <div className='relative border-b border-ds-border pb-6'>
        <div className='mb-3 flex flex-wrap items-end justify-between gap-3'>
          <div>
            <p className='text-[10px] font-semibold uppercase tracking-wide text-ds-text-muted'>
              Section {sectionNumber} / {totalSections}
            </p>
            <h2
              id={`lesson-section-${sectionNumber}-title`}
              className='mt-1 text-xl font-bold tracking-tight text-ds-text-primary sm:text-2xl'
            >
              {title}
            </h2>
            {subtitle ? (
              <p className='mt-1 max-w-2xl text-sm text-ds-text-muted'>{subtitle}</p>
            ) : null}
          </div>
        </div>
        <div
          className='h-1.5 w-full overflow-hidden rounded-full bg-ds-bg-elevated'
          role='progressbar'
          aria-valuenow={sectionNumber}
          aria-valuemin={1}
          aria-valuemax={totalSections}
          aria-label={`Progression de la leçon : section ${sectionNumber} sur ${totalSections}`}
        >
          <motion.div
            className='h-full rounded-full bg-ds-accent'
            initial={{ width: 0 }}
            whileInView={{ width: `${pct}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      <div className='space-y-6'>{children}</div>

      <div className='border-t border-ds-border pt-2' aria-hidden />
    </motion.section>
  );
}

export function ExampleUsage() {
  return (
    <LessonSection
      title='Garde à vue : le cadre'
      subtitle='Les durées et actes clés à retenir pour l’examen.'
      sectionNumber={2}
      totalSections={5}
    >
      <p className='text-sm text-ds-text-muted'>
        (Contenu pédagogique : cartes concept, timeline, etc.)
      </p>
    </LessonSection>
  );
}
