'use client';

import { Fragment, useEffect, useMemo, useState } from 'react';

import { FlashcardRichText } from '@/components/flashcards/flashcard-rich-text';
import { RecapBulletCell } from '@/components/recapitulatif/RecapBulletCell';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import {
  filterRecapSections,
  filterRecapSectionsPrioritaires,
  type RecapFasciculeFilter,
  type RecapPriorite,
  type RecapSection,
} from '@/data/recapitulatif-data';
import { cn } from '@/utils/cn';

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

const PRIORITE_BADGE: Record<RecapPriorite, { label: string; className: string }> = {
  core: { label: 'Cœur', className: 'border-rose-400/40 bg-rose-500/15 text-rose-100' },
  freq: { label: 'Fréquent', className: 'border-amber-400/35 bg-amber-500/12 text-amber-100' },
  secours: { label: 'Secours', className: 'border-slate-400/30 bg-slate-500/15 text-slate-200' },
};

function CellPlain({ text, compact }: { text: string; compact?: boolean }) {
  return (
    <div className={cn('min-w-[180px] max-w-md text-gray-200', compact ? 'text-xs leading-snug' : 'text-sm')}>
      <FlashcardRichText text={text} />
    </div>
  );
}

export function RecapitulatifPageClient({
  initialFasc,
  initialPrioriteVue,
}: {
  initialFasc?: string;
  /** Ouvre directement la vue « Priorité concours » (ex. lien parcours candidat). */
  initialPrioriteVue?: boolean;
}) {
  const [filter, setFilter] = useState<RecapFasciculeFilter>(() => parseRecapQuery(initialFasc));
  const [vueConcours, setVueConcours] = useState(() => Boolean(initialPrioriteVue));

  useEffect(() => {
    setFilter(parseRecapQuery(initialFasc));
  }, [initialFasc]);

  useEffect(() => {
    setVueConcours(Boolean(initialPrioriteVue));
  }, [initialPrioriteVue]);

  const sections = useMemo(() => {
    if (vueConcours) return filterRecapSectionsPrioritaires(filter);
    return filterRecapSections(filter);
  }, [filter, vueConcours]);

  const compact = vueConcours;

  return (
    <div
      id='recap-print-root'
      className='container pb-20 pt-10 print:bg-white print:text-black print:[&_.text-gray-200]:!text-black print:[&_.text-gray-300]:!text-neutral-800 print:[&_.text-gray-400]:!text-neutral-700'
    >
      <SectionTitle
        badge='SYNTHÈSE'
        badgeClassName='bg-emerald-500/20 text-emerald-200 print:border print:border-neutral-300'
        title='Récapitulatif'
        subtitle="Vue d'ensemble des éléments constitutifs (légal, matériel, moral) — titres condensés"
        className='mb-8 print:text-black'
      />

      <GlassCard className='mb-8 space-y-4 p-6 print:hidden' padding=''>
        <p className='text-sm text-gray-400'>
          Filtre par fascicule. La vue « Priorité concours » n’affiche qu’une <strong className='text-gray-200'>grille pédagogique</strong> (pas une
          proba issue d’annales) : entraînement ciblé épreuve 1.
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
        <div className='flex flex-wrap gap-2 border-t border-white/10 pt-4'>
          <button
            type='button'
            onClick={() => setVueConcours(false)}
            className={cn(
              'rounded-xl border px-4 py-2 text-sm font-medium transition',
              !vueConcours
                ? 'border-violet-500/50 bg-violet-500/15 text-violet-100'
                : 'border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/20',
            )}
          >
            Toutes les lignes
          </button>
          <button
            type='button'
            onClick={() => setVueConcours(true)}
            className={cn(
              'rounded-xl border px-4 py-2 text-sm font-medium transition',
              vueConcours
                ? 'border-violet-500/50 bg-violet-500/15 text-violet-100'
                : 'border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/20',
            )}
          >
            Priorité concours (cœur → fréquent → secours)
          </button>
        </div>
      </GlassCard>

      <div className='mb-4 hidden print:block'>
        <p className='text-xs text-neutral-600'>
          Examen OPJ — récapitulatif {filter === 'all' ? 'complet' : String(filter).toUpperCase()}
          {vueConcours ? ' — sélection prioritaire' : ''}
        </p>
      </div>

      <div className='overflow-x-auto rounded-2xl border border-white/10 bg-navy-950/40 shadow-xl print:border-neutral-300 print:shadow-none'>
        <table className='recap-table w-full min-w-[900px] border-collapse text-left print:min-w-0'>
          <thead>
            <tr className='border-b border-white/10 bg-navy-900/90 text-xs uppercase tracking-wide text-gray-400 print:bg-neutral-100 print:text-neutral-700'>
              <th className={cn('sticky left-0 z-10 bg-navy-900/95 px-3 py-3 print:static print:bg-neutral-100')}>
                Infraction
              </th>
              <th className='min-w-[100px] px-2 py-3'>Priorité</th>
              <th className='px-3 py-3'>Élément légal</th>
              <th className='px-3 py-3'>Élément matériel</th>
              <th className='px-3 py-3'>Élément moral</th>
            </tr>
          </thead>
          <tbody>
            {sections.map((section: RecapSection) => (
              <Fragment key={section.id}>
                <tr className={cn(section.headerClass, 'print:!bg-neutral-200 print:!text-black')}>
                  <td colSpan={5} className='px-3 py-2 text-sm font-semibold print:text-black'>
                    {section.fascicule}
                    {section.fasciculePart ? ` — ${section.fasciculePart}` : ''} — {section.groupTitle}
                  </td>
                </tr>
                {section.rows.map((row, ri) => (
                  <tr
                    key={`${section.id}-r-${ri}`}
                    className={cn(
                      'border-b border-white/[0.06] align-top print:border-neutral-200',
                      ri % 2 === 0 ? 'bg-white/[0.02] print:bg-white' : 'bg-transparent print:bg-neutral-50',
                    )}
                  >
                    <td
                      className={cn(
                        'sticky left-0 z-[1] px-3 py-2 shadow-[2px_0_8px_rgba(0,0,0,0.2)] print:static print:shadow-none',
                        'bg-navy-950/95 print:bg-inherit',
                      )}
                    >
                      <CellPlain text={row.infraction} compact={compact} />
                      {row.noteExamen ? (
                        <p className='mt-1 text-[11px] leading-snug text-gray-500 print:text-neutral-600'>{row.noteExamen}</p>
                      ) : null}
                    </td>
                    <td className='px-2 py-2 align-top'>
                      {row.priorite ? (
                        <span
                          className={cn(
                            'inline-flex rounded-lg border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide',
                            PRIORITE_BADGE[row.priorite].className,
                          )}
                        >
                          {PRIORITE_BADGE[row.priorite].label}
                        </span>
                      ) : (
                        <span className='text-xs text-gray-600 print:text-neutral-500'>—</span>
                      )}
                    </td>
                    <td className='px-3 py-2'>
                      <CellPlain text={row.legal} compact={compact} />
                    </td>
                    <td className='px-3 py-2'>
                      <RecapBulletCell text={row.materiel} compact={compact} />
                    </td>
                    <td className='px-3 py-2'>
                      <RecapBulletCell text={row.moral} compact={compact} />
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
