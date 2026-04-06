import type { SujetBlanc } from '@/data/sujets-blancs-types';

const EP1_SUJET_B = `CAS PRATIQUE — SESSION FICTIVE 2026-B
Durée : 3 heures — Coefficient 2 — Sans document

M. Lucas BERNARD, 41 ans, ingénieur, circule le 08/04/2026 à 22 h 15 sur une route départementale à double sens sans séparateur. Victime d’un éblouissement, il effleure le trottoir piste cyclable ; Mme Elodie RENARD, cycliste, chute lourdement. M. BERNARD ralentit, jette un coup d’œil par rétroviseur, puis accélère et quitte les lieux sans sécuriser la victime ni appeler les secours. Mme RENARD est hospitalisée ; le bilan mentionne une fracture du poignet et un traumatisme crânien léger avec surveillance. M. BERNARD est identifié le lendemain par la plaque relevée par un témoin.

Travaillez sur la qualification des infractions pénales susceptibles de concerner M. BERNARD (homicide ou blessures involontaires imputables à un manquement caractérisé, délit de fuite, au besoin autres qualifications voisines selon votre analyse). Vous articulerez élément légal, matériel et moral sans vous limiter à une liste d’articles ; vous traiterez spécifiquement du problème de l’absence d’immobilisation et du délai de découverte de l’identité du conducteur. Vous conclurez sur les compétences juridictionnelles et les poursuites probables.`;

export const SESSION_BLANC_B: SujetBlanc = {
  id: 'session-2026-B',
  titre: 'Session fictive 2026 — B',
  description:
    'Homicide involontaire sur la voie publique et délit de fuite : même affaire traitée en écrit, procédure et oral.',
  theme: 'Homicide involontaire AVP + délit de fuite',
  difficulte: 'intermediaire',
  corrigeDisponible: false,
  isPremium: true,
  epreuve1: {
    duree: '3h — Coef. 2',
    sujet: EP1_SUJET_B,
    consignes: [
      'Traitez le cas comme une dissertation courte structurée ou comme un commentaire d’arrêt fictif selon votre préférence, en annonçant votre choix en introduction.',
      'Sans documents.',
      'Citation des articles : seulement ceux que vous maîtrisez ; en cas de doute, formulez prudemment.',
    ],
    pointsMethodo: [
      'Distinguez les qualifications exclusives ou cumuls possibles selon votre raisonnement.',
      'Évoquez la fonction de la circulaire et de la doctrine sans les inventer.',
    ],
  },
  epreuve2: {
    duree: '4h — Code pénal et CPP autorisés',
    contexte:
      'Le dossier « RENARD » est constitué après signalement des riverains et saisine du parquet de Toulouse ; auditions, expertise véhicule, téléphone du mis en cause saisi sur commission rogatoire après procédure.',
    pieces: [
      {
        numero: 'Pièce 1',
        type: 'PV de constatations sur les lieux',
        contenu: `PV n° 2026/TLS-FR/554 — 09/04/2026, 08 h 40 — jour J+1.
Constat : marques de dérapage 8 m ; morceau de plastique pare-choc compatibles véhicule Peugeot 308 gris ; trace de freinage ; absence de véhicule. Schéma photogrammétrique ; relevé de température et visibilité (brouillard léger déclaré). Témoin M. HOAREAU déclare avoir noté les trois derniers chiffres de la plaque et la couleur ; procès-verbal d’audition joint en pièce 3.`,
      },
      {
        numero: 'Pièce 2',
        type: "PV d'audition de la victime (hôpital)",
        contenu: `Audition sous astreinte médicale — 10/04/2026 — Mme RENARD.
Évoque l’impact latéral, la chute, perte de connaissance brève ; souvenirs partiels du véhicule ; colère sur le départ du conducteur ; souhaite déposer partie civile ; ITT annoncée provisoirement à 45 jours par médecin traitant visé. Signature après relecture avec assistance juridique secondaire.`,
      },
      {
        numero: 'Pièce 3',
        type: "PV d'audition du témoin",
        contenu: `M. HOAREAU — 10/04/2026 — Audition au commissariat.
Répète avoir vu ralentissement puis accélération ; note immatriculation partielle ; ne reconnaît pas le visage ; accepte de témoigner au procès ; pas de lien avec les parties. Image mentale du véhicule : berline grise, ailes élargies aftermarket.`,
      },
      {
        numero: 'Pièce 4',
        type: 'PV de GAV du mis en cause (extraits)',
        contenu: `M. Lucas BERNARD — GAV 11/04/2026.
Reconnaît la conduite ; invoque éblouissement et panique ; affirme ne pas avoir perçu la gravité ; dit avoir pensé à une simple chute sans contact réel ; téléphone consulté : recherche « avocat délit fuite » à 23 h 42 — confronté, minimise. Dénonciation tardive à la police le 11/04 sur conseil avocat.`,
      },
    ],
    questions: [
      { numero: 1, intitule: 'Qualifiez les infractions pénales principales envisageables à l’encontre de M. BERNARD.', bareme: 6, type: 'qualification' },
      { numero: 2, intitule: 'Rédigez l’articulation entre constatations, expertise et audition dans un courrier parquet (10 lignes max).', bareme: 4, type: 'articulation' },
      { numero: 3, intitule: 'Rédigez les mentions obligatoires du PV de fin de GAV (structure seule, sans invention de faits nouveaux).', bareme: 5, type: 'pv' },
      { numero: 4, intitule: 'Proposez un rapport de synthèse : 1 page — titres de rubriques et contenu synthétique attendu.', bareme: 5, type: 'rapport' },
    ],
  },
  epreuve3: {
    duree: '40 min préparation — Jury',
    sujetTire:
      'Vous présentez au juge d’instruction l’état du dossier « RENARD » : contradiction entre dénégation partielle du mis en cause et preuve matérielle.',
    axesDeTravail: [
      'Gestion de la partie civile et de l’émotion en salle.',
      'Poids de la recherche Internet sur le téléphone.',
      'Proportionnalité des réquisitions de GAV.',
    ],
    questionsJury: [
      'Le délit de fuite est-il autonome selon vous dans ce dossier ?',
      'Comment gérez-vous la prescription éventuelle des investigations ?',
      'Faut-il demander une expertise psychologique du mis en cause ?',
      'Quelle attitude si le témoin se rétracte ?',
      'Comment répondez-vous à une question piège sur la présomption d’innocence à l’oral ?',
      'Quel critère pour classer sans suite une partie des faits ?',
    ],
  },
};
