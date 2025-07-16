/** @type {import('next').NextConfig} */
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Forwarded-Proto', value: 'chaellimi.jamkris.kro.kr' },
        ],
      },
    ];
  },
  serverExternalPackages: ['sequelize', 'mysql2'],
  images: {
    domains: [
      'chaellimi.jamkris.kro.kr',
      'www.chaellimi.jamkris.kro.kr',
      'localhost',
      '10.150.150.131',
      '172.30.1.59',
    ],
    unoptimized: true,
  },
  reactStrictMode: true,
  output: 'standalone',
};

export default nextConfig;
