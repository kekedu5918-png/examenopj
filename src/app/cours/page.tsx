import type { Metadata } from 'next';
import { Suspense } from 'react';

import { CoursPageClient } from '@/components/cours/CoursPageClient';

export const metadata: Metadata = {
  title: 'Cours — Examen OPJ',
  description:
    'Textes des fascicules DPS, DPG et procédure pénale : lecture intégrale des leçons pour la préparation à l’examen.',
};

function CoursFallback() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-navy-950 text-gray-400'>
      <span className='text-sm'>Chargement des cours…</span>
    </div>
  );
}

export default function CoursPage() {
  return (
    <Suspense fallback={<CoursFallback />}>
      <CoursPageClient />
    </Suspense>
  );
}
