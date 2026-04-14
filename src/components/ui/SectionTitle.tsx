'use client';

import { motion, useReducedMotion } from 'framer-motion';

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
  const shouldReduceMotion = useReducedMotion();
  const TitleTag = titleAs;

  return (
    <motion.div
      className={cn('space-y-4', className)}
      initial={false}
      {...(!shouldReduceMotion
        ? {
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: '-40px' },
            transition: { duration: 0.55, ease: easeOut },
          }
        : {})}
    >
      {/* Badge : une seule famille (bleu marine / bleu institutionnel) — pas d’arc-en-ciel */}
      <span className='inline-flex rounded-full bg-gradient-to-r from-blue-600/45 via-slate-500/35 to-blue-500/40 p-px shadow-[0_0_22px_-8px_rgba(37,99,235,0.4)]'>
        <span
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em]',
            'bg-[#080f1e]/95 backdrop-blur-sm',
            badgeClassName ?? 'text-slate-200',
          )}
        >
          <span
            className='h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 shadow-[0_0_10px_rgba(59,130,246,0.55)]'
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
            ? 'bg-gradient-to-br from-white via-slate-100 to-blue-200/95 bg-clip-text text-transparent'
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
