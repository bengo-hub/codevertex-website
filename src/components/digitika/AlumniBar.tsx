import Image from 'next/image';
import { ALUMNI_COMPANIES } from '@/config/courses';

export function AlumniBar() {
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 border-b border-border bg-card">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-center text-muted-foreground mb-6">
          Our graduates now work at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {ALUMNI_COMPANIES.map((company) => (
            <div
              key={company.name}
              className="flex items-center justify-center w-44 h-16 rounded-xl bg-background border border-border px-4 py-3 hover:border-primary/30 hover:shadow-sm transition-all duration-200"
              title={company.name}
            >
              <Image
                src={company.logo}
                alt={company.name}
                width={140}
                height={48}
                className="h-10 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
