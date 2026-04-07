import { getInfractionsCatalogFromOfficial } from '@/data/infractions-officielles-catalog';
import { recapSectionF01P1 } from '@/data/recapitulatif-f01-p1';
import { recapSectionsF03F07 } from '@/data/recapitulatif-f03-f07';

export type RecapFasciculeFilter =
  | 'all'
  | 'f01p1'
  | 'f01p2'
  | 'f02'
  | 'f03'
  | 'f04'
  | 'f05'
  | 'f06'
  | 'f07';

/** Grille « priorité examen » : ce qu’il faut maîtriser en premier (sans prétendre aux annales). */
export type RecapPriorite = 'core' | 'freq' | 'secours';

/** Ordre d’affichage : du plus « à savoir par cœur » (core) au plus de secours (secours). */
export const PRIORITE_ORDER: Record<RecapPriorite, number> = {
  core: 0,
  freq: 1,
  secours: 2,
};

export const PRIORITE_EXAMEN_BADGE: Record<RecapPriorite, { label: string; className: string }> = {
  core: {
    label: 'Prioritaire',
    className: 'border-rose-400/45 bg-rose-500/18 text-rose-50',
  },
  freq: {
    label: 'Très probable',
    className: 'border-amber-400/40 bg-amber-500/14 text-amber-50',
  },
  secours: {
    label: 'À sécuriser',
    className: 'border-slate-400/35 bg-slate-600/20 text-slate-100',
  },
};

export type RecapRow = {
  infraction: string;
  legal: string;
  materiel: string;
  moral: string;
  priorite?: RecapPriorite;
  /** Ex. « Très souvent cité au programme » — mention éditoriale. */
  noteExamen?: string;
};

export type RecapFasciculeId = 'F01' | 'F02' | 'F03' | 'F04' | 'F05' | 'F06' | 'F07';

export type RecapSection = {
  id: string;
  fascicule: RecapFasciculeId;
  fasciculePart?: string;
  groupTitle: string;
  /** Classes Tailwind pour la ligne de groupe */
  headerClass: string;
  rows: RecapRow[];
};

