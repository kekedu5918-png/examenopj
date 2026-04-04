/**
 * Fiches de synthèse rédactionnelles par module (F01–F15).
 * Contenu original ExamenOPJ — à croiser avec Légifrance et votre formation.
 */

export type CourseModuleSynthesis = {
  /** Phrase d'accroche pédagogique (afficée sous le titre). */
  resume: string;
  /** Axes structurants pour la fiche. */
  axes: { titre: string; points: string[] }[];
  /** Ce qui compte pour l’exercice concret d’OPJ (procédure, qualification, PV). */
  pratiqueOpj: string[];
  /** Erreurs fréquentes en révision / concours. */
  pieges: string[];
};

export const courseModuleSyntheses: Record<string, CourseModuleSynthesis> = {
  f01: {
    resume:
      'Ce module structure les atteintes à la personne : hiérarchie des qualifications (homicides, violences, agressions sexuelles), liaison ITT / qualifications, et infractions voisines (mise en danger, harcèlement).',
    axes: [
      {
        titre: 'Hiérarchie et qualification',
        points: [
          'Distinguer intention de donner la mort, intention de frapper, homicide involontaire et infractions praeterintentionnelles.',
          'Relier gravité des violences, moyens employés et qualifications possibles selon les circonstances d’espèce.',
          'Repérer le rôle de la victime (mineur, conjoint, fonctionnaire, vulnérabilité) dans les circonstances aggravantes.',
        ],
      },
      {
        titre: 'Agressions sexuelles et infractions assimilées',
        points: [
          'Différencier contrainte, menace et absence de consentement dans les faits réels.',
          'Situer l’exhibition, le harcèlement sexuel et les infractions numériques dans un même paysage de lecture.',
        ],
      },
      {
        titre: 'Mise en danger et infractions apparentées',
        points: [
          'Traiter la mise en danger d’autrui, le non-assistance à personne en danger et les délits de fuite dans une logique de chaîne causale.',
        ],
      },
    ],
    pratiqueOpj: [
      'Constater l’état de la victime, les traces, les témoignages — sans préjuger de la qualification définitive.',
      'Séparer clairement faits matériels appréciés / qualification juridique retenue par l’autorité judiciaire.',
      'En articulation d’épreuve : enchaîner qualification → base légale invoquée par le parquet → actes utiles.',
    ],
    pieges: [
      'Confondre intention homicide et simple violence ayant entraîné la mort sans intention.',
      'Oublier les effets des circonstances (mineur, lien familial, qualité de la victime) sur la compétence et la peine.',
    ],
  },
  f02: {
    resume:
      'Vol, escroquerie, abus de confiance, recel, infractions numériques : maîtriser les comportements types et les articulations avec la circulation et l’usage de la force.',
    axes: [
      {
        titre: 'Atteintes patrimoniales classiques',
        points: [
          'Vol, tentative, vol aggravé (violence, effraction, réunion, armes).',
          'Escroquerie : tromperie, erreur et enrichissement ; confusion avec abus de confiance.',
        ],
      },
      {
        titre: 'Recel et blanchiment (aperçu)',
        points: [
          'Recel : lien avec l’infraction source et conscience de l’origine illicite.',
          'Repères sur le blanchiment en chaîne d’infractions patrimoniales.',
        ],
      },
      {
        titre: 'Biens et numérique',
        points: [
          'Intrusion frauduleuse, atteintes aux systèmes, infractions liées aux moyens de paiement.',
        ],
      },
    ],
    pratiqueOpj: [
      'Relier scellés, relevés et saisies à la suite probatoire du dossier (chaîne de possession).',
      'Distinguer ce qui relève du constat immédiat de ce qui relève de l’analyse juridique approfondie.',
    ],
    pieges: [
      'Mélanger abus de confiance et escroquerie sur les faits d’« abusement » de la bonne foi.',
      'Négliger la circonstance d’effraction ou de violence pour le vol aggravé.',
    ],
  },
  f03: {
    resume:
      'Infractions routières : homicide ou blessures involontaires, conduite sous emprise, refus d’obtempérer, rodéo — savoir lier les faits au cadre pénal et aux actes de procédure adaptés.',
    axes: [
      {
        titre: 'Homicides et blessures involontaires',
        points: [
          'Imprudence, inattention, manquement à une obligation ; lien avec le code de la route et la gravité des résultats.',
        ],
      },
      {
        titre: 'Conduite sous emprise et refus de se soumettre',
        points: [
          'Seuils, délit / contravention, procédure de vérification ; cohérence des constats.',
        ],
      },
      {
        titre: 'Délit de fuite et trouble à la circulation',
        points: [
          'Obligation d’arrêt et de porter secours ; qualification selon les conséquences.',
        ],
      },
    ],
    pratiqueOpj: [
      'Croiser témoignages, expertises techniques, relevés alcool/stupéfiants et scène des faits.',
      'Adapter la garde à vue et les auditions au regard de la gravité des faits et des personnes impliquées.',
    ],
    pieges: [
      'Confondre les régimes de la simple fuite et des blessures avec obligation d’assistance.',
    ],
  },
  f04: {
    resume:
      'Infractions touchant l’autorité, les institutions, la justice et la paix publique : comprendre les incriminations fréquentes en activité et leur gravité relative.',
    axes: [
      {
        titre: 'Atteintes aux personnes dépositaires de l’autorité publique',
        points: [
          'Outrage, rebellion, violences ; effets de la qualité de la victime.',
        ],
      },
      {
        titre: 'Atteintes à la justice et faux',
        points: [
          'Faux et usage, faux témoignage, entrave à la justice.',
        ],
      },
      {
        titre: 'Associations et atteintes collectives',
        points: [
          'Associations de malfaiteurs et infractions connexes.',
        ],
      },
    ],
    pratiqueOpj: [
      'Préserver la sécurité des intervenants et la légalité des interpellations face à des faits de violence institutionnelle.',
      'Documenter précisément les paroles et actes à l’encontre des forces de l’ordre ou du magistrat.',
    ],
    pieges: [
      'Sous-estimer la gravité de certaines atteintes à magistrats ou jurés alors que les faits semblent « verbaux ».',
    ],
  },
  f05: {
    resume:
      'Usage, détention, trafic et infractions périphériques : qualification, actes d’enquête et articulation avec le blanchiment ou le numérique.',
    axes: [
      {
        titre: 'Usage et figures de trafic',
        points: [
          'Distinguer usage simple, traffic, import et infractions aggravées.',
        ],
      },
      {
        titre: 'Mineurs et protection',
        points: [
          'Infractions impliquant des mineurs ou la provocation ; sensibilité procédurale.',
        ],
      },
    ],
    pratiqueOpj: [
      'Mettre en cohérence saisies, analyses et filières financières.',
      'Coordonner avec le parquet sur les qualifications et les gardes à vue prolongées éventuelles.',
    ],
    pieges: [
      'Oublier les infractions périphériques (association, blanchiment) qui structurent le dossier.',
    ],
  },
  f06: {
    resume:
      'Violences et préjudices au sein de la famille ou à l’encontre des mineurs : renforcer la détection et la réponse procédurale.',
    axes: [
      {
        titre: 'Mineurs victimes',
        points: [
          'Maltraitance, violences, atteintes sexuelles ; écoute et mécanismes de protection.',
        ],
      },
      {
        titre: 'Autorité parentale et délais',
        points: [
          'Abandon, non-représentation d’enfant, infractions à l’autorité parentale.',
        ],
      },
    ],
    pratiqueOpj: [
      'Associer les partenaires institutionnels (protection de l’enfance, éducation) sans anticiper le rôle du juge.',
      'Veiller aux conditions d’audition des mineurs et à l’information des titulaires de l’autorité parentale.',
    ],
    pieges: [
      'Négliger la chronologie familiale dans les violences conjugales impliquant des enfants.',
    ],
  },
  f07: {
    resume:
      'Classification, détention, port, transport : comprendre les régimes et les infractions les plus courantes.',
    axes: [
      {
        titre: 'Catégories et interdictions',
        points: [
          'Armes soumises à autorisation vs prohibées ; régimes spécifiques pour certaines professions.',
        ],
      },
      {
        titre: 'Infractions usuelles',
        points: [
          'Port illicile, détention non déclarée, falsification de documents.',
        ],
      },
    ],
    pratiqueOpj: [
      'Sécuriser la saisine des armes et la chaîne des scellés ; photographier et inventorier méthodiquement.',
    ],
    pieges: [
      'Confondre armes de catégories différentes et leurs régimes de répression.',
    ],
  },
  f08: {
    resume:
      'Libertés fondamentales, CEDH et opération terrain : encadrer les contrôles, les interpellations et la rédaction des PV.',
    axes: [
      {
        titre: 'Sources et principes',
        points: [
          'Hiérarchie normative, jurisprudence marquante pour la répression et la défense.',
        ],
      },
      {
        titre: 'Contrôles et mesures',
        points: [
          'Contrôle d’identité, fouilles ; proportionnalité et motivation dans les écrits.',
        ],
      },
    ],
    pratiqueOpj: [
      'Expliciter dans le PV les motifs et les délais pour limiter les nullités et les griefs.',
    ],
    pieges: [
      'Oublier l’impact des atteintes disproportionnées sur la recevabilité des suites pénales.',
    ],
  },
  f09: {
    resume:
      'Loi pénale, classification des infractions, éléments constitutifs, complicité et causes d’atténuation ou d’irresponsabilité : le socle théorique de toute qualification.',
    axes: [
      {
        titre: 'Infraction et responsabilité',
        points: [
          'Légale, matérielle, morale ; personnes morales et mineurs (repères).',
        ],
      },
      {
        titre: 'Tentative, complicité, concours',
        points: [
          'Conditions de punissabilité ; unité ou pluralité d’infractions.',
        ],
      },
    ],
    pratiqueOpj: [
      'Présenter au parquet une qualification provisoire argumentée sans figer la juridiction.',
    ],
    pieges: [
      'Confondre cause d’irresponsabilité et simple circonstance atténuante.',
    ],
  },
  f10: {
    resume:
      'Peines, récidive, circonstances et concours d’infractions : comprendre ce que le juge peut retenir et comment l’exposé doit structurer les chefs.',
    axes: [
      {
        titre: 'Types de peines et régimes',
        points: [
          'Peines principales et complémentaires ; personnalisation et obligations.',
        ],
      },
      {
        titre: 'Récidive et circonstances',
        points: [
          'Effets sur les peines encourues et sur la procédure applicable.',
        ],
      },
    ],
    pratiqueOpj: [
      'Rappeler dans les rapports les antécédents pertinents et les qualifications retenues antérieurement.',
    ],
    pieges: [
      'Mélanger concours idéal et concours réel dans l’exposé des faits.',
    ],
  },
  f11: {
    resume:
      'Mission de police judiciaire : enquêtes préliminaires, flagrance, auditions, gardes à vue, perquisitions — savoir enchaîner les actes dans le respect du CPP.',
    axes: [
      {
        titre: 'Cadres d’enquête',
        points: [
          'Différences pratiques entre enquête préliminaire et flagrance pour la cohérence des actes.',
        ],
      },
      {
        titre: 'Actes coercitifs',
        points: [
          'GAV : durées, droits, notifications ; auditions spécialisées (mineurs, avocat).',
        ],
      },
      {
        titre: 'Perquisitions et saisies',
        points: [
          'Consentement, décision judiciaire, horaires, personnes présentes.',
        ],
      },
    ],
    pratiqueOpj: [
      'Chaque acte doit être daté, motivé et rattaché à une autorisation ou un cadre légal clair dans le PV.',
    ],
    pieges: [
      'Erreurs sur les délais de GAV ou sur la notification des droits — source fréquente de nullités.',
    ],
  },
  f12: {
    resume:
      'Instruction, JLD, contrôle judiciaire, détention provisoire : situer le rôle de l’OPJ à l’étape instruction et les interactions avec le juge.',
    axes: [
      {
        titre: 'Instruction et secrets',
        points: [
          'Caractère écrit et secret ; ce que l’OPJ peut ou doit communiquer.',
        ],
      },
      {
        titre: 'Libertés et détention',
        points: [
          'JLD, retraits et prolongations, expertise à ordonner côté enquête.',
        ],
      },
    ],
    pratiqueOpj: [
      'Exécuter les commissions rogatoires dans le strict périmètre confié par le juge d’instruction.',
    ],
    pieges: [
      'Confondre les qualifications procédurales devant le juge d’instruction et en enquête préliminaire.',
    ],
  },
  f13: {
    resume:
      'Juridictions, compétences, phases de jugement et principes d’exécution des décisions — pour cadrer le traitement du dossier jusqu’au sort des peines.',
    axes: [
      {
        titre: 'Ordre judiciaire et compétence',
        points: [
          'Police, correctionnel, cour d’assises ; règles de saisine.',
        ],
      },
      {
        titre: 'Jugement et exécution',
        points: [
          'Voies de recours sommaires ; lien avec l’exécution des peines et le SPIP (repères).',
        ],
      },
    ],
    pratiqueOpj: [
      'Adapter le défèrement et les PV au niveau de juridiction attendu selon la qualification.',
    ],
    pieges: [
      'Erreurs de délais de comparution ou de citation selon la juridiction.',
    ],
  },
  f14: {
    resume:
      'Action publique et civile, parquet, police judiciaire, dévolution et articulation avec les parties : comprendre qui décide quoi à chaque étape.',
    axes: [
      {
        titre: 'Parquet et poursuites',
        points: ['Opportunité des poursuites, saisines, orientations d’enquête.'],
      },
      {
        titre: 'Parties et voies procédurales',
        points: [
          'Partie civile, indemnisation, liens avec le pénal.',
        ],
      },
      {
        titre: 'Acteurs de la PJ',
        points: [
          'Rôle OPJ / APJ, déférence au magistrat et rendus compte.',
        ],
      },
    ],
    pratiqueOpj: [
      'Rendre compte par écrit de façon claire pour permettre une orientation pénale cohérente.',
    ],
    pieges: [
      'Anticiper une décision de classement ou de qualification sans instruction du parquet.',
    ],
  },
  f15: {
    resume:
      'Nullités de procédure : distinguer motifs textuels et griefs substantiels, effets sur les actes et stratégie de rédaction pour limiter les irrégularités.',
    axes: [
      {
        titre: 'Typologie',
        points: [
          'Nullités « automatiques » vs celles soumises à démonstration du grief.',
        ],
      },
      {
        titre: 'Conséquences',
        points: [
          'Exclusion de preuve vs simple régularisation selon les cas.',
        ],
      },
    ],
    pratiqueOpj: [
      'Vérifier systématiquement dates, signatures, notifications et identités dans les PV critiques.',
    ],
    pieges: [
      'Penser qu’une erreur matérielle mineure entraine toujours nullité sans grief.',
    ],
  },
};

export function getCourseModuleSynthesis(id: string): CourseModuleSynthesis | undefined {
  return courseModuleSyntheses[id];
}
