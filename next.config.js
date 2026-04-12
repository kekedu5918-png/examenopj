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
    const cspReportOnly = [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://vitals.vercel-insights.com https://*.i.posthog.com https://eu.posthog.com https://us.posthog.com https://api.stripe.com",
      "frame-src https://js.stripe.com https://hooks.stripe.com",
    ].join('; ');

    const security = [
      { key: 'X-DNS-Prefetch-Control', value: 'on' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
      },
      // Phase 1 : observation seulement (pas de blocage). Affiner selon la console navigateur.
      { key: 'Content-Security-Policy-Report-Only', value: cspReportOnly },
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
