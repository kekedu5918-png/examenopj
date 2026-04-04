import type { Domain } from '@/data/fascicules-types';

export type FasciculeHomeItem = { id: string; num: number; title: string };

export type FasciculeHomeGroup = {
  domain: Domain;
  label: string;
  items: FasciculeHomeItem[];
};
