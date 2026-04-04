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
        title="Enquête Bravo — réservée au Premium"
        description="L'enquête Bravo (violences aggravées, changement de cadre, saisine incidente) et les enquêtes suivantes sont accessibles avec l'offre Premium. L'enquête Alpha reste disponible comme exemple complet."
      >
        {inner}
      </ContentPremiumOverlay>
    );
  }

  return inner;
}
