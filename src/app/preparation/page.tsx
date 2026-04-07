import type { Metadata } from 'next';
import Link from 'next/link';

import { MaPreparationHub } from '@/components/preparation/MaPreparationHub';

export const metadata: Metadata = {
  title: 'Ma préparation — Examen OPJ',
  description:
    'Plan personnalisé en 60 secondes : prochaine action, raccourcis et priorisation pour la révision OPJ (stockage local).',
};

export default function PreparationPage() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-navy-950 via-slate-950 to-navy-950'>
      <div className='container max-w-4xl py-10 md:py-14'>
        <nav className='mb-8 text-sm text-gray-500'>
          <Link href='/' className='text-violet-400 hover:text-violet-300'>
            Accueil
          </Link>
          <span className='mx-2'>/</span>
          <span className='text-gray-400'>Ma préparation</span>
        </nav>
        <MaPreparationHub variant='full' autoOpenOnboarding />
        <p className='mt-8 text-center text-xs text-gray-500'>
          <Link href='/login' className='text-violet-400 hover:underline'>
            Connectez-vous
          </Link>{' '}
          pour synchroniser quiz et progression sur votre compte (en complément du plan local).
        </p>
      </div>
    </div>
  );
}
