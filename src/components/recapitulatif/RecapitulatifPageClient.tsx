'use client';

import { Fragment, useEffect, useMemo, useState } from 'react';

import { FlashcardRichText } from '@/components/flashcards/flashcard-rich-text';
import { RecapBulletCell } from '@/components/recapitulatif/RecapBulletCell';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import {
  filterRecapSections,
  type RecapFasciculeFilter,
  type RecapSection,
} from '@/data/recapitulatif-data';

function parseRecapQuery(f?: string): RecapFasciculeFilter {
  if (!f) return 'all';
  const v = f.toLowerCase();
  if (v === 'f01') return 'f01p1';
  const ok: RecapFasciculeFilter[] = [
    'all',
    'f01p1',
    'f01p2',
    'f02',
    'f03',
    'f04',
    'f05',
    'f06',
    'f07',
  ];
  return ok.includes(v as RecapFasciculeFilter) ? (v as RecapFasciculeFilter) : 'all';
}

function CellPlain({ text }: { text: string }) {
  return (
    <div className='min-w-[200px] max-w-md text-sm text-gray-200'>
      <FlashcardRichText text={text} />
    </div>
  );
}

export function RecapitulatifPageClient({ initialFasc }: { initialFasc?: string }) {
  const [filter, setFilter] = useState<RecapFasciculeFilter>(() => parseRecapQuery(initialFasc));

  useEffect(() => {
    setFilter(parseRecapQuery(initialFasc));
  }, [initialFasc]);

  const sections = useMemo(() => filterRecapSections(filter), [filter]);

  return (
    <div className='container pb-20 pt-10'>
      <SectionTitle
        badge='SYNTHÈSE'
        badgeClassName='bg-emerald-500/20 text-emerald-200'
        title='Récapitulatif'
        subtitle="Vue d'ensemble des éléments constitutifs (légal, matériel, moral) — titres condensés"
        className='mb-8'
      />

      <GlassCard className='mb-8 space-y-4 p-6' padding=''>
        <p className='text-sm text-gray-400'>
          Filtre par thème du programme. Le détail complet se trouve dans les flashcards correspondantes.
        </p>
        <div className='flex flex-wrap gap-2'>
          {(
            [
              ['all', 'Tous'],
              ['f01p1', 'F01 — P1'],
              ['f01p2', 'F01 — P2'],
              ['f02', 'F02'],
              ['f03', 'F03'],
              ['f04', 'F04'],
              ['f05', 'F05'],
              ['f06', 'F06'],
              ['f07', 'F07'],
            ] as const
          ).map(([v, label]) => (
            <button
              key={v}
              type='button'
              onClick={() => setFilter(v)}
              className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
                filter === v
                  ? 'border-emerald-500/50 bg-emerald-500/15 text-emerald-100'
                  : 'border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/20'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </GlassCard>

      <div className='overflow-x-auto rounded-2xl border border-white/10 bg-navy-950/40 shadow-xl'>
        <table className='w-full min-w-[720px] border-collapse text-left'>
          <thead>
            <tr className='border-b border-white/10 bg-navy-900/90 text-xs uppercase tracking-wide text-gray-400'>
              <th className='sticky left-0 z-10 bg-navy-900/95 px-4 py-3'>Infraction</th>
              <th className='px-4 py-3'>Élément légal</th>
              <th className='px-4 py-3'>Élément matériel</th>
              <th className='px-4 py-3'>Élément moral</th>
            </tr>
          </thead>
          <tbody>
            {sections.map((section: RecapSection) => (
              <Fragment key={section.id}>
                <tr className={section.headerClass}>
                  <td colSpan={4} className='px-4 py-2.5 text-sm font-semibold'>
                    {section.fascicule}
                    {section.fasciculePart ? ` — ${section.fasciculePart}` : ''} — {section.groupTitle}
                  </td>
                </tr>
                {section.rows.map((row, ri) => (
                  <tr
                    key={`${section.id}-r-${ri}`}
                    className='border-b border-white/[0.06] align-top odd:bg-white/[0.02]'
                  >
                    <td className='sticky left-0 z-[1] bg-navy-950/95 px-4 py-3 shadow-[2px_0_8px_rgba(0,0,0,0.2)]'>
                      <CellPlain text={row.infraction} />
                    </td>
                    <td className='px-4 py-3'>
                      <CellPlain text={row.legal} />
                    </td>
                    <td className='px-4 py-3'>
                      <RecapBulletCell text={row.materiel} />
                    </td>
                    <td className='px-4 py-3'>
                      <RecapBulletCell text={row.moral} />
                    </td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
