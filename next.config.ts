import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        hostname: "apod.nasa.gov",
        protocol: "https",
      }
    ]
  }
};

export default nextConfig;
