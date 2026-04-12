'use client';

import { Hammer } from 'lucide-react';

import { ConceptCard } from '@/components/lessons/ConceptCard';
import { RuleCard } from '@/components/lessons/RuleCard';
import { TimelineStep, type TimelineStepItem } from '@/components/lessons/TimelineStep';

const NIVEAUX: TimelineStepItem[] = [
  {
    number: 1,
    title: 'Peines principales',
    description:
      'Emprisonnement, amende, peines alternatives : le juge choisit dans la fourchette légale.',
    article: 'Art. 131-1 C. pén.',
  },
  {
    number: 2,
    title: 'Peines complémentaires',
    description:
      'Interdictions, fermetures, atteintes aux droits : liste limitative et proportionnalité.',
    article: 'Art. 131-10 C. pén.',
  },
  {
    number: 3,
    title: 'Sursis & exécution',
    description:
      'Mesures probatoires, suivi SPIP : lier au quantum et au profil sans confondre peine et mesure.',
    article: 'Art. 132-33 C. pén.',
  },
];

export function SanctionPenaleLessonBlocks() {
  return (
    <section aria-label='Repères visuels — sanction pénale' className='space-y-6'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-[10px] font-bold uppercase tracking-[0.22em] text-yellow-400/90'>
          Repères visuels
        </span>
        <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400'>
          Peines · quantum
        </span>
      </div>

      <ConceptCard
        icon={Hammer}
        title='Finalités'
        description='Répressif, préventif, réinsertif : le juge motive la peine au regard des circonstances et de la personnalité.'
        article='Art. 131-1 & 132-24 C. pén.'
        color='amber'
      />

      <TimelineStep steps={NIVEAUX} />

      <RuleCard
        type='conditional'
        title='Personnalisation'
        description='Circonstances atténuantes ou aggravantes, préjugés 132-24 : articuler parquet / juge / exécution.'
        article='Art. 132-1 C. pén.'
      />
    </section>
  );
}
