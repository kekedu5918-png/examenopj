import type { Fascicule } from './fascicules-types';

/** F12 — F15 */
export const fasciculesChunk04: Fascicule[] = [
  {
    id: 'f12',
    num: 12,
    title: "L'instruction préparatoire, les mandats de justice, le contrôle judiciaire, la détention provisoire",
    subtitle: 'JI, mandats (5 types), contrôle judiciaire, ARSE, détention provisoire, justice des mineurs',
    domain: 'PROCEDURE',
    pages: 56,
    txtFile:
      '_13_f12_l_instruction_pr_paratoire_les_mandats_de_justice_le_contr_le_judiciaire_la_d_tention_provisoire.txt',
    chapters: [
      {
        title: "L'instruction préparatoire",
        page: 1,
        subChapters: [
          'Caractères : écrit, secret (art. 11 C.P.P.), non contradictoire',
          'Ouverture : facultative (délits) / obligatoire (crimes)',
          'Saisine du JI par le parquet (réquisitoire introductif) ou la victime (art. 85 C.P.P.)',
          'Pouvoirs du JI : constatations, expertise, auditions témoins / témoins assistés / mis en examen / PC',
          'Clôture : ordonnance de renvoi, mise en accusation, non-lieu (art. 177 C.P.P.)',
          "Chambre de l'instruction : rôle et appel des ordonnances",
        ],
      },
      {
        title: 'Les mandats de justice',
        page: 18,
        subChapters: [
          'Mandat de recherche — art. 122 C.P.P.',
          'Mandat de comparution — art. 122 C.P.P.',
          "Mandat d'amener — art. 122 C.P.P. (contrainte par la force publique)",
          'Mandat de dépôt — art. 122 C.P.P. (incarcération immédiate)',
          "Mandat d'arrêt — art. 122 C.P.P. (valable sur tout le territoire national)",
        ],
      },
      {
        title: "Le contrôle judiciaire et l'ARSE",
        page: 30,
        subChapters: [
          'Contrôle judiciaire — art. 138 C.P.P. (17 obligations possibles)',
          'ARSE — assignation à résidence avec surveillance électronique — art. 142-5 C.P.P.',
        ],
      },
      {
        title: 'La détention provisoire',
        page: 40,
        subChapters: [
          'Conditions — art. 144 C.P.P. : seule mesure suffisante au regard des objectifs',
          'Durée maximale : délits 4 mois prorogeable / crimes selon gravité de la peine',
          'JLD : rôle du juge des libertés et de la détention, saisine',
          'Justice des mineurs : CJPM, principes spécifiques',
        ],
      },
    ],
  },
  {
    id: 'f13',
    num: 13,
    title: 'Les juridictions de jugement, l’exécution des décisions de justice',
    subtitle: 'Tribunal de police, correctionnel, cour d’assises, cour criminelle, voies de recours, JAP',
    domain: 'PROCEDURE',
    pages: 33,
    txtFile: '_14_f13_les_juridictions_de_jugement_l_ex_cution_des_d_cisions_de_justice.txt',
    chapters: [
      {
        title: 'Principes généraux des juridictions pénales',
        page: 1,
        subChapters: [
          'Publicité des débats, principe du contradictoire, oralité',
          "Présomption d'innocence",
        ],
      },
      {
        title: 'Les juridictions de jugement',
        page: 5,
        subChapters: [
          'Tribunal de police — art. 521 à 549 C.P.P. (contraventions)',
          'Tribunal correctionnel — art. 381 à 495-25 C.P.P. (délits)',
          "Cour d'assises — art. 231 à 380-15 C.P.P. (crimes) : 3 magistrats + 6 jurés",
          'Cour criminelle départementale — art. 380-16 à 380-22 C.P.P. (crimes punis 15-20 ans)',
          'Juridictions pour mineurs : juge des enfants, tribunal pour enfants, cour d’assises des mineurs',
          'Juridictions spécialisées : stupéfiants, terrorisme, JIRS, crimes contre l’humanité, crimes sériels',
        ],
      },
      {
        title: 'Les voies de recours',
        page: 15,
        subChapters: [
          'Voies de recours ordinaires : opposition (jugement par défaut), appel (cour d’appel)',
          'Voies de recours extraordinaires : pourvoi en cassation, révision, réexamen',
          "Cour d'appel — art. L.311-1 C.O.J.",
          'Cour de cassation — art. L.411-1 C.O.J. : contrôle en droit uniquement, pas de fait',
        ],
      },
      {
        title: 'L’exécution des décisions de justice',
        page: 25,
        subChapters: [
          'Le casier judiciaire : bulletins B1, B2, B3',
          "Le juge de l'application des peines (JAP)",
          'Aménagements de peine : SEFIP, libération conditionnelle, semi-liberté, PSE',
        ],
      },
    ],
  },
  {
    id: 'f14',
    num: 14,
    title: 'Action publique et action civile — Autorités investies de fonctions de police judiciaire',
    subtitle: 'Ministère public, OPJ/APJ/APJA, habilitation, contrôle de la mission de PJ',
    domain: 'PROCEDURE',
    pages: 62,
    txtFile:
      '_15_f14_action_publique_et_action_civile_les_autorit_s_investies_par_la_loi_de_fonctions_de_police_judiciaire_le_contr_le_de_la_mission_de_police_judiciaire.txt',
    chapters: [
      {
        title: 'Action publique et action civile',
        page: 1,
        subChapters: [
          'Notions générales, comparaison et articulation des deux actions',
          'Sujets actifs : ministère public, administrations habilitées',
          "Sujets passifs : auteur/complice, représentant PM, responsable fait d'autrui",
          'Exercice : information du PR — art. 40 C.P.P., opportunité des poursuites',
          'Alternatives aux poursuites — art. 41-1 C.P.P.',
          'Composition pénale — art. 41-2 et 41-3 C.P.P.',
          'Saisine de la juridiction : citation directe, convocation par OPJ',
          "Extinction : prescription, amnistie, décès de l'auteur, autorité de chose jugée",
        ],
      },
      {
        title: 'Le ministère public',
        page: 25,
        subChapters: [
          'Composition, statut, nomination',
          "Subordination hiérarchique, liberté de parole à l'audience",
          'Caractéristiques : indivisibilité, irrécusabilité, irresponsabilité',
        ],
      },
      {
        title: 'Les autorités investies de fonctions de police judiciaire',
        page: 29,
        subChapters: [
          'OPJ — art. 16 C.P.P. : liste exhaustive, compétences, habilitation, serment',
          'APJ — art. 20 C.P.P. : attributions sous contrôle OPJ',
          "APJA (assistants d'enquête) — art. 21-1 C.P.P. : actes autorisés limités",
          'Agents de police judiciaire à compétences spécialisées (douanes, fisc, environnement)',
          'Tableau comparatif OPJ / APJ / APJA / AE : actes autorisés par cadre d’enquête (flagrance / préliminaire / CR)',
        ],
      },
      {
        title: 'Contrôle de la mission de police judiciaire',
        page: 50,
        subChapters: [
          'Contrôle du parquet — art. 12, 41, 75-1 C.P.P.',
          "Contrôle de la chambre de l'instruction",
          'Responsabilité disciplinaire et pénale de l’OPJ',
        ],
      },
    ],
  },
  {
    id: 'f15',
    num: 15,
    title: 'La nullité des actes de procédure',
    subtitle: 'Nullités textuelles, nullités substantielles, action en nullité, effets de l’annulation',
    domain: 'PROCEDURE',
    pages: 10,
    txtFile: '_16_f15_la_nullit_des_actes_de_proc_dure.txt',
    chapters: [
      {
        title: 'Les cas de nullité',
        page: 1,
        subChapters: [
          'Nullités textuelles en matière de perquisitions et saisies — art. 59 C.P.P.',
          'Nullités textuelles en matière de réquisitions — art. 60-1 et 77-1-1 C.P.P.',
          "Nullités textuelles en matière d'interception de correspondances — art. 100-7 C.P.P.",
          "Nullités textuelles en matière d'infiltration",
          "Nullités textuelles en matière de vérification d'identité — art. 78-3 C.P.P.",
          "Nullités textuelles en matière de moyens d'investigation exorbitants",
          'Nullités substantielles — art. 802 C.P.P. : atteinte aux intérêts de la partie',
        ],
      },
      {
        title: "L'annulation de l'acte",
        page: 6,
        subChapters: [
          'Action en nullité avec information judiciaire : chambre de l’instruction',
          'Action en nullité sans information — art. 385 C.P.P. : tribunal correctionnel',
          'Effets sur la procédure — art. 174 C.P.P. : annulation de l’acte + actes subséquents',
          'Effets pour les parties — art. 174 al.1 C.P.P.',
        ],
      },
    ],
  },
];
