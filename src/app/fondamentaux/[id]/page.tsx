import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';

import { ContentPremiumOverlay } from '@/components/access/ContentPremiumOverlay';
import { FREEMIUM_UNLOCKED_IDS } from '@/components/fondamentaux/fondamentaux-theme';
import { FondamentauxFicheDetail } from '@/components/fondamentaux/FondamentauxFicheDetail';
import { FondamentauxViewTracker } from '@/components/fondamentaux/FondamentauxViewTracker';
import { CATEGORIES, FICHES } from '@/data/fondamentaux-data';
import { SITE_LAST_UPDATED_LABEL } from '@/constants/site';
import { getContentAccess } from '@/features/access/get-content-access';
import { getSiteUrl } from '@/utils/site-url';

type Props = { params: { id: string } };

export function generateStaticParams() {
  return FICHES.map((f) => ({ id: f.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const fiche = FICHES.find((x) => x.id === params.id);
  if (!fiche) return { title: 'Fiche introuvable' };
  const base = getSiteUrl();

  if (fiche.ficheCanoniqueId) {
    const canon = FICHES.find((x) => x.id === fiche.ficheCanoniqueId);
    const desc = (canon?.accroche ?? fiche.accroche).slice(0, 160);
    return {
      title: `${fiche.titre} — Fondamentaux OPJ`,
      description: desc,
      alternates: { canonical: `${base}/fondamentaux/${fiche.ficheCanoniqueId}` },
      robots: { index: false, follow: true },
    };
  }

  return {
    title: `${fiche.titre} — Fondamentaux OPJ`,
    description: fiche.accroche.slice(0, 160),
    alternates: { canonical: `${base}/fondamentaux/${fiche.id}` },
  };
}

export default async function FondamentauxFichePage({ params }: Props) {
  const fiche = FICHES.find((x) => x.id === params.id);
  if (!fiche) notFound();

  if (fiche.ficheCanoniqueId) {
    permanentRedirect(`/fondamentaux/${fiche.ficheCanoniqueId}`);
  }

  const access = await getContentAccess();
  const locked = access.tier === 'freemium' && !FREEMIUM_UNLOCKED_IDS.has(fiche.id);

  const inner = (
    <div className='min-h-[calc(100vh-4rem)] bg-navy-950'>
      <FondamentauxViewTracker ficheId={fiche.id} />
      <div className='mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10'>
        <p className='mb-4 text-xs text-slate-500' suppressHydrationWarning>
          Dernière mise à jour du site : {SITE_LAST_UPDATED_LABEL}
        </p>
        <nav className='mb-8 text-sm text-gray-500'>
          <Link href='/fondamentaux' className='text-emerald-400 transition hover:text-emerald-300'>
            Fondamentaux
          </Link>
          <span className='mx-2'>/</span>
          <span className='text-gray-400'>{fiche.titre}</span>
        </nav>
        <FondamentauxFicheDetail fiche={fiche} categories={CATEGORIES} />
      </div>
    </div>
  );

  if (locked) {
    return (
      <ContentPremiumOverlay
        title='Cette fiche est réservée au Premium'
        description="Les fiches au-delà du pack de découverte sont débloquées avec l'abonnement. Retrouvez toutes les notions sur la page Fondamentaux."
      >
        {inner}
      </ContentPremiumOverlay>
    );
  }

  return inner;
}
