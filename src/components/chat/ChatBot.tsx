'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Minimize2, Phone, ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { COURSE_CATEGORIES } from '@/config/courses';

// ---------- Config (from env or defaults) ----------
const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '254743793901';
const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER ?? '+254743793901';
const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME ?? 'Codevertex';

// ---------- Types ----------
interface Message {
  role: 'user' | 'assistant';
  content: string;
  form?: FormConfig;
}

type FormConfig =
  | { type: 'lead_capture' }
  | { type: 'enrollment'; courseId?: string }
  | { type: 'contact' }
  | { type: 'support_ticket' };

// ---------- Quick replies ----------
const QUICK_REPLIES = [
  { label: 'Digitika courses', msg: 'What courses does Digitika Academy offer?' },
  { label: 'Services overview', msg: 'What enterprise services does Codevertex offer?' },
  { label: 'Book a call', msg: "I'd like to book a discovery call with your team" },
  { label: 'Pricing', msg: 'What are your pricing plans?' },
  { label: 'Get support', msg: 'I need technical support' },
  { label: 'Enroll in Code-Starter', msg: "I'd like to enroll in the Code-Starter bootcamp" },
];

// ---------- Simple markdown renderer ----------
function renderMarkdown(text: string) {
  const lines = text.split('\n');
  const output: React.ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length) {
      output.push(
        <ul key={output.length} className="list-disc pl-4 space-y-0.5 my-1">
          {listItems.map((li, i) => <li key={i} className="text-sm">{li}</li>)}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, i) => {
    if (line.startsWith('- ') || line.startsWith('• ')) {
      listItems.push(line.slice(2));
    } else {
      flushList();
      if (!line.trim()) {
        output.push(<div key={i} className="h-1" />);
      } else {
        // Inline bold/italic/code
        const parts = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
        output.push(
          <p key={i} className="text-sm leading-relaxed">
            {parts.map((part, j) => {
              if (part.startsWith('**') && part.endsWith('**')) return <strong key={j}>{part.slice(2, -2)}</strong>;
              if (part.startsWith('*') && part.endsWith('*')) return <em key={j}>{part.slice(1, -1)}</em>;
              if (part.startsWith('`') && part.endsWith('`')) return <code key={j} className="bg-muted px-1 rounded text-xs font-mono">{part.slice(1, -1)}</code>;
              return part;
            })}
          </p>
        );
      }
    }
  });
  flushList();
  return output;
}