/** Tableau synthétique : titres condensés (pas le détail des flashcards). */
export const recapSections: RecapSection[] = [
  recapSectionF01P1 as RecapSection,
  {
    id: 'f01-p2-a',
    fascicule: 'F01',
    fasciculePart: 'Partie 2',
    groupTitle: 'La mise en danger de la personne',
    headerClass: 'bg-rose-900/70 text-rose-50',
    rows: [
      {
        infraction: '**Le risque causé à autrui**',
        legal: 'Art. 223-1 C.P. — prévoit et réprime le risque causé à autrui',
        materiel: '**OBLIGATION PARTICULIÈRE DE PRUDENCE OU DE SÉCURITÉ** / **EXPOSITION DIRECTE AU RISQUE**',
        moral: '**VIOLATION MANIFESTEMENT DÉLIBÉRÉE D\'UNE OBLIGATION DE PRUDENCE OU DE SÉCURITÉ**',
      },
      {
        infraction: '**La mise en danger par la diffusion d\'informations personnelles**',
        legal: 'Art. 223-1-1 C.P. — définit et réprime la mise en danger par la diffusion d\'informations personnelles',
        materiel:
          '**LA RÉVÉLATION, DIFFUSION OU TRANSMISSION, PAR QUELQUE MOYEN QUE CE SOIT** / **D\'INFORMATIONS RELATIVES À LA VIE PRIVÉE, FAMILIALE OU PROFESSIONNELLE** / **PERMETTANT D\'IDENTIFIER OU DE LOCALISER LA PERSONNE** / **COMMISE PAR TOUTE PERSONNE**',
        moral: '**INTENTION DE NUIRE GRAVEMENT À AUTRUI**',
      },
      {
        infraction: '**Le délaissement d\'une personne qui n\'est pas en mesure de se protéger**',
        legal: 'Art. 223-3 C.P. — prévoit et réprime le délaissement d\'une personne qui n\'est pas en mesure de se protéger',
        materiel: '**QUALITÉ DE LA VICTIME** / **UN ACTE POSITIF**',
        moral: '**VOLONTÉ DE DÉLAISSER LA VICTIME**',
      },
      {
        infraction: '**Le non-obstacle à la commission d\'un crime ou d\'un délit**',
        legal: 'Art. 223-6 al. 1 C.P. — prévoit et réprime la non-obstacle à la commission d\'un crime ou d\'un délit contre l\'intégrité corporelle',
        materiel:
          '**IMMINENCE D\'UN CRIME OU DÉLIT CONTRE L\'INTÉGRITÉ CORPORELLE** / **UNE POSSIBILITÉ D\'ACTION IMMÉDIATE** / **UNE ABSENCE DE RISQUE POUR SOI-MÊME OU LES TIERS**',
        moral: '**CONSCIENCE DE L\'IMMINENCE D\'UNE INFRACTION** / **VOLONTÉ DE NE PAS EMPÊCHER L\'INFRACTION**',
      },
      {
        infraction: '**La non-assistance à personne en péril**',
        legal: 'Art. 223-6 al. 2 C.P. (incrimination) — al. 1 C.P. (peine applicable)',
        materiel:
          '**IMMINENCE D\'UN PÉRIL** / **NATURE DU PÉRIL** / **UNE ABSENCE D\'ASSISTANCE** / **UNE ABSENCE DE RISQUE POUR SOI-MÊME OU POUR AUTRUI**',
        moral: '**CONSCIENCE OU CONNAISSANCE DU PÉRIL IMMINENT** / **VOLONTÉ DE NE PAS AGIR**',
      },
      {
        infraction: '**L\'abus frauduleux de l\'état d\'ignorance ou de faiblesse**',
        legal: 'Art. 223-15-2 C.P. — prévoit et réprime l\'abus frauduleux de l\'état d\'ignorance ou de la situation de faiblesse',
        materiel: '**UN ACTE D\'ABUS FRAUDULEUX** / **UNE VICTIME PARTICULIÈRE** / **UN PRÉJUDICE POUR LA VICTIME**',
        moral:
          '**CONNAISSANCE DE LA MINORITÉ OU DE LA VULNÉRABILITÉ DE LA VICTIME** / **CONSCIENCE DE POUSSER LA VICTIME À ACCOMPLIR UN ACTE OU UNE ABSTENTION QUI LUI EST GRAVEMENT PRÉJUDICIABLE**',
      },
    ],
  },
  {
    id: 'f01-p2-b',
    fascicule: 'F01',
    fasciculePart: 'Partie 2',
    groupTitle: 'Les atteintes aux libertés de la personne',
    headerClass: 'bg-rose-900/70 text-rose-50',
    rows: [
      {
        infraction: '**L\'enlèvement et la séquestration**',
        legal: 'Art. 224-1 C.P. — prévoit et réprime l\'enlèvement et la séquestration (y compris arrestation, enlèvement, détention)',
        materiel: '**LA COMMISSION D\'UN ACTE** / **ABSENCE D\'ÉLÉMENT JUSTIFICATIF**',
        moral: '**CONSCIENCE D\'ENTRAVER LA LIBERTÉ D\'ALLER ET DE VENIR DE LA VICTIME**',
      },
    ],
  },
  {
    id: 'f01-p2-c',
    fascicule: 'F01',
    fasciculePart: 'Partie 2',
    groupTitle: 'Les atteintes à la dignité de la personne',
    headerClass: 'bg-rose-800/70 text-rose-50',
    rows: [
      {
        infraction: '**Les discriminations**',
        legal:
          'Art. 225-1 C.P. (personnes physiques et morales) — 225-1-1 (discrimination résultant d\'un harcèlement sexuel) — 225-1-2 (bizutage) — 225-2 C.P. (situations d\'interdiction)',
        materiel:
          'Six situations (art. 225-2) / **LES MOTIFS DISCRIMINATOIRES** / **UNE VICTIME** / **LES EXCEPTIONS**',
        moral: '**CONSCIENCE DE L\'AUTEUR DE SE LIVRER À DES AGISSEMENTS DISCRIMINATOIRES**',
      },
      {
        infraction: '**La traite des êtres humains**',
        legal: 'Art. 225-4-1 C.P. — définit et réprime la traite des êtres humains',
        materiel:
          '**UN ACTE POSITIF DE L\'AUTEUR À L\'ENCONTRE D\'UNE PERSONNE** / **UNE CIRCONSTANCE DE COMMISSION DE L\'ACTE** / **UNE MISE À DISPOSITION DE LA PERSONNE** / **UN OBJECTIF CRIMINEL**',
        moral: '**CONSCIENCE DE L\'AUTEUR DU DEVENIR DE LA VICTIME**',
      },
      {
        infraction: '**La dissimulation forcée du visage**',
        legal: 'Art. 225-4-10 C.P. — prévoit et réprime la dissimulation forcée du visage',
        materiel:
          '**UNE DISSIMULATION DU VISAGE IMPOSÉE** / **UNE OU PLUSIEURS AUTRES PERSONNES** / **LA DISSIMULATION DOIT ÊTRE OBTENUE PAR UN DES CINQ MOYENS ÉNUMÉRÉS** / **CETTE DISSIMULATION DOIT ÊTRE IMPOSÉE SUR LE FONDEMENT DU SEXE DE LA VICTIME**',
        moral: '**CONSCIENCE D\'EXERCER UNE PRESSION SUR LA VICTIME** / **VOLONTÉ D\'IMPOSER À AUTRUI DE DISSIMULER SON VISAGE**',
      },
      {
        infraction: '**Le proxénétisme**',
        legal: 'Art. 225-5 C.P. — définit et réprime le proxénétisme',
        materiel:
          '**AIDE, ASSISTANCE OU PROTECTION DE LA PROSTITUTION D\'AUTRUI** / **BÉNÉFICIER DE LA PROSTITUTION D\'AUTRUI** / **UNE INCITATION À LA PROSTITUTION**',
        moral: '**CONSCIENCE DE L\'AUTEUR DE FAVORISER OU PROFITER DE LA PROSTITUTION D\'AUTRUI**',
      },
      {
        infraction: '**Le proxénétisme par assimilation**',
        legal: 'Art. 225-6 C.P. (définition des quatre cas) — Art. 225-5 C.P. (répression)',
        materiel:
          '**FAIRE OFFICE D\'INTERMÉDIAIRE** / **FACILITER LA JUSTIFICATION DE RESSOURCES FICTIVES** / **NON-JUSTIFICATION DE RESSOURCES** / **ENTRAVER L\'ACTION DE PRÉVENTION OU DE RÉÉDUCATION**',
        moral: '**INTENTION COUPABLE DE L\'AUTEUR**',
      },
      {
        infraction: '**Le proxénétisme hôtelier**',
        legal: 'Art. 225-10 C.P. — définit et réprime le proxénétisme hôtelier',
        materiel:
          '**TENUE D\'UN ÉTABLISSEMENT DE PROSTITUTION** / **TOLÉRANCE DE LA PROSTITUTION** / **VENDRE OU METTRE À DISPOSITION DES LOCAUX OU EMPLACEMENTS** / **VENDRE, LOUER OU METTRE À DISPOSITION DES VÉHICULES**',
        moral: '**CONSCIENCE DE L\'AUTEUR DE FACILITER LA PROSTITUTION**',
      },
      {
        infraction: '**Le recours à la prostitution de mineur ou de personne particulièrement vulnérable**',
        legal: 'Art. 225-12-1 al. 2 C.P. — définit et réprime le recours à la prostitution de mineur ou de PPV',
        materiel:
          '**SOLLICITER, ACCEPTER, OBTENIR DES RELATIONS DE NATURE SEXUELLE** / **AVEC UN MINEUR OU UNE PERSONNE PARTICULIÈREMENT VULNÉRABLE SE LIVRANT A LA PROSTITUTION** / **UNE RÉMUNÉRATION OU UNE PROMESSE DE RÉMUNÉRATION**',
        moral: '**VOLONTÉ DE L\'AUTEUR D\'AVOIR DES RELATIONS DE NATURE SEXUELLE AVEC UN MINEUR OU UNE PERSONNE VULNÉRABLE**',
      },
      {
        infraction: '**La rétribution inexistante ou insuffisante du travail d\'une personne vulnérable ou dépendante**',
        legal: 'Art. 225-13 C.P. — définit et réprime la rétribution inexistante ou insuffisante du travail',
        materiel: '**LA FOURNITURE DE SERVICES** / **ABSENCE OU INSUFFISANCE DE RÉMUNÉRATION** / **UNE VICTIME VULNÉRABLE OU EN ÉTAT DE DÉPENDANCE**',
        moral:
          '**CONSCIENCE DE LA VULNÉRABILITÉ OU DE L\'ÉTAT DE DÉPENDANCE DE LA VICTIME** / **CONSCIENCE DE L\'AUTEUR D\'EXIGER LA FOURNITURE DE SERVICES NON RÉTRIBUÉS OU RÉTRIBUÉS INSUFFISAMMENT**',
      },
      {
        infraction:
          '**La soumission d\'une personne vulnérable ou dépendante à des conditions de travail ou d\'hébergement incompatibles avec la dignité humaine**',
        legal: 'Art. 225-14 C.P. — définit et réprime la soumission à des conditions incompatibles avec la dignité humaine',
        materiel:
          '**CONDITIONS DE TRAVAIL OU D\'HÉBERGEMENT INCOMPATIBLES AVEC LA DIGNITÉ HUMAINE** / **UNE VICTIME VULNÉRABLE OU EN ÉTAT DE DÉPENDANCE**',
        moral:
          '**CONSCIENCE DE LA VULNÉRABILITÉ OU DE L\'ÉTAT DE DÉPENDANCE DE LA VICTIME** / **CONSCIENCE DE L\'AUTEUR D\'HÉBERGER OU DE FAIRE TRAVAILLER UNE PERSONNE VULNÉRABLE OU DÉPENDANTE DANS DES CONDITIONS INCOMPATIBLES AVEC LA DIGNITÉ HUMAINE**',
      },
      {
        infraction: '**L\'atteinte à l\'intégrité du cadavre**',
        legal: 'Art. 225-17 al. 1 C.P. — prévoit et réprime l\'atteinte à l\'intégrité du cadavre',
        materiel: '**LE CORPS D\'UN DÉFUNT** / **UNE ATTEINTE A L\'INTÉGRITÉ DU CADAVRE**',
        moral: '**CONSCIENCE DE L\'AUTEUR DE COMMETTRE UN ACTE DE NATURE A PORTER ATTEINTE A L\'INTÉGRITÉ DU CADAVRE**',
      },
      {
        infraction:
          '**La violation et la profanation de tombeaux, de sépultures, d\'urnes cinéraires ou de monuments édifiés à la mémoire des morts**',
        legal: 'Art. 225-17 al. 2 C.P. — prévoit et réprime la violation ou la profanation des lieux et monuments protégés',
        materiel: '**LES LIEUX ET OBJETS PROTÉGÉS** / **UN ACTE DE VIOLATION OU DE PROFANATION**',
        moral:
          '**CONSCIENCE DE L\'AUTEUR DE VIOLER OU PROFANER UN TOMBEAU, UNE SÉPULTURE, UNE URNE CINÉRAIRE OU UN MONUMENT ÉDIFIÉ À LA MÉMOIRE DES MORTS**',
      },
    ],
  },
  {
    id: 'f01-p2-d',
    fascicule: 'F01',
    fasciculePart: 'Partie 2',
    groupTitle: 'Les atteintes à la personnalité',
    headerClass: 'bg-rose-800/70 text-rose-50',
    rows: [
      {
        infraction: '**L\'atteinte à l\'intimité de la vie privée**',
        legal:
          'Art. 226-1 C.P. — définit et réprime les atteintes à l\'intimité de la vie privée ; Art. 226-2 C.P. — conservation, diffusion ou utilisation des documents ou enregistrements',
        materiel:
          'AU MOYEN D\'UN PROCÉDÉ QUELCONQUE / **LA CAPTATION, L\'ENREGISTREMENT OU LA TRANSMISSION DES PAROLES…** / **LA FIXATION, L\'ENREGISTREMENT OU LA TRANSMISSION DE L\'IMAGE…** / **LA LOCALISATION…** / **LA CONSERVATION, LA DIVULGATION OU L\'UTILISATION D\'UN ENREGISTREMENT…**',
        moral: '**CONSCIENCE DE SE LIVRER À UN ACTE ILLICITE** / **VOLONTÉ DE PORTER ATTEINTE À LA VIE PRIVÉE D\'AUTRUI**',
      },
      {
        infraction:
          '**La diffusion, sans l\'accord de la personne concernée, d\'un enregistrement ou document portant sur des paroles ou images à caractère sexuel**',
        legal:
          'Art. 226-2-1 al. 2 C.P. — définit et réprime la diffusion sans accord (images ou paroles à caractère sexuel)',
        materiel:
          '**UN ENREGISTREMENT OU DOCUMENT OBTENU AVEC LE CONSENTEMENT EXPRÈS OU PRÉSUMÉ DE LA PERSONNE, OU PAR ELLE-MÊME** / **UN CARACTÈRE SEXUEL** / **UNE DIFFUSION SANS ACCORD**',
        moral:
          '**CONSCIENCE DE L\'AUTEUR DE DIFFUSER, SANS ACCORD DE LA PERSONNE, UN ENREGISTREMENT OU DOCUMENT PORTANT SUR DES PAROLES OU IMAGES À CARACTÈRE SEXUEL**',
      },
      {
        infraction: '**L\'atteinte à l\'intimité d\'une personne**',
        legal: 'Art. 226-3-1 C.P. — prévoit et réprime l\'atteinte à l\'intimité d\'une personne',
        materiel: '**UNE OBSERVATION DES PARTIES INTIMES DISSIMULÉES D\'UNE PERSONNE** / **À SON INSU OU SANS SON CONSENTEMENT**',
        moral: '**CONSCIENCE DE L\'AUTEUR DE COMMETTRE UN ACTE IMPUDIQUE** / **VOLONTÉ D\'ATTENTER À L\'INTIMITÉ DE LA PERSONNE**',
      },
      {
        infraction: '**La violation de domicile**',
        legal: 'Art. 226-4 C.P. — définit et réprime la violation de domicile commise par un particulier',
        materiel:
          '**UN DOMICILE** / **INTRODUCTION AU MOYEN DE MANŒUVRES, MENACES, VOIES DE FAIT OU CONTRAINTE** / **MAINTIEN À L\'ISSUE D\'UNE ENTRÉE ILLÉGITIME** / **HORS LES CAS OÙ LA LOI LE PERMET**',
        moral:
          '**LA VOLONTÉ DE S\'INTRODUIRE OU DE SE MAINTENIR DANS LE DOMICILE D\'AUTRUI À SON INSU OU CONTRE SON GRÉ** / **LA CONSCIENCE D\'AGIR EN DEHORS DES CAS PRÉVUS PAR LOI**',
      },
      {
        infraction: '**L\'usurpation de l\'identité d\'un tiers en vue de lui nuire**',
        legal:
          'Art. 226-4-1 al. 1 C.P. — usurpation ou usage de données ; al. 2 — commis sur un réseau de communication au public en ligne',
        materiel:
          '**UNE USURPATION D\'IDENTITÉ** / **UN USAGE DE DONNÉES DE TOUTE NATURE** / **PERMETTANT D\'IDENTIFIER LE TIERS** / **UNE VICTIME PARTICULIÈRE**',
        moral:
          '**VOLONTÉ DE TROUBLER LA TRANQUILLITÉ DE LA PERSONNE OU CELLE D\'AUTRUI** / **VOLONTÉ DE PORTER ATTEINTE À L\'HONNEUR OU À LA CONSIDÉRATION DE LA PERSONNE**',
      },
      {
        infraction: '**L\'atteinte à la représentation de la personne**',
        legal: 'Art. 226-8 C.P. — définit et réprime l\'atteinte à la représentation de la personne (montage / contenu généré algorithmiquement)',
        materiel:
          '**UN MONTAGE** / **UN CONTENU VISUEL OU SONORE GÉNÉRÉ ALGORITHMIQUEMENT** / **PORTER À LA CONNAISSANCE DU PUBLIC OU D\'UN TIERS PAR QUELQUE VOIE QUE CE SOIT** / **UNE ABSENCE DE CONSENTEMENT DE LA PERSONNE (SAUF TRUCAGE MANIFESTEMENT APPARENT OU SIGNALÉ)**',
        moral: '**LA VOLONTÉ DE CRÉER UN MONTAGE EN VUE DE TROMPER LE PUBLIC**',
      },
      {
        infraction: '**La dénonciation calomnieuse**',
        legal: 'Art. 226-10 C.P. — définit et réprime la dénonciation calomnieuse',
        materiel:
          '**UNE DÉNONCIATION** / **CARACTÈRE SPONTANÉ DE LA DÉNONCIATION** / **UNE DÉNONCIATION PRÉJUDICIABLE** / **INEXACTITUDE DES FAITS DÉNONCÉS**',
        moral: '**CONSCIENCE DE L\'AUTEUR DE DÉNONCER DES FAITS INEXACTS AU MOMENT OÙ IL LES DÉNONCE**',
      },
      {
        infraction: '**L\'atteinte au secret professionnel**',
        legal: 'Art. 226-13 C.P. — définit et réprime l\'atteinte au secret professionnel',
        materiel: '**UNE PERSONNE DÉPOSITAIRE D\'UN SECRET** / **UN SECRET** / **UN ACTE DE RÉVÉLATION**',
        moral: '**CONSCIENCE DE L\'AUTEUR DE RÉVÉLER UN SECRET DONT IL EST DÉPOSITAIRE**',
      },
      {
        infraction: '**L\'atteinte au secret des correspondances commise par un particulier**',
        legal: 'Art. 226-15 al. 1 C.P. — définit et réprime l\'atteinte au secret des correspondances (particulier)',
        materiel: '**L\'OBJET DE L\'ATTEINTE** / **UN ACTE MATÉRIEL D\'ATTEINTE**',
        moral:
          '**CONSCIENCE DE L\'AUTEUR D\'OUVRIR, SUPPRIMER, RETARDER, DETOURNER OU PRENDRE CONNAISSANCE DU CONTENU D\'UNE CORRESPONDANCE QUI NE LUI ETAIT PAS DESTINEE**',
      },
      {
        infraction: '**La violation des correspondances émises par la voie électronique**',
        legal: 'Art. 226-15 al. 2 C.P. (définition) — al. 1 C.P. (répression)',
        materiel: '**DES CORRESPONDANCES ÉMISES, TRANSMISES, REÇUES PAR LA VOIE ÉLECTRONIQUE** / **UN ACTE MATÉRIEL D\'ATTEINTE**',
        moral:
          '**CONSCIENCE DE L\'AUTEUR D\'INTERCEPTER, DÉTOURNER, UTILISER, DIVULGUER DES CORRESPONDANCES ÉMISES PAR LA VOIE ÉLECTRONIQUE, OU DE PROCÉDER A L\'INSTALLATION D\'APPAREILS POUR RÉALISER DE TELLES INTERCEPTIONS**',
      },
    ],
  },
  {
    id: 'f02-vol',
    fascicule: 'F02',
    groupTitle: 'LE VOL',
    headerClass: 'bg-sky-950/80 text-sky-100',
    rows: [
      {
        infraction: '**Le vol**',
        legal: 'Art. 311-1 C.P. définit le vol — Art. 311-3 C.P. en prévoit la répression',
        materiel: 'LA SOUSTRACTION / LA CHOSE / D\'AUTRUI',
        moral:
          'CONSCIENCE DE SOUSTRAIRE UNE CHOSE QUI NE LUI APPARTIENT PAS / VOLONTÉ DE SE COMPORTER, MÊME MOMENTANÉMENT, EN MAÎTRE DE LA CHOSE',
        priorite: 'core',
        noteExamen: 'Régime des qualifications aggravées (ex. local d’habitation) souvent couplé au sujet.',
      },
    ],
  },
  {
    id: 'f02-voisines',
    fascicule: 'F02',
    groupTitle: 'INFRACTIONS VOISINES DU VOL',
    headerClass: 'bg-sky-900/70 text-sky-50',
    rows: [
      {
        infraction: '**L\'extorsion**',
        legal: 'Art. 312-1 C.P. — définit et réprime l\'extorsion',
        materiel: 'DES MOYENS MIS EN ŒUVRE / UNE REMISE PAR LA VICTIME / L\'OBJET DE LA REMISE',
        moral: 'VOLONTÉ DE L\'AUTEUR D\'OBTENIR CE QUI NE PEUT ÊTRE LIBREMENT CONSENTI EN USANT DE PROCÉDÉS CONTRAIGNANTS',
      },
      {
        infraction: '**Le chantage**',
        legal: 'Art. 312-10 C.P. — définit et réprime le chantage',
        materiel: 'MENACE DE RÉVÉLATIONS OU D\'IMPUTATIONS DIFFAMATOIRES / L\'EXPRESSION DE LA MENACE / L\'OBJET DE LA MENACE',
        moral:
          'VOLONTÉ DE L\'AUTEUR DE CONTRAINDRE AUTRUI POUR OBTENIR CE QUI N\'AURAIT PU ÊTRE OBTENU PAR UN ACCORD LIBREMENT CONSENTI',
      },
      {
        infraction: '**La demande de fonds sous contrainte**',
        legal: 'Art. 312-12-1 C.P. — définit et réprime la demande de fonds sous contrainte',
        materiel: 'UN COMPORTEMENT / UNE SOLLICITATION',
        moral:
          'CONSCIENCE DE L\'AUTEUR D\'AVOIR UN COMPORTEMENT MENAÇANT POUR OBTENIR LA REMISE DE FONDS, DE VALEURS OU D\'UN BIEN',
      },
      {
        infraction: '**L\'escroquerie**',
        legal: 'Art. 313-1 C.P. — définit et réprime l\'escroquerie',
        materiel: 'UN MOYEN DE TROMPERIE / UNE REMISE / AU PRÉJUDICE D\'UNE VICTIME',
        moral: 'CONSCIENCE DE L\'AUTEUR D\'UTILISER DES MOYENS FRAUDULEUX EN VUE D\'OBTENIR UNE REMISE DE LA VICTIME',
        priorite: 'freq',
      },
      {
        infraction: '**Les filouteries**',
        legal: 'Art. 313-5 C.P. — définit et réprime la filouterie',
        materiel: 'IMPOSSIBILITÉ ABSOLUE DE PAYER OU REFUS DE PAYER / UNE REMISE (4 cas)',
        moral: 'CONSCIENCE DE L\'AUTEUR DE SON IMPÉCUNIOSITÉ / VOLONTÉ DE L\'AUTEUR DE NE PAS PAYER',
      },
      {
        infraction: '**L\'abus de confiance**',
        legal: 'Art. 314-1 C.P. — définit et réprime l\'abus de confiance',
        materiel:
          'UNE REMISE PRÉALABLE DE LA CHOSE / UN ACTE MATÉRIEL DE DÉTOURNEMENT / AU PRÉJUDICE D\'AUTRUI',
        moral: 'CONSCIENCE DE LA PRÉCARITÉ DE LA DÉTENTION ET DE L\'OBLIGATION COMBINÉE DE RESTITUTION',
        priorite: 'freq',
      },
    ],
  },
  {
    id: 'f02-recel',
    fascicule: 'F02',
    groupTitle: 'RECEL ET NON-JUSTIFICATION DE RESSOURCES',
    headerClass: 'bg-cyan-900/70 text-cyan-50',
    rows: [
      {
        infraction: '**Le recel**',
        legal: 'Art. 321-1 C.P. — définit et réprime le recel',
        materiel: 'UN ACTE MATÉRIEL / L\'OBJET DE L\'ACTE',
        moral: 'CONNAISSANCE DE L\'ORIGINE FRAUDULEUSE DE LA CHOSE',
      },
      {
        infraction: '**La non-justification de ressources**',
        legal: 'Art. 321-6 al. 1 C.P. — définit et réprime la non-justification de ressources',
        materiel:
          'ABSENCE DE JUSTIFICATION DE RESSOURCES OU DE L\'ORIGINE DES BIENS POSSÉDÉS / RELATIONS HABITUELLES DU MIS EN CAUSE',
        moral:
          'CONSCIENCE DE BÉNÉFICIER DU PRODUIT DE LA COMMISSION D\'INFRACTIONS / CONSCIENCE DE PROFITER DES RESSOURCES DE LA VICTIME',
      },
    ],
  },
  {
    id: 'f02-destruc',
    fascicule: 'F02',
    groupTitle: 'DESTRUCTIONS, DÉGRADATIONS ET DÉTÉRIORATIONS',
    headerClass: 'bg-indigo-900/70 text-indigo-50',
    rows: [
      {
        infraction: '**Destruction/dégradation/détérioration — dommage important**',
        legal: 'Art. 322-1 I C.P. — définit et réprime les atteintes sans danger pour les personnes entraînant un dommage important',
        materiel: 'UNE ATTEINTE MATÉRIELLE / SUR UN BIEN APPARTENANT A AUTRUI / ENTRAÎNANT UN DOMMAGE IMPORTANT',
        moral:
          'AGIR SCIEMMENT ET VOLONTAIREMENT SACHANT NE PAS ÊTRE PROPRIÉTAIRE DU BIEN ET N\'AVOIR AUCUN DROIT DE DISPOSITION',
      },
      {
        infraction: '**Destruction/dégradation/détérioration — dommage léger**',
        legal: 'Art. R. 635-1 C.P. — définit et réprime les atteintes sans danger pour les personnes entraînant un dommage léger',
        materiel: 'UNE ATTEINTE MATÉRIELLE / SUR UN BIEN APPARTENANT À AUTRUI / ENTRAÎNANT UN DOMMAGE LÉGER',
        moral: 'Dommage « volontaire » (intention coupable requise)',
      },
      {
        infraction: '**Tags**',
        legal: 'Art. 322-1 II C.P. — définit et réprime les « tags »',
        materiel: 'UNE ATTEINTE MATÉRIELLE PAR TRAÇAGE / SUR UN BIEN APPARTENANT À AUTRUI / ENTRAÎNANT UN DOMMAGE LÉGER',
        moral:
          'AGIR SCIEMMENT ET VOLONTAIREMENT SACHANT NE PAS ÊTRE PROPRIÉTAIRE DU BIEN ET N\'AVOIR AUCUN DROIT DE DISPOSITION',
      },
      {
        infraction: '**Destructions portant sur des biens culturels**',
        legal: 'Art. 322-3-1 C.P. — définit et réprime les atteintes portant sur des biens culturels publics ou classés',
        materiel: 'UNE ATTEINTE MATÉRIELLE / SUR UN BIEN CULTUREL PUBLIC OU CLASSÉ / ENTRAÎNANT UN DOMMAGE',
        moral: 'VOLONTÉ D\'OCCASIONNER UN DOMMAGE SUR UN BIEN EN SACHANT QU\'IL PRÉSENTE UN INTÉRÊT POUR LA COLLECTIVITÉ',
      },
      {
        infraction: '**Destructions dangereuses — intentionnelle**',
        legal: 'Art. 322-6 al. 1 C.P. — définit et réprime les atteintes volontaires et dangereuses pour les personnes',
        materiel:
          'UNE ATTEINTE MATÉRIELLE DE NATURE A CRÉER UN DANGER POUR LES PERSONNES / SUR UN BIEN APPARTENANT À AUTRUI / ENTRAÎNANT UN DOMMAGE',
        moral:
          'AGIR EN CONNAISSANT L\'EFFICACITÉ DU MOYEN MIS EN ŒUVRE, AINSI QUE LE DANGER REPRÉSENTE PAR CE MOYEN POUR LA SÉCURITÉ DES PERSONNES',
      },
      {
        infraction: '**Destructions dangereuses — non intentionnelle**',
        legal: 'Art. 322-5 al. 1 C.P. — définit et réprime les atteintes dangereuses pour les personnes commises par imprudence ou manquement',
        materiel:
          'UN MANQUEMENT A UNE OBLIGATION DE PRUDENCE OU DE SÉCURITÉ / UNE ATTEINTE MATÉRIELLE / SUR UN BIEN APPARTENANT A AUTRUI / ENTRAÎNANT UN DOMMAGE / UN LIEN DE CAUSALITÉ',
        moral:
          'AGIR EN MÉCONNAISSANT LES EXIGENCES LÉGALES OU RÉGLEMENTAIRES (al.1) / AGIR EN MÉCONNAISSANT VOLONTAIREMENT LES EXIGENCES LÉGALES OU RÉGLEMENTAIRES EN TOUTE CONNAISSANCE DES RISQUES ENCOURUS (al.2)',
      },
      {
        infraction: '**Diffusion de procédés pour fabriquer des engins**',
        legal: 'Art. 322-6-1 al. 1 C.P. — définit et réprime la diffusion de procédés permettant la fabrication d\'engins de destruction',
        materiel:
          'LES MOYENS DE DIFFUSION / LA DIFFUSION A L\'ÉGARD DE TOUT PUBLIC / LES PROCÉDÉS PERMETTANT LA FABRICATION D\'ENGINS DE DESTRUCTION',
        moral:
          'CONNAISSANCE DU RISQUE COURU EN DIFFUSANT DES MODES D\'EMPLOI DONT L\'UTILISATION S\'AVÈRE DANGEREUSE / DIFFUSER SCIEMMENT UN MODE D\'EMPLOI DESTINE A FABRIQUER UN ENGIN DE DESTRUCTION',
      },
      {
        infraction: '**Détention/transport de substances en vue de destructions**',
        legal: 'Art. 322-11-1 al. 1 C.P. — définit et réprime la détention ou le transport de substances incendiaires ou explosifs en vue d\'infractions au 322-6 ou d\'atteintes aux personnes',
        materiel: 'NATURE DES SUBSTANCES / PRÉPARATION CARACTÉRISÉE / ABSENCE D\'UTILISATION',
        moral:
          'CONSCIENCE DE DÉTENIR OU DE TRANSPORTER DES PRODUITS OU SUBSTANCES INCENDIAIRES OU EXPLOSIFS DANS LE BUT DE COMMETTRE UNE INFRACTION DANGEREUSE POUR LES PERSONNES',
      },
      {
        infraction: '**Détention/transport de substances sans motif légitime**',
        legal: 'Art. 322-11-1 al. 3 C.P. — définit et réprime la détention ou le transport sans motif légitime de substances ou produits incendiaires ou explosifs',
        materiel: 'LA POSSESSION SANS MOTIF LÉGITIME / NATURE DES SUBSTANCES / ABSENCE D\'UTILISATION',
        moral:
          'CONSCIENCE DE DÉTENIR OU DE TRANSPORTER DES SUBSTANCES OU PRODUITS EXPLOSIFS SANS MOTIF LÉGITIME (1°) / N\'AVOIR AUCUN MOTIF LÉGITIME ET NE PAS RESPECTER L\'ARRÊTÉ PRÉFECTORAL (2°)',
      },
      {
        infraction: '**Menaces de destruction sans condition**',
        legal: 'Art. 322-12 C.P. — définit et réprime les menaces d\'atteintes aux biens sans condition',
        materiel: 'LA FORME DE LA MENACE / L\'OBJET DE LA MENACE',
        moral: 'VOLONTÉ D\'ATTEINDRE MORALEMENT LA VICTIME',
      },
      {
        infraction: '**Menaces de destruction avec condition**',
        legal: 'Art. 322-13 al. 1 C.P. — définit et réprime les menaces d\'atteintes aux biens avec condition',
        materiel: 'LA FORME DE LA MENACE / L\'OBJET DE LA MENACE / LA CONDITION',
        moral: 'VOLONTÉ D\'ATTEINDRE MORALEMENT LA VICTIME',
      },
      {
        infraction: '**Fausses alertes**',
        legal: 'Art. 322-14 C.P. — définit et réprime les fausses alertes',
        materiel: 'LA COMMUNICATION OU LA DIVULGATION / UNE FAUSSE INFORMATION',
        moral:
          'CONNAISSANCE DE LA FAUSSETÉ DE L\'INFORMATION / VOLONTÉ DE FAIRE CROIRE A AUTRUI SOIT L\'EXISTENCE OU LA SURVENUE D\'UNE DESTRUCTION OU D\'UN SINISTRE',
      },
    ],
  },
  {
    id: 'f02-stad',
    fascicule: 'F02',
    groupTitle: 'ATTEINTES AUX STAD',
    headerClass: 'bg-violet-900/70 text-violet-50',
    rows: [
      {
        infraction: '**Accès ou maintien frauduleux dans un STAD**',
        legal: 'Art. 323-1 C.P. — définit et réprime l\'accès ou le maintien frauduleux dans un STAD',
        materiel: 'UN SYSTÈME DE TRAITEMENT AUTOMATISÉ DE DONNÉES / UN ACCÈS OU UN MAINTIEN',
        moral: 'CONSCIENCE DE L\'AUTEUR D\'ACCÉDER OU DE SE MAINTENIR SANS DROIT DANS UN SYSTÈME AUTOMATISÉ DE DONNÉES',
      },
      {
        infraction: '**Entrave au fonctionnement d\'un STAD**',
        legal: 'Art. 323-2 C.P. — définit et réprime le fait d\'entraver ou de fausser le fonctionnement d\'un STAD',
        materiel: 'UNE ENTRAVE / L\'ACTION DE FAUSSER',
        moral:
          'CONSCIENCE DE L\'AUTEUR DE L\'ENTRAVE APPORTÉE AU SYSTÈME OU DU FAIT QU\'IL FAUSSE LE FONCTIONNEMENT DU SYSTÈME',
      },
      {
        infraction: '**Introduction/suppression/modification frauduleuse de données**',
        legal: 'Art. 323-3 C.P. — définit et réprime l\'introduction, l\'extraction, la détention, la reproduction, la transmission, la suppression ou la modification frauduleuses de données',
        materiel: 'DES ACTES PORTANT SUR LES DONNÉES',
        moral:
          'CONSCIENCE DE L\'AUTEUR D\'INTRODUIRE, DÉTENIR, REPRODUIRE, EXTRAIRE ET TRANSMETTRE, SUPPRIMER OU MODIFIER FRAUDULEUSEMENT DES DONNÉES',
      },
      {
        infraction: '**Importation/détention/offre/cession/mise à disposition de données adaptées**',
        legal: 'Art. 323-3-1 C.P. — définit et réprime la mise à disposition de moyens adaptés pour commettre les infractions aux art. 323-1 à 323-3',
        materiel: 'UNE FOURNITURE DE MOYEN / UNE ÉVENTUELLE COMMISSION D\'INFRACTION / UNE ABSENCE DE MOTIF LÉGITIME',
        moral: 'Simple détention réprimée même sans intention directe de nuire',
      },
      {
        infraction: '**Association de malfaiteurs en informatique**',
        legal: 'Art. 323-4 C.P. — définit et réprime l\'association de malfaiteurs en informatique',
        materiel: 'UN GROUPEMENT OU UNE ENTENTE / LA PRÉPARATION A LA COMMISSION D\'INFRACTIONS',
        moral: 'CONSCIENCE DE L\'AUTEUR DE L\'ACTIVITÉ DU GROUPEMENT ET DE SON OBJET',
      },
    ],
  },
  {
    id: 'f02-contrefacon',
    fascicule: 'F02',
    groupTitle: 'CONTREFAÇONS ET FALSIFICATIONS',
    headerClass: 'bg-teal-900/70 text-teal-50',
    rows: [
      {
        infraction: '**Contrefaçons et falsifications de chèques ou autre instrument de paiement**',
        legal: 'Art. L. 163-3 C.M.F. — incrimine les agissements concernant les chèques et instruments au sens de l\'art. L. 133-4 C.M.F.',
        materiel: 'UN MOYEN DE PAIEMENT / UN COMPORTEMENT RÉPRÉHENSIBLE (contrefaçon ou falsification / usage / acceptation)',
        moral:
          'AGIR SCIEMMENT ET VOLONTAIREMENT SACHANT QUE SON INTERVENTION PERMET DE CONTREFAIRE, FALSIFIER, USER OU ACCEPTER UN MOYEN DE PAIEMENT CONTREFAISANT',
      },
    ],
  },
  ...recapSectionsF03F07,
];

