'use client';

import type { LucideIcon } from 'lucide-react';
import {
  ArrowBigUp,
  BarChart3,
  Briefcase,
  Building2,
  CircleDot,
  ClipboardList,
  FlaskConical,
  Globe2,
  Hand,
  Handshake,
  HeartHandshake,
  Home,
  IdCard,
  Landmark,
  LayoutGrid,
  MapPinned,
  Mic,
  PackageSearch,
  Puzzle,
  RefreshCw,
  Repeat,
  Scale,
  ScrollText,
  Search,
  Share2,
  Shield,
  Swords,
  Table2,
  Target,
  UserRoundCog,
  UsersRound,
  XCircle,
} from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  'cadres-enquete': Search,
  'controle-identite': IdCard,
  'garde-a-vue': Shield,
  perquisition: Home,
  'mandats-justice': ScrollText,
  audition: Mic,
  requisitions: ClipboardList,
  'controle-judiciaire-detention': Scale,
  nullites: XCircle,
  'scelles-saisies': LayoutGrid,
  'opj-apj-apja': Shield,
  'ministere-public': Landmark,
  'action-publique': Swords,
  'juridictions-jugement': Building2,
  'voies-recours': RefreshCw,
  'classification-infractions': BarChart3,
  'classification-tripartite': BarChart3,
  'elements-constitutifs': Puzzle,
  tentative: CircleDot,
  'circonstances-aggravantes': ArrowBigUp,
  'complicite-coaction': Handshake,
  'irresponsabilite-penale': Shield,
  'recursion-recidive': Repeat,
  'saisies-scelles': PackageSearch,
  interpellation: Hand,
  'victimes-droits': HeartHandshake,
  'commission-rogatoire': ScrollText,
  'extension-competence': Share2,
  'criminalite-organisee': UsersRound,
  'sanction-penale': Scale,
  'juge-instruction': UserRoundCog,
  'juge-libertes-detention': Shield,
  'chambre-instruction': Building2,
  'juridiction-application-peines': Briefcase,
  'enquete-deces-74': FlaskConical,
  'disparitions-inquietantes': MapPinned,
  'entraide-internationale': Globe2,
  'tentative-penale': Target,
};

export function FondamentauxFicheIcon({
  ficheId,
  className,
}: {
  ficheId: string;
  className?: string;
}) {
  const Icon = ICONS[ficheId] ?? Table2;
  return <Icon className={className} aria-hidden />;
}
