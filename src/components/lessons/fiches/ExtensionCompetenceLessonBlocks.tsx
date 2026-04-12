'use client';

import { Network } from 'lucide-react';

import { ConceptCard } from '@/components/lessons/ConceptCard';
import { RuleCard } from '@/components/lessons/RuleCard';
import { ScenarioCard } from '@/components/lessons/ScenarioCard';
import { TimelineStep, type TimelineStepItem } from '@/components/lessons/TimelineStep';

const COORD: TimelineStepItem[] = [
  {
    number: 1,
    title: 'Extension du lieu',
    description:
      'Le PG ou le PR peut rattacher des procédures ou étendre les investigations lorsque les faits sont connexes.',
    article: 'Art. 75-1 CPP',
  },
  {
    number: 2,
    title: 'Mention sur les actes',
    description:
      'Chaque PV doit renvoyer au dossier d’origine et, le cas échéant, à l’extension validée.',
  },
  {
    number: 3,
    title: 'Coordination',
    description:
      'Scellés numériques partagés, magistrats coordonnateurs : une seule « vérité procédurale » pour l’ensemble des services.',
  },
];

export function ExtensionCompetenceLessonBlocks() {
  return (
    <section aria-label='Repères visuels — extension des enquêtes' className='space-y-6'>
      <div className='flex flex-wrap items-center gap-2'>
        <span className='text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-400/90'>
          Repères visuels
        </span>
        <span className='rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-slate-400'>
          Extension · coordination
        </span>
      </div>

      <ConceptCard
        icon={Network}
        title='Enquêtes interdépartementales'
        description='Les faits mobiles imposent des mécanismes d’extension pour éviter tout acte hors cadre.'
        article='Art. 75-1 & R. 15-33-1 CPP'
        color='blue'
      />

      <TimelineStep steps={COORD} />

      <RuleCard
        type='forbidden'
        title='Oubli de mention'
        description='Sans référence au dossier maître ou à l’extension : risque d’irrégularité substantielle et contestation des actes.'
      />

      <ScenarioCard
        situation='Deux services saisissent des téléphones dans des procédures distinctes sans rattachement ni partage des hash d’intégrité.'
        question='Quel risque au débat ?'
        answer='Perte de traçabilité, difficulté à prouver la chaîne de possession et contestation de l’origine des extraits.'
        difficulty={2}
      />
    </section>
  );
}
