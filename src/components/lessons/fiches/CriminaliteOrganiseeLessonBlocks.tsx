'use client';

import { ShieldAlert } from 'lucide-react';

import { ConceptCard } from '@/components/lessons/ConceptCard';
import { KeyNumber } from '@/components/lessons/KeyNumber';
import { RuleCard } from '@/components/lessons/RuleCard';
import { TimelineStep, type TimelineStepItem } from '@/components/lessons/TimelineStep';

const MESURES: TimelineStepItem[] = [
  {
    number: 1,
    title: 'GAV renforcée',
    description:
      'Pour infractions visées par l’art. 706-73 (hors exclusions) : prolongations au-delà de 48 h possibles selon 706-88 (jusqu’à 96 h selon les cas).',
    article: 'Art. 706-73 & 706-88 CPP',
  },
  {
    number: 2,
    title: 'Perquisitions dérogatoires',
    description:
      'Plages ou modalités dérogatoires si le texte et le juge le permettent : motivation écrite dans le PV.',
    article: 'Art. 706-90 CPP',
  },
  {
    number: 3,
    title: 'Techniques spéciales',
    description:
      'Gels probatoires, infiltrations, captations : ordre nominatif, prolongations comptées, contrôle judiciaire strict.',
    article: 'Art. 706-82 CPP',
  },
];

export function CriminaliteOrganiseeLessonBlocks() {
  return (
    <section aria-label='Repères visuels — criminalité organisée' className='space-y-6'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-[10px] font-bold uppercase tracking-[0.22em] text-red-400/90'>
          Repères visuels
        </span>
        <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400'>
          Livre IV bis CPP
        </span>
      </div>

      <div className='grid gap-6 lg:grid-cols-2 lg:items-stretch'>
        <KeyNumber
          number='96h'
          label='GAV max. (hypothèses 706-88)'
          sublabel='Hors 706-73 / 706-74 : retour au droit commun des durées'
          color='red'
        />
        <ConceptCard
          icon={ShieldAlert}
          title='Infractions structurées'
          description='Outils renforcés mais chaîne de contrôle judiciaire obligatoire : à défaut, nullité ou exclusion de preuve.'
          article='Livre IV bis CPP'
          color='red'
        />
      </div>

      <TimelineStep steps={MESURES} />

      <RuleCard
        type='conditional'
        title='706-73 vs 706-73-1 / 706-74'
        description='Seules certaines infractions ouvrent les prolongations spéciales ; pour d’autres, GAV = droit commun.'
        article='Art. 706-73 CPP'
      />
    </section>
  );
}
