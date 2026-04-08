'use client';

import Link from 'next/link';
import { Lock } from 'lucide-react';

import { PVRenderer } from '@/components/pv/PVRenderer';
import type { ModelePV } from '@/types/pv';
import { cn } from '@/utils/cn';

type Props = {
  modele: ModelePV;
  userHasPremium: boolean;
};

export function ModelePVDetailClient({ modele, userHasPremium }: Props) {
  const unlocked = !modele.isPremium || userHasPremium;

  return (
    <>
      <div className='relative pb-4'>
        <div
          className={cn(
            'rounded-2xl border border-white/[0.08] bg-examen-card p-4 md:p-6',
            !unlocked && 'relative overflow-hidden',
          )}
        >
          <div
            className={cn(
              'transition-[filter,opacity]',
              !unlocked && 'pointer-events-none max-h-[min(70vh,520px)] overflow-hidden blur-[6px] opacity-60',
            )}
          >
            <PVRenderer modele={modele} variant='page' canCopyFull={unlocked} />
          </div>

          {!unlocked ? (
            <div className='absolute inset-0 flex flex-col items-center justify-center gap-4 bg-examen-canvas/75 px-6 text-center backdrop-blur-sm'>
              <span className='flex h-14 w-14 items-center justify-center rounded-full border border-examen-premium/40 bg-examen-premium/15'>
                <Lock className='h-7 w-7 text-examen-premium' aria-hidden />
              </span>
              <p className='max-w-md text-sm font-medium text-white'>
                Ce modèle complet est réservé aux abonnés Premium. Passez Premium pour copier, imprimer et utiliser la
                version intégrale.
              </p>
              <Link
                href='/pricing'
                className='rounded-lg bg-gradient-to-r from-examen-accent to-examen-premium px-5 py-2.5 text-sm font-semibold text-white hover:brightness-110'
              >
                Découvrir Premium
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
