const { Client } = require("pg");
require("dotenv").config();

// From client-provided Fee Structure 2026-27 image
const FEE_ITEMS = [
  // [category, label, annual_fee, admission_fee]
  ["other", "I Year", "₹ 5,500", null],
  ["other", "II / III / IV Years", "₹ 2,500", null],

  ["btech", "ECE", "₹ 43,000", null],
  ["btech", "CSE", "₹ 60,000", null],
  ["btech", "CSE-AI", "₹ 65,000", null],
  ["btech", "CSE (AIML)", "₹ 65,000", null],

  ["diploma", "CSE", "₹ 25,000", "₹ 2,000"],
  ["diploma", "AIML", "₹ 25,000", "₹ 2,000"],
  ["diploma", "ECE", "₹ 25,000", "₹ 2,000"],
  ["diploma", "EEE", "₹ 25,000", "₹ 2,000"],

  ["mtech", "CSE", "₹ 35,000", null],
  ["mtech", "ECE (VLSI)", "₹ 35,000", null],

  ["hostel", "Boys Hostel", "₹ 50,000", null],
  ["hostel", "Girls Hostel", "₹ 55,000", null],

  ["transport_a", "Markapur", "₹ 10,000", null],
  ["transport_a", "Tarlupadu", "₹ 11,000", null],
  ["transport_a", "Hanuman Kunta", "₹ 10,000", null],
  ["transport_a", "Thippayapalem", "₹ 11,000", null],
  ["transport_a", "Cumbum", "₹ 12,000", null],
  ["transport_a", "B.Peta", "₹ 13,000", null],

  ["transport_b", "Motu", "₹ 15,000", null],
  ["transport_b", "Turimella", "₹ 12,000", null],
  ["transport_b", "Racherla", "₹ 14,000", null],
  ["transport_b", "Giddalur", "₹ 17,000", null],
  ["transport_b", "Pedaraveedu", "₹ 8,000", null],
  ["transport_b", "Dornala", "₹ 11,000", null],

  ["transport_c", "Gobburu", "₹ 7,000", null],
  ["transport_c", "Tripuranthakam", "₹ 13,000", null],
  ["transport_c", "Y. Palem", "₹ 13,000", null],
];

(async () => {
  const connStr = process.env.POSTGRES_URL_NON_POOLING.replace(/[?&]sslmode=require/, "");
  const client = new Client({ connectionString: connStr, ssl: { rejectUnauthorized: false } });
  await client.connect();

  await client.query("delete from public.fee_items");

  const orderByCategory = {};
  for (const [category, label, annual_fee, admission_fee] of FEE_ITEMS) {
    const order = (orderByCategory[category] = (orderByCategory[category] ?? 0) + 1) - 1;
    await client.query(
      `insert into public.fee_items (category, label, annual_fee, admission_fee, sort_order) values ($1,$2,$3,$4,$5)`,
      [category, label, annual_fee, admission_fee, order],
    );
  }
  console.log(`Seeded ${FEE_ITEMS.length} fee items.`);

  await client.end();
})().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
