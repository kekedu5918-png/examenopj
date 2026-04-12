'use client';

import { RefreshCw } from 'lucide-react';

import { ConceptCard } from '@/components/lessons/ConceptCard';
import { DefinitionCard } from '@/components/lessons/DefinitionCard';
import { RuleCard } from '@/components/lessons/RuleCard';
import { TimelineStep, type TimelineStepItem } from '@/components/lessons/TimelineStep';

const EXEC: TimelineStepItem[] = [
  {
    number: 1,
    title: 'Prononcé',
    description:
      'La juridiction fixe la peine et les mesures ; commence la phase d’exécution matérielle et juridique.',
  },
  {
    number: 2,
    title: 'JAP',
    description:
      'Juge d’application des peines : aménagements, semi-liberté, bracelet, suivi — cadre souvent in camera.',
    article: 'Art. 712-6 CPP',
  },
  {
    number: 3,
    title: 'SPIP',
    description:
      'Service pénitentiaire d’insertion et de probation : évaluation du risque et du suivi ; lien avec contrôles en milieu ouvert.',
    article: 'Art. 712-11 CPP',
  },
];

export function JuridictionApplicationPeinesLessonBlocks() {
  return (
    <section aria-label='Repères visuels — application des peines' className='space-y-6'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-[10px] font-bold uppercase tracking-[0.22em] text-violet-400/90'>
          Repères visuels
        </span>
        <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400'>
          JAP · SPIP
        </span>
      </div>

      <ConceptCard
        icon={RefreshCw}
        title='Après le verdict'
        description='La peine se concrétise dans le temps : ajustements, contrôles et réinsertion sous autorité du JAP et du SPIP.'
        article='Art. 712-1 à 712-8 CPP'
        color='blue'
      />

      <TimelineStep steps={EXEC} />

      <DefinitionCard
        term='JAP'
        definition='Magistrat du siège qui module l’exécution sans débat public contradictoire complet : proportionnalité et suivi individuel.'
        example='L’OPJ peut être saisi pour des contrôles en milieu ouvert ou le respect d’obligations.'
      />

      <RuleCard
        type='allowed'
        title='Lien terrain'
        description='Le SPIP renseigne le juge sur le risque ; coordination avec les services de police pour les mesures de contrôle.'
        article='Art. 712-11 CPP'
      />
    </section>
  );
}
