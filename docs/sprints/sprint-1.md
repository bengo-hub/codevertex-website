# Sprint 1 — Foundation

**Theme:** Next.js 16 setup, brand system, global layout  
**Status:** ✅ Complete  
**Duration:** Week 1

---

## Goals

- Scaffold Next.js 16.2 project with App Router
- Establish Codevertex brand colors, typography, and design tokens
- Build Navbar, Footer, and page layout shell
- Set up dark/light theme support
- Create PostgreSQL schema for contact/leads/enrollments
- Wire up Claude Haiku AI chatbot proxy (Vera)

## Deliverables

- [x] `next.config.ts` with standalone output, image domains
- [x] `tailwind.config.ts` with brand color tokens
- [x] `globals.css` with CSS custom properties for light/dark modes
- [x] `layout.tsx` — root layout with providers, Navbar, Footer, Chatbot
- [x] `ThemeProvider` — next-themes light/dark toggle
- [x] `Navbar` — sticky, glass blur, mobile hamburger, SSO link
- [x] `Footer` — 4-column grid, contact info, M-Pesa paybill details
- [x] `ChatBot` — Vera AI floating chat widget (Claude Haiku 4.5)
- [x] `scripts/schema.sql` — DDL for 3 tables
- [x] `lib/constants.ts` — SITE, TREASURY, SSO_URL, NAV_LINKS
- [x] `lib/db.ts` — PostgreSQL client (pg Pool)
- [x] shadcn/ui primitives: Button, Badge, Card, Sonner toast

## Notes

- Package name in package.json still says `marketflow-ui` — rename to `codevertex-website` in Sprint 5
- `framer-motion` was missing from package.json despite being imported — added in Sprint 5 cleanup
