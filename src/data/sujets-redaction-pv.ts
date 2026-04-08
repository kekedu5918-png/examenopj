import type { PVCategorie } from '@/types/pv';

export type SujetRedactionPV = {
  id: string;
  titre: string;
  fascicule: string;
  categorie: PVCategorie;
  difficulte: 'debutant' | 'intermediaire' | 'avance';
  miseEnSituation: string;
  elementsObligatoires: string[];
  modeleReference?: string;
  dureeConseillee: number;
  isPremium: boolean;
};

export const SUJET_REDAC_VOL_FLAGRANCE: SujetRedactionPV = {
  id: 'pv-vol-flagrance-supermarche',
  titre: 'PV de flagrance — vol dans une grande surface',
  fascicule: 'F02',
  categorie: 'interpellation',
  difficulte: 'debutant',
  miseEnSituation: `Le 7 avril 2026 à 14 h 35, vous êtes alerté en salle par le vigile salarié de la grande surface LIDL située 12 avenue de la République à Nantes (44). Il vous présente M. DUPONT Kévin, né le 12 mars 1995 à Rezé, de nationalité française, demeurant 4 rue des Lilas, 44000 Nantes, sans profession déclarée sur le moment, qu'il dit avoir surpris quelques instants plus tôt aux caisses automatiques.

Selon le vigile et le récapitulatif établi par le service client, le mis en cause aurait dissimulé dans la doublure intérieure de sa veste trois boîtes de café « Grain d’Orage » d’une valeur unitaire affichée à 6,30 € l’unité, soit 18,90 € au total, sans les présenter au passage en caisse ni procéder au paiement. Les produits ont été récupérés intacts ; un étiquetage prix est resté apparent. La victime pénale est distinguée : le gérant de l’établissement, M. MARTIN Paul, demeurant 8 quai de la Fosse à Nantes, agissant au nom de la personne morale exploitante (à identifier par dénomination sociale courte pour les besoins du PV).

Les faits sont, à ce stade de l’enquête, présentés comme constituant un vol simple au sens de l’article 311-1 du Code pénal. Le mis en cause conteste partiellement l’intention de soustraire et invoque un « oubli de sortie des produits de la poche » ; le vigile maintient avoir observé un geste de dissimulation volontaire avant le contrôle.

Vous rédigez le procès-verbal opérationnel d’interpellation ou de constatation de flagrance (selon la structure retenue par votre formation et le fascicule ME1), de manière à permettre une transmission au parquet avec les mentions obligatoires et une chronologie lisible.`,
  elementsObligatoires: [
    "Cartouche d'en-tête complet (service, unité, référence)",
    "Formule d'ouverture légale (L'an... nous... OPJ...)",
    'Identité complète du mis en cause',
    'Identité complète de la victime',
    'Description précise des faits (date, heure, lieu, objet)',
    'Qualification juridique (article 311-1 CP)',
    'Valeur du préjudice',
    'Formule de clôture et signature OPJ',
  ],
  modeleReference: 'interpellation-flagrance',
  dureeConseillee: 30,
  isPremium: true,
};

export const SUJET_REDAC_AUDITION_AGRESSION: SujetRedactionPV = {
  id: 'pv-audition-temoin-agression',
  titre: "PV d'audition de témoin — agression voie publique",
  fascicule: 'F01',
  categorie: 'audition-temoin',
  difficulte: 'intermediaire',
  miseEnSituation: `Dans le cadre d’une procédure ouverte pour violences volontaires avec circonstances encore à établir, vous entendez en qualité de témoin Mme LEROUX Sandrine, 29 ans, graphiste, domiciliée 22 rue Krumrey à Rennes, téléphone 06 ** ** ** 71, sans lien de parenté avec la victime ni avec le mis en cause identifié sous le pseudonyme d’enquête « l’homme en blouson noir ».

Les faits auraient eu lieu le 6 avril 2026 vers 19 h 40, place Sainte-Anne à Rennes, à la sortie d’un bar. Mme LEROUX indique avoir vu deux hommes se quereller ; l’un aurait porté un coup de poing au visage de l’autre, lequel serait tombé à genoux. Elle aurait entendu des insultes puis aurait vu l’agresseur prendre la fuite en direction du métro. Elle n’a pas vu d’arme. Elle estime que l’homme frappé « pouvait avoir la vingtaine, casquette grise, blouson matelassé noir ». Elle précise avoir filmé quelques secondes avec son téléphone avant de couper par crainte.

La personne n’a pas été placée en garde à vue : audition libre de témoin. Les droits afférents au témoin selon le cadre procédural en cours doivent être rappelés et consignés. Vous veillez à une narration factuelle (qui, quoi, quand, comment, perception des sens) et à la mention de la relecture.

Rédigez le PV d’audition de témoin complet (en-tête, objet, corps structuré, clôture).`,
  elementsObligatoires: [
    'Cadre procédural et visa des articles (mention adaptée au régime : 62 / 78 CPP ou autre selon le cas retenu dans votre copie)',
    'Identité complète du témoin et comparution (convocation ou présence spontanée)',
    'Rappel des droits du témoin et du secret de l’enquête',
    'Récit factuel détaillé sous forme de paragraphes ou Q/R clairement identifiés',
    'Mention des limites de sa perception (arme, nombre exact de coups, identité de l’auteurs)',
    'Relecture et signature (ou refus mentionné)',
    'Clôture conforme au modèle (Dont procès-verbal / signataires)',
  ],
  modeleReference: undefined,
  dureeConseillee: 45,
  isPremium: true,
};

