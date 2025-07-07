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
      'www.google.com',
      'img.freepik.com',
      'i.pinimg.com',
      'lh3.googleusercontent.com',
      'chaellimi.jamkris.kro.kr',
      'www.chaellimi.jamkris.kro.kr',
      'localhost',
      '10.150.2.54',
      '10.150.149.172',
      '172.30.1.59',
      'img1.kakaocdn.net',
      't1.kakaocdn.net',
    ],
    unoptimized: true,
  },
  reactStrictMode: true,
  output: 'standalone',
};

export default nextConfig;
