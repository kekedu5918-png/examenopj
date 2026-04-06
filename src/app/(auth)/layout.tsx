import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }: PropsWithChildren) {
  return children;
}
