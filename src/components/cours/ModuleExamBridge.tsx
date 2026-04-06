import Link from 'next/link';

import type { CourseModuleSynthesis } from '@/data/course-module-syntheses';
import {
  EXAM_SHORT_LABEL,
  type ExamNumber,
  getCompetencyById,
  getDefaultExamenAttendus,
  getFasciculeExamProfile,
  getSujetsBlancsForFascicule,
} from '@/data/exam-competency-map';
import type { FasciculeMetadata } from '@/data/fascicules-list';
import { cn } from '@/utils/cn';

function ExamBadge({ n }: { n: ExamNumber }) {
  const cls =
    n === 1
      ? 'border-rose-500/35 bg-rose-500/15 text-rose-100'
      : n === 2
        ? 'border-amber-500/35 bg-amber-500/15 text-amber-100'
        : 'border-violet-500/35 bg-violet-500/15 text-violet-100';
  return (
    <span className={cn('rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide', cls)} title={EXAM_SHORT_LABEL[n]}>
      E{n}
    </span>
  );
}

function TrainingRowLink({
  href,
  title,
  description,
  epreuves,
  classTile,
}: {
  href: string;
  title: string;
  description: string;
  epreuves: ExamNumber[];
  classTile: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group flex flex-col gap-2 rounded-xl border p-4 transition hover:border-cyan-500/35 hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/60',
        classTile,
      )}
    >
      <div className='flex flex-wrap items-center gap-2'>
        <span className='font-semibold text-white group-hover:text-cyan-200'>{title}</span>
        <span className='flex flex-wrap gap-1'>
          {epreuves.map((n) => (
            <ExamBadge key={n} n={n} />
          ))}
        </span>
      </div>
      <span className='text-xs leading-relaxed text-gray-500'>{description}</span>
    </Link>
  );
}

type Props = {
  module: FasciculeMetadata;
  synth: CourseModuleSynthesis | undefined;
};

