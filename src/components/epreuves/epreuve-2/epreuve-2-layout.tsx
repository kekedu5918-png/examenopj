'use client';

import { Epreuve2Header } from '@/components/epreuves/epreuve-2/epreuve-2-header';
import { Epreuve2Methodology } from '@/components/epreuves/epreuve-2/epreuve-2-methodology';
import { Epreuve2Sections } from '@/components/epreuves/epreuve-2/epreuve-2-sections';

export function Epreuve2Layout() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-navy-950 via-[#0a1412] to-navy-950'>
      <div className='mx-auto w-full max-w-7xl px-6'>
        <Epreuve2Header />
        <Epreuve2Methodology />
        <Epreuve2Sections />
      </div>
    </div>
  );
}
