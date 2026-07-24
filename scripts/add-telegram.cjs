const { Client } = require("pg");
require("dotenv").config();
(async () => {
  const connStr = process.env.POSTGRES_URL_NON_POOLING.replace(/[?&]sslmode=require/, "");
  const client = new Client({ connectionString: connStr, ssl: { rejectUnauthorized: false } });
  await client.connect();
  await client.query(
    `insert into public.social_links (platform, url, enabled, sort_order) values ('Telegram', 'https://t.me/kitscampusconncet', true, 6) on conflict do nothing`
  );
  console.log("Telegram link added.");
  await client.end();
})().catch((e) => { console.error(e.message); process.exit(1); });
