import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';

const schema = z.object({
  courseId: z.string(),
  courseName: z.string(),
  category: z.string(),
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(9),
  dob: z.string().optional(),
  experience: z.string().optional(),
  howHeard: z.string().optional(),
  amount: z.number(),
  currency: z.string().default('KES'),
  paymentPlan: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const enrollment = await prisma.enrollment.create({
      data: {
        courseId: data.courseId,
        courseName: data.courseName,
        category: data.category,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        dob: data.dob ? new Date(data.dob) : null,
        experience: data.experience ?? null,
        howHeard: data.howHeard ?? null,
        amount: data.amount,
        currency: data.currency,
        paymentPlan: data.paymentPlan ?? null,
      },
    });

    return NextResponse.json({ success: true, enrollmentId: enrollment.id.toString() });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    console.error('[enrollments]', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
