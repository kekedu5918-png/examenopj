import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { PrepareSujetBlancPrerequis } from '@/components/sujets-blancs/PrepareSujetBlancPrerequis';
import { SujetBlancDetailClient } from '@/components/sujets-blancs/SujetBlancDetailClient';
import { getSujetBlancById, getSujetsBlancsIds } from '@/data/sujets-blancs';
import { hasPremiumAccess } from '@/features/account/controllers/has-premium-access';

type Props = { params: { id: string } };

export function generateStaticParams() {
  return getSujetsBlancsIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getSujetBlancById(params.id);
  if (!s) return { title: 'Sujet introuvable' };
  return {
    title: `${s.titre} — Sujet blanc`,
    description: s.description,
  };
}

export default async function SujetBlancDetailPage({ params }: Props) {
  const sujet = getSujetBlancById(params.id);
  if (!sujet) notFound();

  const userHasPremium = await hasPremiumAccess();

  return (
    <InteriorPageShell maxWidth='4xl' glow='blue' pad='default'>
      <nav className='mb-6 text-sm text-examen-inkMuted'>
        <Link href='/sujets-blancs' className='text-examen-accent hover:underline'>
          Sujets blancs
        </Link>
        <span className='mx-2'>/</span>
        <span className='text-examen-ink'>{sujet.titre}</span>
      </nav>

      <header className='mb-8'>
        <h1 className='font-display text-2xl font-bold text-white md:text-3xl'>{sujet.titre}</h1>
        <p className='mt-2 text-sm text-examen-inkMuted'>{sujet.description}</p>
        <p className='mt-2 text-xs font-semibold uppercase tracking-wide text-examen-accent'>Thème : {sujet.theme}</p>
      </header>

      <PrepareSujetBlancPrerequis sujet={sujet} />

      <SujetBlancDetailClient sujet={sujet} userHasPremium={userHasPremium} />
    </InteriorPageShell>
  );
}
