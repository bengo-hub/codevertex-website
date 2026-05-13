// Next.js 16 / React 19.2 compatible Navbar
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { cn } from '@/lib/utils';
import { NAV_LINKS, SSO_URL } from '@/lib/constants';

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-background/90 backdrop-blur-xl border-b border-border shadow-sm'
            : 'bg-transparent'
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="shrink-0 group" aria-label="Codevertex IT Solutions">
            <Image
              src="/images/codevertex.png"
              alt="Codevertex IT Solutions"
              width={160}
              height={44}
              className="h-9 w-auto object-contain dark:invert group-hover:opacity-90 transition-opacity"
              priority
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3.5 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'text-primary bg-primary/8'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href={SSO_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex h-9 px-5 rounded-full bg-primary text-primary-foreground text-sm font-bold items-center gap-1.5 shadow-primary hover:shadow-primary-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              Dashboard
            </Link>
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-secondary hover:bg-muted transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-x-0 top-16 z-40 md:hidden bg-background border-b border-border shadow-lg"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'text-primary bg-primary/8'
                      : 'text-foreground hover:bg-secondary'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={SSO_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-2 flex h-11 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-primary"
              >
                Go to Dashboard →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
