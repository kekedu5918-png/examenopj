'use client';

import { motion } from 'framer-motion';

import { MOTION_INITIAL_FOR_SEO } from '@/components/home/motion';
import { cn } from '@/utils/cn';

type SectionTitleProps = {
  badge: string;
  badgeClassName?: string;
  title: string;
  subtitle?: string;
  className?: string;
  /** Id du `<h2>` pour `aria-labelledby` sur la section parente. */
  titleId?: string;
};

const easeOut = [0.21, 0.47, 0.32, 0.98] as const;

export function SectionTitle({ badge, badgeClassName, title, subtitle, className, titleId }: SectionTitleProps) {
  return (
    <motion.div
      className={cn('space-y-3', className)}
      initial={MOTION_INITIAL_FOR_SEO}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: easeOut }}
    >
      <span
        className={cn(
          'inline-block rounded-full border border-white/[0.08] px-3 py-1 text-xs font-semibold uppercase tracking-wider shadow-sm shadow-black/20',
          badgeClassName ?? 'bg-red-500/20 text-red-300'
        )}
      >
        {badge}
      </span>
      <h2 id={titleId} className='font-sans text-3xl font-extrabold tracking-tight text-white md:text-4xl'>
        {title}
      </h2>
      {subtitle ? <p className='text-base leading-relaxed text-gray-400 md:text-lg'>{subtitle}</p> : null}
    </motion.div>
  );
}
