import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    async rewrites() {
    return [
      {
        // path* to use all routes in express backend
        source: '/todos/:path*',
        destination: 'http://localhost:4000/todos/:path*',
      },
    ];
  },
};

export default nextConfig;
