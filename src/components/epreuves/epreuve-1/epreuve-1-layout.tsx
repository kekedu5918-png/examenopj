'use client';

import { Epreuve1Header } from '@/components/epreuves/epreuve-1/epreuve-1-header';
import { Epreuve1Sections } from '@/components/epreuves/epreuve-1/epreuve-1-sections';
import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';

export function Epreuve1Layout() {
  return (
    <InteriorPageShell maxWidth='7xl' glow={SHELL_GLOW.epreuve1} pad='none'>
      <Epreuve1Header />
      <Epreuve1Sections />
    </InteriorPageShell>
  );
}
