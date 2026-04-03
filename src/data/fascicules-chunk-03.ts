import type { Fascicule } from './fascicules-types';

/** F08 — F11 */
export const fasciculesChunk03: Fascicule[] = [
  {
    id: 'f08',
    num: 8,
    title: 'Les libertés publiques',
    subtitle: 'Libertés fondamentales, CEDH, DDHC, sources, garanties et recours',
    domain: 'DPS',
    pages: 112,
    txtFile: '_09_f08_les_libert_s_publiques.txt',
    chapters: [
      {
        title: 'Introduction générale aux libertés publiques',
        page: 3,
        subChapters: [
          'Déclaration des Droits de l’Homme et du Citoyen — 26 août 1789',
          'Notion de libertés publiques et droits de l’homme (ch. 1 et 2)',
        ],
      },
      {
        title: 'Les sources des libertés publiques',
        page: 7,
        subChapters: [
          'Évolution historique jusqu’en 1958 : apports antérieurs à 1789, DDHC, évolution postérieure',
          'Sources actuelles : préambule Constitution 4 oct. 1958, textes internationaux',
          'CEDH — Convention Européenne des Droits de l’Homme',
          'Valeur juridique des sources',
        ],
      },
      {
        title: 'Le régime juridique des libertés publiques',
        page: 17,
        subChapters: [
          'Autorités réglementant : rôle du législateur, pouvoir réglementaire',
          'Moyens de réglementation : régime répressif, régime préventif',
        ],
      },
      {
        title: 'Garantie et protection des libertés',
        page: 27,
        subChapters: [
          'Recours devant les juridictions judiciaires',
          'Recours devant les juridictions administratives (REP, indemnité, responsabilité de l’État)',
          'Recours non juridictionnels : gracieux, hiérarchique, résistance à l’oppression',
          'Le Défenseur des droits',
          'Le Contrôleur général des lieux de privation de liberté',
          'Protection des données personnelles — CNIL',
        ],
      },
      {
        title: 'Les droits et libertés dans la pratique policière',
        page: 40,
        subChapters: [
          'Droit à la sûreté et protection contre la détention arbitraire',
          'Droit au respect de la vie privée et du domicile',
          'Secret des correspondances',
          'Libertés de réunion et de manifestation',
        ],
      },
    ],
  },
  {
    id: 'f09',
    num: 9,
    title: 'De la loi pénale, de la responsabilité pénale',
    subtitle: 'Classification des infractions, éléments constitutifs, complicité, irresponsabilité',
    domain: 'DPG',
    pages: 49,
    txtFile: '_10_f09_de_la_loi_p_nale_de_la_responsabilit_p_nale.txt',
    chapters: [
      {
        title: 'Généralités sur la législation pénale',
        page: 1,
        subChapters: ['Définition du droit pénal'],
      },
      {
        title: 'Classification des infractions',
        page: 2,
        subChapters: [
          'Classification tripartite : crimes / délits / contraventions',
          'Classification par nature : intentionnelle / non-intentionnelle / contraventionnelle',
          "Classification par mode de réalisation : instantanée / continue / d'habitude / complexe",
          'Tableau récapitulatif tripartite (prescription, GAV, compétence, juridiction)',
        ],
      },
      {
        title: 'Les éléments constitutifs de l’infraction',
        page: 10,
        subChapters: [
          'Élément légal : lois, traités, règlements administratifs, circulaires, jurisprudence',
          'Élément matériel : acte positif / omission, tentative punissable, tentative infructueuse',
          'Élément moral : intentionnel, non-intentionnel (imprudence, négligence), contraventionnel',
        ],
      },
      {
        title: 'Étendue d’application des lois',
        page: 18,
        subChapters: [
          'Application dans le temps : lois de fond (non-rétroactivité / rétroactivité in mitius), lois de forme',
          "Application dans l'espace : principe de territorialité, infractions hors de France",
        ],
      },
      {
        title: 'La complicité et la coaction',
        page: 26,
        subChapters: [
          'Conditions de la coaction — art. 121-4 C.P.',
          'Conditions de la complicité : aide/assistance, provocation, instructions — art. 121-7 C.P.',
          'Répression de la complicité — art. 121-6 C.P. : même peine que l’auteur principal',
        ],
      },
      {
        title: "Les causes d'irresponsabilité ou d'atténuation",
        page: 32,
        subChapters: [
          'Trouble mental — art. 122-1 C.P. : irresponsabilité totale / atténuation',
          'Contrainte — art. 122-2 C.P.',
          'Erreur de droit invincible — art. 122-3 C.P.',
          "Ordre de la loi ou commandement de l'autorité légitime — art. 122-4 C.P.",
          'Légitime défense — art. 122-5 et 122-6 C.P.',
          'État de nécessité — art. 122-7 C.P.',
          'Minorité : irresponsabilité < 13 ans, atténuation 13-18 ans',
          'Responsabilité pénale des personnes morales — art. 121-2 C.P.',
        ],
      },
    ],
  },
  {
    id: 'f10',
    num: 10,
    title: 'La sanction',
    subtitle: 'Peines, concours réel, récidive, réitération, circonstances aggravantes (art. 132-71 à 132-80)',
    domain: 'DPG',
    pages: 75,
    txtFile: '_11_f10_la_sanction.txt',
    chapters: [
      {
        title: 'Classification des peines et mesures de sûreté',
        page: 3,
        subChapters: [
          'Peines criminelles : réclusion criminelle à perpétuité / 30 / 20 / 15 ans + amende',
          'Peines correctionnelles : emprisonnement, amende, jour-amende, stages, TIG',
          'Peines contraventionnelles : amende de 1ère à 5ème classe',
          'Peines accessoires et complémentaires',
          'Mesures de sûreté : rétention, surveillance de sûreté, IRSP',
        ],
      },
      {
        title: "Règles applicables en cas de pluralité d'infractions",
        page: 13,
        subChapters: [
          'Concours réel d’infractions — règle du cumul / non-cumul — art. 132-2 à 132-7 C.P.',
          'La récidive légale — art. 132-8 à 132-16-5 C.P. (conditions + doublement de peine)',
          "La réitération d'infractions — art. 132-16-7 C.P.",
        ],
      },
      {
        title: "Les causes d'aggravation de la sanction",
        page: 33,
        subChapters: [
          'Circonstances aggravantes générales — art. 132-71 à 132-80 C.P.',
          'La bande organisée — art. 132-71 C.P.',
          'Le guet-apens — art. 132-71-1 C.P.',
          'La préméditation — art. 132-72 C.P.',
          "L'effraction — art. 132-73 C.P.",
          'L’escalade — art. 132-74 C.P.',
          "Le port ou usage d'une arme — art. 132-75 C.P.",
          'Le caractère raciste — art. 132-76 C.P.',
          'Le caractère homophobe ou transphobe — art. 132-77 C.P.',
          "L'utilisation d'un moyen de cryptologie — art. 132-79 C.P.",
          'La qualité de conjoint, concubin, partenaire PACS — art. 132-80 C.P.',
          'L’incapacité totale de travail',
          'La mutilation ou infirmité permanente',
          'La mort',
          'La minorité de quinze ans',
          'La particulière vulnérabilité de la victime',
          "La qualité de victime dépositaire de l'autorité publique",
          'Auteur ivre ou sous l’emprise de stupéfiants',
          "Utilisation d'un réseau de communication électronique",
        ],
      },
    ],
  },
  {
    id: 'f11',
    num: 11,
    title: 'Les cadres juridiques et les actes de la mission de police judiciaire',
    subtitle:
      "Contrôle d'identité, flagrance, enquête préliminaire, commission rogatoire, GAV, criminalité organisée",
    domain: 'PROCEDURE',
    pages: 174,
    txtFile: '_12_f11_les_cadres_juridiques_et_les_actes_de_la_mission_de_police_judiciaire.txt',
    chapters: [
      {
        title: "Contrôles, relevés et vérifications d'identité",
        page: 3,
        subChapters: [
          "Contrôle d'identité PJ — art. 78-2 C.P.P.",
          'Contrôle préventif — art. 78-2-2 C.P.P.',
          'Contrôle en zone frontière — art. 78-2-4 C.P.P.',
          "Relevé d'identité — art. 78-6 C.P.P.",
          "Vérification d'identité : rétention max 4h, recherche, obligations légales — art. 78-3 C.P.P.",
        ],
      },
      {
        title: "L'enquête de flagrance (art. 53 à 73 C.P.P.)",
        page: 21,
        subChapters: [
          'Notion de flagrance proprement dite et par présomption (clameur publique, indices)',
          "Domaine d'application : personnes et lieux",
          'Procédure : autorités habilitées, durée (48h initiale prorogeable)',
          'Saisine, plainte, constatations, perquisitions, fouilles de véhicules et personnes',
          'Saisies et scellés, interpellation, placement en GAV (droit commun 24h + 24h)',
          'Auditions, réquisitions (art. 60, 60-1, 60-2, 60-3 C.P.P.), saisie bancaire',
        ],
      },
      {
        title: "L'enquête préliminaire (art. 75 à 78 C.P.P.)",
        page: 71,
        subChapters: [
          'Domaine : toutes infractions, toutes personnes, tous lieux',
          'Perquisitions avec assentiment exprès et écrit — art. 76 C.P.P.',
          'GAV préliminaire, auditions, réquisitions (art. 77-1, 77-1-1, 77-1-2, 77-1-3 C.P.P.)',
        ],
      },
      {
        title: 'La commission rogatoire (art. 151 à 155 C.P.P.)',
        page: 91,
        subChapters: [
          'Autorités délégantes (JI) et délégataires (OPJ uniquement)',
          'Formalisme de la CR et commissions rogatoires internationales',
          'Actes procéduraux : constatations, auditions, perquisitions, saisies, GAV, réquisitions',
        ],
      },
      {
        title: 'La criminalité et la délinquance organisées',
        page: 113,
        subChapters: [
          'Infractions listées aux art. 706-73 et 706-73-1 C.P.P.',
          'Règles dérogatoires : GAV 96h (+ 24h×2), perquisitions 24h/24, IMSI-catcher, etc.',
          'Enquête préliminaire relative à la criminalité organisée',
        ],
      },
      {
        title: 'Mort de cause inconnue ou suspecte — art. 74 C.P.P.',
        page: 142,
        subChapters: [
          'Conditions : découverte de cadavre, mort dont la cause est inconnue ou suspecte',
          'Procédure art. 74 et 80-4 C.P.P. : transport, constatations, réquisitions',
          'Disparition inquiétante — art. 74-1 C.P.P.',
        ],
      },
    ],
  },
];
