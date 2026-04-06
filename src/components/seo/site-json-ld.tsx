import { APP_NAME, APP_TAGLINE } from '@/constants/site';
import { getSiteUrl } from '@/utils/site-url';

/** Données structurées : Organization, site Web + recherche, organisation éducative. */
export function SiteJsonLd() {
  const url = getSiteUrl();
  const payload = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'EducationalOrganization',
        '@id': `${url}/#organization`,
        name: APP_NAME,
        url,
        description: APP_TAGLINE,
        inLanguage: 'fr-FR',
      },
      {
        '@type': 'WebSite',
        '@id': `${url}/#website`,
        name: APP_NAME,
        url,
        description: APP_TAGLINE,
        inLanguage: 'fr-FR',
        publisher: { '@id': `${url}/#organization` },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${url}/infractions?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
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
