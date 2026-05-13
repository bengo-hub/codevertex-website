import Image from 'next/image';
import { Quote } from 'lucide-react';

const GALLERY_ITEMS = [
  {
    src: '/images/students.jpg',
    alt: 'Digitika Academy students in a coding bootcamp session',
    caption: 'Real classrooms. Real projects. Real skills.',
    span: 'col-span-2',
  },
  {
    src: '/images/coding.png',
    alt: 'Student programming a web application',
    caption: 'Hands-on every session',
    span: 'col-span-1',
  },
  {
    src: '/images/team.jpg',
    alt: 'Digitika Academy instructors and mentors',
    caption: 'Instructors from the industry',
    span: 'col-span-1',
  },
];

const HIGHLIGHTS = [
  { stat: '3×', label: 'Evenings per week, in-person or online' },
  { stat: '4–8', label: 'Weeks to a recognised certificate' },
  { stat: '100%', label: 'Hands-on project-based curriculum' },
  { stat: 'KES', label: 'M-Pesa, card, or installment plans' },
];

export function LifeAtDigitika() {
  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Life at Digitika</p>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight max-w-2xl">
            More than a course — a launchpad.
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl text-lg">
            Small cohorts, expert mentors, and a community of peers building Africa&apos;s next generation of tech talent.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Gallery grid */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {GALLERY_ITEMS.map(item => (
              <div
                key={item.src}
                className={`relative rounded-2xl overflow-hidden bg-secondary ${item.span} aspect-video`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/70 via-transparent to-transparent" />
                <p className="absolute bottom-3 left-3 right-3 text-xs font-semibold text-white/90">{item.caption}</p>
              </div>
            ))}
          </div>

          {/* Right: highlights + quote */}
          <div className="flex flex-col gap-4">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {HIGHLIGHTS.map(h => (
                <div key={h.stat} className="p-4 rounded-xl bg-card border border-border">
                  <div className="text-2xl font-black text-primary">{h.stat}</div>
                  <p className="text-xs text-muted-foreground mt-1 leading-snug">{h.label}</p>
                </div>
              ))}
            </div>

            {/* Pull quote */}
            <div className="flex-1 p-6 rounded-2xl bg-card border border-border flex flex-col justify-between">
              <Quote className="h-8 w-8 text-primary/30 mb-3" />
              <blockquote className="text-sm text-foreground font-medium leading-relaxed flex-1">
                &ldquo;I enrolled in Code-Starter with zero programming experience. Eight weeks later,
                I had a full portfolio and a junior developer role lined up. The instructors
                don&apos;t just teach — they build with you.&rdquo;
              </blockquote>
              <div className="mt-4 flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-black text-sm">A</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Aisha K.</p>
                  <p className="text-xs text-muted-foreground">Code-Starter Graduate · Now at Safaricom PLC</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enrolment info strip */}
        <div className="flex flex-col sm:flex-row items-stretch gap-0 rounded-2xl overflow-hidden border border-border">
          {[
            { label: 'Next intake', value: 'June 2026', sub: 'Applications open now' },
            { label: 'Location', value: 'Kisumu + Online', sub: 'Pioneer House, Oginga St' },
            { label: 'Payment', value: 'M-Pesa / Card', sub: 'Paybill 542542 · Acc 87660' },
            { label: 'Duration', value: '4–16 weeks', sub: 'Depending on programme' },
          ].map(item => (
            <div key={item.label} className="flex-1 px-6 py-5 bg-card border-r border-border last:border-r-0">
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">{item.label}</p>
              <p className="font-black text-foreground text-base">{item.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
