import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaPostgresAdapter } from "@prisma/adapter-ppg";
import "server-only";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is not set");

const adapter = new PrismaPostgresAdapter({
  connectionString: databaseUrl,
});

export const prisma = new PrismaClient({ adapter }).$extends(withAccelerate());