const FILTER_TO_FASC: Record<
  Exclude<RecapFasciculeFilter, 'all' | 'f01p1' | 'f01p2'>,
  RecapFasciculeId
> = {
  f02: 'F02',
  f03: 'F03',
  f04: 'F04',
  f05: 'F05',
  f06: 'F06',
  f07: 'F07',
};

export function filterRecapSections(filter: RecapFasciculeFilter): RecapSection[] {
  if (filter === 'all') return recapSections;
  if (filter === 'f01p1') {
    return recapSections.filter((s) => s.fascicule === 'F01' && s.fasciculePart === 'Partie 1');
  }
  if (filter === 'f01p2') {
    return recapSections.filter((s) => s.fascicule === 'F01' && s.fasciculePart === 'Partie 2');
  }
  const tag = FILTER_TO_FASC[filter as keyof typeof FILTER_TO_FASC];
  return recapSections.filter((s) => s.fascicule === tag);
}

/** Filtre fascicule + toutes les lignes, triées par priorité examen (non renseignée = secours). */
export function filterRecapSectionsPrioritaires(filter: RecapFasciculeFilter): RecapSection[] {
  const base = filterRecapSections(filter);
  return base.map((s) => ({
    ...s,
    rows: [...s.rows]
      .map((r) => ({ ...r, priorite: r.priorite ?? 'secours' }))
      .sort((a, b) => PRIORITE_ORDER[a.priorite!] - PRIORITE_ORDER[b.priorite!]),
  }));
}

