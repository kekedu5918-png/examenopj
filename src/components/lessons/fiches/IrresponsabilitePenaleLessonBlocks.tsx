'use client';

import { ShieldOff } from 'lucide-react';

import { ConceptCard } from '@/components/lessons/ConceptCard';
import { RuleCard } from '@/components/lessons/RuleCard';
import { TimelineStep, type TimelineStepItem } from '@/components/lessons/TimelineStep';

const THEMES: TimelineStepItem[] = [
  {
    number: 1,
    title: 'Faits justificatifs',
    description:
      'Ordre de la loi, légitime défense, état de nécessité, lanceur d’alerte : suppriment ou excluent l’infraction si conditions réunies.',
    article: 'Art. 122-4 à 122-9 C. pén.',
  },
  {
    number: 2,
    title: 'Non-imputabilité',
    description:
      'Trouble mental, minorité au sens du CJPM, contrainte, erreur de droit invincible : analyse distincte pour chaque cause.',
    article: 'Art. 122-1 à 122-3 C. pén.',
  },
  {
    number: 3,
    title: 'Usage de l’arme (fonctionnaire)',
    description:
      'CSI : avertissements, proportionnalité, nécessité absolue — cadre très strict.',
    article: 'Art. L. 435-1 CSI',
  },
];

export function IrresponsabilitePenaleLessonBlocks() {
  return (
    <section aria-label='Repères visuels — irresponsabilité' className='space-y-6'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400'>
          Repères visuels
        </span>
        <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400'>
          Causes d’exonération
        </span>
      </div>

      <ConceptCard
        icon={ShieldOff}
        title='Deux familles'
        description='D’un côté les faits justificatifs qui excluent l’infraction ; de l’autre les causes qui excluent ou atténuent la culpabilité.'
        article='Art. 122-1 à 122-9 C. pén.'
        color='red'
      />

      <TimelineStep steps={THEMES} />

      <RuleCard
        type='conditional'
        title='Légitime défense'
        description='Atteinte injustifiée en cours + riposte nécessaire et proportionnée : poser les faits minute par minute.'
        article='Art. 122-5 C. pén.'
      />
    </section>
  );
}
