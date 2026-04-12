'use client';

import { Split } from 'lucide-react';

import { ConceptCard } from '@/components/lessons/ConceptCard';
import { DefinitionCard } from '@/components/lessons/DefinitionCard';
import { KeyNumber } from '@/components/lessons/KeyNumber';
import { RuleCard } from '@/components/lessons/RuleCard';
import { TimelineStep, type TimelineStepItem } from '@/components/lessons/TimelineStep';

const COUPLE: TimelineStepItem[] = [
  {
    number: 1,
    title: 'Action publique',
    description:
      'Poursuivre l’auteur au nom de la société : parquet, aboutissement à une peine ou mesure sans condamner la victime.',
    article: 'Art. 1 CPP',
  },
  {
    number: 2,
    title: 'Action civile',
    description:
      'Réparer le préjudice : partie civile devant le juge pénal ou recours devant le juge civil.',
    article: 'Art. 2 CPP',
  },
  {
    number: 3,
    title: 'Extinction',
    description:
      'Prescription, amnistie, chose jugée, transaction… : les causes d’extinction de l’action publique sont codifiées.',
    article: 'Art. 6 CPP',
  },
];

export function ActionPubliqueLessonBlocks() {
  return (
    <section aria-label='Repères visuels — actions publique et civile' className='space-y-6'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-[10px] font-bold uppercase tracking-[0.22em] text-fuchsia-400/90'>
          Repères visuels
        </span>
        <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400'>
          Action publique · civile
        </span>
      </div>

      <div className='grid gap-6 lg:grid-cols-2 lg:items-stretch'>
        <KeyNumber
          number='2'
          label='actions distinctes pour une même infraction'
          sublabel='Ne pas confondre finalité (punir vs indemniser) ni délais'
          color='blue'
        />
        <ConceptCard
          icon={Split}
          title='Double voie'
          description='Une infraction peut nourrir à la fois poursuite pénale et demande civile : cadres et parties ne se confondent pas.'
          article='Art. 1 à 10 CPP'
          color='blue'
        />
      </div>

      <TimelineStep steps={COUPLE} />

      <DefinitionCard
        term='CRPC (repère)'
        definition='Comparution sur reconnaissance préalable de culpabilité : accord sur les faits et proposition de peine homologuée par le juge, pour délits punis jusqu’à 5 ans.'
        example='Raccourcit la procédure mais suppose consentement et cadre légal strict (art. 495-8).'
      />

      <RuleCard
        type='conditional'
        title='Prescription de l’action publique'
        description='Crimes / délits / contraventions : délais de base du Code pénal, avec nombreuses spécialités (mineurs, terrorisme…).'
        article='C. pén. & art. 706-47'
      />
    </section>
  );
}
