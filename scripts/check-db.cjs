const { Client } = require("pg");
require("dotenv").config();

(async () => {
  const connStr = process.env.POSTGRES_URL_NON_POOLING.replace(/[?&]sslmode=require/, "");
  const client = new Client({ connectionString: connStr, ssl: { rejectUnauthorized: false } });
  await client.connect();
  const res = await client.query(`
    select table_name from information_schema.tables
    where table_schema = 'public'
    order by table_name;
  `);
  console.log("Existing public tables:", res.rows.map(r => r.table_name));
  await client.end();
})().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
