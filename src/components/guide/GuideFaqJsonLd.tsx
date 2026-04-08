import { GUIDE_REVISION_FAQ } from '@/data/guide-revision-faq';
import { getSiteUrl } from '@/utils/site-url';

export function GuideFaqJsonLd() {
  const url = `${getSiteUrl()}/guide-revision-opj`;
  const payload = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: GUIDE_REVISION_FAQ.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
    url,
  };

  return (
    <script
      type='application/ld+json'
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
