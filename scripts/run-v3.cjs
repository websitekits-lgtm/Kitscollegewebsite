const { Client } = require("pg");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
(async () => {
  const connStr = process.env.POSTGRES_URL_NON_POOLING.replace(/[?&]sslmode=require/, "");
  const client = new Client({ connectionString: connStr, ssl: { rejectUnauthorized: false } });
  await client.connect();
  const sql = fs.readFileSync(path.join(__dirname, "migrate-v3.sql"), "utf8");
  await client.query(sql);
  console.log("v3 migration applied.");
  await client.end();
})().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
