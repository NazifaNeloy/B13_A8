import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Force Next.js to package the SQLite database file in the serverless bundle
  outputFileTracingIncludes: {
    "/api/**/*": ["./prisma/dev.db"],
  },
};

export default nextConfig;
