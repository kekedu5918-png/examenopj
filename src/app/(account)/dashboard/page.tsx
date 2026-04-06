import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { fasciculesList, getCourseModuleById } from '@/data/fascicules-list';
import { getSession } from '@/features/account/controllers/get-session';
import { getModules, getRecentQuizAttempts, getRevisionStats } from '@/features/examenopj/controllers/get-dashboard-data';

function formatQuizMode(row: { mode: string; fascicule_num: number | null; domain_key: string | null }): string {
  if ((row.mode === 'fascicule' || row.mode === 'module') && row.fascicule_num != null) {
    return `F${String(row.fascicule_num).padStart(2, '0')}`;
  }
  if (row.mode === 'domain' && row.domain_key) return row.domain_key;
  if (row.mode === 'global') return 'Global';
  return row.mode;
}

function fasciculeModuleFromAttempt(row: { mode: string; fascicule_num: number | null }) {
  if ((row.mode !== 'fascicule' && row.mode !== 'module') || row.fascicule_num == null) return null;
  return fasciculesList.find((f) => f.numero === row.fascicule_num) ?? null;
}

export default async function DashboardPage() {
  const session = await getSession();
  const [modules, revisionStats, recentAttempts] = session
    ? await Promise.all([getModules(), getRevisionStats(session.user.id), getRecentQuizAttempts(session.user.id, 1)])
    : await Promise.all([getModules(), Promise.resolve(null), Promise.resolve([])]);

  const lastAttempt = recentAttempts[0] ?? null;
  const lastModuleMeta = lastAttempt ? fasciculeModuleFromAttempt(lastAttempt) : null;
  const featuredModules = modules.slice(0, 6);

  return (
    <section className='space-y-6 rounded-xl bg-slate-950 p-6'>
      <header>
        <div className='flex flex-wrap items-center gap-2'>
          <h1 className='text-3xl font-bold text-slate-50'>Bienvenue sur ExamenOPJ</h1>
          <Badge variant='examen' className='text-xs'>
            {modules.length} fascicules disponibles
          </Badge>
        </div>
        <p className='mt-2 max-w-3xl text-slate-300'>
          Chaque fiche cours indique le poids du thème aux Épreuves 1–3 et renvoie vers quiz, articulation et sujets blancs
          associés. Utilisez les raccourcis ci-dessous pour enchaîner théorie et entraînement.
        </p>
      </header>

      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        {[
          { titre: 'Hub Cours (par où commencer)', href: '/cours' },
          { titre: 'Toutes les fiches F01–F15', href: '/cours/modules' },
          { titre: 'Entraînement par épreuve', href: '/entrainement' },
          { titre: 'Sujets blancs complets', href: '/sujets-blancs' },
          { titre: 'Réviser les infractions', href: '/dashboard/infractions' },
          { titre: 'Ma progression', href: '/dashboard/progression' },
          { titre: 'Recherche', href: '/dashboard/recherche' },
        ].map((item) => (
          <Button key={item.href} asChild variant='secondary' className='justify-start'>
            <Link href={item.href}>{item.titre}</Link>
          </Button>
        ))}
      </div>

      <Card className='border border-cyan-500/30 bg-slate-900/70'>
        <CardHeader>
          <CardTitle className='text-slate-100'>Reprendre la session</CardTitle>
          <CardDescription className='text-slate-300'>
            Recommandation basée sur votre activité enregistrée sur le compte.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-3 text-sm text-slate-200'>
          {lastAttempt ? (
            <>
              <p>
                Dernier quiz : <span className='font-semibold text-cyan-300'>{formatQuizMode(lastAttempt)}</span> -
                {` ${lastAttempt.score}/${lastAttempt.total} `}
                ({Number(lastAttempt.percent).toFixed(0)} %)
              </p>
              <p className='text-slate-400'>
                Dernière activité : {lastAttempt.created_at ? new Date(lastAttempt.created_at).toLocaleString('fr-FR') : 'n/a'}
              </p>
              <div className='flex flex-wrap gap-2'>
                {lastModuleMeta ? (
                  <>
                    <Button asChild className='bg-cyan-600 hover:bg-cyan-700'>
                      <Link href={`/cours/modules/${lastModuleMeta.id}`}>
                        Revoir la fiche {formatQuizMode(lastAttempt)}
                      </Link>
                    </Button>
                    <Button asChild variant='secondary'>
                      <Link href={`/quiz?mode=module&f=${lastModuleMeta.id}`}>Quiz sur ce thème</Link>
                    </Button>
                  </>
                ) : (
                  <Button asChild className='bg-cyan-600 hover:bg-cyan-700'>
                    <Link href='/quiz'>Continuer les quiz</Link>
                  </Button>
                )}
                <Button asChild variant='outline' className='border-slate-600'>
                  <Link href='/sujets-blancs'>Passer en sujet blanc</Link>
                </Button>
                <Button asChild variant='secondary'>
                  <Link href='/dashboard/progression'>Ma progression</Link>
                </Button>
              </div>
            </>
          ) : (
            <>
              <p>Aucune session enregistrée pour le moment. Commencez un premier entraînement ciblé.</p>
              <Button asChild className='bg-cyan-600 hover:bg-cyan-700'>
                <Link href='/dashboard/infractions'>Démarrer mon premier quiz</Link>
              </Button>
            </>
          )}

          {revisionStats ? (
            <div className='flex flex-wrap gap-2 pt-1'>
              <Badge variant='outline'>Révisions dues: {revisionStats.revisionDue}</Badge>
              <Badge variant='outline'>Maîtrisées: {revisionStats.mastered}</Badge>
              <Badge variant='outline'>Score moyen: {revisionStats.averageScore.toFixed(2)} / 5</Badge>
            </div>
          ) : null}
        </CardContent>
      </Card>

      <Card className='border border-blue-500/30 bg-slate-900/70'>
        <CardHeader>
          <CardTitle className='text-slate-100'>Plan de départ recommandé</CardTitle>
          <CardDescription className='text-slate-300'>
            Une trajectoire simple pour les premières sessions de révision.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-2 text-sm text-slate-200'>
          <p>1. Parcourez le hub Cours : fil en 7 leçons ou parcours candidat selon votre niveau.</p>
          <p>2. Pour chaque fiche F : lire le bloc « Concours » puis quiz / flashcards sur le même thème.</p>
          <p>3. À mi-parcours : articulation ou enquête type ; en fin : sujet blanc sur les trois épreuves.</p>
        </CardContent>
      </Card>

      <div className='flex flex-wrap items-center justify-between gap-3'>
        <h2 className='text-xl font-semibold text-slate-100'>Aperçu des fascicules</h2>
        <Button asChild variant='outline' className='border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800'>
          <Link href='/cours/modules'>Voir tous les fascicules</Link>
        </Button>
      </div>

      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
        {featuredModules.map((module) => {
          const coursePath = getCourseModuleById(module.slug)
            ? `/cours/modules/${module.slug}`
            : '/cours/modules';
          return (
            <Card key={module.id} className='border-l-4 border-blue-500 bg-slate-900 shadow-md hover:shadow-xl'>
              <CardHeader>
                <CardTitle className='text-slate-100'>
                  {module.slug} - {module.titre}
                </CardTitle>
                <CardDescription className='text-slate-300'>
                  {module.description ?? 'Module pédagogique ExamenOPJ.'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className='bg-blue-600 hover:bg-blue-700'>
                  <Link href={coursePath}>Ouvrir la fiche cours</Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
