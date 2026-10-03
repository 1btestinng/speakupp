import { Pool } from "pg";

const connectionString =
  process.env.DATABASE_URL ??
  process.env.POSTGRES_URL ??
  process.env.POSTGRES_PRISMA_URL ??
  process.env.POSTGRES_URL_NON_POOLING;

if (!connectionString) {
  throw new Error(
    "Speak Up database is not configured. Set DATABASE_URL (or POSTGRES_URL) in the Vercel project environment variables."
  );
}

declare global {
  var speakupPool: Pool | undefined;
}

export const pool =
  global.speakupPool ??
  new Pool({
    connectionString,
    max: 3,
    ssl: connectionString.includes("localhost")
      ? false
      : { rejectUnauthorized: false },
  });

if (process.env.NODE_ENV !== "production") {
  global.speakupPool = pool;
}
