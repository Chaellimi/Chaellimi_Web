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
};

export default nextConfig;
