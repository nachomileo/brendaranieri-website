import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    localPatterns: [{ pathname: "/images/**" }],
    qualities: [75, 82, 85, 88, 90, 92],
  },
};

export default nextConfig;
