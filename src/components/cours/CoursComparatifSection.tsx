'use client';

import { useMemo, useState } from 'react';

import { coursComparatifData, getComparatifRow, prioriteFasciculeTxt } from '@/data/cours-comparatif';
import { GlassCard } from '@/components/ui/GlassCard';
import { cn } from '@/utils/cn';

type Props = {
  activeFascicule: number;
};

export function CoursComparatifSection({ activeFascicule }: Props) {
  const [open, setOpen] = useState(false);
  const activeRow = useMemo(() => getComparatifRow(activeFascicule), [activeFascicule]);

  return (
    <section className='mt-10' aria-labelledby='comparatif-heading'>
      <button
        type='button'
        id='comparatif-heading'
        onClick={() => setOpen((v) => !v)}
        className='flex w-full items-center justify-between gap-3 rounded-xl border border-amber-500/25 bg-amber-500/[0.08] px-4 py-3 text-left transition hover:bg-amber-500/[0.12]'
      >
        <div>
          <span className='font-mono text-[10px] font-bold uppercase tracking-wider text-amber-200/90'>
            Référence & comparatif
          </span>
          <p className='mt-0.5 text-sm font-semibold text-white'>
            Fascicule TXT (prioritaire) vs leçons OPJ Elite
          </p>
        </div>
        <span className='shrink-0 text-amber-200/80' aria-hidden>
          {open ? '▼' : '▶'}
        </span>
      </button>

      {open ? (
        <div className='mt-4 space-y-4'>
          <GlassCard className='border-emerald-500/20 bg-emerald-950/20 p-5'>
            <p className='text-xs font-bold uppercase tracking-wider text-emerald-300'>Source qui fait foi</p>
            <p className='mt-2 text-sm leading-relaxed text-gray-200'>{prioriteFasciculeTxt}</p>
            <p className='mt-3 text-xs leading-relaxed text-gray-500'>{coursComparatifData.methodology.disclaimer}</p>
            <p className='mt-2 font-mono text-[11px] text-gray-500'>
              Tableau généré le {new Date(coursComparatifData.generatedAt).toLocaleString('fr-FR')} ·{' '}
              {coursComparatifData.totals.fasciculeTxtWords.toLocaleString('fr-FR')} mots (fascicules TXT) ·{' '}
              {coursComparatifData.totals.eliteLessonCount} leçons sur {coursComparatifData.totals.eliteChapterCount}{' '}
              chapitres Elite (export intégré au dépôt)
            </p>
          </GlassCard>

          <div className='overflow-x-auto rounded-xl border border-white/10'>
            <table className='w-full min-w-[640px] border-collapse text-left text-sm'>
              <thead>
                <tr className='border-b border-white/10 bg-white/[0.04]'>
                  <th className='px-3 py-2.5 font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500'>
                    F
                  </th>
                  <th className='px-3 py-2.5 font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500'>
                    Mots (TXT)
                  </th>
                  <th className='px-3 py-2.5 font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500'>
                    Ch. Elite
                  </th>
                  <th className='px-3 py-2.5 font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500'>
                    Leçons Elite (liées)
                  </th>
                </tr>
              </thead>
              <tbody>
                {coursComparatifData.fascicules.map((row) => (
                  <tr
                    key={row.numero}
                    className={cn(
                      'border-b border-white/[0.06]',
                      row.numero === activeFascicule ? 'bg-cyan-500/10' : 'hover:bg-white/[0.02]',
                    )}
                  >
                    <td className='px-3 py-2 font-mono text-xs text-gray-300'>F{String(row.numero).padStart(2, '0')}</td>
                    <td className='px-3 py-2 font-mono text-xs text-gray-400'>{row.words.toLocaleString('fr-FR')}</td>
                    <td className='px-3 py-2 text-xs text-gray-400'>
                      {row.eliteChapters.length
                        ? row.eliteChapters.map((c) => `ch.${c.num}`).join(', ')
                        : '—'}
                    </td>
                    <td className='px-3 py-2 text-xs text-gray-400'>
                      {row.eliteLessonTotal > 0 ? row.eliteLessonTotal : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {activeRow && activeRow.eliteChapters.length > 0 ? (
            <GlassCard className='border-white/[0.08] p-5'>
              <p className='text-xs font-bold uppercase tracking-wider text-gray-500'>
                Détail pour le fascicule sélectionné (F{String(activeFascicule).padStart(2, '0')})
              </p>
              <p className='mt-2 text-sm text-gray-400'>
                Le texte affiché à l’écran provient du fichier{' '}
                <code className='rounded bg-white/10 px-1.5 py-0.5 text-xs text-cyan-200'>{activeRow.fichier}</code> (
                {activeRow.words.toLocaleString('fr-FR')} mots). Les entrées ci-dessous sont les leçons de l’application
                Elite jugées <span className='text-gray-200'>thématiquement proches</span> : elles peuvent regrouper
                plusieurs fascicules en une seule fiche ou omettre des infractions présentes dans le TXT.
              </p>
              <ul className='mt-4 space-y-4'>
                {activeRow.eliteChapters.map((ch) => (
                  <li key={ch.id} className='rounded-lg border border-white/10 bg-white/[0.02] p-3'>
                    <p className='font-medium text-gray-200'>
                      Chapitre {ch.num} — {ch.title}
                    </p>
                    <p className='mt-1 font-mono text-[11px] text-gray-500'>
                      {ch.lessonCount} leçon{ch.lessonCount > 1 ? 's' : ''} Elite
                    </p>
                    <ul className='mt-2 list-inside list-disc space-y-1 text-xs text-gray-400'>
                      {ch.lessons.map((l) => (
                        <li key={l.id}>
                          <span className='font-mono text-gray-500'>{l.id}</span> {l.name}{' '}
                          <span className='text-gray-600'>({l.ref})</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </GlassCard>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
