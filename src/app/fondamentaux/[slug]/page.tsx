import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { MarkdownArticle } from '@/components/content/MarkdownArticle';
import { FichePremium } from '@/components/fondamentaux/fiche/FichePremium';
import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
import { resolveCourseBasename } from '@/lib/content/courses';
import { listMarkdownBasenames, readMarkdownFile, slugFromBasename } from '@/lib/content/markdown';
import { loadPilotFicheV3 } from '@/lib/fondamentaux/load-pilot-fiche-v3';
import { openGraphForPage } from '@/utils/seo-metadata';

export async function generateStaticParams() {
  const basenames = await listMarkdownBasenames('cours');
  return basenames.map((b) => ({ slug: slugFromBasename(b) }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const base = await resolveCourseBasename(params.slug);
  if (!base) return {};
  const pilot = await loadPilotFicheV3(base);
  if (pilot) {
    const { title, description } = pilot.data;
    return {
      title: `${title} | Fondamentaux | Examen OPJ`,
      description,
      alternates: { canonical: `/fondamentaux/${params.slug}` },
      ...openGraphForPage(`/fondamentaux/${params.slug}`, title, description),
    };
  }
  const { data } = await readMarkdownFile(`cours/${base}.md`);
  const title = typeof data.title === 'string' ? data.title : params.slug;
  const description =
    typeof data.description === 'string' ? data.description : `Fiche fondamentaux — ${title}`;
  return {
    title: `${title} | Fondamentaux | Examen OPJ`,
    description,
    alternates: { canonical: `/fondamentaux/${params.slug}` },
    ...openGraphForPage(`/fondamentaux/${params.slug}`, title, description),
  };
}

export default async function FondamentauxFichePage({ params }: { params: { slug: string } }) {
  const base = await resolveCourseBasename(params.slug);
  if (!base) notFound();
  const pilot = await loadPilotFicheV3(base);

  if (pilot) {
    const slug = slugFromBasename(base);
    return (
      <InteriorPageShell maxWidth='4xl' glow={SHELL_GLOW.coursHub} pad='default'>
        <FichePremium
          data={pilot.data}
          slug={slug}
          callout30s={pilot.data.blocs.pointCle}
          breadcrumbItems={[
            { href: '/fondamentaux', label: 'Fondamentaux' },
            { href: `/fondamentaux/${params.slug}`, label: pilot.data.title },
          ]}
          quizHref='/entrainement/quiz'
          footerCtas={[
            { href: '/fondamentaux', label: 'Retour au hub' },
            { href: '/entrainement/articulation', label: 'Articulation' },
          ]}
          accordionMarkdownSections={pilot.accordionSections}
        >
          {pilot.accordionSections.length === 0 ? <MarkdownArticle markdown={pilot.courseMarkdown} /> : null}
        </FichePremium>
      </InteriorPageShell>
    );
  }

  const { content } = await readMarkdownFile(`cours/${base}.md`);

  return (
    <InteriorPageShell maxWidth='4xl' glow={SHELL_GLOW.coursHub} pad='default'>
      <nav className='mb-8 font-ij-sans text-sm text-ij-text-muted'>
        <Link href='/fondamentaux' className='text-ij-accent hover:text-ij-accent/80'>
          Fondamentaux
        </Link>
        <span className='mx-2' aria-hidden>
          /
        </span>
        <span className='text-ij-text-subtle'>Fiche</span>
      </nav>
      <MarkdownArticle markdown={content} />
    </InteriorPageShell>
  );
}
