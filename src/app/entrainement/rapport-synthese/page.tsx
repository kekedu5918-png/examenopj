import type { Metadata } from 'next';
import Link from 'next/link';
import { Lock } from 'lucide-react';

import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { RapportSyntheseAtelierClient } from '@/components/rapport-synthese/RapportSyntheseAtelierClient';
import { RapportSyntheseModesSection } from '@/components/rapport-synthese/RapportSyntheseModesSection';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
import { hasPremiumAccess } from '@/features/account/controllers/has-premium-access';
import { cn } from '@/utils/cn';

export const metadata: Metadata = {
  title: 'Rapport de synthèse — Atelier',
  description:
    "Atelier rapport de synthèse OPJ — dossiers complets, correction IA. Préparez l'épreuve 2 avec des cas réalistes.",
  robots: { index: true, follow: true },
};

export default async function RapportSynthesePage() {
  const ok = await hasPremiumAccess();

  return (
    <InteriorPageShell maxWidth='7xl' glow={SHELL_GLOW.rapportSynthese} pad='default'>
      <SectionTitle
        badge='Premium'
        title='Atelier — rapport de synthèse'
        subtitle='Dossier pièces + rédaction type parquet + correction IA. Le chrono tourne en continu pendant la session.'
        size='display'
        titleGradient
        titleAs='h1'
        className='mb-8'
      />

      <RapportSyntheseModesSection />

      {!ok ? (
        <div
          className={cn(
            'relative rounded-2xl border border-examen-premium/30 bg-examen-premium/10 p-8 text-center',
          )}
        >
          <Lock className='mx-auto h-10 w-10 text-examen-premium' aria-hidden />
          <p className='mt-4 text-sm font-medium text-white'>Cet atelier est réservé aux abonnés Premium.</p>
          <Link
            href='/pricing'
            className='mt-6 inline-flex rounded-lg bg-gradient-to-r from-examen-accent to-examen-premium px-5 py-2.5 text-sm font-semibold text-white hover:brightness-110'
          >
            Passer Premium
          </Link>
        </div>
      ) : (
        <RapportSyntheseAtelierClient />
      )}
    </InteriorPageShell>
  );
}
