import type { Metadata } from 'next';

import { CoursFichesListClient } from '@/components/cours/CoursFichesListClient';
import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
import { getCourseSummaries } from '@/lib/content/courses';
import { openGraphForPage } from '@/utils/seo-metadata';

const title = 'Fondamentaux — Examen OPJ';
const description =
  'Cadres d’enquête, mesures coercitives, infractions clés : fiches courtes en synthèses, tableaux et checklists — pas de pavés.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/fondamentaux' },
  ...openGraphForPage('/fondamentaux', title, description),
};

export default async function FondamentauxPage() {
  const items = await getCourseSummaries();

  return (
    <InteriorPageShell maxWidth='6xl' glow={SHELL_GLOW.coursHub} pad='default'>
      <SectionTitle
        badge='FONDAMENTAUX'
        badgeClassName='bg-blue-500/15 text-blue-200'
        title='Les bases pour réussir'
        subtitle='Procédure et opérationnels : une entrée unique, des fiches lisibles en quelques minutes (puces, tableaux, encadrés).'
        size='display'
        titleGradient
        titleAs='h1'
        className='mb-8'
      />

      <GlassCard className='mb-10 p-5' padding='' topGlow>
        <p className='text-sm font-semibold text-white'>Comment lire cette rubrique</p>
        <ul className='mt-3 list-inside list-disc space-y-1 text-sm text-slate-300'>
          <li>Chaque fiche va droit au but : repères d’examen, pièges, méthode.</li>
          <li>Le contenu détaillé est structuré en interne pour garantir la justesse ; vous voyez seulement la synthèse utile le jour J.</li>
        </ul>
      </GlassCard>

      <CoursFichesListClient items={items} basePath='/fondamentaux' />
    </InteriorPageShell>
  );
}