export function ModuleExamBridge({ module, synth }: Props) {
  const profile = getFasciculeExamProfile(module.id);
  const attendusRaw = synth?.examenAttendus?.length ? synth.examenAttendus : getDefaultExamenAttendus(module.id);
  const copieVsTerrain = synth?.copieVsTerrain;
  const blancs = getSujetsBlancsForFascicule(module.id);
  const numLabel = `F${String(module.numero).padStart(2, '0')}`;

  const trainingRows: {
    href: string;
    title: string;
    description: string;
    epreuves: ExamNumber[];
    classTile: string;
  }[] = [
    {
      href: `/quiz?mode=module&f=${module.id}`,
      title: `Quiz — ${numLabel}`,
      description: 'QCM ciblés sur le regroupement thématique du fascicule.',
      epreuves: [1],
      classTile: 'border-cyan-500/20 bg-cyan-500/[0.06]',
    },
    {
      href: `/flashcards?f=${module.id}`,
      title: 'Flashcards filtrées',
      description: 'Mémorisation des éléments constitutifs liés au thème.',
      epreuves: [1],
      classTile: 'border-amber-500/20 bg-amber-500/[0.06]',
    },
    {
      href: '/entrainement/recapitulatif',
      title: 'Tableau récapitulatif',
      description: 'Vue synthétique des infractions — utile pour Épreuve 1 et révisions ciblées.',
      epreuves: [1],
      classTile: 'border-sky-500/20 bg-sky-500/[0.06]',
    },
    {
      href: '/entrainement/articulation',
      title: 'Articulation procédurale',
      description: 'Enchaînements qualification / actes — cœur de l’Épreuve 2.',
      epreuves: [2],
      classTile: 'border-violet-500/20 bg-violet-500/[0.06]',
    },
    {
      href: '/cours/pv',
      title: 'Procès-verbaux ME1',
      description: 'Modèles et mentions pour la rédaction sous dossier.',
      epreuves: [2],
      classTile: 'border-emerald-500/20 bg-emerald-500/[0.06]',
    },
    {
      href: '/epreuves/epreuve-3',
      title: 'Méthode Épreuve 3',
      description: 'Préparation oral et structure du compte-rendu devant jury.',
      epreuves: [3],
      classTile: 'border-white/10 bg-white/[0.02]',
    },
  ];

  return (
    <div className='not-prose space-y-8 border-t border-white/10 pt-8'>
      <section aria-labelledby={`exam-bridge-${module.id}`}>
        <div className='flex flex-wrap items-center gap-2'>
          <h2 id={`exam-bridge-${module.id}`} className='text-sm font-semibold uppercase tracking-wide text-cyan-200/90'>
            Concours : poids du thème
          </h2>
          <span
            className={cn(
              'rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase',
              profile.priority === 'P0'
                ? 'border-gold-500/40 bg-gold-500/15 text-gold-100'
                : 'border-white/15 bg-white/[0.04] text-gray-300',
            )}
          >
            Priorité {profile.priority}
          </span>
        </div>
        <p className='mt-2 text-sm text-gray-400'>
          Pondération indicative :{' '}
          <span className='text-gray-300'>E1 {profile.epreuveWeight[1]}/3</span> ·{' '}
          <span className='text-gray-300'>E2 {profile.epreuveWeight[2]}/3</span> ·{' '}
          <span className='text-gray-300'>E3 {profile.epreuveWeight[3]}/3</span>
        </p>
        <p className='mt-1 text-sm text-gray-500'>
          Épreuves les plus concernées :{' '}
          {profile.primaryEpreuves.map((n) => EXAM_SHORT_LABEL[n]).join(' · ')}
        </p>
      </section>

      <section aria-labelledby={`attendus-${module.id}`}>
        <h3 id={`attendus-${module.id}`} className='text-sm font-semibold uppercase tracking-wide text-amber-200/90'>
          Attendus à l&apos;examen
        </h3>
        <ul className='mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-300'>
          {attendusRaw.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>

      {copieVsTerrain?.length ? (
        <section aria-labelledby={`terrain-copie-${module.id}`}>
          <h3 id={`terrain-copie-${module.id}`} className='text-sm font-semibold uppercase tracking-wide text-gray-500'>
            Terrain (OPJ) vs copie / oral
          </h3>
          <ul className='mt-3 space-y-3'>
            {copieVsTerrain.map((row) => (
              <li key={row.terrain} className='rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm'>
                <p className='font-medium text-cyan-200/90'>Sur le terrain</p>
                <p className='mt-1 text-gray-400'>{row.terrain}</p>
                <p className='mt-3 font-medium text-amber-200/85'>À restituer à l&apos;examen</p>
                <p className='mt-1 text-gray-400'>{row.copie}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section aria-labelledby={`comp-${module.id}`}>
        <h3 id={`comp-${module.id}`} className='text-sm font-semibold uppercase tracking-wide text-gray-500'>
          Compétences ciblées (grille ExamenOPJ)
        </h3>
        <ul className='mt-3 space-y-2'>
          {profile.competencyIds.map((id) => {
            const c = getCompetencyById(id);
            if (!c) return null;
            return (
              <li key={id} className='rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-sm'>
                <span className='font-medium text-white'>{c.label}</span>
                <span className='mt-1 block text-xs text-gray-500'>{c.description}</span>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby={`train-${module.id}`}>
        <h3 id={`train-${module.id}`} className='text-sm font-semibold uppercase tracking-wide text-gray-500'>
          Entraînements reliés aux épreuves
        </h3>
        <div className='mt-4 grid gap-3 sm:grid-cols-2'>
          {trainingRows.map((row) => (
            <TrainingRowLink key={row.href} {...row} />
          ))}
        </div>
        <p className='mt-4 text-center text-sm text-gray-500'>
          <Link href='/entrainement' className='text-cyan-400 underline-offset-2 hover:underline'>
            Hub entraînement par épreuve
          </Link>
          {' · '}
          <Link href='/sujets-blancs' className='text-cyan-400 underline-offset-2 hover:underline'>
            Sujets blancs complets
          </Link>
        </p>
      </section>

      {blancs.length > 0 ? (
        <section aria-labelledby={`blancs-${module.id}`}>
          <h3 id={`blancs-${module.id}`} className='text-sm font-semibold uppercase tracking-wide text-gray-500'>
            Sujets blancs qui mobilisent ce thème
          </h3>
          <p className='mt-2 text-xs text-gray-500'>
            Entraînement en session complète (3 épreuves) sur une affaire cohérente — idéal après avoir lu cette fiche.
          </p>
          <ul className='mt-3 space-y-2'>
            {blancs.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/sujets-blancs/${s.id}`}
                  className='flex flex-col rounded-lg border border-examen-accent/25 bg-examen-accent/5 px-4 py-3 text-sm transition hover:border-examen-accent/45 hover:bg-examen-accent/10'
                >
                  <span className='font-semibold text-white'>{s.titre}</span>
                  <span className='text-xs text-gray-500'>{s.theme}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link href='/sujets-blancs' className='text-sm text-cyan-400 underline-offset-2 hover:underline'>
                Tous les sujets blancs
              </Link>
            </li>
          </ul>
        </section>
      ) : null}
    </div>
  );
}
