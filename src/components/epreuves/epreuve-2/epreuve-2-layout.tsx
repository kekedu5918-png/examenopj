'use client';

import { Epreuve2Header } from '@/components/epreuves/epreuve-2/epreuve-2-header';
import { Epreuve2Sections } from '@/components/epreuves/epreuve-2/epreuve-2-sections';
import { Epreuve2StickyToc } from '@/components/epreuves/epreuve-2/sticky-toc';

export function Epreuve2Layout() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-navy-950 via-[#0a1412] to-navy-950'>
      <div className='mx-auto flex w-full max-w-7xl gap-6 px-0 lg:gap-10'>
        <div className='min-w-0 flex-1'>
          <Epreuve2Header />
          <Epreuve2Sections />
        </div>
        <Epreuve2StickyToc />
      </div>
    </div>
  );
}
