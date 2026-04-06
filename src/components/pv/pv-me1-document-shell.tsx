'use client';

import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

type ShellProps = {
  left: ReactNode;
  right: ReactNode;
  className?: string;
  /** Faux : rendu strict type PDF ME1 (pas de surtitres « Marge » / « PV »). */
  plain?: boolean;
};

/**
 * Habillage visuel type fascicule ME1 : marge gauche (≈28 %) séparée du bloc principal par un filet vertical,
 * fond légèrement différencié — proche de la lecture d’un PDF institutionnel en deux colonnes.
 */
export function PVMe1DocumentShell({ left, right, className, plain = true }: ShellProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border-2 border-[#1a1f28] bg-[#0c1018] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_12px_40px_rgba(0,0,0,0.45)] print:border-black print:bg-white print:shadow-none',
        className,
      )}
    >
      <div className='flex min-h-[200px] flex-col md:flex-row print:flex-row'>
        <div
          className={cn(
            'shrink-0 border-[#2a3240] bg-[#0a0e14] px-3 py-3 md:w-[min(32%,300px)] md:border-r md:border-b-0 md:py-4 md:pl-4',
            'print:w-[28%] print:border-r print:border-black print:bg-white',
          )}
        >
          {!plain ? (
            <div className='mb-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500 print:text-black md:text-[11px]'>
              Marge
            </div>
          ) : null}
          {left}
        </div>
        <div
          className={cn(
            'min-w-0 flex-1 bg-[#080c11] px-3 py-3 md:py-4 md:pr-4',
            'print:bg-white print:text-black',
          )}
        >
          {!plain ? (
            <div className='mb-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500 print:text-black md:text-[11px]'>
              Procès-verbal
            </div>
          ) : null}
          {right}
        </div>
      </div>
    </div>
  );
}

type SingleProps = { children: ReactNode; className?: string };

/** Une seule colonne (PV sans découpe GAUCHE/DROIT explicite dans le modèle). */
export function PVMe1DocumentSingle({ children, className }: SingleProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border-2 border-[#1a1f28] bg-[#080c11] px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_12px_40px_rgba(0,0,0,0.45)] md:px-4 md:py-4 print:border-black print:bg-white print:shadow-none',
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * Découpe un modèle contenant les marqueurs ME1 « ––– GAUCHE … ––– » et « ––– DROIT … ––– ».
 * Retourne null si le gabarit n’est pas en deux colonnes explicites.
 */
export function splitMe1TemplateTwoColumns(template: string): { left: string; right: string } | null {
  const droitSplit = /\n–––\s*DROIT[\s\S]*?–––\s*\n/;
  const dm = droitSplit.exec(template);
  if (!dm) return null;
  const leftHeader = /^\s*–––\s*GAUCHE[\s\S]*?–––\s*\n/;
  const left = template.slice(0, dm.index).replace(leftHeader, '').trim();
  const right = template.slice(dm.index + dm[0].length);
  return { left, right };
}
