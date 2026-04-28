import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
import { APP_NAME } from '@/constants/site';
import { getInfractionsCatalog } from '@/data/recapitulatif-data';
import { enrichInfractionCatalog } from '@/utils/enrich-infractions-catalog';
import { openGraphForPage } from '@/utils/seo-metadata';
import { getSiteUrl } from '@/utils/site-url';

function stripInfractionTitle(raw: string): string {
  return raw.replace(/\*\*/g, '').replace(/\*/g, '').trim();
}

function resolveInfraction(slug: string) {
  const catalog = enrichInfractionCatalog(getInfractionsCatalog());
  return catalog.find((i) => i.id === slug);
}

export async function generateStaticParams() {
  return getInfractionsCatalog().map((item) => ({ slug: item.id }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const item = resolveInfraction(params.slug);
  if (!item) return {};
  const plain = stripInfractionTitle(item.infraction);
  const title = `${plain.slice(0, 72)} | Infraction | ${APP_NAME}`;
  const description =
    `${plain}. ${item.legal.slice(0, 120)}`.trim().slice(0, 158) + '…';
  const path = `/infractions/${params.slug}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    ...openGraphForPage(path, title, description),
  };
}

export default function InfractionSlugPage({ params }: { params: { slug: string } }) {
  const item = resolveInfraction(params.slug);
  if (!item) notFound();

  const plainTitle = stripInfractionTitle(item.infraction);
  const base = getSiteUrl();
  const canonicalUrl = `${base}/infractions/${params.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Infractions',
            item: `${base}/infractions`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: plainTitle,
            item: canonicalUrl,
          },
        ],
      },
      {
        '@type': 'Article',
        '@id': `${canonicalUrl}#article`,
        headline: plainTitle,
        description: item.legal.slice(0, 300),
        inLanguage: 'fr-FR',
        isPartOf: {
          '@type': 'WebSite',
          name: APP_NAME,
          url: base,
        },
      },
    ],
  };

  return (
    <InteriorPageShell maxWidth='4xl' glow={SHELL_GLOW.infractions} pad='default'>
      <script
        type='application/ld+json'
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className='mb-6 font-ij-sans text-sm text-ij-text-muted'>
        <Link href='/infractions' className='text-ij-accent hover:underline'>
          Infractions
        </Link>
        <span aria-hidden className='mx-2'>
          /
        </span>
        <span className='text-ij-text'>{plainTitle}</span>
      </nav>

      <SectionTitle
        badge='ÉPREUVE 1'
        badgeClassName='text-rose-200'
        title={plainTitle}
        titleAs='h1'
        subtitle='Élément légal et points saillants — ouvre le référentiel interactif pour le détail complet.'
        className='mb-8'
      />

      <GlassCard padding='p-6' className='space-y-4 text-sm text-ij-text-muted'>
        <div>
          <p className='font-mono-label text-[11px] font-bold uppercase tracking-wide text-ij-accent'>Légal</p>
          <p className='mt-1 text-ij-text'>{item.legal}</p>
        </div>
        <div>
          <p className='font-mono-label text-[11px] font-bold uppercase tracking-wide text-ij-accent'>Matériel (extrait)</p>
          <p className='mt-1 line-clamp-6'>{item.materiel}</p>
        </div>
        <div>
          <p className='font-mono-label text-[11px] font-bold uppercase tracking-wide text-ij-accent'>Moral (extrait)</p>
          <p className='mt-1 line-clamp-6'>{item.moral}</p>
        </div>
      </GlassCard>

      <p className='mt-8'>
        <Link
          href={`/infractions?inf=${encodeURIComponent(item.id)}`}
          className='inline-flex items-center gap-2 rounded-xl bg-ij-accent/15 px-5 py-3 text-sm font-semibold text-ij-accent ring-1 ring-ij-accent/40 transition hover:bg-ij-accent/25'
        >
          Ouvrir dans le référentiel interactif
        </Link>
      </p>
    </InteriorPageShell>
  );
}
