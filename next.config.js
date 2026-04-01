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
    ];
  },
};

module.exports = nextConfig;
