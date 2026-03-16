import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { Pool } = pg;

const prismaClientSingleton = () => {
    const connectionString = `${process.env.DATABASE_URL}`;

    // Log connection details (sanitized)
    if (!process.env.DATABASE_URL) {
        console.error("DATABASE_URL is missing!");
    } else {
        const urlObj = new URL(connectionString);
        console.log(`Prisma connecting to host: ${urlObj.host} (Port: ${urlObj.port})`);
    }

    const pool = new Pool({ connectionString });
    // Cast pool to any if types mismatch, but PrismaPg should accept pg.Pool
    const adapter = new PrismaPg(pool as any);

    return new PrismaClient({
        adapter,
        log: ["query"],
    });
};

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export { prisma };

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
