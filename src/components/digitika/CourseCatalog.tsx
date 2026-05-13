import { COURSE_CATEGORIES } from '@/config/courses';
import { CourseCard } from './CourseCard';
import { cn } from '@/lib/utils';

// Server component — no 'use client' needed since cards are plain links
export function CourseCatalog() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto space-y-16">
        {COURSE_CATEGORIES.map(cat => (
          <div key={cat.id} id={cat.id}>
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: cat.color }}>{cat.tagline}</p>
              <h2 className="text-3xl font-black text-foreground tracking-tight">{cat.name}</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl">{cat.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {cat.courses.map(course => (
                <CourseCard key={course.id} course={course} category={cat} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