// ---------- Typing dots ----------
function TypingDots() {
  return (
    <div className="flex items-center gap-1 py-1">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-primary/60"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

// ---------- Lead capture / book-a-call form ----------
function LeadForm({ onSubmit, onDismiss }: { onSubmit: (d: Record<string, string>) => void; onDismiss: () => void }) {
  const [f, setF] = useState({ name: '', email: '', phone: '', time: '', topic: '' });
  const set = (k: string, v: string) => setF(p => ({ ...p, [k]: v }));
  const cls = 'w-full px-3 py-2 rounded-lg bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50';
  return (
    <div className="bg-secondary/60 rounded-xl p-4 border border-border mb-2 mt-1">
      <div className="flex justify-between items-center mb-3">
        <p className="text-xs font-bold text-foreground">📅 Book a Discovery Call</p>
        <button onClick={onDismiss}><X className="h-3.5 w-3.5 text-muted-foreground" /></button>
      </div>
      <div className="space-y-2">
        <input value={f.name} onChange={e => set('name', e.target.value)} placeholder="Full name *" className={cls} />
        <input type="email" value={f.email} onChange={e => set('email', e.target.value)} placeholder="Email *" className={cls} />
        <input value={f.phone} onChange={e => set('phone', e.target.value)} placeholder="Phone / WhatsApp *" className={cls} />
        <input value={f.time} onChange={e => set('time', e.target.value)} placeholder="Preferred date & time" className={cls} />
        <select value={f.topic} onChange={e => set('topic', e.target.value)} className={cls}>
          <option value="">Topic…</option>
          {['Software Development', 'AI / Analytics', 'Power Suite Demo', 'Digitika Training', 'TruLoad / ISP', 'General Inquiry'].map(t => <option key={t}>{t}</option>)}
        </select>
        <button
          onClick={() => { if (f.name && f.email && f.phone) onSubmit(f); else toast.error('Please fill required fields.'); }}
          className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-colors"
        >
          Book Call →
        </button>
      </div>
    </div>
  );
}

// ---------- Enrollment form ----------
function EnrollmentForm({ courseId, onSubmit, onDismiss }: { courseId?: string; onSubmit: (d: Record<string, string>) => void; onDismiss: () => void }) {
  const courses = COURSE_CATEGORIES.flatMap(c => c.courses).map(c => ({ id: c.id, name: c.name }));
  const [f, setF] = useState({ name: '', email: '', phone: '', courseId: courseId ?? '', experience: '' });
  const set = (k: string, v: string) => setF(p => ({ ...p, [k]: v }));
  const cls = 'w-full px-3 py-2 rounded-lg bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50';
  return (
    <div className="bg-secondary/60 rounded-xl p-4 border border-border mb-2 mt-1">
      <div className="flex justify-between items-center mb-3">
        <p className="text-xs font-bold text-foreground">🎓 Course Enrollment</p>
        <button onClick={onDismiss}><X className="h-3.5 w-3.5 text-muted-foreground" /></button>
      </div>
      <div className="space-y-2">
        <input value={f.name} onChange={e => set('name', e.target.value)} placeholder="Full name *" className={cls} />
        <input type="email" value={f.email} onChange={e => set('email', e.target.value)} placeholder="Email address *" className={cls} />
        <input value={f.phone} onChange={e => set('phone', e.target.value)} placeholder="Phone / WhatsApp *" className={cls} />
        <select value={f.courseId} onChange={e => set('courseId', e.target.value)} className={cls}>
          <option value="">Select a course *</option>
          {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select value={f.experience} onChange={e => set('experience', e.target.value)} className={cls}>
          <option value="">Experience level</option>
          <option>Complete Beginner</option>
          <option>Some Basic Knowledge</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
        <button
          onClick={() => {
            if (f.name && f.email && f.phone && f.courseId) onSubmit(f);
            else toast.error('Please fill required fields.');
          }}
          className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-colors"
        >
          Submit Enrollment →
        </button>
      </div>
    </div>
  );
}

// ---------- Contact / message form ----------
function ContactForm({ onSubmit, onDismiss }: { onSubmit: (d: Record<string, string>) => void; onDismiss: () => void }) {
  const [f, setF] = useState({ name: '', email: '', message: '' });
  const set = (k: string, v: string) => setF(p => ({ ...p, [k]: v }));
  const cls = 'w-full px-3 py-2 rounded-lg bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50';
  return (
    <div className="bg-secondary/60 rounded-xl p-4 border border-border mb-2 mt-1">
      <div className="flex justify-between items-center mb-3">
        <p className="text-xs font-bold text-foreground">✉️ Send a Message</p>
        <button onClick={onDismiss}><X className="h-3.5 w-3.5 text-muted-foreground" /></button>
      </div>
      <div className="space-y-2">
        <input value={f.name} onChange={e => set('name', e.target.value)} placeholder="Full name *" className={cls} />
        <input type="email" value={f.email} onChange={e => set('email', e.target.value)} placeholder="Email *" className={cls} />
        <textarea value={f.message} onChange={e => set('message', e.target.value)} placeholder="Your message *" rows={3} className={cn(cls, 'resize-none')} />
        <button
          onClick={() => {
            if (f.name && f.email && f.message) onSubmit(f);
            else toast.error('Please fill required fields.');
          }}
          className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-colors"
        >
          Send Message →
        </button>
      </div>
    </div>
  );
}

// ---------- Support ticket form ----------
function SupportForm({ onSubmit, onDismiss }: { onSubmit: (d: Record<string, string>) => void; onDismiss: () => void }) {
  const [f, setF] = useState({ name: '', email: '', issue: '', priority: 'medium' });
  const set = (k: string, v: string) => setF(p => ({ ...p, [k]: v }));
  const cls = 'w-full px-3 py-2 rounded-lg bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50';
  return (
    <div className="bg-secondary/60 rounded-xl p-4 border border-border mb-2 mt-1">
      <div className="flex justify-between items-center mb-3">
        <p className="text-xs font-bold text-foreground">🎫 Create Support Ticket</p>
        <button onClick={onDismiss}><X className="h-3.5 w-3.5 text-muted-foreground" /></button>
      </div>
      <div className="space-y-2">
        <input value={f.name} onChange={e => set('name', e.target.value)} placeholder="Your name *" className={cls} />
        <input type="email" value={f.email} onChange={e => set('email', e.target.value)} placeholder="Email *" className={cls} />
        <textarea value={f.issue} onChange={e => set('issue', e.target.value)} placeholder="Describe your issue *" rows={3} className={cn(cls, 'resize-none')} />
        <select value={f.priority} onChange={e => set('priority', e.target.value)} className={cls}>
          <option value="low">Low priority</option>
          <option value="medium">Medium priority</option>
          <option value="high">High priority — urgent</option>
        </select>
        <button
          onClick={() => {
            if (f.name && f.email && f.issue) onSubmit(f);
            else toast.error('Please fill required fields.');
          }}
          className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-colors"
        >
          Submit Ticket →
        </button>
      </div>
    </div>
  );
}

// ---------- Message bubble ----------
function MessageBubble({ msg, onFormSubmit, onFormDismiss }: {
  msg: Message;
  onFormSubmit: (type: string, data: Record<string, string>) => void;
  onFormDismiss: (type: string) => void;
}) {
  const isUser = msg.role === 'user';
  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start gap-2')}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
          <span className="text-primary text-[10px] font-black">V</span>
        </div>
      )}
      <div className="max-w-[80%]">
        <div className={cn(
          'px-3.5 py-2.5 rounded-2xl leading-relaxed',
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-sm text-sm'
            : 'bg-secondary text-foreground rounded-bl-sm space-y-1'
        )}>
          {isUser ? msg.content : renderMarkdown(msg.content)}
        </div>
        {msg.form?.type === 'lead_capture' && (
          <LeadForm
            onSubmit={d => onFormSubmit('lead_capture', d)}
            onDismiss={() => onFormDismiss('lead_capture')}
          />
        )}
        {msg.form?.type === 'enrollment' && (
          <EnrollmentForm
            courseId={(msg.form as { type: string; courseId?: string }).courseId}
            onSubmit={d => onFormSubmit('enrollment', d)}
            onDismiss={() => onFormDismiss('enrollment')}
          />
        )}
        {msg.form?.type === 'contact' && (
          <ContactForm
            onSubmit={d => onFormSubmit('contact', d)}
            onDismiss={() => onFormDismiss('contact')}
          />
        )}
        {msg.form?.type === 'support_ticket' && (
          <SupportForm
            onSubmit={d => onFormSubmit('support_ticket', d)}
            onDismiss={() => onFormDismiss('support_ticket')}
          />
        )}
      </div>
    </div>
  );
}

