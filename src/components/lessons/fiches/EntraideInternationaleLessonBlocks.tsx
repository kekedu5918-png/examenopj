'use client';

import { Globe2 } from 'lucide-react';

import { ConceptCard } from '@/components/lessons/ConceptCard';
import { RuleCard } from '@/components/lessons/RuleCard';
import { TimelineStep, type TimelineStepItem } from '@/components/lessons/TimelineStep';

const CANAUX: TimelineStepItem[] = [
  {
    number: 1,
    title: 'Lettres rogatoires',
    description:
      'Canal classique via Justice : traduction conforme, référentiel probatoire joint.',
    article: 'Art. 694 CPP',
  },
  {
    number: 2,
    title: 'MAE / EAW',
    description:
      'Mandat d’arrêt européen : infractions « cadre », motifs de refus, délais d’exécution.',
    article: 'L. 696-4 CPP',
  },
  {
    number: 3,
    title: 'Eurojust',
    description:
      'Coordination multi-États pour chaînes financières ou cryptographiques complexes.',
  },
];

export function EntraideInternationaleLessonBlocks() {
  return (
    <section aria-label='Repères visuels — entraide internationale' className='space-y-6'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-[10px] font-bold uppercase tracking-[0.22em] text-blue-400/90'>
          Repères visuels
        </span>
        <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400'>
          Entraide · Europe
        </span>
      </div>

      <ConceptCard
        icon={Globe2}
        title='Un canal = un régime'
        description='Commission rogatoire, EAW ou coopération Prüm : ne pas mélanger délais, nullités et pièces recevables.'
        article='L. 113-1 CPP & instruments UE'
        color='blue'
      />

      <TimelineStep steps={CANAUX} />

      <RuleCard
        type='conditional'
        title='Traduction & pièces'
        description='Une rogatoire mal traduite ou incomplète retarde l’exécution et peut faire échouer la mesure.'
      />
    </section>
  );
}
