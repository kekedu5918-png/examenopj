import { FormationExamTrap, FormationTip } from '@/components/cours/formation/AlphaFormationCallouts';
import {
  FormationChapter,
  FormationH3,
  FormationH4,
  FormationH5,
  FormationOl,
  FormationP,
  FormationTable,
  FormationUl,
} from '@/components/cours/formation/AlphaFormationProse';
import {
  FormationBubbleGrid,
  FormationCompareCards,
  FormationJusticeChain,
  FormationParadeStrip,
  FormationPersonSchema,
  FormationStepFlow,
  FormationValuePills,
  FormationVerticalPipeline,
} from '@/components/cours/formation/AlphaFormationVisual';

const SOMMAIRE = [
  { id: 'alpha-pv-ch1', label: 'Formalisme & valeur probante' },
  { id: 'alpha-pv-ch2', label: 'Plainte, témoin, victimes, TAJ' },
  { id: 'alpha-pv-ch3', label: 'PV de renseignements' },
  { id: 'alpha-pv-ch4', label: 'Constatations & voisinage' },
  { id: 'alpha-pv-ch5', label: 'Présentation du suspect' },
  { id: 'alpha-pv-ch6', label: 'Interpellation' },
  { id: 'alpha-pv-ch7', label: 'Garde à vue' },
  { id: 'alpha-pv-ch8', label: 'Perquisition & fouille' },
  { id: 'alpha-pv-ch9', label: 'Saisie, scellés, restitution' },
  { id: 'alpha-pv-ch10', label: 'Audition du mis en cause' },
  { id: 'alpha-pv-ch11', label: 'Action publique & civile' },
  { id: 'alpha-pv-ch12', label: 'Saisine & COPJ' },
] as const;

/**
 * Synthèse programme — formalisme et valeur probante des PV (Enquête Alpha).
 * Référence éditoriale alignée sur le document centre (ex. version 01/12/2025).
 */
