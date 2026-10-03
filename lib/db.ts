import { Pool } from "pg";

const connectionString =
  process.env.DATABASE_URL ??
  process.env.POSTGRES_URL ??
  process.env.POSTGRES_PRISMA_URL ??
  process.env.POSTGRES_URL_NON_POOLING;

declare global {
  var speakupPool: Pool | undefined;
}

export const pool =
  global.speakupPool ??
  new Pool({
    connectionString,
    max: 3,
    ssl: connectionString
      ? (connectionString.includes("localhost") ? false : { rejectUnauthorized: false })
      : undefined,
  });

if (process.env.NODE_ENV !== "production") {
  global.speakupPool = pool;
}
