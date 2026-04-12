'use client';

import { Route } from 'lucide-react';

import { ConceptCard } from '@/components/lessons/ConceptCard';
import { RuleCard } from '@/components/lessons/RuleCard';
import { TimelineStep, type TimelineStepItem } from '@/components/lessons/TimelineStep';

const FIL: TimelineStepItem[] = [
  {
    number: 1,
    title: 'Cadres d’enquête',
    description:
      'Flagrance, préliminaire, instruction : chaque acte « tient » sous un état procédural.',
    article: 'Art. 41, 52 à 230 CPP',
  },
  {
    number: 2,
    title: 'Mesures coercitives',
    description:
      'Perquisitions, écoutes, saisies : autorisation, validation, chaîne probatoire et horodatage.',
    article: 'Art. 56 & 706-95 CPP',
  },
  {
    number: 3,
    title: 'Jugement & exécution',
    description:
      'Ordre des juridictions puis mandats de dépôt, JAP, SPIP : ne pas couper le fil après le verdict.',
    article: 'Art. 712-6 CPP',
  },
];

export function SynthesePjInstructionJugementLessonBlocks() {
  return (
    <section aria-label='Repères visuels — synthèse PJ / instruction / jugement' className='space-y-6'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-400/90'>
          Synthèse
        </span>
        <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400'>
          F11–F13 · fil complet
        </span>
      </div>

      <ConceptCard
        icon={Route}
        title='Du premier acte au prononcé'
        description='Le correcteur attend un fil cohérent dans un PV ou un rapport : cadre, mandats, victime, juridiction.'
        article='F11, F12, F13'
        color='blue'
      />

      <TimelineStep steps={FIL} />

      <RuleCard
        type='allowed'
        title='Victime & partie civile'
        description='Information des droits, mesures de protection : articulation action publique / intérêts civils.'
        article='Art. 11-1 CPP'
      />
    </section>
  );
}
