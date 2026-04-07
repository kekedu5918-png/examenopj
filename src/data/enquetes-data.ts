import type { EnqueteMeta } from '@/data/enquetes-types';

export type { EnqueteDocument, EnqueteMeta } from '@/data/enquetes-types';

function fichePedago(
  partial: Omit<
    EnqueteMeta,
    'documents' | 'contenuMode' | 'personnages' | 'lieu' | 'date' | 'procedure'
  > & {
    documents?: EnqueteMeta['documents'];
    lieu?: string;
    date?: string;
    procedure?: string;
    personnages?: EnqueteMeta['personnages'];
  },
): EnqueteMeta {
  return {
    documents: partial.documents ?? [],
    personnages: partial.personnages ?? {
      opj: 'OPJ fictif — support de révision',
      victime: 'Selon scénario',
      misCause: 'Selon scénario',
    },
    lieu: partial.lieu ?? 'France (fictif)',
    date: partial.date ?? '20AA',
    procedure: partial.procedure ?? 'n° 20AA/…',
    contenuMode: 'pedago',
    id: partial.id,
    code: partial.code,
    titre: partial.titre,
    cadre: partial.cadre,
    resume: partial.resume,
    qualification: partial.qualification,
    articles: partial.articles,
    premium: partial.premium,
    themeCourt: partial.themeCourt,
    liensModules: partial.liensModules,
    objectifsEpreuve2: partial.objectifsEpreuve2,
  };
}

