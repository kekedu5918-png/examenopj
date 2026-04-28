import { APP_NAME } from '@/constants/site';
import { getSiteUrl } from '@/utils/site-url';

type Props = {
  title: string;
  description: string;
  slug: string;
};

/** Course + fil d’Ariane structurés pour les fiches fondamentaux (visible sur la page). */
export function FondamentauxFicheJsonLd({ title, description, slug }: Props) {
  const base = getSiteUrl();
  const url = `${base}/fondamentaux/${slug}`;
  const payload = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Fondamentaux',
            item: `${base}/fondamentaux`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: title,
            item: url,
          },
        ],
      },
      {
        '@type': 'Course',
        '@id': `${url}#course`,
        name: title,
        description: description.slice(0, 500),
        provider: {
          '@type': 'Organization',
          name: APP_NAME,
          url: base,
        },
        educationalLevel: 'professional',
        inLanguage: 'fr-FR',
        url,
      },
    ],
  };

  return (
    <script
      type='application/ld+json'
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
