'use client';

import type { LucideIcon } from 'lucide-react';
import {
  ArrowBigUp,
  BarChart3,
  Building2,
  CircleDot,
  ClipboardList,
  Handshake,
  Home,
  IdCard,
  Landmark,
  LayoutGrid,
  Mic,
  Puzzle,
  RefreshCw,
  Repeat,
  Scale,
  ScrollText,
  Search,
  Shield,
  Swords,
  Table2,
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
