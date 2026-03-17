
const pg = require('pg');
const { Pool } = pg;
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

async function check() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT DISTINCT "group" FROM "Guest"');
        console.log('Distinct groups:', res.rows);
    } finally {
        client.release();
        await pool.end();
    }
}

check().catch(console.error);