export function AlphaPvFormalismFiche() {
  return (
    <div className='space-y-5 text-left'>
      <div className='rounded-2xl border border-emerald-500/25 bg-gradient-to-r from-emerald-950/35 via-navy-950/40 to-transparent px-4 py-3 md:px-5'>
        <p className='text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-300/90'>Procédure pénale · Synthèse</p>
        <p className='mt-1 font-display text-lg font-bold text-white md:text-xl'>
          Formalisme & valeur probante des procès-verbaux
        </p>
        <p className='mt-2 text-xs leading-relaxed text-slate-400'>
          Contenu aligné sur ton cours : repères en bulles, schémas de procédure, tableaux et pièges d’examen — pour
          réviser vite sans perdre la précision.
        </p>
        <FormationValuePills
          className='mt-4'
          items={[
            { label: 'Art. 429', sub: 'Validité du PV' },
            { label: 'Art. 430-433', sub: 'Valeur probante' },
            { label: 'Art. 66', sub: 'Simultanéité' },
            { label: 'Art. 107', sub: 'Rédaction' },
          ]}
        />
      </div>

      <nav
        aria-label='Sommaire de la fiche'
        className='rounded-2xl border border-white/[0.08] bg-black/35 p-4 md:p-5'
      >
        <p className='text-[11px] font-bold uppercase tracking-wider text-slate-500'>Sommaire interactif</p>
        <ul className='mt-3 grid gap-2 sm:grid-cols-2'>
          {SOMMAIRE.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className='group flex items-center gap-2 rounded-lg border border-transparent px-2 py-1.5 text-xs text-slate-400 transition hover:border-emerald-500/25 hover:bg-emerald-950/20 hover:text-emerald-100/95'
              >
                <span className='h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500/50 group-hover:bg-emerald-400' aria-hidden />
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <FormationTip>
        <p>
          <strong className='text-white'>Méthode :</strong> lisez chaque bloc « Piège examen » comme une question
          piège potentielle à l’écrit ; les tableaux servent de grille de relecture pour vos PV et dossiers.
        </p>
      </FormationTip>

      {/* —— 1 —— */}
      <FormationChapter id='alpha-pv-ch1' title='Formalisme & valeur probante des PV' badge='§1' defaultOpen>
        <FormationH3>Définition</FormationH3>
        <FormationP>
          Le procès-verbal est l&apos;écrit rédigé et signé par un OPJ, un APJ ou un assistant d&apos;enquête, relatant au
          fur et à mesure les diligences (constatations, auditions, perquisitions…). Deux axes : la{' '}
          <strong className='text-slate-100'>compétence</strong> (qualification judiciaire + territoriale du rédacteur)
          et le <strong className='text-slate-100'>cadre juridique</strong> de l&apos;enquête.
        </FormationP>

        <FormationH4>Les trois catégories de valeur probante</FormationH4>
        <FormationTable
          caption='Valeur des PV selon le fondement'
          headers={['Catégorie', 'Article CPP', 'Portée', 'Exemples']}
          rows={[
            [
              'Simples renseignements',
              'Art. 430',
              'Aucune force probante — le juge statue selon son intime conviction (art. 427-428)',
              'FD droit commun, EP, certains comptes rendus',
            ],
            [
              'Jusqu’à preuve contraire',
              'Art. 431',
              'Preuve contraire par écrit ou témoins',
              'Code du travail, chemins de fer, fraudes (lois spéciales)',
            ],
            [
              'Jusqu’à inscription de faux',
              'Art. 433',
              'Autorité de fait pour le juge',
              'Douanes, ONF, contrôle économique (textes spéciaux)',
            ],
          ]}
        />
        <FormationExamTrap>
          <p>
            En <strong>droit commun</strong> (crimes et délits non visés par une loi spéciale), les PV ne valent que
            comme <strong>simples renseignements</strong> (art. 430 CPP). Ne pas les confondre avec les PV relevant
            d&apos;une loi spéciale pouvant valoir jusqu&apos;à preuve contraire.
          </p>
        </FormationExamTrap>

        <FormationH4>Conditions de validité (art. 429 CPP)</FormationH4>
        <FormationBubbleGrid
          columnsClass='sm:grid-cols-2'
          items={[
            { title: 'Régularité de forme', hint: 'Respect des formalités légales' },
            { title: 'Fonctions exercées', hint: 'Auteur agissant dans l’exercice de ses missions' },
            { title: 'Fait personnel', hint: 'Ce qu’il a vu, entendu ou constaté lui-même' },
            { title: 'Audition / interrogatoire', hint: 'Questions et réponses au PV' },
          ]}
        />

        <FormationH4>Structure du PV — les 6 parties</FormationH4>
        <FormationStepFlow
          steps={[
            'Titre « PROCÈS-VERBAL »',
            'Incipit (date, heure, identité, lieu, cadre, avis, présences)',
            'Corps en NOUS — présent — art. 107',
            'Énonciation terminale & signatures',
            'Pagination recto + suites',
            'Marge (n°, affaire, objet)',
          ]}
        />
        <FormationOl>
          <li>Titre : « PROCÈS-VERBAL »</li>
          <li>
            Incipit : date et heure en toutes lettres, identité du rédacteur (nom/RIO, grade, service), lieu, cadre
            juridique, avis aux autorités, personnes présentes
          </li>
          <li>
            Corps : 1re personne du pluriel (NOUS), présent de l&apos;indicatif, style objectif, sans interligne ni
            rature (art. 107 CPP)
          </li>
          <li>Énonciation terminale : clôture, signatures rédacteur, déclarant, assistants</li>
          <li>Pagination : recto uniquement, suites numérotées</li>
          <li>Marge : n° procédure/cote, affaire (C/NOM), objet</li>
        </FormationOl>
        <FormationPersonSchema />
        <FormationExamTrap>
          <p>
            Dans le <strong>rapport de synthèse</strong>, le rédacteur utilise la 1re personne du singulier (
            <strong>JE</strong>), alors que le PV utilise <strong>NOUS</strong> (« nous de majesté »).
          </p>
        </FormationExamTrap>
        <FormationExamTrap>
          <p>
            Le PV doit être rédigé « sur le champ ou dès que possible » (art. 66 CPP) — principe de simultanéité ; le
            présent de l&apos;indicatif en découle.
          </p>
        </FormationExamTrap>

        <FormationH4>Principes juridiques clés</FormationH4>
        <FormationUl>
          <li>
            <strong>Simultanéité</strong> (art. 66 CPP) — rédaction sur le champ ou dès que possible
          </li>
          <li>
            <strong>Unicité du rédacteur</strong> — un signataire par PV (en-tête : nom/RIO, grade, service — art. D.9 et
            D.10 CPP)
          </li>
          <li>
            <strong>Spécificité</strong> — possibilité de PV unique (art. D.10 et D.11) en FD ou EP ; en CR : 1 PV = 1
            acte généralement
          </li>
          <li>
            <strong>Copie</strong> obligatoire jointe à l&apos;original (art. 19 CPP)
          </li>
        </FormationUl>
        <FormationH5>Protection du rédacteur (art. 15-4 CPP)</FormationH5>
        <FormationUl>
          <li>Identification par RIO possible si risques de représailles</li>
          <li>Pas d&apos;autorisation préalable pour le PV de plainte (art. 15-3 CPP)</li>
          <li>Dispositif IDPV pour identification par les juridictions</li>
        </FormationUl>
      </FormationChapter>

      {/* —— 2 —— */}
      <FormationChapter id='alpha-pv-ch2' title='Plainte, audition de témoin, droits des victimes & TAJ' badge='§2'>
        <FormationH3>La plainte</FormationH3>
        <FormationP>
          Bases : art. 10-2 à 10-5-1, 15-3, 15-3-1, 17 CPP. L&apos;OPJ est tenu de recevoir la plainte — pas de refus.
        </FormationP>
        <FormationCompareCards
          leftTitle='Dépôt au service'
          rightTitle='Téléservice (LRPPN)'
          leftItems={['Guichet du service', 'Plainte en personne', 'Traçabilité immédiate au dossier']}
          rightItems={[
            'En ligne pour certaines infractions (ex. atteintes aux biens, auteur inconnu)',
            'Connecté à LRPPN',
            'Même obligation de traitement pour l’OPJ',
          ]}
        />
        <FormationH4>Droits des victimes (art. 10-2 à 10-5-1 CPP) — à notifier</FormationH4>
        <FormationBubbleGrid
          items={[
            { title: 'Suite de la plainte', hint: 'Information sur la suite donnée' },
            { title: 'Aide & avocat', hint: 'Aide aux victimes, assistance d’un avocat' },
            { title: 'Soins & protection', hint: 'Indemnisation, mesures utiles' },
            { title: 'Audience & PC', hint: 'Date d’audience, droits partie civile' },
            { title: 'Voie électronique', hint: 'Convocations / avis (avec consentement)' },
          ]}
        />
        <FormationExamTrap>
          <p>
            La mention de l&apos;heure de <strong>fin</strong> est inutile pour la plainte — contrairement à
            d&apos;autres PV impliquant un suspect.
          </p>
        </FormationExamTrap>

        <FormationH4>Audition de témoin (art. 62 et 153 CPP)</FormationH4>
        <FormationP>Éléments formels du PV :</FormationP>
        <FormationUl>
          <li>Identité complète du témoin (« petite identité »)</li>
          <li>Notification des droits</li>
          <li>Lecture par le déclarant lui-même</li>
          <li>Déclaration de persistance et signature en bas de chaque feuillet</li>
        </FormationUl>
        <FormationExamTrap>
          <p>
            Clôture : lecture faite par le déclarant qui déclare persister. Si le déclarant ne sait pas lire : préciser
            que lecture a été faite par le rédacteur.
          </p>
        </FormationExamTrap>

        <FormationH4>TAJ & CANONGE (décret 2013-1169)</FormationH4>
        <FormationP>
          Données et photos des personnes mises en cause, alimentation via LRPPN. CANONGE permet la présentation de
          clichés au témoin.
        </FormationP>
        <FormationH5>Articulation type d&apos;un PV de consultation TAJ à témoin</FormationH5>
        <FormationVerticalPipeline
          steps={[
            'Lieu de l’opération',
            'Cadre juridique + visa des articles CPP',
            'Convocation victime/témoin (ou présence suite à plainte)',
            'Consultation de la base TAJ et sélection de clichés',
            'Constitution d’une planche ou album (plusieurs clichés numérotés ; identités occultées si anthropométriques)',
            'Présentation des photographies',
            'Examen par la victime/témoin',
            'Recueil de la déclaration en style direct',
            'Clôture et signatures',
          ]}
        />
        <FormationExamTrap>
          <p>
            Ne jamais présenter <strong>la seule</strong> photographie du suspect — planche/album obligatoire. Sur photos
            anthropométriques : occultation d&apos;identité.
          </p>
        </FormationExamTrap>
        <FormationP>
          <strong>PV de résultat</strong> de consultation TAJ : distinct du PV de présentation — annexe fiche
          signalétique + album + cliché identifié, identité TAJ, date de dernière signalisation.
        </FormationP>
      </FormationChapter>

      {/* —— 3 —— */}
      <FormationChapter id='alpha-pv-ch3' title='Le PV de renseignements' badge='§3'>
        <FormationP>
          <strong>Base :</strong> art. 14 CPP — recherches, investigations, surveillances, filatures, renseignements.
        </FormationP>
        <FormationP>
          Acte d&apos;investigation libre : consigne les résultats de démarches sans cadre formel spécifique (voisinage,
          fichiers, administrations, renseignements auprès de tiers, etc.). Rédigé en <strong>NOUS</strong>, présent de
          l&apos;indicatif, cadre juridique rappelé. Valeur : <strong>simples renseignements</strong> (art. 430 CPP).
        </FormationP>
        <FormationCompareCards
          leftTitle='PV d’audition'
          rightTitle='PV de renseignements'
          leftItems={['Déclarant identifié', 'Signature du tiers requise', 'Lecture / persistance']}
          rightItems={['Pas de déclarant', 'Aucune signature de tiers', 'Récit narratif de l’OPJ']}
        />
        <FormationExamTrap>
          <p>
            Pas de <strong>déclarant</strong> — aucune signature de tiers, contrairement à l&apos;audition. Acte
            purement narratif.
          </p>
        </FormationExamTrap>
      </FormationChapter>

      {/* —— 4 —— */}
      <FormationChapter id='alpha-pv-ch4' title='Constatations & enquête de voisinage' badge='§4'>
        <FormationH4>Constatations</FormationH4>
        <FormationP>
          Art. 54, 74, 74-1, 75, 75-1, 75-2 et s., 151 et s. CPP. L&apos;enquête doit permettre d&apos;établir l&apos;
          infraction, le lieu, le moment, l&apos;état des lieux, les objets, les liens cause à effet avec les suspects.
        </FormationP>
        <FormationH5>Méthode ABC (constatations)</FormationH5>
        <FormationBubbleGrid
          columnsClass='sm:grid-cols-2 lg:grid-cols-4'
          items={[
            { title: 'Qui ?', hint: 'Identités / rôles' },
            { title: 'Quoi ?', hint: 'Faits et infraction' },
            { title: 'Où ?', hint: 'Lieux précis' },
            { title: 'Comment ?', hint: 'Modalités, conditions' },
            { title: 'Avec qui ?', hint: 'Cocontractants, tiers' },
            { title: 'Avec quoi ?', hint: 'Objets, armes, supports' },
            { title: 'Quand ?', hint: 'Dates et heures' },
            { title: 'Pourquoi ?', hint: 'Mobiles, contexte' },
          ]}
        />
        <FormationP>
          Style : froid, technique, description concise, objective, ordonnée de ce qui est observé.
        </FormationP>
        <FormationExamTrap>
          <p>
            Sous <strong>commission rogatoire</strong> : un PV par acte d&apos;exécution — pas de PV unique comme en
            FD ou EP.
          </p>
        </FormationExamTrap>

        <FormationH4>Enquête de voisinage (art. 14 CPP)</FormationH4>
        <FormationP>
          Audition si déclarations significatives ; sinon PV de renseignements. Les résultats négatifs (« rien vu /
          entendu ») se consignent aussi — l&apos;absence d&apos;information est une information.
        </FormationP>
        <FormationExamTrap>
          <p>
            Même les relevés négatifs de voisinage doivent figurer au dossier — ils orientent la poursuite des
            investigations.
          </p>
        </FormationExamTrap>
      </FormationChapter>

      {/* —— 5 —— */}
      <FormationChapter id='alpha-pv-ch5' title='Présentation de suspect à témoin ou victime' badge='§5'>
        <FormationP>
          <strong>Art. 61-3, 76-1 et 154 CPP.</strong> Parade d&apos;identification : 4 à 6 personnes aux
          caractéristiques homogènes ; le suspect, hors présence du témoin, choisit numéro et position ; idéalement
          glace sans tain ; photographie du groupe par la PTS annexée au PV.
        </FormationP>
        <FormationParadeStrip count={6} />
        <FormationExamTrap>
          <p>
            Éviter toute mise en évidence du suspect (morphologie, tenue, seul sans ceinture/lacets en GAV, ivresse,
            etc.) — source d&apos;élimination abusive.
          </p>
        </FormationExamTrap>
        <FormationP>
          Droit à l&apos;avocat : le suspect peut demander la présence d&apos;un avocat (choix ou commis) aux côtés de
          l&apos;OPJ et du témoin (art. 61-3 CPP).
        </FormationP>
        <FormationH4>Deux PV distincts (articulation détaillée)</FormationH4>
        <FormationCompareCards
          leftTitle='PV — constitution du groupe (9 points)'
          rightTitle='PV — présentation témoin/victime (10 points)'
          leftItems={[
            'Lieu',
            'Cadre juridique',
            'Assistants',
            'Extraction GAV si besoin',
            'Choix du numéro par le suspect',
            'Positionnement',
            'Photographie PTS',
            'Clôture',
            'Annexe photo',
          ]}
          rightItems={[
            'Lieu',
            'Cadre',
            'Rappel affaire / situation du suspect',
            'Présence avocat',
            'Présentation du groupe',
            'Recueil déclaration (style direct)',
            'Reconnaissance formelle',
            'Clôture',
            'Signatures',
            '(+ PV d’audition distinct pour le développement si besoin)',
          ]}
        />
        <FormationExamTrap>
          <p>
            Reconnaissance <strong>formelle et certaine</strong>. Une hésitation se rapporte telle quelle ; souvent un PV
            d&apos;audition distinct pour le développement complet.
          </p>
        </FormationExamTrap>
        <FormationP>
          Photographies : jamais une seule photo du suspect — planche obligatoire ; PV consultation TAJ + PV de résultat
          distincts (LRPPN/CANONGE).
        </FormationP>
      </FormationChapter>

      {/* —— 6 —— */}
      <FormationChapter id='alpha-pv-ch6' title="L'interpellation" badge='§6'>
        <FormationP>
          <strong>Art. 73 CPP</strong> — acte matériel de mise à disposition de l&apos;OPJ d&apos;une personne
          suspectée. En <strong>flagrance</strong> : tout citoyen peut appréhender l&apos;auteur d&apos;un crime ou
          délit flagrant et le conduire devant l&apos;OPJ ; en <strong>EP</strong> : OPJ/APJ.
        </FormationP>
        <FormationStepFlow
          steps={[
            'Circonstances (lieu, heure)',
            'Fondement juridique',
            'État de la personne',
            'Objets en possession',
            'Conduite à tenir (transport, GAV…)',
          ]}
        />
        <FormationP>Le PV d&apos;interpellation consigne ces éléments de façon précise et traçable.</FormationP>
        <FormationExamTrap>
          <p>
            <strong>Interpellation (art. 73)</strong> ≠ <strong>convocation (art. 78 CPP)</strong> — ne pas confondre
            les régimes.
          </p>
        </FormationExamTrap>
      </FormationChapter>

      {/* —— 7 —— */}
      <FormationChapter id='alpha-pv-ch7' title='Garde à vue (régime général majeur)' badge='§7'>
        <FormationP>
          Bases : art. 62-2 à 64-1, 77, 77-2, 77-3, 154 CPP. La GAV n&apos;est possible que si c&apos;est le{' '}
          <strong>unique moyen</strong> d&apos;atteindre <strong>l&apos;un</strong> des objectifs suivants (art. 62-2) :
        </FormationP>
        <FormationBubbleGrid
          columnsClass='sm:grid-cols-2 lg:grid-cols-2'
          items={[
            { title: 'Investigations', hint: 'Permettre des actes impliquant la présence de la personne' },
            { title: 'Présentation parquet', hint: 'Garantir la présentation devant le procureur' },
            { title: 'Préservation des preuves', hint: 'Empêcher altération des indices' },
            { title: 'Protection des tiers', hint: 'Pressions sur témoins / victimes ; concertation complices' },
            { title: 'Fuite', hint: 'Empêcher la soustraction aux poursuites' },
          ]}
        />
        <FormationValuePills
          items={[
            { label: '24 h', sub: 'Droit commun (avant prorogation)' },
            { label: '48 h max', sub: '1 prorogation écrite du parquet' },
            { label: '96 h max', sub: '706-88 (org.)' },
            { label: '144 h max', sub: '706-88-1 / 2 (terrorisme)' },
          ]}
        />
        <FormationTable
          caption='Durées indicatives (rappel)'
          headers={['Contexte', 'Durée max. (ordre de grandeur)']}
          rows={[
            ['Droit commun', '24 h + 1 prorogation écrite parquet = 48 h'],
            ['Criminalité organisée (art. 706-88 CPP)', 'Jusqu’à 96 h'],
            ['Terrorisme (art. 706-88-1, 706-88-2)', 'Jusqu’à 144 h'],
          ]}
        />
        <FormationExamTrap>
          <p>
            Prorogation en droit commun : <strong>autorisation écrite</strong> du procureur — l&apos;oral ne suffit
            pas.
          </p>
        </FormationExamTrap>
        <FormationH4>Droits dès le placement</FormationH4>
        <FormationUl>
          <li>Nature de l&apos;infraction, durée, droit au silence</li>
          <li>Avocat (dès le début, présent aux auditions)</li>
          <li>Examen médical, prévenir un proche et/ou l&apos;employeur, interprète</li>
          <li>Consultation des PV d&apos;audition par l&apos;avocat</li>
        </FormationUl>
        <FormationExamTrap>
          <p>
            Crimes : enregistrement audiovisuel des auditions (art. 64-1 CPP), sauf exceptions pour délinquance organisée
            si inconvénients insurmontables.
          </p>
        </FormationExamTrap>
        <FormationP>
          <strong>Registre IGAV</strong> : interconnexion LRPPN — données à la notification, récupération en fin sans
          ressaisie complète.
        </FormationP>
      </FormationChapter>

      {/* —— 8 —— */}
      <FormationChapter id='alpha-pv-ch8' title='Perquisition & fouille intégrale' badge='§8'>
        <FormationP>
          Perquisition : art. 56-59 (FD), 76 (EP), 94-98 (CR), 706-89 à 706-94 CPP selon contextes.
        </FormationP>
        <FormationTable
          caption='FD vs EP (extraits)'
          headers={['Critère', 'Flagrance', 'Enquête préliminaire']}
          rows={[
            ['Consentement', 'Non requis', 'Obligatoire (sauf exceptions légales)'],
            ['Heures légales', '6h–21h', '6h–21h'],
            ['Coercition', 'Possible', 'Exclue (sauf GAV)'],
            ['Occupant', 'Présence si possible', 'Présence + signature'],
          ]}
        />
        <FormationExamTrap>
          <p>
            En EP, la perquisition repose sur le <strong>consentement écrit</strong> ; sans consentement, autorisation
            du JLD requise.
          </p>
        </FormationExamTrap>
        <FormationH4>Mentions clés du PV de perquisition</FormationH4>
        <FormationUl>
          <li>Présence effective de la personne (ou motif d&apos;absence)</li>
          <li>Heure de début et de fin</li>
          <li>Description des lieux et objets découverts/saisis</li>
        </FormationUl>

        <FormationH4>Fouille intégrale (art. 63-7 CPP)</FormationH4>
        <FormationP>
          Par une personne de <strong>même sexe</strong>, sur décision motivée de l&apos;OPJ — distincte de la palpation
          de sécurité (APJ) ou du scanneur.
        </FormationP>
        <FormationExamTrap>
          <p>
            PV <strong>séparé</strong> de celui de la perquisition — actes distincts.
          </p>
        </FormationExamTrap>
      </FormationChapter>

      {/* —— 9 —— */}
      <FormationChapter id='alpha-pv-ch9' title='Saisie, scellés, restitution' badge='§9'>
        <FormationStepFlow
          steps={[
            'Découverte / description',
            'Saisie & numérotation scellé',
            'Mise à disposition du magistrat (art. 19)',
            'Restitution sur décision',
          ]}
        />
        <FormationP>
          Objets découverts en lien avec l&apos;infraction : description, lieu et conditions de découverte, numérotation
          des scellés au PV.
        </FormationP>
        <FormationUl>
          <li>
            <strong>Scellé fermé</strong> : intégrité apparente jusqu&apos;à ouverture autorisée
          </li>
          <li>
            <strong>Scellé ouvert (provisoire)</strong> : objets devant expertise
          </li>
          <li>Fiche de scellé annexée au PV</li>
        </FormationUl>
        <FormationExamTrap>
          <p>
            Numérotation <strong>continue</strong> ; un scellé = description précise — éviter plusieurs objets de
            nature différente dans un même scellé sans justification.
          </p>
        </FormationExamTrap>
        <FormationH4>Restitution (art. 56, 76, 97, 99 CPP)</FormationH4>
        <FormationP>
          Objets mis à disposition du magistrat (art. 19 CPP). Restitution sur décision si plus utiles à la vérité ou si
          conservation inutile.
        </FormationP>
        <FormationExamTrap>
          <p>
            Restitution = <strong>PV de restitution obligatoire</strong> — pas à l&apos;oral. Armes/stupéfiants : régimes
            de destruction spécifiques.
          </p>
        </FormationExamTrap>
      </FormationChapter>

      {/* —— 10 —— */}
      <FormationChapter id='alpha-pv-ch10' title="L'audition du mis en cause" badge='§10'>
        <FormationTable
          caption='Audition libre (61-1) vs GAV'
          headers={['Critère', 'Audition libre', 'Garde à vue']}
          rows={[
            ['Contrainte', 'Aucune — liberté de partir', 'Privation de liberté'],
            ['Fondement', 'Soupçons plausibles (61-1)', 'Art. 62-2 + nécessité absolue'],
            ['Avocat / silence', 'Droits notifiés', 'Droits notifiés dès le début'],
          ]}
        />
        <FormationH4>Droits en audition libre (art. 61-1)</FormationH4>
        <FormationUl>
          <li>Qualification des faits reprochés</li>
          <li>Droit de quitter les locaux à tout moment</li>
          <li>Interprète, avocat dès le début, droit au silence</li>
        </FormationUl>
        <FormationExamTrap>
          <p>
            Si la GAV devient nécessaire : <strong>interrompre</strong> l&apos;audition libre et notifier la GAV ; les
            déclarations obtenues avant peuvent être annulées si la privation de liberté était de fait.
          </p>
        </FormationExamTrap>
        <FormationH4>PV d&apos;audition du mis en cause</FormationH4>
        <FormationUl>
          <li>Notification des droits, heures de début et de fin</li>
          <li>Présence de l&apos;avocat (ou motif d&apos;absence)</li>
          <li>Questions et réponses intégrales, lecture par le déclarant, persistance, signatures par feuillet</li>
        </FormationUl>
      </FormationChapter>

      {/* —— 11 —— */}
      <FormationChapter id='alpha-pv-ch11' title='Action publique & action civile' badge='§11'>
        <FormationH4>Action publique</FormationH4>
        <FormationP>
          Action de la société pour réprimer l&apos;infraction — exercée par le Ministère public (parquet).
        </FormationP>
        <FormationH5>Extinction de l&apos;action publique (rappel)</FormationH5>
        <FormationBubbleGrid
          columnsClass='sm:grid-cols-2 lg:grid-cols-3'
          items={[
            { title: 'Décès du prévenu', hint: 'Fin des poursuites personnelles' },
            { title: 'Prescription', hint: '1 an / 6 ans / 20 ans selon la nature de l’infraction' },
            { title: 'Amnistie', hint: 'Effacement ou irrecevabilité' },
            { title: 'Abrogation', hint: 'Loi pénale abrogée' },
            { title: 'Chose jugée', hint: 'Ne bis in idem' },
          ]}
        />
        <FormationTable
          caption='Prescription — action publique vs peines (à ne pas confondre)'
          headers={['Thème', 'Délais usuels (rappel)']}
          rows={[
            ['Action publique (contravention / délit / crime)', '1 an / 6 ans / 20 ans'],
            ['Peines (contraventionnelle / correctionnelle / criminelle)', '3 ans / 6 ans / 20 ans'],
          ]}
        />
        <FormationExamTrap>
          <p>
            Délais de <strong>prescription des peines</strong> ≠ prescription de l&apos;action publique. L&apos;incipit
            du PV avec date/heure précises intervient dans les calculs de prescription.
          </p>
        </FormationExamTrap>
        <FormationH4>Action civile</FormationH4>
        <FormationP>
          Réparation du préjudice — partie civile devant les juridictions pénales ou action civile séparée.
        </FormationP>
        <FormationExamTrap>
          <p>
            L&apos;action civile peut vivre <strong>indépendamment</strong> de l&apos;action publique ; prescription selon
            le droit civil (souvent 5 ans pour les obligations).
          </p>
        </FormationExamTrap>
      </FormationChapter>

      {/* —— 12 —— */}
      <FormationChapter id='alpha-pv-ch12' title='Saisine des juridictions de jugement — COPJ' badge='§12'>
        <FormationH4>Modes de saisine des juridictions de jugement</FormationH4>
        <FormationJusticeChain />
        <FormationStepFlow
          steps={[
            'COPJ (art. 390-1)',
            'Renvoi JI',
            'Comparution immédiate',
            'CRPC',
            'Citation directe',
          ]}
        />
        <FormationUl>
          <li>
            <strong>Convocation par OPJ (COPJ)</strong> — art. 390-1 CPP
          </li>
          <li>Renvoi du juge d&apos;instruction</li>
          <li>Comparution immédiate (flagrant délit, délits ≥ 2 ans d&apos;emprisonnement selon cas)</li>
          <li>Comparution sur reconnaissance préalable de culpabilité (CRPC)</li>
          <li>Citation directe (parquet ou partie civile)</li>
        </FormationUl>
        <FormationH4>COPJ (art. 390-1 CPP)</FormationH4>
        <FormationP>
          Sur autorisation ou instructions du procureur : convocation directe devant tribunal correctionnel ou de police
          pour délits uniquement, auteur ayant reconnu les faits ou preuve suffisante, délai fixé par le procureur.
        </FormationP>
        <FormationUl>
          <li>Identité, qualification, articles, juridiction, date et heure d&apos;audience</li>
          <li>Droits (avocat, interprète…), signature OPJ + émargement du prévenu</li>
        </FormationUl>
        <FormationExamTrap>
          <p>
            COPJ : <strong>délits seulement</strong> — pas pour un crime (instruction préalable). Sans autorisation du
            procureur : nullité.
          </p>
        </FormationExamTrap>
      </FormationChapter>

      <div className='rounded-2xl border border-white/[0.08] bg-gradient-to-br from-slate-900/80 to-black/40 p-5'>
        <FormationH3 className='!mt-0'>Tableau de pilotage — 12 chapitres</FormationH3>
        <FormationTable
          caption='Couverture synthétique'
          headers={['#', 'Thème', 'Statut']}
          rows={[
            ['1', 'Formalisme & valeur probante des PV', 'Synthèse intégrée'],
            ['2', 'Plainte, audition témoin, victimes, TAJ', 'Synthèse intégrée'],
            ['3', 'PV de renseignements', 'Synthèse intégrée'],
            ['4', 'Constatations & enquête de voisinage', 'Synthèse intégrée'],
            ['5', 'Présentation suspect / témoin', 'Synthèse intégrée'],
            ['6', 'Interpellation', 'Synthèse intégrée'],
            ['7', 'Garde à vue (maj.)', 'Synthèse intégrée'],
            ['8', 'Perquisition & fouille intégrale', 'Synthèse intégrée'],
            ['9', 'Saisie, scellés, restitution', 'Synthèse intégrée'],
            ['10', 'Audition du mis en cause', 'Synthèse intégrée'],
            ['11', 'Action publique & civile', 'Synthèse intégrée'],
            ['12', 'Saisine & COPJ', 'Synthèse intégrée'],
          ]}
        />
        <div className='mt-4'>
          <FormationTip>
            <p>
              <strong className='text-white'>Pour aller plus loin sur examenopj.fr :</strong> transformez chaque « Piège
              examen » en fiche flash ou question à brouillon — c&apos;est là que le barème sépare souvent les copies.
            </p>
          </FormationTip>
        </div>
        <p className='mt-4 text-center text-[11px] leading-relaxed text-slate-500'>
          Référence de travail : articles CPP cités d&apos;après le document centre (version indiquée par votre
          formation — à croiser avec le texte en vigueur au jour de l&apos;examen).
        </p>
      </div>
    </div>
  );
}
