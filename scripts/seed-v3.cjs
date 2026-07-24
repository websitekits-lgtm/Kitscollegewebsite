const { Client } = require("pg");
require("dotenv").config();

const PATENTS = [
  ["Pothole detection using edge AI", "Dr. K. Sridhar et al.", "202541xxxxxx", "2025", "Filed"],
  ["Smart energy meter with IoT analytics", "Faculty — EEE", "202441xxxxxx", "2024", "Published"],
  ["Wearable health monitor for elderly", "Faculty — ECE", "202341xxxxxx", "2023", "Granted"],
];

const CLUBS = [
  ["Coding Club", "Technical", "Weekly competitive-programming contests, hackathons, and open-source sprints for all branches.", "Dept. of CSE"],
  ["Robotics & IoT Club", "Technical", "Hands-on robot builds, Arduino/Raspberry Pi projects, and inter-college robotics competitions.", "Dept. of ECE"],
  ["Innovation & Entrepreneurship Cell", "Technical", "Startup ideation bootcamps, business-model workshops, and mentoring from industry founders.", "EDC Coordinator"],
  ["Literary & Debate Club", "Cultural", "Debates, elocution, essay writing, and the annual college magazine.", "Dept. of H&S"],
  ["Music & Dance Club", "Cultural", "Stage performances for college fests, cultural competitions, and talent showcases.", "Cultural Committee"],
  ["Arts & Photography Club", "Cultural", "Painting, rangoli, photography walks, and exhibition stalls during KITS fests.", "Cultural Committee"],
  ["Sports Club", "Sports", "Cricket, volleyball, kabaddi, athletics squads and inter-departmental tournaments.", "Physical Director"],
  ["Yoga & Fitness Club", "Sports", "Daily yoga sessions, meditation camps, and fitness challenges for students and staff.", "Physical Director"],
  ["NSS Volunteer Corps", "Social Service", "Blood-donation camps, village adoption drives, and Swachh Bharat campaigns.", "NSS Programme Officer"],
  ["Eco Club", "Social Service", "Tree plantation, plastic-free-campus drives, and environmental awareness programmes.", "NSS Unit-II"],
];

// UGC-style refund policy content, editable from Admin → Page Content
const REFUND_TEXTS = [
  ["intro", "Introduction", "Krishna Chaitanya Institute of Technology & Sciences follows the UGC and AICTE guidelines on refund of fees in the event of admission cancellation or withdrawal. The refund amount depends on when the cancellation request is submitted relative to the formally notified start date of the academic session.", "richtext"],
  ["slab_1", "15 days or more before session start", "100% refund (after deducting ₹1,000 processing fee)", "text"],
  ["slab_2", "Less than 15 days before session start", "90% of the aggregate fee", "text"],
  ["slab_3", "Up to 15 days after session start", "80% of the aggregate fee", "text"],
  ["slab_4", "16 to 30 days after session start", "50% of the aggregate fee", "text"],
  ["slab_5", "More than 30 days after session start", "No refund (0%)", "text"],
  ["note_deposit", "Caution Deposit Note", "The caution deposit is fully refundable at any stage, provided there are no outstanding dues against the student.", "text"],
  ["note_optional", "Hostel & Transport Note", "Hostel and transport fees are refunded on a pro-rata basis for the unused period, subject to a one-month notice.", "text"],
  ["note_mode", "Refund Processing Note", "Approved refunds are processed within 15 working days via NEFT to the bank account provided in the cancellation request form.", "text"],
];

(async () => {
  const connStr = process.env.POSTGRES_URL_NON_POOLING.replace(/[?&]sslmode=require/, "");
  const client = new Client({ connectionString: connStr, ssl: { rejectUnauthorized: false } });
  await client.connect();

  // Patents
  await client.query("delete from public.patents");
  for (let i = 0; i < PATENTS.length; i++) {
    const [title, inventor, filing_no, year, status] = PATENTS[i];
    await client.query(
      `insert into public.patents (title, inventor, filing_no, year, status, sort_order) values ($1,$2,$3,$4,$5,$6)`,
      [title, inventor, filing_no, year, status, i],
    );
  }
  console.log(`Seeded ${PATENTS.length} patents.`);

  // Clubs
  await client.query("delete from public.clubs");
  for (let i = 0; i < CLUBS.length; i++) {
    const [name, category, description, coordinator] = CLUBS[i];
    await client.query(
      `insert into public.clubs (name, category, description, coordinator, sort_order) values ($1,$2,$3,$4,$5)`,
      [name, category, description, coordinator, i],
    );
  }
  console.log(`Seeded ${CLUBS.length} clubs.`);

  // Fee refund policy texts
  for (let i = 0; i < REFUND_TEXTS.length; i++) {
    const [key, label, value, type] = REFUND_TEXTS[i];
    await client.query(
      `insert into public.page_texts (page_slug, field_key, field_label, field_value, field_type, sort_order)
       values ('admissions/fee-refund-policy', $1, $2, $3, $4, $5)
       on conflict (page_slug, field_key) do update set field_label = excluded.field_label, sort_order = excluded.sort_order`,
      [key, label, value, type, i],
    );
  }
  console.log(`Seeded ${REFUND_TEXTS.length} refund-policy text fields.`);

  // Clubs nav item under Student Life (after "Overview")
  const sl = await client.query(`select id from public.nav_items where label = 'Student Life' and kind = 'top' limit 1`);
  if (sl.rows.length) {
    const exists = await client.query(
      `select 1 from public.nav_items where parent_id = $1 and url = '/student-life/clubs'`, [sl.rows[0].id]);
    if (!exists.rows.length) {
      await client.query(
        `insert into public.nav_items (parent_id, label, url, kind, sort_order) values ($1, 'Clubs & Activities', '/student-life/clubs', 'link', 1)`,
        [sl.rows[0].id]);
      console.log("Added Clubs nav link under Student Life.");
    }
  }

  // Welcome notification
  const n = await client.query(`select count(*)::int as c from public.notifications`);
  if (n.rows[0].c === 0) {
    await client.query(
      `insert into public.notifications (title, body, link_url) values
       ('Admissions Open 2026-27', 'Applications are now open for all B.Tech programmes. Apply online in minutes.', '/admissions/apply')`);
    console.log("Seeded welcome notification.");
  }

  await client.end();
  console.log("v3 seed complete.");
})().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
