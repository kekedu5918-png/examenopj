import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';

import { pathWithSearchParams } from '@/utils/redirect-with-search-params';

export const metadata: Metadata = {
  title: 'Connexion — Examen OPJ',
  robots: { index: false, follow: true },
};

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

/** Ancienne URL française : redirection canonique 308 vers `/login` (query préservée). */
export default function ConnexionAliasPage({ searchParams = {} }: PageProps) {
  permanentRedirect(pathWithSearchParams('/login', searchParams));
}
