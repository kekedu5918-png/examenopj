import type { Metadata } from 'next';

import { CoursFichesListClient } from '@/components/cours/CoursFichesListClient';
import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
import { getCourseSummaries } from '@/lib/content/courses';
import { openGraphForPage } from '@/utils/seo-metadata';

const coursTitle = 'Cours — Examen OPJ';
const coursDescription = 'Fiches de cours issues du dossier /content/cours — liste filtrable par titre ou tags.';

export const metadata: Metadata = {
  title: coursTitle,
  description: coursDescription,
  alternates: { canonical: '/cours' },
  ...openGraphForPage('/cours', coursTitle, coursDescription),
};

export default async function CoursPage() {
  const items = await getCourseSummaries();

  return (
    <InteriorPageShell maxWidth='6xl' glow={SHELL_GLOW.coursHub} pad='default'>
      <SectionTitle
        badge='CONTENU'
        title='Cours'
        subtitle='Une seule entrée : les fiches Markdown du dossier content/cours. Filtrez et ouvrez le détail par fiche.'
        size='display'
        titleGradient
        titleAs='h1'
        className='mb-10'
      />
      <CoursFichesListClient items={items} />
    </InteriorPageShell>
  );
}
