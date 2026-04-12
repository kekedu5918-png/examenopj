'use client';

import { GitBranch } from 'lucide-react';

import { ConceptCard } from '@/components/lessons/ConceptCard';
import { KeyNumber } from '@/components/lessons/KeyNumber';
import { RuleCard } from '@/components/lessons/RuleCard';
import { TimelineStep, type TimelineStepItem } from '@/components/lessons/TimelineStep';

const CADRES: TimelineStepItem[] = [
  {
    number: 1,
    title: 'Flagrance',
    description:
      'Crime ou délit en cours ou venant de se commettre, ou indices sérieux. Chaîne opérationnelle sous contrôle du PR.',
    duration: '8 j sans discontinuité (+8 j si conditions)',
    article: 'Art. 53 à 73 CPP',
  },
  {
    number: 2,
    title: 'Enquête préliminaire',
    description:
      'Cadre de droit commun : pas d’urgence de flagrance ; perquisitions au domicile encadrées (assentiment ou JLD selon art. 76).',
    article: 'Art. 75 à 78 CPP',
  },
  {
    number: 3,
    title: 'Commission rogatoire',
    description:
      'Délégation du juge d’instruction : l’OPJ agit dans le cadre fixé ; pas d’interrogatoire du mis en examen ni mandats.',
    article: 'Art. 81 CPP',
  },
];

export function CadresEnqueteLessonBlocks() {
  return (
    <section aria-label='Repères visuels — cadres d’enquête' className='space-y-6'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-400/90'>
          Repères visuels
        </span>
        <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400'>
          Cadres d’enquête
        </span>
      </div>

      <div className='grid gap-6 lg:grid-cols-2 lg:items-stretch'>
        <KeyNumber
          number='8'
          label='jours (flagrance, sans discontinuité)'
          sublabel='Prolongation exceptionnelle +8 j si crime ou délit ≥ 5 ans et investigations non différables'
          color='blue'
        />
        <ConceptCard
          icon={GitBranch}
          title='Trois logiques distinctes'
          description='Flagrance, EP et commission rogatoire ne se cumulent pas : à chaque étape, vérifier le cadre applicable.'
          article='Art. 53, 75, 81 CPP'
          color='blue'
        />
      </div>

      <TimelineStep steps={CADRES} />

      <RuleCard
        type='conditional'
        title='Commission rogatoire : limites'
        description='L’OPJ ne peut pas interroger le mis en examen ni délivrer de mandats : délégation stricte du juge d’instruction.'
        article='Art. 81 & 151 à 155 CPP'
      />
    </section>
  );
}
