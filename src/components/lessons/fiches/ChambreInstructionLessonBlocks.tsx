'use client';

import { Columns3 } from 'lucide-react';

import { ConceptCard } from '@/components/lessons/ConceptCard';
import { RuleCard } from '@/components/lessons/RuleCard';
import { TimelineStep, type TimelineStepItem } from '@/components/lessons/TimelineStep';

const CONTROLE: TimelineStepItem[] = [
  {
    number: 1,
    title: 'Contrôle de légalité',
    description:
      'La chambre de l’instruction peut casser ou valider des ordonnances du juge d’instruction sur saisine des parties ou du parquet général.',
    article: 'Art. 179 CPP',
  },
  {
    number: 2,
    title: 'Nullités',
    description:
      'Retrait des actes défectueux ; renvoi possible devant un autre juge selon les motifs.',
    article: 'Art. 184 CPP',
  },
  {
    number: 3,
    title: 'Instruction longue',
    description:
      'Contrôle des suites d’une information ouverte : proportionnalité et respect des droits sur la durée.',
  },
];

export function ChambreInstructionLessonBlocks() {
  return (
    <section aria-label='Repères visuels — chambre de l’instruction' className='space-y-6'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400'>
          Repères visuels
        </span>
        <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400'>
          Chambre de l’instruction
        </span>
      </div>

      <ConceptCard
        icon={Columns3}
        title='Contrôle collégial'
        description='Instance de censure de la démarche d’instruction : au-delà du seul juge d’instruction.'
        article='Art. 179 à 226 CPP'
        color='blue'
      />

      <TimelineStep steps={CONTROLE} />

      <RuleCard
        type='conditional'
        title='Sort d’une nullité'
        description='Décision contraignante sur le retrait des pièces et parfois sur le renvoi : effets structurants sur la suite du dossier.'
        article='Art. 184 CPP'
      />
    </section>
  );
}
