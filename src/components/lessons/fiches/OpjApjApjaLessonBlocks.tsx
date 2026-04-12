'use client';

import { Shield } from 'lucide-react';

import { ConceptCard } from '@/components/lessons/ConceptCard';
import { KeyNumber } from '@/components/lessons/KeyNumber';
import { RuleCard } from '@/components/lessons/RuleCard';
import { TimelineStep, type TimelineStepItem } from '@/components/lessons/TimelineStep';

const NIVEAUX: TimelineStepItem[] = [
  {
    number: 1,
    title: 'OPJ',
    description:
      'Habilitation du PG : pouvoirs étendus — GAV, perquisitions en flagrance, auditions sous contrainte, défèrement, etc.',
    article: 'Art. 16 CPP',
  },
  {
    number: 2,
    title: 'APJ',
    description:
      'Second l’OPJ : constatations, auditions hors GAV, réquisitions possibles selon les textes — pas de placement en GAV ni perquisition seul.',
    article: 'Art. 20 CPP',
  },
  {
    number: 3,
    title: 'APJA',
    description:
      'Pouvoirs limités : relevé d’identité, PV de contraventions, assistance aux OPJ/APJ — pas d’actes d’enquête lourds.',
    article: 'Art. 21 CPP',
  },
];

export function OpjApjApjaLessonBlocks() {
  return (
    <section aria-label='Repères visuels — OPJ, APJ, APJA' className='space-y-6'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-[10px] font-bold uppercase tracking-[0.22em] text-indigo-400/90'>
          Repères visuels
        </span>
        <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400'>
          OPJ · APJ · APJA
        </span>
      </div>

      <div className='grid gap-6 lg:grid-cols-2 lg:items-stretch'>
        <KeyNumber
          number='3'
          label='niveaux d’habilitation'
          sublabel='Ne jamais confondre les tableaux d’actes : l’examen teste les interdictions.'
          color='blue'
        />
        <ConceptCard
          icon={Shield}
          title='Pyramide des pouvoirs'
          description='Plus le niveau est bas, plus les actes coercitifs sont restreints ; l’habilitation OPJ est personnelle et peut être retirée.'
          article='Art. 16-1 CPP'
          color='blue'
        />
      </div>

      <TimelineStep steps={NIVEAUX} />

      <div className='grid gap-4 md:grid-cols-2'>
        <RuleCard
          type='forbidden'
          title='APJ : pas de GAV'
          description='Seul l’OPJ peut décider du placement en garde à vue ; l’APJ seconde et rend compte.'
          article='Art. 20 & 63 al. 1 CPP'
        />
        <RuleCard
          type='allowed'
          title='Réquisitions (repère)'
          description='Art. 60 : OPJ oui ; APJ oui dans le cadre fixé par le texte ; APJA non pour les réquisitions lourdes.'
          article='Art. 60 CPP'
        />
      </div>
    </section>
  );
}
