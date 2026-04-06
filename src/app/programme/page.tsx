import type { Metadata } from 'next';
import Link from 'next/link';

import { SectionTitle } from '@/components/ui/SectionTitle';
import { APP_NAME } from '@/constants/site';
import { courseModuleSyntheses } from '@/data/course-module-syntheses';
import { fasciculesList } from '@/data/fascicules-list';
import { openGraphForPage } from '@/utils/seo-metadata';

const progTitle = 'Programme de révision OPJ';
const progDescription = `${APP_NAME} : sommaire des 15 thèmes du programme (DPS, DPG, procédure), entraînement associé — contenu pédagogique original, aligné sur le programme officiel.`;

export const metadata: Metadata = {
  title: progTitle,
  description: progDescription,
  alternates: { canonical: '/programme' },
  ...openGraphForPage('/programme', progTitle, progDescription),
};

export default function ProgrammePage() {
  const ordered = [...fasciculesList].sort((a, b) => a.numero - b.numero);

  return (
    <div className='container pb-24 pt-10 md:pt-14'>
      <SectionTitle
        badge='PROGRAMME'
        badgeClassName='bg-cyan-500/20 text-cyan-200'
        title='Sommaire du programme'
        subtitle='Chaque thème : structure pédagogique et liens vers vos outils d’entraînement — pas de reproduction de supports officiels.'
        className='mb-10'
      />

      <p className='mb-8 max-w-3xl text-sm leading-relaxed text-gray-400'>
        Contenu conforme au programme officiel de l&apos;examen OPJ et aux fascicules officiels du programme OPJ, mis à
        jour. Les synthèses publiées ici sont rédigées par {APP_NAME} ; recoupez toujours avec le Code pénal, le Code de
        procédure pénale et Légifrance.
      </p>

      <div className='space-y-10'>
        {ordered.map((m) => {
          const synth = courseModuleSyntheses[m.id];
          const badge = `F${String(m.numero).padStart(2, '0')}`;

          return (
            <article
              key={m.id}
              className='rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-7'
              id={m.id}
            >
              <div className='flex flex-col gap-2 md:flex-row md:items-start md:justify-between'>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-wide text-cyan-300/90'>{badge}</p>
                  <h2 className='mt-1 font-display text-xl font-semibold text-white md:text-2xl'>{m.titre}</h2>
                  <p className='mt-1 text-sm text-gray-500'>{m.domaineLabel}</p>
                </div>
                <div className='mt-3 flex flex-wrap gap-2 md:mt-0'>
                  <Link
                    href={`/cours/modules/${m.id}`}
                    className='rounded-lg border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-gray-200 hover:border-cyan-500/40 hover:text-white'
                  >
                    Fiche synthèse
                  </Link>
                  <Link
                    href={`/quiz?mode=module&f=${m.id}`}
                    className='rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-200 hover:bg-cyan-500/15'
                  >
                    Quiz
                  </Link>
                  <Link
                    href={`/flashcards?f=${m.id}`}
                    className='rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-200 hover:bg-amber-500/15'
                  >
                    Flashcards
                  </Link>
                  <Link
                    href='/entrainement/recapitulatif'
                    className='rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-white'
                  >
                    Récapitulatif
                  </Link>
                </div>
              </div>

              {synth ? (
                <div className='mt-6 border-t border-white/10 pt-6'>
                  <p className='text-xs font-bold uppercase tracking-widest text-gray-500'>Sommaire (axes)</p>
                  <ul className='mt-4 space-y-5'>
                    {synth.axes.map((ax) => (
                      <li key={ax.titre}>
                        <p className='font-medium text-gray-200'>{ax.titre}</p>
                        <ul className='mt-2 list-disc space-y-1 pl-5 text-sm text-gray-500'>
                          {ax.points.map((pt, i) => (
                            <li key={i}>{pt}</li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className='mt-6 text-sm text-gray-500'>
                  Synthèse en cours d&apos;enrichissement — consultez la{' '}
                  <Link href={`/cours/modules/${m.id}`} className='text-cyan-400 underline-offset-2 hover:underline'>
                    fiche module
                  </Link>
                  .
                </p>
              )}
            </article>
          );
        })}
      </div>

      <p className='mt-12 text-center text-sm text-gray-500'>
        <Link href='/cours' className='text-cyan-400 hover:underline'>
          Hub Cours
        </Link>
        {' · '}
        <Link href='/fondamentaux' className='text-cyan-400 hover:underline'>
          Fondamentaux
        </Link>
      </p>
    </div>
  );
}
