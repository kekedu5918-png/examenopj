import { RecapitulatifPageClient } from '@/components/recapitulatif/RecapitulatifPageClient';

export const metadata = {
  title: 'Récapitulatif — Examen OPJ',
  description:
    'Tableau synthétique des infractions : éléments légal, matériel et moral (F01 à F07).',
};

export default function RecapitulatifPage({ searchParams }: { searchParams: { f?: string } }) {
  return <RecapitulatifPageClient initialFasc={searchParams.f} />;
}
