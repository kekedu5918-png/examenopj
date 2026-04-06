/**
 * Catalogue PV (page /cours/pv) : fiches pédagogiques + lien vers exercices interactifs quand disponibles.
 * Phase A = MVP épreuve 2 ; Phase B = extension programme complète.
 */

export type PVPageSampleExercise = {
  status: 'live' | 'soon';
  href?: string;
  label: string;
};

export type PVPageSample = {
  slug: string;
  title: string;
  articles: readonly string[];
  mentions: string;
  erreurs: string;
  phase: 'A' | 'B';
  exercise: PVPageSampleExercise;
};

export const PV_PAGE_SAMPLES: PVPageSample[] = [
  {
    slug: 'plainte',
    title: 'PV de saisine / plainte',
    articles: ['Art. 15-3 C.P.P.', 'Art. 10-2 C.P.P.'],
    mentions:
      'Identité du plaignant, date/heure/lieu, circonstances, préjudice (matériel, physique, moral), ITT, N° sécurité sociale, partie civile.',
    erreurs:
      'Omission de mentions obligatoires, notification des droits de la victime incomplète, qualification imprécise des faits.',
    phase: 'A',
    exercise: {
      status: 'live',
      href: '#me1-pv',
      label: 'Modèles verbatim ME1 + exercice à trous (Ex. 4 / 5)',
    },
  },
  {
    slug: 'notification-gav',
    title: 'PV de notification de placement en GAV',
    articles: ['Art. 63-1 C.P.P.', 'Art. 62-2 C.P.P.', 'Art. 63-III C.P.P.'],
    mentions:
      'Huit informations / droits (infraction, durée, prévenir un tiers, médecin, avocat, silence, auditions, interprète) ; heure de début ; motifs au sens de l’art. 62-2 (six motifs).',
    erreurs:
      'Notification tardive ou imprécise, méconnaissance du chrono GAV, confusion avec audition libre.',
    phase: 'A',
    exercise: {
      status: 'live',
      href: '#pv-exercice-notification-gav',
      label: 'Exercice à trous (squelette)',
    },
  },
  {
    slug: 'audition-victime',
    title: "PV d'audition de victime",
    articles: ['Art. 10-2 C.P.P.'],
    mentions: 'Identité vérifiée, notification des droits, Q/R détaillées, relecture et signature, ITT et partie civile.',
    erreurs: 'Questions orientées, absence de relecture, oubli des droits de la victime.',
    phase: 'B',
    exercise: { status: 'soon', label: 'Exercice à trous — bientôt' },
  },
  {
    slug: 'audition-temoin',
    title: "PV d'audition de témoin",
    articles: ['Art. 62 C.P.P.', 'Art. 78 C.P.P.'],
    mentions:
      'Cadre flagrance ou enquête préliminaire, identité, durée (ex. 4 h hors soupçon), Q/R, relecture, pas de serment sauf cas prévus.',
    erreurs:
      'Confusion de qualité (témoin / suspect), absence de relecture, audition au-delà des durées légales.',
    phase: 'B',
    exercise: {
      status: 'live',
      href: '#pv-exercice-audition-temoin',
      label: 'Exercice à trous (articulation 10 points)',
    },
  },
  {
    slug: 'audition-libre',
    title: "PV d'audition du suspect en audition libre",
    articles: ['Art. 61-1 C.P.P.'],
    mentions:
      'Qualification des faits, droit de quitter les locaux, avocat, interprète, silence, mention explicite : la personne n’est pas en GAV.',
    erreurs:
      'Ambiguïté sur le régime (libre / GAV), défaut de notification des droits spécifiques à l’audition libre.',
    phase: 'B',
    exercise: { status: 'soon', label: 'Exercice à trous — bientôt' },
  },
  {
    slug: 'perquisition',
    title: 'PV de perquisition',
    articles: ['Art. 56 C.P.P.', 'Art. 76 C.P.P.'],
    mentions:
      'Heures légales (6 h–21 h sauf cas), présence ou deux témoins, assentiment écrit en préliminaire, état des saisies, scellés.',
    erreurs:
      'Nullité pour horaires non dérogés, carence de témoins, inventaire incomplet des supports numériques.',
    phase: 'B',
    exercise: { status: 'soon', label: 'Exercice à trous — bientôt' },
  },
  {
    slug: 'fin-gav',
    title: 'PV de fin de GAV',
    articles: ['Art. 64 C.P.P.'],
    mentions:
      'Motifs, début et fin avec horodatage, auditions et temps de repos, alimentation, destination (liberté, défèrement, etc.).',
    erreurs: 'Délais dépassés, mentions chronologiques incohérentes, destination omise.',
    phase: 'A',
    exercise: {
      status: 'live',
      href: '#pv-exercice-fin-gav',
      label: 'Exercice à trous (squelette)',
    },
  },
  {
    slug: 'enquete-voisinage',
    title: 'PV d’enquête de voisinage',
    articles: ['Art. 53 C.P.P.', 'Art. 68 C.P.P.'],
    mentions:
      'Poursuite de l’enquête de flagrance, visa des articles, lieu et périmètre, personnes susceptibles d’apporter des éléments, invitations au service, clôture « dont P.V. ».',
    erreurs:
      'Périmètre flou, liste des personnes incomplète, absence de lien avec les auditions ultérieures.',
    phase: 'A',
    exercise: {
      status: 'live',
      href: '#pv-exercice-enquete-voisinage',
      label: 'Exercice à trous (type ME1)',
    },
  },
  {
    slug: 'interpellation',
    title: 'PV d’interpellation / contrôle',
    articles: ['Art. 73 C.P.P.', 'Art. 78-2 C.P.P.', 'Art. 62-4 C.P.P.', 'Art. 63 C.P.P.'],
    mentions:
      'Articulation en points (mission, assistants, constatations, contrôle d’identité, palpation, flagrance, interpellation, identification, GAV ou libre, transport / scellés, clôture, fichiers).',
    erreurs:
      'Confusion GAV / audition libre, notification incomplète, rupture de temporalité terrain / bureau non expliquée.',
    phase: 'B',
    exercise: {
      status: 'live',
      href: '#pv-exercice-interpellation',
      label: 'Exercice à trous (12 points)',
    },
  },
  {
    slug: 'presentation-groupe',
    title: 'PV de constitution de groupe / présentation à témoin',
    articles: ['Art. 62 C.P.P.', 'Art. 78 C.P.P.'],
    mentions:
      'Objet précis, identités, conditions neutres de présentation, rappel du secret, déroulement factuel, réactions, signatures ou mentions.',
    erreurs: 'Ton orienté, oubli du refus du témoin de s’exprimer, incohérence avec les supports visuels.',
    phase: 'B',
    exercise: {
      status: 'live',
      href: '#pv-exercice-presentation-groupe',
      label: 'Exercice à trous',
    },
  },
];
