import type { Metadata } from 'next';

import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';

import { BadgesGalleryClient } from './BadgesGalleryClient';

const title = 'Mes badges — Examen OPJ';
const description =
  'Suivez votre progression : badges débloqués (streak, sessions, sans-faute thématique) et étapes restantes.';

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: false },
};

export default function BadgesPage() {
  return (
    <InteriorPageShell maxWidth='5xl' glow={SHELL_GLOW.dashboard} pad='default'>
      <SectionTitle
        badge='GAMIFICATION'
        badgeClassName='bg-amber-500/15 text-amber-200'
        title='Mes badges'
        subtitle="Chaque session, chaque jour, chaque sans-faute compte. Visualisez les badges déjà débloqués et les prochains à atteindre."
        size='display'
        titleGradient
        titleAs='h1'
        className='mb-10'
      />
      <BadgesGalleryClient />
    </InteriorPageShell>
  );
}
