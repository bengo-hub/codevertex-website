'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SSO_URL } from '@/lib/constants';

const STATS = [
  { value: '200+', label: 'Corporate staff trained' },
  { value: '120+', label: 'Students certified' },
  { value: '14+', label: 'SaaS products shipped' },
  { value: '2020', label: 'Founded in Kisumu, KE' },
];

const TRUST_MARKS = [
  'Maseno University',
  'Danka Africa Ltd',
  'KCA University',
  'Digital Economy ICT Initiative',
];

const PRODUCTS = [
  { id: 'truload', name: 'TruLoad', tag: 'Transport & Logistics', img: '/images/illustrations/product-truload.svg', href: 'https://truload.codevertexitsolutions.com' },
  { id: 'erp', name: 'ERP Suite', tag: 'Business Operations', img: '/images/illustrations/product-erp.svg', href: 'https://erp.codevertexitsolutions.com' },
  { id: 'pos', name: 'POS System', tag: 'Retail & Hospitality', img: '/images/illustrations/product-pos.svg', href: 'https://pos.codevertexitsolutions.com' },
  { id: 'isp', name: 'ISP Billing', tag: 'Telecommunications', img: '/images/illustrations/product-isp.svg', href: 'https://ispbilling.codevertexitsolutions.com' },
  { id: 'books', name: 'Books', tag: 'Finance & Projects', img: '/images/illustrations/product-books.svg', href: 'https://books.codevertexitsolutions.com' },
  { id: 'vera', name: 'Vera AI', tag: 'AI Assistant', img: '/images/illustrations/product-vera.svg', href: '/contact' },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden bg-background">
      {/* Layered background */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 right-[-5%] w-125 h-125 bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-[-5%] w-100 h-100 bg-violet-500/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Copy + CTAs */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-border text-xs font-bold text-muted-foreground shadow-sm">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Kisumu, Kenya · Est. 2020 · Open for new engagements
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.65 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.02] text-foreground mb-6"
            >
              Enterprise software.
              <br />
              <span className="gradient-text">AI that ships.</span>
              <br />
              <span className="text-muted-foreground font-black">Talent that stays.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.65 }}
              className="text-lg sm:text-xl text-muted-foreground font-medium max-w-xl leading-relaxed mb-8"
            >
              Codevertex builds the integrated digital infrastructure East African businesses need —
              bespoke software, AI analytics, cloud hosting, and the workforce to run it all.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.26, duration: 0.55 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10"
            >
              <Button size="xl" asChild>
                <Link href="/contact">
                  Start a project <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link href="/services">
                  View products <ChevronRight className="h-5 w-5" />
                </Link>
              </Button>
              <Link
                href={SSO_URL}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
              >
                Client portal →
              </Link>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.38, duration: 0.55 }}
              className="flex flex-wrap items-center gap-3 mb-10"
            >
              <span className="text-xs font-semibold text-muted-foreground">Trusted by</span>
              {TRUST_MARKS.map((name, i) => (
                <span key={name} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-foreground">{name}</span>
                  {i < TRUST_MARKS.length - 1 && <span className="text-border">·</span>}
                </span>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.44, duration: 0.55 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border"
            >
              {STATS.map((s) => (
                <div key={s.label} className="bg-background/90 backdrop-blur px-4 py-5">
                  <div className="text-2xl sm:text-3xl font-black text-primary tracking-tight">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-1.5 font-medium leading-snug">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Product showcase grid */}
          <div className="hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="grid grid-cols-2 gap-4"
            >
              {PRODUCTS.map((product, i) => (
                <motion.a
                  key={product.id}
                  href={product.href}
                  target={product.href.startsWith('http') ? '_blank' : undefined}
                  rel={product.href.startsWith('http') ? 'noreferrer' : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.07, duration: 0.5 }}
                  className="group relative rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                >
                  {/* Product illustration */}
                  <div className="relative w-full h-36 overflow-hidden bg-secondary/50">
                    <Image
                      src={product.img}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1280px) 200px, 200px"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-card/80 to-transparent" />
                  </div>
                  {/* Label -->*/}
                  <div className="px-4 py-3">
                    <p className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.tag}</p>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
