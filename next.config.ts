import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',

  reactCompiler: false,

  experimental: {},

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.codevertexitsolutions.com' },
    ],
  },

  serverExternalPackages: ['pg', 'pg-pool', '@prisma/adapter-pg', '@prisma/client'],
};

export default nextConfig;
