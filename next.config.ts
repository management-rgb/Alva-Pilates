import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hidden pages now live under /staff (login required). Old URLs forward there.
  async redirects() {
    return [
      { source: "/front-desk", destination: "/staff/front-desk", permanent: false },
      {
        source: "/marketing/summer-reset-capture",
        destination: "/staff/marketing/summer-reset-capture",
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
      },
    ],
  },
};

export default nextConfig;
