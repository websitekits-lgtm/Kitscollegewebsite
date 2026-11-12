const { Client } = require("pg");
const fs = require("fs"), path = require("path");
require("dotenv").config();
(async () => {
  const connStr = process.env.POSTGRES_URL_NON_POOLING.replace(/[?&]sslmode=require/, "");
  const client = new Client({ connectionString: connStr, ssl: { rejectUnauthorized: false } });
  await client.connect();
  await client.query(fs.readFileSync(path.join(__dirname, "migrate-v7.sql"), "utf8"));
  console.log("v7 migration applied (media library, posts, gallery, buckets, realtime).");
  await client.end();
})().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
