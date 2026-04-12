'use client';

import { Layers } from 'lucide-react';

import { ConceptCard } from '@/components/lessons/ConceptCard';
import { KeyNumber } from '@/components/lessons/KeyNumber';
import { RuleCard } from '@/components/lessons/RuleCard';
import { TimelineStep, type TimelineStepItem } from '@/components/lessons/TimelineStep';

const NIVEAUX: TimelineStepItem[] = [
  {
    number: 1,
    title: 'Crime',
    description:
      'Gravité maximale : cour d’assises ou CCD selon les cas ; prescription longue (20 ans en droit commun, spécialités nombreuses).',
    article: 'Art. 111-1 C. pén.',
  },
  {
    number: 2,
    title: 'Délit',
    description:
      'Tribunal correctionnel ; prescription usuelle 6 ans ; tentative punissable si le texte l’énonce.',
    article: 'Art. 111-1 C. pén.',
  },
  {
    number: 3,
    title: 'Contravention',
    description:
      'Tribunal de police ; prescription 1 an ; pas de tentative punissable.',
    article: 'Art. 111-1 C. pén.',
  },
];

export function ClassificationInfractionsLessonBlocks() {
  return (
    <section aria-label='Repères visuels — classification des infractions' className='space-y-6'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-[10px] font-bold uppercase tracking-[0.22em] text-amber-400/90'>
          Repères visuels
        </span>
        <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400'>
          Crime · délit · contravention
        </span>
      </div>

      <div className='grid gap-6 lg:grid-cols-2 lg:items-stretch'>
        <KeyNumber
          number='3'
          label='catégories du Code pénal'
          sublabel='Juridiction, procédure, prescription et peines en découlent'
          color='amber'
        />
        <ConceptCard
          icon={Layers}
          title='Tripartition'
          description='La qualification juridique pilote toute la chaîne : de l’enquête au juge de jugement.'
          article='Art. 111-1 C. pén.'
          color='amber'
        />
      </div>

      <TimelineStep steps={NIVEAUX} />

      <RuleCard
        type='conditional'
        title='Tentative'
        description='Punissable pour les crimes (principe) et les délits si le texte le prévoit — jamais pour les contraventions.'
        article='Art. 121-5 C. pén.'
      />
    </section>
  );
}
