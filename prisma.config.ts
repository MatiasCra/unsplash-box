// Prisma configuration for a local SQLite database.
// No dotenv import is required when using a static SQLite file.

import { defineConfig } from "prisma/config";
import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const postgresUrl = process.env.DATABASE_URL;
const postgresDirectUrl = process.env.PRISMA_DATABASE_URL;

if (!postgresUrl || !postgresDirectUrl) {
  throw new Error("DATABASE_URL and PRISMA_DATABASE_URL must be set");
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: postgresUrl,
    shadowDatabaseUrl: postgresDirectUrl,
  },
});
