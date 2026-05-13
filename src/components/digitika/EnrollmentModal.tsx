'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Course, type CourseCategory, TREASURY_PAY_URL } from '@/config/courses';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { toast } from 'sonner';

const schema = z.object({
  fullName: z.string().min(2, 'Required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(9, 'Valid phone required'),
  dob: z.string().min(1, 'Required'),
  experience: z.string().optional(),
  howHeard: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

interface Props { course: Course; category: CourseCategory; onClose: () => void; }

export function EnrollmentModal({ course, category, onClose }: Props) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStep(2);
  };

  const handlePay = async () => {
    const data = getValues();
    setSubmitting(true);
    try {
      // Save enrollment to DB
      await fetch('/api/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, courseId: course.id, courseName: course.name, category: category.name, amount: course.price, currency: course.currency }),
      });
    } catch { /* non-blocking */ }

    const params = new URLSearchParams({
      amount: String(course.price),
      tenant: process.env.NEXT_PUBLIC_TREASURY_TENANT ?? 'codevertex',
      reference_id: `digitika-${course.id}-${Date.now()}`,
      reference_type: 'digitika_enrollment',
      currency: course.currency,
      description: `Digitika — ${course.name}`,
      redirect_url: typeof window !== 'undefined' ? `${window.location.origin}/digitika/success` : '',
      button_text: 'View My Enrollment',
      gateways: 'paystack,mpesa',
    });
    window.open(`${TREASURY_PAY_URL}?${params}`, '_blank');
    setSubmitting(false);
    setStep(3);
  };

  const inputCls = (err?: { message?: string }) =>
    `w-full px-4 py-2.5 rounded-lg bg-secondary border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${err ? 'border-destructive' : 'border-border'}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-lg bg-background rounded-2xl border border-border shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-background border-b border-border px-6 py-5 z-10">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: category.color }}>
                  {category.name}
                </p>
                <h2 className="text-lg font-black text-foreground">{course.name}</h2>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-muted transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
            {/* Step indicator */}
            <div className="flex items-center gap-2 mt-4">
              {(['Personal Info', 'Review', 'Payment'] as const).map((label, i) => (
                <div key={label} className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step > i + 1 ? 'bg-primary text-primary-foreground' : step === i + 1 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>
                    {i + 1}
                  </div>
                  <span className={`text-xs font-medium ${step === i + 1 ? 'text-foreground' : 'text-muted-foreground'}`}>{label}</span>
                  {i < 2 && <div className="w-8 h-px bg-border" />}
                </div>
              ))}
            </div>
          </div>

          <div className="px-6 py-6">
            {step === 1 && (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Full Name *</label>
                    <input {...register('fullName')} placeholder="Jane Otieno" className={inputCls(errors.fullName)} />
                    {errors.fullName && <p className="text-xs text-destructive mt-1">{errors.fullName.message}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Date of Birth *</label>
                    <input type="date" {...register('dob')} className={inputCls(errors.dob)} />
                    {errors.dob && <p className="text-xs text-destructive mt-1">{errors.dob.message}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Phone *</label>
                    <input {...register('phone')} placeholder="+254 7XX XXX XXX" className={inputCls(errors.phone)} />
                    {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Email *</label>
                    <input type="email" {...register('email')} placeholder="jane@example.com" className={inputCls(errors.email)} />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1.5">Experience Level</label>
                    <select {...register('experience')} className={inputCls()}>
                      <option value="">Select…</option>
                      <option>Complete Beginner</option>
                      <option>Some Basic Knowledge</option>
                      <option>Intermediate</option>
                      <option>Advanced — looking to specialise</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1.5">How did you hear about us?</label>
                    <select {...register('howHeard')} className={inputCls()}>
                      <option value="">Select…</option>
                      <option>Social Media</option>
                      <option>WhatsApp</option>
                      <option>Referral</option>
                      <option>Google Search</option>
                      <option>Partner Institution</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <Button type="submit" className="w-full mt-2">Continue to Review →</Button>
              </form>
            )}

            {step === 2 && (
              <div>
                <div className="rounded-xl bg-secondary border border-border p-5 mb-5 space-y-3">
                  <h3 className="font-bold text-foreground mb-4">Enrollment Summary</h3>
                  {[['Course', course.name], ['Duration', course.duration], ['Mode', course.mode], ['Name', getValues('fullName')], ['Email', getValues('email')], ['Phone', getValues('phone')]].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{k}</span>
                      <span className="font-semibold text-foreground text-right max-w-[60%]">{v}</span>
                    </div>
                  ))}
                  <div className="border-t border-border pt-3 flex justify-between">
                    <span className="font-bold text-foreground">Total</span>
                    <span className="text-2xl font-black text-primary">{formatCurrency(course.price, course.currency)}</span>
                  </div>
                </div>
                <div className="rounded-lg bg-emerald-500/8 border border-emerald-500/20 p-3 mb-5 text-xs text-emerald-700 dark:text-emerald-400">
                  ✓ Clicking "Proceed to Payment" opens the secure Codevertex Treasury gateway (Paystack & M-Pesa). Enrollment is confirmed upon successful payment.
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">← Back</Button>
                  <Button onClick={handlePay} disabled={submitting} className="flex-2">
                    {submitting ? 'Redirecting…' : 'Proceed to Payment →'}
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-black text-foreground mb-3">Payment Window Opened!</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Complete your payment in the Treasury gateway tab. Your enrollment will be confirmed automatically.
                  Check your email for a receipt and course details.
                </p>
                <p className="text-xs text-muted-foreground mb-6">
                  Questions? WhatsApp us at{' '}
                  <a href="https://wa.me/254743793901" className="text-primary font-semibold">+254 743 793 901</a>
                </p>
                <Button onClick={onClose} variant="outline">Close</Button>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
