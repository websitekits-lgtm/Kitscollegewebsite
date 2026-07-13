const { Client } = require("pg");
require("dotenv").config();

(async () => {
  const connStr = process.env.POSTGRES_URL_NON_POOLING.replace(/[?&]sslmode=require/, "");
  const client = new Client({ connectionString: connStr, ssl: { rejectUnauthorized: false } });
  await client.connect();
  for (const t of ["testimonials", "nav_links", "admission_submissions", "social_links", "site_settings", "homepage_popup"]) {
    const res = await client.query(`select count(*)::int as n from public.${t}`);
    console.log(t, "->", res.rows[0].n, "rows");
  }
  // also check auth.users count
  const users = await client.query(`select count(*)::int as n from auth.users`);
  console.log("auth.users ->", users.rows[0].n, "admin accounts");
  await client.end();
})().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
