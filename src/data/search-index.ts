import { NAV_GROUPS } from '@/app/navigation';

export type SearchIndexItem = {
  href: string;
  label: string;
  group: string;
  keywords?: string;
};

const EXTRA: SearchIndexItem[] = [
  { href: '/preparation', label: 'Ma préparation', group: 'Parcours', keywords: 'plan onboarding hub' },
  { href: '/parcours-candidat', label: 'Parcours candidat', group: 'Parcours' },
  { href: '/programme', label: 'Programme officiel', group: 'Référence' },
  { href: '/pricing', label: 'Tarifs Premium', group: 'Compte', keywords: 'abonnement' },
  { href: '/contact', label: 'Contact', group: 'Site' },
  { href: '/a-propos', label: 'À propos', group: 'Site' },
];

/** Index léger pour la recherche globale (titres + routes). */
export function getSearchIndex(): SearchIndexItem[] {
  const fromNav = NAV_GROUPS.flatMap((g) =>
    g.links.map((l) => ({
      href: l.href,
      label: l.label,
      group: g.label,
    })),
  );
  return [...fromNav, ...EXTRA];
}
