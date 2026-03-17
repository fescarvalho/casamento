
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL
        }
    }
});

async function main() {
    try {
        console.log('Running SQL migration...');
        await prisma.$executeRawUnsafe(`ALTER TABLE "RSVP" ADD COLUMN IF NOT EXISTS "nomesAcompanhantes" TEXT;`);
        await prisma.$executeRawUnsafe(`ALTER TABLE "RSVP" ADD COLUMN IF NOT EXISTS "telefone" TEXT;`);
        console.log('Migration completed successfully.');
    } catch (e) {
        console.error('Migration failed:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
