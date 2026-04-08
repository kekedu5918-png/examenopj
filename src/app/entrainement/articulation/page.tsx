import type { Metadata } from 'next';

import { ArticulationModesShell } from '@/components/entrainement/ArticulationModesShell';
import { getEnqueteById } from '@/data/enquetes-data';

export const metadata: Metadata = {
  title: 'Exercice Articulation — Épreuve 2 OPJ',
  description:
    "Construisez votre articulation de procédure cartouche par cartouche. Entraînement épreuve 2 examen OPJ.",
};

type Props = { searchParams?: { ref?: string } };

function suggestedTitreFromRef(ref: string | undefined): string | undefined {
  if (!ref) return undefined;
  const e = getEnqueteById(ref);
  if (!e) return undefined;
  return `ARTICULATION DE PROCÉDURE — Enquête ${e.code} — ${e.procedure} — ${e.qualification}`;
}

export default function EntrainementArticulationPage({ searchParams }: Props) {
  const ref = searchParams?.ref?.toLowerCase();
  const suggestedTitre = suggestedTitreFromRef(ref);
  return <ArticulationModesShell referenceEnqueteId={ref} suggestedTitre={suggestedTitre} />;
}
