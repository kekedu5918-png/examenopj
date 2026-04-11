import { ContentPremiumOverlay } from '@/components/access/ContentPremiumOverlay';
import { Epreuve3Layout } from '@/components/epreuves/epreuve-3/epreuve-3-layout';
import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
import { getContentAccess } from '@/features/access/get-content-access';

export default async function Epreuve3Page() {
  const access = await getContentAccess();

  return (
    <InteriorPageShell maxWidth='7xl' glow={SHELL_GLOW.epreuve3} pad='none'>
      <section className='mx-auto max-w-3xl py-10 md:py-14'>
        <h1 className='font-sans text-3xl font-extrabold tracking-tight text-white md:text-4xl'>
          Épreuve 3 — L&apos;oral de mise en situation
        </h1>
        <div className='mt-4 flex flex-wrap gap-4 text-sm text-gray-400'>
          <span>⏱ 40 min de préparation</span>
          <span>👥 Jury : magistrat + commissaire</span>
          <span>📋 Dossier remis le jour J</span>
        </div>
        <h2 className='mt-8 font-sans text-xl font-bold text-white'>Ce que le jury évalue</h2>
        <ul className='mt-3 space-y-2 text-sm text-gray-300'>
          <li className='flex gap-2'>
            <span className='mt-0.5 text-emerald-400'>✓</span>
            La qualification juridique exacte des faits du dossier remis
          </li>
          <li className='flex gap-2'>
            <span className='mt-0.5 text-emerald-400'>✓</span>
            La maîtrise du cadre d&apos;enquête applicable (flagrance, préliminaire, CR)
          </li>
          <li className='flex gap-2'>
            <span className='mt-0.5 text-emerald-400'>✓</span>
            La structuration orale : faits → qualification → actes réalisés → suites
          </li>
          <li className='flex gap-2'>
            <span className='mt-0.5 text-emerald-400'>✓</span>
            La capacité à répondre aux questions sur les actes de procédure effectués
          </li>
          <li className='flex gap-2'>
            <span className='mt-0.5 text-emerald-400'>✓</span>
            La posture professionnelle face à un magistrat et un commissaire
          </li>
        </ul>
        <h2 className='mt-8 font-sans text-xl font-bold text-white'>Les 3 erreurs les plus fréquentes à l&apos;oral</h2>
        <ul className='mt-3 space-y-3 text-sm text-gray-300'>
          <li className='flex gap-2'>
            <span className='mt-0.5 text-rose-400'>✗</span>
            <span>
              <strong className='text-white'>Réciter les faits sans qualifier</strong> — le jury attend une analyse
              juridique
            </span>
          </li>
          <li className='flex gap-2'>
            <span className='mt-0.5 text-rose-400'>✗</span>
            <span>
              <strong className='text-white'>Confondre les cadres d&apos;enquête</strong> — citer un acte impossible dans
              le cadre donné
            </span>
          </li>
          <li className='flex gap-2'>
            <span className='mt-0.5 text-rose-400'>✗</span>
            <span>
              <strong className='text-white'>Ne pas anticiper les questions du jury</strong> — sur la GAV, la
              perquisition, les droits
            </span>
          </li>
        </ul>
        <div className='mt-6 rounded-xl border border-blue-500/20 bg-blue-500/[0.07] px-5 py-4'>
          <p className='text-sm text-gray-300'>
            💡 <strong className='text-white'>À savoir :</strong> L&apos;épreuve 3 valorise exactement ce que les épreuves
            1 et 2 ont construit. Un candidat solide en qualification (E1) et en procédure (E2) est naturellement à
            l&apos;aise face au jury.
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
        <Epreuve3Layout wrapWithShell={false} />
      )}
    </InteriorPageShell>
  );
}
