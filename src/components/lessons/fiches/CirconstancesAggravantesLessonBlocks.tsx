'use client';

import { Flame } from 'lucide-react';

import { ConceptCard } from '@/components/lessons/ConceptCard';
import { RuleCard } from '@/components/lessons/RuleCard';
import { TimelineStep, type TimelineStepItem } from '@/components/lessons/TimelineStep';

const EXEMPLES: TimelineStepItem[] = [
  {
    number: 1,
    title: 'Bande organisée / guet-apens',
    description:
      'Groupement structuré ou embuscade : alourdissement encadré par les art. 132-71 et 132-71-1.',
    article: 'Art. 132-71 C. pén.',
  },
  {
    number: 2,
    title: 'Préméditation & effraction',
    description:
      'Dessein préalable ; forcement ou escalade pour pénétrer : à rattacher aux faits du thème.',
    article: 'Art. 132-72 & 132-73 C. pén.',
  },
  {
    number: 3,
    title: 'Motifs discriminatoires',
    description:
      'Caractère raciste, antisémite, homophobe ou transphobe : à prouver en dernier lieu, avec prudence rédactionnelle.',
    article: 'Art. 132-76 & 132-77 C. pén.',
  },
];

export function CirconstancesAggravantesLessonBlocks() {
  return (
    <section aria-label='Repères visuels — circonstances aggravantes' className='space-y-6'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-[10px] font-bold uppercase tracking-[0.22em] text-orange-400/90'>
          Repères visuels
        </span>
        <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400'>
          Circonstances · art. 132-71–80
        </span>
      </div>

      <ConceptCard
        icon={Flame}
        title='Alourdissement de la peine'
        description='Chaque circonstance doit être alléguée et prouvée : lien étroit avec les faits du dossier.'
        article='Art. 132-71 à 132-80 C. pén.'
        color='amber'
      />

      <TimelineStep steps={EXEMPLES} />

      <RuleCard
        type='conditional'
        title='Cryptologie (132-79)'
        description='Usage de moyens de chiffrement pour préparer ou commettre l’infraction : circonstance autonome à ne pas confondre avec la seule présence d’outils numériques.'
        article='Art. 132-79 C. pén.'
      />
    </section>
  );
}
