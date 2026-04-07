/**
 * Exemple de rapport de synthèse — extrait MOT POUR MOT depuis
 * `reference/audit/fascicules/F16.txt` (EXEMPLE pages 262–265, affaire PERPIGNAN 2020).
 * Les sauts de page du fascicule (« LE RAPPORT DE SYNTHÈSE Page 263 », répétition « EXEMPLE »)
 * ne figurent pas dans `lenquete` pour la lecture à l’écran ; le texte juridique est inchangé.
 */
export const RAPPORT_F16_SOURCE_FILE = 'reference/audit/fascicules/F16.txt';
export const RAPPORT_F16_SOURCE_LINES = '8441–8554';

/** Texte source avec artefacts de pagination fascicule (lecture critique). */
export const rapportF16SourceAvecPagination = `L’ENQUÊTE
LE RAPPORT DE SYNTHÈSE Page 263
EXEMPLE
L’enquête de voisinage`;

export const rapportPerpignanExemple = {
  entete: `RÉPUBLIQUE FRANÇAISE
---------
MINISTÈRE DE L’INTÉRIEUR
---------
DIRECTION GÉNÉRALE
DE LA POLICE NATIONALE
---------
DIRECTION DÉPARTEMENTALE
DE LA SÉCURITÉ PUBLIQUE DE
PERPIGNAN
PERPIGNAN, le 24 septembre 2020
Le brigadier de police Fabrice GARNIER
en fonction à l’unité de recherches judiciaires de
la sûreté départementale
de PERPIGNAN
à
Monsieur le procureur de la République
près le tribunal judiciaire
de PERPIGNAN
S/C de la voie hiérarchique`,

  objet: `O B J E T : Violences volontaires ayant entraîné une incapacité totale de travail
pendant plus de huit jours (en l’espèce quatorze jours), avec usage
d'une arme (Victime : M. David ESPINOS)`,

  affaire: `AFFAIRE : C/ Tony LOPEZ.`,

  references: `RÉFÉRENCES : Initiative du service.`,

  piecesJointes: `P. JOINTES : La procédure N°2020/2654 comprenant 35 procès-verbaux, et sa copie,
ainsi que cinq scellés.`,

  /** Formule d’introduction — obligatoire à l’examen (surligner en jaune). */
  introduction: `J'ai l'honneur de vous rendre compte des résultats de l'enquête diligentée en flagrant délit
avec l’assistance des fonctionnaires de police du service, et pour laquelle vous avez été
régulièrement informé.`,

  lesFaits: `LES FAITS
Le 22 septembre 2020 à 18H00, le service était informé d’échauffourées sur le parking du
C.H.U. de PERPIGNAN, impliquant une vingtaine de personnes issues de la communauté
des gens du voyage. Les protagonistes avaient quitté les lieux avant l’arrivée de la police.
Sur place, Mme Dolorès LOPEZ, 22 ans, indiquait aux effectifs intervenants, que ces
incidents faisaient suite à une bagarre survenue le jour même, à son domicile et que son
compagnon M. David ESPINOS, 24 ans, avait reçu deux coups de couteau au bras gauche
par M. Tony LOPEZ, frère de Mme Dolorès LOPEZ.
Vu la profondeur des entailles, la victime avait été immédiatement admise au bloc
opératoire du C.H.U.`,

  /** Suite de « L’ENQUÊTE » sans les lignes Page 263/264 ni les répétitions « EXEMPLE » du fascicule. */
  lenquete: `L’ENQUÊTE
L’enquête de voisinage, effectuée aux abords du parking des urgences de l’hôpital, s’avérait
négative.
Lors de son audition, Mme Dolorès LOPEZ, dénonçait son frère M. Tony LOPEZ, comme
étant l’auteur des coups de couteau. Elle expliquait qu’un repas s’était tenu le 22
septembre 2020, à son domicile 12 rue Georges SOREL à PERPIGNAN. Son compagnon
M. David ESPINOS et son frère s’étaient disputés à propos de la vente d’un véhicule. Une
bagarre générale avait alors éclaté et Tony LOPEZ avait porté deux coups de couteau à
David ESPINOS. Mme Dolorès LOPEZ avait décidé de conduire elle-même son compagnon
aux urgences du C.H.U. de PERPIGNAN. Il avait été immédiatement admis au bloc
opératoire.
L’interrogation du fichier TAJ, en présence de Mme Dolorès LOPEZ, permettait l’extraction
d’un cliché photographique du nommé Tony LOPEZ.
La consultation des différents fichiers de police concernant les sieurs Tony LOPEZ et David
ESPINOS, établissait que les intéressés étaient, tous deux, défavorablement connus des
services de police.
M. Tony LOPEZ était domicilié sur l’aire d’accueil pour gens du voyage, route de l’Herm à
FOIX (06). Il était propriétaire d’une caravane FENDT immatriculé EL-421-JK ainsi que d’un
fourgon MERCEDES Vito immatriculé DD-580-DF.
Les constatations effectuées au domicile de Dolorès LOPEZ, avec l’assistance du service
départemental de police technique et scientifique, ne permettaient pas de découvrir
d’indice exploitable.
Le médecin du C.H.U. de PERPIGNAN nous indiquait que David ESPINOS était sorti de la
salle d’opération le soir même, mais que son audition ne pourrait avoir lieu que le 23
septembre. Il nous remettait un certificat descriptif des blessures indiquant une incapacité
totale de travail de quatorze jours.
Le 23 septembre 2020 à 06H00, un transport sur l’aire d’accueil des gens du voyage, route
de l’Herm à FOIX (06), était organisé. La caravane FENDT immatriculée EL-421-JK faisait
l’objet d’une perquisition en présence de deux témoins. Le nommé Tony LOPEZ était
absent, son fourgon ne se trouvait pas sur les lieux.
À 10H00, David ESPINOS était auditionné à l’hôpital. Il ne souhaitait pas déposer plainte et
se refusait à toute déclaration sur les faits. Dans le même temps, le fourgon MERCEDES
appartenant à Tony LOPEZ était repéré sur le parking des urgences. L’intéressé était
interpellé et placé en garde à vue à compter de 11H30. Il présentait tous les signes
caractéristiques de l’ivresse. La notification des droits était donc différée.
À l’issue de son dégrisement, après s’être entretenu avec son avocat, Tony LOPEZ refusait
dans un premier temps de répondre aux questions.
Lors de la fouille de son véhicule Vito immatriculé DD-580-DF, un couteau « serpette »
(scellé N°3) présentant des traces brunâtres sur la lame était découvert sous le siège
conducteur.
Au cours d’une seconde audition, Tony LOPEZ reconnaissait avoir été présent au domicile
de sa sœur lors du déjeuner familial du 22 septembre 2020, auquel participait également
M. David ESPINOS. Il admettait avoir eu un différend avec la victime, concernant la vente
d’un véhicule. Il réfutait, cependant, toute implication dans les violences reprochées.
Lors de la confrontation avec sa sœur Dolorès, chacun des intéressés maintenait ses
déclarations.
Conformément à vos instructions, le 24 septembre 2020 à 11H30, la mesure de garde à
vue de Tony LOPEZ était prolongée.
À 13H30, le résultat des analyses effectuées sur du couteau confirmaient que les tâches
brunâtres présentes sur la lame étaient des traces de sang. L’A.D.N. extrait de ce matériel
biologique correspondait à celui de M. David ESPINOS.
Confronté à ces derniers éléments, Tony LOPEZ persistait dans ses dénégations.
Conformément à vos instructions, il était mis fin à la mesure de garde à vue de Tony
LOPEZ, ce jour à 15H00 afin qu’il vous soit présenté.`,

  /** Formule de conclusion — obligatoire (surligner en jaune). */
  conclusionTitreEtCorps: `CONCLUSION
Des éléments rassemblés au cours de cette enquête, il ressort que M. Tony LOPEZ pourrait
être poursuivi pour les faits de violences volontaires ayant entraîné une incapacité totale de
travail pendant plus de huit jours (en l’espèce quatorze jours), avec usage d'une arme,
faits prévus et réprimés par l'article 222-12 du code pénal.
Le Brigadier de Police`,

  /** État civil — obligatoire (surligner en jaune). */
  etatCivil: `ÉTAT CIVIL DU MIS EN CAUSE
 M. Tony LOPEZ, né le 07/04/2001 à PERPIGNAN (66),
sans profession,
demeurant route de l’Herm à FOIX (09).`,

  vuEtTransmis: `VU ET TRANSMIS
Le 24/09/2020`,

  /** Destinataires — obligatoire (surligner en jaune). */
  destinataires: `DESTINATAIRES :
 Deux exemplaires à M. le procureur de la République de PERPIGNAN ;
 Un exemplaire au S.R.P.J. de MONTPELLIER ;
 Un exemplaire pour les archives du service.`,
} as const;

export type RapportFormuleId = 'intro' | 'conclusion' | 'etatCivil' | 'destinataires';

export const RAPPORT_FORMULES_ANNOTATIONS: Record<
  RapportFormuleId,
  { titre: string; pourquoi: string }
> = {
  intro: {
    titre: 'Formule d’introduction',
    pourquoi:
      'Elle rattache l’enquête au cadre procédural (ici flagrant délit), mentionne l’assistance des policiers et l’information régulière du magistrat : attendu dans un compte rendu de synthèse.',
  },
  conclusion: {
    titre: 'Formule de conclusion',
    pourquoi:
      'Elle synthétise la qualification retenue, les circonstances (ITT, arme) et les articles du code pénal : c’est l’aboutissement juridique du rapport.',
  },
  etatCivil: {
    titre: 'État civil du mis en cause',
    pourquoi:
      'Identification complète du MEC : identité, date et lieu de naissance, profession, domicile — nécessaire au dossier et au parquet.',
  },
  destinataires: {
    titre: 'Destinataires',
    pourquoi:
      'Trace la diffusion du rapport (parquet, service compétent, archives) conformément aux usages de chaîne d’escorte et de conservation.',
  },
};
