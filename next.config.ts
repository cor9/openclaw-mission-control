import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverExternalPackages: [],
  turbopack: {
    root: "/Users/coreyralston/.gemini/antigravity/scratch/openclaw-mission-control",
  },
  /* config options here */
};

export default nextConfig;
