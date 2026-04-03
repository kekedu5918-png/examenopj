import { RecapitulatifPageClient } from '@/components/recapitulatif/RecapitulatifPageClient';

export const metadata = {
  title: 'Récapitulatif — Examen OPJ',
  description:
    'Tableau synthétique des infractions : éléments légal, matériel et moral (F01, F02).',
};

export default function RecapitulatifPage() {
  return <RecapitulatifPageClient />;
}
