'use client';

import { Epreuve2Header } from '@/components/epreuves/epreuve-2/epreuve-2-header';
import { Epreuve2Methodology } from '@/components/epreuves/epreuve-2/epreuve-2-methodology';
import { Epreuve2Sections } from '@/components/epreuves/epreuve-2/epreuve-2-sections';
import { InteriorPageShell } from '@/components/layout/InteriorPageShell';

export function Epreuve2Layout() {
  return (
    <InteriorPageShell maxWidth='7xl' glow='blue' pad='none'>
      <Epreuve2Header />
      <Epreuve2Methodology />
      <Epreuve2Sections />
    </InteriorPageShell>
  );
}
