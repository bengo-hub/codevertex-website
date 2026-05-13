import { Quote } from 'lucide-react';
import { GRADUATE_TESTIMONIALS } from '@/config/courses';

export function TestimonialsSection() {
  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Graduate Stories</p>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
            Real outcomes. Real careers.
          </h2>
          <p className="text-muted-foreground mt-3 text-lg">
            Hear directly from graduates who made the leap.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {GRADUATE_TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="flex flex-col bg-card border border-border rounded-2xl p-6 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200"
            >
              <Quote className="h-6 w-6 text-primary/30 mb-4 shrink-0" />
              <p className="text-sm text-foreground leading-relaxed flex-1 mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-primary font-black text-sm">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground leading-none">{t.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{t.role}</p>
                  <p className="text-xs text-primary font-semibold mt-0.5">{t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
