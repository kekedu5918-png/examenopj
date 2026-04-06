import type { Flashcard } from '@/data/flashcards-types';

const C = 'Nation, État et paix publique';
const S = 'etat-et-paix-publique';

function pair(
  baseId: string,
  groupe: string,
  nom: string,
  definitionCourte: string,
  legalLine: string,
  materielMoral: string,
  tentative?: string,
  complicite?: string,
): Flashcard[] {
  const footer = legalLine;
  return [
    {
      id: `${baseId}-legal`,
      fascicule: 4,
      domaine: 'DPS',
      categorie: C,
      categorieSlug: S,
      groupe,
      nom,
      definitionCourte,
      materiel: [],
      moral: '',
      legal: legalLine,
      versoFooter: footer,
      tentative,
      complicite,
    },
    {
      id: `${baseId}-mm`,
      fascicule: 4,
      domaine: 'DPS',
      categorie: C,
      categorieSlug: S,
      groupe,
      nom,
      definitionCourte,
      materiel: [],
      moral: '',
      legal: '',
      materielMoralComplet: materielMoral,
      versoFooter: footer,
      tentative,
      complicite,
    },
  ];
}

export const flashcardsF04: Flashcard[] = [
  ...pair(
    'fc-f04-432-7',
    'Atteintes par les dépositaires',
    'Discrimination par personne exerçant une fonction publique',
    '**Refus de droit ou entrave à une activité économique pour motif discriminatoire.**',
    '*Art. 432-7 du Code pénal*.',
    `**MATÉRIEL :** discrimination au sens *225-1* et *225-1-1* ; autorité publique ou mission de SP ; dans l’exercice ou à l’occasion des fonctions ; refus de droit ou entrave économique.

**MORAL :** conscience de discriminer et connaissance du motif.`,
  ),
  ...pair(
    'fc-f04-432-8',
    'Atteintes par les dépositaires',
    'Atteinte à l’inviolabilité du domicile (personne publique)',
    '**Entrer ou tenter d’entrer dans le domicile contre le gré de l’occupant hors cas légaux.**',
    '*Art. 432-8 du Code pénal*.',
    `**MATÉRIEL :** introduction ou tentative ; domicile d’autrui ; contre le gré de l’occupant ; par dépositaire de l’autorité publique ; hors hypothèses légales.

**MORAL :** conscience d’agir hors cadre légal.`,
  ),
  ...pair(
    'fc-f04-432-9',
    'Atteintes par les dépositaires',
    'Atteinte au secret des correspondances (personne publique)',
    '**Détourner, supprimer ou ouvrir des correspondances hors cas légaux.**',
    '*Art. 432-9 du Code pénal*.',
    `**MATÉRIEL :** ordonner, commettre ou faciliter le détournement, la suppression ou l’ouverture de correspondances ; autorité publique ou mission de SP ; hors cas prévus par la loi.

**MORAL :** conscience d’agir hors cas légaux.`,
  ),
  ...pair(
    'fc-f04-432-10',
    'Corruption et finances publiques',
    'Concussion',
    '**Percevoir ou ordonner de percevoir une somme indue au titre d’impôts ou taxes.**',
    '*Art. 432-10 du Code pénal*.',
    `**MATÉRIEL :** recevoir, exiger ou ordonner de percevoir une somme non due ou excessive ; au titre de droits, contributions, impôts ou taxes ; agent public ou mission de SP.

**MORAL :** conscience du caractère indu.`,
  ),
  ...pair(
    'fc-f04-corr-pass',
    'Corruption et finances publiques',
    'Corruption passive (1° – avantage en échange d’un acte de fonction)',
    '**Solliciter ou agréer un avantage pour accomplir ou s’abstenir d’un acte de sa fonction.**',
    '*Art. 432-11 1° du Code pénal*.',
    `**MATÉRIEL :** sollicitation ou agrément d’avantages sans droit ; directement ou indirectement ; pour acte ou abstention liés à la fonction, mission ou mandat.

**MORAL :** conscience d’échanger avantage et pouvoir public.`,
  ),
  ...pair(
    'fc-f04-traf-inf',
    'Corruption et finances publiques',
    'Trafic d’influence (passif et actif)',
    '**Abuser de son influence réelle ou supposée pour obtenir une décision favorable.**',
    '*Art. 432-11 2°* (passif) et *433-2* (actif) *du Code pénal*.',
    `**MATÉRIEL :** sollicitation ou agrément d’avantages en vue d’abuser d’une influence (passif) ; offre de gratification pour obtenir d’une autorité une décision grâce à l’influence d’un tiers (actif).

**MORAL :** conscience d’agir sur le marché de l’influence.`,
  ),
  ...pair(
    'fc-f04-outrage',
    'Atteintes aux agents',
    'Outrage',
    '**Propos ou écrits non publics portant atteinte à la dignité d’un agent de SP.**',
    '*Art. 433-5 du Code pénal* — non public ; *à distinguer* des injures publiques (loi 1881).',
    `**MATÉRIEL :** paroles, gestes, menaces, écrits ou images non publics, envoi d’objets ; personne en mission de SP ; dans l’exercice ou à l’occasion ; atteinte à la dignité ou au respect de la fonction.

**MORAL :** volonté d’atteindre la fonction ; connaissance de la qualité de la victime.`,
    'NON',
    'OUI',
  ),
  ...pair(
    'fc-f04-rebel',
    'Atteintes aux agents',
    'Rébellion',
    '**Résistance violente ou voie de fait aux agents légitimement en fonction.**',
    '*Art. 433-6* (définition) et *433-7* (peines) *du Code pénal* — ca armes, réunion…',
    `**MATÉRIEL :** opposition par violence ou voie de fait ; personne dépositaire de l’autorité publique ou mission de SP ; agissant pour faire respecter la loi ou une décision.

**MORAL :** volonté de résister ; connaissance de la qualité de la victime.`,
    'NON',
    'OUI',
  ),
  ...pair(
    'fc-f04-nond',
    'Obstacles à la justice',
    'Non-dénonciation de crime',
    '**Ta silence alors qu’un crime encore prévenable est connu.**',
    '*Art. 434-1 du Code pénal* — exceptions : secret professionnel, famille proche…',
    `**MATÉRIEL :** connaissance d’un crime encore prévenable ou auteurs dangereux ; absence d’information aux autorités compétentes.

**MORAL :** conscience du crime ; volonté de ne pas dénoncer.`,
  ),
  ...pair(
    'fc-f04-mens',
    'Obstacles à la justice',
    'Témoignage mensonger',
    '**Fausse déposition sous serment devant justice ou OPJ en commission rogatoire.**',
    '*Art. 434-13 du Code pénal*.',
    `**MATÉRIEL :** témoignage sous serment ; fausseté manifeste ; juridiction ou OPJ habilité.

**MORAL :** conscience de la fausseté ; volonté de tromper la justice.`,
  ),
  ...pair(
    'fc-f04-f441-1',
    'Faux et falsifications',
    'Faux et usage de faux (441-1)',
    '**Altération frauduleuse de la vérité dans un écrit causant ou pouvant causer un préjudice.**',
    '*Art. 441-1 du Code pénal* — usage de faux : infraction autonome, même peine.',
    `**MATÉRIEL :** support d’expression de la pensée ; altération frauduleuse ; préjudice réel ou possible ; moyens définis par la loi (contrefaçon, suppression…).

**MORAL :** conscience de la falsification ; intention de tromper.`,
    'NON',
    'OUI',
  ),
  ...pair(
    'fc-f04-f441-2',
    'Faux et falsifications',
    'Faux dans un document administratif',
    '**Falsifier un titre ou document administratif (identité, autorisation…).**',
    '*Art. 441-2 du Code pénal*.',
    `**MATÉRIEL :** document délivré par une administration ; établi pour constater droit, identité, qualité ou autorisation ; contrefaçon ou falsification.

**MORAL :** conscience de la falsification ; intention frauduleuse.`,
  ),
  ...pair(
    'fc-f04-f441-4',
    'Faux et falsifications',
    'Faux dans une écriture publique ou authentique',
    '**Faux touchant acte authentique ou enregistrement public.**',
    '*Art. 441-4 du Code pénal* — **crime**.',
    `**MATÉRIEL :** faux dans écriture publique ou authentique ou enregistrement prescrit par l’autorité.

**MORAL :** intention frauduleuse.`,
  ),
  ...pair(
    'fc-f04-f441-7',
    'Faux et falsifications',
    'Faux certificats ou attestations',
    '**Attestation inexacte ou falsifiée de la part d’une personne habilitée.**',
    '*Art. 441-7 du Code pénal* — peine aggravée si préjudice au Trésor ou à autrui.',
    `**MATÉRIEL :** attestation ou certificat ; faits matériellement inexacts ou altération ; usage éventuel.

**MORAL :** conscience de l’inexactitude.`,
  ),
  ...pair(
    'fc-f04-450-1',
    'Bandes et ententes',
    'Association de malfaiteurs',
    '**Groupe structuré en vue de préparer des crimes ou délits ≥ 5 ans de peine.**',
    '*Art. 450-1 du Code pénal* — **à distinguer** de la bande organisée (*132-71*), circonstance aggravante.',
    `**MATÉRIEL :** entente ou groupement ; visant préparation d’infractions punies d’au moins 5 ans (ou crimes 10 ans pour qualification crime) ; faits matériels de préparation ; au moins 2 personnes.

**MORAL :** participation sciemment volontaire ; connaissance du but.`,
    'NON',
    'OUI',
  ),
];
