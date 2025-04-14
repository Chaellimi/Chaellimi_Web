import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [{ key: 'X-Forwarded-Proto', value: 'https' }],
      },
    ];
  },
};

export default nextConfig;
