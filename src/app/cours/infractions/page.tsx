import { redirect } from 'next/navigation';

/**
 * URL logique « module Cours → Infractions » : une seule source de vérité sur /infractions (SEO + données).
 */
export default function CoursInfractionsRedirectPage() {
  redirect('/infractions');
}