export const ENQUETES: EnqueteMeta[] = [
  {
    id: 'alpha',
    code: 'ALPHA',
    titre: "Enquête Alpha — Vol et atteinte aux biens",
    themeCourt: 'Enquête patrimoniale de base',
    cadre: 'Flagrant délit',
    resume:
      "Vol dans un local d'habitation. La victime surprend un individu en train de fouiller son buffet. Enquête en flagrance, identification par fichier TAJ, interpellation, GAV, perquisition, restitution.",
    qualification: "Vol dans un local d'habitation",
    articles: 'Art. 311-1 et 311-4 6° C.P.',
    personnages: {
      opj: 'Brigadier Chef de Police Paul DUCHAMPS',
      victime: 'Mme Danielle POTIN',
      misCause: 'Paul DESVIGNES',
    },
    lieu: 'Clermont-Ferrand (63)',
    date: '10 septembre 20AA',
    procedure: 'n° 20AA/1000',
    documents: [
      { id: 'alpha-sujet', type: 'sujet', label: "Sujet de l'enquête" },
      { id: 'alpha-articulation', type: 'articulation', label: 'Articulation de procédure' },
      { id: 'alpha-pv', type: 'pv', label: 'PV de plainte' },
      { id: 'alpha-rapport', type: 'rapport', label: 'Rapport de synthèse' },
    ],
    premium: false,
    ordrePedagogique: 1,
    niveau: 'debutant',
    prerequis: 'Aucun — planche complète gratuite (sujet, articulation, PV, rapport).',
    liensModules: [
      { href: '/cours/modules/f02', label: 'F02 — Atteintes aux biens' },
      { href: '/cours/modules/f11', label: 'F11 — Cadres et actes PJ' },
    ],
  },
  {
    id: 'bravo',
    code: 'BRAVO',
    titre: 'Enquête Bravo — Violences volontaires aggravées',
    themeCourt: 'Qualifications et cadres procéduraux',
    cadre: "Flagrant délit → Enquête préliminaire (changement de cadre)",
    resume:
      "Violences volontaires avec arme sur un enseignant par un mineur masqué. Changement de cadre juridique en cours d'enquête (flagrance → préliminaire). GAV mineur, confrontation, saisine incidente.",
    qualification: 'Violences volontaires aggravées avec arme',
    articles: 'Art. 222-12 C.P.',
    personnages: {
      opj: 'Brigadier Chef de Police Paul DUCHAMPS',
      victime: 'M. Alain VILLA',
      misCause: 'Raoul VERT, mineur âgé de 15 ans',
    },
    lieu: 'Beaumont / Clermont-Ferrand (63)',
    date: '11 décembre 20AA',
    procedure: 'n° 20AA/2222',
    documents: [
      { id: 'bravo-sujet', type: 'sujet', label: "Sujet de l'enquête" },
      { id: 'bravo-articulation', type: 'articulation', label: 'Articulation de procédure' },
      {
        id: 'bravo-articulation-suite',
        type: 'articulation-suite',
        label: 'Articulation suite — Saisine incidente',
      },
      { id: 'bravo-rapport', type: 'rapport', label: 'Rapport de synthèse' },
    ],
    premium: true,
    ordrePedagogique: 2,
    niveau: 'intermediaire',
    prerequis: 'Avoir lu F11 (cadres, GAV) et les bases F01 (qualifications). Comprendre la flagrance.',
    liensModules: [
      { href: '/cours/modules/f01', label: 'F01 — Atteintes aux personnes' },
      { href: '/cours/modules/f11', label: 'F11 — Cadres et actes PJ' },
    ],
  },
  fichePedago({
    id: 'charlie',
    code: 'CHARLIE',
    titre: 'Enquête Charlie — Infractions sexuelles et commission rogatoire',
    cadre: 'Enquête préliminaire (coopération)',
    resume:
      "Victime d'une agression sexuelle sur la voie publique. Auditions, relevés vidéo, saisine d'un juge d'instruction et commission rogatoire vers une BRI. Thème : qualifications 222-22 / 222-23, mineurs éventuels, exercice des droits.",
    qualification: 'Agression sexuelle (schéma pédagogique) — qualifications à affiner selon les faits',
    articles: 'Art. 222-22 à 222-27 C.P. ; CPP (auditions, CR, coopération)',
    premium: true,
    ordrePedagogique: 3,
    niveau: 'avance',
    prerequis: 'Enquête préliminaire maîtrisée ; auditions et saisine magistrat (F12).',
    themeCourt: 'Infractions sexuelles et coopération',
    objectifsEpreuve2: [
      'Enchaîner saisine, auditions, réquisitions techniques et sollicitation parquet sans rupture de cadre.',
      'PV et articulation : distinguer faits bruts, résultats des investigations et rapports hiérarchiques.',
    ],
    liensModules: [
      { href: '/cours/modules/f01', label: 'F01 — Personnes (agressions sexuelles)' },
      { href: '/cours/modules/f12', label: 'F12 — Procédure et actes d’enquête' },
    ],
  }),
  fichePedago({
    id: 'delta',
    code: 'DELTA',
    titre: "Enquête Delta — Contrôle d’identité, outrage, rébellion et faux",
    cadre: 'Flagrant délit / interpellation',
    resume:
      "Interpellation après contrôle d'identité contesté : outrage à agents, rébellion, usage possible de faux. À viser : qualités OPJ/APJ, notification GAV, PV télégraphiques.",
    qualification: 'Outrage, rébellion, faux et infractions voisines (schéma type)',
    articles: 'Art. 433-5, 434-9, 433-11 C.P. ; 78-2 et s. CSI',
    premium: true,
    ordrePedagogique: 4,
    niveau: 'intermediaire',
    prerequis: 'F11 (interpellation, GAV) ; notions F08 (contrôles, outrage, rébellion).',
    themeCourt: 'Atteintes aux autorités et ordre public',
    objectifsEpreuve2: [
      'Structurer les actes depuis le contrôle jusqu’aux suites (GAV ou autre) sans confusion des qualifications.',
      'Respecter la chronologie et les mentions obligatoires dans les PV d’interpellation.',
    ],
    liensModules: [
      { href: '/cours/modules/f08', label: 'F08 — Libertés publiques / contrôles' },
      { href: '/cours/modules/f11', label: 'F11 — Cadres et actes PJ' },
    ],
  }),
  fichePedago({
    id: 'echo',
    code: 'ECHO',
    titre: 'Enquête Echo — Stupéfiants et organisation',
    cadre: 'Enquête préliminaire / flagrance selon phase',
    resume:
      'Bascule entre saisies de consommation et faits d\'organisation : perquisitions, scellés, prolongations, saisine parquet. Pensée « dossier type examen OPJ » : rubriques et synthesis rapport.',
    qualification: 'Usage / détention / trafic (schéma à caler sur les faits du sujet)',
    articles: 'L. 3421-1 et s. CSP ; art. 222-37 et s. C.P.',
    premium: true,
    ordrePedagogique: 5,
    niveau: 'avance',
    prerequis: 'F07 (stupéfiants) ; perquisitions et prolongations (F11).',
    themeCourt: 'Enquêtes spécialisées stupéfiants',
    objectifsEpreuve2: [
      'Rapport de synthèse : résumer opérations, quantités, personnes et demandes au parquet sans hors-sujet.',
    ],
    liensModules: [
      { href: '/cours/modules/f07', label: 'F07 — Stupéfiants' },
      { href: '/cours/modules/f11', label: 'F11 — Actes d’enquête / GAV' },
    ],
  }),
  fichePedago({
    id: 'foxtrot',
    code: 'FOXTROT',
    titre: 'Enquête Foxtrot — Découverte de cadavre, scène et investigations techniques',
    cadre: 'Enquête préliminaire',
    resume:
      'Découverte de corps : prémices, périmètre, relevés PJ/ST, saisine magistrat. Articulation riche en actes coordonnés et annexes.',
    qualification: 'Homicide / coups mortels aggravés / infractions voisines selon scenario-pédagogique',
    articles: 'Art. 221-1 et s. ; 222-7 et s. — procédure (CPP garde de scène, auditions)',
    premium: true,
    ordrePedagogique: 6,
    niveau: 'avance',
    prerequis: 'Articulation riche : garde de scène, expertises (F01, F11).',
    themeCourt: 'Scène et investigations techniques',
    objectifsEpreuve2: [
      'Enchaîner constatations, expertises et transmissions sans anticiper des qualifications non posées par le sujet.',
    ],
    liensModules: [
      { href: '/cours/modules/f01', label: 'F01 — Atteintes aux personnes' },
      { href: '/cours/modules/f11', label: 'F11 — Actes d’enquête' },
    ],
  }),
  fichePedago({
    id: 'golf',
    code: 'GOLF',
    titre: 'Enquête Golf — Enlèvement, séquestration, dégradations',
    cadre: 'Flagrance ou préliminaire selon phase',
    resume:
      "Conflit prolongé : privation de liberté, menaces matérielles, enchainement d'actes sur plusieurs lieux. Travail de cadre et de qualité des interpellations.",
    qualification: 'Séquestration, enlèvement, violences ou dégradations (à décliner)',
    articles: 'Art. 224-1 et s. C.P. ; infractions connexes',
    premium: true,
    ordrePedagogique: 7,
    niveau: 'intermediaire',
    prerequis: 'Qualifications F01 (séquestration, violences) ; plusieurs actes enchaînés.',
    themeCourt: 'Atteintes graves aux personnes',
    objectifsEpreuve2: [
      'Gérer plusieurs mis en cause et victimes : un fil PV clair par acte majeur.',
    ],
    liensModules: [{ href: '/cours/modules/f01', label: 'F01 — Personnes' }],
  }),
  fichePedago({
    id: 'india',
    code: 'INDIA',
    titre: "Enquête India — Mineurs, représentation d'enfant et protection",
    cadre: 'Enquête préliminaire / auditions spécialisées',
    resume:
      "Non-représentation d'enfant, atteinte à mineur, auditions avec personne qualifiée. Points : CPP mineurs, mesures de protection, formulation prudente des faits.",
    qualification: 'Infractions à caractère familial / mineurs (schéma pédagogique)',
    articles: 'Art. 227-5 et s. C.P. ; mesures CPP enfance',
    premium: true,
    ordrePedagogique: 8,
    niveau: 'avance',
    prerequis: 'CPP mineurs, auditions adaptées (F01, F14).',
    themeCourt: 'Protection de l’enfance',
    objectifsEpreuve2: [
      'Mettre en évidence les actes spécifiques (audition adaptée, AEMO, etc.) dans l’articulation.',
    ],
    liensModules: [
      { href: '/cours/modules/f01', label: 'F01 — Personnes' },
      { href: '/cours/modules/f14', label: 'F14 — Police judiciaire / parquet' },
    ],
  }),
  fichePedago({
    id: 'accident',
    code: 'ACCIDENT',
    titre: 'Enquête Accident — AVP, piéton, délit de fuite',
    cadre: 'Garde à vue / enquête classique selon sujet',
    resume:
      'Collision, dépistages, constats, expertise ADN ou traces ; articulation proche du réel terrain police.',
    qualification: 'Homicide ou blessures involontaires ; délit de fuite éventuel',
    articles: 'Art. 221-6, 222-19, 223-1, L.234-1 et s. (route)',
    premium: true,
    ordrePedagogique: 9,
    niveau: 'intermediaire',
    prerequis: 'Constats, expertises, dépistages (F01 accidentologie).',
    themeCourt: 'Accidentologie routière',
    objectifsEpreuve2: [
      'Hiérarchiser constatations techniques et auditions dans des PV courts.',
    ],
    liensModules: [{ href: '/cours/modules/f01', label: 'F01 — Atteintes / accidentologie' }],
  }),
  fichePedago({
    id: 'patrimoniale',
    code: 'PATRIMONIALE',
    titre: 'Enquête Patrimoniale — Synthèse infractions contre les biens',
    cadre: 'Transversal (révision)',
    resume:
      "Vue consolidée : vols, escroqueries, abus de confiance, destructions. Sert de bouclage avant l’examen OPJ — pas de planche PDF unique, mais une grille d'articulation type.",
    qualification: 'Vol — escroquerie — abus de confiance (rassise en pratique)',
    articles: 'Livre III CP (biens) — rappel des seuils et qualifs',
    premium: true,
    ordrePedagogique: 10,
    niveau: 'avance',
    prerequis: 'Révision transversale — idéalement après Alpha et modules F02–F03.',
    themeCourt: 'Approche transversale patrimoine',
    objectifsEpreuve2: [
      'Comparer votre articulation aux fiches Alpha (vol) et aux modules F02 sur les biens.',
    ],
    liensModules: [
      { href: '/cours/modules/f02', label: 'F02 — Atteintes aux biens' },
      { href: '/cours/modules/f03', label: 'F03 — DPG / éléments constitutifs' },
    ],
  }),
];

export function getEnqueteById(id: string): EnqueteMeta | undefined {
  return ENQUETES.find((e) => e.id === id);
}
