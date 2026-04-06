import Link from 'next/link';

import { getCourseModuleById } from '@/data/fascicules-list';
import type { SujetBlanc } from '@/data/sujets-blancs-types';

type Props = {
  sujet: SujetBlanc;
};

export function PrepareSujetBlancPrerequis({ sujet }: Props) {
  const ids = sujet.themesFascicules ?? [];
  if (ids.length === 0) return null;

  return (
    <section
      className='mb-10 rounded-2xl border border-examen-accent/25 bg-examen-accent/[0.06] p-5 md:p-6'
      aria-labelledby={`prep-blanc-${sujet.id}`}
    >
      <h2 id={`prep-blanc-${sujet.id}`} className='font-display text-lg font-bold text-white'>
        Préparer ce sujet blanc
      </h2>
      <p className='mt-2 text-sm text-examen-inkMuted'>
        Parcours recommandé avant de chronométrer les trois épreuves : relire les fiches modules concernées, verrouiller avec
        quiz / flashcards, puis enchaîner articulation ou PV selon votre niveau.
      </p>
      <div className='mt-4'>
        <p className='text-xs font-semibold uppercase tracking-wider text-examen-accent'>Modules F — synthèses</p>
        <ul className='mt-2 flex flex-wrap gap-2'>
          {ids.map((fid) => {
            const m = getCourseModuleById(fid);
            const label = m ? `F${String(m.numero).padStart(2, '0')} — ${m.titre}` : fid;
            return (
              <li key={fid}>
                <Link
                  href={`/cours/modules/${fid}`}
                  className='inline-flex rounded-lg border border-white/12 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white transition hover:border-examen-accent/40 hover:bg-white/[0.08]'
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className='mt-5 grid gap-2 sm:grid-cols-2'>
        <Link
          href={`/quiz?mode=module&f=${ids[0] ?? 'f01'}`}
          className='rounded-xl border border-cyan-500/25 bg-cyan-500/10 px-4 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-500/20'
        >
          Quiz sur le 1er thème →
        </Link>
        <Link
          href={`/flashcards?f=${ids[0] ?? 'f01'}`}
          className='rounded-xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-sm font-semibold text-amber-100 transition hover:bg-amber-500/20'
        >
          Flashcards filtrées →
        </Link>
        <Link
          href='/entrainement/articulation'
          className='rounded-xl border border-violet-500/25 bg-violet-500/10 px-4 py-3 text-sm font-semibold text-violet-100 transition hover:bg-violet-500/20'
        >
          Articulation (Épreuve 2) →
        </Link>
        <Link
          href='/epreuves'
          className='rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08]'
        >
          Rappel des trois épreuves →
        </Link>
      </div>
    </section>
  );
}
