import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { SectionTitle } from '@/components/ui/SectionTitle';
import { getCourseModuleSynthesis } from '@/data/course-module-syntheses';
import { COURSE_MODULE_IDS, getCourseModuleById } from '@/data/fascicules-list';
import { cn } from '@/utils/cn';

type Props = { params: { id: string } };

export function generateStaticParams() {
  return COURSE_MODULE_IDS.map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const m = getCourseModuleById(params.id);
  if (!m) return { title: 'Module introuvable' };
  const synth = getCourseModuleSynthesis(m.id);
  return {
    title: `${m.titre} — Cours OPJ`,
    description: synth?.resume ?? m.accroche,
  };
}

function TrainingCard({
  href,
  title,
  description,
  classTile,
}: {
  href: string;
  title: string;
  description: string;
  classTile: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group flex flex-col rounded-xl border p-4 transition hover:border-cyan-500/35 hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/60',
        classTile,
      )}
    >
      <span className='font-semibold text-white group-hover:text-cyan-200'>{title}</span>
      <span className='mt-1 text-xs leading-relaxed text-gray-500'>{description}</span>
    </Link>
  );
}

export default function CoursModuleDetailPage({ params }: Props) {
  const m = getCourseModuleById(params.id);
  if (!m) notFound();

  const synth = getCourseModuleSynthesis(m.id);

  const idx = COURSE_MODULE_IDS.indexOf(m.id);
  const prevId = idx > 0 ? COURSE_MODULE_IDS[idx - 1]! : null;
  const nextId = idx >= 0 && idx < COURSE_MODULE_IDS.length - 1 ? COURSE_MODULE_IDS[idx + 1]! : null;
  const prevMeta = prevId ? getCourseModuleById(prevId) : null;
  const nextMeta = nextId ? getCourseModuleById(nextId) : null;

  return (
    <div className='container pb-20 pt-10 md:pt-14'>
      <nav className='mb-6 text-sm text-gray-500'>
        <Link href='/cours' className='text-cyan-400 hover:underline'>
          Cours
        </Link>
        <span className='mx-2'>/</span>
        <Link href='/cours/modules' className='text-cyan-400 hover:underline'>
          Modules
        </Link>
        <span className='mx-2'>/</span>
        <span className='text-gray-400'>F{String(m.numero).padStart(2, '0')}</span>
      </nav>

      <SectionTitle
        badge={`F${String(m.numero).padStart(2, '0')}`}
        badgeClassName='bg-cyan-500/20 text-cyan-200'
        title={m.titre}
        subtitle={m.domaineLabel}
        className='mb-8'
      />

      <article className='prose prose-invert max-w-none rounded-xl border border-white/10 bg-white/[0.02] p-6 md:p-8'>
        <p className='text-sm font-semibold uppercase tracking-wide text-amber-200/90'>Synthèse pédagogique</p>
        <p className='mt-3 leading-relaxed text-gray-300'>{m.accroche}</p>
        <p className='mt-4 text-sm leading-relaxed text-gray-500'>
          Ce module ne reproduit aucun support édité par un tiers. Complétez cette fiche avec vos notes, le Code pénal,
          le Code de procédure pénale et les textes en vigueur sur{' '}
          <a
            href='https://www.legifrance.gouv.fr'
            target='_blank'
            rel='noopener noreferrer'
            className='text-cyan-400 hover:underline'
          >
            Légifrance
          </a>
          .
        </p>
        <ul className='mt-6 list-disc space-y-2 pl-5 text-gray-400'>
          <li>Dégager les notions indispensables à retenir pour l’examen.</li>
          <li>Relier chaque infraction ou acte aux grands principes (éléments constitutifs, compétence, cadre procédural).</li>
          <li>Entraînez-vous ensuite avec le quiz et les flashcards sur le même thème.</li>
        </ul>

        <div className='mt-8 border-t border-white/10 pt-6'>
          <p className='mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500'>Entraînement sur ce thème</p>
          <div className='grid gap-3 sm:grid-cols-2'>
            <TrainingCard
              href={`/entrainement/quiz?mode=module&f=${m.id}`}
              title={`Quiz — F${String(m.numero).padStart(2, '0')}`}
              description='Questions ciblées sur le même regroupement thématique.'
              classTile='border-cyan-500/20 bg-cyan-500/[0.06]'
            />
            <TrainingCard
              href={`/entrainement/flashcards?f=${m.id}`}
              title='Flashcards filtrées'
              description='Paquet limité aux cartes rattachées à ce module, si disponibles.'
              classTile='border-amber-500/20 bg-amber-500/[0.06]'
            />
            <TrainingCard
              href='/entrainement/articulation'
              title='Articulation (épreuve 2)'
              description='Enchaînements qualification / procédure / rédaction.'
              classTile='border-violet-500/20 bg-violet-500/[0.06]'
            />
            <TrainingCard
              href='/guide-revision-opj'
              title='Guide de révision'
              description='Méthode, rythme et priorités pour les dernières semaines.'
              classTile='border-white/10 bg-white/[0.02]'
            />
          </div>
          <p className='mt-4 text-center text-sm text-gray-500'>
            <Link href='/entrainement' className='text-cyan-400 underline-offset-2 hover:underline'>
              Hub entraînement
            </Link>
            {' · '}
            <Link href='/entrainement/flashcards' className='text-cyan-400 underline-offset-2 hover:underline'>
              Toutes les flashcards
            </Link>
          </p>
        </div>

        <nav
          aria-label='Navigation entre modules'
          className='mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-stretch sm:justify-between'
        >
          {prevMeta ? (
            <Link
              href={`/cours/modules/${prevMeta.id}`}
              className='group flex flex-1 flex-col rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 transition hover:border-white/20 sm:max-w-[48%] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/60'
            >
              <span className='text-xs text-gray-500'>← Précédent</span>
              <span className='mt-1 text-sm font-medium text-gray-200 group-hover:text-white'>
                F{String(prevMeta.numero).padStart(2, '0')} — {prevMeta.titre}
              </span>
            </Link>
          ) : (
            <span className='hidden flex-1 sm:block' />
          )}
          {nextMeta ? (
            <Link
              href={`/cours/modules/${nextMeta.id}`}
              className='group flex flex-1 flex-col rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-right transition hover:border-white/20 sm:max-w-[48%] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/60'
            >
              <span className='text-xs text-gray-500'>Suivant →</span>
              <span className='mt-1 text-sm font-medium text-gray-200 group-hover:text-white'>
                F{String(nextMeta.numero).padStart(2, '0')} — {nextMeta.titre}
              </span>
            </Link>
          ) : (
            <span className='hidden flex-1 sm:block' />
          )}
        </nav>
      </article>
    </div>
  );
}
