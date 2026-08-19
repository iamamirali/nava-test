import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: { serverActions: { allowedOrigins: ['nextjs.cmtcode.ir'] } },
};

export default nextConfig;
