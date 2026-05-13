const CLIENTS = [
  { name: 'Maseno University (MUCISA)', detail: '120+ students upskilled in coding & digital entrepreneurship' },
  { name: 'Digital Economy ICT Initiative', detail: '200+ corporate staff trained under national programme' },
  { name: 'Danka Africa Ltd', detail: 'End-to-end digital transformation, regional energy sector' },
  { name: 'KCA University', detail: 'Long-term strategic technology & training partnership' },
  { name: 'Future Hubs Kenya', detail: 'Collaborative training delivery and technology development' },
];

const ADVANTAGES = [
  { title: 'End-to-End Value Chain', desc: 'Software engineering, AI, cloud infrastructure, hosting, domains, and talent development — one true partner from MVP to scale.' },
  { title: 'Security & Compliance', desc: 'OAuth 2.0, OpenID Connect, AES-256 encryption, and secure-by-design principles at every layer of the stack.' },
  { title: 'Modular Scalability', desc: 'SSO-centric architecture enables rapid onboarding of new SaaS modules without disrupting existing client workflows.' },
  { title: 'AI-Native Orientation', desc: 'Deep investment in generative AI and analytics positions clients for the intelligent economy — not just today\'s requirements.' },
];

export function TrustSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto space-y-14">

        {/* Clients + Advantages */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-6">Institutional partners</p>
            <div className="flex flex-col gap-3">
              {CLIENTS.map((c) => (
                <div key={c.name} className="flex gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/20 transition-colors">
                  <div className="w-1 rounded-full bg-primary shrink-0" />
                  <div>
                    <p className="font-bold text-foreground text-sm">{c.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{c.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-6">Our edge</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ADVANTAGES.map((a) => (
                <div key={a.title} className="p-5 rounded-xl bg-card border border-border hover:border-primary/20 transition-colors">
                  <p className="font-bold text-foreground text-sm mb-2">{a.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pull quote */}
        <div className="max-w-3xl border-l-4 border-primary pl-8 py-2">
          <blockquote className="text-2xl sm:text-3xl font-black text-foreground leading-snug tracking-tight mb-4">
            &ldquo;Built in Kisumu. Engineered for Africa. Designed for the world.&rdquo;
          </blockquote>
          <cite className="not-italic text-sm text-muted-foreground font-medium">
            Codevertex IT Solutions — Pioneer House, Oginga Street, Kisumu
          </cite>
        </div>
      </div>
    </section>
  );
}
