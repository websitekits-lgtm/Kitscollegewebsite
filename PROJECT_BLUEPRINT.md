# 🗺️ KITS Markapur — Full-System Blueprint

> Personal working notes for the dynamic-conversion phase.
> Sources: upgrade1.md → upgrade7.md, ORGANIZATION_CHART.md, workflow.md, existing codebase.

---

## 🎯 Scope at a Glance

This is no longer a marketing website. The full system has **3 layers**:

```
┌──────────────────────────────────────────────────────────────────┐
│  LAYER 1 — PUBLIC WEBSITE (~100 pages, mostly built)            │
│  Anyone can browse: About, Admissions, Academics, Departments…   │
└──────────────────────────────────────────────────────────────────┘
                              │
                              ▼  (Login button top-right)
┌──────────────────────────────────────────────────────────────────┐
│  LAYER 2 — AUTH GATEWAY                                          │
│  Role-based: Student / Faculty / HOD / Principal / Exam / Acc.   │
└──────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────────┐
│  LAYER 3 — SIX ROLE-BASED PORTALS                                │
│  Each is a full sub-app with dashboards, CRUDs, reports          │
└──────────────────────────────────────────────────────────────────┘
```

---

## 📋 Layer 1 — Public Website Restructure (per upgrade1.md)

### Current → Target mapping

| Current top-level | Target top-level | Action |
|-------------------|------------------|--------|
| Home, About, Academics, Admissions, Departments, Placements, Campus Life, Gallery, Student Corner, Research, Contact + Quality, More dropdowns | **HOME · ABOUT · ADMISSIONS · ACADEMICS · DEPARTMENTS · PLACEMENTS · CAMPUS LIFE · INFRASTRUCTURE · STUDENT SUPPORT · ALUMNI & CAREERS · CONTACT** | Restructure header. Move things into the new buckets. |

### Key restructuring tasks

