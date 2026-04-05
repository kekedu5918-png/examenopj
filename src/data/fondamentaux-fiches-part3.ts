import type { Fiche } from './fondamentaux-types';

/** Fiches complémentaires : procédures sensibles, sanctions, acteurs clés, thèmes transverses. */
export const FONDAMENTAUX_PART3: Fiche[] = [
  {
    id: 'saisies-scelles',
    categorie: 'procedure',
    titre: 'Saisies probatoires et scellés',
    accroche:
      'Formaliser la chaîne de possession et l’état des pièces : chaque mouvement doit être traçable jusqu’au débat contradictoire.',
    source: 'Art. 56, 97, 706-159 et D. 15-5-1-1 C.P.P.',
    lienModule: '/cours/modules/f11',
    lienQuiz: '/entrainement/quiz?mode=module&f=f11',
    regles: [
      {
        label: 'Objet des saisies',
        detail:
          'Sont saisis les biens et supports (numériques ou physiques) susceptibles d’attester les faits ou l’identité des personnes, dans le respect du principe de proportionnalité.',
        article: 'Art. 56 C.P.P.',
      },
      {
        label: 'Scellé et inventaire',
        detail:
          'Chaque unité scellée doit porter une mention lisible (affaire, date, agent, lieu). Un inventaire contradictoire ou la remise d’une copie au propriétaire évite les contestations ultérieures.',
        article: 'D. 15-5-1-1 C.P.P.',
        alerte: true,
      },
      {
        label: 'Données informatiques',
        detail:
          'Privilégier image « bit à bit », hashing et consignation d’horodatage. Ne pas « explorer » un support hors périmètre du procès-verbal ou de la réquisition.',
        article: 'Art. 706-159 et suivants C.P.P.',
      },
      {
        label: 'Piège classique',
        detail:
          'Mélanger objets saisis pour plusieurs qualités juridiques sans arborescence claire : risque d’exclusion probatoire ou de nullité pour défaut de description.',
        alerte: true,
      },
    ],
  },
  {
    id: 'interpellation',
    categorie: 'procedure',
    titre: 'Interpellation et contrôles corporels',
    accroche:
      'Contrôle / interpellation ≠ audition : ce sont des actes coercitifs encadrés qui conditionnent toute la suite procédurale.',
    source: 'Art. 78-4 et 803-1 C.P.P.',
    lienModule: '/cours/modules/f11',
    lienQuiz: '/entrainement/quiz?mode=module&f=f11',
    regles: [
      {
        label: 'Palpation de sûreté',
        detail:
          'Elle est autorisée lorsque la personne est détenue ou lorsque la sécurité des enquêteurs l’impose ; elle reste externe et proportionnée au risque.',
        article: 'Art. 803-1 C.P.P.',
      },
      {
        label: 'Menottage',
        detail:
          'Mesure d’empêchement temporaire, distincte de la garde à vue. Doit être motivée (violence, fuite, danger pour autrui) et levée dès la disparition du motif ; proportionnalité et compte rendu au parquet si la personne est déférée.',
        alerte: true,
      },
      {
        label: 'Visite à corps',
        detail:
          'Acte intrusif : nécessite un cadre légal clair (garde à vue, interpellation encadrée, personne déjà privée de liberté) et des observateurs lorsque le texte l’exige.',
        article: 'Art. 78-4 C.P.P.',
      },
    ],
  },
  {
    id: 'victimes-droits',
    categorie: 'procedure',
    titre: 'Victimes : droits procéduraux et protections',
    accroche:
      'La victime est une partie : ses droits conditionnent le calendrier d’audition, les mesures de protection et la communication avec le parquet.',
    source: 'Art. 11-1, 11-6, 12, 706-30 et suivants C.P.P.',
    lienModule: '/cours/modules/f11',
    lienQuiz: '/entrainement/quiz?mode=module&f=f11',
    regles: [
      {
        label: 'Information et accompagnement',
        detail:
          'Droit à information sur les droits (plainte, aide juridictionnelle, association), possibilité d’être assistée lors des actes clés et de consulter le dossier selon les phases.',
        article: 'Art. 11-1 C.P.P.',
      },
      {
        label: 'Mineurs victimes',
        detail:
          'Mesures d’audition spécialisées (personnes qualifiées, lieux adaptés, enregistrement audiovisuel lorsque la loi l’impose) pour limiter la revictimisation.',
        article: 'Art. 706-53 et suivants C.P.P.',
        alerte: true,
      },
      {
        label: 'Ordonnances de protection',
        detail:
          'Dans certains domaines (violences intrafamiliales ou conjointes), la juridiction peut ordonner l’éloignement et des mesures provisoires ; l’OPJ en assure le contrôle opérationnel.',
        article: 'Art. 12 C.P.P. & loi n° 2010-769 du 10 juillet 2010',
      },
    ],
  },
  {
    id: 'commission-rogatoire',
    categorie: 'procedure',
    titre: 'Commission rogatoire et délégation technique',
    accroche:
      'La commission rogatoire ne duplique pas une compétence : elle transporte précisément des actes encadrés dans le temps et dans l’objet.',
    source: 'Art. 81, 151 à 155 C.P.P.',
    lienModule: '/cours/modules/f11',
    lienQuiz: '/entrainement/quiz?mode=module&f=f11',
    regles: [
      {
        label: 'Actes délégués',
        detail:
          'L’OPJ peut accomplir les actes expressément énumérés (auditions hors MEE, constats, certaines missions techniques).',
        article: 'Art. 81 C.P.P.',
      },
      {
        label: 'Limites impératives',
        detail:
          'Pas d’interrogatoire de mis en examen ni d’actes réservés au juge (ordonnances coercitives non prévues). Tout excès est une voie directe vers la nullité.',
        article: 'Art. 99-1 C.P.P.',
        alerte: true,
      },
      {
        label: 'Rendu d’écriture',
        detail:
          'Chaque acte délégué est consigné et transmis sans filtre pour permettre au juge d’instruction de valider ou rectifier.',
        article: 'Art. 154 C.P.P.',
      },
    ],
  },
  {
    id: 'extension-competence',
    categorie: 'procedure',
    titre: 'Extension et coordination des enquêtes',
    accroche:
      'Les faits mobiles ou interdépartementaux imposent des mécanismes d’extension pour éviter les investigations hors cadre.',
    source: 'Art. 75-1 et R. 15-33-1 C.P.P.',
    lienModule: '/cours/modules/f11',
    lienQuiz: '/entrainement/quiz?mode=module&f=f11',
    regles: [
      {
        label: 'Extension du lieu d’enquête',
        detail:
          'Le procureur général ou le procureur de la République peut rattacher plusieurs procédures ou étendre les investigations lorsque les faits se révèlent connexes.',
        article: 'Art. 75-1 C.P.P.',
      },
      {
        label: 'Effets sur les actes',
        detail:
          'Chaque acte doit mentionner le dossier d’origine et, le cas échéant, l’extension validée : absence de mention = risque d’irrégularité substantielle.',
        alerte: true,
      },
      {
        label: 'Coordination inter-services',
        detail:
          'En pratique : partage des scellés numériques, PV synchronisés et référence à une ordonnance unique ou à des magistrats coordonnateurs.',
      },
    ],
  },
  {
    id: 'criminalite-organisee',
    categorie: 'procedure',
    titre: 'Criminalité organisée : mesures spécifiques',
    accroche:
      'Les infractions structurées permettent des outils d’enquête renforcés (durées allongées, infiltrations encadrées, perquisitions dérogatoires).',
    source: 'Livre IV bis C.P.P. (dispositions d’application spéciales)',
    lienModule: '/cours/modules/f11',
    lienQuiz: '/entrainement/quiz?mode=module&f=f11',
    regles: [
      {
        label: 'Garde à vue (706-73 vs 706-73-1 / 706-74)',
        detail:
          'Pour les seules infractions visées à l’art. 706-73 C.P.P. (hors cas d’exclusion, ex. certains délits douaniers au 21°), l’art. 706-88 autorise, au-delà des 48 h de droit commun, soit deux prolongations supplémentaires de 24 h (96 h au total), soit une seule de 48 h lorsque la durée prévisible des investigations le commande. Pour les infractions des art. 706-73-1 et 706-74, la GAV reste celle du droit commun.',
        article: 'Art. 706-73, 706-88 C.P.P.',
        alerte: true,
      },
      {
        label: 'Perquisitions et nuit',
        detail:
          'Lorsque le texte l’autorise, le juge peut valider des opérations hors plage classique ; le procès-verbal doit reproduire la motivation écrite.',
        article: 'Art. 706-90 C.P.P.',
      },
      {
        label: 'Techniques d’investigation ciblées',
        detail:
          'Gels probatoires, infiltrations, captation de données : nécessitent un document de contrôle judiciaire nominatif et un décompte des prolongations.',
        article: 'Art. 706-82 et suivants C.P.P.',
      },
    ],
    tableau: {
      colonnes: ['Mesure', 'Contrôle judiciaire', 'Conséquence si défaut'],
      lignes: [
        ['Durée renforcée GAV', 'JLD / PR selon cas', 'Nullité / perte de preuves'],
        ['Perquisition nocturne', 'Motivation écrite JLD', 'Exclusion du procès-verbal'],
        ['Agent infiltré', 'Ordre signé + bilan', 'Atteinte à la sécurité du procès'],
      ],
    },
  },
  {
    id: 'sanction-penale',
    categorie: 'droit-penal',
    titre: 'Sanction pénale : peines, quantum et caractère',
    accroche:
      'Qualifier une infraction, c’est déjà esquisser la fourchette : les peines principales, complémentaires et le régime temporel commandent l’articulation parquet / juridiction.',
    source: 'Art. 131-1 à 131-11, 132-1 à 132-57 C.P.',
    lienModule: '/cours/modules/f10',
    lienQuiz: '/entrainement/quiz?mode=module&f=f10',
    regles: [
      {
        label: 'Peines pénales principales',
        detail:
          'Emprisonnement, amende, peines alternatives (travail d’intérêt général, jours-amende, etc.) — la cour ou le tribunal choisit dans la fourchette légale après examen des circonstances.',
        article: 'Art. 131-1 C.P.',
      },
      {
        label: 'Peines complémentaires',
        detail:
          'Peuvent frapper les droits civiques, professionnels ou familiaux (interdictions), selon liste limitative et proportionnalité.',
        article: 'Art. 131-10 C.P.',
      },
      {
        label: 'Sursis et mesures d’exécution',
        detail:
          'Certaines peines peuvent être assorties d’un sursis, de mesures probatoires ou d’un suivi post-sentenciel : à relier avec le SPIP et le procureur.',
        article: 'Art. 132-33 et suivants C.P.',
        alerte: true,
      },
    ],
    tableau: {
      colonnes: ['Niveau', 'But', 'Exemple'],
      lignes: [
        ['Répressif', 'Sanctionner', 'Emprisonnement fermé'],
        ['Préventif', 'Éloigner le risque', 'Interdiction de territoire'],
        ['Réinsertif', 'Stabiliser la personne', 'Obligation de soins'],
      ],
    },
  },
  {
    id: 'juge-instruction',
    categorie: 'acteurs',
    titre: 'Juge d’instruction : mission et réserves',
    accroche:
      'Le juge d’instruction pilote l’information judiciaire ; l’OPJ agit sous sa direction lorsqu’une information est ouverte.',
    source: 'Art. 80, 81, 116 et suivants C.P.P.',
    lienModule: '/cours/modules/f12',
    lienQuiz: '/entrainement/quiz?mode=module&f=f12',
    regles: [
      {
        label: 'Fonction cognitive',
        detail:
          'Le juge recherche charges et décharges. Il fixe les diligences, peut ordonner expertises, écoutes ou placardage de pièces selon la gravité.',
        article: 'Art. 81 C.P.P.',
      },
      {
        label: 'Statut des actes',
        detail:
          'Les actes accomplis hors saisine ou contre ordre express sont nuls ou sources de grief : signaler immédiatement toute difficulté plutôt que corriger de manière opérationnelle « off record ».',
        alerte: true,
      },
      {
        label: 'Contrôle des gardes à vue en lien avec l’instruction',
        detail:
          'Les prolongations liées à l’information ou les présentations devant le juge doivent être mentionnées dans la chaîne GAV.',
        article: 'Art. 116-2 C.P.P.',
      },
    ],
  },
  {
    id: 'juge-libertes-detention',
    categorie: 'acteurs',
    titre: 'Juge des libertés et de la détention (JLD)',
    accroche:
      'Le JLD est le garant des atteintes sérieuses à la liberté : garde à vue longue, perquisitions sensibles, placements sous contrôle.',
    source: 'Art. 137-1 et suivants C.P.P.',
    lienModule: '/cours/modules/f12',
    lienQuiz: '/entrainement/quiz?mode=module&f=f12',
    regles: [
      {
        label: 'Compétences transverses',
        detail:
          'Statuant souvent en audience dédiée, il autorise ou refuse les mesures atteignant domicile, secrets protégés et liberté individuelle.',
        article: 'Art. 137-1 C.P.P.',
      },
      {
        label: 'Audience contradictoire',
        detail:
          'Sauf urgence absolue, le juge confronte parquet, défense et personne détenue pour décider du maintien des mesures.',
      },
      {
        label: 'Piège',
        detail:
          'Signaler un JLD au mauvais stade (avant constitution du dossier) : retard d’autorisation = nullité ou perte d’élément probant.',
        alerte: true,
      },
    ],
  },
  {
    id: 'chambre-instruction',
    categorie: 'juridictions',
    titre: 'Chambre de l’instruction',
    accroche:
      'Contrôle collégial de la tenue de l’information : elle statue sur les nullités, les placements et les coûts d’une enquête longue.',
    source: 'Art. 179 à 226 C.P.P.',
    lienModule: '/cours/modules/f13',
    lienQuiz: '/entrainement/quiz?mode=module&f=f13',
    regles: [
      {
        label: 'Contrôle de légalité',
        detail:
          'Peut casser ou valider les ordonnances du juge d’instruction sur réquisition des parties ou du parquet général.',
        article: 'Art. 179 C.P.P.',
      },
      {
        label: 'Sort des nullités',
        detail:
          'Sa décision impose le retrait des actes défectueux et parfois le renvoi devant un autre juge.',
        article: 'Art. 184 C.P.P.',
        alerte: true,
      },
    ],
  },
  {
    id: 'juridiction-application-peines',
    categorie: 'juridictions',
    titre: 'Juridiction et service d’application des peines',
    accroche:
      'Au-delà du prononcé, la peine se « vit » devant le juge d’application des peines (JAP) et le SPIP.',
    source: 'Art. 712-1 à 712-8 C.P.P.',
    lienModule: '/cours/modules/f13',
    lienQuiz: '/entrainement/quiz?mode=module&f=f13',
    regles: [
      {
        label: 'JAP',
        detail:
          'Ajuste les modalités d’exécution (semi-liberté, bracelet, aménagements). Statut hybride : magistrat du siège agissant hors débat public contradictoire complet.',
        article: 'Art. 712-6 C.P.P.',
      },
      {
        label: 'SPIP',
        detail:
          'Contrôle le suivi socio-judiciaire et renseigne le juge sur le risque ; l’OPJ interagit pour les mesures de contrôle en milieu ouvert.',
        article: 'Art. 712-11 C.P.P.',
      },
    ],
  },
  {
    id: 'enquete-deces-74',
    categorie: 'special',
    titre: 'Enquêtes sur mort suspecte (art. 74 C.P.P.)',
    accroche:
      'Le cadre 74 est quasi autonome : préserver la scène, obtenir l’autorité scientifique et sécuriser la chaîne entre médecine légale et parquet.',
    source: 'Art. 74 et 74-1 C.P.P.',
    lienModule: '/cours/modules/f11',
    lienQuiz: '/entrainement/quiz?mode=module&f=f11',
    regles: [
      {
        label: 'Ouverture',
        detail:
          'Toute mort non naturelle apparente, corps non identifié ou circonstances incomplètes doit déclencher mesures renforcées (garde de scène, obtention d’autopsie).',
        article: 'Art. 74 C.P.P.',
      },
      {
        label: 'Coordination scientifique',
        detail:
          'Saisine de l’IRMGL / structure locale ; emballage séparé des traces biologiques et numériques pour éviter la contamination.',
        alerte: true,
      },
      {
        label: 'Transmission parquet',
        detail:
          'Le procureur pilote la qualification provisoire (homicide, mise en danger, suicide assisté…) en attendant les expertises.',
      },
    ],
  },
  {
    id: 'disparitions-inquietantes',
    categorie: 'special',
    titre: 'Disparitions inquiétantes et plans d’urgence',
    accroche:
      'Articuler recherche immédiate, traitement des données personnelles et réquisition judiciaire est déterminant dans la « fenêtre » des premières heures.',
    source: 'Art. 74-1, 99 et suivants C.P.P.',
    lienModule: '/cours/modules/f11',
    lienQuiz: '/entrainement/quiz?mode=module&f=f11',
    regles: [
      {
        label: 'Leviers numériques',
        detail:
          'Géolocalisation, conservation de métadonnées et saisies opérateurs requièrent souvent une validation judiciaire anticipée pour ne pas brûler la preuve.',
        article: 'Art. 230-32 C.P.P.',
        alerte: true,
      },
      {
        label: 'Plans nationaux',
        detail:
          'Les dispositifs d’alerte (types « enlèvement », mineurs en danger) imposent des circuits médias et des points de contact uniques ; documenter les heures.',
      },
    ],
  },
  {
    id: 'entraide-internationale',
    categorie: 'special',
    titre: 'Entraide pénale et instruments européens',
    accroche:
      'Commission rogatoire internationale, EAW, Prüm ou Eurojust : chaque canal a ses délais et ses nullités potentielles.',
    source: 'L. 113-1 à 113-13 C.P.P. & instruments européens',
    lienModule: '/cours/modules/f11',
    lienQuiz: '/entrainement/quiz?mode=module&f=f11',
    regles: [
      {
        label: 'Lettres rogatoires',
        detail:
          'Transmissions via ministère de la Justice ou canal européen direct selon la matière ; joindre une traduction conforme et un référentiel probatoire.',
        article: 'Art. 694 et suivants C.P.P.',
      },
      {
        label: 'Mandat d’arrêt européen',
        detail:
          'Instrument de remise : vérifier la liste des infractions « cadre » et l’absence de motifs de refus avant exécution matérielle.',
        article: 'L. 696-4 C.P.P.',
        alerte: true,
      },
      {
        label: 'Eurojust / judicial cooperation',
        detail:
          'Coordonne les enquêtes parallèles dans plusieurs États : utile pour les chaînes cryptographiques ou les sociétés écran.',
      },
    ],
  },
  {
    id: 'tentative-penale',
    categorie: 'droit-penal',
    titre: 'La tentative en droit pénal',
    accroche:
      'La tentative pénalise déjà l’élément matériel inachevé dès lors que la loi l’annonce pour le crime (toujours) ou le délit (sur incrimination spécifique).',
    source: 'Art. 121-5, 121-4 C.P.',
    lienModule: '/cours/modules/f09',
    lienQuiz: '/entrainement/quiz?mode=module&f=f09',
    regles: [
      {
        label: 'Tentative volontaire',
        detail:
          'Il faut un début d’exécution manifesté par un acte extérieur non neutre ; la simple intention ou la préparation pure demeurent hors champ sauf infraction autonome.',
        article: 'Art. 121-5 C.P.',
        alerte: true,
      },
      {
        label: 'Tentative impossible',
        detail:
          'Reste punissable lorsque les moyens employés auraient pu aboutir sans l’obstacle inconnu (objet absent, victime inexistante selon théorie retenue).',
        article: 'Art. 121-5 al. 2 C.P.',
      },
      {
        label: 'Contraventions',
        detail:
          'Pas de tentative punissable : inscrire systématiquement cette limite dans les sujets mêlant qualification mineure / infraction principale.',
        alerte: true,
      },
    ],
  },
];
