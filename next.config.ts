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
    domains: ['www.google.com', 'img.freepik.com'],
  },
};

export default nextConfig;
