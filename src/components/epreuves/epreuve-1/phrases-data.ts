export type Epreuve1Phrase = {
  badge: string;
  badgeClassName: string;
  title: string;
  text: string;
  note?: string;
};

export const EPREUVE1_PHRASES: Epreuve1Phrase[] = [
  {
    badge: 'ÉLÉMENT LÉGAL',
    badgeClassName: 'bg-blue-500/15 text-blue-300',
    title: 'Infraction simple',
    text: '« Ces faits prévus par l\'article — du code pénal et réprimés par l\'article — du code pénal, constituent un(e) [qualification] qui est un [classification]. »',
  },
  {
    badge: 'ÉLÉMENT LÉGAL',
    badgeClassName: 'bg-blue-500/15 text-blue-300',
    title: 'Tentative',
    text: '« Ces faits prévus par les articles 121-5 et — du code pénal et réprimés par l\'article — du CP, constituent une tentative de [I°] qui est un crime. »',
    note: "⚠️ Penser à ajouter l'article qui réprime la tentative pour un délit",
  },
  {
    badge: 'TRANSITION',
    badgeClassName: 'bg-orange-500/15 text-orange-300',
    title: 'Vers les circonstances aggravantes',
    text: '« Toutefois, ce(tte) [I°] a été commis(e) dans des circonstances particulières. »',
  },
  {
    badge: 'C.A.',
    badgeClassName: 'bg-orange-500/15 text-orange-300',
    title: 'Circonstance aggravante — § 1 (matérialité)',
    text: "Démontrer la matérialité de la CA par les éléments du thème + préciser l'article de définition générale (132-71, 132-72...)",
  },
  {
    badge: 'C.A.',
    badgeClassName: 'bg-orange-500/15 text-orange-300',
    title: 'Circonstance aggravante — § 2 (légal)',
    text: '« Ces faits prévus par l\'article — et réprimés par l\'article —, constituent [I°] aggravée. (Si changement de classification, le préciser) »',
  },
  {
    badge: 'PARTICIPATION',
    badgeClassName: 'bg-violet-500/15 text-violet-300',
    title: 'Auteur / Coauteur',
    text: '« X ayant réalisé personnellement tous les éléments constitutifs de [I°] au sens de l\'article 121-4 du code pénal, est auteur / sont coauteurs de [I°]. »\n« Sa responsabilité est pleine et entière. »',
  },
  {
    badge: 'PARTICIPATION',
    badgeClassName: 'bg-violet-500/15 text-violet-300',
    title: 'Complice',
    text: `« Toutefois, X, Y et Z n'ont pas agi de la même façon dans la réalisation de [I°].
Le [I°] commis par X et Y constitue un fait principal punissable.
En [donnant des indications précises / fournissant des moyens / aidant ou assistant...], Z commet un acte matériel de complicité qui facilite la commission de l'infraction.
Z agit en connaissance de cause et montre sa volonté de s'associer à l'infraction.
Ces faits sont prévus à l'article 121-7 et — du CP, et réprimés par les articles 121-6 et — dernier alinéa du CP.
Z est complice par [méthode] d'un(e) [I°].
Sa responsabilité est pleine et entière. »`,
  },
  {
    badge: 'RESPONSABILITÉ',
    badgeClassName: 'bg-emerald-500/15 text-emerald-300',
    title: 'Responsabilité pleine',
    text: '« Sa responsabilité est pleine et entière. »',
  },
  {
    badge: 'RESPONSABILITÉ',
    badgeClassName: 'bg-emerald-500/15 text-emerald-300',
    title: 'Légitime défense (art. 122-5 CP)',
    text: `« Néanmoins, [éléments du thème montrant l'attaque sur X]. Il s'agit donc d'une attaque réelle, actuelle et injustifiée.
Pour [éléments du thème montrant la riposte]. Sa riposte est concomitante et nécessaire à l'agression et également proportionnée à la gravité de l'atteinte.
Dans ces conditions, prévues par l'article 122-5 du code pénal, le comportement de X est justifié par l'état de légitime défense. »`,
  },
  {
    badge: 'RESPONSABILITÉ',
    badgeClassName: 'bg-emerald-500/15 text-emerald-300',
    title: "Usage légitime de l'arme (L.435-1 CSI)",
    text: `« X (Gpx / Bier / BC...) est un membre des forces de l'ordre. Il est dans l'exercice de ses fonctions et porte sa tenue d'uniforme.
En [élément du thème], X porte atteinte à la vie ou à l'intégrité physique de Y. Il fait usage de son arme, moyen proportionné pour neutraliser Y. Il se trouve dans l'absolue nécessité d'utiliser une arme vue des menaces réelles d'atteintes à la vie ou à l'intégrité physique.
Ses conditions sont conformes aux préalables à l'usage de son arme : sommations préalables.
Le but de X est de mettre fin à [la menace]. En utilisant son arme, X se trouve dans la situation prévue par l'article L.435-1 du code de la sécurité intérieure.
Faisant usage de son arme conformément aux dispositions de l'article L.435-1 du CSI, X ne saurait être tenu pénalement responsable des violences commises sur la personne de Y. »`,
  },
  {
    badge: 'RESPONSABILITÉ',
    badgeClassName: 'bg-amber-500/15 text-amber-300',
    title: 'Excuse de minorité (art. 122-8 CP)',
    text: '« S\'agissant du nommé X âgé de Y ans, il pourra bénéficier (+ de 16 ans) / de l\'excuse de minorité (- de 16 ans) en application de la disposition de l\'article 122-8 du code pénal et de l\'ordonnance du 02 février 1945. »',
  },
  {
    badge: 'RESPONSABILITÉ',
    badgeClassName: 'bg-amber-500/15 text-amber-300',
    title: 'Immunité familiale',
    text: '« Or le lien de parenté entre l\'auteur de l\'infraction et la victime (père et fils par exemple) entraînera l\'application de l\'immunité familiale. »',
  },
  {
    badge: 'CONCLUSION',
    badgeClassName: 'bg-emerald-500/15 text-emerald-300',
    title: "Conclusion — Concours d'infractions",
    text: `« X pourrait être poursuivi comme :
      - auteur / coauteur / complice de l'infraction aggravée
    Y pourrait être poursuivi comme :
      - auteur / coauteur / complice de l'infraction
    Il y a concours d'infractions pour X au sens de l'article 132-2 du code pénal, ce qui entraîne l'application des articles 132-3 et 132-4 de ce même code. »`,
  },
];
