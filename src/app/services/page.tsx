import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { SERVICES, SERVICE_CATEGORIES, STATUS_STYLES } from '@/config/services';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Services & Products',
  description: 'Explore the full Codevertex Power Suite — ERP, TruLoad, POS, ISP Billing, Books, Analytics, and more.',
};

const PRODUCT_ILLUSTRATIONS: Record<string, string> = {
  erp: '/images/illustrations/product-erp.svg',
  truload: '/images/illustrations/product-truload.svg',
  pos: '/images/illustrations/product-pos.svg',
  isp: '/images/illustrations/product-isp.svg',
  books: '/images/illustrations/product-books.svg',
  vera: '/images/illustrations/product-vera.svg',
  notifications: '/images/illustrations/product-isp.svg',
};

export default function ServicesPage() {
  return (
    <div className="pt-16">
      {/* Hero — theme-aware */}
      <section className="bg-foreground pt-20 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Power Suite</p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-background tracking-tight leading-[1.05] max-w-3xl mb-6">
                Every tool your business needs.
              </h1>
              <p className="text-background/70 text-lg max-w-2xl leading-relaxed mb-8">
                Composable microservices communicating seamlessly through one SSO identity layer.
                Built for African enterprises of every size.
              </p>
              <div className="flex gap-3 flex-wrap">
                <Button asChild>
                  <Link href="https://accounts.codevertexitsolutions.com" target="_blank" rel="noreferrer">
                    Access portal <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" className="border-background/15 text-background hover:bg-background/8 hover:border-background/30" asChild>
                  <Link href="/contact">Book a demo</Link>
                </Button>
              </div>
            </div>
            {/* Mini product grid preview */}
            <div className="hidden lg:grid grid-cols-3 gap-3">
              {['erp', 'truload', 'pos', 'isp', 'books', 'vera'].map(id => (
                <div key={id} className="relative rounded-xl overflow-hidden aspect-video bg-background/5 border border-background/10">
                  <Image
                    src={PRODUCT_ILLUSTRATIONS[id] ?? '/images/illustrations/product-erp.svg'}
                    alt={id}
                    fill
                    className="object-cover opacity-80"
                    sizes="150px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      {SERVICE_CATEGORIES.map(cat => {
        const catServices = cat.services;
        return (
          <section key={cat.id} className="py-14 px-4 sm:px-6 lg:px-8 border-b border-border">
            <div className="max-w-7xl mx-auto">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">{cat.name}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                {catServices.map(service => {
                  const Icon = service.icon;
                  const illustration = PRODUCT_ILLUSTRATIONS[service.id];
                  return (
                    <Link
                      key={service.id}
                      href={service.url}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(
                        'group flex flex-col rounded-2xl bg-card border border-border overflow-hidden',
                        'hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300',
                        (service.status === 'coming-soon' || service.status === 'offline') && 'opacity-60 pointer-events-none'
                      )}
                    >
                      {/* Illustration header */}
                      <div className="relative h-40 bg-secondary/20 overflow-hidden">
                        {illustration ? (
                          <Image
                            src={illustration}
                            alt={service.name}
                            fill
                            className="object-contain p-3 group-hover:scale-105 transition-transform duration-400"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Icon className="h-12 w-12 text-muted-foreground/30" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-linear-to-t from-card/60 to-transparent" />
                        <span className={cn('absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border', STATUS_STYLES[service.status])}>
                          {service.status.replace('-', ' ')}
                        </span>
                        <div className="absolute bottom-3 left-3 w-9 h-9 rounded-xl bg-card/90 flex items-center justify-center border border-border">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                      </div>

                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{service.name}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">{service.description}</p>
                        <div className="flex items-center text-xs font-bold text-muted-foreground group-hover:text-primary transition-colors pt-4 border-t border-border">
                          Launch application <ArrowRight className="h-3.5 w-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
