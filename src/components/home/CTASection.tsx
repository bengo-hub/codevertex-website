import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-3xl bg-foreground border border-border/20 p-10 sm:p-16 text-center overflow-hidden">
          {/* Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-background tracking-tight mb-5">
              Ready to build your<br />
              <span className="text-primary">digital infrastructure?</span>
            </h2>
            <p className="text-background/70 text-lg font-medium max-w-2xl mx-auto mb-8 leading-relaxed">
              Join hundreds of businesses across Africa transforming their operations with the Codevertex ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" asChild>
                <Link href="/contact">
                  Book a free consultation <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="border-background/15 text-background hover:bg-background/8 hover:border-background/30"
                asChild
              >
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
