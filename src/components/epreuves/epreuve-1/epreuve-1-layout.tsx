'use client';

import { Epreuve1Header } from '@/components/epreuves/epreuve-1/epreuve-1-header';
import { Epreuve1Sections } from '@/components/epreuves/epreuve-1/epreuve-1-sections';
import { StickyToc } from '@/components/epreuves/epreuve-1/sticky-toc';

export function Epreuve1Layout() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-navy-950 via-[#100a0c] to-navy-950'>
      <div className='mx-auto flex w-full max-w-7xl gap-8 px-6 lg:gap-12'>
        <div className='min-w-0 flex-1'>
          <Epreuve1Header />
          <Epreuve1Sections />
        </div>
        <StickyToc />
      </div>
    </div>
  );
}
