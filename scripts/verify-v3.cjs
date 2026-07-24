const { Client } = require("pg");
require("dotenv").config();
(async () => {
  const connStr = process.env.POSTGRES_URL_NON_POOLING.replace(/[?&]sslmode=require/, "");
  const client = new Client({ connectionString: connStr, ssl: { rejectUnauthorized: false } });
  await client.connect();
  for (const t of ["site_documents","notifications","custom_pages","clubs","patents"]) {
    const r = await client.query(`select count(*)::int n from public.${t}`);
    console.log(`${t}: ${r.rows[0].n} rows`);
  }
  const b = await client.query(`select id, public, file_size_limit from storage.buckets where id in ('documents','images')`);
  console.log("buckets:", JSON.stringify(b.rows));
  const p = await client.query(`select tablename from pg_publication_tables where pubname='supabase_realtime'`);
  console.log("realtime tables:", p.rows.map(r=>r.tablename).join(", "));
  const nav = await client.query(`select label,url from public.nav_items where url='/student-life/clubs'`);
  console.log("clubs nav:", JSON.stringify(nav.rows));
  await client.end();
})().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
