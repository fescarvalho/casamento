
const pg = require('pg');
const { Pool } = pg;
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

async function check() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT COUNT(*), "group" FROM "Guest" GROUP BY "group"');
        console.log('Guest counts by group:', res.rows);

        const sample = await client.query('SELECT * FROM "Guest" LIMIT 5');
        console.log('Sample guests:', sample.rows);
    } finally {
        client.release();
        await pool.end();
    }
}

check().catch(console.error);
