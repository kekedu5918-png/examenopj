import type { Metadata } from 'next';

import { ArticulationExercice } from '@/components/entrainement/ArticulationExercice';

export const metadata: Metadata = {
  title: 'Exercice Articulation — Épreuve 2 OPJ',
  description:
    "Construisez votre articulation de procédure cartouche par cartouche. Entraînement épreuve 2 examen OPJ.",
};

export default function EntrainementArticulationPage() {
  return <ArticulationExercice />;
}
