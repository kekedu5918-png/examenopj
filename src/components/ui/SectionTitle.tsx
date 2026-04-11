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
  /** Niveau de titre sémantique (ex. h1 sur une page article) */
  titleAs?: 'h1' | 'h2';
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
  titleAs = 'h2',
}: SectionTitleProps) {
  const TitleTag = titleAs;

  return (
    <motion.div
      className={cn('space-y-4', className)}
      initial={MOTION_INITIAL_FOR_SEO}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: easeOut }}
    >
      {/* Badge avec contour dégradé type produit premium */}
      <span className='inline-flex rounded-full bg-gradient-to-r from-violet-500/70 via-fuchsia-500/55 via-50% to-cyan-500/60 p-[1px] shadow-[0_0_24px_-4px_rgba(139,92,246,0.45)]'>
        <span
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em]',
            'bg-[#080f1e]/95 backdrop-blur-sm',
            badgeClassName ?? 'text-slate-200',
          )}
        >
          <span
            className='h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-violet-400 via-fuchsia-400 to-cyan-400 shadow-[0_0_10px_rgba(167,139,250,0.75)]'
            aria-hidden
          />
          {badge}
        </span>
      </span>

      <TitleTag
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
      </TitleTag>

      {subtitle ? (
        <p className='max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg'>{subtitle}</p>
      ) : null}
    </motion.div>
  );
}
