import type { Metadata } from 'next';

import type { ProgrammeModuleItem } from '@/components/cours/ProgrammeClient';
import { ProgrammeClient } from '@/components/cours/ProgrammeClient';
import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { APP_NAME } from '@/constants/site';
import { courseModuleSyntheses } from '@/data/course-module-syntheses';
import { fasciculesList } from '@/data/fascicules-list';
import type { Domain } from '@/data/fascicules-types';
import { openGraphForPage } from '@/utils/seo-metadata';

const progTitle = 'Programme de révision OPJ';
const progDescription = `${APP_NAME} : sommaire des 15 thèmes du programme (DPS, DPG, procédure), entraînement associé — contenu pédagogique original, aligné sur le programme officiel.`;

export const metadata: Metadata = {
  title: progTitle,
  description: progDescription,
  alternates: { canonical: '/programme' },
  ...openGraphForPage('/programme', progTitle, progDescription),
};

function toClientDomain(domaine: 'DPS' | 'DPG' | 'Procédure pénale'): Domain {
  if (domaine === 'DPS') return 'DPS';
  if (domaine === 'DPG') return 'DPG';
  return 'PROCEDURE';
}

export default function ProgrammePage() {
  const modules: ProgrammeModuleItem[] = [...fasciculesList]
    .sort((a, b) => a.numero - b.numero)
    .map((m) => ({
      id: m.id,
      numero: m.numero,
      titre: m.titre,
      accroche: m.accroche,
      domaine: m.domaine,
      domaineLabel: m.domaineLabel,
      domain: toClientDomain(m.domaine),
      synthesis: courseModuleSyntheses[m.id] ?? null,
    }));

  return (
    <InteriorPageShell maxWidth='6xl' glow='cyan' pad='default'>
      <SectionTitle
        badge='PROGRAMME'
        badgeClassName='bg-cyan-500/20 text-cyan-200'
        title='Sommaire du programme'
        subtitle="15 modules — DPS, DPG, Procédure pénale. Filtrez par domaine, cliquez un module pour voir les axes et les pièges à l'examen."
        size='display'
        titleGradient
        titleAs='h1'
        className='mb-6'
      />

      <p className='mb-8 max-w-3xl text-sm leading-relaxed text-gray-400'>
        Contenu conforme au programme officiel de l&apos;examen OPJ. Les synthèses publiées ici sont rédigées par {APP_NAME}{' '}
        — recoupez toujours avec le Code pénal, le Code de procédure pénale et Légifrance.
      </p>

      <ProgrammeClient modules={modules} />
    </InteriorPageShell>
  );
}
