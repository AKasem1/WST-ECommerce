import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kolshzin.com',
      },
      {
        protocol: 'https',
        hostname: '**', // Allow all HTTPS domains
      },
    ],
  },
};

export default nextConfig;
