'use client';

import { Epreuve1Header } from '@/components/epreuves/epreuve-1/epreuve-1-header';
import { Epreuve1Sections } from '@/components/epreuves/epreuve-1/epreuve-1-sections';
import { InteriorPageShell } from '@/components/layout/InteriorPageShell';

export function Epreuve1Layout() {
  return (
    <InteriorPageShell maxWidth='7xl' glow='rose' pad='none'>
      <Epreuve1Header />
      <Epreuve1Sections />
    </InteriorPageShell>
  );
}
