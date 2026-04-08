import { ContentPremiumOverlay } from '@/components/access/ContentPremiumOverlay';
import { Epreuve3Layout } from '@/components/epreuves/epreuve-3/epreuve-3-layout';
import { getContentAccess } from '@/features/access/get-content-access';

export default async function Epreuve3Page() {
  const access = await getContentAccess();

  return (
    <>
      <section style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
        <h1>Épreuve 3 — L&apos;oral de mise en situation</h1>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', margin: '1.5rem 0', fontSize: '0.9rem', color: '#6B7280' }}>
          <span>⏱ 40 min de préparation</span>
          <span>👥 Jury : magistrat + commissaire</span>
          <span>📋 Dossier remis le jour J</span>
        </div>

        <h2>Ce que le jury évalue</h2>
        <ul>
          <li>La qualification juridique exacte des faits du dossier remis</li>
          <li>La maîtrise du cadre d’enquête applicable (flagrance, préliminaire, CR)</li>
          <li>La structuration orale : faits → qualification → actes réalisés → suites</li>
          <li>La capacité à répondre aux questions sur les actes de procédure effectués</li>
          <li>La posture professionnelle face à un magistrat et un commissaire</li>
        </ul>

        <h2>Les 3 erreurs les plus fréquentes à l’oral</h2>
        <ul>
          <li>
            <strong>Réciter les faits sans qualifier</strong> — le jury attend une analyse juridique
          </li>
          <li>
            <strong>Confondre les cadres d’enquête</strong> — citer un acte impossible dans le cadre donné
          </li>
          <li>
            <strong>Ne pas anticiper les questions du jury</strong> — sur la GAV, la perquisition, les droits
          </li>
        </ul>

        <div style={{ background: '#F3F4F6', borderRadius: '12px', padding: '1.25rem 1.5rem', marginTop: '1.5rem' }}>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#374151' }}>
            💡 <strong>À savoir :</strong> L’épreuve 3 valorise exactement ce que les épreuves 1 et 2 ont construit. Un candidat
            solide en qualification (E1) et en procédure (E2) est naturellement à l’aise face au jury.
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
