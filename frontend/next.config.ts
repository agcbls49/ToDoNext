import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    async rewrites() {
    return [
      {
        source: '/todos',
        destination: 'http://localhost:4000/todos',
      },
    ];
  },
};

export default nextConfig;
