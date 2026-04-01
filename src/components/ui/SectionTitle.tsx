'use client';

import { motion } from 'framer-motion';

import { cn } from '@/utils/cn';

type SectionTitleProps = {
  badge: string;
  badgeClassName?: string;
  title: string;
  subtitle: string;
  className?: string;
};

export function SectionTitle({ badge, badgeClassName, title, subtitle, className }: SectionTitleProps) {
  return (
    <motion.div
      className={cn('space-y-3', className)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <span
        className={cn(
          'inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider',
          badgeClassName ?? 'bg-red-500/20 text-red-300'
        )}
      >
        {badge}
      </span>
      <h2 className='font-display text-3xl font-bold tracking-tight text-white'>{title}</h2>
      <p className='text-lg text-gray-400'>{subtitle}</p>
    </motion.div>
  );
}
