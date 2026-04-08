import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ModelePVDetailClient } from '@/components/modeles-pv/ModelePVDetailClient';
import { getCourseModuleById } from '@/data/fascicules-list';
import { getModelePVBySlug, getModelesPVSlugs } from '@/data/modeles-pv';
import { hasPremiumAccess } from '@/features/account/controllers/has-premium-access';
import { PV_CATEGORIE_META } from '@/lib/pv-categories';
import { cn } from '@/utils/cn';
import { getSiteUrl } from '@/utils/site-url';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getModelesPVSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const m = getModelePVBySlug(params.slug);
  if (!m) return { title: 'Modèle introuvable' };
  return {
    title: { absolute: `${m.titre} — Modèle officiel | ExamenOPJ` },
    description: `${m.titre} — fascicule ${m.fascicule}, ${PV_CATEGORIE_META[m.categorie].label}. Modèle de procès-verbal pour la préparation OPJ.`,
    robots: { index: true, follow: true },
  };
}

export default async function ModelePVDetailPage({ params }: Props) {
  const modele = getModelePVBySlug(params.slug);
  if (!modele) notFound();

  const userHasPremium = await hasPremiumAccess();
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/cours/modeles-pv/${modele.id}`;

  const facLower = `f${modele.fascicule.replace(/^F/i, '').padStart(2, '0')}`;
  const moduleMeta = getCourseModuleById(facLower);
  const moduleHref = moduleMeta ? `/cours/modules/${facLower}` : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: modele.titre,
    description: `${modele.source} — ${PV_CATEGORIE_META[modele.categorie].label}, fascicule ${modele.fascicule}.`,
    learningResourceType: 'Modèle de procès-verbal',
    url,
    educationalLevel: 'Formation OPJ',
    inLanguage: 'fr-FR',
    provider: { '@type': 'Organization', name: 'ExamenOPJ', url: siteUrl },
  };

  return (
    <div className='min-h-screen pb-32 md:pb-12'>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className='container max-w-5xl px-4 pt-8 md:pt-12'>
        <nav className='mb-6 text-sm text-examen-inkMuted' aria-label='Fil d’Ariane'>
          <Link href='/cours' className='text-examen-accent hover:underline'>
            Cours
          </Link>
          <span className='mx-2'>/</span>
          <Link href='/cours/modeles-pv' className='text-examen-accent hover:underline'>
            Modèles de PV
          </Link>
          <span className='mx-2'>/</span>
          <span className='text-examen-ink'>{modele.titre}</span>
        </nav>

        <header className='mb-8'>
          <div className='flex flex-wrap items-center gap-2'>
            <span
              className={cn(
                'inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ring-1',
                PV_CATEGORIE_META[modele.categorie].badgeClass,
              )}
            >
              {PV_CATEGORIE_META[modele.categorie].label}
            </span>
            <span className='rounded-md border border-white/[0.1] bg-white/[0.04] px-2 py-0.5 text-[10px] font-bold text-examen-inkMuted'>
              {modele.fascicule}
            </span>
            {modele.isPremium ? (
              <span className='rounded-md border border-examen-premium/35 bg-examen-premium/15 px-2 py-0.5 text-[10px] font-bold text-violet-200'>
                Premium
              </span>
            ) : null}
          </div>
          <h1 className='mt-4 font-display text-2xl font-bold tracking-tight text-white md:text-3xl'>{modele.titre}</h1>
          <p className='mt-3 text-sm text-examen-inkMuted'>{modele.source}</p>
          {moduleHref ? (
            <p className='mt-2 text-sm'>
              <Link href={moduleHref} className='font-semibold text-examen-accent hover:underline'>
                Voir le module cours {modele.fascicule}
                {moduleMeta ? ` — ${moduleMeta.titre}` : ''} →
              </Link>
            </p>
          ) : null}
        </header>

        <ModelePVDetailClient modele={modele} userHasPremium={userHasPremium} />
      </div>
    </div>
  );
}
