/** F01 — Partie 1 : atteintes aux personnes (synthèse : vie, violences, agressions sexuelles, menaces, atteintes routières, images de violence). */
export const recapSectionF01P1 = {
  id: 'f01-p1',
  fascicule: 'F01',
  fasciculePart: 'Partie 1',
  groupTitle: 'F01 — Atteintes aux personnes (partie 1)',
  headerClass: 'bg-rose-950/80 text-rose-100',
  rows: [
    {
      infraction: '**Le meurtre**',
      legal:
        'Art. 221-1 C.P. — « Le fait de donner volontairement la mort à autrui constitue un meurtre » (définition ; répression : 30 ans de réclusion criminelle)',
      materiel:
        '**ACTE POSITIF** / **DONNER VOLONTAIREMENT LA MORT À AUTRUI** / **DÉCÈS** / **LIEN DE CAUSALITÉ**',
      moral: '**INTENTION HOMICIDE (ANIMUS NECANDI)** / **APPRÉCIÉE AU MOMENT DE L\'ACTE**',
      priorite: 'core',
      noteExamen: 'Socle programme — citez la définition au mot près.',
    },
    {
      infraction:
        '**Le meurtre avec préméditation (qualification usuelle « assassinat », art. 221-3 C.P.)**',
      legal:
        'Art. 221-3 C.P. — qualification du meurtre aggravé par la préméditation (art. 132-72 C.P.), distinct du meurtre simple',
      materiel: '**MÊMES ÉLÉMENTS QUE LE MEURTRE** / **PRÉMÉDITATION**',
      moral: '**INTENTION HOMICIDE** / **PROJET RÉFLÉCHI — INTERVALLE ENTRE RÉSOLUTION ET EXÉCUTION**',
      priorite: 'core',
      noteExamen: 'Qualification aggravée du meurtre : citez la préméditation et le lien avec le meurtre simple.',
    },
    {
      infraction: '**L\'empoisonnement**',
      legal: 'Art. 221-5 C.P.',
      materiel:
        '**ADMINISTRATION DE SUBSTANCES DE NATURE À ENTRAÎNER LA MORT** / **SANS EXIGENCE DE DÉCÈS (INFRACTION FORMELLE)**',
      moral:
        '**CONNAISSANCE DE LA NATURE MORTELLE DE LA SUBSTANCE** / **ET INTENTION DE DONNER LA MORT — LES DEUX SONT REQUISES (Cass. crim. 18 juin 2003 : la seule connaissance du caractère mortel ne suffit pas)**',
      priorite: 'secours',
    },
    {
      infraction: '**L\'homicide involontaire**',
      legal: 'Art. 221-6 C.P.',
      materiel:
        '**FAUTE D\'IMPRUDENCE, NÉGLIGENCE OU MANQUEMENT** / **OU VIOLATION MANIFESTEMENT DÉLIBÉRÉE (AL. 2)** / **MORT** / **CAUSALITÉ CERTAINE** / **DISTINCTION :** *homicide routier* (221-18, loi n° 2025-622) = conducteur VTM + au moins une circonstance de violence routière — infraction distincte',
      moral: '**ABSENCE D\'INTENTION DE DONNER LA MORT** / **IMPRUDENCE OU NÉGLIGENCE**',
    },
    {
      infraction: '**Les violences ayant entraîné la mort sans intention de la donner**',
      legal: 'Art. 222-7 C.P.',
      materiel:
        '**VIOLENCES PHYSIQUES OU PSYCHIQUES** (ex. choc émotif grave sans contact : Cass. crim. 18 mars 2008) / **MORT** / **LIEN DE CAUSALITÉ**',
      moral: '**VOLONTÉ DE VIOLENCES** / **ABSENCE D\'INTENTION DE DONNER LA MORT**',
      priorite: 'freq',
    },
    {
      infraction: '**Les violences ayant entraîné une mutilation ou infirmité permanente**',
      legal: 'Art. 222-9 C.P.',
      materiel: '**VIOLENCES PHYSIQUES OU PSYCHIQUES** / **MUTILATION OU INFIRMITÉ PERMANENTE**',
      moral: '**VOLONTÉ DE COMMETTRE DES VIOLENCES**',
      priorite: 'freq',
    },
    {
      infraction: '**Les violences ayant entraîné une ITT supérieure à 8 jours**',
      legal: 'Art. 222-11 C.P.',
      materiel: '**VIOLENCES PHYSIQUES OU PSYCHIQUES** / **ITT > 8 JOURS**',
      moral: '**VOLONTÉ DE COMMETTRE DES VIOLENCES**',
      priorite: 'core',
      noteExamen: 'Très fréquent — maîtrisez le seuil ITT et le quantum.',
    },
    {
      infraction: '**Les violences ayant entraîné une ITT ≤ 8 jours ou sans ITT**',
      legal: 'Art. 222-13 C.P. / Art. R.625-1 C.P.',
      materiel: '**VIOLENCES PHYSIQUES OU PSYCHIQUES** / **ITT ≤ 8 JOURS OU AUCUNE ITT**',
      moral: '**VOLONTÉ DE COMMETTRE DES VIOLENCES**',
      priorite: 'freq',
    },
    {
      infraction: '**Les violences habituelles sur conjoint ou concubin**',
      legal: 'Art. 222-14-3 C.P.',
      materiel: '**RÉPÉTITION DES VIOLENCES** / **CONJOINT, CONCUBIN OU PARTENAIRE DE PACS**',
      moral: '**VOLONTÉ DE VIOLENCES RÉPÉTÉES**',
      priorite: 'freq',
      noteExamen: 'Rupture conventionnelle ou PACS : attention aux qualifications voisines.',
    },
    {
      infraction: '**L\'administration de substances nuisibles**',
      legal: 'Art. 222-15 C.P.',
      materiel:
        '**SUBSTANCES NUISIBLES ATTEIGNANT INTÉGRITÉ PHYSIQUE OU PSYCHIQUE** / **PEINE SELON RÉSULTAT**',
      moral: '**CONNAISSANCE DU CARACTÈRE NUISIBLE** / **VOLONTÉ D\'ADMINISTRER**',
      priorite: 'secours',
    },
    {
      infraction: '**Le viol**',
      legal: 'Art. 222-23 C.P. (définition) — Art. 222-23-1 C.P. (répression : 15 ans)',
      materiel:
        '**PÉNÉTRATION SEXUELLE OU ACTE BUCCO-GÉNITAL** / **ABSENCE DE CONSENTEMENT CARACTÉRISÉE PAR VIOLENCE, CONTRAINTE, MENACE OU SURPRISE** / **SURPRISE** (ex. : hypnose, ivresse de la victime, sommeil, état de sidération — Cass. crim. 11 sept. 2024)',
      moral: '**CONSCIENCE DE L\'ABSENCE DE CONSENTEMENT** / **VOLONTÉ D\'IMPOSER L\'ACTE**',
      priorite: 'core',
      noteExamen: 'Définition intégrale + absent consentement ; articulation mineurs : 222-23-1, 227-25, 227-27.',
    },
    {
      infraction: '**L\'agression sexuelle (autre que le viol)**',
      legal: 'Art. 222-22 C.P. — Art. 222-27 C.P.',
      materiel:
        '**ATTEINTE SEXUELLE (PHYSIQUE OU PSYCHIQUE)** / **VIOLENCE, CONTRAINTE, MENACE OU SURPRISE** / **SANS PÉNÉTRATION**',
      moral: '**CONSCIENCE DE L\'ABSENCE DE CONSENTEMENT** / **VOLONTÉ D\'ACTE À CARACTÈRE SEXUEL**',
      priorite: 'core',
      noteExamen: 'Pas de pénétration : VCMS ; attention aux incriminations spécialisées mineurs / vulnérabilité.',
    },
    {
      infraction: '**L\'exhibition sexuelle**',
      legal: 'Art. 222-32 C.P.',
      materiel:
        '**EXPOSITION DE PARTIES SEXUELLES** / **IMPOSÉE À LA VUE D\'AUTRUI** / **LIEU ACCESSIBLE AU PUBLIC**',
      moral: '**VOLONTÉ DE S\'EXHIBER** / **CONSCIENCE D\'ÊTRE VU OU SUSCEPTIBLE D\'ÊTRE VU**',
      priorite: 'freq',
    },
    {
      infraction: '**Le harcèlement sexuel**',
      legal: 'Art. 222-33 C.P.',
      materiel:
        '**PROPOS OU COMPORTEMENTS RÉPÉTITIFS À CONNOTATION SEXUELLE OU SEXISTE** / **OU PRESSION GRAVE** / **ATTEINTE À LA DIGNITÉ**',
      moral: '**CONSCIENCE DU CARACTÈRE DÉGRADANT, HUMILIANT OU OFFENSANT**',
      priorite: 'freq',
    },
    {
      infraction: '**Les menaces de commettre un crime ou un délit contre les personnes — sans condition**',
      legal: 'Art. 222-17 al. 1 C.P.',
      materiel: '**MENACE** / **MATÉRIALISÉE PAR ÉCRIT, IMAGE OU OBJET**',
      moral: '**VOLONTÉ D\'INTIMIDER**',
      priorite: 'freq',
    },
    {
      infraction: '**Les menaces de mort — sans condition**',
      legal: 'Art. 222-17 al. 2 C.P.',
      materiel: '**MENACE DE MORT** / **MATÉRIALISÉE**',
      moral: '**VOLONTÉ D\'INTIMIDER**',
      priorite: 'freq',
    },
    {
      infraction: '**Les menaces de crime ou délit contre les personnes — avec condition**',
      legal: 'Art. 222-18 al. 1 C.P.',
      materiel: '**MENACE** / **ACCOMPAGNÉE D\'UNE CONDITION**',
      moral: '**VOLONTÉ D\'OBTENIR QUELQUE CHOSE SOUS LA MENACE**',
      priorite: 'secours',
    },
    {
      infraction: '**Les menaces de mort — avec condition**',
      legal: 'Art. 222-18 al. 2 C.P.',
      materiel: '**MENACE DE MORT** / **CONDITION**',
      moral: '**VOLONTÉ D\'OBTENIR SOUS MENACE DE MORT**',
      priorite: 'secours',
    },
    {
      infraction: '**Les blessures involontaires — ITT > 3 mois**',
      legal: 'Art. 222-19 C.P.',
      materiel: '**FAUTE D\'IMPRUDENCE OU MANQUEMENT** / **ITT > 3 MOIS** / **CAUSALITÉ**',
      moral: '**ABSENCE D\'INTENTION DE BLESSER**',
      priorite: 'freq',
    },
    {
      infraction: '**Les blessures involontaires — ITT ≤ 3 mois**',
      legal: 'Art. R.625-2 C.P. / Art. 222-20 C.P.',
      materiel: '**FAUTE D\'IMPRUDENCE** / **ITT ≤ 3 MOIS** / **CAUSALITÉ**',
      moral: '**ABSENCE D\'INTENTION DE BLESSER**',
      priorite: 'freq',
    },
    {
      infraction: '**Les tortures et actes de barbarie**',
      legal: 'Art. 222-1 C.P.',
      materiel:
        '**ACTES DE TORTURE OU BARBARIE** — gravité exceptionnelle, volonté de nier la dignité humaine (C.A. Lyon 19/01/1996) / **SOUFFRANCE PHYSIQUE OU MORALE D\'INTENSITÉ INSUPPORTABLE** / **SUR PERSONNE VIVANTE**',
      moral:
        '**INTENTION COUPABLE** / **VOLONTÉ DE CAUSER UNE SOUFFRANCE EXCEPTIONNELLEMENT AIGÜE OU DE NIER LA DIGNITÉ HUMAINE**',
      priorite: 'core',
    },
    {
      infraction: '**Les violences habituelles sur mineur de 15 ans ou personne vulnérable**',
      legal: 'Art. 222-14 C.P.',
      materiel:
        '**VIOLENCES HABITUELLES (AU MOINS 2 FOIS)** / **MINEUR DE 15 ANS OU PERSONNE VULNÉRABLE** (vulnérabilité apparente ou connue)',
      moral: '**VOLONTÉ DE VIOLENCES RÉPÉTÉES** / **CONSCIENCE DE LA QUALITÉ DE MINEUR OU DE LA VULNÉRABILITÉ**',
      priorite: 'core',
    },
    {
      infraction:
        '**Les violences avec arme sur dépositaire d\'autorité publique, sapeur-pompier ou agent de transport public**',
      legal: 'Art. 222-14-4 C.P.',
      materiel:
        '**VIOLENCES AVEC USAGE OU MENACE D\'UNE ARME** / **VICTIME : DAP, SAPEUR-/MARIN-POMPIER OU AGENT RÉSEAU DE TRANSPORT DE VOYAGEURS** / **DANS L\'EXERCICE OU DU FAIT DES FONCTIONS** / **QUALITÉ APPARENTE OU CONNUE**',
      moral: '**VOLONTÉ DE VIOLENCES** / **CONNAISSANCE DE LA QUALITÉ DE LA VICTIME**',
      priorite: 'core',
    },
    {
      infraction: '**La participation à un groupement violent**',
      legal: 'Art. 222-14-2 C.P.',
      materiel:
        '**PARTICIPATION SCIEMMENT À UN GROUPEMENT (MÊME TEMPORAIRE)** / **EN VUE DE LA PRÉPARATION (FAITS MATÉRIELS) DE VIOLENCES CONTRE LES PERSONNES OU DÉGRADATIONS DE BIENS**',
      moral: '**PARTICIPATION VOLONTAIRE ET EN CONNAISSANCE DE CAUSE** / **CONSCIENCE DU BUT VIOLENT**',
      priorite: 'freq',
    },
    {
      infraction:
        '**Les violences sur forces de sécurité intérieure ou élus locaux (ITT ≤ 8 j ou sans ITT)**',
      legal: 'Art. 222-14-5 C.P.',
      materiel:
        '**GENDARMERIE, POLICE NATIONALE, PÉNITENTIAIRE, DOUANES OU ÉLU LOCAL** / **EXERCICE OU FAIT DES FONCTIONS OU DU MANDAT** / **QUALITÉ CONNUE OU APPARENTE** / **ITT ≤ 8 J OU SANS ITT**',
      moral: '**VOLONTÉ DE VIOLENCES** / **CONNAISSANCE DE LA QUALITÉ DE LA VICTIME**',
      priorite: 'freq',
    },
    {
      infraction: '**L\'embuscade**',
      legal: 'Art. 222-15-1 C.P.',
      materiel:
        '**ATTENDRE DANS UN LIEU DÉTERMINÉ** / **POUR COMETTRE VIOLENCES AVEC USAGE OU MENACE D\'UNE ARME** / **VICTIME D\'UN DES PERSONNELS VISÉS (DAP, GN, PN, PÉNITENTIAIRE, DOUANES, POMPIERS, PROFESSIONNEL DE SANTÉ…) DANS L\'EXERCICE OU DU FAIT DES FONCTIONS**',
      moral: '**VOLONTÉ DE S\'EMBUSQUER** / **INTENTION DE VIOLENCES AVEC ARME**',
      priorite: 'secours',
    },
    {
      infraction: '**Les appels et messages malveillants / agressions sonores (trouble de la tranquillité)**',
      legal: 'Art. 222-16 C.P.',
      materiel:
        '**APPELS TÉLÉPHONIQUES MALVEILLANTS RÉITÉRÉS, MESSAGES RÉITÉRÉS, AGRESSIONS SONORES** / **EN VUE DE TROUBLER LA TRANQUILLITÉ**',
      moral: '**CONSCIENCE D\'EXERCER UNE PRESSION** / **VOLONTÉ DE TROUBLER LA TRANQUILLITÉ**',
    },
    {
      infraction: '**L\'homicide routier**',
      legal: 'Art. 221-18 C.P. (loi n° 2025-622 du 09/07/2025)',
      materiel:
        '**CONDUCTEUR DE VTM** / **FAUTE + AU MOINS UN COMPORTEMENT DANGEREUX PRÉVU PAR LA LOI (éthanol, stupéfiants, excès vitesse ≥30 km/h, défaut de permis, fuite, téléphone tenu, refus d\'obtempérer, écran, etc.)** / **MORT** / **CAUSALITÉ** / **PAS D\'INTENTION DE DONNER LA MORT**',
      moral: '**ABSENCE D\'INTENTION HOMICIDE** / **COMMISSION D\'UNE FAUTE QUALIFIÉE AVEC COMPORTEMENT DANGEREUX**',
      priorite: 'core',
    },
    {
      infraction: '**Les blessures routières — ITT > 3 mois**',
      legal: 'Art. 221-19 C.P. (loi n° 2025-622)',
      materiel:
        '**CONDUCTEUR VTM** / **ITT > 3 MOIS** / **MÊMES COMPORTEMENTS DANGEREUX QUE L\'HOMICIDE ROUTIER** / **CAUSALITÉ**',
      moral: '**ABSENCE D\'INTENTION DE BLESSER** / **FAUTE QUALIFIÉE + CIRCONSTANCE AGGRAVANTE ROUTIÈRE**',
      priorite: 'freq',
    },
    {
      infraction: '**Les blessures routières — ITT ≤ 3 mois**',
      legal: 'Art. 221-20 C.P. (loi n° 2025-622)',
      materiel: '**CONDUCTEUR VTM** / **ITT ≤ 3 MOIS** / **COMPORTEMENT DANGEREUX CARACTÉRISÉ** / **CAUSALITÉ**',
      moral: '**ABSENCE D\'INTENTION DE BLESSER**',
    },
    {
      infraction:
        '**Les atteintes involontaires à l\'intégrité par conducteur de VTM — ITT ≤ 3 mois (sans violence routière)**',
      legal: 'Art. 222-19-1 C.P.',
      materiel:
        '**CONDUCTEUR VTM** / **ITT ≤ 3 MOIS** / **FAUTE D\'IMPRUDENCE OU MANQUEMENT** / **SANS LES CIRCONSTANCES DE « VIOLENCE ROUTIÈRE » DU 221-18/19/20** / **CAUSALITÉ**',
      moral: '**ABSENCE D\'INTENTION DE BLESSER**',
      priorite: 'freq',
    },
    {
      infraction: '**Le viol commis par un majeur sur un mineur de 15 ans**',
      legal: 'Art. 222-23-1 C.P.',
      materiel:
        '**PÉNÉTRATION OU ACTE BUCCO-GÉNITAL** / **MAJEUR SUR MINEUR DE 15 ANS** / **PAS BESOIN DE PROUVER VCMS** — exception : écart d\'âge inférieur à 5 ans (al. 2)',
      moral: '**CONNAISSANCE PAR L\'AUTEUR DE L\'ÂGE DE LA VICTIME (OU INEXCUSABLE IGNORANCE)**',
    },
    {
      infraction: '**Le viol incestueux**',
      legal: 'Art. 222-23-2 C.P.',
      materiel:
        '**PÉNÉTRATION OU ACTE BUCCO-GÉNITAL** / **ASCENDANT, FRÈRE/SŒUR, ONCLE/TANTE, NEVEU/NIÈCE OU CONJOINT (OU ÉQUIVALENT) D\'AUTORITÉ SUR LA VICTIME** / **MINEUR** / **VICTIME MINEURE : PAS DE PREUVE DE VCMS**',
      moral: '**CONNAISSANCE DU LIEN FAMILIAL**',
      priorite: 'core',
    },
    {
      infraction: '**Les agressions sexuelles sur personne vulnérable**',
      legal: 'Art. 222-29 C.P.',
      materiel:
        '**ATTEINTE SEXUELLE SANS PÉNÉTRATION** / **PAR VCMS** / **VICTIME VULNÉRABLE (ÂGE, MALADIE, INFIRMITÉ, DÉFICIENCE, GROSSESSE…)** — apparent ou connu',
      moral: '**CONSCIENCE DE LA VULNÉRABILITÉ** / **VOLONTÉ D\'ACTE À CARACTÈRE SEXUEL**',
      priorite: 'freq',
    },
    {
      infraction: '**L\'agression sexuelle commise par un majeur sur un mineur de 15 ans**',
      legal: 'Art. 222-29-2 C.P.',
      materiel:
        '**SANS PÉNÉTRATION** / **MAJEUR / MINEUR DE 15 ANS** / **PAS DE VCMS À PROUVER** — exception : écart d\'âge ≥ 5 ans requis',
      moral: '**CONNAISSANCE DE L\'ÂGE**',
    },
    {
      infraction: '**L\'agression sexuelle incestueuse**',
      legal: 'Art. 222-29-3 C.P.',
      materiel:
        '**ATTEINTE SANS PÉNÉTRATION** / **LIENS FAMILIAUX COMME AU 222-23-2** / **MINEUR** / **PAS DE VCMS À PROUVER POUR LE MINEUR**',
      moral: '**CONNAISSANCE DU LIEN FAMILIAL**',
      priorite: 'freq',
    },
    {
      infraction: '**L\'administration de substance pour viol ou agression sexuelle**',
      legal: 'Art. 222-30-1 C.P.',
      materiel:
        '**ADMINISTRATION À L\'INSU D\'UNE SUBSTANCE ALTÉRANT DISCERNEMENT OU CONTRÔLE** / **EN VUE D\'UN VIOL OU D\'UNE AGRESSION SEXUELLE**',
      moral: '**CONNAISSANCE DE LA NATURE DE LA SUBSTANCE** / **VOLONTÉ D\'ALTÉRER LE DISCERNEMENT EN VUE DE L\'INFRACTION SEXUELLE**',
      priorite: 'freq',
    },
    {
      infraction: '**L\'enregistrement d\'images de violences (happy slapping)**',
      legal: 'Art. 222-33-3 C.P.',
      materiel:
        '**ENREGISTREMENT SCIEMMENT** / **IMAGES DE COMMISSION D\'INFRACTIONS DE VIOLENCES OU D\'AGRESSIONS SEXUELLES**',
      moral: '**CONSCIENCE D\'ENREGISTRER DES ACTES DE VIOLENCE** / **VOLONTÉ DE PRODUIRE L\'ENREGISTREMENT**',
    },
    {
      infraction: '**La diffusion d\'images de violences**',
      legal: 'Art. 222-33-3 al. 2 C.P.',
      materiel: '**DIFFUSION PAR QUELQUE MOYEN** (internet, réseaux sociaux, MMS…)',
      moral: '**CONSCIENCE ET VOLONTÉ DE PORTER À LA CONNAISSANCE D\'AUTRUI**',
      priorite: 'secours',
    },
  ],
};
