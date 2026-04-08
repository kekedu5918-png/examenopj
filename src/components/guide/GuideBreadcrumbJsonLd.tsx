import { getSiteUrl } from '@/utils/site-url';

export function GuideBreadcrumbJsonLd() {
  const base = getSiteUrl();
  const payload = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${base}/` },
      { '@type': 'ListItem', position: 2, name: 'Guide de révision OPJ', item: `${base}/guide-revision-opj` },
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