export const SUJET_REDAC_GAV_NOTIFICATION: SujetRedactionPV = {
  id: 'pv-gav-placement',
  titre: 'PV de notification de garde à vue',
  fascicule: 'F11',
  categorie: 'constatation',
  difficulte: 'intermediaire',
  miseEnSituation: `M. ELMASRI Youssef, né le 4 janvier 1990 à Tours, sans emploi stable déclaré, domicilié 14 rue des Ormes à Angers, est interpellé le 8 avril 2026 à 11 h 20 dans le cadre d’une enquête pour escroquerie en bande organisée (qualification provisoire). Il est conduit au commissariat central où le placement en garde à vue est décidé à 12 h 05.

Vous rédigez le procès-verbal *initial* ou la *notification des droits* selon le canevas ME1 / consignes nationales : il faut inclure l’identification du service, l’affaire (C/ …), l’objet « notification des droits — placement en garde à vue », la mention des faits soupçonnés ou de la qualification provisoire, la durée maximale de la mesure et son point de départ, le rappel des finalités de l’article 62-2 du CPP et la motivation retenue, puis les droits des articles 63-1 à 63-3-1 (formulation structurée, sans simplification abusive qui ferait perdre des mentions en correction).

Le candidat doit montrer qu’il distingue notification complète et réception par la personne (heure de prise d’acte). Aucune audition factuelle sur le fond n’est exigée dans CE sujet précis : seule la *forme* du PV de notification fait l’objet de l’évaluation.`,
  elementsObligatoires: [
    'Bloc affaire et objet correctement libellés',
    'Qualification provisoire ou faits reprochés',
    'Durée de garde à vue et heure de début',
    'Rappel des six finalités de l’article 62-2 et motivation retenue',
    'Énumération structurée des droits 63-1 à 63-3-1 (hauteur pédagogique attendue)',
    'Prise d’acte par la personne (heure)',
    'Signatures / mentions de refus si pertinent',
  ],
  modeleReference: undefined,
  dureeConseillee: 40,
  isPremium: true,
};

export const SUJET_REDAC_DELIT_FUITE: SujetRedactionPV = {
  id: 'pv-constatation-delit-fuite',
  titre: 'PV de constatation — délit de fuite après AVP',
  fascicule: 'F03',
  categorie: 'constatation',
  difficulte: 'intermediaire',
  miseEnSituation: `Le 9 avril 2026 à 6 h 15, vous êtes désigné pour procéder aux constatations sur les lieux d’un accident de la circulation survenu vers 5 h 50, carrefour boulevard Foch / rue du Maréchal au Mans. Une cycliste, Mlle PETIT Clara, 24 ans, blessée légèrement au poignet et au genou, est prise en charge par les secours. Elle indique avoir été heurtée latéralement par « une berline grise » qui a poursuivi sa route sans s’arrêter.

Sur la chaussée : traces de freinage d’environ douze mètres, fragment de plastique de pare-chocs gris argenté, morceau de clignotant. Témoignage rapide d’un livreur : immatriculation partielle notée « …-CQ-75 ». La victime dit ne pas avoir vu le conducteur. La voie est humide ; éclairage public fonctionnel.

Vous rédigez un PV de constatations matérielles et de premières auditions de circonstance (structure type articulation ME1) permettant d’orienter ultérieurement vers une qualification de délit de fuite (renvois aux textes à citer avec prudence selon version en vigueur). Le ton reste factuel ; aucune conclusion juridique définitive sur la qualification pleine ne doit être posée comme acquise sans mention « provisoire ».`,
  elementsObligatoires: [
    'Localisation précise, date et heures des constatations',
    'Description des indices matériels (traces, débris) et photographies si mentionnées',
    'Identité et déclarations sommaires de la victime et du témoin',
    'Conditions environnementales (météo, visibilité)',
    'Mention des suites techniques (relevé ADN indisponible sur place, expertise à venir, etc.) si utile au dossier',
    'Références procédurales adaptées (sans catalogue excessif)',
    'Clôture et transmission',
  ],
  modeleReference: undefined,
  dureeConseillee: 35,
  isPremium: true,
};

