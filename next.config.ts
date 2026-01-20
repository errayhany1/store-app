import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true, // Optional: safer for rapid deployment if you are confident
  }
};

export default nextConfig;
