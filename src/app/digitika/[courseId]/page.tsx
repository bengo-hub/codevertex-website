import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { COURSE_CATEGORIES, findCourse } from '@/config/courses';
import { CourseDetailClient } from '@/components/digitika/CourseDetailClient';

interface Props {
  params: Promise<{ courseId: string }>;
}

export async function generateStaticParams() {
  return COURSE_CATEGORIES.flatMap(cat =>
    cat.courses.map(course => ({ courseId: course.id }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { courseId } = await params;
  const found = findCourse(courseId);
  if (!found) return { title: 'Course Not Found' };

  const { course, category } = found;
  const title = `${course.shortName ?? course.name} | Digitika Academy`;
  const description = course.longDescription ?? course.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://codevertexitsolutions.com/digitika/${courseId}`,
      siteName: 'Codevertex IT Solutions',
      type: 'website',
      images: [
        {
          url: 'https://codevertexitsolutions.com/images/students.jpg',
          width: 1200,
          height: 630,
          alt: course.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    keywords: [
      'Digitika', 'Codevertex', category.name, course.name, 'Kenya', 'Kisumu',
      'tech training', 'coding', 'certification',
    ],
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const { courseId } = await params;
  const found = findCourse(courseId);
  if (!found) notFound();

  return <CourseDetailClient course={found.course} category={found.category} />;
}