export const SUJET_REDAC_SAISIE_STUP: SujetRedactionPV = {
  id: 'pv-saisie-stupefiants',
  titre: 'PV de saisie — stupéfiants lors d’une perquisition',
  fascicule: 'F05',
  categorie: 'perquisition',
  difficulte: 'avance',
  miseEnSituation: `Une perquisition a été autorisée au domicile de M. VALENTI Marco, né le 18 septembre 1987, 7 impasse des Glycines à Bordeaux, dans le cadre d’une enquête préliminaire pour importation et détention illicites de stupéfiants. L’opération se déroule le 10 avril 2026 de 6 h 30 à 8 h 40 en présence de l’occupant, de deux témoins d’officier public, et avec la présence de l’avocat commis sur réquisition.

À l’intérieur d’un sac de sport noir déposé dans la buanderie : trois sachets thermosoudés contenant une résine brune caractéristique, pesée sur place à 0,42 kg (balance de service no XXXX, scellés STUP/BDX/2026/… à attribuer dans votre rédaction). Une liasse de petits billets est découverte dans une enveloppe ; vous ne validez pas le montant exact dans le PV sans dénombrement : vous indiquez « liasse d’appoint en euros à inventorier ». Un téléphone portable est également saisi pour extraction ultérieure.

Rédigez le PV de saisie-perquisition incluant les personnes présentes, le déroulé respectueux des droits, l’état des lieux sommaire, l’inventaire des objets saisis avec numéros de scellés fictifs cohérents, et les mentions sur la conservation des preuves.`,
  elementsObligatoires: [
    'Base légale de la perquisition (mention générique cohérente avec un cadre préliminaire + assentiment ou ordonnance à rappeler)',
    'Liste des personnes présentes (OPJ, occupant, témoins, conseil)',
    'Chronologie de l’opération',
    'Description des saisies et scellés (stupéfiants, téléphone, numéraire)',
    'Mentions sur les droits de la personne concernée',
    'Consignation et destination des scellés',
    'Signatures et fin de procès-verbal',
  ],
  modeleReference: 'perquisition-flagrance',
  dureeConseillee: 50,
  isPremium: true,
};

export const SUJET_REDAC_SYNTHESE_VIOLENCES: SujetRedactionPV = {
  id: 'pv-synthese-violences',
  titre: 'PV de synthèse — violences conjugales',
  fascicule: 'F01',
  categorie: 'rapport-synthese',
  difficulte: 'avance',
  miseEnSituation: `Plusieurs actes ont déjà été dressés sur une même procédure ouverte pour violences habituelles sur conjoint : PV de première intervention du 1er avril 2026 avec constatations de pleurs et ecchymosis au bras ; audition de Mme BERNARD Laura le 2 avril ; audition de M. BERNARD Julien le 3 avril en garde à vue suivie d’une main courante sur votre requête ; rapport de médecin du 3 avril évoquant ITT probable à confirmer.

Le 11 avril 2026, le parquet vous demande de *synthétiser* l’ensemble dans un procès-verbal unique « de synthèse » avant transmission au magistrat : vous devez rappeler les filiations entre pièces (références marginales PV n° …/…), présenter une chronologie unifiée, les positions respectives des parties (sans travestir les contradictions), les qualifications provisoires et les mesures déjà ordonnées (éloignement du domicile conjugal si mentionné dans les pièces fictives : indiquez « selon PV n° … »).

Ce sujet teste la maîtrise de la *consolidation* et du *ton magistrat* : phrases plus télégraphiques acceptées pour la relecture parquet, mais aucune omission des éléments de personnalisation des faits.`,
  elementsObligatoires: [
    'Rappel des références des PV antérieurs et filiation dossier',
    'Chronologie unifiée des événements',
    'Synthèse des auditions (points d’accord / points de contradiction)',
    'État des blessures et pièces médicales',
    'Qualifications provisoires et articles invoqués prudemment',
    'Mesures et suites déjà intervenues',
    'Propositions opérationnelles pour le parquet (sans usurper sa décision)',
  ],
  modeleReference: 'rapport-synthese',
  dureeConseillee: 60,
  isPremium: true,
};

export const SUJETS_REDACTION_PV: SujetRedactionPV[] = [
  SUJET_REDAC_VOL_FLAGRANCE,
  SUJET_REDAC_AUDITION_AGRESSION,
  SUJET_REDAC_GAV_NOTIFICATION,
  SUJET_REDAC_DELIT_FUITE,
  SUJET_REDAC_SAISIE_STUP,
  SUJET_REDAC_SYNTHESE_VIOLENCES,
];

export function getSujetRedactionPVById(id: string): SujetRedactionPV | undefined {
  return SUJETS_REDACTION_PV.find((s) => s.id === id);
}
