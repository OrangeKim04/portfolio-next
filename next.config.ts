import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  serverExternalPackages: ["@notionhq/client", "notion-to-md", "@libsql/client"],
};

export default nextConfig;
