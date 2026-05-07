import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.myanimelist.net',
        port: '',
        pathname: '/images/anime/**',
      },
      {
        protocol: 'https',
        hostname: 'eoexiosolkkesdwxljbv.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/images/**',
      },
    ],
  },
};

export default nextConfig;
