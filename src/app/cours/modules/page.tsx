import type { Metadata } from 'next';
import Link from 'next/link';

import { type CoursModuleExplorerItem, CoursModulesExplorer } from '@/components/cours/CoursModulesExplorer';
import { CoursModulesJsonLd } from '@/components/cours/CoursModulesJsonLd';
import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { fasciculesList } from '@/data/fascicules-list';
import type { Domain } from '@/data/fascicules-types';
import { openGraphForPage } from '@/utils/seo-metadata';

const modsTitle = 'Modules de cours — Programme OPJ';
const modsDescription =
  'Fiches thématiques : vue priorité examen OPJ (P0 / P1) ou index officiel par domaine, fondamentaux en appui. Préparation examen 2026.';

export const metadata: Metadata = {
  title: modsTitle,
  description: modsDescription,
  alternates: { canonical: '/cours/modules' },
  ...openGraphForPage('/cours/modules', modsTitle, modsDescription),
};

function moduleDomain(m: (typeof fasciculesList)[number]): Domain {
  if (m.domaine === 'DPS') return 'DPS';
  if (m.domaine === 'DPG') return 'DPG';
  return 'PROCEDURE';
}

const explorerModules: CoursModuleExplorerItem[] = fasciculesList.map((m) => ({
  id: m.id,
  numero: m.numero,
  titre: m.titre,
  accroche: m.accroche,
  domain: moduleDomain(m),
}));

export default function CoursModulesPage() {
  return (
    <InteriorPageShell maxWidth='6xl' glow={SHELL_GLOW.modulesIndex} pad='default'>
      <CoursModulesJsonLd />
      <nav className='mb-6 text-sm text-gray-500'>
        <Link href='/cours' className='text-cyan-400 hover:underline'>
          Cours
        </Link>
        <span className='mx-2'>/</span>
        <span className='text-gray-400'>Modules</span>
      </nav>

      <SectionTitle
        badge='COURS'
        badgeClassName='bg-cyan-500/20 text-cyan-200'
        title='Modules thématiques'
        subtitle='Fiches triées par priorité examen OPJ par défaut — ou en vue programme officiel. Filtrez par domaine ou recherchez un thème.'
        size='display'
        titleGradient
        titleAs='h1'
        className='mb-8'
      />

      {/* Bandeau logique d'étude — compact */}
      <div className='mb-8 flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm'>
        <span className='font-medium text-gray-300'>Logique d&apos;étude :</span>
        <Link
          href='/fondamentaux'
          className='rounded-lg border border-violet-500/35 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-200 transition hover:bg-violet-500/15'
        >
          Fiches fondamentaux →
        </Link>
        <Link
          href='/infractions'
          className='rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-xs font-medium text-rose-200 transition hover:bg-rose-500/15'
        >
          Référentiel infractions →
        </Link>
        <Link
          href='/quiz'
          className='rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-200 transition hover:bg-cyan-500/20'
        >
          Quiz
        </Link>
        <Link
          href='/flashcards'
          className='rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-200 transition hover:bg-amber-500/20'
        >
          Flashcards
        </Link>
      </div>

      <CoursModulesExplorer modules={explorerModules} defaultView='priority' />
    </InteriorPageShell>
  );
}
