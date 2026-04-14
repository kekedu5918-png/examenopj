import { redirect } from 'next/navigation';

/** Ancienne route : les fiches pédagogiques sont sous /fondamentaux. */
export default function DashboardCoursesRedirectPage() {
  redirect('/fondamentaux');
}
