import { fasciculesList } from '@/data/fascicules-list';
import { getSiteUrl } from '@/utils/site-url';

/** Liste des 15 modules de cours pour SEO (schema.org ItemList). */
export function CoursModulesJsonLd() {
  const base = getSiteUrl();
  const payload = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Modules de cours OPJ (F01–F15)',
    description:
      'Fiches thématiques officielles : travail par fascicule, quiz et flashcards associés. Préparation examen OPJ 2026.',
    numberOfItems: fasciculesList.length,
    itemListElement: fasciculesList.map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `F${String(m.numero).padStart(2, '0')} — ${m.titre}`,
      url: `${base}/cours/modules/${m.id}`,
    })),
  };

  return (
    <script
      type='application/ld+json'
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
