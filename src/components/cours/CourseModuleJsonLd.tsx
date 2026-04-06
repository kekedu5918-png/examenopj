import type { FasciculeMetadata } from '@/data/fascicules-list';
import { getSiteUrl } from '@/utils/site-url';

type Props = { module: FasciculeMetadata };

export function CourseModuleJsonLd({ module: m }: Props) {
  const base = getSiteUrl();
  const description = `Fiche OPJ — ${m.titre} : axes de travail, pièges fréquents, liens quiz et flashcards. Examen juin 2026.`;

  const payload = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `F${String(m.numero).padStart(2, '0')} — ${m.titre}`,
    description,
    url: `${base}/cours/modules/${m.id}`,
    provider: { '@type': 'Organization', name: 'ExamenOPJ' },
    educationalLevel: 'Professional',
  };

  return (
    <script
      type='application/ld+json'
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
