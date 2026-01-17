import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    async rewrites() {
    return [
      {
        source: '/api',
        destination: 'http://localhost:4000/api',
      },
    ];
  },
};

export default nextConfig;