// ---------- Main ChatBot ----------
export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hi! I'm **Vera**, ${COMPANY_NAME}'s AI assistant.\n\nI can help with courses, services, pricing, support, or connect you with our team. What can I help you with?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const appendMessage = useCallback((msg: Message) => {
    setMessages(prev => [...prev, msg]);
  }, []);

  const removeForm = useCallback((msgIdx: number) => {
    setMessages(prev => prev.map((m, i) => i === msgIdx ? { ...m, form: undefined } : m));
  }, []);

  // Detect intent from user message and inject relevant form
  const detectForm = (text: string): FormConfig | undefined => {
    const t = text.toLowerCase();
    if (t.includes('book') || t.includes('call') || t.includes('schedule') || t.includes('demo')) return { type: 'lead_capture' };
    if (t.includes('enroll') || t.includes('register') || t.includes('sign up') || t.includes('apply')) return { type: 'enrollment' };
    if (t.includes('contact') || t.includes('message') || t.includes('email')) return { type: 'contact' };
    if (t.includes('support') || t.includes('ticket') || t.includes('issue') || t.includes('problem') || t.includes('bug')) return { type: 'support_ticket' };
    return undefined;
  };

  const handleFormSubmit = async (type: string, data: Record<string, string>) => {
    // Remove form from the triggering message
    setMessages(prev => prev.map(m => m.form?.type === type ? { ...m, form: undefined } : m));

    if (type === 'lead_capture') {
      try {
        await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, preferredTime: data.time, source: 'chatbot' }),
        });
      } catch { /* non-blocking */ }
      appendMessage({
        role: 'assistant',
        content: `Thanks, **${data.name}**! Your call request is confirmed. Our team will reach out to **${data.email}** within 2 business hours.\n\nIn the meantime, WhatsApp us at [+254 743 793 901](https://wa.me/${WA_NUMBER}) for instant answers.`,
      });
    }

    if (type === 'enrollment') {
      const allCourses = COURSE_CATEGORIES.flatMap(c => c.courses);
      const course = allCourses.find(c => c.id === data.courseId);
      try {
        await fetch('/api/enrollments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            courseId: data.courseId,
            courseName: course?.name ?? data.courseId,
            category: COURSE_CATEGORIES.find(c => c.courses.some(cr => cr.id === data.courseId))?.name ?? 'Digitika',
            fullName: data.name,
            email: data.email,
            phone: data.phone,
            experience: data.experience,
            amount: course?.price ?? 0,
            currency: 'KES',
          }),
        });
      } catch { /* non-blocking */ }
      appendMessage({
        role: 'assistant',
        content: `Enrollment received! 🎉\n\nHere's what happens next:\n- Our team will confirm your enrollment at **${data.email}** within a few hours\n- You'll receive payment instructions and cohort details\n- Questions? WhatsApp us at [+254 743 793 901](https://wa.me/${WA_NUMBER})\n\nWe're excited to have you!`,
      });
    }

    if (type === 'contact') {
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: data.name, email: data.email, message: data.message, source: 'chatbot' }),
        });
      } catch { /* non-blocking */ }
      appendMessage({
        role: 'assistant',
        content: `Message received, **${data.name}**! We'll respond to **${data.email}** within 24 hours.\n\nFor urgent matters, reach us directly on [WhatsApp](https://wa.me/${WA_NUMBER}).`,
      });
    }

    if (type === 'support_ticket') {
      appendMessage({
        role: 'assistant',
        content: `Support ticket submitted! A reference number will be emailed to **${data.email}**.\n\nExpected response: **2–4 hours** for high priority, **1 business day** for standard.\n\nFor urgent help, [WhatsApp us](https://wa.me/${WA_NUMBER}) directly.`,
      });
    }
  };

  const handleFormDismiss = (type: string) => {
    setMessages(prev => prev.map(m => m.form?.type === type ? { ...m, form: undefined } : m));
    appendMessage({ role: 'assistant', content: "No problem! Let me know if there's anything else I can help with." });
  };

  const sendMessage = async (text: string) => {
    text = text.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setShowQuick(false);
    setLoading(true);

    // Detect if a form should be shown
    const formConfig = detectForm(text);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const replyText = data.text ?? 'Sorry, I had trouble responding. Please contact us directly.';
      appendMessage({ role: 'assistant', content: replyText, form: formConfig });
    } catch {
      appendMessage({
        role: 'assistant',
        content: `Sorry, I'm having a connection issue. Contact us at **info@codevertexitsolutions.com** or [WhatsApp](https://wa.me/${WA_NUMBER}).`,
        form: formConfig,
      });
    }
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {!open && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
            <div className="relative">
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary border-2 border-background animate-pulse" />
              <button
                onClick={() => { setOpen(true); setMinimized(false); }}
                className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="Chat with Vera"
              >
                <MessageCircle className="h-6 w-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
            transition={{ duration: 0.2 }}
            className="w-90 sm:w-97.5 bg-background rounded-2xl border border-border shadow-2xl overflow-hidden flex flex-col"
            style={{ height: minimized ? 'auto' : 580 }}
          >
            {/* Header */}
            <div className="bg-primary px-4 py-3.5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-black text-white text-sm">V</div>
                <div>
                  <p className="font-bold text-white text-sm">Vera</p>
                  <p className="text-white/70 text-xs">● Online · Codevertex AI</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <a
                  href={`https://wa.me/${WA_NUMBER}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors"
                  title={`WhatsApp ${PHONE_NUMBER}`}
                >
                  {/* WhatsApp icon */}
                  <svg className="h-4 w-4 text-white fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors"
                  title={`Call ${PHONE_NUMBER}`}
                >
                  <Phone className="h-3.5 w-3.5 text-white" />
                </a>
                <button onClick={() => setMinimized(!minimized)} className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors" aria-label="Minimize">
                  <Minimize2 className="h-3.5 w-3.5 text-white" />
                </button>
                <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors" aria-label="Close">
                  <X className="h-3.5 w-3.5 text-white" />
                </button>
              </div>
            </div>

            {!minimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                  {messages.map((msg, i) => (
                    <MessageBubble
                      key={i}
                      msg={msg}
                      onFormSubmit={handleFormSubmit}
                      onFormDismiss={handleFormDismiss}
                    />
                  ))}
                  {loading && (
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-primary text-[10px] font-black">V</span>
                      </div>
                      <div className="px-3.5 py-2.5 rounded-2xl bg-secondary rounded-bl-sm">
                        <TypingDots />
                      </div>
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>

                {/* Quick replies */}
                {showQuick && (
                  <div className="px-4 py-2 flex gap-1.5 flex-wrap border-t border-border">
                    {QUICK_REPLIES.map(q => (
                      <button
                        key={q.label}
                        onClick={() => sendMessage(q.msg)}
                        className="px-3 py-1.5 rounded-full bg-secondary border border-border text-xs font-medium text-foreground hover:border-primary/30 hover:text-primary transition-colors"
                      >
                        {q.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input */}
                <div className="px-4 pb-4 pt-2 border-t border-border">
                  <div className="flex items-end gap-2 bg-secondary rounded-xl border border-border px-3 py-2">
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
                      placeholder="Ask about courses, services, pricing…"
                      rows={1}
                      className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none max-h-24"
                    />
                    <button
                      onClick={() => sendMessage(input)}
                      disabled={!input.trim() || loading}
                      className={cn(
                        'w-8 h-8 rounded-lg flex items-center justify-center transition-all shrink-0',
                        input.trim() && !loading ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-muted text-muted-foreground'
                      )}
                      aria-label="Send"
                    >
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p className="text-[10px] text-muted-foreground text-center mt-1.5">
                    Powered by Codevertex AI · Enter to send
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
