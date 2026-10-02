import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        hostname: "science.nasa.gov",
        protocol: "https",
      },
      {
        hostname: "assets.science.nasa.gov",
        protocol: "https",
      },
      {
        hostname: "epic.gsfc.nasa.gov",
        protocol: "https",
      },
    ],
  },
  allowedDevOrigins: ["quality-national-roughy.ngrok-free.app"],
};

export default nextConfig;
