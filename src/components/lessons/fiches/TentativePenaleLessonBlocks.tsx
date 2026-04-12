'use client';

import { CircleDot } from 'lucide-react';

import { ConceptCard } from '@/components/lessons/ConceptCard';
import { RuleCard } from '@/components/lessons/RuleCard';
import { TimelineStep, type TimelineStepItem } from '@/components/lessons/TimelineStep';

const PORTEE: TimelineStepItem[] = [
  {
    number: 1,
    title: 'Crime',
    description:
      'Tentative toujours punissable dès lors que la loi incrimine le crime (début d’exécution manifeste).',
    article: 'Art. 121-5 C. pén.',
  },
  {
    number: 2,
    title: 'Délit',
    description:
      'Tentative punissable seulement si le texte l’énonce expressément pour l’infraction visée.',
    article: 'Art. 121-5 C. pén.',
  },
  {
    number: 3,
    title: 'Contravention',
    description:
      'Pas de tentative punissable : à écrire noir sur blanc en copie.',
    article: 'Art. 121-5 C. pén.',
  },
];

export function TentativePenaleLessonBlocks() {
  return (
    <section aria-label='Repères visuels — tentative' className='space-y-6'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-[10px] font-bold uppercase tracking-[0.22em] text-green-400/90'>
          Repères visuels
        </span>
        <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400'>
          Tentative
        </span>
      </div>

      <ConceptCard
        icon={CircleDot}
        title='Début d’exécution'
        description='Acte extérieur non neutre : la seule intention ou une préparation pure ne suffit pas (sauf infraction autonome).'
        article='Art. 121-5 C. pén.'
        color='green'
      />

      <TimelineStep steps={PORTEE} />

      <RuleCard
        type='conditional'
        title='Tentative impossible'
        description='Peut rester punissable si les moyens auraient pu aboutir sans obstacle inconnu (théorie retenue par le texte).'
        article='Art. 121-5 al. 2 C. pén.'
      />
    </section>
  );
}
