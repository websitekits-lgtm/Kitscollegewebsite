# 🛠️ Tech Stack — KITS Markapur Website

> Production-ready React + TypeScript single-page application for Krishna Chaitanya Institute of Technology & Sciences, Markapur.

**One-line summary:**
React 18 + TypeScript SPA built with Vite, styled with Tailwind CSS and shadcn/ui (Radix), animated with GSAP and Three.js, routed with React Router, deployed on Vercel from GitHub. Mobile-responsive and built to plug into a backend admin panel when needed.

---

## ⚡ Core Framework

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| **Language** | TypeScript | 5.8 | Type-safe JavaScript |
| **Library** | React | 18.3 | UI rendering & component model |
| **Build Tool** | Vite | 8.0 | Dev server + production bundling (very fast) |
| **Compiler** | SWC (via `@vitejs/plugin-react-swc`) | 3.11 | Faster TS/JSX compilation than Babel |

---

## 🎨 Styling & UI

| Tool | Version | Purpose |
|------|---------|---------|
| **Tailwind CSS** | 3.4 | Utility-first CSS, design tokens, responsive |
| **shadcn/ui** | Radix UI primitives | Accessible, unstyled component library — accordion, dialog, dropdown, tooltip, etc. |
| **Radix UI** | Latest (~1.x–2.x) | Headless accessibility-first primitives behind shadcn |
| **Lucide React** | 0.462 | Icon set (chevrons, arrows, social icons) |
| **Tailwind Animate** | 1.0 | Keyframe animations |

---

## 🧭 Routing & Data

| Tool | Version | Purpose |
|------|---------|---------|
| **React Router DOM** | 6.30 | Client-side routing (12+ routes) |
| **TanStack React Query** | 5.83 | Future-ready for API/server state |
| **React Hook Form + Zod** | 7.61 / 3.25 | Form handling + schema validation |

---

## 🎬 Animation & 3D

| Tool | Version | Purpose |
|------|---------|---------|
| **GSAP** | 3.15 | Hero animations, ScrollTrigger |
| **Three.js + React Three Fiber** | 0.184 / 8.18 | 3D wireframe mesh background |
| **Embla Carousel** | 8.6 | Carousel/scroller primitives |

---

## 🔤 Typography

| Font | Use |
|------|-----|
| **Fraunces** (Google Fonts) | Display headings (serif) |
| **Plus Jakarta Sans** (Google Fonts) | Body text — modern, student-friendly |
| **Inter** (Google Fonts) | Fallback sans |

---

## 🚀 Deployment

