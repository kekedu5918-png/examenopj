'use client';

import { BookMarked } from 'lucide-react';

import { ConceptCard } from '@/components/lessons/ConceptCard';
import { RuleCard } from '@/components/lessons/RuleCard';
import { ScenarioCard } from '@/components/lessons/ScenarioCard';
import { TimelineStep, type TimelineStepItem } from '@/components/lessons/TimelineStep';

const MISSION: TimelineStepItem[] = [
  {
    number: 1,
    title: 'Recherche de la vérité',
    description:
      'Charges et décharges : le juge d’instruction oriente les diligences (expertises, écoutes selon cadre).',
    article: 'Art. 81 CPP',
  },
  {
    number: 2,
    title: 'Actes sous contrôle',
    description:
      'Tout acte hors saisine ou contre ordre express : risque de nullité ou de grief majeur.',
  },
  {
    number: 3,
    title: 'Lien GAV — instruction',
    description:
      'Prolongations et présentations au juge doivent figurer dans la chaîne de garde à vue.',
    article: 'Art. 116-2 CPP',
  },
];

export function JugeInstructionLessonBlocks() {
  return (
    <section aria-label='Repères visuels — juge d’instruction' className='space-y-6'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-[10px] font-bold uppercase tracking-[0.22em] text-indigo-400/90'>
          Repères visuels
        </span>
        <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400'>
          Juge d’instruction
        </span>
      </div>

      <ConceptCard
        icon={BookMarked}
        title='Pilote de l’information'
        description='L’OPJ exécute sous direction : pas d’initiative hors commission rogatoire ou ordres écrits.'
        article='Art. 80 & 81 CPP'
        color='blue'
      />

      <TimelineStep steps={MISSION} />

      <RuleCard
        type='forbidden'
        title='Acte « off record »'
        description='Corriger hors procès-verbal ou hors ordre : source fréquente de nullité ou de discipline.'
      />

      <ScenarioCard
        situation='Vous réalisez une audition de mis en examen sans la présence du juge d’instruction alors que l’information est ouverte.'
        question='Problème principal ?'
        answer='L’interrogatoire de mis en examen est réservé au juge d’instruction (sauf dérogations strictes) : risque de nullité et d’irrégularité substantielle.'
        difficulty={3}
      />
    </section>
  );
}
