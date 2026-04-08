'use client';

import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

import { CONTENT_REVIEW, LEGIFRANCE_HOME } from '@/data/content-review-meta';
import { cn } from '@/utils/cn';

type Props = {
  className?: string;
  compact?: boolean;
};

/**
 * Rappel : relecture pédagogique datée + obligation de contrôle Légifrance / fascicule officiel.
 */
export function ContentReviewStrip({ className, compact }: Props) {
  const formatted = new Date(CONTENT_REVIEW.lastReviewDate).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  if (compact) {
    return (
      <p
        className={cn(
          'flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-500',
          className,
        )}
      >
        <ShieldCheck className='h-3.5 w-3.5 shrink-0 text-cyan-500/80' aria-hidden />
        <span>
          Relecture pédagogique : <time dateTime={CONTENT_REVIEW.lastReviewDate}>{formatted}</time> —{' '}
          {CONTENT_REVIEW.scopeShort}{' '}
          <Link href={LEGIFRANCE_HOME} className='text-cyan-400 hover:underline' target='_blank' rel='noopener noreferrer'>
            Légifrance
          </Link>
        </span>
      </p>
    );
  }

  return (
    <div
      className={cn(
        'rounded-xl border border-cyan-500/25 bg-gradient-to-r from-cyan-500/[0.07] to-transparent px-4 py-3 text-sm text-slate-300',
        className,
      )}
    >
      <div className='flex flex-wrap items-start gap-3'>
        <ShieldCheck className='mt-0.5 h-5 w-5 shrink-0 text-cyan-400/90' aria-hidden />
        <div className='min-w-0 flex-1 space-y-1'>
          <p className='font-semibold text-cyan-100'>Contrôle des contenus</p>
          <p className='text-xs leading-relaxed text-slate-400'>
            Dernière passe éditoriale : <time dateTime={CONTENT_REVIEW.lastReviewDate}>{formatted}</time>
            <span className='text-slate-500'> · </span>
            {CONTENT_REVIEW.scopeShort} La référence reste votre <strong className='text-slate-300'>support institutionnel</strong> et les{' '}
            <Link href={LEGIFRANCE_HOME} className='font-medium text-cyan-400 hover:underline' target='_blank' rel='noopener noreferrer'>
              textes en vigueur sur Légifrance
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
