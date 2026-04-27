/** @vitest-environment jsdom */

import { describe, expect, it, vi } from 'vitest';

import type { FicheFrontmatterV3 } from '@/lib/fondamentaux/fiche-frontmatter-v3';
import { render, screen } from '@testing-library/react';

import { FichePremium } from './FichePremium';

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    ...rest
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

const mockData: FicheFrontmatterV3 = {
  title: 'Test fiche V3',
  chapitre: 1,
  partie: 2,
  description: 'Sous-titre hero de démonstration pour le scaffolding 2H.2.',
  tags: [],
  loi2025: true,
  derniereMiseAJour: '2025-12-01',
  articlesCles: [
    'Art. 1 — A',
    'Art. 2 — B',
    'Art. 3 — C',
    'Art. 4 — D',
    'Art. 5 — E',
  ],
  stats: [
    { num: '1', label: 'A' },
    { num: '2', label: 'B' },
    { num: '3', label: 'C' },
    { num: '4', label: 'D' },
  ],
  schemaMemo: {
    type: 'tableau',
    titre: 'Tableau test',
    rows: [{ Col1: 'a', Col2: 'b' }],
  },
  blocs: {
    definition: 'Def',
    piege: 'Piege',
    pointCle: 'Cle',
    memo: 'Memo',
  },
  plan: [{ num: '1', titre: 'Plan', duree: '1' }],
};

describe('FichePremium (scaffolding 2H.2)', () => {
  it('rend le shell avec data-testid et titre', () => {
    render(
      <FichePremium
        data={mockData}
        slug='enquete-flagrance'
        callout30s='Résumé express.'
        breadcrumbItems={[
          { href: '/fondamentaux', label: 'Fondamentaux' },
          { href: '/fondamentaux/enquete-flagrance', label: mockData.title },
        ]}
        footerCtas={[
          { href: '/quiz', label: 'Quiz' },
          { href: '/fondamentaux', label: 'Hub' },
        ]}
      />,
    );

    expect(screen.getByTestId('fiche-premium')).toBeTruthy();
    expect(screen.getByTestId('fiche-hero')).toBeTruthy();
    expect(screen.getByRole('heading', { level: 1, name: mockData.title })).toBeTruthy();
    expect(screen.getByTestId('fiche-stats')).toBeTruthy();
    expect(screen.getByTestId('fiche-callout-30s')).toBeTruthy();
  });
});
