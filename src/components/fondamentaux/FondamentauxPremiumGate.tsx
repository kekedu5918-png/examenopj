'use client';

import Link from 'next/link';
import { Lock } from 'lucide-react';

import { cn } from '@/utils/cn';

interface Props {
  children: React.ReactNode;
  locked: boolean;
  className?: string;
  /** Clic sur le fond (hors lien Premium) — ex. toast Freemium. */
  onBackdropClick?: () => void;
}

/** Enveloppe une card : flou + overlay si `locked`. */
export function FondamentauxPremiumGate({ children, locked, className, onBackdropClick }: Props) {
  return (
    <div className={cn('relative', className)}>
      <div
        className={cn(
          'transition-[filter]',
          locked ? 'pointer-events-none blur-sm select-none' : ''
        )}
      >
        {children}
      </div>
      {locked ? (
        <div
          role='presentation'
          className='absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-xl bg-navy-950/75 px-4 text-center backdrop-blur-[2px]'
          onClick={() => onBackdropClick?.()}
        >
          <Lock className='h-8 w-8 text-gold-500' aria-hidden />
          <p className='text-sm font-medium text-white'>Contenu Premium</p>
          <p className='max-w-[14rem] text-xs text-slate-400'>
            Débloquez les 20 fiches fondamentales avec l&apos;offre Premium.
          </p>
          <Link
            href='/pricing'
            className='pointer-events-auto rounded-lg border border-gold-500/50 bg-gold-500/10 px-4 py-2 text-sm font-medium text-gold-400 transition-colors hover:bg-gold-500/20'
            onClick={(e) => e.stopPropagation()}
          >
            Passer Premium →
          </Link>
        </div>
      ) : null}
    </div>
  );
}
