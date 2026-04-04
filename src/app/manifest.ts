import type { MetadataRoute } from 'next';

import { APP_NAME, APP_TAGLINE } from '@/constants/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: APP_NAME,
    short_name: APP_NAME,
    description: APP_TAGLINE,
    start_url: '/',
    display: 'standalone',
    background_color: '#020617',
    theme_color: '#020617',
    lang: 'fr',
    orientation: 'portrait-primary',
    categories: ['education', 'books'],
  };
}
