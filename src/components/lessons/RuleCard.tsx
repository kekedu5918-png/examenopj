'use client';

import { motion } from 'framer-motion';
import { Check, type LucideIcon,X, Zap } from 'lucide-react';

import { cn } from '@/utils/cn';

export type RuleCardType = 'allowed' | 'forbidden' | 'conditional';

export interface RuleCardProps {
  type: RuleCardType;
  title: string;
  description: string;
  condition?: string;
  article?: string;
  className?: string;
}

const typeStyles: Record<
  RuleCardType,
  { box: string; icon: LucideIcon; iconWrap: string; label: string }
> = {
  allowed: {
    box: 'border-emerald-500/60 bg-emerald-500/10 dark:bg-emerald-500/[0.12]',
    icon: Check,
    iconWrap: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400',
    label: 'Autorisé',
  },
  forbidden: {
    box: 'border-red-500/60 bg-red-500/10 dark:bg-red-500/[0.12]',
    icon: X,
    iconWrap: 'bg-red-500/20 text-red-600 dark:text-red-400',
    label: 'Interdit',
  },
  conditional: {
    box: 'border-orange-500/60 bg-orange-500/10 dark:bg-orange-500/[0.12]',
    icon: Zap,
    iconWrap: 'bg-orange-500/20 text-orange-600 dark:text-orange-400',
    label: 'Conditionnel',
  },
};

export function RuleCard({ type, title, description, condition, article, className }: RuleCardProps) {
  const styles = typeStyles[type];
  const Icon = styles.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'rounded-xl border-2 p-4 shadow-sm',
        styles.box,
        className,
      )}
    >
      <div className='flex gap-3'>
        <div
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
            styles.iconWrap,
          )}
          aria-hidden
        >
          <Icon className='h-5 w-5 stroke-[2.5]' />
        </div>
        <div className='min-w-0 flex-1 space-y-2'>
          <div className='flex flex-wrap items-center gap-2'>
            <span className='text-[10px] font-semibold uppercase tracking-wide text-ds-text-muted'>
              {styles.label}
            </span>
            {article ? (
              <span className='rounded-md bg-ds-bg-elevated px-1.5 py-0.5 text-[10px] font-medium text-ds-text-muted'>
                {article}
              </span>
            ) : null}
          </div>
          <h3 className='text-sm font-semibold leading-snug text-ds-text-primary'>{title}</h3>
          <p className='text-sm leading-relaxed text-ds-text-muted'>{description}</p>
          {condition ? (
            <p className='rounded-lg border border-ds-border bg-ds-bg-primary/50 px-3 py-2 text-xs italic text-ds-text-primary dark:bg-ds-bg-secondary/50'>
              <span className='font-medium not-italic text-orange-600 dark:text-orange-400'>
                Condition :{' '}
              </span>
              {condition}
            </p>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

export function ExampleUsage() {
  return (
    <div className='flex max-w-lg flex-col gap-4'>
      <RuleCard
        type='allowed'
        title='Perquisition de jour'
        description='Perquisition autorisée de 6h à 21h sans autorisation spéciale du juge.'
        article='Art. 59 CPP'
      />
      <RuleCard
        type='forbidden'
        title='Perquisition nocturne'
        description='Perquisition nocturne interdite sauf autorisation du juge des libertés.'
        article='Art. 59 CPP'
      />
      <RuleCard
        type='conditional'
        title='Audition sans avocat'
        description='Possibilité d’auditionner sans la présence de l’avocat dans des hypothèses encadrées.'
        condition='Urgence caractérisée et dérogation stricte au principe.'
        article='Art. 63-4 CPP'
      />
    </div>
  );
}
