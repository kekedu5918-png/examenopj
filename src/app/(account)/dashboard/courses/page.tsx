import { redirect } from 'next/navigation';

/** Ancien « parser MVP » : les fiches de cours sont sur le parcours public /cours/modules. */
export default function DashboardCoursesRedirectPage() {
  redirect('/cours/modules');
}
