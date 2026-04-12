'use client';

import { HeartHandshake } from 'lucide-react';

import { ConceptCard } from '@/components/lessons/ConceptCard';
import { RuleCard } from '@/components/lessons/RuleCard';
import { TimelineStep, type TimelineStepItem } from '@/components/lessons/TimelineStep';

const DROITS: TimelineStepItem[] = [
  {
    number: 1,
    title: 'Information',
    description:
      'Droits fondamentaux : plainte, aide juridictionnelle, associations d’aide ; information sur le déroulement de la procédure.',
    article: 'Art. 11-1 CPP',
  },
  {
    number: 2,
    title: 'Accompagnement',
    description:
      'Auditions adaptées, consultation du dossier selon les phases, mesures pour limiter la re-victimisation.',
    article: 'Art. 11-6 & s. CPP',
  },
  {
    number: 3,
    title: 'Protection',
    description:
      'Ordonnances d’éloignement ou mesures provisoires : l’OPJ assure le contrôle opérationnel des décisions.',
    article: 'Art. 12 CPP',
  },
];

export function VictimesDroitsLessonBlocks() {
  return (
    <section aria-label='Repères visuels — victimes' className='space-y-6'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-[10px] font-bold uppercase tracking-[0.22em] text-pink-400/90'>
          Repères visuels
        </span>
        <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400'>
          Victimes
        </span>
      </div>

      <ConceptCard
        icon={HeartHandshake}
        title='La victime est une partie'
        description='Calendrier d’audition, protections et lien avec le parquet : la procédure doit intégrer la dimension victimologique.'
        article='Art. 11-1 & 706-30 CPP'
        color='green'
      />

      <TimelineStep steps={DROITS} />

      <RuleCard
        type='conditional'
        title='Mineurs victimes'
        description='Auditions spécialisées, lieux adaptés, enregistrement audiovisuel lorsque la loi l’impose — limiter la revictimisation.'
        article='Art. 706-53 CPP'
      />
    </section>
  );
}
