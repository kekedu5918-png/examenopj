import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ContentPremiumOverlay } from '@/components/access/ContentPremiumOverlay';
import { EnqueteDetailClient } from '@/components/enquetes/EnqueteDetailClient';
import { getEnqueteById } from '@/data/enquetes-data';
import { getContentAccess } from '@/features/access/get-content-access';

/** Accès selon la session : ne pas figer le gate Premium au build. */
export const dynamic = 'force-dynamic';

type Props = { params: { id: string } };

export function generateMetadata({ params }: Props): Metadata {
  const e = getEnqueteById(params.id);
  if (!e) return {};
  return {
    title: `${e.code} — ${e.titre}`,
    description: e.resume,
  };
}

export default async function EnqueteDetailPage({ params }: Props) {
  const enquete = getEnqueteById(params.id);
  if (!enquete) notFound();

  const access = await getContentAccess();
  const locked = enquete.premium && access.tier === 'freemium';

  const inner = <EnqueteDetailClient enquete={enquete} />;

  if (locked) {
    return (
      <ContentPremiumOverlay
        title={`Enquête ${enquete.code} — réservée au Premium`}
        description="Cette enquête (planches ou fiche péda complète) est débloquée avec l’offre Premium. L’enquête Alpha reste disponible comme exemple gratuit avec documents PDF."
      >
        {inner}
      </ContentPremiumOverlay>
    );
  }

  return inner;
}