/** Ne garde que les lignes d’une strate de priorité (référentiel / récap). */
export function filterRecapRowsByPriorite(
  sections: RecapSection[],
  tier: RecapPriorite | 'all',
): RecapSection[] {
  if (tier === 'all') return sections;
  return sections
    .map((s) => ({
      ...s,
      rows: s.rows.filter((r) => (r.priorite ?? 'secours') === tier),
    }))
    .filter((s) => s.rows.length > 0);
}

export type InfractionCatalogItem = {
  id: string;
  fascicule: RecapFasciculeId;
  fasciculePart?: string;
  groupTitle: string;
  infraction: string;
  legal: string;
  materiel: string;
  moral: string;
  priorite?: RecapPriorite;
  noteExamen?: string;
  flashcardsCat?: 'atteintes-aux-personnes' | 'atteintes-aux-biens';
  /** Renseigné côté UI via correspondance flashcards (OUI / NON) */
  tentative?: string;
  complicite?: string;
  /** Données étendues (fascicule officiel .txt / JSON d’audit) */
  accrocheFascicule?: string;
  circonstancesAggravantesComplet?: string;
  circonstancesAucune?: boolean;
  repressionTableau?: { qualification: string; article: string; circonstances: string; peines: string }[];
  repressionImmunite?: string | null;
  repressionNota?: string | null;
  piegeExamenOfficiel?: string | null;
  maj2025?: boolean;
  badgeMaj?: string | null;
};

/** Lien « Voir le récap » depuis une ligne du référentiel. */
export function infractionToRecapFilter(item: InfractionCatalogItem): Exclude<RecapFasciculeFilter, 'all'> {
  if (item.fascicule === 'F01') {
    return item.fasciculePart === 'Partie 1' ? 'f01p1' : 'f01p2';
  }
  const e = Object.entries(FILTER_TO_FASC).find(([, v]) => v === item.fascicule);
  return (e?.[0] ?? 'f02') as Exclude<RecapFasciculeFilter, 'all'>;
}

/** @deprecated Utiliser infractionToRecapFilter pour F01 P1/P2. */
export function fasciculeToRecapFilter(f: RecapFasciculeId): Exclude<RecapFasciculeFilter, 'all'> {
  if (f === 'F01') return 'f01p1';
  const e = Object.entries(FILTER_TO_FASC).find(([, v]) => v === f);
  return (e?.[0] ?? 'f02') as Exclude<RecapFasciculeFilter, 'all'>;
}

/** Liste plate pour la page Infractions — source : fascicules officiels (JSON d’audit). */
export function getInfractionsCatalog(): InfractionCatalogItem[] {
  return getInfractionsCatalogFromOfficial();
}

