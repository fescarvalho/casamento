
const pg = require('pg');
const { Pool } = pg;
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

async function main() {
    const client = await pool.connect();
    try {
        console.log('Adding columns to Guest table...');
        await client.query('ALTER TABLE "Guest" ADD COLUMN IF NOT EXISTS "group" TEXT;');
        await client.query('ALTER TABLE "Guest" ADD COLUMN IF NOT EXISTS "isChecked" BOOLEAN DEFAULT FALSE;');
        console.log('Columns added successfully.');
    } catch (e) {
        console.error('Migration failed:', e);
    } finally {
        client.release();
        await pool.end();
    }
}

main().catch(console.error);
