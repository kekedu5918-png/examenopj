const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  experimental: {
    esmExternals: 'loose',
  },
  async headers() {
    const security = [
      { key: 'X-DNS-Prefetch-Control', value: 'on' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
      },
    ];
    if (process.env.NODE_ENV === 'production') {
      security.splice(1, 0, {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
      });
    }
    return [
      { source: '/:path*', headers: security },
      {
        source: '/cours-texte/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      // Ne pas indexer les déploiements *.vercel.app et autres hôtes non canoniques
      {
        source: '/:path*',
        has: [{ type: 'host', value: '(?!examenopj\\.fr).*' }],
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/cours-texte/:path*',
          destination: '/404',
        },
      ],
    };
  },
  async redirects() {
    return [
      { source: '/signup', destination: '/inscription', permanent: true },
      { source: '/enquetes', destination: '/cours/enquetes', permanent: true },
      { source: '/fascicules', destination: '/programme', permanent: true },
      { source: '/fascicules/:id', destination: '/cours/modules/:id', permanent: true },
      { source: '/entrainement/quiz', destination: '/quiz', permanent: false },
      { source: '/entrainement/flashcards', destination: '/flashcards', permanent: false },
      { source: '/recapitulatif', destination: '/entrainement/recapitulatif', permanent: true },
      { source: '/about', destination: '/a-propos', permanent: true },
      { source: '/about-us', destination: '/a-propos', permanent: true },
      { source: '/guide', destination: '/guide-revision-opj', permanent: true },
      { source: '/methode', destination: '/guide-revision-opj', permanent: true },
      // Domaine canonique : tout le trafic Vercel / www → examenopj.fr
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.examenopj.fr' }],
        destination: 'https://examenopj.fr/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'examenopj.vercel.app' }],
        destination: 'https://examenopj.fr/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
