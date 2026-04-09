'use client';

import Link from 'next/link';

import { cn } from '@/utils/cn';
import { getModuleNumGradient } from '@/utils/module-gradients';

type DomainKey = 'DPS' | 'DPG' | 'PROCEDURE';

const DOMAIN_BADGE: Record<DomainKey, string> = {
  DPS: 'border-red-400/30 bg-red-500/10 text-red-200',
  DPG: 'border-violet-400/30 bg-violet-500/10 text-violet-200',
  PROCEDURE: 'border-blue-400/30 bg-blue-500/10 text-blue-200',
};

const DOMAIN_CARD: Record<DomainKey, string> = {
  DPS: 'border-red-500/20 hover:border-red-500/40',
  DPG: 'border-violet-500/20 hover:border-violet-500/40',
  PROCEDURE: 'border-blue-500/20 hover:border-blue-500/40',
};

const DOMAIN_LABEL: Record<DomainKey, string> = {
  DPS: 'Droit pénal spécial',
  DPG: 'Droit pénal général',
  PROCEDURE: 'Procédure pénale',
};

export type ModuleCardProps = {
  id: string;
  numero: number;
  titre: string;
  accroche: string;
  domain: DomainKey;
  isRead?: boolean;
  /** Si true, affiche le badge domaine */
  showDomain?: boolean;
};

export function ModuleCard({ id, numero, titre, accroche, domain, isRead, showDomain = false }: ModuleCardProps) {
  const badge = `F${String(numero).padStart(2, '0')}`;

  return (
    <div
      className={cn(
        'group flex flex-col rounded-2xl border bg-white/[0.025] transition-all duration-200',
        'hover:-translate-y-0.5 hover:bg-white/[0.04] hover:shadow-lg hover:shadow-black/20',
        DOMAIN_CARD[domain],
      )}
    >
      {/* En-tête */}
      <div className='flex items-start gap-3 p-4 pb-3'>
        <span
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-black text-white shadow-md',
            getModuleNumGradient(numero),
          )}
          aria-hidden
        >
          {badge}
        </span>
        <div className='min-w-0 flex-1'>
          <div className='flex flex-wrap items-center gap-2'>
            {showDomain && (
              <span
                className={cn(
                  'rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                  DOMAIN_BADGE[domain],
                )}
              >
                {DOMAIN_LABEL[domain]}
              </span>
            )}
            {isRead && (
              <span className='rounded-md border border-emerald-500/35 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-300'>
                ✓ Lu
              </span>
            )}
          </div>
          <p className='mt-1 font-display text-base font-semibold leading-snug text-white group-hover:text-cyan-100'>
            {titre}
          </p>
        </div>
      </div>

      {/* Accroche */}
      <p className='line-clamp-2 px-4 text-sm leading-relaxed text-gray-400'>{accroche}</p>

      {/* CTAs */}
      <div className='mt-auto flex items-center gap-1 border-t border-white/[0.07] p-3 pt-3'>
        <Link
          href={`/cours/modules/${id}`}
          className='flex-1 rounded-lg bg-white/[0.04] px-3 py-1.5 text-center text-xs font-semibold text-gray-200 transition hover:bg-cyan-500/20 hover:text-cyan-100'
          onClick={(e) => e.stopPropagation()}
        >
          Fiche →
        </Link>
        <Link
          href={`/quiz?mode=module&f=${id}`}
          className='rounded-lg border border-cyan-500/25 bg-cyan-500/8 px-3 py-1.5 text-xs font-medium text-cyan-300 transition hover:bg-cyan-500/15'
          onClick={(e) => e.stopPropagation()}
        >
          Quiz
        </Link>
        <Link
          href={`/flashcards?f=${id}`}
          className='rounded-lg border border-amber-500/25 bg-amber-500/8 px-3 py-1.5 text-xs font-medium text-amber-300 transition hover:bg-amber-500/15'
          onClick={(e) => e.stopPropagation()}
        >
          Flashcards
        </Link>
      </div>
    </div>
  );
}
