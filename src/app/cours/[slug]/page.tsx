import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { MarkdownArticle } from '@/components/content/MarkdownArticle';
import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
import { resolveCourseBasename } from '@/lib/content/courses';
import { listMarkdownBasenames, readMarkdownFile, slugFromBasename } from '@/lib/content/markdown';
import { openGraphForPage } from '@/utils/seo-metadata';

export async function generateStaticParams() {
  const basenames = await listMarkdownBasenames('cours');
  return basenames.map((b) => ({ slug: slugFromBasename(b) }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const base = await resolveCourseBasename(params.slug);
  if (!base) return {};
  const { data } = await readMarkdownFile(`cours/${base}.md`);
  const title = typeof data.title === 'string' ? data.title : params.slug;
  const description =
    typeof data.description === 'string' ? data.description : `Fiche cours — ${title}`;
  return {
    title: `${title} — Cours | Examen OPJ`,
    description,
    alternates: { canonical: `/cours/${params.slug}` },
    ...openGraphForPage(`/cours/${params.slug}`, title, description),
  };
}

export default async function CoursFichePage({ params }: { params: { slug: string } }) {
  const base = await resolveCourseBasename(params.slug);
  if (!base) notFound();
  const { content } = await readMarkdownFile(`cours/${base}.md`);

  return (
    <InteriorPageShell maxWidth='4xl' glow={SHELL_GLOW.coursHub} pad='default'>
      <nav className='mb-8 text-sm text-gray-500'>
        <Link href='/cours' className='text-violet-400 hover:text-violet-300'>
          Cours
        </Link>
        <span className='mx-2' aria-hidden>
          /
        </span>
        <span className='text-gray-400'>Fiche</span>
      </nav>
      <MarkdownArticle markdown={content} />
    </InteriorPageShell>
  );
}
