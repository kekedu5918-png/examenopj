'use client';

import { cn } from '@/utils/cn';

export type FicheSchemaAcronymeProps = {
  titre: string;
  acronyme?: string;
  cards?: Array<{ lettre: string; mot: string; desc: string }>;
};

export function FicheSchemaAcronyme({ titre, acronyme, cards }: FicheSchemaAcronymeProps) {
  return (
    <div className='rounded-xl border border-ij-border/40 bg-ij-surface/50 p-5'>
      <h3 className='font-ij-display text-lg font-semibold text-ij-text'>{titre}</h3>
      {acronyme ? (
        <p className='mt-1 text-sm font-medium tracking-wide text-ij-accent'>{acronyme}</p>
      ) : null}
      {cards?.length ? (
        <ul className='mt-4 grid gap-3 sm:grid-cols-2'>
          {cards.map((c) => (
            <li
              key={`${c.lettre}-${c.mot}`}
              className={cn(
                'rounded-lg border border-ij-border/35 bg-ij-bg/60 p-3',
              )}
            >
              <span className='font-ij-display text-lg font-bold text-ij-accent'>{c.lettre}</span>
              <span className='ml-2 font-medium text-ij-text'>{c.mot}</span>
              <p className='mt-1 text-sm text-ij-text-muted'>{c.desc}</p>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
