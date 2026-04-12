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
      {/* Badge sobre type produit premium (Apple) + point d’accent unique */}
      <span className='inline-flex rounded-full border border-white/[0.1] bg-white/[0.04] p-[1px] shadow-[0_1px_0_rgba(255,255,255,0.06)_inset] backdrop-blur-sm'>
        <span
          className={cn(
            'inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]',
            badgeClassName ?? 'text-slate-300',
          )}
        >
          <span
            className='h-1.5 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-400'
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
