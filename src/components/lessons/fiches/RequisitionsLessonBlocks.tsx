'use client';

import { FileSearch } from 'lucide-react';

import { ConceptCard } from '@/components/lessons/ConceptCard';
import { KeyNumber } from '@/components/lessons/KeyNumber';
import { RuleCard } from '@/components/lessons/RuleCard';
import { TimelineStep, type TimelineStepItem } from '@/components/lessons/TimelineStep';

const TYPES: TimelineStepItem[] = [
  {
    number: 1,
    title: 'Art. 60 — Personne qualifiée',
    description: 'Expert technique ou scientifique : examens utiles à la manifestation de la vérité (serment).',
    article: 'Art. 60 CPP',
  },
  {
    number: 2,
    title: 'Art. 60-1 — Informations',
    description: 'Documents et données utiles à l’enquête auprès de toute personne ou organisme.',
    article: 'Art. 60-1 CPP',
  },
  {
    number: 3,
    title: 'Art. 60-2 — Gel',
    description: 'Conservation de données informatiques menacées d’effacement (hébergeurs, FAI, opérateurs).',
    article: 'Art. 60-2 CPP',
  },
  {
    number: 4,
    title: 'Art. 60-3 — Copie',
    description: 'Copie des données dans un système — distinct de la saisie physique du matériel.',
    article: 'Art. 60-3 CPP',
  },
];

export function RequisitionsLessonBlocks() {
  return (
    <section aria-label='Repères visuels — réquisitions' className='space-y-6'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-400/90'>
          Repères visuels
        </span>
        <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400'>
          Réquisitions
        </span>
      </div>

      <div className='grid gap-6 lg:grid-cols-2 lg:items-stretch'>
        <KeyNumber
          number='3750 €'
          label='sanction du refus (ordre de grandeur)'
          sublabel='À consolider sur le texte en vigueur au jour de l’examen'
          color='green'
        />
        <ConceptCard
          icon={FileSearch}
          title='Outil de coopération'
          description='L’OPJ requiert informations, données ou expertises : traçabilité et voies de recours encadrées.'
          article='Art. 60 à 60-3 CPP'
          color='green'
        />
      </div>

      <TimelineStep steps={TYPES} />

      <RuleCard
        type='conditional'
        title='Parallèle en enquête préliminaire'
        description='Mêmes logiques sous les articles 77-1 à 77-1-3 : ne pas mélanger les numéros d’article selon le cadre.'
        article='Art. 77-1 à 77-1-3 CPP'
      />
    </section>
  );
}
