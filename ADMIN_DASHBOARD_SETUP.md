# KITS Admin Dashboard — What's Actually Wired

The database schema is **already applied** to your Supabase project (done directly, not by manual SQL copy-paste), and your existing admin login (created earlier) already works at `/admin/login`. Nothing further to set up to start using it.

## What changed in this pass — root cause + fixes

**Root cause of "I can't see testimonials/nav in the dashboard":** the admin tables existed, but the *existing* site content (testimonials, nav menu) had never been copied into them — only new admin-added items would show up. So the dashboard looked empty and the site kept showing the original hardcoded content. Fixed by seeding the real existing content into the database, so it's now the single source of truth for both the site and the dashboard.

**"Apply" button leading to an Inquiry, not the form":** the `/admissions` page had a small "Talk to our admissions team" inquiry box at the bottom, saved to the browser's local storage only (never reached the dashboard), and the bottom "Apply Now" banner on that same page linked back to `/admissions` itself — a dead loop. Fixed: added a real "Apply Now" button near the top of that page → `/admissions/apply` (the full form), fixed the bottom banner's link, and wired the inquiry box to the database with a new **Inquiries** dashboard page.

## What's dynamic now

| Dashboard section | Covers |
|---|---|
| **Nav Menus** | The *entire* header menu — every existing item, not just admin-added ones. Add/edit/delete/hide/reorder at any level (top item → group heading → link). |
| **Page Content** | Generic editor for specific pages' text fields and committee/member tables. Currently wired: **Anti-Ragging** (intro text, helpline numbers, committee table) and **Governing Body** (member table). |
| **Testimonials** | All 16 alumni/parent/recruiter testimonials — the real ones from the homepage, not placeholders. Add, edit, delete. |
| **Applications** | Every Apply Now form submission (the full multi-section form). |
| **Inquiries** | The short admissions inquiry form submissions (previously lost to local storage). |
| **Homepage Popup** | Full text/points/link editor, or turn it off. |
| **Social Links** | Floating bar URLs. |
| **Site Settings** | Contact info fields (not yet wired into Footer display — see below). |

## Extending "Page Content" to more pages

The architecture is generic — `committee_members` (any list of people) and `page_texts` (any named text/URL field) both key off a `page_slug`. To bring another page under dashboard control:

1. Add its slug to the `PAGES` list in `src/admin/pages/PageContentManager.tsx`
2. On the page component itself, call `useCommitteeMembers(slug, fallback)` and/or `usePageTexts(slug, fallback)` in place of reading the static import directly (see `src/pages/studentlife/AntiRagging.tsx` or `src/pages/GoverningBody.tsx` for the pattern)
3. Optionally seed its current static content as starting rows (ask your developer, or add rows manually from the dashboard)

Good next candidates using the same "list of people" shape: ICC (`/about/icc`), Grievance Cell (`/grievance-cell`), SC/ST Cell, Women Empowerment Cell, OBC Cell, Minority Cell.

## Still not dynamic (scope note)

Making **every** page and every paragraph on a 160+ route site editable from a dashboard is a full CMS/page-builder undertaking — `finalstructure.md` describes that full scope (drag-drop builder, blog posts, SEO suite, backups/restore, redirects, trash, multi-portal user management). That remains a separate, larger phase. What's delivered here is the real generic infrastructure (nav tree, committee members, text fields, forms) plus two fully-wired example pages proving the pattern — extending it to additional pages is now a fast, repeatable step rather than new architecture.

## Security note

`.env` contains the Supabase **service role key**, which bypasses all security rules — it is git-ignored and used only in one-off local scripts (`/scripts`), never in the browser bundle. The website and dashboard both run on the public **anon key** only, protected by Row Level Security: visitors can read active content and submit forms; only your logged-in admin account can read/write everything else.
