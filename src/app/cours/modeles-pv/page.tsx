import { Suspense } from 'react';
import type { Metadata } from 'next';

import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
import { ModelesPVIndexClient } from '@/components/modeles-pv/ModelesPVIndexClient';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { MODELES_PV } from '@/data/modeles-pv';

export const metadata: Metadata = {
  title: 'Modèles de procès-verbaux OPJ | ExamenOPJ',
  description:
    "Bibliothèque officielle des PV de l'examen OPJ : plainte, GAV, interpellation, perquisition, audition suspect. Formules légales et cartouches reproduits depuis le fascicule SDCP (version 01/12/2025).",
  robots: { index: true, follow: true },
};

function ModelesPVFallback() {
  return (
    <div className='mx-auto max-w-6xl px-4 py-16 text-center text-sm text-examen-inkMuted'>
      Chargement de la bibliothèque…
    </div>
  );
}

export default function ModelesPVIndexPage() {
  return (
    <InteriorPageShell maxWidth='6xl' glow={SHELL_GLOW.modelesPv} pad='default'>
      <div className='border-b border-white/[0.06] pb-6'>
        <SectionTitle
          badge='Cours'
          badgeClassName='bg-emerald-500/20 text-emerald-200'
          title='Modèles de procès-verbaux — Fascicule officiel SDCP'
          subtitle='Mise en forme officielle, formules légales et cartouches — reproduits mot pour mot depuis le fascicule La procédure pénale policière (version 01/12/2025). Vérifiez toujours votre édition et Légifrance.'
          size='display'
          titleGradient
          titleAs='h1'
          className='mb-0'
        />
      </div>
      <Suspense fallback={<ModelesPVFallback />}>
        <ModelesPVIndexClient modeles={MODELES_PV} />
      </Suspense>
    </InteriorPageShell>
  );
}
