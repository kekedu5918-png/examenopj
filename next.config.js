/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    esmExternals: 'loose',
  },
  async redirects() {
    return [
      { source: '/about', destination: '/', permanent: true },
      { source: '/about-us', destination: '/', permanent: true },
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

module.exports = nextConfig;
