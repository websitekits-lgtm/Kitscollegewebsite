# Open Questions for KITS — Decisions & Specs We Still Need

> Everything already built is admin-manageable — uploading PDFs, editing names, tables,
> fees, testimonials, popups etc. is done from the dashboard and is **not** listed here.
> This document is only the things we **cannot build or finalise without the client's
> answer** — pages whose behaviour was never specified, features awaiting decisions,
> and facts only the college knows.
>
> Already decided (not open): internal portals are NOT used (login goes to MyClassBoard;
> portal code is disabled), hosting/domain is settled, and there is a single admin login.

---

## A. Feature decisions — we need to know HOW these should work

**1. Clubs page** — A clubs directory is live (name, category, coordinator, photo,
managed from the dashboard). But how should it work beyond a directory?
- Should students be able to *join/register* for a club from the website?
- Should each club have its own page with events/photos?
- Or is the simple directory enough?

**2. Student Background Verification System** — still blocked on the director's
decisions: (a) form fields, (b) verification fee amount, (c) payment gateway
(Razorpay/PayU/other) + merchant credentials, (d) settlement bank account,
(e) who receives payment notifications.

**3. Faculty Profile System** — fields are agreed (photo, name, designation,
qualification, experience, specialization, publications, email, phone). Still unknown:
- Where should profiles appear — inside each Department page, a separate "Faculty"
  directory, or both?
- Should clicking a faculty card open a popup (as once mentioned) or a full page?

**4. Careers page** — currently says "apply via email". Should there be an online
job-application form (with CV upload) collected in the dashboard like admissions?
If email only — which address receives applications?

**5. Alumni registration** — the old site used a downloadable PDF form. Do you want
online alumni registration (form + dashboard list, like admissions), or keep the PDF?
Is there an alumni directory/news section planned?

**6. Gallery** — currently a static page with sample photos. Should the gallery be
dashboard-managed (staff upload photos into albums like College / Sports / Labs /
Hostel / Events, as the old site had)? Should it support videos?

**7. Events** — homepage shows sample events/achievements with detail pages. Should
events be dashboard-managed (add/edit upcoming events, fest announcements)? Who posts them?

**8. Email alerts for form submissions** — the dashboard now collects: admission
applications, admission inquiries, grievances, contact messages, and feedback. Only
admission applications also send an email (to admissions@kits-anna.com). For the rest —
should staff get an email when something arrives, and **which address for each**?
(Grievances → ? Contact → ? Feedback → ? Careers → ?)

**9. Diploma / Polytechnic programmes** — the fee chart you sent lists Diploma
(CSE, AIML, ECE, EEE) and M.Tech (CSE, ECE-VLSI), but the website has **no
Polytechnic section at all** (no diploma pages, admissions info, or intake). Does KITS
run a Polytechnic? Should the site get a Diploma section (pages + admission flow)?

**10. Missing pages from the old site** — the old website has an **Advisory Board**
page and an **Administrative Officer** page under Administration. Should these be
recreated? Any other old-site pages you consider mandatory that we should double-check?

## B. Facts & content only the college can confirm

**11. Director's profile** — photo received; still need his **name and qualifications**
(page currently shows placeholders).

**12. Departments content** — each department page uses template text (labs, HOD
message, outcomes). Who provides the real per-department content? Also confirm the
department list is final (any plans for CSE-AI as separate dept, Data Science, MBA?).

**13. Static claims to verify** (only KITS can confirm these are correct):
- EAPCET counselling code "**KCIT**"
- Eligibility criteria text (45% / 40% reserved in PCM, etc.)
- Hero/About statistics (established 2008, campus size, placement % etc.)
- Phone numbers used across the site (+91-9153019999, +91-9666301309, 7093055907)
- Office hours shown for Exam Cell and Placement Cell
- Terms & Privacy pages (auto-drafted — send official versions if they exist)

**14. "College View" video** — the old site's YouTube video is unavailable. Provide
the video file or a new link (used on the homepage/campus pages).

**15. EmailJS plan** — admission-form emails run on the free tier (200/month). If you
expect more applications, upgrade (~$15/mo) or rely on the dashboard alone.

---

**TL;DR for the client:** the website is complete and everything on it is editable
from your dashboard. We only need answers to the 15 points above — items **1, 2, 3**
decide what we build next; the rest are quick confirmations.
