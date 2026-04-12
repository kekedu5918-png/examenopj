'use client';

import { Users } from 'lucide-react';

import { ConceptCard } from '@/components/lessons/ConceptCard';
import { DefinitionCard } from '@/components/lessons/DefinitionCard';
import { RuleCard } from '@/components/lessons/RuleCard';
import { TimelineStep, type TimelineStepItem } from '@/components/lessons/TimelineStep';

const ROLES: TimelineStepItem[] = [
  {
    number: 1,
    title: 'Auteur',
    description:
      'Réalise personnellement tous les éléments constitutifs : peine de l’infraction principale.',
    article: 'Art. 121-4 C. pén.',
  },
  {
    number: 2,
    title: 'Coauteur',
    description:
      'Chacun réalise l’infraction : plusieurs auteurs, pas de complicité entre eux pour les mêmes éléments.',
    article: 'Art. 121-4 C. pén.',
  },
  {
    number: 3,
    title: 'Complice',
    description:
      'Aide, provocation ou instructions sans accomplir l’élément matériel : connaissance de cause et intention d’association.',
    article: 'Art. 121-7 C. pén.',
  },
];

export function CompliciteCoactionLessonBlocks() {
  return (
    <section aria-label='Repères visuels — complicité et coaction' className='space-y-6'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-400/90'>
          Repères visuels
        </span>
        <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400'>
          Auteur · coauteur · complice
        </span>
      </div>

      <ConceptCard
        icon={Users}
        title='Qualifier chaque rôle'
        description='Une même opération peut mêler auteurs et complices : la peine du complice renvoie en principe à celle de l’auteur (art. 121-6).'
        article='Art. 121-4 à 121-7 C. pén.'
        color='blue'
      />

      <TimelineStep steps={ROLES} />

      <DefinitionCard
        term='Conditions de la complicité'
        definition='Fait principal punissable, acte de participation, connaissance de cause, intention de s’associer au fait.'
        example='Sans connaissance de l’infraction visée, pas de complicité.'
      />

      <RuleCard
        type='allowed'
        title='Peine du complice'
        description='Puni comme l’auteur, avec possibilité d’individualisation par le juge.'
        article='Art. 121-6 C. pén.'
      />
    </section>
  );
}