| Tool | Purpose |
|------|---------|
| **Vercel** | Production hosting & CDN |
| **GitHub** | Version control: [websitekits-lgtm/Kitscollegewebsite](https://github.com/websitekits-lgtm/Kitscollegewebsite) |
| **Sharp** | Image optimization (used to compress hero image 21MB → 370KB WebP) |

---

## 🧪 Quality

| Tool | Purpose |
|------|---------|
| **ESLint** | Linting |
| **TypeScript ESLint** | TS-specific rules |
| **Vitest + Testing Library** | Unit/integration testing setup |
| **JSDOM** | Test DOM environment |

---

## 📦 Architecture Highlights

- **SPA** (Single Page Application) — fast page transitions, no reloads
- **Component-based** with reusable shadcn/ui primitives
- **Mobile-first responsive** — 5 breakpoints (sm / md / lg / xl / 2xl)
- **Centralized data layer** — `src/lib/college.ts`, `src/lib/events.ts` (admin-ready: just swap with API later)
- **Built-in search** — client-side index across pages, departments, events (Cmd / Ctrl + K)
- **SEO-ready** — semantic HTML, OG meta tags, FAQs section
- **Accessibility** — ARIA labels, keyboard navigation, focus states

---

## 🔌 Easy to Extend

The site is **ready to plug into a backend / admin panel**:

- All static data lives in `src/lib/*.ts` files
- React Query already installed for API fetching
- Form validation (Zod) ready for contact forms / admissions submissions
- Authentication can be added via Supabase / Firebase / custom JWT

---

## 📁 Project Structure

```
krishna-chaitanya-tech-hub/
├── public/                          # Static assets (logos, images, video)
├── src/
│   ├── assets/                      # Bundled images
│   ├── components/
│   │   ├── site/                    # Site-specific components
│   │   │   ├── Hero.tsx
│   │   │   ├── AboutSnapshot.tsx
│   │   │   ├── BoardsSection.tsx
│   │   │   ├── DepartmentsGrid.tsx  # Auto-rotating carousel
│   │   │   ├── WhyChoose.tsx        # Campus tour video
│   │   │   ├── EventsAchievements.tsx
│   │   │   ├── PlacementPartners.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── Accreditations.tsx
│   │   │   ├── CTABand.tsx
│   │   │   ├── SearchOverlay.tsx    # Cmd/Ctrl+K search
│   │   │   ├── ScrollToTop.tsx
│   │   │   ├── SiteHeader.tsx
│   │   │   ├── SiteFooter.tsx       # Newsletter + FAQs + links
│   │   │   └── SiteLayout.tsx
│   │   └── ui/                      # shadcn/ui primitives (button, dialog, etc.)
│   ├── pages/                       # Route components
│   │   ├── Index.tsx
│   │   ├── About.tsx
│   │   ├── Academics.tsx
│   │   ├── Admissions.tsx
│   │   ├── Departments.tsx
│   │   ├── DepartmentDetail.tsx
│   │   ├── EventDetail.tsx
│   │   ├── Placements.tsx
│   │   ├── CampusLife.tsx
│   │   ├── Gallery.tsx
│   │   ├── StudentCorner.tsx
│   │   ├── Research.tsx
│   │   ├── Contact.tsx
│   │   └── NotFound.tsx
│   ├── lib/                         # Data + utilities (admin-ready)
│   │   ├── college.ts               # College info, NAV, departments
│   │   ├── events.ts                # Events & achievements data
│   │   ├── searchIndex.ts           # Search index builder
│   │   └── utils.ts                 # cn() helper, etc.
│   ├── hooks/                       # Custom React hooks
│   ├── index.css                    # Tailwind base + design tokens
│   ├── App.tsx                      # Routes
│   └── main.tsx                     # Entry
├── index.html
├── tailwind.config.ts               # Tailwind config (colors, fonts)
├── vite.config.ts                   # Vite config
├── tsconfig.json                    # TypeScript config
├── package.json
└── .npmrc                           # Vercel build config
```

---

## 🏗️ Build & Deploy

```bash
# Install dependencies
npm install

# Run dev server (http://localhost:8080)
npm run dev

# Production build
npm run build

# Preview the production build locally
npm run preview

# Run tests
npm run test

# Lint
npm run lint
```

Deployment is automatic via Vercel — every push to the `main` branch triggers a new production deployment.

---

## 🎯 Key Features Implemented

- ✅ Responsive landing page with cinematic hero
- ✅ Auto-rotating Departments carousel (7 branches)
- ✅ Auto-scrolling Examinations & Notifications board with color-coded tags
- ✅ Embedded Campus Tour video (auto-loop, no controls)
- ✅ Recent Events & Achievements horizontal scroller with detail pages
- ✅ Placement Partners scroll-pause animation (16 recruiter logos)
- ✅ Testimonials section
- ✅ Accreditations (AICTE / JNTUK / NAAC)
- ✅ Global search (Cmd / Ctrl + K)
- ✅ Floating "scroll to top" button
- ✅ Newsletter subscription in footer
- ✅ FAQs section for SEO
- ✅ Contact info with Google Maps deep link
- ✅ Social media icons with brand-color hover

---

## 📝 Future Roadmap

- [ ] Admin dashboard for managing notifications, events, and content
- [ ] Backend API (Node.js / Supabase / Firebase) for dynamic data
- [ ] Authentication for student/staff portals
- [ ] Online application form with payment gateway
- [ ] Multilingual support (English / Telugu)
- [ ] Live placements ticker
- [ ] Image gallery CMS
