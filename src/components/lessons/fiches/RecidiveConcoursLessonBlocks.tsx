'use client';

import { GitMerge } from 'lucide-react';

import { ConceptCard } from '@/components/lessons/ConceptCard';
import { KeyNumber } from '@/components/lessons/KeyNumber';
import { RuleCard } from '@/components/lessons/RuleCard';
import { TimelineStep, type TimelineStepItem } from '@/components/lessons/TimelineStep';

const LOGIQUE: TimelineStepItem[] = [
  {
    number: 1,
    title: 'Concours réel',
    description:
      'Plusieurs infractions avant condamnation définitive : règle de non-cumul des peines (peine la plus forte, sauf exceptions).',
    article: 'Art. 132-2 C. pén.',
  },
  {
    number: 2,
    title: 'Récidive légale',
    description:
      'Nouvelle infraction après condamnation définitive, dans les délais et pour une infraction de même nature : aggravation (ex. double du max pour délit).',
    article: 'Art. 132-8 C. pén.',
  },
  {
    number: 3,
    title: 'Réitération',
    description:
      'Nouvelle infraction sans récidive légale : pas d’aggravation automatique, mais circonstance appréciable.',
    article: 'Art. 132-16-7 C. pén.',
  },
];

export function RecidiveConcoursLessonBlocks() {
  return (
    <section aria-label='Repères visuels — concours et récidive' className='space-y-6'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-[10px] font-bold uppercase tracking-[0.22em] text-amber-400/90'>
          Repères visuels
        </span>
        <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400'>
          Concours · récidive
        </span>
      </div>

      <div className='grid gap-6 lg:grid-cols-2 lg:items-stretch'>
        <KeyNumber
          number='5'
          label='ans (récidive délit — ordre de grandeur)'
          sublabel='Vérifier le texte en vigueur pour le crime et les spécialités'
          color='amber'
        />
        <ConceptCard
          icon={GitMerge}
          title='La ligne de part'
          description='Avant / après condamnation définitive : concours d’infractions vs récidive — erreur classique à l’examen.'
          article='Art. 132-2 & 132-8 C. pén.'
          color='amber'
        />
      </div>

      <TimelineStep steps={LOGIQUE} />

      <RuleCard
        type='forbidden'
        title='Ne pas confondre'
        description='Concours : faits commis avant jugement définitif. Récidive : après jugement définitif pour une nouvelle infraction.'
      />
    </section>
  );
}
