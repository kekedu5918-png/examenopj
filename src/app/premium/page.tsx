import { permanentRedirect } from 'next/navigation';

/**
 * `/premium` redirige en 308 (permanentRedirect) vers `/pricing` (URL canonique).
 * Évite duplicate content SEO et confusion des libellés (Premium / Tarifs).
 */
export const dynamic = 'force-static';

export default function PremiumPage(): never {
  permanentRedirect('/pricing');
}
