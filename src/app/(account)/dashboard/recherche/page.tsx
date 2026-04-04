import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { searchLearningContent } from '@/features/examenopj/controllers/get-dashboard-data';

type Props = {
  searchParams?: {
    q?: string;
  };
};

export default async function RecherchePage({ searchParams }: Props) {
  const query = searchParams?.q?.trim() || '';
  const result = await searchLearningContent(query);

  return (
    <section className='space-y-4 rounded-xl bg-slate-950 p-6'>
      <h1 className='text-2xl font-bold text-slate-50'>Recherche globale</h1>
      <p className='text-slate-300'>Recherche rapide dans les cours, questions et flashcards.</p>

      <form className='rounded-lg border border-slate-800 bg-slate-900 p-4'>
        <input
          name='q'
          defaultValue={query}
          placeholder='Ex. : art. 63 CPP, élément matériel, garde à vue…'
          className='w-full rounded-md bg-slate-950 px-3 py-2 text-sm text-slate-100'
        />
      </form>

      {query ? (
        <div className='grid gap-4 md:grid-cols-3'>
          <ResultCard
            title={`Questions (${result.questions.length})`}
            items={result.questions.map((item) => item.question)}
          />
          <ResultCard
            title={`Chapitres (${result.chapitres.length})`}
            items={result.chapitres.map((item) => item.titre)}
          />
          <ResultCard
            title={`Flashcards (${result.flashcards.length})`}
            items={result.flashcards.map((item) => item.recto)}
          />
        </div>
      ) : (
        <Card className='bg-slate-900'>
          <CardContent className='p-4 text-slate-300'>Saisis un terme pour lancer la recherche.</CardContent>
        </Card>
      )}
    </section>
  );
}

function ResultCard({ title, items }: { title: string; items: string[] }) {
  return (
    <Card className='bg-slate-900'>
      <CardHeader>
        <CardTitle className='text-slate-100'>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className='space-y-2 text-sm text-slate-300'>
          {items.slice(0, 8).map((text) => (
            <li key={text} className='rounded-md border border-slate-800 p-2'>
              {text}
            </li>
          ))}
          {items.length === 0 && <li>Aucun résultat.</li>}
        </ul>
      </CardContent>
    </Card>
  );
}
