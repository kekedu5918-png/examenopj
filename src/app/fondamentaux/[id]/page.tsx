import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ContentPremiumOverlay } from '@/components/access/ContentPremiumOverlay';
import { FREEMIUM_UNLOCKED_IDS } from '@/components/fondamentaux/fondamentaux-theme';
import { FondamentauxFicheDetail } from '@/components/fondamentaux/FondamentauxFicheDetail';
import { FondamentauxViewTracker } from '@/components/fondamentaux/FondamentauxViewTracker';
import { CATEGORIES, FICHES } from '@/data/fondamentaux-data';
import { getContentAccess } from '@/features/access/get-content-access';

type Props = { params: { id: string } };

export function generateStaticParams() {
  return FICHES.map((f) => ({ id: f.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const fiche = FICHES.find((x) => x.id === params.id);
  if (!fiche) return { title: 'Fiche introuvable' };
  return {
    title: `${fiche.titre} — Fondamentaux OPJ`,
    description: fiche.accroche.slice(0, 160),
  };
}

export default async function FondamentauxFichePage({ params }: Props) {
  const fiche = FICHES.find((x) => x.id === params.id);
  if (!fiche) notFound();

  const access = await getContentAccess();
  const locked = access.tier === 'freemium' && !FREEMIUM_UNLOCKED_IDS.has(fiche.id);

  const inner = (
    <div className='min-h-[calc(100vh-4rem)] bg-navy-950'>
      <FondamentauxViewTracker ficheId={fiche.id} />
      <div className='mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10'>
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
