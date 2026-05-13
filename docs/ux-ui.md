# Codevertex Website — UX/UI Design System

## Brand Identity

### Color System

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `--primary` | Hot Pink `hsl(330 81% 60%)` | Sky Blue `hsl(199 89% 48%)` | CTAs, accents, highlights |
| `--background` | Creamy white `hsl(48 100% 96%)` | Deep navy `hsl(222.2 84% 4.9%)` | Page background |
| `--foreground` | Dark navy `hsl(222.2 47.4% 11.2%)` | White `hsl(210 40% 98%)` | Body text |
| `--card` | Pure white | Deep navy | Card surfaces |
| `--muted-foreground` | Slate `hsl(215 20% 47%)` | Slate `hsl(215 20% 65%)` | Secondary text |
| `--border` | Light slate | Dark slate | Dividers, card borders |

### Typography

- **Font:** Geist Sans (Google Fonts) — geometric, modern, highly legible
- **Mono:** Geist Mono — code blocks, tech stack badges
- **Scale:** Tailwind `text-xs` through `text-8xl` with `tracking-tight` on headings

### Logo & Identity
- Primary logo: `/public/images/codevertex.png`
- Digitika Academy: wordmark with gradient accent
- BengoHub (internal brand): `/public/images/bengo-hub.png`

---

## Design Principles

1. **Data-dense but breathable** — Show rich information without visual clutter. Use tight spacing within cards, generous whitespace between sections.
2. **Dark-first aesthetics** — Dark hero sections (slate-900/950) with light body; not a generic toggle afterthought.
3. **Motion with purpose** — Framer Motion scroll-triggered reveals; no gratuitous animations. Entry animations limited to opacity + 16-24px translateY.
4. **African context** — M-Pesa payment prominently featured; Kenyan English tone; local partner logos displayed with pride.
5. **Mobile-first** — 375px baseline; hero text uses `clamp()` via Tailwind responsive prefixes; tap targets ≥ 44px.

---

## Component Library

### Primitive Components (shadcn/ui)
- `Button` — variants: `default`, `outline`, `ghost`, `destructive`; sizes: `sm`, `default`, `xl`
- `Badge` — secondary/accent variants
- `Card` — with `CardHeader`, `CardContent`, `CardFooter`

### Layout Components
- `Navbar` — sticky top, glass blur, mobile hamburger, theme toggle
- `Footer` — 4-column grid, social links, M-Pesa paybill info

### Section Components (Home)
| Component | Purpose |
|-----------|---------|
| `HeroSection` | Full-viewport hero with animated headline, stats grid |
| `ServicesSection` | Power Suite 6-product grid with icons |
| `PowerSuiteSection` | Detailed product showcase with feature lists |
| `DigitikaTeaser` | Two-column: pitch left, course categories right |
| `TrustSection` | Client logos + advantage grid + pull quote |
| `CTASection` | Bottom conversion CTA with dual buttons |

### Section Components (Digitika)
| Component | Purpose |
|-----------|---------|
| `DigitikaHero` | Dark hero with stats bar |
| `AlumniBar` | "Our graduates work at" logo strip |
| `TestimonialsSection` | 3-column testimonial cards |
| `CodeStarterFeatured` | Highlighted Code-Starter bootcamp with curriculum |
| `CourseCatalog` | Filterable grid of all courses |
| `CourseCard` | Individual course card with expand/collapse |
| `EnrollmentModal` | 3-step: form → review → payment redirect |

---

## Page Structure

### Home (`/`)
```
Navbar (sticky)
└── HeroSection (full viewport, dark gradient)
└── ServicesSection (light bg, 6-card grid)
└── PowerSuiteSection (alternating layout)
└── DigitikaTeaser (two-column CTA)
└── TrustSection (clients + advantages)
└── CTASection (dark bottom CTA)
Footer
ChatBot (floating)
```

### Digitika (`/digitika`)
```
Navbar (sticky)
└── DigitikaHero (dark, stats)
└── AlumniBar (graduates employer logos)
└── TestimonialsSection (graduate testimonials)
└── CodeStarterFeatured (highlighted bootcamp)
└── CourseCatalog (filterable by category)
Footer
```

---

## Responsive Breakpoints

| Breakpoint | Min Width | Key Changes |
|-----------|-----------|-------------|
| `sm` | 640px | 2-col grids, hero text up |
| `md` | 768px | 2-col nav layout |
| `lg` | 1024px | 3-col grids, sticky sidebar patterns |
| `xl` | 1280px | Max content width containers |

---

## Animation Spec

| Element | Animation | Duration | Delay |
|---------|-----------|----------|-------|
| Hero badge | opacity 0→1, y 16→0 | 500ms | 0ms |
| Hero headline | opacity 0→1, y 20→0 | 700ms | 100ms |
| Hero subtext | opacity 0→1, y 20→0 | 700ms | 200ms |
| Hero CTAs | opacity 0→1, y 20→0 | 600ms | 300ms |
| Hero stats | opacity 0→1, y 24→0 | 600ms | 550ms |
| Scroll sections | opacity 0→1 (IntersectionObserver) | 500ms | stagger 100ms |

---

## Accessibility

- Color contrast: WCAG AA minimum (4.5:1 for body, 3:1 for large text)
- Focus rings: `focus:ring-2 focus:ring-primary/50` on all interactive elements
- ARIA labels on icon-only buttons (theme toggle, close modal)
- Semantic HTML: `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>`
- `alt` text on all images; decorative images `alt=""`

---

## Planned Improvements (Sprint 8)

- [ ] Next.js `<Image>` for all public assets (auto-WebP, lazy loading)
- [ ] Open Graph images for each page
- [ ] Structured data (JSON-LD) for courses and organization
- [ ] Sitemap generation (`next-sitemap`)
- [ ] PWA manifest and service worker (`@ducanh2912/next-pwa`)
- [ ] Lighthouse score target: Performance 90+, Accessibility 95+
