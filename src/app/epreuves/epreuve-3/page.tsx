import { ContentPremiumOverlay } from '@/components/access/ContentPremiumOverlay';
import { Epreuve3Layout } from '@/components/epreuves/epreuve-3/epreuve-3-layout';
import { getContentAccess } from '@/features/access/get-content-access';

export default async function Epreuve3Page() {
  const access = await getContentAccess();

  return (
    <>
            <section className='mx-auto max-w-3xl px-4 py-10 md:py-14'>
        <h1 className='font-sans text-3xl font-extrabold tracking-tight text-white md:text-4xl'>
          Epreuve 3 &mdash; L&apos;oral de mise en situation
        </h1>
        <div className='mt-4 flex flex-wrap gap-4 text-sm text-gray-400'>
          <span>&#9201; 40 min de preparation</span>
          <span>&#128101; Jury : magistrat + commissaire</span>
          <span>&#128203; Dossier remis le jour J</span>
        </div>
        <h2 className='mt-8 font-sans text-xl font-bold text-white'>Ce que le jury evalue</h2>
        <ul className='mt-3 space-y-2 text-sm text-gray-300'>
          <li className='flex gap-2'><span className='mt-0.5 text-emerald-400'>&#10003;</span>La qualification juridique exacte des faits du dossier remis</li>
          <li className='flex gap-2'><span className='mt-0.5 text-emerald-400'>&#10003;</span>La maitrise du cadre d&apos;enquete applicable (flagrance, preliminaire, CR)</li>
          <li className='flex gap-2'><span className='mt-0.5 text-emerald-400'>&#10003;</span>La structuration orale : faits &rarr; qualification &rarr; actes realises &rarr; suites</li>
          <li className='flex gap-2'><span className='mt-0.5 text-emerald-400'>&#10003;</span>La capacite a repondre aux questions sur les actes de procedure effectues</li>
          <li className='flex gap-2'><span className='mt-0.5 text-emerald-400'>&#10003;</span>La posture professionnelle face a un magistrat et un commissaire</li>
        </ul>
        <h2 className='mt-8 font-sans text-xl font-bold text-white'>Les 3 erreurs les plus frequentes a l&apos;oral</h2>
        <ul className='mt-3 space-y-3 text-sm text-gray-300'>
          <li className='flex gap-2'><span className='mt-0.5 text-rose-400'>&#10007;</span><span><strong className='text-white'>Reciter les faits sans qualifier</strong> &mdash; le jury attend une analyse juridique</span></li>
          <li className='flex gap-2'><span className='mt-0.5 text-rose-400'>&#10007;</span><span><strong className='text-white'>Confondre les cadres d&apos;enquete</strong> &mdash; citer un acte impossible dans le cadre donne</span></li>
          <li className='flex gap-2'><span className='mt-0.5 text-rose-400'>&#10007;</span><span><strong className='text-white'>Ne pas anticiper les questions du jury</strong> &mdash; sur la GAV, la perquisition, les droits</span></li>
        </ul>
        <div className='mt-6 rounded-xl border border-blue-500/20 bg-blue-500/[0.07] px-5 py-4'>
          <p className='text-sm text-gray-300'>
            &#128161; <strong className='text-white'>A savoir :</strong> L&apos;epreuve 3 valorise exactement ce que les epreuves 1 et 2 ont construit. Un candidat solide en qualification (E1) et en procedure (E2) est naturellement a l&apos;aise face au jury.
          </p>
        </div>
      </section>
      {access.tier === 'freemium' ? (
        <ContentPremiumOverlay
          title='Méthodologie Épreuve 3 — réservée au Premium'
          description='Le détail de la préparation à l’oral (CR Parquet, structure, exemples) est inclus dans l’offre Premium.'
        >
          <div className='min-h-[80vh] bg-navy-950' />
        </ContentPremiumOverlay>
      ) : (
        <Epreuve3Layout />
      )}
    </>
  );
}
