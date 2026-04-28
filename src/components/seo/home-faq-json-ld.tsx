import { HOME_PAGE_FAQ_ITEMS } from '@/data/home-faq';

/** FAQPage — doit refléter le contenu visible dans [`HomeFaqSection`](./home-faq-section.tsx). */
export function HomeFaqJsonLd() {
  const payload = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOME_PAGE_FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
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
