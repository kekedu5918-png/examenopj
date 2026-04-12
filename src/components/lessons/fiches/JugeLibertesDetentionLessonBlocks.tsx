'use client';

import { Scale } from 'lucide-react';

import { ConceptCard } from '@/components/lessons/ConceptCard';
import { RuleCard } from '@/components/lessons/RuleCard';
import { ScenarioCard } from '@/components/lessons/ScenarioCard';
import { TimelineStep, type TimelineStepItem } from '@/components/lessons/TimelineStep';

const ROLE: TimelineStepItem[] = [
  {
    number: 1,
    title: 'Garant des libertés',
    description:
      'Perquisitions sensibles, prolongations de GAV, secrets protégés, mesures coercitives au domicile : le JLD autorise ou refuse.',
    article: 'Art. 137-1 CPP',
  },
  {
    number: 2,
    title: 'Contradiction',
    description:
      'Parquet, défense et personne concernée : audition sauf urgence absolue dûment motivée.',
  },
  {
    number: 3,
    title: 'Décision écrite',
    description:
      'Motivation, proportionnalité et respect du dossier : une demande mal calendrée peut faire perdre la mesure ou la preuve.',
  },
];

export function JugeLibertesDetentionLessonBlocks() {
  return (
    <section aria-label='Repères visuels — JLD' className='space-y-6'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-[10px] font-bold uppercase tracking-[0.22em] text-amber-400/90'>
          Repères visuels
        </span>
        <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400'>
          JLD
        </span>
      </div>

      <ConceptCard
        icon={Scale}
        title='Juge des libertés et de la détention'
        description='Contrôle des atteintes sérieuses à la liberté, au domicile et aux secrets : le mauvais timing = nullité ou perte probatoire.'
        article='Art. 137-1 & s. CPP'
        color='amber'
      />

      <TimelineStep steps={ROLE} />

      <RuleCard
        type='conditional'
        title='Piège classique'
        description='Saisir le JLD avant constitution du dossier ou sans pièces suffisantes : retard, irrecevabilité ou mesure impossible à valider.'
      />

      <ScenarioCard
        situation='Vous sollicitez une perquisition au domicile en EP sans décision du JLD alors que le texte l’exige pour votre hypothèse.'
        question='Quel risque au stade du débat ?'
        answer='Risque de nullité (textuelle ou substantielle selon les cas) et d’exclusion des éléments obtenus irrégulièrement — à recouper sur Légifrance et la motivation.'
        difficulty={3}
      />
    </section>
  );
}
