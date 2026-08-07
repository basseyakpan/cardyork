import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/sell-gift-cards",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/gift-card-brands",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/gift-cards-brands",
        destination: "/blog",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
