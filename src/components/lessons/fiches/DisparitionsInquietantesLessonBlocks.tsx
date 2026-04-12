'use client';

import { Radar } from 'lucide-react';

import { ConceptCard } from '@/components/lessons/ConceptCard';
import { KeyNumber } from '@/components/lessons/KeyNumber';
import { RuleCard } from '@/components/lessons/RuleCard';
import { TimelineStep, type TimelineStepItem } from '@/components/lessons/TimelineStep';

const URGENCE: TimelineStepItem[] = [
  {
    number: 1,
    title: 'Premières heures',
    description:
      'Recherche immédiate, sécurisation des indices, coordination des services et du parquet.',
  },
  {
    number: 2,
    title: 'Données & réquisitions',
    description:
      'Géolocalisation, métadonnées : souvent validation judiciaire anticipée pour ne pas « brûler » la preuve.',
    article: 'Art. 230-32 CPP',
  },
  {
    number: 3,
    title: 'Plans nationaux',
    description:
      'Alertes type enlèvement : circuits médias et points de contact uniques ; horodatage des décisions.',
  },
];

export function DisparitionsInquietantesLessonBlocks() {
  return (
    <section aria-label='Repères visuels — disparitions' className='space-y-6'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-[10px] font-bold uppercase tracking-[0.22em] text-red-400/90'>
          Repères visuels
        </span>
        <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400'>
          Disparitions inquiétantes
        </span>
      </div>

      <div className='grid gap-6 lg:grid-cols-2 lg:items-stretch'>
        <KeyNumber
          number='3'
          label='axes (urgence · données · coordination)'
          sublabel='Articuler art. 74-1, 99 CPP et réquisitions probantes'
          color='red'
        />
        <ConceptCard
          icon={Radar}
          title='Fenêtre opérationnelle'
          description='La coordination données / terrain / magistrat est critique dans les premières heures.'
          article='Art. 74-1 & 99 CPP'
          color='red'
        />
      </div>

      <TimelineStep steps={URGENCE} />

      <RuleCard
        type='conditional'
        title='Données personnelles'
        description='Équilibre entre urgence de la recherche et encadrement CNIL / référentiel judiciaire.'
      />
    </section>
  );
}
