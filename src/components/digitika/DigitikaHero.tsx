'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, Award, Users, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const STATS = [
  { icon: Users, value: '200+', label: 'Corporate staff trained' },
  { icon: BookOpen, value: '120+', label: 'Students certified' },
  { icon: Award, value: '24', label: 'Courses across 5 disciplines' },
  { icon: Globe, value: 'Online', label: 'And in-person · Kisumu' },
];

const GALLERY = [
  { src: '/images/students.jpg', caption: 'Code-Starter bootcamp — learning by building real projects', alt: 'Students in class' },
  { src: '/images/coding.png', caption: 'Hands-on programming sessions every week', alt: 'Student coding' },
  { src: '/images/team.jpg', caption: 'Our instructors are industry practitioners, not just academics', alt: 'Digitika instructors' },
];

const DISCIPLINES = [
  { name: 'Software Engineering', color: '#6c47ff', courses: 8, icon: '⌨️' },
  { name: 'ICDL Certification', color: '#38bdf8', courses: 4, icon: '🖥️' },
  { name: 'Cisco Networking', color: '#f59e0b', courses: 4, icon: '🌐' },
  { name: 'AI & Machine Learning', color: '#a855f7', courses: 4, icon: '🤖' },
  { name: 'Data Analytics', color: '#4ade80', courses: 4, icon: '📊' },
];

export function DigitikaHero() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % GALLERY.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative pt-20 pb-0 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-primary/8 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left: text */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-border text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Digitika Academy — by Codevertex IT Solutions
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-foreground tracking-tight leading-[1.03] mb-5">
              Closing Africa&apos;s{' '}
              <span className="gradient-text">digital skills gap.</span>
            </h1>

            <p className="text-muted-foreground text-lg font-medium max-w-xl leading-relaxed mb-6">
              Industry-aligned certification programmes in ICT, networking, AI, software engineering
              and data analytics — delivered in Kisumu and online across Africa.
            </p>

            {/* Discipline tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {DISCIPLINES.map(d => (
                <span
                  key={d.name}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border"
                  style={{ color: d.color, borderColor: `${d.color}30`, background: `${d.color}10` }}
                >
                  <span>{d.icon}</span> {d.name}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mb-10">
              <Button asChild size="lg">
                <Link href="#software">
                  Browse courses <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg">
                <Link href="/contact">Corporate training</Link>
              </Button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden border border-border">
              {STATS.map(({ icon: Icon, value, label }) => (
                <div key={label} className="bg-card px-5 py-4 flex items-center gap-3">
                  <Icon className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <div className="text-xl font-black text-foreground tracking-tight">{value}</div>
                    <div className="text-xs text-muted-foreground mt-0.5 font-medium leading-snug">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image carousel */}
          <div className="relative rounded-2xl overflow-hidden border border-border shadow-xl shadow-primary/5 bg-card aspect-[4/3]">
            {GALLERY.map((item, i) => (
              <div
                key={item.src}
                className={`absolute inset-0 transition-opacity duration-700 ${i === slide ? 'opacity-100' : 'opacity-0'}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-sm font-medium text-white/90">{item.caption}</p>
                </div>
              </div>
            ))}
            {/* Carousel controls */}
            <button
              onClick={() => setSlide(s => (s - 1 + GALLERY.length) % GALLERY.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/60 backdrop-blur border border-border flex items-center justify-center hover:bg-background transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="h-4 w-4 text-foreground" />
            </button>
            <button
              onClick={() => setSlide(s => (s + 1) % GALLERY.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/60 backdrop-blur border border-border flex items-center justify-center hover:bg-background transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="h-4 w-4 text-foreground" />
            </button>
            {/* Dots */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-1.5">
              {GALLERY.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${i === slide ? 'bg-white w-4' : 'bg-white/40'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            {/* Certification badge overlay */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <span className="px-3 py-1.5 rounded-full bg-primary/90 text-white text-xs font-bold shadow-lg">ICDL Certified</span>
              <span className="px-3 py-1.5 rounded-full bg-card/90 border border-border text-foreground text-xs font-bold shadow-lg">Cisco Partner</span>
            </div>
          </div>

        </div>
      </div>

      {/* Programme pathway strip */}
      <div className="relative z-10 max-w-7xl mx-auto mt-12 mb-0">
        <div className="flex flex-col sm:flex-row items-stretch border border-border rounded-2xl overflow-hidden bg-card divide-y sm:divide-y-0 sm:divide-x divide-border">
          {[
            { step: '01', title: 'Choose a track', desc: 'Software, AI, Data, Networking or ICDL' },
            { step: '02', title: 'Enroll & pay', desc: 'M-Pesa, card or installments accepted' },
            { step: '03', title: 'Learn & build', desc: '3 evenings/week + Saturday labs' },
            { step: '04', title: 'Get certified', desc: 'Industry-recognised certificate & portfolio' },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex-1 px-6 py-5">
              <span className="text-xs font-black text-primary tracking-widest uppercase">{step}</span>
              <p className="font-bold text-foreground mt-1 text-sm">{title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
