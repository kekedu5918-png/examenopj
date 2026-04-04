'use client';

import { Epreuve1Header } from '@/components/epreuves/epreuve-1/epreuve-1-header';
import { Epreuve1Sections } from '@/components/epreuves/epreuve-1/epreuve-1-sections';

export function Epreuve1Layout() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-navy-950 via-[#100a0c] to-navy-950'>
      <div className='mx-auto w-full max-w-7xl px-6'>
        <Epreuve1Header />
        <Epreuve1Sections />
      </div>
    </div>
  );
}
