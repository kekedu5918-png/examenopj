'use client';

import { motion } from 'framer-motion';

import { MOTION_INITIAL_FOR_SEO } from '@/components/home/motion';
import { cn } from '@/utils/cn';

type SectionTitleProps = {
  badge: string;
  badgeClassName?: string;
  title: string;
  /** Si true, applique un dégradé bleu→cyan sur le titre */
  titleGradient?: boolean;
  subtitle?: string;
  className?: string;
  titleId?: string;
};

const easeOut = [0.21, 0.47, 0.32, 0.98] as const;

export function SectionTitle({ badge, badgeClassName, title, titleGradient, subtitle, className, titleId }: SectionTitleProps) {
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
          'inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] shadow-sm shadow-black/20',
          badgeClassName ?? 'bg-white/[0.05] text-slate-300',
        )}
      >
        <span className='h-1.5 w-1.5 rounded-full bg-current opacity-70' aria-hidden />
        {badge}
      </span>

      <h2
        id={titleId}
        className={cn(
          'font-sans text-3xl font-extrabold tracking-tight md:text-4xl',
          titleGradient
            ? 'bg-gradient-to-r from-white via-slate-100 to-blue-300 bg-clip-text text-transparent'
            : 'text-white',
        )}
      >
        {title}
      </h2>

      {subtitle ? (
        <p className='text-base leading-relaxed text-gray-400 md:text-lg'>{subtitle}</p>
      ) : null}
    </motion.div>
  );
}
