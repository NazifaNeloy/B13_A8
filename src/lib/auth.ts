import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { copyFileSync, existsSync } from "fs";
import { join } from "path";

// For Vercel Serverless environment where root filesystem is read-only
if (process.env.VERCEL) {
  const srcPath = join(process.cwd(), "prisma", "dev.db");
  const destPath = "/tmp/dev.db";

  // Copy pre-built SQLite file with all tables to the writable /tmp folder
  if (!existsSync(destPath) && existsSync(srcPath)) {
    try {
      copyFileSync(srcPath, destPath);
      console.log("Successfully copied pre-built dev.db to /tmp/dev.db");
    } catch (e) {
      console.error("Failed to copy dev.db to /tmp/dev.db", e);
    }
  }
  // Tell Prisma and BetterAuth to use the writable database
  process.env.DATABASE_URL = "file:/tmp/dev.db";
}

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  emailAndPassword: {
    enabled: true,
  },
});
