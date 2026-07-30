import type { NextConfig } from "next";

// added this for docker setup
const backendUrl = process.env.BACKEND_URL || "http://localhost:4000";

const nextConfig: NextConfig = {
  /* config options here */
    async rewrites() {
    return [
      {
        // path* to use all routes in express backend
        source: '/tasks/:path*',
        destination: `${backendUrl}/tasks/:path*`,
      },
    ];
  },
};

export default nextConfig;