import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "miro.medium.com",
     },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
     },
    ],
  }
};

export default nextConfig;
