import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_N8N_ENDPOINT: process.env.NEXT_PUBLIC_N8N_ENDPOINT,
  },
};

export default nextConfig;
