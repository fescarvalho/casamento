require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function main() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT \"nomesAcompanhantes\" FROM \"RSVP\" WHERE \"nomesAcompanhantes\" IS NOT NULL');
        console.log('--- COMPANION NAMES ---');
        console.table(res.rows);
    } finally {
        client.release();
        await pool.end();
    }
}

main().catch(console.error);
