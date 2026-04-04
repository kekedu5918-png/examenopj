import type { Metadata } from 'next';
import Link from 'next/link';

import { EnqueteHub } from '@/components/enquetes/EnqueteHub';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ENQUETES } from '@/data/enquetes-data';

export const metadata: Metadata = {
  title: 'Enquêtes FIOPJ — Examen OPJ',
  description:
    'Planches pédagogiques Alpha et Bravo : sujet, articulation de procédure, procès-verbal et rapport de synthèse (formation initiale OPJ).',
};

export default function EnquetesHubPage() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-navy-950 via-[#0a1412] to-navy-950'>
      <div className='container pb-20 pt-10 md:pt-14'>
        <nav className='mb-6 text-sm text-gray-500'>
          <Link href='/cours' className='text-violet-400 hover:text-violet-300'>
            Cours
          </Link>
          <span className='mx-2'>/</span>
          <span className='text-gray-400'>Enquêtes</span>
        </nav>
        <SectionTitle
          badge='FIOPJ'
          badgeClassName='bg-violet-500/20 text-violet-200'
          title='Enquêtes planches'
          subtitle='Thèmes Alpha (flagrance) et Bravo (changement de cadre) : articulation, PV rédigé, rapport — documents officiels en fac-similé et PDF.'
          className='mb-10'
        />
        <EnqueteHub enquetes={ENQUETES} />
      </div>
    </div>
  );
}
