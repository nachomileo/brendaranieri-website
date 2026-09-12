import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    localPatterns: [{ pathname: "/images/**", search: "" }],
    deviceSizes: [640, 828, 1080, 1440, 1920],
    imageSizes: [64, 128, 256, 384],
    qualities: [75, 85],
    formats: ["image/webp"],
    minimumCacheTTL: 2678400,
  },
};

export default nextConfig;
