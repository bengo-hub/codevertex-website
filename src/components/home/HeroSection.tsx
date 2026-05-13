'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
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

const TAGLINES = ['Enterprise software.', 'AI that ships.', 'Talent that stays.'];

function useTypewriter(lines: string[], speed = 38) {
  const [displayed, setDisplayed] = useState<string[]>(['', '', '']);
  const lineRef = useRef(0);
  const charRef = useRef(0);

  useEffect(() => {
    lineRef.current = 0;
    charRef.current = 0;
    setDisplayed(['', '', '']);

    const tick = () => {
      const l = lineRef.current;
      const c = charRef.current;
      if (l >= lines.length) return;

      setDisplayed(prev => {
        const next = [...prev];
        next[l] = lines[l].slice(0, c + 1);
        return next;
      });

      charRef.current += 1;
      if (charRef.current >= lines[l].length) {
        lineRef.current += 1;
        charRef.current = 0;
      }
      setTimeout(tick, speed);
    };

    const id = setTimeout(tick, 400);
    return () => clearTimeout(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return displayed;
}

export function HeroSection() {
  const [slide, setSlide] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const lines = useTypewriter(TAGLINES, 38);

  const goTo = useCallback((i: number) => {
    setSlide(i);
    setAnimKey(k => k + 1);
  }, []);

  useEffect(() => {
    const t = setInterval(() => goTo((slide + 1) % SLIDES.length), 4800);
    return () => clearInterval(t);
  }, [slide, goTo]);

  const cur = SLIDES[slide];

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-background">
      {/* Subtle grid bg */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-[120px] pointer-events-none" />

      {/* ── RIGHT PANEL: Full-bleed illustration carousel ── */}
      <div className="absolute right-0 top-0 bottom-0 w-[52%] hidden lg:block">
        {/* Left fade gradient blending into page background */}
        <div className="absolute inset-y-0 left-0 w-56 bg-linear-to-r from-background via-background/70 to-transparent z-20 pointer-events-none" />

        {/* Dark illustration background */}
        <div className="absolute inset-0 bg-[#080b12]" />

        {/* Illustration carousel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={animKey}
            className="absolute inset-0"
            initial={{ scale: 1.06, opacity: 0 }}
            animate={{ scale: 1.0, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            <Image
              src={cur.img}
              alt={cur.product}
              fill
              className="object-contain p-10"
              sizes="(max-width: 1280px) 52vw, 700px"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Bottom gradient + product info overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-linear-to-t from-black/95 via-black/60 to-transparent pt-24 pb-7 px-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={`info-${slide}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4 }}
              className="flex items-end justify-between gap-4"
            >
              <div>
                <p className="text-[11px] font-black uppercase tracking-widest mb-1" style={{ color: cur.color }}>
                  {cur.tag}
                </p>
                <h3 className="text-lg font-black text-white mb-2">{cur.product}</h3>
                <ul className="flex flex-col gap-1">
                  {cur.highlights.map(h => (
                    <li key={h} className="flex items-center gap-2 text-xs text-white/70">
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
                className="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-xl border transition-all hover:opacity-80"
                style={{ color: cur.color, borderColor: `${cur.color}50`, background: `${cur.color}18` }}
              >
                Open <ArrowRight className="h-3 w-3" />
              </a>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thumbnail strip — right side, vertical */}
        <div className="absolute top-1/2 -translate-y-1/2 right-4 z-20 flex flex-col gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              className="relative w-9 h-9 rounded-lg overflow-hidden border-2 transition-all duration-200"
              style={{
                borderColor: i === slide ? s.color : 'rgba(255,255,255,0.15)',
                opacity: i === slide ? 1 : 0.55,
                boxShadow: i === slide ? `0 0 0 3px ${s.color}30` : 'none',
              }}
              aria-label={s.product}
            >
              <Image src={s.img} alt={s.product} fill className="object-contain p-0.5 bg-[#0f1117]" sizes="36px" />
            </button>
          ))}
        </div>

        {/* Progress bar at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-20 flex gap-0.5">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              className="h-0.5 flex-1 transition-all duration-500"
              style={{ background: i === slide ? s.color : 'rgba(255,255,255,0.2)' }}
              aria-label={`Go to ${s.product}`}
            />
          ))}
        </div>
      </div>

      {/* ── LEFT COLUMN: Text content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="lg:w-[48%] flex flex-col gap-6">

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

          {/* Typewriter headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-[3.35rem] xl:text-[3.75rem] font-black tracking-tight leading-[1.07]">
              <span className="block text-foreground min-h-[1.2em]">
                {lines[0]}<span className="inline-block w-0.5 h-[0.85em] bg-foreground align-middle ml-0.5 animate-pulse" style={{ opacity: lines[0] === TAGLINES[0] ? 0 : 1 }} />
              </span>
              <span className="block gradient-text min-h-[1.2em]">
                {lines[1]}<span className="inline-block w-0.5 h-[0.85em] bg-primary align-middle ml-0.5 animate-pulse" style={{ opacity: lines[1] === TAGLINES[1] || (lines[0] !== TAGLINES[0]) ? 0 : 1 }} />
              </span>
              <span className="block text-muted-foreground min-h-[1.2em]">
                {lines[2]}<span className="inline-block w-0.5 h-[0.85em] bg-muted-foreground align-middle ml-0.5 animate-pulse" style={{ opacity: lines[2] === TAGLINES[2] || lines[1] !== TAGLINES[1] ? 0 : 1 }} />
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md"
          >
            Codevertex builds the integrated digital infrastructure East African businesses
            need — bespoke software, AI analytics, cloud hosting, and the talent to run it all.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.45 }}
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
            transition={{ delay: 0.72, duration: 0.5 }}
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
            transition={{ delay: 0.85, duration: 0.4 }}
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

          {/* Mobile carousel (visible on small screens) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.4 }}
            className="lg:hidden rounded-2xl overflow-hidden border border-border bg-[#080b12] shadow-xl"
          >
            <div className="relative w-full" style={{ height: 200 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={animKey}
                  className="absolute inset-0"
                  initial={{ scale: 1.06, opacity: 0 }}
                  animate={{ scale: 1.0, opacity: 1 }}
                  exit={{ scale: 0.96, opacity: 0 }}
                  transition={{ duration: 0.55 }}
                >
                  <Image src={cur.img} alt={cur.product} fill className="object-contain p-6" sizes="100vw" priority />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="border-t border-border/20 px-5 py-3 flex items-center justify-between gap-3 bg-[#0d1117]">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: cur.color }}>{cur.tag}</p>
                <p className="text-sm font-bold text-white">{cur.product}</p>
              </div>
              <div className="flex gap-1">
                {SLIDES.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => goTo(i)}
                    className="h-1 rounded-full transition-all duration-300"
                    style={{ width: i === slide ? 16 : 6, background: i === slide ? s.color : 'rgba(255,255,255,0.25)' }}
                    aria-label={s.product}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
