import type { Fiche } from './fondamentaux-types';

/** Fiches 1–10 : procédure + début acteurs (source prompt ExamenOPJ V2) */
export const FONDAMENTAUX_PART1: Fiche[] = [
  {
    id: 'cadres-enquete',
    categorie: 'procedure',
    titre: "Les cadres d'enquête",
    accroche:
      "Trois cadres juridiques encadrent l'action de l'OPJ : la flagrance, l'enquête préliminaire et la commission rogatoire.",
    source: 'Art. 53, 75, 81 C.P.P.',
    lienModule: '/cours/modules/f11',
    lienQuiz: '/entrainement/quiz?mode=module&f=f11',
    regles: [
      {
        label: 'Flagrance (art. 53 C.P.P.)',
        detail:
          "Crime ou délit en cours ou venant de se commettre, ou présomption (clameur, indices matériels). L'enquête peut se poursuivre sans discontinuité pendant 8 jours sous contrôle du PR (continuité des investigations, pas seulement des PV). Prolongation exceptionnelle d'autant de 8 jours : uniquement si l'infraction est un crime ou un délit puni d'au moins 5 ans d'emprisonnement et si les investigations ne peuvent être différées. Si la chaîne d'opération est interrompue : poursuite en enquête préliminaire ou sur commission rogatoire.",
        article: 'Art. 53 à 73 C.P.P.',
        alerte: true,
      },
      {
        label: 'Enquête préliminaire (art. 75 C.P.P.)',
        detail:
          "Cadre de droit commun, sans urgence. Perquisition au domicile : assentiment exprès de la personne, ou — sans assentiment — autorisation préalable du JLD si les faits sont un crime, un délit puni d’une peine d’emprisonnement supérieure ou égale à trois ans, ou si la recherche porte sur des biens dont la confiscation est prévue à l’article 131-21 C. pén. ; la décision du JLD doit être écrite, motivée et respecter les conditions de l’article 76 al. 4 C.P.P. Pas de délai légal de l’enquête sauf délai raisonnable et respect de la contradiction.",
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
      colonnes: ['Cadre', 'Déclenchement', 'Perquisition', 'Durée / suite'],
      lignes: [
        ['Flagrance', 'Crime/délit flagrant', 'Sans assentiment (selon cas)', '8 j sans discontinuité ; +8 j si crime ou délit ≥ 5 ans et investigations non différables'],
        [
          'Préliminaire',
          'Toute infraction',
          'Assentiment ou JLD (crime, délit ≥ 3 ans, confiscation 131-21 C. pén., selon art. 76)',
          'Pas de plafond légal (série + contradiction)',
        ],
        ['Commission rogatoire', 'Délégation JI', 'Selon délégation', "Durée de l'information"],
      ],
    },
  },
  {
    id: 'controle-identite',
    categorie: 'procedure',
    titre: "Le contrôle d'identité",
    accroche:
      "Le contrôle d'identité permet à l'OPJ ou l'APJ d'inviter une personne à justifier de son identité dans les cas prévus par la loi.",
    source: 'Art. 78-2 C.P.P.',
    lienModule: '/cours/modules/f11',
    lienQuiz: '/entrainement/quiz?mode=module&f=f11',
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
    source:
      'Art. 62-2, 63, 63-1 à 64-1 C.P.P. · Code de la justice pénale des mineurs (retenue) — relecture Légifrance obligatoire avant examen.',
    lienModule: '/cours/modules/f11',
    lienQuiz: '/entrainement/quiz?mode=module&f=f11',
    regles: [
      {
        label: 'Conditions cumulatives (art. 62-2 C.P.P.)',
        detail:
          "1) Raisons plausibles de soupçonner l'infraction (crime ou délit puni d'emprisonnement). 2) GAV = unique moyen d'atteindre l'un des 6 objectifs légaux (présence, preuves, témoins, coauteurs, présentation PR, faire cesser l'infraction).",
        article: 'Art. 62-2 C.P.P.',
        alerte: true,
      },
      {
        label: 'Durée (droit commun, art. 63-II C.P.P.)',
        detail:
          "24 h maximum en première phase. Une prolongation d'autre 24 h est possible uniquement si l'infraction soupçonnée est un crime ou un délit puni d'une peine d'emprisonnement supérieure ou égale à un an, et si cette prolongation est l'unique moyen d'atteindre un des six objectifs de l'art. 62-2 ou de permettre la présentation devant l'autorité judiciaire (dont visioconférence). Décision motivée du procureur de la République.",
        article: 'Art. 63-II C.P.P.',
        alerte: true,
      },
      {
        label: 'Droits notifiés immédiatement (art. 63-1)',
        detail:
          "Notifier sans délai : informations sur les droits (proche, employeur), examen médical d'office et possibilité d'un second examen, assistance d'un avocat (sauf reports exceptionnels prévus par la loi), droit au silence, interprète, qualification et circonstances des faits.",
        article: 'Art. 63-1 à 63-3-1 C.P.P.',
      },
      {
        label: 'Qui peut placer en GAV ?',
        detail: "Uniquement l'OPJ (art. 63 al. 1). L'APJ ne peut pas. L'APJ peut cependant seconder l'OPJ.",
        article: 'Art. 63 al. 1 C.P.P.',
        alerte: true,
      },
      {
        label: 'Personnes non placées en garde à vue (mesure art. 62-2 sens GAV)',
        detail:
          'Mineurs de moins de 13 ans : pas de placement en garde à vue au sens du titre II du livre IV du CPP ; privation de liberté encadrée par le régime de la retenue (CJPM — voir bloc dédié). Agents diplomatiques. Président de la République. Certains agents consulaires (sauf crime flagrant selon le texte).',
        alerte: true,
      },
      {
        label: 'Mineurs de 10 à 13 ans — retenue (pas GAV)',
        detail:
          'Mesure de dernier recours pour atteindre les finalités de l’art. 62-2 CPP, avec accord préalable du magistrat habilité. Durée : 12 heures ; prolongation possible d’autant (12 h) dans les hypothèses strictement prévues par le CJPM et son décret d’application (notamment selon la gravité des faits). Avocat, information des représentants légaux, examen médical : régime protecteur. À vérifier sur Légifrance (CPP livre V / CJPM) : ne pas confondre avec le plafond du majeur.',
        article: 'CJPM (retenue) ; CPP art. 810-3 et s. (mineurs) — recouper fascicule F06',
        alerte: true,
      },
      {
        label: 'Contrôle obligatoire',
        detail:
          "Avis immédiat au PR lors du placement. Si prolongation : présentation de la personne au PR. Registre de garde à vue tenu obligatoirement.",
        article: 'Art. 63 al. 2 et 64 C.P.P.',
      },
      {
        label: 'Mineurs de 13 à 16 ans — garde à vue (durées)',
        detail:
          "Peuvent être placés en garde à vue si les conditions générales sont réunies. Durée initiale maximale : 24 h. Prolongation d'une nouvelle durée de 24 h (48 h au total) uniquement si l'infraction soupçonnée est punie d'une peine criminale ou d'une peine d'emprisonnement d'au moins cinq ans (seuil distinct du droit commun majeur : art. 63-II CPP, alinéas relatifs à la garde à vue des mineurs). Présence du représentant légal ou personne désignée, avocat obligatoire, examen médical, enregistrement : art. 63-2. Ne pas appliquer par analogie le plafond du majeur sans relire le texte mineurs.",
        article: 'Art. 61-8, 63-II (mineurs), 63-2 C.P.P.',
        alerte: true,
      },
      {
        label: 'Reprise de garde à vue entrecoupée',
        detail:
          "Si la personne est déférée au parquet puis réintégrée en GAV : la durée totale reste plafonnée par la loi ; chaque phase doit être motivée et contrôlée. Une rupture mal documentée dans les notifications ou présentations peut entraîner un grief utile (nullité substantielle).",
        article: 'Art. 63 et 803 C.P.P.',
        alerte: true,
      },
    ],
    tableau: {
      colonnes: ['Cadre', 'Plafond usuel', 'Prolongations exceptionnelles', 'Autorité'],
      lignes: [
        [
          'Droit commun (crime ou délit ≥ 1 an pour +24 h)',
          '24 h puis +24 h',
          '—',
          'PR (prolongation)',
        ],
        [
          'Infractions art. 706-73 (hors cas particuliers)',
          'Comme le droit commun puis au-delà de 48 h',
          'Soit 2 × 24 h (total 96 h), soit 1 × 48 h si le justifie',
          'JLD ou JI (écrit motivé, présentation en règle générale)',
        ],
        [
          'Infractions art. 706-73-1 et 706-74',
          'Identique droit commun',
          'Pas le régime 706-88',
          'PR pour la prolongation ordinaire',
        ],
        [
          'Terrorisme (art. 706-88-1)',
          'Jusqu’à 144 h',
          'Mécanisme dérogatoire spécifique',
          'JLD / magistrats habilités',
        ],
        [
          'Mineur 13–16 ans (GAV)',
          '24 h',
          '+24 h si infraction punie ≥ 5 ans emprisonnement (texte sur mineurs)',
          'PR (prolongation) + garanties 63-2',
        ],
        [
          'Mineur 10–13 ans (retenue, pas GAV)',
          '12 h (prolongation 12 h — cas légaux)',
          'Magistrat, dernier recours, art. 62-2',
          'CJPM / fascicule F06',
        ],
      ],
    },
  },
  {
    id: 'perquisition',
    categorie: 'procedure',
    titre: 'La perquisition',
    accroche:
      "Acte d'enquête consistant à pénétrer dans un lieu pour y rechercher des preuves ou des personnes.",
    source: 'Art. 56 à 59, 76 C.P.P.',
    lienModule: '/cours/modules/f11',
    lienQuiz: '/entrainement/quiz?mode=module&f=f11',
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
          "Assentiment exprès (écrit, signé) de la personne concernée, ou perquisition sans assentiment sur autorisation préalable du JLD lorsqu’il s’agit d’un crime, d’un délit puni d’au moins trois ans d’emprisonnement ou de la recherche de biens passibles de confiscation (art. 131-21 C. pén.) : la décision du JLD doit être écrite et motivée (qualification, adresse, objet, proportionnalité ; art. 76 al. 4). À défaut : nullité (art. 59 al. 2 en chaîne avec ces exigences).",
        article: 'Art. 76 et 59 C.P.P.',
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
      {
        label: 'Fouilles et palpations de sûreté (personnes)',
        detail:
          "À distinguer de la visite à corps à nu : la palpation de sûreté sécurise l'intervention ; la fouille intégrale (vide-sacs) prolonge le contrôle. Fondement : cadre d'enquête, proportionnalité, dignité — relever les traces horaires, l'identité des enquêteurs et la présence avocat / représentants lorsque le texte l'exige.",
        article: 'Art. 56 et 59 C.P.P.',
        alerte: true,
      },
      {
        label: 'Dérogations criminalité organisée',
        detail:
          "Certaines hypothèses (infractions d'atteinte aux biens en bande organisée, criminalité organisée, stupéfiants) autorisent des temps d'intervention ou des modalités dérogatoires (y compris fenêtres nocturnes) sous contrôle du JLD et motifs écrits.",
        article: 'Art. 706-73 et suivants C.P.P.',
        alerte: true,
      },
    ],
  },
  {
    id: 'mandats-justice',
    categorie: 'procedure',
    titre: 'Les mandats de justice',
    accroche:
      'Les mandats sont des actes écrits par lesquels le juge d\'instruction ordonne la comparution, la remise en liberté ou l\'incarcération d\'une personne.',
    source: 'Art. 122 à 136 C.P.P.',
    lienModule: '/cours/modules/f12',
    lienQuiz: '/entrainement/quiz?mode=module&f=f12',
    regles: [
      {
        label: 'Mandat de recherche',
        detail:
          "Ordre à la force publique de rechercher la personne et de la placer en garde à vue dès qu'elle est trouvée (art. 122 al. 2 C.P.P.). Décerné le plus souvent par le juge d'instruction dans le cadre d'une information ; exécution par OPJ/APJ désignés. Ne pas confondre avec une simple convocation : l'exécution matérielle encadre la privation de liberté selon le CPP.",
        article: 'Art. 122 C.P.P.',
        alerte: true,
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
    source: 'Art. 61 à 62, Art. 63-4 C.P.P.',
    lienModule: '/cours/modules/f11',
    lienQuiz: '/entrainement/quiz?mode=module&f=f11',
    regles: [
      {
        label: 'Témoin (art. 62 C.P.P.)',
        detail:
          "Personne sans raison plausible de soupçon. Audition : retenu le temps strictement nécessaire, sans excéder 4 h par audition ; plusieurs auditions de 4 h sont possibles si la personne a quitté librement les locaux entre-temps et qu'une convocation a été remise. Pas d'avocat. Serment de dire la vérité. Si des soupçons apparaissent : placement en GAV si conditions réunies (art. 62 al. 4).",
        article: 'Art. 62 C.P.P.',
        alerte: true,
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
    source: 'Art. 60, 60-1, 60-2, 60-3 C.P.P.',
    lienModule: '/cours/modules/f11',
    lienQuiz: '/entrainement/quiz?mode=module&f=f11',
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
      "Trois paliers de contrainte encadrés par le JLD après renvoi au tribunal ou en cours d’instruction : du CJ (obligations sous liberté) à l’ARSE (assignation surveillée), jusqu’à la détention provisoire si les mesures atténuées s’avèrent insuffisantes. À l’examen : maîtrise des critères de proportionnalité et des décideurs.",
    source: 'Art. 137 à 148-9 C.P.P.',
    lienModule: '/cours/modules/f12',
    lienQuiz: '/entrainement/quiz?mode=module&f=f12',
    regles: [
      {
        label: 'Contrôle judiciaire (CJ) — art. 138',
        detail:
          "Mesure la moins restrictive : le mis en examen demeure libre sous un ensemble d’obligations (ex. : ne pas quitter le territoire, présentations au greffe, interdiction de rencontrer certaines personnes, réparation du préjudice, soins, etc.). Le catalogue est fixé par la loi ; le JLD choisit parmi ces obligations celles qui sont nécessaires et proportionnées.",
        article: 'Art. 138 C.P.P.',
      },
      {
        label: 'ARSE — principe et effet sur la liberté',
        detail:
          "L’assignation à résidence avec surveillance électronique (ARSE) astreint le mis en examen à rester dans un périmètre défini (souvent le domicile), avec contrôle par bracelet ou autre dispositif. C’est une mesure intermédiaire, nettement plus lourde que le simple CJ. Le législateur encadre strictement les hypothèses ; vérifiez sur Légifrance les cas où l’accord de la personne est requis ou les exceptions prévues par le texte en vigueur.",
        article: 'Art. 142-3 à 142-8 C.P.P.',
        alerte: true,
      },
      {
        label: 'Décision du JLD et audition préalable',
        detail:
          "Le juge des libertés et de la détention statue après avoir entendu le mis en examen — ou son avocat — en principe en audience publique, sauf renonciation ou impossibilité caractérisée. Cette phase est déterminante pour la légalité et la motivation de la mesure.",
        article: 'Art. 139-1 C.P.P.',
      },
      {
        label: 'Détention provisoire (DP) — conditions et proportionnalité',
        detail:
          "La DP ne peut être ordonnée que si elle est seule à même d’empêcher l’atteinte aux victimes ou témoins, la fuite du mis en examen, la conservation des preuves ou la manifestation du trouble à l’ordre public exceptionnel dû à l’infraction. Elle doit en outre être proportionnée à l’infraction et à la personnalité de l’intéressé. Le plafond de durée et les prolongations suivent les distinctions crime / délit : à consolider sur les articles 143-1 et suivants et 144 C.P.P. pour votre concours.",
        article: 'Art. 143-1 et s. C.P.P.',
        alerte: true,
      },
      {
        label: 'Présomption d’innocence et exceptionnalité de la DP',
        detail:
          "La liberté est la règle. La détention provisoire est subsidiaire : le JLD ne peut l’ordonner qu’à défaut de suffisance des mesures atténuées (CJ, ARSE…) au regard des mêmes finalités (sauvegarde de la procédure, protection des tiers).",
        alerte: true,
      },
      {
        label: 'Mainlevée, modification et maintien',
        detail:
          "Le JLD peut à tout moment, d’office ou sur requête, assouplir, substituer ou lever une mesure si les motifs qui l’ont justifiée ont disparu ou si la mesure n’est plus proportionnée. Le maintien prolongé de la DP est un sujet d’actualité juridique : pensez « révision périodique » dans vos restitutions écrites.",
        article: 'Art. 148 C.P.P.',
      },
      {
        label: 'Rôle du juge d’instruction vs JLD',
        detail:
          "Le magistrat instructeur conduit l’information ; il adresse des réquisitions au JLD concernant placement sous CJ, ARSE ou DP. Ce sont des fonctions distinctes : à l’oral comme à l’écrit, ne pas confondre « qui propose » et « qui statue » sur les libertés.",
        article: 'Art. 137-1, 180 C.P.P.',
      },
    ],
    tableau: {
      colonnes: ['Mesure', 'Liberté', 'Logique', 'Décideur'],
      lignes: [
        ['Contrôle judiciaire', 'Oui (obligations)', 'Privilégier dès que les risques sont couverts sans incarcération', 'JLD'],
        ['ARSE', 'Très limitée (périmètre + surveillance)', 'Mesure intermédiaire encadrée (texte + technique)', 'JLD'],
        ['Détention provisoire', 'Non', 'Exceptionnelle : griefs impossibles à couvrir autrement', 'JLD'],
      ],
    },
  },
  {
    id: 'nullites',
    categorie: 'procedure',
    titre: 'Les nullités de procédure',
    accroche:
      'La nullité est la sanction d\'un acte de procédure irrégulier. Elle détruit ses effets juridiques et ceux des actes qui en découlent.',
    source: 'Art. 802, 173, 174 C.P.P.',
    lienModule: '/cours/modules/f15',
    lienQuiz: '/entrainement/quiz?mode=module&f=f15',
    regles: [
      {
        label: 'Nullités textuelles',
        detail:
          "Formalités dont la loi dispose qu'elles sont prescrites « à peine de nullité ». Ex. : art. 59 C.P.P. (perquisitions et formalités des art. 56 à 57), 60-1 et 77-1-1 (réquisitions), 78-3 (rétention d’identité), 100-7 (interceptions). L’art. 802-2 C.P.P. encadre aussi certaines suites lorsque la personne n’a pas été poursuivie dans un délai après perquisition ou visite domiciliaire.",
        article: 'Art. 802 et 802-2 C.P.P.',
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
