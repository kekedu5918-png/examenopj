'use client';

import { Scale } from 'lucide-react';

import { ConceptCard } from '@/components/lessons/ConceptCard';
import { RuleCard } from '@/components/lessons/RuleCard';
import { TimelineStep, type TimelineStepItem } from '@/components/lessons/TimelineStep';

const TRI: TimelineStepItem[] = [
  {
    number: 1,
    title: 'Action publique',
    description:
      'Opportunité encadrée, alternatives aux poursuites, recevabilité : rôle du parquet vs juge du fond.',
    article: 'Art. 40 à 49 CPP',
  },
  {
    number: 2,
    title: 'Contrôle PJ',
    description:
      'PR impulse, PG contrôle les habilitations ; IGJ / chambre de l’instruction pour les crises.',
    article: 'Art. 41 & 44 CPP',
  },
  {
    number: 3,
    title: 'Nullités',
    description:
      'Formalité substantielle + grief : lien de causalité entre l’irrégularité et le préjudice.',
    article: 'Art. 171 & 174 CPP',
  },
];

export function SyntheseParquetControleNulliteLessonBlocks() {
  return (
    <section aria-label='Repères visuels — synthèse parquet / contrôle / nullité' className='space-y-6'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-[10px] font-bold uppercase tracking-[0.22em] text-violet-400/90'>
          Synthèse
        </span>
        <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400'>
          F14–F15
        </span>
      </div>

      <ConceptCard
        icon={Scale}
        title='Mission — responsabilité — sanction procédurale'
        description='Triptyque à maîtriser pour l’épreuve : qui oriente, qui contrôle, quand l’acte tombe.'
        article='F14, F15'
        color='blue'
      />

      <TimelineStep steps={TRI} />

      <RuleCard
        type='forbidden'
        title='Sanction de l’irrégularité'
        description='Exclusion de preuve, nullité des actes connexes : démontrer le lien causal avec le grief de la défense.'
        article='Art. 174 CPP'
      />
    </section>
  );
}
