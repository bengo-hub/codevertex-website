import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

declare global {
  // eslint-disable-next-line no-var
  var _prisma: PrismaClient | undefined;
}

function createPrisma(): PrismaClient {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
  });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);
}

// Singleton — prevents multiple PrismaClient instances during HMR in dev
export const prisma: PrismaClient = global._prisma ?? createPrisma();
if (process.env.NODE_ENV !== 'production') global._prisma = prisma;
