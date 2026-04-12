'use client';

import { Landmark } from 'lucide-react';

import { ConceptCard } from '@/components/lessons/ConceptCard';
import { DefinitionCard } from '@/components/lessons/DefinitionCard';
import { RuleCard } from '@/components/lessons/RuleCard';
import { TimelineStep, type TimelineStepItem } from '@/components/lessons/TimelineStep';

const AXES: TimelineStepItem[] = [
  {
    number: 1,
    title: 'Action publique',
    description:
      'Le parquet exerce la poursuite au nom de la société : indivisibilité et continuité du service.',
    article: 'Art. 31 CPP',
  },
  {
    number: 2,
    title: 'Opportunité des poursuites',
    description:
      'Le PR n’est pas tenu de poursuivre systématiquement : classement, poursuites ou alternatives encadrées.',
    article: 'Art. 40-1 CPP',
  },
  {
    number: 3,
    title: 'Contrôle de l’enquête',
    description:
      'Avis sur GAV, levée possible, pilotage de la flagrance et de l’EP : le PR structure la suite procédurale.',
    article: 'Art. 12 & 41 CPP',
  },
];

export function MinisterePublicLessonBlocks() {
  return (
    <section aria-label='Repères visuels — ministère public' className='space-y-6'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-[10px] font-bold uppercase tracking-[0.22em] text-violet-400/90'>
          Repères visuels
        </span>
        <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400'>
          Ministère public
        </span>
      </div>

      <div className='grid gap-6 lg:grid-cols-2 lg:items-start'>
        <ConceptCard
          icon={Landmark}
          title='Parquet et hiérarchie'
          description='PG, PR, substituts : même voix pour l’action publique, sous le principe d’indivisibilité du ministère public.'
          article='Art. 40 & s. CPP'
          color='blue'
        />
        <DefinitionCard
          term='Principe d’opportunité (art. 40-1)'
          definition='Le procureur dispose d’un pouvoir d’appréciation pour poursuivre, classer ou orienter vers des mesures alternatives.'
          example='Les alternatives (41-1, composition pénale, etc.) ne remplacent pas la légalité : elles s’inscrivent dans le cadre légal.'
        />
      </div>

      <TimelineStep steps={AXES} />

      <RuleCard
        type='conditional'
        title='Contrôle opérationnel'
        description='Avis immédiat lors des GAV, possibilité de demander la levée : le PR cadenasse les atteintes graves à la liberté.'
        article='Art. 41 & 63 CPP'
      />
    </section>
  );
}
