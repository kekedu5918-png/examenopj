'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { FlashcardRichText } from '@/components/flashcards/flashcard-rich-text';
import { getInfractionsCatalog, type InfractionCatalogItem } from '@/data/recapitulatif-data';

function stripForSearch(s: string): string {
  return s
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .toLowerCase();
}

export function InfractionsPageClient() {
  const [query, setQuery] = useState('');
  const [fascFilter, setFascFilter] = useState<'all' | 'F01' | 'F02'>('all');

  const catalog = useMemo(() => getInfractionsCatalog(), []);

  const filtered = useMemo(() => {
    const q = stripForSearch(query.trim());
    return catalog.filter((item) => {
      if (fascFilter !== 'all' && item.fascicule !== fascFilter) return false;
      if (!q) return true;
      const hay = `${stripForSearch(item.infraction)} ${stripForSearch(item.legal)} ${stripForSearch(item.groupTitle)}`;
      return hay.includes(q);
    });
  }, [catalog, query, fascFilter]);

  return (
    <div className='container pb-20 pt-10'>
      <h1 className='sr-only'>Référentiel des infractions</h1>
      <SectionTitle
        badge='RÉFÉRENTIEL'
        badgeClassName='bg-slate-500/20 text-slate-300'
        title='Infractions'
        subtitle='F01 et F02 : repères légaux et liens vers révision (flashcards, récapitulatif).'
        className='mb-8'
      />

      <GlassCard className='mb-8 space-y-4 p-6' padding=''>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
          <div className='max-w-md flex-1 space-y-2'>
            <label htmlFor='inf-search' className='text-sm font-medium text-gray-300'>
              Rechercher une infraction
            </label>
            <input
              id='inf-search'
              type='search'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Ex. : extorsion, 223-1, vol…'
              className='w-full rounded-xl border border-white/10 bg-navy-900/80 px-4 py-3 text-gray-100 outline-none placeholder:text-gray-600 focus:border-amber-500/40 focus:ring-2 focus:ring-amber-500/20'
            />
          </div>
          <div className='flex flex-wrap gap-2'>
            {(['all', 'F01', 'F02'] as const).map((f) => (
              <button
                key={f}
                type='button'
                onClick={() => setFascFilter(f)}
                className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
                  fascFilter === f
                    ? 'border-amber-500/50 bg-amber-500/15 text-amber-100'
                    : 'border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/20'
                }`}
              >
                {f === 'all' ? 'Tous' : f}
              </button>
            ))}
          </div>
        </div>
        <p className='text-sm text-gray-500'>
          {filtered.length} infraction{filtered.length > 1 ? 's' : ''} affichée{filtered.length > 1 ? 's' : ''}
        </p>
      </GlassCard>

      <ul className='space-y-4'>
        {filtered.map((item: InfractionCatalogItem) => (
          <li key={item.id}>
            <article className='rounded-2xl border border-white/10 bg-navy-950/50 p-5 shadow-lg'>
              <div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
                <div className='min-w-0 flex-1 space-y-1'>
                  <p className='text-xs font-medium uppercase tracking-wide text-gray-500'>
                    {item.fascicule}
                    {item.fasciculePart ? ` · ${item.fasciculePart}` : ''} · {item.groupTitle}
                  </p>
                  <h2 className='font-display text-lg font-bold text-white md:text-xl'>
                    <FlashcardRichText text={item.infraction} inline />
                  </h2>
                  <p className='text-sm text-gray-400'>
                    <span className='text-gray-500'>Élément légal : </span>
                    {item.legal}
                  </p>
                </div>
                <div className='flex shrink-0 flex-col gap-2 sm:items-end'>
                  <Link
                    href={`/flashcards?cat=${item.flashcardsCat}`}
                    className='inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:opacity-95'
                  >
                    Réviser en flashcards
                  </Link>
                  <Link
                    href='/recapitulatif'
                    className='text-center text-sm text-emerald-400/90 underline-offset-2 hover:underline'
                  >
                    Voir le tableau récapitulatif
                  </Link>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>

      {filtered.length === 0 ? (
        <p className='py-12 text-center text-gray-500'>Aucune infraction ne correspond à ta recherche.</p>
      ) : null}
    </div>
  );
}