| Bucket | New sub-pages we don't yet have |
|--------|--------------------------------|
| ABOUT → **Achievements** | New page — institutional achievements summary |
| ABOUT → **Approvals & Accreditation** → **Rankings** | New page (NIRF, India Today etc.) |
| ABOUT → **Reports** (Annual + Audit grouped) | Restructure: parent landing for the two existing PDFs |
| ACADEMICS → **Overview** | New landing distinct from current /academics |
| ACADEMICS → **Examinations** → **Hall Tickets / Notifications** | Sub-pages we don't have |
| ACADEMICS → **Research & Innovation** (moved from /research to nested under Academics) | Just re-nest existing /research/* |
| DEPARTMENTS → **CSE (AI)**, **Data Science** | Two new dept detail pages |
| DEPARTMENTS → **MBA** | New top-level dept |
| DEPARTMENTS → standard structure (Why Choose Us, Learning Outcomes, Labs & Facilities, Faculty, Curriculum, Careers, HOD Message, FAQs) | Department detail template needs all 8 sections + FAQs |
| PLACEMENTS → **Success Stories** | New page (alumni placement stories) |
| CAMPUS LIFE → **Hostel** split into **Boys / Girls** | Split the current hostel page |
| CAMPUS LIFE → **Clubs & Activities** | New page |
| CAMPUS LIFE → **Events** | Move events listing here |
| **INFRASTRUCTURE** (whole new top-level) → Overview / Library / Labs / Workshops / Canteen / Facilities | New section. Library already exists, others new. |
| STUDENT SUPPORT → **Counseling Services / Women Protection Cell / SC/ST Cell** | New pages |
| ALUMNI & CAREERS → **Apply** | New page — generic application form |
| CONTACT → **Enquiry Form** | Already have on Admissions page; build dedicated one |
| Footer → **FAQs** is currently embedded. New: dedicated `/faqs` page | New page |
| **LOGIN (top-right)** → Student / Staff / Parent | New entry point — opens auth flow |

---

## 📋 Layer 2 — Authentication

**Roles required:**

| Role | Login type | Notes |
|------|-----------|-------|
| Student | Student ID / Roll # + password | upgrade3.md |
| Faculty | Faculty ID / Email + password | upgrade2.md |
| HOD | HOD ID / Email + password | upgrade7.md |
| Principal | Principal ID / Email + password | upgrade4.md |
| Exam Cell | Email + password | upgrade5.md |
| Accounts & Finance | Accounts ID / Email + password | upgrade6.md |
| Parent | Parent ID + password | upgrade1.md (mentioned) |

**Shared login features:**
- Forgot Password (email reset)
- Remember Me
- Show/Hide Password
- Mobile-responsive layout

**Implementation choice:**
- Best fit: **Supabase Auth** (uses email + password + role metadata)
- Roles stored in `auth.users` metadata or a `profiles` table with role enum
- Protected routes via React Router + role guards
- Single login page that branches by role OR separate login URLs (`/login/student`, `/login/faculty` etc.)

---

## 📋 Layer 3 — Six Role-Based Portals

### Shared portal anatomy

Every portal has the same skeleton:
```
LoginPage → Dashboard (sidebar nav) → Modules → Profile Settings → Logout
```

Common UI building blocks all 6 portals share:
- Top navbar (profile avatar, notifications bell, search, dark mode toggle, logout)
- Sidebar nav (collapsed on mobile)
- Stat cards (numbers + icons)
- Data tables (with filter / sort / export CSV)
- Forms (with validation)
- Modal dialogs
- Toast notifications
- Charts (recharts is already installed ✓)

So: **build one shared `PortalLayout` + `PortalSidebar` + reusable data components** and let each role specialise the menu items.

### Portal-by-portal scope

| Portal | Primary user | Core modules |
|--------|-------------|--------------|
| **Student** (upgrade3) | Student | Dashboard widgets · Academics · Attendance · Examinations · Timetable · Fees (online payment) · Placements · Notifications · Support · Settings |
| **Faculty** (upgrade2) | Teacher | Dashboard · Attendance (mark/edit) · Academics (upload materials/lectures/assignments/lesson plans) · Students · Timetable · Notifications · Support · Settings |
| **HOD** (upgrade7) | Dept head | Dashboard · Student Monitoring · Faculty Management (workload, allocation, attendance, leaves) · Academics · Examination Overview · Placement Overview · Reports · Notifications · Support · Settings |
| **Principal** (upgrade4) | Principal | Dashboard (institution-wide) · Department Monitoring · Student Overview · Faculty Overview · Examination Overview · Placement Overview · Notifications & Approvals · Reports & Analytics · Support · Settings |
| **Exam Cell** (upgrade5) | Controller of Exams + team | Dashboard · Student Records · Examination Management (internal/sem/supp + scheduling + seating + hall tickets) · Results Management (marks → SGPA/CGPA → publish) · Revaluation · Regulations · Notifications · Reports · Support · Settings |
| **Accounts** (upgrade6) | Finance team | Dashboard (financial overview) · Student Fee Management (tuition/bus/hostel/exam + dues + concessions) · Payment Management (online/offline/refunds/receipts) · Scholarship Management (govt/private/reimbursement) · Expense Management (salaries, dept, infra, vendor) · Reports · Notifications · Support · Settings |

### Cross-portal data flow examples

The portals talk to each other through the shared database:

- Faculty marks attendance → visible to Student / HOD / Principal
- Exam Cell uploads results → visible to Student / HOD / Principal
- Accounts records fee payment → visible to Student / Principal
- HOD approves leave → reflected on Faculty's dashboard
- Principal sends notice → broadcasts to all portals

---

## 🏗️ Backend & Data Model (Proposed)

### Recommended stack additions

| Need | Pick | Why |
|------|------|-----|
| Database + Auth + Storage | **Supabase** | Postgres + auth + RLS + file storage + realtime + free tier; React Query already installed |
| Payments | **Razorpay** | India-first, supports UPI/cards/netbanking; required for student fee module |
| Email | **Resend** or Supabase built-in | For password resets, notifications, fee receipts |
| SMS (later) | **MSG91** or **TextLocal** | For attendance / exam SMS alerts |
| Charts | **recharts** | Already installed ✓ |
| PDF generation | **react-pdf** or browser print | For receipts, hall tickets, transcripts |
| Excel export | **xlsx** (sheetjs) | For reports & analytics |
| Date/calendar | **date-fns** + `react-day-picker` | Both already installed ✓ |
| Rich text | **TipTap** | For notice editor, study material descriptions |

### Core entities (high-level ER sketch)

```
profiles (id, role, name, email, phone, photo_url, dept_id)
  ├─ students       (id → profiles, roll_no, year, section, batch, parent_id)
  ├─ faculty        (id → profiles, designation, joining_date, workload_hours)
  └─ admin_staff    (id → profiles, scope: exam|accounts|principal|hod)

departments (id, code, name, hod_id)
subjects    (id, dept_id, code, name, semester, credits, regulation)
batches     (id, dept_id, intake_year, regulation)

class_sessions (id, subject_id, faculty_id, batch_id, day_of_week, slot, room)
attendance     (id, session_id, student_id, date, status [P|A|OD], marked_by)

exams              (id, type [internal|sem|supp|mid], regulation, semester, dept_id)
exam_schedules     (id, exam_id, subject_id, date, time, duration_mins, room)
hall_tickets       (id, student_id, exam_id, generated_at, file_url)
marks              (id, student_id, exam_schedule_id, marks_obtained, max, grade)
results_published  (id, exam_id, batch_id, published_at)
revaluation_reqs   (id, student_id, exam_schedule_id, status, requested_at)

fee_categories   (id, name [Tuition|Bus|Hostel|Exam|Other], amount, regulation_year)
fee_invoices     (id, student_id, fee_category_id, amount, due_date, status, paid_at)
payments         (id, invoice_id, mode [online|offline], txn_id, amount, receipt_url)
scholarships     (id, student_id, type [govt|private], amount, status, sanctioned_at)

notifications    (id, sender_id, audience [all|dept|batch|role], title, body, attachments, published_at)
notif_recipients (id, notification_id, user_id, read_at)

tickets          (id, user_id, category, subject, body, status, assigned_to)
documents        (id, owner_id, type, title, file_url, visibility, uploaded_at)
                   types: study_material | lesson_plan | assignment | recorded_lecture | syllabus | calendar | …

study_materials  (id, subject_id, faculty_id, title, file_url, visible_to: batch_ids[])
assignments      (id, subject_id, title, due_date, max_marks, attachments)
submissions      (id, assignment_id, student_id, file_url, submitted_at, marks)

leave_requests   (id, applicant_id, type, from_date, to_date, reason, status, approved_by)
od_requests      (id, student_id, event, from_date, to_date, attachments, status)

audit_logs       (id, actor_id, action, target_table, target_id, payload, created_at)
```

### Row-Level Security (RLS) thinking

| Resource | Visible to |
|----------|------------|
| Student's own attendance | The student + their HOD + faculty teaching them + Principal |
| Faculty's marked attendance | Faculty + their HOD + Principal |
| Marks of a batch | Exam Cell + HOD of dept + Principal + the individual students for their own |
| Fee invoices | Student + Accounts + Principal |
| Notifications | Per audience (role / dept / batch / individual) |

---

## 🧭 Recommended Implementation Roadmap

### Stage A — Public site polish (1–2 weeks)
1. Restructure header per upgrade1.md
2. Add the **~15 new public pages** listed above (Achievements, Rankings, MBA dept, Counseling, Boys/Girls hostels separately, etc.)
3. Add **FAQs** to Admissions, Departments, dedicated /faqs
4. Add **Apply** generic form (separate from Admissions inquiry)
5. Login button in header (placeholder → routes to /login)

### Stage B — Backend bootstrap (1 week)
1. Spin up Supabase project, set up schema + RLS
2. Seed departments / regulations / fee categories
3. Build `/login` flow with role-based redirects
4. Create Profile bootstrapping logic (when a student/faculty signs in for the first time)
5. Set up React Query + Supabase client wrapper
6. Build `PortalLayout` + sidebar + protected routes

### Stage C — Portals (3–5 weeks, can run in parallel)
Build in this order (each unlocks the next):

1. **Faculty Portal** — they generate the data (attendance, materials)
2. **Student Portal** — consumes faculty's data
3. **HOD Portal** — aggregates department data
4. **Exam Cell Portal** — drives examinations end-to-end
5. **Accounts Portal** — fees + scholarships + expenses
6. **Principal Dashboard** — read-only institutional view

### Stage D — Integrations (1–2 weeks)
1. Razorpay for online fee payment
2. Email notifications (Resend) — fee due, attendance shortage, result published
3. PDF generation (hall tickets, receipts, transcripts)
4. SMS alerts (optional v2)

### Stage E — Reports & Analytics
1. Faculty performance dashboards
2. Department performance comparisons
3. Pass percentage trends
4. Placement analytics
5. CSV/Excel export

### Stage F — Polish
1. Mobile responsiveness on every portal
2. Dark mode (Student Portal mentioned it)
3. Search across portal data
4. Audit logs for admin actions

---

## 🧩 Reusable Components I'll Build (Portal toolkit)

| Component | Reused by |
|-----------|-----------|
| `PortalLayout` (top navbar + sidebar + main) | All 6 portals |
| `StatCard` (icon + number + label + delta) | All dashboards |
| `DataTable` (filter/sort/paginate/CSV export) | All portals (attendance, results, fees) |
| `Chart` wrappers (Bar / Line / Pie) | Dashboards & reports |
| `FormWizard` (multi-step form) | Fee payment, revaluation, leave |
| `NotificationsList` | All portals |
| `FileUploader` (Supabase Storage) | Faculty (materials, lectures), Students (assignment submissions) |
| `ApprovalQueue` | HOD, Principal |
| `DateRangePicker` | Reports, leave requests |
| `RoleGuard` HOC | Route protection |
| `Avatar` / `UserBadge` | Everywhere |

---

## ⚠️ Risk / Open Questions for the User

Things I'll need clarified before / during implementation:

1. **Hosting** — Vercel handles static; do we deploy Supabase on their cloud (recommended) or self-host?
2. **Auth strategy** — Email + password vs phone OTP for students? (Indian phone-OTP is common)
3. **Fee payment provider** — Razorpay? Or institutional bank gateway?
4. **Email service** — Use Supabase's built-in or paid (Resend/SendGrid)?
5. **Data migration** — Is there existing student/faculty data (Excel/CSV) to import? Or starting from scratch?
6. **JNTUK integration** — External exam timetables/results live on JNTUK portal. Do we manually upload or scrape?
7. **Existing PDFs** — kits-anna.com has many real PDFs. Do we upload originals to our Supabase Storage or link out?
8. **Parent Portal** — Mentioned only briefly in upgrade1. Build full portal or just read-only view of child's data?
9. **MBA Department** — Listed in upgrade1 but no existing structure. Confirm we're launching it?
10. **CSE (AI) vs AI & ML vs Data Science** — upgrade1 lists 3 separate AI-flavoured branches. Confirm which are actually offered?

---

## 🔁 Wiring Strategy (How everything connects)

```
                ┌──────────────────┐
                │   Public site    │ (RR routes, anonymous)
                └──────────┬───────┘
                           │  /login (visible top-right)
                           ▼
                ┌──────────────────┐
                │   Login Page     │ (Supabase Auth)
                └──────────┬───────┘
                           │  on success: read profile.role
                           ▼
            ┌──────────────┴───────────────┐
            │                              │
            ▼                              ▼
    role === "student"           role === "faculty"
       /student/*                     /faculty/*
                                                    …etc for HOD, Principal, Exam, Accounts

Each portal route is wrapped in <RoleGuard role="student"> that:
  - checks Supabase session
  - reads role from profile
  - redirects to /login if missing
  - redirects to /unauthorized if wrong role
```

---

## ✅ My Personal TODO (Phased)

When the user gives the green light, I'll execute roughly in this order:

- [ ] **Phase A1**: Restructure public header per upgrade1 — but keep existing routes alive (don't break inbound links)
- [ ] **Phase A2**: Build the ~15 missing public pages (Achievements, MBA, Counseling, etc.)
- [ ] **Phase A3**: Add Login button to header (placeholder for now)
- [ ] **Phase B1**: Plan Supabase project structure, write schema SQL migrations
- [ ] **Phase B2**: Set up Supabase client, auth context, role guard, portal layout shell
- [ ] **Phase B3**: Build `/login` flow + role-based redirect
- [ ] **Phase C1 → C6**: Portals one by one — Faculty first (data producer), then Student (consumer), then HOD, then Exam Cell, then Accounts, then Principal (aggregate)
- [ ] **Phase D**: Razorpay + Resend + PDF generation
- [ ] **Phase E**: Reports / charts / exports
- [ ] **Phase F**: Polish, mobile, dark mode, audit logs

---

> **Note to self:** This blueprint is the source of truth for the dynamic phase.
> Update it as architecture decisions are made. Treat upgrade1–7.md as the requirements bible.
