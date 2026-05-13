'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SSO_URL } from '@/lib/constants';

const STATS = [
  { value: '200+', label: 'Staff trained' },
  { value: '120+', label: 'Certified' },
  { value: '14+', label: 'Products live' },
  { value: '5yr', label: 'In Kisumu, KE' },
];

const SLIDES = [
  {
    id: 'erp',
    product: 'ERP Suite',
    tag: 'Business Operations',
    img: '/images/illustrations/product-erp.svg',
    color: '#6c47ff',
    href: 'https://erp.codevertexitsolutions.com',
    highlights: ['Finance, HR & Procurement unified', 'Real-time multi-tenant sync'],
  },
  {
    id: 'truload',
    product: 'TruLoad',
    tag: 'Transport & Logistics',
    img: '/images/illustrations/product-truload.svg',
    color: '#38bdf8',
    href: 'https://truload.codevertexitsolutions.com',
    highlights: ['Mobile & static weighing', 'IoT enforcement + commercial tickets'],
  },
  {
    id: 'pos',
    product: 'POS System',
    tag: 'Retail & Hospitality',
    img: '/images/illustrations/product-pos.svg',
    color: '#f59e0b',
    href: 'https://pos.codevertexitsolutions.com',
    highlights: ['M-Pesa & card, offline-capable', 'Multi-location inventory'],
  },
  {
    id: 'isp',
    product: 'ISP Billing',
    tag: 'Telecommunications',
    img: '/images/illustrations/product-isp.svg',
    color: '#4ade80',
    href: 'https://ispbilling.codevertexitsolutions.com',
    highlights: ['Zero-touch subscriber provisioning', 'Captive portal + auto-billing'],
  },
  {
    id: 'books',
    product: 'Books',
    tag: 'Finance & Projects',
    img: '/images/illustrations/product-books.svg',
    color: '#a855f7',
    href: 'https://books.codevertexitsolutions.com',
    highlights: ['Invoicing with M-Pesa & Paystack', 'Project tracking & team collab'],
  },
  {
    id: 'vera',
    product: 'Vera AI',
    tag: 'AI Business Assistant',
    img: '/images/illustrations/product-vera.svg',
    color: '#6c47ff',
    href: '/contact',
    highlights: ['24/7 business intelligence', 'Claude-powered, integrated across suite'],
  },
];

export function HeroSection() {
  const [slide, setSlide] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const goTo = useCallback((i: number) => {
    setSlide(i);
    setAnimKey(k => k + 1);
  }, []);

  useEffect(() => {
    const t = setInterval(() => goTo((slide + 1) % SLIDES.length), 4500);
    return () => clearInterval(t);
  }, [slide, goTo]);

  const cur = SLIDES[slide];

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-background">
      {/* Background glows */}
      <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-500/8 rounded-full blur-[90px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col gap-6">
            {/* Status pill */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card border border-border text-xs font-bold text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Kisumu, Kenya · Est. 2020 · Open for engagements
              </span>
            </motion.div>

            {/* Headline — controlled size */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.55 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-6xl font-black tracking-tight leading-[1.06]">
                <motion.span
                  className="block text-foreground"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12, duration: 0.5 }}
                >
                  Enterprise software.
                </motion.span>
                <motion.span
                  className="block gradient-text"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.24, duration: 0.5 }}
                >
                  AI that ships.
                </motion.span>
                <motion.span
                  className="block text-muted-foreground"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.36, duration: 0.5 }}
                >
                  Talent that stays.
                </motion.span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.48, duration: 0.5 }}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md"
            >
              Codevertex builds the integrated digital infrastructure East African businesses
              need — bespoke software, AI analytics, cloud hosting, and the talent to run it all.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.58, duration: 0.45 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Button size="lg" asChild>
                <Link href="/contact">Start a project <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services">View products <ChevronRight className="h-4 w-4" /></Link>
              </Button>
              <Link href={SSO_URL} target="_blank" rel="noreferrer" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
                Client portal →
              </Link>
            </motion.div>

            {/* Stats grid */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="grid grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border mt-2"
            >
              {STATS.map((s) => (
                <div key={s.label} className="bg-background/90 px-3 py-4 text-center">
                  <div className="text-xl sm:text-2xl font-black text-primary tracking-tight">{s.value}</div>
                  <div className="text-[10px] text-muted-foreground mt-1 font-medium leading-snug">{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="flex flex-wrap items-center gap-x-3 gap-y-1"
            >
              <span className="text-[11px] font-semibold text-muted-foreground">Trusted by</span>
              {['Maseno University', 'Danka Africa', 'KCA University', 'Digital Economy ICT'].map((name, i, arr) => (
                <span key={name} className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-foreground">{name}</span>
                  {i < arr.length - 1 && <span className="text-border text-xs">·</span>}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: Carousel ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.65 }}
            className="hidden lg:flex flex-col gap-3"
          >
            {/* Main carousel card */}
            <div className="rounded-2xl overflow-hidden border border-border bg-card shadow-xl shadow-black/10">
              {/* Illustration area */}
              <div className="relative w-full bg-secondary/20 overflow-hidden" style={{ height: 240 }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={animKey}
                    className="absolute inset-0"
                    initial={{ scale: 1.06, opacity: 0 }}
                    animate={{ scale: 1.0, opacity: 1 }}
                    exit={{ scale: 0.97, opacity: 0 }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                  >
                    <Image
                      src={cur.img}
                      alt={cur.product}
                      fill
                      className="object-contain p-6"
                      sizes="(max-width: 1280px) 50vw, 600px"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Info strip — separate from illustration */}
              <div className="border-t border-border px-5 py-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`info-${slide}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35 }}
                    className="flex items-start justify-between gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: cur.color }}>
                        {cur.tag}
                      </p>
                      <h3 className="text-base font-black text-foreground mb-2">{cur.product}</h3>
                      <ul className="flex flex-col gap-1">
                        {cur.highlights.map(h => (
                          <li key={h} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <CheckCircle className="h-3 w-3 shrink-0" style={{ color: cur.color }} />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <a
                      href={cur.href}
                      target={cur.href.startsWith('http') ? '_blank' : undefined}
                      rel={cur.href.startsWith('http') ? 'noreferrer' : undefined}
                      className="shrink-0 inline-flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-lg border transition-all hover:opacity-80"
                      style={{ color: cur.color, borderColor: `${cur.color}40`, background: `${cur.color}10` }}
                    >
                      Open <ArrowRight className="h-3 w-3" />
                    </a>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Thumbnail strip */}
            <div className="grid grid-cols-6 gap-2">
              {SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => goTo(i)}
                  className="relative rounded-xl overflow-hidden border transition-all duration-200 bg-secondary/30 hover:bg-secondary/60"
                  style={{
                    borderColor: i === slide ? s.color : 'var(--border)',
                    aspectRatio: '1',
                    boxShadow: i === slide ? `0 0 0 2px ${s.color}30` : 'none',
                  }}
                  aria-label={s.product}
                >
                  <Image
                    src={s.img}
                    alt={s.product}
                    fill
                    className="object-contain p-1.5"
                    sizes="70px"
                  />
                </button>
              ))}
            </div>

            {/* Progress indicators */}
            <div className="flex gap-1">
              {SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => goTo(i)}
                  className="h-1 rounded-full flex-1 transition-all duration-300"
                  style={{ background: i === slide ? s.color : 'var(--border)' }}
                  aria-label={`Go to ${s.product}`}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
