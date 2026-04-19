import { permanentRedirect } from 'next/navigation';

/**
 * `/premium` est conservé en redirection 301 vers `/pricing` (URL canonique).
 * Évite duplicate content SEO et confusion des libellés (Premium / Tarifs).
 */
export const dynamic = 'force-static';

export default function PremiumPage(): never {
  permanentRedirect('/pricing');
}
