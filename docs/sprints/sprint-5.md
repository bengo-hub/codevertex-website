# Sprint 5 — Homepage Redesign & Code-Starter Integration

**Theme:** Modern homepage redesign, Code-Starter content migration, Digitika enrichment  
**Status:** 🔄 In Progress  
**Duration:** Week 5

---

## Goals

- Redesign homepage to look modern and professional (not AI-generated template)
- Migrate Code-Starter-Landing-Page content into Digitika page
- Add "Our graduates work at" alumni logo bar
- Add testimonial section with real graduate quotes
- Add detailed Code-Starter course with curriculum and installment pricing
- Reorganise public assets into `images/` and `brochures/` subdirectories

## Deliverables

### Asset Reorganisation
- [x] `public/images/` — all PNG/JPG/JPEG files
- [x] `public/brochures/` — all PDF course brochures
- [x] Migrated Code-Starter images: alumni logos (Safaricom, Boxcraft, Danka, Maseno, GLUK), students.jpg, team.jpg, hub.jpg
- [x] Deleted `Code-Starter-Landing-Page/` after content migration

### Dependency Fixes
- [x] Added `framer-motion` to package.json (was imported but missing)
- [x] Enabled `output: 'standalone'` in next.config.ts for Docker builds
- [x] Renamed package.json name from `marketflow-ui` to `codevertex-website`

### Digitika Enrichment
- [x] `AlumniBar` — horizontal logo strip ("Our graduates now work at")
- [x] `TestimonialsSection` — 4 real alumni testimonials from Code-Starter graduates
- [x] `CodeStarterFeatured` — hero card for Code-Starter bootcamp with 10-week curriculum
- [x] Enhanced `courses.ts` — added Code-Starter category with curriculum, installment plans, testimonials
- [x] Updated `digitika/page.tsx` to include new sections

### Homepage Redesign
- [x] `HeroSection` — bolder, more editorial design; real numbers, concrete language
- [x] `TrustSection` — added alumni employer logos from Code-Starter data
- [x] Added "Built in Kisumu, shipped to Africa" identity statement

## Alumni Companies (from Code-Starter graduates)

| Company | Sector |
|---------|--------|
| Safaricom PLC | Telecoms |
| Boxcraft | Technology |
| Danka Africa | Energy & Logistics |
| Maseno University | Education |
| Great Lakes University of Kisumu | Education |

## Testimonials

| Name | Role | Company |
|------|------|---------|
| Ryan Mwakala | ICT Manager | Danka Africa |
| Brandon Odhiambo | Software Developer | Boxcraft |
| Christine Kerubo | CS Tutor & Graduate | Maseno University |
| Tricia Adhiambo | Emerging Tech Talent | Maseno University |

## Code-Starter Course Details

- **Name:** Code-Starter — Introduction to Software Engineering
- **Duration:** 10 weeks
- **Format:** Hybrid (in-person Kisumu + online Zoom)
- **Cohort size:** 20 slots
- **Location:** Pioneer House, 2nd Floor, Room 204A, Kisumu
- **Includes:** 2 ICDL certifications, 3+ GitHub projects, career roadmap
- **Pricing:** KSh 30,000 upfront | KSh 18,000 + KSh 12,000 (2 installments) | KSh 12,000 + 10,000 + 8,000 (3 installments)
