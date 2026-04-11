import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { CourseModuleJsonLd } from '@/components/cours/CourseModuleJsonLd';
import { ModuleEnquetesLinks } from '@/components/cours/ModuleEnquetesLinks';
import { ModuleExamBridge } from '@/components/cours/ModuleExamBridge';
import { ModuleProgressHeader } from '@/components/cours/ModuleProgressHeader';
import { ModuleQuizProgressBar } from '@/components/cours/ModuleQuizProgressBar';
import { ModuleVisitRecorder } from '@/components/cours/ModuleVisitRecorder';
import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
import { ModelesPVModuleSection } from '@/components/modeles-pv/ModelesPVModuleSection';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { getCourseModuleSynthesis } from '@/data/course-module-syntheses';
import { getEnquetesLinkedToModule } from '@/data/enquetes-by-module';
import { COURSE_MODULE_IDS, getCourseModuleById } from '@/data/fascicules-list';
import { getFondamentauxLinksForCourseModule } from '@/data/fondamentaux-by-module';
import { openGraphForPage } from '@/utils/seo-metadata';

type Props = { params: { id: string } };

export function generateStaticParams() {
  return COURSE_MODULE_IDS.map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const m = getCourseModuleById(params.id);
  if (!m) return { title: 'Module introuvable' };
  const path = `/cours/modules/${m.id}`;
  const title = `${m.titre} — Cours OPJ`;
  const description = `Fiche OPJ — ${m.titre} : axes de travail, pièges fréquents, liens quiz et flashcards. Préparation examen OPJ juin 2026.`;
  return {
    title,
    description,
    alternates: { canonical: path },
    ...openGraphForPage(path, title, description),
  };
}

export default function CoursModuleDetailPage({ params }: Props) {
  const m = getCourseModuleById(params.id);
  if (!m) notFound();
  const normalizedModuleId = params.id.toLowerCase();
  const extractedModuleNumber = Number.parseInt(normalizedModuleId.replace(/[^0-9]/g, ''), 10);
  const currentModuleNumber = Number.isFinite(extractedModuleNumber) && extractedModuleNumber > 0 ? extractedModuleNumber : m.numero;
  const progressPercent = Math.min(100, Math.max(0, (currentModuleNumber / 15) * 100));

  const synth = getCourseModuleSynthesis(m.id);

  const idx = COURSE_MODULE_IDS.indexOf(m.id);
  const prevId = idx > 0 ? COURSE_MODULE_IDS[idx - 1]! : null;
  const nextId = idx >= 0 && idx < COURSE_MODULE_IDS.length - 1 ? COURSE_MODULE_IDS[idx + 1]! : null;
  const prevMeta = prevId ? getCourseModuleById(prevId) : null;
  const nextMeta = nextId ? getCourseModuleById(nextId) : null;
  const fondamentauxLinks = getFondamentauxLinksForCourseModule(m.id);
  const enquetesLiees = getEnquetesLinkedToModule(m.id);

  return (
    <InteriorPageShell maxWidth='6xl' glow={SHELL_GLOW.moduleDetail} pad='default'>
      <CourseModuleJsonLd module={m} />
      <ModuleVisitRecorder moduleId={m.id} />
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
      <ModuleProgressHeader currentModuleNumber={currentModuleNumber} percentage={progressPercent} />

      <SectionTitle
        badge={`F${String(m.numero).padStart(2, '0')}`}
        badgeClassName='bg-cyan-500/20 text-cyan-200'
        title={m.titre}
        subtitle={m.domaineLabel}
        size='display'
        titleGradient
        titleAs='h1'
        className='mb-8'
      />

      <ModuleQuizProgressBar moduleId={m.id} />

      <div className='mb-8 rounded-xl border border-cyan-500/20 bg-gradient-to-br from-navy-900/50 to-transparent p-6 md:p-8'>
        <ModuleExamBridge module={m} synth={synth} />
      </div>

      <article className='prose prose-invert max-w-none rounded-xl border border-white/10 bg-white/[0.02] p-6 md:p-8'>
        <p className='text-sm font-semibold uppercase tracking-wide text-amber-200/90'>Synthèse pédagogique</p>
        <p className='mt-3 text-sm leading-relaxed text-gray-500'>{m.accroche}</p>
        {synth ? (
          <>
            <p className='mt-5 leading-relaxed text-gray-200'>{synth.resume}</p>
            {synth.axes.length > 0 ? (
              <div className='mt-8'>
                <p className='text-sm font-semibold uppercase tracking-wide text-gray-500'>Axes de travail</p>
                <ul className='mt-4 list-none space-y-6 pl-0'>
                  {synth.axes.map((axe) => (
                    <li key={axe.titre} className='rounded-lg border border-white/10 bg-white/[0.03] p-4'>
                      <p className='font-medium text-cyan-200/95'>{axe.titre}</p>
                      <ul className='mt-2 mb-0 list-disc space-y-1 pl-5 text-sm leading-relaxed text-gray-400'>
                        {axe.points.map((pt) => (
                          <li key={pt}>{pt}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {synth.pratiqueOpj.length > 0 ? (
              <div className='mt-8'>
                <p className='text-sm font-semibold uppercase tracking-wide text-gray-500'>Côté terrain (OPJ)</p>
                <ul className='mt-3 list-disc space-y-2 pl-5 text-gray-400'>
                  {synth.pratiqueOpj.map((p) => (
                    <li key={p} className='text-sm leading-relaxed'>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {synth.pieges.length > 0 ? (
              <div className='mt-8 rounded-lg border border-amber-500/25 bg-amber-500/[0.06] p-4'>
                <p className='text-sm font-semibold uppercase tracking-wide text-amber-200/90'>Pièges fréquents</p>
                <ul className='mt-3 mb-0 list-disc space-y-2 pl-5 text-sm leading-relaxed text-amber-100/85'>
                  {synth.pieges.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </>
        ) : (
          <p className='mt-5 leading-relaxed text-gray-300'>{m.accroche}</p>
        )}
        <p className='mt-8 text-sm leading-relaxed text-gray-500'>
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

        {fondamentauxLinks.length > 0 ? (
          <div className='not-prose mt-8 border-t border-white/10 pt-6'>
            <p className='mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500'>Fiches fondamentales liées</p>
            <p className='mb-3 text-sm text-gray-500'>
              Notions condensées alignées sur ce thème ; le lien ouvre la page Fondamentaux et fait défiler jusqu’à la fiche.
            </p>
            <ul className='m-0 list-none space-y-2 p-0'>
              {fondamentauxLinks.map((li) => (
                <li key={li.id}>
                  <Link
                    href={li.href}
                    className='text-sm text-cyan-400 underline-offset-2 hover:text-cyan-300 hover:underline'
                  >
                    {li.titre}
                  </Link>
                </li>
              ))}
            </ul>
            <p className='mt-3 text-sm'>
              <Link href='/fondamentaux' className='text-gray-500 underline-offset-2 hover:text-gray-400 hover:underline'>
                Toutes les fiches fondamentales
              </Link>
            </p>
          </div>
        ) : null}

        <ModuleEnquetesLinks enquetes={enquetesLiees} />

        <ModelesPVModuleSection fasciculeNumero={m.numero} />

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
    </InteriorPageShell>
  );
}
