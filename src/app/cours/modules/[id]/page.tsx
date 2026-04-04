import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { SectionTitle } from '@/components/ui/SectionTitle';
import { COURSE_MODULE_IDS, getCourseModuleById } from '@/data/fascicules-list';

type Props = { params: { id: string } };

export function generateStaticParams() {
  return COURSE_MODULE_IDS.map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const m = getCourseModuleById(params.id);
  if (!m) return { title: 'Module introuvable' };
  return {
    title: `${m.titre} — Cours OPJ`,
    description: m.accroche,
  };
}

function QuizLink({ id, num }: { id: string; num: number }) {
  return (
    <Link
      href={`/entrainement/quiz?mode=fascicule&f=${id}`}
      className='text-sm font-medium text-cyan-400 underline-offset-2 hover:underline'
    >
      Quiz sur le thème F{String(num).padStart(2, '0')}
    </Link>
  );
}

export default function CoursModuleDetailPage({ params }: Props) {
  const m = getCourseModuleById(params.id);
  if (!m) notFound();

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
        <div className='mt-8 flex flex-wrap gap-6 border-t border-white/10 pt-6'>
          <QuizLink id={m.id} num={m.numero} />
          <Link
            href='/entrainement/flashcards'
            className='text-sm font-medium text-cyan-400 underline-offset-2 hover:underline'
          >
            Flashcards
          </Link>
        </div>
      </article>
    </div>
  );
}
