'use client';

import { Cross } from 'lucide-react';

import { ConceptCard } from '@/components/lessons/ConceptCard';
import { RuleCard } from '@/components/lessons/RuleCard';
import { TimelineStep, type TimelineStepItem } from '@/components/lessons/TimelineStep';

const PHASES: TimelineStepItem[] = [
  {
    number: 1,
    title: 'Ouverture',
    description:
      'Mort non naturelle apparente, corps non identifié ou circonstances floues : mesures renforcées immédiates.',
    article: 'Art. 74 CPP',
  },
  {
    number: 2,
    title: 'Scène & sciences',
    description:
      'Garde de scène, IRMGL / médecine légale, emballages séparés pour éviter contamination.',
  },
  {
    number: 3,
    title: 'Parquet',
    description:
      'Qualification provisoire pilotée par le procureur en attendant expertises (homicide, mise en danger…).',
  },
];

export function EnqueteDeces74LessonBlocks() {
  return (
    <section aria-label='Repères visuels — art. 74' className='space-y-6'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-400'>
          Repères visuels
        </span>
        <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400'>
          Mort suspecte · art. 74
        </span>
      </div>

      <ConceptCard
        icon={Cross}
        title='Cadre quasi autonome'
        description='La chaîne scientifique et la coordination parquet / PJ conditionnent toute la suite pénale.'
        article='Art. 74 & 74-1 CPP'
        color='red'
      />

      <TimelineStep steps={PHASES} />

      <RuleCard
        type='conditional'
        title='Contamination'
        description='Mélanger traces biologiques et numériques sans protocole : fragilise la preuve et la qualification.'
      />
    </section>
  );
}
