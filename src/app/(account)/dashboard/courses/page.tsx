import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getLatestChapitres, getLatestFlashcards } from '@/features/examenopj/controllers/get-dashboard-data';

export default async function CoursesPage() {
  const [chapitres, flashcards] = await Promise.all([getLatestChapitres(40), getLatestFlashcards(12)]);
  const sortedChapitres = [...chapitres].sort((a, b) => a.titre.localeCompare(b.titre, 'fr'));

  return (
    <section className='space-y-4 rounded-xl bg-slate-950 p-6'>
      <h1 className='text-2xl font-bold text-slate-50'>Cours (MVP parser)</h1>
      <p className='text-slate-300'>Contenu structure charge depuis Supabase (chapitres + flashcards).</p>
      <div className='grid gap-4 md:grid-cols-2'>
        {sortedChapitres.map((course) => (
          <Card key={course.id} className='bg-slate-900'>
            <CardHeader className='flex flex-row items-center justify-between gap-3'>
              <CardTitle className='text-slate-100'>{course.titre}</CardTitle>
              <Badge variant='secondary'>{course.difficulte ?? 'moyen'}</Badge>
            </CardHeader>
            <CardContent className='text-slate-300'>Articles: {course.articles?.join(', ') || 'non renseignes'}</CardContent>
          </Card>
        ))}
      </div>
      <h2 className='text-xl font-semibold text-slate-100'>Flashcards recentes</h2>
      <div className='grid gap-4 md:grid-cols-2'>
        {flashcards.map((flashcard) => (
          <Card key={flashcard.id} className='bg-slate-900'>
            <CardHeader>
              <CardTitle className='text-slate-100'>{flashcard.recto}</CardTitle>
            </CardHeader>
            <CardContent className='text-slate-300'>{flashcard.verso}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
