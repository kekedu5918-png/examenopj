'use client';

import { Epreuve2Header } from '@/components/epreuves/epreuve-2/epreuve-2-header';
import { Epreuve2Methodology } from '@/components/epreuves/epreuve-2/epreuve-2-methodology';
import { Epreuve2Sections } from '@/components/epreuves/epreuve-2/epreuve-2-sections';
import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';

export function Epreuve2Layout() {
  return (
    <InteriorPageShell maxWidth='7xl' glow={SHELL_GLOW.epreuve2} pad='none'>
      <Epreuve2Header />
      <Epreuve2Methodology />
      <Epreuve2Sections />
    </InteriorPageShell>
  );
}
