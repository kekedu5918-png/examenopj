'use client';

import { Hand } from 'lucide-react';

import { ConceptCard } from '@/components/lessons/ConceptCard';
import { RuleCard } from '@/components/lessons/RuleCard';
import { TimelineStep, type TimelineStepItem } from '@/components/lessons/TimelineStep';

const ACTES: TimelineStepItem[] = [
  {
    number: 1,
    title: 'Palpation de sûreté',
    description:
      'Externe, proportionnée : personne détenue ou risque réel pour les enquêteurs — pas une fouille intégrale.',
    article: 'Art. 803-1 CPP',
  },
  {
    number: 2,
    title: 'Menottage',
    description:
      'Mesure temporaire et motivée (fuite, violence…) : levée dès disparition du motif — ce n’est pas la GAV.',
    article: 'Pratique & compte rendu PR',
  },
  {
    number: 3,
    title: 'Visite à corps',
    description:
      'Acte intrusif : cadre légal strict (GAV, interpellation encadrée…) et garanties selon les textes.',
    article: 'Art. 78-4 CPP',
  },
];

export function InterpellationLessonBlocks() {
  return (
    <section aria-label='Repères visuels — interpellation' className='space-y-6'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-[10px] font-bold uppercase tracking-[0.22em] text-orange-400/90'>
          Repères visuels
        </span>
        <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400'>
          Interpellation · contrôles
        </span>
      </div>

      <ConceptCard
        icon={Hand}
        title='≠ audition'
        description='Interpellation et contrôles corporels sont des actes coercitifs distincts : ils conditionnent la suite (GAV, audition libre…).'
        article='Art. 78-4 & 803-1 CPP'
        color='amber'
      />

      <TimelineStep steps={ACTES} />

      <div className='grid gap-4 md:grid-cols-2'>
        <RuleCard
          type='conditional'
          title='Menottage'
          description='Motivation, proportionnalité, fin dès que le danger disparaît ; compte rendu au parquet si défèrement.'
        />
        <RuleCard
          type='forbidden'
          title='Ne pas confondre'
          description='Palpation de sûreté ≠ visite à corps à nu : niveaux d’intrusion et cadres légaux différents.'
        />
      </div>
    </section>
  );
}
