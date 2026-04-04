import type { Metadata } from 'next';

import { FasciculesPageView } from '@/components/fascicules/fascicules-page-view';
import { FASCICULES } from '@/data/fascicules-list';

export const metadata: Metadata = {
  title: 'Fascicules SDCP',
  description: `Les ${FASCICULES.length} fascicules officiels pour l'examen OPJ — droit pénal spécial, général et procédure pénale. Textes alignés version 01/12/2025.`,
};

export default function FasciculesPage() {
  return <FasciculesPageView />;
}
