import type { Metadata } from 'next';

import { CoursFichesListClient } from '@/components/cours/CoursFichesListClient';
import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
import { getCourseSummaries } from '@/lib/content/courses';
import { openGraphForPage } from '@/utils/seo-metadata';

/** Titre absolu — évite d’hériter du template du layout ou d’un titre de fiche en snippet SEO. */
const title =
  'Fondamentaux OPJ — 46 fiches de procédure pénale | ExamenOPJ';
const description =
  "Le socle complet de l'examen OPJ : cadres d'enquête, GAV, perquisitions, nullités — 46 fiches avec repères d'examen, pièges et méthode.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/fondamentaux' },
  ...openGraphForPage('/fondamentaux', title, description),
};

export default async function FondamentauxPage() {
  const items = await getCourseSummaries();
  const countLoi2025 = items.filter((i) => i.loi2025).length;
  const countAvecDuree = items.filter((i) => i.dureeLectureMinutes != null).length;
  const partiesCouvertes = new Set(items.map((i) => i.partieIndex).filter((n): n is number => n != null)).size;

  return (
    <InteriorPageShell maxWidth='6xl' glow={SHELL_GLOW.coursHub} pad='default'>
      <SectionTitle
        badge='FONDAMENTAUX'
        badgeClassName='bg-ij-accent/15 text-ij-accent'
        title='Les bases pour réussir'
        subtitle='Procédure pénale et opérationnel : une entrée par thème, des synthèses complètes et actionnables (repères, tableaux, méthode du jour J).'
        size='display'
        titleGradient
        titleAs='h1'
        className='mb-8'
      />

      <GlassCard className='mb-10 p-5' padding='' topGlow>
        <p className='font-ij-sans text-sm font-semibold text-ij-text'>Comment lire cette rubrique</p>
        <ul className='mt-3 list-inside list-disc space-y-1 font-ij-sans text-sm text-ij-text-muted'>
          <li>
            Chaque fiche va droit au but : ce que l’examinateur attend, les pièges classiques, les articles clés.
          </li>
          <li>Accès complet aux fiches détaillées et aux parcours d’entraînement avec le compte Premium.</li>
        </ul>
      </GlassCard>

      <div
        className='mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4'
        data-testid='fondamentaux-kpi'
        aria-label='Indicateurs du hub fondamentaux'
      >
        <div className='rounded-2xl border border-ij-border bg-ij-surface/80 px-4 py-3'>
          <p className='font-ij-sans text-2xl font-bold tabular-nums text-ij-text'>{items.length}</p>
          <p className='font-ij-sans text-xs text-ij-text-muted'>Fiches publiées</p>
        </div>
        <div className='rounded-2xl border border-ij-border bg-ij-surface/80 px-4 py-3'>
          <p className='font-ij-sans text-2xl font-bold tabular-nums text-ij-text'>{partiesCouvertes}</p>
          <p className='font-ij-sans text-xs text-ij-text-muted'>Parties du programme (I–VI) couvertes</p>
        </div>
        <div className='rounded-2xl border border-ij-border bg-ij-surface/80 px-4 py-3'>
          <p className='font-ij-sans text-2xl font-bold tabular-nums text-ij-text'>{countAvecDuree}</p>
          <p className='font-ij-sans text-xs text-ij-text-muted'>Avec repère durée (plan)</p>
        </div>
        <div className='rounded-2xl border border-ij-border bg-ij-surface/80 px-4 py-3'>
          <p className='font-ij-sans text-2xl font-bold tabular-nums text-ij-accent'>{countLoi2025}</p>
          <p className='font-ij-sans text-xs text-ij-text-muted'>Mention loi / réforme 2025</p>
        </div>
      </div>

      <CoursFichesListClient items={items} basePath='/fondamentaux' />
    </InteriorPageShell>
  );
}
