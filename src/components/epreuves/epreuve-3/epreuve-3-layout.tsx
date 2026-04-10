'use client';

import { Epreuve3Header } from '@/components/epreuves/epreuve-3/epreuve-3-header';
import { Epreuve3Sections } from '@/components/epreuves/epreuve-3/epreuve-3-sections';
import { InteriorPageShell } from '@/components/layout/InteriorPageShell';

type Epreuve3LayoutProps = {
  /** Quand false, le contenu est rendu sans enveloppe (ex. page parente fournit déjà le shell). */
  wrapWithShell?: boolean;
};

export function Epreuve3Layout({ wrapWithShell = true }: Epreuve3LayoutProps) {
  const inner = (
    <>
      <Epreuve3Header />
      <Epreuve3Sections />
    </>
  );

  if (!wrapWithShell) {
    return inner;
  }

  return (
    <InteriorPageShell maxWidth='7xl' glow='violet' pad='none'>
      {inner}
    </InteriorPageShell>
  );
}
