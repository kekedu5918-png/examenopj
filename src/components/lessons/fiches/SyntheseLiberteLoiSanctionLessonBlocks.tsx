'use client';

import { BookOpen } from 'lucide-react';

import { ConceptCard } from '@/components/lessons/ConceptCard';
import { RuleCard } from '@/components/lessons/RuleCard';
import { TimelineStep, type TimelineStepItem } from '@/components/lessons/TimelineStep';

const FIL: TimelineStepItem[] = [
  {
    number: 1,
    title: 'Légalité stricte',
    description:
      'Nullum crimen : texte préalable, clair, accessible — distinguer loi pénale / répressive / de police.',
    article: 'Art. 111-1 à 111-4 C. pén.',
  },
  {
    number: 2,
    title: 'Loi dans le temps',
    description:
      'Lex mitior ; temps de l’infraction = temps de l’acte ; prescription de l’action publique distincte.',
    article: 'Art. 112-1 C. pén.',
  },
  {
    number: 3,
    title: 'Unité & concours',
    description:
      'Concours idéal / réel, continuation : poser la méthode avant d’écrire la copie.',
    article: 'Art. 132-2 à 132-5 C. pén.',
  },
];

export function SyntheseLiberteLoiSanctionLessonBlocks() {
  return (
    <section aria-label='Repères visuels — synthèse libertés / loi / sanction' className='space-y-6'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-400/90'>
          Synthèse
        </span>
        <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400'>
          F08–F10 · toile de fond
        </span>
      </div>

      <ConceptCard
        icon={BookOpen}
        title='Vision transversale'
        description='Du principe légal à la peine : même fil conducteur pour toute qualification OPJ (F08, F09, F10).'
        article='C. pén. & C.P.P.'
        color='green'
      />

      <TimelineStep steps={FIL} />

      <RuleCard
        type='conditional'
        title='Libertés & proportionnalité'
        description='Toute atteinte aux libertés fondamentales exige base légale, nécessité et proportion (croiser préambule CPP).'
      />
    </section>
  );
}
