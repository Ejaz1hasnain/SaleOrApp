import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'store-olfy7reo.saleor.cloud',
        port: '',
        pathname: '/**', // This allows all paths under the domain
      },
    ],
  },
};

export default nextConfig;
