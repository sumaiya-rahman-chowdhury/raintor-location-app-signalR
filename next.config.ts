import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/Hub/:path*",
        destination: "https://tech-test.raintor.com/Hub/:path*",
      },
    ];
  },
};

export default nextConfig;
