'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SERVICES, SERVICE_CATEGORIES, STATUS_STYLES, type Service } from '@/config/services';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.04, duration: 0.45 }}
      className="h-full"
    >
      <Link
        href={service.url}
        target="_blank"
        rel="noreferrer"
        className={cn(
          'group flex flex-col h-full p-6 rounded-2xl bg-card border border-border',
          'hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1',
          'transition-all duration-300',
          (service.status === 'coming-soon' || service.status === 'offline') && 'opacity-60 pointer-events-none'
        )}
      >
        {/* Icon + status */}
        <div className="flex items-start justify-between mb-5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-muted to-secondary flex items-center justify-center border border-border group-hover:border-primary/20 group-hover:scale-110 transition-all duration-300">
            <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
          </div>
          <span className={cn('px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border', STATUS_STYLES[service.status])}>
            {service.status.replace('-', ' ')}
          </span>
        </div>

        <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {service.name}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">
          {service.description}
        </p>
        <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground group-hover:text-primary transition-colors pt-4 border-t border-border mt-auto">
          Launch application
          <ArrowRight className="h-3.5 w-3.5 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </div>
      </Link>
    </motion.div>
  );
}

export function ServicesSection() {
  const [active, setActive] = useState<string | null>(null);
  const filtered = active ? SERVICES.filter(s => s.category === active) : SERVICES;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Power Suite</p>
            <h2 className="text-4xl sm:text-5xl font-black text-foreground leading-tight tracking-tight mb-4">
              Every tool your business needs.
            </h2>
            <p className="text-muted-foreground text-lg font-medium leading-relaxed">
              Composable microservices communicating seamlessly through one SSO identity layer.
            </p>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActive(null)}
              className={cn(
                'h-9 px-5 rounded-full text-xs font-bold transition-all',
                !active ? 'bg-foreground text-background shadow-sm' : 'bg-secondary text-muted-foreground border border-border hover:border-primary/30'
              )}
            >All</button>
            {SERVICE_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={cn(
                  'h-9 px-5 rounded-full text-xs font-bold transition-all',
                  active === cat.id ? 'bg-foreground text-background shadow-sm' : 'bg-secondary text-muted-foreground border border-border hover:border-primary/30'
                )}
              >{cat.name}</button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={active ?? 'all'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {filtered.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
