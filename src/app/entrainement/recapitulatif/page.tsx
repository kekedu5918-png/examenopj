import type { Metadata } from 'next';

import { RecapitulatifPageClient } from '@/components/recapitulatif/RecapitulatifPageClient';

export const metadata: Metadata = {
  title: 'Récapitulatif — Examen OPJ',
  description:
    'Tableau synthétique des infractions : éléments légal, matériel et moral (F01 à F07).',
};

type RecapSearch = { f?: string; priorite?: string };

export default function EntrainementRecapitulatifPage({ searchParams }: { searchParams: RecapSearch }) {
  const prioriteOn = searchParams.priorite === '1' || searchParams.priorite === 'true';
  return <RecapitulatifPageClient initialFasc={searchParams.f} initialPrioriteVue={prioriteOn} />;
}
