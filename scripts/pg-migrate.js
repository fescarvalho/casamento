
const pg = require('pg');
const { Pool } = pg;

async function main() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    try {
        console.log('Connecting to DB with PG pool...');
        await pool.query('ALTER TABLE "RSVP" ADD COLUMN IF NOT EXISTS "nomesAcompanhantes" TEXT;');
        await pool.query('ALTER TABLE "RSVP" ADD COLUMN IF NOT EXISTS "telefone" TEXT;');
        console.log('SQL Migration completed.');
    } catch (e) {
        console.error('SQL Migration failed:', e);
    } finally {
        await pool.end();
    }
}

main();
