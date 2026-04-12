'use client';

import { Scale } from 'lucide-react';

import { ConceptCard } from '@/components/lessons/ConceptCard';
import { DefinitionCard } from '@/components/lessons/DefinitionCard';
import { KeyNumber } from '@/components/lessons/KeyNumber';
import { RuleCard } from '@/components/lessons/RuleCard';
import { TimelineStep, type TimelineStepItem } from '@/components/lessons/TimelineStep';

const PALIERS: TimelineStepItem[] = [
  {
    number: 1,
    title: 'Contrôle judiciaire',
    description:
      'Liberté sous obligations légales (présentations, interdictions, soins…) : mesure la moins restrictive.',
    article: 'Art. 138 CPP',
  },
  {
    number: 2,
    title: 'ARSE',
    description:
      'Assignation à résidence avec surveillance électronique : contrainte intermédiaire, hypothèses strictes.',
    article: 'Art. 142-3 à 142-8 CPP',
  },
  {
    number: 3,
    title: 'Détention provisoire',
    description:
      'Subsidiarité : seulement si les mesures atténuées ne suffisent pas au regard des finalités légales.',
    article: 'Art. 143-1 & s. CPP',
  },
];

export function ControleJudiciaireDetentionLessonBlocks() {
  return (
    <section aria-label='Repères visuels — CJ, ARSE, détention' className='space-y-6'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-[10px] font-bold uppercase tracking-[0.22em] text-amber-400/90'>
          Repères visuels
        </span>
        <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400'>
          CJ · ARSE · DP
        </span>
      </div>

      <div className='grid gap-6 lg:grid-cols-2 lg:items-stretch'>
        <KeyNumber
          number='3'
          label='paliers de contrainte (schéma)'
          sublabel='Toujours raisonner proportionnalité avant la détention'
          color='amber'
        />
        <ConceptCard
          icon={Scale}
          title='Le JLD tranche'
          description='Décision motivée après audition (personne ou avocat), en principe en audience publique.'
          article='Art. 139-1 CPP'
          color='amber'
        />
      </div>

      <TimelineStep steps={PALIERS} />

      <DefinitionCard
        term='Détention provisoire'
        definition='Mesure d’exception : la liberté est la règle. La DP exige des motifs légitimes (atteinte aux victimes ou témoins, trouble à l’ordre public, conservation des preuves, risque de fuite…) et la proportionnalité.'
        example='Si le CJ ou l’ARSE suffisent à sécuriser la procédure, la DP n’est pas légale.'
        relatedTerms={['Contrôle judiciaire', 'ARSE']}
      />

      <RuleCard
        type='allowed'
        title='Présomption d’innocence'
        description='Hiérarchiser les mesures : du moins contraignant au plus contraignant, sous contrôle du JLD.'
      />
    </section>
  );
}
