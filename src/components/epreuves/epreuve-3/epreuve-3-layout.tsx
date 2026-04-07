'use client';

import { Epreuve3Header } from '@/components/epreuves/epreuve-3/epreuve-3-header';
import { Epreuve3Sections } from '@/components/epreuves/epreuve-3/epreuve-3-sections';
import { EpreuveRessourcesLinks } from '@/components/epreuves/EpreuveRessourcesLinks';

export function Epreuve3Layout() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-navy-950 via-[#0a1412] to-navy-950'>
      <div className='mx-auto w-full max-w-7xl px-6'>
        <Epreuve3Header />
        <div className='pb-8'>
          <EpreuveRessourcesLinks epreuve='3' />
        </div>
        <Epreuve3Sections />
      </div>
    </div>
  );
}
