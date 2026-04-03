import { redirect } from 'next/navigation';

/** Ancienne route « Cours » : les fascicules sont sur `/fascicules`. */
export default function CoursRedirectPage() {
  redirect('/fascicules');
}
