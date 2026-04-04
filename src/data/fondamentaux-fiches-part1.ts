import type { Fiche } from './fondamentaux-types';

/** Fiches 1–10 : procédure + début acteurs (source prompt ExamenOPJ V2) */
export const FONDAMENTAUX_PART1: Fiche[] = [
  {
    id: 'cadres-enquete',
    categorie: 'procedure',
    titre: "Les cadres d'enquête",
    accroche:
      "Trois cadres juridiques encadrent l'action de l'OPJ : la flagrance, l'enquête préliminaire et la commission rogatoire.",
    source: 'F11 — Art. 53, 75, 81 C.P.P.',
    lienFascicule: '/fascicules/f11',
    lienQuiz: '/entrainement/quiz?mode=fascicule&f=f11',
    regles: [
      {
        label: 'Flagrance (art. 53 C.P.P.)',
        detail:
          "Crime ou délit se commettant actuellement, ou venant de se commettre. Ou flagrance par présomption : clameur publique, découverte d'objets, traces ou indices. Durée initiale : 8 jours, prolongeable sur autorisation du PR.",
        article: 'Art. 53 à 73 C.P.P.',
      },
      {
        label: 'Enquête préliminaire (art. 75 C.P.P.)',
        detail:
          "Cadre de droit commun, sans urgence. Perquisitions uniquement avec assentiment exprès de la personne, sauf autorisation du JLD. Pas de délai légal sauf délai raisonnable.",
        article: 'Art. 75 à 78 C.P.P.',
      },
      {
        label: 'Commission rogatoire (art. 81 C.P.P.)',
        detail:
          "Délégation du juge d'instruction à l'OPJ. L'OPJ ne peut pas interroger le mis en examen ni délivrer de mandats. Extension de compétence nationale possible (art. 18 al. 3 C.P.P.).",
        article: 'Art. 81 et 151 à 155 C.P.P.',
      },
      {
        label: 'Mort suspecte / disparition (art. 74 C.P.P.)',
        detail:
          "Cadre autonome pour rechercher les causes d'une mort inconnue ou d'une disparition inquiétante. Pouvoirs proches de la flagrance.",
        article: 'Art. 74 et 74-1 C.P.P.',
        alerte: true,
      },
    ],
    tableau: {
      colonnes: ['Cadre', 'Déclenchement', 'Perquisition', 'Durée max'],
      lignes: [
        ['Flagrance', 'Crime/délit flagrant', 'Sans assentiment', '8 j. + 8 j.'],
        ['Préliminaire', 'Toute infraction', 'Avec assentiment ou JLD', 'Délai raisonnable'],
        ['Commission rogatoire', 'Délégation JI', 'Selon délégation', 'Durée information'],
      ],
    },
  },
  {
    id: 'controle-identite',
    categorie: 'procedure',
    titre: "Le contrôle d'identité",
    accroche:
      "Le contrôle d'identité permet à l'OPJ ou l'APJ d'inviter une personne à justifier de son identité dans les cas prévus par la loi.",
    source: 'F11 — Art. 78-2 C.P.P.',
    lienFascicule: '/fascicules/f11',
    lienQuiz: '/entrainement/quiz?mode=fascicule&f=f11',
    regles: [
      {
        label: 'Cas n°1 — Police judiciaire (art. 78-2 al. 1)',
        detail:
          "Raisons plausibles de soupçonner que la personne a commis ou tenté de commettre une infraction, ou se prépare à commettre un crime ou délit, ou est susceptible de fournir des renseignements sur une infraction.",
        article: 'Art. 78-2 al. 1 C.P.P.',
      },
      {
        label: 'Cas n°2 — Préventif (art. 78-2 al. 2)',
        detail:
          "Sur réquisitions écrites du PR, dans les lieux et pour une durée fixés par le PR, pour rechercher des auteurs d'infractions spécifiques.",
        article: 'Art. 78-2 al. 2 C.P.P.',
      },
      {
        label: 'Cas n°3 — Zone frontière (art. 78-2 al. 4)',
        detail:
          'Dans une zone de 20 km de la frontière terrestre + ports, aéroports et gares ferroviaires ou routières internationales.',
        article: 'Art. 78-2 al. 4 C.P.P.',
      },
      {
        label: "Vérification d'identité (art. 78-3)",
        detail:
          "Si la personne ne peut ou ne veut justifier de son identité : rétention max 4h, présentation immédiate à l'OPJ, PV obligatoire, avis au PR.",
        article: 'Art. 78-3 C.P.P.',
        alerte: true,
      },
      {
        label: '⚠️ Interdit',
        detail:
          "Le contrôle d'identité ne peut pas servir de prétexte à une perquisition. Il ne peut pas être fondé sur l'apparence physique, la couleur de peau ou l'origine.",
        alerte: true,
      },
    ],
  },
  {
    id: 'garde-a-vue',
    categorie: 'procedure',
    titre: 'La garde à vue (GAV)',
    accroche:
      'Mesure de contrainte décidée par l\'OPJ, sous contrôle de l\'autorité judiciaire, maintenant à disposition des enquêteurs une personne soupçonnée.',
    source: 'F11 — Art. 62-2, 63, 63-1 à 64-1 C.P.P.',
    lienFascicule: '/fascicules/f11',
    lienQuiz: '/entrainement/quiz?mode=fascicule&f=f11',
    regles: [
      {
        label: 'Conditions cumulatives (art. 62-2 C.P.P.)',
        detail:
          "1) Raisons plausibles de soupçonner l'infraction (crime ou délit puni d'emprisonnement). 2) GAV = unique moyen d'atteindre l'un des 6 objectifs légaux (présence, preuves, témoins, coauteurs, présentation PR, faire cesser l'infraction).",
        article: 'Art. 62-2 C.P.P.',
        alerte: true,
      },
      {
        label: 'Durée',
        detail:
          '24h de plein droit. Prolongeable 24h sur autorisation du PR (présentation physique ou visioconférence). En criminalité organisée : 96h (2 prolongations de 24h chacune autorisées par le JLD).',
        article: 'Art. 63 C.P.P.',
      },
      {
        label: 'Droits notifiés immédiatement (art. 63-1)',
        detail:
          "1. Droit de faire prévenir un proche et l'employeur. 2. Droit à un examen médical. 3. Droit à l'assistance d'un avocat (dès le début, sauf report). 4. Droit d'être examiné par un médecin. 5. Droit au silence. 6. Droit à un interprète. 7. Droit d'être informé de la qualification, date, lieu de l'infraction.",
        article: 'Art. 63-1 à 63-3-1 C.P.P.',
      },
      {
        label: 'Qui peut placer en GAV ?',
        detail: "Uniquement l'OPJ (art. 63 al. 1). L'APJ ne peut pas. L'APJ peut cependant seconder l'OPJ.",
        article: 'Art. 63 al. 1 C.P.P.',
        alerte: true,
      },
      {
        label: 'Personnes non placées en GAV',
        detail:
          'Mineurs de 13 ans (jamais). Agents diplomatiques. Présidents de la République. Certains fonctionnaires consulaires (sauf crime flagrant).',
        alerte: true,
      },
      {
        label: 'Contrôle obligatoire',
        detail:
          "Avis immédiat au PR lors du placement. Si prolongation : présentation de la personne au PR. Registre de garde à vue tenu obligatoirement.",
        article: 'Art. 63 al. 2 et 64 C.P.P.',
      },
    ],
    tableau: {
      colonnes: ['Cadre', 'Durée initiale', 'Prolongation', 'Autorisation'],
      lignes: [
        ['Droit commun', '24h', '+24h', 'Procureur de la République'],
        ['Crim. organisée', '48h', '+24h + 24h', 'JLD (sur présentation)'],
        ['Terrorisme', '48h', '+24h + 24h', 'JLD'],
      ],
    },
  },
  {
    id: 'perquisition',
    categorie: 'procedure',
    titre: 'La perquisition',
    accroche:
      "Acte d'enquête consistant à pénétrer dans un lieu pour y rechercher des preuves ou des personnes.",
    source: 'F11 — Art. 56 à 59, 76 C.P.P.',
    lienFascicule: '/fascicules/f11',
    lienQuiz: '/entrainement/quiz?mode=fascicule&f=f11',
    regles: [
      {
        label: 'En flagrance (art. 56)',
        detail:
          "L'OPJ peut procéder à des perquisitions, visites domiciliaires et saisies sans assentiment, mais seulement entre 6h et 21h (sauf exceptions). La personne doit être présente ou représentée.",
        article: 'Art. 56 C.P.P.',
      },
      {
        label: 'En enquête préliminaire (art. 76)',
        detail:
          "Nécessite l'assentiment exprès de la personne chez qui la perquisition a lieu (écrit, signé). Sinon, autorisation préalable du JLD requise.",
        article: 'Art. 76 C.P.P.',
        alerte: true,
      },
      {
        label: 'Heures légales',
        detail:
          '6h à 21h en principe. Exceptions : si la perquisition a commencé avant 21h, elle peut se poursuivre. Certains lieux (permanences politiques, cabinets avocats, médecins) ont des règles spécifiques.',
        article: 'Art. 59 C.P.P.',
        alerte: true,
      },
      {
        label: 'Personnes présentes',
        detail:
          "La personne concernée ou son représentant doit être présente. À défaut : deux témoins (non subordonnés à l'OPJ). PV détaillé obligatoire.",
        article: 'Art. 57 C.P.P.',
      },
      {
        label: 'Saisies et scellés',
        detail:
          "Tout ce qui peut servir à la manifestation de la vérité peut être saisi. Chaque objet saisi est mis sous scellé, inventorié, et une liste est remise à la personne.",
        article: 'Art. 56 et D 15-5-1-1 C.P.P.',
      },
    ],
  },
  {
    id: 'mandats-justice',
    categorie: 'procedure',
    titre: 'Les mandats de justice',
    accroche:
      'Les mandats sont des actes écrits par lesquels le juge d\'instruction ordonne la comparution, la remise en liberté ou l\'incarcération d\'une personne.',
    source: 'F12 — Art. 122 à 136 C.P.P.',
    lienFascicule: '/fascicules/f12',
    lienQuiz: '/entrainement/quiz?mode=fascicule&f=f12',
    regles: [
      {
        label: 'Mandat de recherche',
        detail:
          "Ordonné par le JI contre une personne suspectée dont on ignore la résidence. Permet à tout OPJ d'appréhender la personne et de la présenter devant le JI.",
        article: 'Art. 122 C.P.P.',
      },
      {
        label: 'Mandat de comparution',
        detail: 'Ordonne à la personne de se présenter devant le JI à la date fixée. Aucune contrainte physique immédiate.',
        article: 'Art. 122 C.P.P.',
      },
      {
        label: "Mandat d'amener",
        detail: "Ordonne à la force publique d'amener immédiatement la personne devant le JI. Contrainte physique possible.",
        article: 'Art. 122 C.P.P.',
      },
      {
        label: 'Mandat de dépôt',
        detail:
          "Ordonné par le JI pour incarcérer le mis en examen en maison d'arrêt dans l'attente de son procès. Suppose une détention provisoire.",
        article: 'Art. 122 C.P.P.',
        alerte: true,
      },
      {
        label: "Mandat d'arrêt",
        detail:
          "Ordonné contre un mis en examen en fuite ou résidant à l'étranger. Permet de l'appréhender et de l'incarcérer.",
        article: 'Art. 122 C.P.P.',
      },
      {
        label: '⚠️ À retenir pour l\'examen',
        detail:
          "5 mandats = Recherche / Comparution / Amener / Dépôt / Arrêt. Le JI est le seul à les délivrer. L'OPJ exécute, il ne délivre pas de mandat.",
        alerte: true,
      },
    ],
    tableau: {
      colonnes: ['Mandat', 'Objectif', 'Contrainte physique', 'Délivré par'],
      lignes: [
        ['Recherche', 'Localiser & présenter', 'Oui si trouvé', 'JI'],
        ['Comparution', 'Convoquer', 'Non', 'JI'],
        ['Amener', 'Amener immédiatement', 'Oui', 'JI'],
        ['Dépôt', 'Incarcérer', 'Oui (emprisonnement)', 'JI + JLD'],
        ['Arrêt', 'Appréhender (fugitif)', 'Oui', 'JI'],
      ],
    },
  },
  {
    id: 'audition',
    categorie: 'procedure',
    titre: 'Les auditions',
    accroche:
      "L'audition est la procédure par laquelle l'OPJ recueille les déclarations d'une personne. Le statut de la personne entendue détermine les droits applicables.",
    source: 'F11 — Art. 61 à 62, Art. 63-4 C.P.P.',
    lienFascicule: '/fascicules/f11',
    lienQuiz: '/entrainement/quiz?mode=fascicule&f=f11',
    regles: [
      {
        label: 'Témoin (art. 62 C.P.P.)',
        detail:
          "Personne à l'encontre de laquelle il n'existe aucune raison plausible de soupçonner une infraction. Retenu max 4h. Pas de droit à l'avocat. Prête serment (dire la vérité). Peut être convoqué par l'OPJ.",
        article: 'Art. 62 C.P.P.',
      },
      {
        label: 'Audition libre (art. 61-1 C.P.P.)',
        detail:
          "Personne soupçonnée, entendue sans GAV. Doit être informée de : la qualification des faits, son droit de quitter les lieux, son droit à l'avocat, son droit au silence. Pas de contrainte physique.",
        article: 'Art. 61-1 C.P.P.',
        alerte: true,
      },
      {
        label: 'Gardé à vue (art. 63-4 C.P.P.)',
        detail:
          "Droit à l'avocat dès le début de la GAV (sauf report exceptionnel autorisé par PR jusqu'à 12h ou 24h). L'avocat peut consulter les PV d'audition du gardé à vue.",
        article: 'Art. 63-4 C.P.P.',
      },
      {
        label: 'Droit au silence',
        detail:
          "Toute personne entendue a le droit de garder le silence, quelle que soit sa qualité. Doit être notifié. Le silence ne peut pas être interprété comme un aveu.",
        alerte: true,
      },
      {
        label: 'Enregistrement audiovisuel',
        detail:
          'Obligatoire pour les auditions de mineurs victimes d\'infractions sexuelles. Obligatoire pour les interrogatoires en matière criminelle devant le JI (art. 116-1).',
        article: 'Art. 116-1 C.P.P.',
      },
    ],
    tableau: {
      colonnes: ['Statut', 'Contrainte', 'Avocat', 'Serment', 'Durée max'],
      lignes: [
        ['Témoin', 'Non', 'Non', 'Oui', '4h'],
        ['Audition libre', 'Non (peut partir)', 'Oui', 'Non', 'Pas de limite légale'],
        ['GAV', 'Oui', 'Oui (dès début)', 'Non', '24h (+24h)'],
      ],
    },
  },
  {
    id: 'requisitions',
    categorie: 'procedure',
    titre: 'Les réquisitions',
    accroche:
      "Les réquisitions permettent à l'OPJ d'obtenir de toute personne ou organisme des informations, des données ou des examens techniques nécessaires à l'enquête.",
    source: 'F11 — Art. 60, 60-1, 60-2, 60-3 C.P.P.',
    lienFascicule: '/fascicules/f11',
    lienQuiz: '/entrainement/quiz?mode=fascicule&f=f11',
    regles: [
      {
        label: 'Réquisitions à personne qualifiée (art. 60)',
        detail:
          "L'OPJ peut requérir toute personne qualifiée (médecin, expert, technicien) pour procéder à des examens techniques ou scientifiques. Cette personne prête serment.",
        article: 'Art. 60 C.P.P.',
      },
      {
        label: "Réquisitions de remise d'informations (art. 60-1)",
        detail:
          "Obtenir de toute personne, établissement ou organisme tout document utile à l'enquête (relevés téléphoniques, données bancaires, etc.). Refus sanctionné (3 750 €).",
        article: 'Art. 60-1 C.P.P.',
        alerte: true,
      },
      {
        label: 'Réquisitions de gel de données (art. 60-2)',
        detail:
          'Obtenir la conservation de données informatiques qui pourraient être effacées. S\'applique aux hébergeurs, FAI, opérateurs téléphoniques.',
        article: 'Art. 60-2 C.P.P.',
      },
      {
        label: 'Réquisitions de copie de données (art. 60-3)',
        detail:
          'Obtenir une copie des données informatiques contenues dans un système. Distinct de la saisie du matériel physique.',
        article: 'Art. 60-3 C.P.P.',
      },
      {
        label: 'En enquête préliminaire',
        detail:
          "Mêmes réquisitions mais numérotées art. 77-1, 77-1-1, 77-1-2, 77-1-3 C.P.P. Les règles sont identiques.",
        article: 'Art. 77-1 à 77-1-3 C.P.P.',
        alerte: true,
      },
    ],
  },
  {
    id: 'controle-judiciaire-detention',
    categorie: 'procedure',
    titre: 'Contrôle judiciaire, ARSE et détention provisoire',
    accroche:
      "Trois mesures de contrainte alternatives ou cumulatives décidées par le JLD en cours d'instruction, par ordre croissant de sévérité.",
    source: 'F12 — Art. 137 à 148-9 C.P.P.',
    lienFascicule: '/fascicules/f12',
    lienQuiz: '/entrainement/quiz?mode=fascicule&f=f12',
    regles: [
      {
        label: 'Contrôle judiciaire (CJ) — art. 138',
        detail:
          "Mesure la moins restrictive. Le mis en examen reste libre mais doit respecter des obligations (ne pas quitter le territoire, pointer, ne pas rencontrer certaines personnes, etc.). 17 obligations listées à l'art. 138 C.P.P.",
        article: 'Art. 138 C.P.P.',
      },
      {
        label: 'ARSE — Assignation à résidence avec surveillance électronique',
        detail:
          "Assignation au domicile avec bracelet électronique. Plus restrictive que le CJ mais moins que la détention. Nécessite accord du mis en examen.",
        article: 'Art. 142-5 C.P.P.',
      },
      {
        label: 'Détention provisoire (DP) — art. 143-1',
        detail:
          "Incarcération du mis en examen avant jugement. Conditions : infraction punie d'au moins 3 ans (ou 1 an dans certains cas). Le JLD décide, saisi par le JI. Durée maximale variable selon qualification (crime/délit).",
        article: 'Art. 143-1 C.P.P.',
        alerte: true,
      },
      {
        label: '⚠️ Principe de présomption d\'innocence',
        detail:
          "La détention provisoire est une mesure EXCEPTIONNELLE. Le principe est la liberté (art. préliminaire C.P.P.). La DP ne peut être prononcée que si le CJ et l'ARSE sont insuffisants.",
        alerte: true,
      },
      {
        label: 'Qui décide ?',
        detail:
          'Le JLD (Juge des Libertés et de la Détention) — saisi par le JI. En enquête de police : le JLD peut également intervenir pour autoriser certains actes (perquisitions de nuit, écoutes, etc.).',
        article: 'Art. 137-1 C.P.P.',
      },
    ],
    tableau: {
      colonnes: ['Mesure', 'Liberté', 'Conditions', 'Décidée par'],
      lignes: [
        ['Contrôle judiciaire', 'Oui (avec obligations)', 'Toute infraction', 'JLD'],
        ['ARSE', 'Partielle (domicile)', 'Accord requis', 'JLD'],
        ['Détention provisoire', 'Non', "≥ 3 ans d'emprisonnement", 'JLD (saisi par JI)'],
      ],
    },
  },
  {
    id: 'nullites',
    categorie: 'procedure',
    titre: 'Les nullités de procédure',
    accroche:
      'La nullité est la sanction d\'un acte de procédure irrégulier. Elle détruit ses effets juridiques et ceux des actes qui en découlent.',
    source: 'F15 — Art. 802, 173, 174 C.P.P.',
    lienFascicule: '/fascicules/f15',
    lienQuiz: '/entrainement/quiz?mode=fascicule&f=f15',
    regles: [
      {
        label: 'Nullités textuelles',
        detail:
          "Prévues expressément par un texte. Ex : perquisition sans les formalités de l'art. 59 C.P.P., réquisition sans respect de l'art. 60-1, interception de correspondances (art. 100-7).",
        article: 'Art. 802 C.P.P.',
      },
      {
        label: 'Nullités substantielles',
        detail:
          "Violation des droits de la défense ou d'une formalité essentielle. Nécessite que la violation ait causé un grief à la personne concernée.",
        article: 'Art. 802 C.P.P.',
        alerte: true,
      },
      {
        label: 'Condition du grief',
        detail:
          'Toute nullité (textuelle ou substantielle) ne peut être prononcée que si la violation a causé un grief à la personne qui la soulève (art. 802 C.P.P.).',
        alerte: true,
      },
      {
        label: 'Qui peut soulever la nullité ?',
        detail:
          "En cours d'instruction : la chambre de l'instruction (saisie par le JI, le PR, ou les parties). Sans information judiciaire : la juridiction de fond (art. 385 C.P.P.).",
        article: 'Art. 173 et 385 C.P.P.',
      },
      {
        label: "Effets de l'annulation",
        detail:
          "Annulation de l'acte irrégulier ET de tous les actes subséquents (effet cascade). Pièces retirées du dossier. Si GAV : éventuelle mise en liberté.",
        article: 'Art. 174 C.P.P.',
      },
    ],
  },
];
