'use client';

import type { ReactNode } from 'react';

type PVCardProps = {
  children: ReactNode;
};

function PVHeaderField({ label }: { label: string }) {
  return (
    <div className='border-b border-white/10 p-3 sm:border-b-0 sm:border-r sm:border-white/10 sm:last:border-r-0'>
      <div className='text-[10px] font-semibold uppercase tracking-wider text-gray-500'>{label}</div>
      <div
        className='mt-2 min-h-[1.75rem] border-b-2 border-dashed border-white/30 bg-white/[0.03] px-1 py-0.5 text-sm text-transparent'
        aria-hidden
      >
        .
      </div>
    </div>
  );
}

/** Cartouche type formulaire officiel (en-tête P.V. + mentions). */
export function PVCard({ children }: PVCardProps) {
  return (
    <div className='overflow-hidden rounded-xl border-2 border-white/20 bg-navy-950/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]'>
      <div className='grid grid-cols-1 sm:grid-cols-3'>
        <PVHeaderField label='P.V. N°' />
        <PVHeaderField label='JJ/MM/AA à … h' />
        <PVHeaderField label='OPJ' />
      </div>
      <div className='space-y-4 border-t border-white/10 p-4 md:p-5'>{children}</div>
    </div>
  );
}

export function PVLine({ m, i }: { m: string; i?: string }) {
  return (
    <div className='rounded-md border-l-2 border-blue-500/40 bg-white/[0.02] py-2 pl-3 pr-2 text-sm leading-relaxed'>
      <span className='font-bold text-white'>{m}</span>
      {i ? <span className='italic text-blue-400'> {i}</span> : null}
    </div>
  );
}

export function PVDroitsGroup({ title, bullets }: { title: string; bullets: { m: string; i?: string }[] }) {
  return (
    <div className='rounded-lg border border-white/15 bg-white/[0.03] p-3 md:p-4'>
      <p className='mb-2 text-xs font-bold uppercase tracking-wide text-white'>{title}</p>
      <ul className='list-disc space-y-2 pl-5 text-sm marker:text-blue-500/60'>
        {bullets.map((b, idx) => (
          <li key={`${b.m}-${idx}`} className='leading-snug'>
            <span className='font-bold text-white'>{b.m}</span>
            {b.i ? <span className='italic text-blue-400'> — {b.i}</span> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PVDivider() {
  return <div className='my-3 border-t border-dashed border-white/15' />;
}

/** Note sous un cartouche (rappels réglementaires, mentions d’usage). */
export function PVNote({ children }: { children: ReactNode }) {
  return (
    <div className='rounded-lg border border-amber-500/25 bg-amber-500/[0.07] p-3 text-sm leading-relaxed text-gray-300'>
      <span className='font-bold text-amber-200'>Note : </span>
      {children}
    </div>
  );
}
