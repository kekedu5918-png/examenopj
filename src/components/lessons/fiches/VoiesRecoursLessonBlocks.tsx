'use client';

import { Gavel } from 'lucide-react';

import { ConceptCard } from '@/components/lessons/ConceptCard';
import { DefinitionCard } from '@/components/lessons/DefinitionCard';
import { KeyNumber } from '@/components/lessons/KeyNumber';
import { RuleCard } from '@/components/lessons/RuleCard';
import { TimelineStep, type TimelineStepItem } from '@/components/lessons/TimelineStep';

const VOIES: TimelineStepItem[] = [
  {
    number: 1,
    title: 'Opposition',
    description:
      'Contre un jugement par défaut : même juridiction, délai de 10 jours à compter de la signification.',
    duration: '10 jours',
    article: 'Art. 489 CPP',
  },
  {
    number: 2,
    title: 'Appel',
    description:
      'Voie ordinaire devant la cour d’appel : effet suspensif sauf cas particuliers (ex. mandat de dépôt).',
    duration: '10 jours',
    article: 'Art. 498 CPP',
  },
  {
    number: 3,
    title: 'Pourvoi en cassation',
    description:
      'Contrôle de légalité uniquement, pas le fond des faits ; délai court selon les cas.',
    duration: '5 jours (franc)',
    article: 'Art. 567 CPP',
  },
];

export function VoiesRecoursLessonBlocks() {
  return (
    <section aria-label='Repères visuels — voies de recours' className='space-y-6'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-[10px] font-bold uppercase tracking-[0.22em] text-blue-400/90'>
          Repères visuels
        </span>
        <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400'>
          Voies de recours
        </span>
      </div>

      <div className='grid gap-6 lg:grid-cols-2 lg:items-stretch'>
        <KeyNumber
          number='10'
          label='jours (opposition & appel — ordre de grandeur)'
          sublabel='Vérifier signification / notification et calcul des délais francs'
          color='blue'
        />
        <ConceptCard
          icon={Gavel}
          title='Ordinaires vs extraordinaires'
          description='Opposition et appel : rejugement du fond ou de la forme selon les cas. Cassation : légalité seule.'
          article='Art. 489, 498, 567 CPP'
          color='blue'
        />
      </div>

      <TimelineStep steps={VOIES} />

      <DefinitionCard
        term='Révision'
        definition='Voie extraordinaire après condamnation définitive si un fait nouveau établit l’innocence : Commission de révision puis Cour de révision.'
        example='Pas de délai classique : critères d’admissibilité stricts.'
      />

      <RuleCard
        type='conditional'
        title='Appel — effet dévolutif'
        description='La cour peut rejuger et aggraver la peine : le risque doit être expliqué au justiciable.'
        article='Art. 498 CPP'
      />
    </section>
  );
}
