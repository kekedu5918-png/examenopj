'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

import type { CourseSummary } from '@/lib/content/courses';
import { cn } from '@/utils/cn';

type Props = {
  items: CourseSummary[];
  /** Base URL des fiches (ex. `/fondamentaux`) */
  basePath?: string;
};

export function CoursFichesListClient({ items, basePath = '/fondamentaux' }: Props) {
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((it) => {
      const hay = `${it.title} ${it.tags.join(' ')}`.toLowerCase();
      return hay.includes(s);
    });
  }, [items, q]);

  return (
    <div className='space-y-6'>
      <div className='rounded-2xl border border-ij-border bg-ij-surface p-5'>
        <label htmlFor='fondamentaux-filter' className='mb-2 block font-ij-sans text-sm font-medium text-ij-text'>
          Filtrer les fiches
        </label>
        <input
          id='fondamentaux-filter'
          type='search'
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder='Titre, thème, tag…'
          className='w-full rounded-xl border border-ij-border bg-ij-surface-2/80 px-4 py-3 font-ij-sans text-ij-text outline-none placeholder:text-ij-text-subtle focus:border-ij-accent/40 focus:ring-2 focus:ring-ij-accent/20'
        />
        <p className='mt-2 font-ij-sans text-xs text-ij-text-muted'>
          Fiches éditoriales (sources internes vérifiées) — présentation synthétique pour le candidat.
        </p>
      </div>

      <ul className='grid gap-3 sm:grid-cols-2'>
        {filtered.map((it) => (
          <li key={it.slug}>
            <Link
              href={`${basePath}/${it.slug}`}
              className={cn(
                'block rounded-2xl border border-ij-border bg-ij-text/[0.03] p-4 transition',
                'hover:border-ij-accent/35 hover:bg-ij-text/[0.06]',
              )}
            >
              <span className='font-ij-sans font-semibold text-ij-text'>{it.title}</span>
              {it.tags.length > 0 ? (
                <div className='mt-2 flex flex-wrap gap-1.5'>
                  {it.tags.map((t) => (
                    <span
                      key={t}
                      className='rounded-md border border-ij-border bg-ij-surface-2 px-2 py-0.5 font-ij-sans text-[11px] font-medium text-ij-text'
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>

      {filtered.length === 0 ? (
        <p className='py-8 text-center font-ij-sans text-sm text-ij-text-muted'>Aucune fiche ne correspond au filtre.</p>
      ) : null}
    </div>
  );
}
