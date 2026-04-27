'use client';

import type { FicheFrontmatterV3 } from '@/lib/fondamentaux/fiche-frontmatter-v3';
import { cn } from '@/utils/cn';

export type FicheBlocsSyntheseProps = {
  blocs: FicheFrontmatterV3['blocs'];
};

const blocStyles = {
  definition: 'border-ij-success/35 bg-ij-success/8',
  piege: 'border-ij-warning/40 bg-ij-warning/10',
  pointCle: 'border-ij-danger/35 bg-ij-danger/10',
  memo: 'border-ij-accent/40 bg-ij-memo/12',
} as const;

export function FicheBlocsSynthese({ blocs }: FicheBlocsSyntheseProps) {
  const items: Array<{ key: keyof typeof blocStyles; title: string; body: string }> = [
    { key: 'definition', title: 'Définition', body: blocs.definition },
    { key: 'piege', title: 'Piège', body: blocs.piege },
    { key: 'pointCle', title: 'Point clé', body: blocs.pointCle },
    { key: 'memo', title: 'Mémo', body: blocs.memo },
  ];

  return (
    <section className='mt-10 grid gap-4 sm:grid-cols-2' aria-label='Synthèse'>
      {items.map((item) => (
        <article
          key={item.key}
          className={cn(
            'rounded-xl border p-4',
            blocStyles[item.key],
          )}
        >
          <h3 className='text-sm font-semibold uppercase tracking-wide text-ij-text'>{item.title}</h3>
          <p className='mt-2 text-sm leading-relaxed text-ij-text-muted'>{item.body}</p>
        </article>
      ))}
    </section>
  );
}
