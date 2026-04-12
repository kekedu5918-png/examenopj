'use client';

import { Puzzle } from 'lucide-react';

import { ConceptCard } from '@/components/lessons/ConceptCard';
import { KeyNumber } from '@/components/lessons/KeyNumber';
import { RuleCard } from '@/components/lessons/RuleCard';
import { TimelineStep, type TimelineStepItem } from '@/components/lessons/TimelineStep';

const ELEMENTS: TimelineStepItem[] = [
  {
    number: 1,
    title: 'Légal',
    description:
      'Texte qui définit et réprime le comportement : principe de légalité (nullum crimen…).',
    article: 'Art. 111-3 C. pén.',
  },
  {
    number: 2,
    title: 'Matériel',
    description:
      'Commission ou omission, résultat éventuel ; la tentative est l’élément matériel inachevé.',
    article: 'Art. 121-5 C. pén.',
  },
  {
    number: 3,
    title: 'Moral',
    description:
      'Intention, imprudence ou mise en danger selon les infractions ; faute contraventionnelle pour les contraventions.',
    article: 'Art. 121-3 C. pén.',
  },
];

export function ElementsConstitutifsLessonBlocks() {
  return (
    <section aria-label='Repères visuels — éléments constitutifs' className='space-y-6'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-400/90'>
          Repères visuels
        </span>
        <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400'>
          Éléments constitutifs
        </span>
      </div>

      <div className='grid gap-6 lg:grid-cols-2 lg:items-stretch'>
        <KeyNumber
          number='3'
          label='éléments cumulatifs'
          sublabel='Sans l’un d’eux : pas d’infraction constituée'
          color='green'
        />
        <ConceptCard
          icon={Puzzle}
          title='PRQC (méthode épreuve)'
          description='Faits prévus par l’article X et réprimés par Y → qualification = classification à démontrer.'
          article='Méthode fascicules / épreuve 1'
          color='green'
        />
      </div>

      <TimelineStep steps={ELEMENTS} />

      <RuleCard
        type='allowed'
        title='Cumul'
        description='Les trois éléments doivent coexister : l’absence de l’un fait échec à la poursuite pour cette qualification.'
        article='Art. 111-3 & 121-3 C. pén.'
      />
    </section>
  );
}
