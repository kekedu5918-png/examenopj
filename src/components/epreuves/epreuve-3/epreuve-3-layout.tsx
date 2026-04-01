'use client';

import { Epreuve3Header } from '@/components/epreuves/epreuve-3/epreuve-3-header';
import { Epreuve3Sections } from '@/components/epreuves/epreuve-3/epreuve-3-sections';
import { Epreuve3StickyToc } from '@/components/epreuves/epreuve-3/sticky-toc';

export function Epreuve3Layout() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-navy-950 via-[#0a1412] to-navy-950'>
      <div className='mx-auto flex w-full max-w-7xl gap-8 px-6 lg:gap-12'>
        <div className='min-w-0 flex-1'>
          <Epreuve3Header />
          <Epreuve3Sections />
        </div>
        <Epreuve3StickyToc />
      </div>
    </div>
  );
}
