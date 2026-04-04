import type { Fiche } from './fondamentaux-types';

/** Fiches 11–20 : acteurs, juridictions, droit pénal */
export const FONDAMENTAUX_PART2: Fiche[] = [
  {
    id: 'opj-apj-apja',
    categorie: 'acteurs',
    titre: 'OPJ, APJ et APJA — Qui peut faire quoi ?',
    accroche:
      "Trois niveaux d'habilitation en police judiciaire avec des pouvoirs distincts. L'OPJ a les pouvoirs les plus étendus.",
    source: 'F14 — Art. 16, 20, 21 C.P.P.',
    lienFascicule: '/fascicules/f14',
    lienQuiz: '/quiz?mode=fascicule&f=f14',
    regles: [
      {
        label: 'OPJ — Officier de Police Judiciaire (art. 16 C.P.P.)',
        detail:
          'Commissaires, officiers de PN, certains gradés GN (OPJ de plein exercice). Pouvoirs complets : placer en GAV, procéder à des perquisitions, réquisitions, auditions sous GAV, constater les infractions, déférer.',
        article: 'Art. 16 C.P.P.',
      },
      {
        label: 'APJ — Agent de Police Judiciaire (art. 20 C.P.P.)',
        detail:
          'Gardiens de la paix PN, gendarmes non OPJ. Secondent les OPJ. Peuvent : constater les infractions, recueillir les déclarations, rendre compte à l\'OPJ. Ne peuvent PAS placer en GAV ni faire de perquisitions seuls.',
        article: 'Art. 20 C.P.P.',
        alerte: true,
      },
      {
        label: 'APJA — Agent de Police Judiciaire Adjoint (art. 21 C.P.P.)',
        detail:
          'Agents de surveillance, adjoints de sécurité, policiers municipaux. Pouvoirs très limités : relever l\'identité, dresser des PV de contraventions, assister les OPJ/APJ.',
        article: 'Art. 21 C.P.P.',
      },
      {
        label: 'Habilitation OPJ',
        detail:
          "L'habilitation est accordée par le procureur général. Elle peut être suspendue ou retirée (discipline). Sans habilitation : l'officier ne peut exercer les pouvoirs d'OPJ.",
        article: 'Art. 16-1 C.P.P.',
        alerte: true,
      },
    ],
    tableau: {
      colonnes: ['Acte', 'OPJ', 'APJ', 'APJA'],
      lignes: [
        ['Placer en GAV', '✅', '❌', '❌'],
        ['Perquisition (flagrance)', '✅', '❌', '❌'],
        ['Réquisitions art. 60', '✅', '✅ (art. 60)', '❌'],
        ['Audition sous GAV', '✅', '❌', '❌'],
        ['Constater une contravention', '✅', '✅', '✅'],
        ['Contrôle d\'identité', '✅', '✅', '✅ (limité)'],
        ['Saisie / Scellés', '✅', '✅ (sur ordre OPJ)', '❌'],
      ],
    },
  },
  {
    id: 'ministere-public',
    categorie: 'acteurs',
    titre: 'Le ministère public',
    accroche:
      "Le ministère public (parquet) exerce l'action publique et veille à l'application de la loi. Il est placé sous l'autorité du garde des Sceaux mais dispose d'une liberté de parole à l'audience.",
    source: 'F14 — Art. 31, 40, 41 C.P.P.',
    lienFascicule: '/fascicules/f14',
    lienQuiz: '/quiz?mode=fascicule&f=f14',
    regles: [
      {
        label: 'Composition',
        detail:
          "Procureur général (cour d'appel), procureur de la République (TJ), substituts du procureur, avocats généraux.",
      },
      {
        label: "Principe d'opportunité des poursuites (art. 40-1)",
        detail:
          "Le PR peut classer sans suite, poursuivre, ou recourir aux alternatives aux poursuites (art. 41-1). Il n'est pas tenu de poursuivre toute infraction.",
        article: 'Art. 40-1 C.P.P.',
        alerte: true,
      },
      {
        label: 'Alternatives aux poursuites (art. 41-1)',
        detail:
          'Rappel à la loi, orientation vers une structure sanitaire, médiation, composition pénale (art. 41-2), stage de sensibilisation.',
        article: 'Art. 41-1 C.P.P.',
      },
      {
        label: "Contrôle de l'OPJ",
        detail:
          'Le PR contrôle les GAV (avis immédiat obligatoire), peut demander la levée de la GAV, contrôle les actes d\'enquête en flagrance et préliminaire.',
        article: 'Art. 12 et 41 C.P.P.',
      },
      {
        label: '⚠️ Caractéristiques',
        detail:
          'Indivisible (un substitut peut remplacer un autre), irrécusable, irresponsable pénalement pour ses décisions de poursuite (mais responsable civile de l\'État possible).',
        alerte: true,
      },
    ],
  },
  {
    id: 'action-publique',
    categorie: 'acteurs',
    titre: 'Action publique et action civile',
    accroche:
      'Une infraction génère deux actions : l\'action publique (poursuivre le coupable) et l\'action civile (réparer le préjudice de la victime).',
    source: 'F14 — Art. 1 à 10 C.P.P.',
    lienFascicule: '/fascicules/f14',
    lienQuiz: '/quiz?mode=fascicule&f=f14',
    regles: [
      {
        label: 'Action publique',
        detail:
          'Exercée par le ministère public au nom de la société. But : punir l\'auteur. Se termine par une peine.',
        article: 'Art. 1 C.P.P.',
      },
      {
        label: 'Action civile',
        detail:
          'Exercée par la victime pour obtenir réparation de son préjudice. Peut être portée devant le juge pénal (constitution de partie civile) ou le juge civil.',
        article: 'Art. 2 C.P.P.',
      },
      {
        label: "Extinction de l'action publique",
        detail:
          'Mort du prévenu, amnistie, abrogation de la loi pénale, chose jugée (ne bis in idem), prescription, transaction, retrait de plainte (si infraction à poursuite conditionnelle).',
        article: 'Art. 6 C.P.P.',
        alerte: true,
      },
      {
        label: "Prescription de l'action publique",
        detail:
          'Crimes : 20 ans. Délits : 6 ans. Contraventions : 1 an. Infractions sexuelles sur mineurs : prescription rallongée (30 ans pour crimes, à compter de la majorité).',
        alerte: true,
      },
      {
        label: 'CRPC — Comparution sur reconnaissance préalable de culpabilité',
        detail:
          'La personne reconnaît les faits. Le PR propose une peine, le juge homologue. Gain de temps, peine généralement plus douce. Ne vaut que pour les délits punis de ≤ 5 ans.',
        article: 'Art. 495-8 C.P.P.',
      },
    ],
    tableau: {
      colonnes: ['', 'Action publique', 'Action civile'],
      lignes: [
        ['Qui la déclenche ?', 'Ministère public', 'La victime'],
        ['Devant quelle juridiction ?', 'Juridiction pénale', 'Juridiction pénale ou civile'],
        ['But', 'Punir le coupable', 'Réparer le préjudice'],
        ['Se termine par', 'Peine / relaxe / acquittement', 'Dommages-intérêts'],
      ],
    },
  },
  {
    id: 'juridictions-jugement',
    categorie: 'juridictions',
    titre: 'Les juridictions de jugement',
    accroche:
      'Chaque catégorie d\'infraction est jugée par une juridiction spécifique. La classification tripartite (crime/délit/contravention) détermine la compétence.',
    source: 'F13 — Art. 231, 381, 521 C.P.P.',
    lienFascicule: '/fascicules/f13',
    lienQuiz: '/quiz?mode=fascicule&f=f13',
    regles: [
      {
        label: 'Tribunal de police',
        detail: 'Juge les contraventions (5 classes). Juge unique. Art. 521 à 549 C.P.P.',
        article: 'Art. 521 C.P.P.',
      },
      {
        label: 'Tribunal correctionnel',
        detail: 'Juge les délits. Collégial (3 juges) sauf exceptions (juge unique). Art. 381 à 495-25 C.P.P.',
        article: 'Art. 381 C.P.P.',
      },
      {
        label: "Cour d'assises",
        detail:
          'Juge les crimes. 3 magistrats professionnels + 6 jurés populaires (9 en appel). Décision à la majorité absolue (6/9). Art. 231 à 380-15 C.P.P.',
        article: 'Art. 231 C.P.P.',
        alerte: true,
      },
      {
        label: 'Cour criminelle départementale (CCD)',
        detail:
          'Juge certains crimes punis de 15 à 20 ans d\'emprisonnement, SANS jurés. 5 magistrats professionnels. Créée par loi du 22/12/2021. Art. 380-16 à 380-22 C.P.P.',
        article: 'Art. 380-16 C.P.P.',
        alerte: true,
      },
    ],
    tableau: {
      colonnes: ['Infraction', 'Juridiction', 'Composition', 'Article'],
      lignes: [
        ['Contravention (C1-C5)', 'Tribunal de police', 'Juge unique', 'Art. 521'],
        ['Délit', 'Tribunal correctionnel', '3 juges (ou juge unique)', 'Art. 381'],
        ['Crime (≤ 20 ans)', 'Cour criminelle dép.', '5 magistrats', 'Art. 380-16'],
        ['Crime (> 20 ans / réc.)', "Cour d'assises", '3 magistrats + 6 jurés', 'Art. 231'],
      ],
    },
  },
  {
    id: 'voies-recours',
    categorie: 'juridictions',
    titre: 'Les voies de recours',
    accroche:
      'Après un jugement, plusieurs voies permettent de le contester : certaines sont ordinaires (effet suspensif), d\'autres extraordinaires.',
    source: 'F13 — Art. 489, 498, 567 C.P.P.',
    lienFascicule: '/fascicules/f13',
    lienQuiz: '/quiz?mode=fascicule&f=f13',
    regles: [
      {
        label: 'Opposition (voie ordinaire)',
        detail:
          'Contre un jugement rendu par défaut (absence de la personne condamnée). Délai : 10 jours à compter de la signification. La juridiction rejuge l\'affaire.',
        article: 'Art. 489 C.P.P.',
      },
      {
        label: 'Appel (voie ordinaire)',
        detail:
          "Devant la cour d'appel. Délai : 10 jours à compter du prononcé. Effet dévolutif (rejuge le fond) et suspensif (sauf mandat de dépôt). La cour peut aggraver la peine.",
        article: 'Art. 498 C.P.P.',
        alerte: true,
      },
      {
        label: 'Pourvoi en cassation (voie extraordinaire)',
        detail:
          'Devant la Cour de cassation. Contrôle de légalité uniquement (pas le fond). Délai : 5 jours. Si cassation : renvoi devant une autre cour d\'appel.',
        article: 'Art. 567 C.P.P.',
      },
      {
        label: 'Révision (voie extraordinaire)',
        detail:
          "Permet de rejuger une affaire après condamnation définitive si un fait nouveau prouve l'innocence du condamné. Saisie par la Commission de révision, puis la Cour de révision.",
        alerte: true,
      },
    ],
    tableau: {
      colonnes: ['Voie', 'Type', 'Délai', 'Devant qui'],
      lignes: [
        ['Opposition', 'Ordinaire', '10 jours', 'Même juridiction'],
        ['Appel', 'Ordinaire', '10 jours', "Cour d'appel"],
        ['Cassation', 'Extraordinaire', '5 jours', 'Cour de cassation'],
        ['Révision', 'Extraordinaire', 'Pas de délai', 'Commission + Cour de révision'],
      ],
    },
  },
  {
    id: 'classification-infractions',
    categorie: 'droit-penal',
    titre: 'Classification des infractions',
    accroche:
      'Le droit pénal français distingue trois catégories d\'infractions selon leur gravité. Cette classification tripartite a des conséquences sur la juridiction compétente, la prescription et les règles applicables.',
    source: 'F09 — Art. 111-1 C.P.',
    lienFascicule: '/fascicules/f09',
    lienQuiz: '/quiz?mode=fascicule&f=f09',
    regles: [
      {
        label: 'Crime',
        detail:
          "Infraction la plus grave. Peine : réclusion ou détention criminelle (10 ans minimum). Jugé par la cour d'assises ou la cour criminelle départementale. Prescription : 20 ans (30 ans pour certains crimes).",
        article: 'Art. 111-1 C.P.',
      },
      {
        label: 'Délit',
        detail:
          'Infraction intermédiaire. Peine : emprisonnement (correctionnelle) + amende. Jugé par le tribunal correctionnel. Prescription : 6 ans.',
        article: 'Art. 111-1 C.P.',
      },
      {
        label: 'Contravention',
        detail:
          'Infraction la moins grave. Peine : amende (5 classes). Jugée par le tribunal de police. Prescription : 1 an. Pas de peine d\'emprisonnement sauf cas exceptionnel.',
        article: 'Art. 111-1 C.P.',
      },
      {
        label: '⚠️ Tentative',
        detail: 'Punissable pour les crimes (toujours) et les délits (si texte le prévoit). JAMAIS pour les contraventions.',
        article: 'Art. 121-5 C.P.',
        alerte: true,
      },
    ],
    tableau: {
      colonnes: ['Catégorie', 'Peine max', 'Juridiction', 'Prescription', 'Tentative'],
      lignes: [
        ['Crime', 'Réclusion criminelle à perpétuité', "Cour d'assises / CCD", '20 ans', 'Toujours punissable'],
        ['Délit', "10 ans d'emprisonnement", 'Tribunal correctionnel', '6 ans', 'Si texte le prévoit'],
        ['Contravention', 'Amende (3 000 € max C5)', 'Tribunal de police', '1 an', 'Jamais'],
      ],
    },
  },
  {
    id: 'elements-constitutifs',
    categorie: 'droit-penal',
    titre: 'Les éléments constitutifs de l\'infraction',
    accroche:
      'Toute infraction est composée de trois éléments cumulatifs : légal, matériel et moral. L\'absence de l\'un entraîne la non-constitution de l\'infraction.',
    source: 'F09 — Art. 111-3, 121-3 C.P.',
    lienFascicule: '/fascicules/f09',
    lienQuiz: '/quiz?mode=fascicule&f=f09',
    regles: [
      {
        label: 'Élément légal',
        detail:
          'La loi ou le règlement doit prévoir et réprimer le comportement (principe de légalité — art. 111-3 C.P. : "Nul ne peut être puni pour un crime ou un délit dont les éléments ne sont pas définis par la loi"). C\'est la base juridique : l\'article qui prévoit + l\'article qui réprime.',
        article: 'Art. 111-3 C.P.',
        alerte: true,
      },
      {
        label: 'Élément matériel',
        detail:
          "L'acte (commission) ou l'abstention (omission) qui constitue l'infraction. Comprend : l'acte lui-même, ses conditions de réalisation, le résultat si requis. La tentative est l'élément matériel inachevé.",
        article: 'Art. 121-5 C.P.',
      },
      {
        label: 'Élément moral',
        detail:
          "L'intention coupable. Trois formes : intention (vouloir l'acte ET le résultat), imprudence/négligence, mise en danger délibérée. Pour les contraventions : pas besoin de prouver l'intention (faute contraventionnelle).",
        article: 'Art. 121-3 C.P.',
      },
      {
        label: '⚠️ Formule PRQC pour l\'examen',
        detail:
          'Ces faits PRÉVUS par l\'article X et RÉPRIMÉS par l\'article Y constituent une QUALIFICATION qui est une CLASSIFICATION. Cette formule est obligatoire à l\'épreuve 1.',
        alerte: true,
      },
    ],
  },
  {
    id: 'circonstances-aggravantes',
    categorie: 'droit-penal',
    titre: 'Les circonstances aggravantes générales',
    accroche:
      'Les circonstances aggravantes (art. 132-71 à 132-80 C.P.) alourdissent la peine. Elles doivent être démontrées dans le devoir avec les éléments du thème.',
    source: 'F10 — Art. 132-71 à 132-80 C.P.',
    lienFascicule: '/fascicules/f10',
    lienQuiz: '/quiz?mode=fascicule&f=f10',
    regles: [
      {
        label: 'Bande organisée',
        article: 'Art. 132-71 C.P.',
        detail:
          'Tout groupement formé ou toute entente établie en vue de la préparation d\'une ou plusieurs infractions.',
      },
      {
        label: 'Guet-apens',
        article: 'Art. 132-71-1 C.P.',
        detail: 'Attendre une personne dans un lieu déterminé pour l\'agresser.',
      },
      {
        label: 'Préméditation',
        article: 'Art. 132-72 C.P.',
        detail: 'Dessein formé avant l\'action de commettre un crime ou un délit déterminé.',
      },
      {
        label: 'Effraction',
        article: 'Art. 132-73 C.P.',
        detail:
          'Forcement, dégradation ou destruction d\'une clôture, paroi, porte, serrure ou de tout autre dispositif.',
      },
      {
        label: 'Escalade',
        article: 'Art. 132-74 C.P.',
        detail:
          'Franchissement par-dessus, par-dessous ou au travers d\'une clôture ou obstacle quelconque.',
      },
      {
        label: 'Port ou usage d\'une arme',
        article: 'Art. 132-75 et 132-76 C.P.',
        detail: 'Arme par nature, par usage ou par destination utilisée lors de l\'infraction.',
      },
      {
        label: 'Caractère raciste / antisémite / religieux',
        article: 'Art. 132-76 C.P.',
        detail:
          'Motifs fondés sur l\'appartenance (vraie ou supposée) de la victime à une ethnie, nation, race ou religion. ⚠️ À démontrer en DERNIER.',
        alerte: true,
      },
      {
        label: 'Caractère homophobe / transphobe',
        article: 'Art. 132-77 C.P.',
        detail:
          'Fondés sur le sexe, l\'orientation sexuelle ou l\'identité de genre. ⚠️ À démontrer en DERNIER.',
        alerte: true,
      },
      {
        label: 'Cryptologie',
        article: 'Art. 132-79 C.P.',
        detail: 'Utilisation de moyens de chiffrement pour préparer ou commettre l\'infraction.',
      },
      {
        label: 'Qualité conjoint / PACS / concubin',
        article: 'Art. 132-80 C.P.',
        detail: 'Infraction commise par le conjoint, le concubin ou le partenaire de PACS de la victime.',
      },
    ],
  },
  {
    id: 'complicite-coaction',
    categorie: 'droit-penal',
    titre: 'Complicité et coaction',
    accroche:
      'Plusieurs personnes peuvent participer à la même infraction à des titres différents. Il faut qualifier précisément le rôle de chacun.',
    source: 'F09 — Art. 121-4, 121-6, 121-7 C.P.',
    lienFascicule: '/fascicules/f09',
    lienQuiz: '/quiz?mode=fascicule&f=f09',
    regles: [
      {
        label: 'Auteur (art. 121-4)',
        detail: 'Réalise personnellement tous les éléments constitutifs de l\'infraction. Punit de la peine prévue pour l\'infraction.',
        article: 'Art. 121-4 C.P.',
      },
      {
        label: 'Coauteur (art. 121-4)',
        detail:
          'Plusieurs personnes réalisent chacune tous les éléments constitutifs. Chacun est auteur, non complice.',
        article: 'Art. 121-4 C.P.',
        alerte: true,
      },
      {
        label: 'Complice (art. 121-7)',
        detail:
          'Participe à l\'infraction sans en réaliser les éléments matériels. Trois modes : aide ou assistance, provocation (avec dons, promesses, menaces, abus d\'autorité), fourniture d\'instructions.',
        article: 'Art. 121-7 C.P.',
      },
      {
        label: 'Conditions de la complicité',
        detail:
          "1) Un fait principal punissable. 2) Un acte matériel de participation. 3) Connaissance de cause (savoir qu'on aide à commettre une infraction). 4) Intention de s'associer.",
        alerte: true,
      },
      {
        label: 'Peine du complice',
        detail: 'Le complice est puni comme l\'auteur (art. 121-6 C.P.) — "sera puni comme auteur". Mais le juge peut adapter la peine.',
        article: 'Art. 121-6 C.P.',
      },
    ],
  },
  {
    id: 'irresponsabilite-penale',
    categorie: 'droit-penal',
    titre: 'Causes d\'irresponsabilité pénale',
    accroche:
      'Certains faits ou états suppriment ou atténuent la responsabilité pénale. Ils doivent être identifiés dans le thème de l\'épreuve 1.',
    source: 'F09 — Art. 122-1 à 122-9 C.P.',
    lienFascicule: '/fascicules/f09',
    lienQuiz: '/quiz?mode=fascicule&f=f09',
    regles: [
      {
        label: 'Faits justificatifs (suppriment l\'infraction)',
        detail:
          "1. Ordre de la loi / commandement de l'autorité légitime (art. 122-4). 2. Légitime défense (art. 122-5) : atteinte injustifiée + riposte nécessaire et proportionnée. 3. État de nécessité (art. 122-7) : danger actuel ou imminent. 4. Lanceur d'alerte (art. 122-9).",
        article: 'Art. 122-4 à 122-9 C.P.',
      },
      {
        label: 'Causes de non-imputabilité (pas de culpabilité)',
        detail:
          '1. Trouble mental (art. 122-1) : abolition totale du discernement → irresponsabilité / altération → atténuation. 2. Minorité (art. 122-8) : CJPM. 3. Contrainte (art. 122-2) : force irrésistible. 4. Erreur de droit (art. 122-3) : invincible et inévitable.',
        article: 'Art. 122-1 à 122-3 C.P.',
        alerte: true,
      },
      {
        label: 'Usage légitime de l\'arme par fonctionnaire',
        detail:
          'Art. L. 435-1 à L. 435-6 du CSI. Conditions strictes : avertissements préalables, proportionnalité, absolue nécessité. Protège les agents de la force publique.',
        article: 'Art. L.435-1 CSI',
        alerte: true,
      },
    ],
  },
  {
    id: 'recursion-recidive',
    categorie: 'droit-penal',
    titre: 'Récidive, concours et réitération',
    accroche:
      'Quand une personne commet plusieurs infractions, des règles spéciales s\'appliquent pour calculer la peine. La récidive aggrave fortement les peines.',
    source: 'F10 — Art. 132-2, 132-8, 132-16-7 C.P.',
    lienFascicule: '/fascicules/f10',
    lienQuiz: '/quiz?mode=fascicule&f=f10',
    regles: [
      {
        label: "Concours réel d'infractions (art. 132-2)",
        detail:
          'Plusieurs infractions commises AVANT condamnation définitive. Règle : non-cumul des peines — seule la peine la plus forte est prononcée. Exception : cumul possible jusqu\'au maximum légal le plus élevé.',
        article: 'Art. 132-2 C.P.',
        alerte: true,
      },
      {
        label: 'Récidive légale (art. 132-8)',
        detail:
          'Après une condamnation définitive, commettre une nouvelle infraction dans un délai et de même nature. Effet : double du maximum de la peine. Conditions spécifiques crime/délit. Délai : 5 ans pour les délits.',
        article: 'Art. 132-8 à 132-15 C.P.',
      },
      {
        label: 'Réitération (art. 132-16-7)',
        detail:
          'Commettre une nouvelle infraction SANS être en état de récidive légale (infraction de nature différente ou délai dépassé). Pas d\'aggravation automatique mais le juge peut en tenir compte.',
        article: 'Art. 132-16-7 C.P.',
      },
      {
        label: '⚠️ Concours vs Récidive',
        detail:
          'Concours : toutes les infractions commises AVANT condamnation. Récidive : nouvelle infraction APRÈS condamnation définitive. La limite = la condamnation définitive.',
        alerte: true,
      },
    ],
  },
];
