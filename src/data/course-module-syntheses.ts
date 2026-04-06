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
  /** Erreurs fréquentes en révision / examen OPJ. */
  pieges: string[];
  /** Attendus explicites à l’examen (afficés « Attendus à l’examen »). */
  examenAttendus?: string[];
  /** Terrain OPJ vs restitution attendue sur copie / oral. */
  copieVsTerrain?: { terrain: string; copie: string }[];
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
      'Violences avec ITT : vérifier le seuil et la qualification retenue par le parquet (correctionnel vs assises selon les cas).',
    ],
    examenAttendus: [
      'Épreuve 1 : hiérarchiser violences, homicides et formes aggravées ; titres du programme exacts, PRQC lisible.',
      'Épreuve 2 : du constat (victime, traces, réunion) à la suite procédurale sans confondre fait constaté et qualification définitive.',
      'Oral : exposer en quelques phrases élément légal / matériel / moral sur les atteintes aux personnes les plus fréquentes.',
    ],
    copieVsTerrain: [
      {
        terrain: 'Vous constatez, sécurisez, auditionnez et transmettez des faits bruts au parquet.',
        copie: 'Vous démontrez la qualification par les éléments constitutifs avec un plan maîtrisé et la terminologie du programme.',
      },
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
          'Extorsion et abus de faiblesse : distinguer la contrainte psychologique de la simple tromperie.',
        ],
      },
    ],
    pratiqueOpj: [
      'Relier scellés, relevés et saisies à la suite probatoire du dossier (chaîne de possession).',
      'Distinguer ce qui relève du constat immédiat de ce qui relève de l’analyse juridique approfondie.',
      'Sur le recel : ancrer la conscience de l’origine illicite dans les déclarations, messages et objectivements.',
    ],
    pieges: [
      'Mélanger abus de confiance et escroquerie sur les faits d’« abusement » de la bonne foi.',
      'Négliger la circonstance d’effraction ou de violence pour le vol aggravé.',
    ],
    examenAttendus: [
      'Épreuve 1 : distinguer vol, escroquerie, abus de confiance, recel — concours et peines si le sujet l’exige.',
      'Épreuve 2 : relier saisies et PV aux infractions retenues dans l’articulation (pas seulement une liste d’articles).',
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
      'Rodéo et refus d’obtempérer : ne pas amalgamer qualification, circonstances aggravantes et compétence sans relire le texte.',
    ],
    examenAttendus: [
      'Épreuve 1 : cas ou dissertation sur homicide / blessures involontaires, délit de fuite et compétence.',
      'Épreuve 2 : chronologie des constats, expertises et auditions alignés sur le cadre (EP / flagrance).',
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
          'Apologie du terrorisme et atteintes aux symboles : situer la gravité et les infractions annexes (provocation, menaces).',
        ],
      },
    ],
    pratiqueOpj: [
      'Sur l’outrage ou la rébellion : citer les termes exacts, le contexte et les qualités des personnes visées (conditions de l’infraction).',
      'Préserver la sécurité des intervenants et la légalité des interpellations face à des faits de violence institutionnelle.',
      'Documenter précisément les paroles et actes à l’encontre des forces de l’ordre ou du magistrat.',
    ],
    pieges: [
      'Sous-estimer la gravité de certaines atteintes à magistrats ou jurés alors que les faits semblent « verbaux ».',
    ],
    examenAttendus: [
      'Épreuve 1 : outrage, rébellion, faux et entrave — rattachement au programme sans catalogue gratuit.',
      'Épreuve 2 : cadre des auditions et constats lorsque fonctionnaires ou justice sont visés.',
    ],
  },
  f05: {
    resume:
      'Usage, détention, trafic et infractions périphériques : qualification, actes d’enquête et articulation avec le blanchiment ou le numérique.',
    axes: [
      {
        titre: 'Usage et figures de trafic',
        points: [
          'Distinguer usage, détention, offre, traffic, import ; connaître les seuils et formes aggravées (réunion, mineur, violences).',
          'Lien avec association de malfaiteurs et blanchiment des produits du trafic.',
        ],
      },
      {
        titre: 'Mineurs et protection',
        points: [
          'Infractions impliquant des mineurs ou la provocation ; sensibilité procédurale.',
          'Collaboration parquet pour GAV, perquisitions et qualifications pouvant ouvrir le livre IV bis C.P.P.',
        ],
      },
    ],
    pratiqueOpj: [
      'Mettre en cohérence saisies, analyses et filières financières.',
      'Coordonner avec le parquet sur les qualifications et les gardes à vue prolongées éventuelles.',
    ],
    pieges: [
      'Oublier les infractions périphériques (association, blanchiment) qui structurent le dossier.',
      'Confondre usage et détention : le discernement du juge et du parquet repose sur les circonstances concrètes (quantité, emballage, matériel).',
    ],
    examenAttendus: [
      'Épreuve 1 : trafic, usage, figures aggravées (mineur, réunion) et peines.',
      'Épreuve 2 : cohérence des saisies, analyses et qualifications avec les suites parquet.',
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
          'Violences conjugales avec enfant : articuler mesures de protection, signalements et audition adaptée.',
        ],
      },
    ],
    pratiqueOpj: [
      'Associer les partenaires institutionnels (protection de l’enfance, éducation) sans anticiper le rôle du juge.',
      'Veiller aux conditions d’audition des mineurs et à l’information des titulaires de l’autorité parentale.',
    ],
    pieges: [
      'Négliger la chronologie familiale dans les violences conjugales impliquant des enfants.',
      'Corruption de mineur et atteintes sexuelles : vérifier la qualification (âge, contrainte, lien d’autorité) plutôt qu’un intitulé générique.',
    ],
    examenAttendus: [
      'Épreuve 1 : mineurs victimes, autorité parentale et qualifications voisines.',
      'Oral : sensibilité des auditions et articulation avec la protection de l’enfance.',
    ],
  },
  f07: {
    resume:
      'Classification, détention, port, transport : comprendre les régimes et les infractions les plus courantes.',
    axes: [
      {
        titre: 'Catégories et interdictions',
        points: [
          'Catégories A à D ; armes proches de l’arme de guerre ; régimes chasse / tir / administrations.',
        ],
      },
      {
        titre: 'Infractions usuelles',
        points: [
          'Port, transport, détention sans autorisation ; acquisition ou détention prohibée ; vol ou recel d’arme.',
          'Relever les circonstances aggravantes (réunion, usage avec violences, lieux sensibles).',
        ],
      },
    ],
    pratiqueOpj: [
      'Sécuriser la saisine des armes et la chaîne des scellés ; photographier et inventorier méthodiquement.',
      'Consigner l’état de fonctionnement (chargeur, culasse), les marquages et la correspondance catégories / documents.',
    ],
    pieges: [
      'Confondre armes de catégories différentes et leurs régimes de répression.',
      'Munitions, accessoires et répliques : ne pas assimiler à un jouet sans analyser le cadre légal applicable.',
    ],
    examenAttendus: [
      'Épreuve 1 : catégories, détention, port et circonstances aggravantes.',
      'Épreuve 2 : PV de saisie et inventaire exploitables dans les questions dossier.',
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
          'Contrôle d’identité (78-2), rétention courte (78-3), fouilles et actes proportionnés ; motivation dans les écrits.',
          'Liberté d’aller et venir, vie privée : liens avec la recevabilité des preuves et le contrôle de légalité.',
        ],
      },
    ],
    pratiqueOpj: [
      'Expliciter dans le PV les motifs, le cadre légal invoqué et les délais pour limiter nullités et griefs.',
    ],
    pieges: [
      'Oublier l’impact des atteintes disproportionnées sur la recevabilité des suites pénales.',
      'Utiliser le contrôle d’identité comme prétexte à un acte d’enquête non prévu par la loi.',
    ],
    examenAttendus: [
      'Épreuve 1 : proportionnalité, recevabilité et lien avec nullités (aperçu).',
      'Épreuve 2 : motivation des contrôles et mesures dans les écrits type PV.',
    ],
  },
  f09: {
    resume:
      'Loi pénale, classification des infractions, éléments constitutifs, complicité et causes d’atténuation ou d’irresponsabilité : le socle théorique de toute qualification.',
    axes: [
      {
        titre: 'Infraction et responsabilité',
        points: [
          'Légale, matérielle, morale ; personnes morales (encadrement distinct) et mineurs (responsabilité pénale et éducative).',
        ],
      },
      {
        titre: 'Tentative, complicité, concours',
        points: [
          'Conditions de punissabilité ; unité ou pluralité d’infractions ; consommation et mobile.',
        ],
      },
    ],
    pratiqueOpj: [
      'Présenter au parquet une qualification provisoire argumentée sans figer la juridiction.',
      'Séparer dans le PV faits objectifs, indices et appréciation provisoire des éléments moraux.',
    ],
    pieges: [
      'Confondre cause d’irresponsabilité et simple circonstance atténuante.',
      'Imprudence punissable (délit ou crime involontaire) vs simple accident non fautif : le lien de causalité et l’obligation violée.',
    ],
    examenAttendus: [
      'Épreuve 1 : éléments constitutifs, complicité, tentative et concours — socle transversal.',
      'Toute copie DPS s’appuie implicitement sur F09 : structurez sans vous perdre en théorie pure.',
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
          'Récidive légale : conditions de constitution et effets sur le périmètre de peine.',
          'Circonstances atténuantes et aggravantes ; peines complémentaires (interdictions, travail d’intérêt général, etc.).',
        ],
      },
    ],
    pratiqueOpj: [
      'Rappeler dans les rapports les antécédents pertinents et les qualifications retenues antérieurement.',
      'Pour l’épreuve : rattacher chaque chef aux peines encourues (fourchettes) sans improviser hors texte.',
    ],
    pieges: [
      'Mélanger concours idéal et concours réel dans l’exposé des faits.',
      'Oublier que la récidive suppose souvent une condamnation antérieure au sens précis de la loi pour la même nature d’infraction.',
    ],
    examenAttendus: [
      'Épreuve 1 : peines, circonstances et récidive après qualification des chefs.',
      'Épreuve 2 : cohérence entre qualifications déférées et exposes peines dans les réponses.',
    ],
  },
  f11: {
    resume:
      'Mission de police judiciaire : enquêtes préliminaires, flagrance, auditions, gardes à vue, perquisitions — savoir enchaîner les actes dans le respect du CPP.',
    axes: [
      {
        titre: 'Cadres d’enquête',
        points: [
          'Préliminaire vs flagrance : perquisitions, continuité des opérations, passage en préliminaire ou CR si la chaîne flagrancielle est rompue.',
          'Flagrance : 8 jours sans discontinuité ; prolongation +8 j uniquement si crime ou délit puni d’au moins 5 ans et investigations non différables.',
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
          'Flagrance vs préliminaire : sans assentiment dès lors que le cadre le permet ; en préliminaire, assentiment ou JLD (crime, délit ≥ 3 ans, confiscation 131-21 C. pén., art. 76 al. 4).',
          'Lieux protégés (avocat, presse, etc.), horaires 6h–21h et formalités art. 56–59 à peine de nullité.',
        ],
      },
    ],
    pratiqueOpj: [
      'Chaque acte doit être daté, motivé et rattaché à une autorisation ou un cadre légal clair dans le PV.',
    ],
    pieges: [
      'Erreurs sur les délais de GAV ou sur la notification des droits — source fréquente de nullités.',
      'Confondre « 8 + 8 jours » systématique en flagrance avec le seuil du délit ≥ 5 ans et l’exigence de continuité des investigations.',
      'Penser que toute perquisition en préliminaire exige l’assentiment : oublier le cas JLD (crime / délit ≥ 3 ans / confiscation).',
    ],
    examenAttendus: [
      'Épreuve 2 : cœur du dossier — enchaîner cadre (flagrance / EP / CR), actes coercitifs et PV de synthèse.',
      'Épreuve 1 : maîtriser les incidences pénales des irrégularités graves (lien avec nullités sans faire du cours abstrait).',
    ],
    copieVsTerrain: [
      {
        terrain: 'Vous opérez les actes et les consignez pour permettre au parquet et au juge de trancher.',
        copie: 'Vous démontrez que chaque mesure était légalement fondée, motivée et chronologiquement cohérente avec la qualification visée.',
      },
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
          'Contrôle judiciaire, assignation à résidence, bracelet ; révision et levée par le JLD.',
          'Détention provisoire : exceptionnalité, motivation ; mandats d’amener, de dépôt vs mandat de recherche (effets différents).',
        ],
      },
    ],
    pratiqueOpj: [
      'Exécuter les commissions rogatoires dans le strict périmètre confié par le juge d’instruction.',
    ],
    pieges: [
      'Confondre les qualifications procédurales devant le juge d’instruction et en enquête préliminaire.',
      'Mandat de recherche (art. 122 al. 2 C.P.P.) : porter sur la recherche et le placement en GAV dès l’appréhension, et non seulement une présentation « au greffe » du juge.',
      'Mandat de dépôt : ordre de mise en détention provisoire une fois la personne sous le coup d’un placement à ordonner ; ne pas le confondre avec le mandat de recherche.',
    ],
    examenAttendus: [
      'Épreuve 2 : commissions rogatoires, mesures privatives de liberté et questions sur le secret de l’instruction.',
      'Oral : synthèse sur le rôle OPJ sous statut d’instruction (respect du juge d’instruction).',
    ],
  },
  f13: {
    resume:
      'Juridictions, compétences, phases de jugement et principes d’exécution : tribunal de police, correctionnel, cour criminelle départementale et cour d’assises ; recours et exécution des peines.',
    axes: [
      {
        titre: 'Ordre judiciaire et compétence',
        points: [
          'Contravention → tribunal de police ; délit → correctionnel ; crimes selon périmètre CCD (15–20 ans) ou cour d’assises (jurés).',
          'Tribunal administratif : certaines sanctions de police administrative ; ordre judiciaire pénal : infractions du code pénal — ne pas mélanger compétences, parties et recours.',
        ],
      },
      {
        titre: 'Jugement et exécution',
        points: [
          'Opposition, appel (effet suspensif sauf exceptions), pourvoi en cassation (contrôle de légalité).',
          'Exécution provisoire vs suspension : SPIP, détention et peines alternatives (repères pour le dossier).',
        ],
      },
    ],
    pratiqueOpj: [
      'Adapter le défèrement, les qualifications et les PV au niveau de juridiction réellement saisie.',
      'Mentionner les gardes à vue et actes critiques avec les dates pour le calendrier de comparution et de recours.',
    ],
    pieges: [
      'Erreurs de délais de comparution ou de citation selon la juridiction.',
      'Confondre appel (fond, cour d’appel) et cassation (moyens de droit, Cour de cassation) ou oublier le caractère très bref du pourvoi pénal.',
    ],
    examenAttendus: [
      'Épreuve 1 : compétence matérielle et juridiction penchant selon la qualification.',
      'Épreuve 2 : défèrement, comparution et cohérence dossier / juridiction saisie.',
    ],
  },
  f14: {
    resume:
      'Action publique et civile, opportunité des poursuites, ministère public, OPJ / APJ / assistants d’enquête et contrôle de la mission de PJ : qui saisit, qui décide, qui exécute.',
    axes: [
      {
        titre: 'Parquet et poursuites',
        points: [
          'Principe d’opportunité des poursuites et ses limites légales ; alternatives (art. 41-1), composition pénale, mise en mouvement de l’action.',
          'Prescription et extinction : transaction, retrait de plainte (infractions poursuites sur plainte), amnistie, décès, chose jugée.',
        ],
      },
      {
        titre: 'Parties et voies procédurales',
        points: [
          'Partie civile devant le pénal ; constitution et effets sur la procédure ; réparation et lien avec l’action civile autonome.',
          'Modalités de saisine : citation, convocation, comparution immédiate, CRPC (repères) — sans confondre les régimes.',
        ],
      },
      {
        titre: 'Acteurs de la PJ et contrôle',
        points: [
          'Attributions et périmètres : OPJ, APJ, assistants d’enquête selon le cadre (flagrance, préliminaire, CR).',
          'Rendus compte au PR, contrôle du parquet et du juge d’instruction ; indivisibilité et caractère du ministère public.',
        ],
      },
    ],
    pratiqueOpj: [
      'Rendre compte par écrit : faits, qualifications proposées, mesures déjà posées et suite demandée — sans usurper la décision du parquet.',
      'Tracer les réquisitions écrites et les réponses pour les actes sensibles (perquisitions, GAV prolongée, technique).',
    ],
    pieges: [
      'Anticiper une décision de classement ou de qualification sans instruction du parquet.',
      'Confondre CRPC et composition pénale, ou oublier que l’action civile n’a pas le même sort que l’action publique.',
    ],
    examenAttendus: [
      'Épreuve 2 : opportunité des poursuites, saisine du parquet et rôle OPJ / APJ dans les écrits.',
      'Oral : posture « rendre compte sans décider » — nuances attendues par le jury.',
    ],
    copieVsTerrain: [
      {
        terrain: 'Vous proposez et exécutez ; le parquet et le juge tranchent.',
        copie: 'Vous montrez la chaîne décisionnelle (réquisitions, suites données) sans vous substituer au magistrat.',
      },
    ],
  },
  f15: {
    resume:
      'Nullités textuelles et substantielles : respect des formalités « à peine de nullité » (perquisitions, réquisitions, interceptions…) ; toujours le grief au centre (art. 802) ; effet cascade (art. 174).',
    axes: [
      {
        titre: 'Typologie',
        points: [
          'Nullité textuelle : la loi exclut l’appréciation du juge sur l’existence de la sanction.',
          'Nullité substantielle : atteinte à la défense ou formalité essentielle ; prononcée seulement s’il y a grief (art. 802).',
        ],
      },
      {
        titre: 'Conséquences et voies',
        points: [
          'Effets sur l’acte et les actes subséquents (art. 174) ; instruction vs absence d’information (chambre de l’instruction, art. 173 ; art. 385 au pénal sans instruction).',
          'Art. 802-2 : possibilité d’information sur suites après perquisition / visite sans poursuite dans le délai légal.',
        ],
      },
    ],
    pratiqueOpj: [
      'Pour les perquisitions : personnes présentes ou représentées, horaires, lieux protégés (avocat, presse, ordres) selon les textes ; citer l’autorisation dans le PV.',
      'Vérifier systématiquement dates, signatures, notifications et identités dans les PV de GAV, garde et auditions.',
    ],
    pieges: [
      'Penser qu’une erreur matérielle mineure entraîne toujours nullité sans grief (art. 802 : condition du grief).',
      'Croire qu’une violation d’une formalité « à peine de nullité » suffit sans démontrer le grief : l’art. 802 conditionne le prononcé (textuelle ou substantielle).',
    ],
    examenAttendus: [
      'Épreuve 2 : analyses de nullité sur PV, perquisitions ou auditions — articuler texte, grief et effet (art. 802, 174).',
      'Épreuve 1 : incidence sur recevabilité des preuves ou des poursuites lorsque le sujet l’aborde.',
    ],
  },
};

export function getCourseModuleSynthesis(id: string): CourseModuleSynthesis | undefined {
  return courseModuleSyntheses[id];
}
