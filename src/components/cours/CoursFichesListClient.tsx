'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

import { GlassCard } from '@/components/ui/GlassCard';
import type { CourseSummary } from '@/lib/content/courses';
import { cn } from '@/utils/cn';

type Props = {
  items: CourseSummary[];
};

export function CoursFichesListClient({ items }: Props) {
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
      <GlassCard className='p-5' padding=''>
        <label htmlFor='cours-filter' className='mb-2 block text-sm font-medium text-gray-300'>
          Filtrer les fiches
        </label>
        <input
          id='cours-filter'
          type='search'
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder='Titre, thème, tag…'
          className='w-full rounded-xl border border-white/10 bg-navy-900/80 px-4 py-3 text-gray-100 outline-none placeholder:text-gray-600 focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/20'
        />
        <p className='mt-2 text-xs text-gray-500'>
          Contenu lu depuis le dossier <code className='rounded bg-white/5 px-1 py-0.5 text-[11px]'>/content/cours</code>.
        </p>
      </GlassCard>

      <ul className='grid gap-3 sm:grid-cols-2'>
        {filtered.map((it) => (
          <li key={it.slug}>
            <Link
              href={`/cours/${it.slug}`}
              className={cn(
                'block rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition',
                'hover:border-violet-500/35 hover:bg-white/[0.06]',
              )}
            >
              <span className='font-semibold text-white'>{it.title}</span>
              {it.tags.length > 0 ? (
                <div className='mt-2 flex flex-wrap gap-1.5'>
                  {it.tags.map((t) => (
                    <span
                      key={t}
                      className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] text-gray-400'
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
        <p className='py-8 text-center text-sm text-gray-500'>Aucune fiche ne correspond au filtre.</p>
      ) : null}
    </div>
  );
}
