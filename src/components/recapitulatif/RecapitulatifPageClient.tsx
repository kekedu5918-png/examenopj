'use client';

import { Fragment, useEffect, useMemo, useState } from 'react';

import { FlashcardRichText } from '@/components/flashcards/flashcard-rich-text';
import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { RecapBulletCell } from '@/components/recapitulatif/RecapBulletCell';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
import {
  filterRecapRowsByPriorite,
  filterRecapSections,
  filterRecapSectionsPrioritaires,
  PRIORITE_EXAMEN_BADGE,
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

function CellPlain({ text, compact }: { text: string; compact?: boolean }) {
  return (
    <div className={cn('min-w-[180px] max-w-md text-gray-200', compact ? 'text-xs leading-snug' : 'text-sm')}>
      <FlashcardRichText text={text} />
    </div>
  );
}

function RecapRowMobileCard({
  row,
  compact,
}: {
  row: {
    infraction: string;
    legal: string;
    materiel: string;
    moral: string;
    priorite?: RecapPriorite;
    noteExamen?: string;
  };
  compact: boolean;
}) {
  const pTier = (row.priorite ?? 'secours') as RecapPriorite;
  return (
    <article className='overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#111118] via-[#0c0c12] to-[#08080c] shadow-[0_14px_40px_-22px_rgba(0,0,0,0.75)] ring-1 ring-white/[0.04]'>
      <div className='border-b border-white/[0.06] bg-gradient-to-r from-emerald-950/40 to-transparent px-4 py-3'>
        <div className='flex flex-wrap items-center gap-2'>
          <span
            className={cn(
              'rounded-lg border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide',
              PRIORITE_EXAMEN_BADGE[pTier].className,
            )}
          >
            {PRIORITE_EXAMEN_BADGE[pTier].label}
          </span>
        </div>
        <div className='mt-2 text-sm font-semibold leading-snug text-white'>
          <FlashcardRichText text={row.infraction} />
        </div>
        {row.noteExamen ? (
          <p className='mt-2 text-[11px] leading-snug text-amber-200/85'>{row.noteExamen}</p>
        ) : null}
      </div>
      <div className='space-y-3 p-4'>
        <div className='rounded-xl border border-cyan-500/20 bg-cyan-950/25 px-3 py-2 text-xs text-cyan-100'>
          <p className='text-[9px] font-bold uppercase tracking-wide text-cyan-300/90'>Élément légal</p>
          <div className='mt-1'>
            <CellPlain text={row.legal} compact={compact} />
          </div>
        </div>
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
          <div className='rounded-xl border border-emerald-500/20 bg-emerald-950/20 px-3 py-2'>
            <p className='text-[9px] font-bold uppercase tracking-wide text-emerald-300/90'>Élément matériel</p>
            <div className='mt-1'>
              <RecapBulletCell text={row.materiel} compact={compact} density='compact' />
            </div>
          </div>
          <div className='rounded-xl border border-sky-500/20 bg-sky-950/20 px-3 py-2'>
            <p className='text-[9px] font-bold uppercase tracking-wide text-sky-300/90'>Élément moral</p>
            <div className='mt-1'>
              <RecapBulletCell text={row.moral} compact={compact} density='compact' />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function RecapitulatifPageClient({
  initialFasc,
  initialPrioriteVue,
}: {
  initialFasc?: string;
  /** Ouvre directement la vue « Priorité examen OPJ » (ex. lien parcours candidat). */
  initialPrioriteVue?: boolean;
}) {
  const [filter, setFilter] = useState<RecapFasciculeFilter>(() => parseRecapQuery(initialFasc));
  const [vueConcours, setVueConcours] = useState(() => Boolean(initialPrioriteVue));
  const [prioriteTier, setPrioriteTier] = useState<RecapPriorite | 'all'>('all');

  useEffect(() => {
    setFilter(parseRecapQuery(initialFasc));
  }, [initialFasc]);

  useEffect(() => {
    setVueConcours(Boolean(initialPrioriteVue));
  }, [initialPrioriteVue]);

  const sections = useMemo(() => {
    const base = vueConcours ? filterRecapSectionsPrioritaires(filter) : filterRecapSections(filter);
    return filterRecapRowsByPriorite(base, prioriteTier);
  }, [filter, vueConcours, prioriteTier]);

  const compact = vueConcours;

  return (
    <InteriorPageShell
      id='recap-print-root'
      maxWidth='7xl'
      glow={SHELL_GLOW.recapitulatif}
      pad='default'
      className='print:bg-white print:text-black print:[&_.text-gray-200]:!text-black print:[&_.text-gray-300]:!text-neutral-800 print:[&_.text-gray-400]:!text-neutral-700'
    >
      <SectionTitle
        badge='SYNTHÈSE'
        badgeClassName='print:border print:border-neutral-300'
        title='Récapitulatif'
        titleGradient
        size='display'
        subtitle="Vue d'ensemble des éléments constitutifs (légal, matériel, moral) — titres condensés"
        className='mb-8 print:text-black'
      />

      <GlassCard radius='3xl' topGlow className='mb-8 space-y-4 p-6 print:hidden' padding=''>
        <p className='text-sm text-gray-400'>
          Filtre par fascicule. La colonne « Élément légal » est calée sur les rubriques{' '}
          <strong className='text-gray-200'>« I – Élément légal »</strong> des fascicules SDCP (réf. juin 2026, version au{' '}
          <strong className='text-gray-200'>01/12/2025</strong>).
        </p>
        <p className='text-sm text-gray-400'>
          La vue « Priorité examen » classe <strong className='text-gray-200'>toutes les lignes</strong> du fascicule choisi : d’abord
          ce qu’il faut maîtriser absolument, puis le très probable, enfin le « à sécuriser » (grille pédagogique, pas statistique d’annales).
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
        <div className='flex flex-col gap-2 border-t border-white/10 pt-4'>
          <p className='text-xs font-medium text-gray-500'>Raccourci priorité (filtre les lignes du tableau)</p>
          <div className='flex flex-wrap gap-2'>
            {(
              [
                ['all', 'Toutes', ''] as const,
                ['core', 'Prioritaire', PRIORITE_EXAMEN_BADGE.core.className] as const,
                ['freq', 'Très probable', PRIORITE_EXAMEN_BADGE.freq.className] as const,
                ['secours', 'À sécuriser', PRIORITE_EXAMEN_BADGE.secours.className] as const,
              ] as const
            ).map(([v, label, badgeCn]) => (
              <button
                key={v}
                type='button'
                onClick={() => setPrioriteTier(v)}
                className={cn(
                  'rounded-xl border px-3 py-2 text-sm font-medium transition',
                  prioriteTier === v
                    ? v === 'all'
                      ? 'border-gray-400/40 bg-white/10 text-gray-100'
                      : cn('text-white', badgeCn, 'border-transparent')
                    : 'border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/20',
                )}
              >
                {label}
              </button>
            ))}
          </div>
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
            Priorité examen (prioritaire → très probable → à sécuriser)
          </button>
        </div>
      </GlassCard>

      <div className='mb-4 hidden print:block'>
        <p className='text-xs text-neutral-600'>
          Examen OPJ — récapitulatif {filter === 'all' ? 'complet' : String(filter).toUpperCase()}
          {vueConcours ? ' — tri priorité examen' : ''}
          {prioriteTier !== 'all' ? ` — ${PRIORITE_EXAMEN_BADGE[prioriteTier].label}` : ''}
        </p>
      </div>

      <div className='space-y-6 print:hidden lg:hidden'>
        {sections.map((section) => (
          <div key={section.id} className='space-y-3'>
            <div
              className={cn(
                'rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-white',
                section.headerClass,
              )}
            >
              {section.fascicule}
              {section.fasciculePart ? ` — ${section.fasciculePart}` : ''} — {section.groupTitle}
            </div>
            <div className='space-y-3'>
              {section.rows.map((row, ri) => (
                <RecapRowMobileCard key={`${section.id}-m-${ri}`} row={row} compact={compact} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className='hidden overflow-x-auto rounded-2xl border border-white/10 bg-navy-950/40 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.65)] ring-1 ring-white/[0.04] print:block print:border-neutral-300 print:shadow-none lg:block'>
        <table className='recap-table w-full min-w-[900px] border-collapse text-left print:min-w-0'>
          <thead>
            <tr className='border-b border-white/10 bg-gradient-to-b from-[#1a1d2a] to-[#12141c] text-xs uppercase tracking-[0.08em] text-gray-400 print:bg-neutral-100 print:text-neutral-700'>
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
                {section.rows.map((row, ri) => {
                  const pTier = (row.priorite ?? 'secours') as RecapPriorite;
                  return (
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
                        <span
                          className={cn(
                            'inline-flex rounded-lg border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide',
                            PRIORITE_EXAMEN_BADGE[pTier].className,
                          )}
                        >
                          {PRIORITE_EXAMEN_BADGE[pTier].label}
                        </span>
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
                  );
                })}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </InteriorPageShell>
  );
}
