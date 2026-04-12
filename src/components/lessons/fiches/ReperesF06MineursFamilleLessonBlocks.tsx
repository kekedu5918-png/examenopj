'use client';

import { Baby } from 'lucide-react';

import { ConceptCard } from '@/components/lessons/ConceptCard';
import { RuleCard } from '@/components/lessons/RuleCard';
import { TimelineStep, type TimelineStepItem } from '@/components/lessons/TimelineStep';

const METHOD: TimelineStepItem[] = [
  {
    number: 1,
    title: 'Victime mineure ≠ mineur auteur',
    description:
      'Ne pas confondre infractions commises sur mineur et procédure pénale pour mineur (CJPM, L303 / L307).',
  },
  {
    number: 2,
    title: 'L.A.M. & aggravations',
    description:
      'Âge, autorité, vulnérabilité : contrôler systématiquement les circonstances spécifiques au fascicule F06.',
    article: 'C. pén.',
  },
  {
    number: 3,
    title: 'Signalement & suites',
    description:
      'PV factuel ; suites confiées au parquet / JDE / services sociaux sans « conclusion pédagogique » hors compétence.',
  },
];

export function ReperesF06MineursFamilleLessonBlocks() {
  return (
    <section aria-label='Repères visuels — F06 mineurs' className='space-y-6'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-[10px] font-bold uppercase tracking-[0.22em] text-rose-400/90'>
          Repères visuels
        </span>
        <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400'>
          Fascicule F06
        </span>
      </div>

      <ConceptCard
        icon={Baby}
        title='Méthode programme officiel'
        description='Recouper avec le Code pénal, le CJPM et les leçons L303 / L307 pour la chaîne GAV / auditions / magistrat.'
        article='Programme SDCP / IREP'
        color='red'
      />

      <TimelineStep steps={METHOD} />

      <RuleCard
        type='allowed'
        title='Priorité examen'
        description='Thème très opéré : traiter d’abord le repère victime/auteur puis les qualifications aggravées.'
      />
    </section>
  );
}
