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
  /** Taille du titre : plus imposante pour les sections hero marketing */
  size?: 'default' | 'display';
  subtitle?: string;
  className?: string;
  titleId?: string;
};

const easeOut = [0.21, 0.47, 0.32, 0.98] as const;

export function SectionTitle({
  badge,
  badgeClassName,
  title,
  titleGradient,
  size = 'default',
  subtitle,
  className,
  titleId,
}: SectionTitleProps) {
  return (
    <motion.div
      className={cn('space-y-4', className)}
      initial={MOTION_INITIAL_FOR_SEO}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: easeOut }}
    >
      {/* Badge avec contour dégradé type produit premium */}
      <span className='inline-flex rounded-full bg-gradient-to-r from-blue-500/50 via-violet-500/40 to-cyan-500/45 p-[1px] shadow-sm shadow-black/20'>
        <span
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em]',
            'bg-[#080f1e]/95 backdrop-blur-sm',
            badgeClassName ?? 'text-slate-200',
          )}
        >
          <span
            className='h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.5)]'
            aria-hidden
          />
          {badge}
        </span>
      </span>

      <h2
        id={titleId}
        className={cn(
          'font-sans font-extrabold tracking-tight',
          size === 'display' ? 'text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.12]' : 'text-3xl md:text-4xl',
          titleGradient
            ? 'bg-gradient-to-br from-white via-slate-100 to-blue-300/90 bg-clip-text text-transparent'
            : 'text-white',
        )}
      >
        {title}
      </h2>

      {subtitle ? (
        <p className='max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg'>{subtitle}</p>
      ) : null}
    </motion.div>
  );
}
