'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

export type ConceptCardColor = 'blue' | 'amber' | 'green' | 'red';

export interface ConceptCardProps {
  icon: ReactNode | LucideIcon;
  title: string;
  description: string;
  article?: string;
  color?: ConceptCardColor;
  className?: string;
}

const borderByColor: Record<ConceptCardColor, string> = {
  blue: 'border-l-blue-500 dark:border-l-blue-400',
  amber: 'border-l-amber-500 dark:border-l-amber-400',
  green: 'border-l-emerald-500 dark:border-l-emerald-400',
  red: 'border-l-red-500 dark:border-l-red-400',
};

const accentTextByColor: Record<ConceptCardColor, string> = {
  blue: 'text-blue-600 dark:text-blue-400',
  amber: 'text-amber-600 dark:text-amber-400',
  green: 'text-emerald-600 dark:text-emerald-400',
  red: 'text-red-600 dark:text-red-400',
};

function renderIcon(icon: ConceptCardProps['icon']) {
  if (typeof icon === 'function') {
    const Icon = icon;
    return <Icon className='h-6 w-6 shrink-0' aria-hidden />;
  }
  return <span className='text-2xl leading-none'>{icon}</span>;
}

export function ConceptCard({
  icon,
  title,
  description,
  article,
  color = 'blue',
  className,
}: ConceptCardProps) {
  const c = color;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'rounded-xl border border-ds-border bg-ds-bg-secondary/80 p-4 shadow-sm backdrop-blur-sm',
        'border-l-4',
        borderByColor[c],
        className,
      )}
    >
      <div className='flex gap-3'>
        <div className={cn('mt-0.5 shrink-0', accentTextByColor[c])}>{renderIcon(icon)}</div>
        <div className='min-w-0 flex-1 space-y-1'>
          <h3 className='text-base font-semibold leading-snug text-ds-text-primary'>{title}</h3>
          <p className='line-clamp-2 text-sm leading-relaxed text-ds-text-muted'>{description}</p>
          {article ? (
            <p className={cn('text-xs font-medium tabular-nums', accentTextByColor[c])}>{article}</p>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

/** Données OPJ pour prévisualisation / Storybook */
export function ExampleUsage() {
  return (
    <ConceptCard
      icon='📋'
      title='Durée de la GAV'
      description='Garde à vue initiale de 24 heures, renouvelable dans les conditions légales.'
      article='Art. 63 CPP'
      color='blue'
    />
  );
}
