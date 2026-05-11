const TESTIMONIALS = [
  {
    name: 'Ifeanyi Uzoma',
    role: 'Freelancer',
    text: 'I’ve tried other platforms before, but none compare to Cardyork. The exchange rate was excellent, and I got my money in less than 10 minutes. Truly a stress-free experience!',
    avatar: 'IU'
  },
  {
    name: 'Sarah Adebayo',
    role: 'Digital Marketer',
    text: 'Cardyork is the only platform I trust for gift card trades. Payments are instant, customer support is responsive, and I’ve never had a single issue. Highly recommended.',
    avatar: 'SA'
  },
  {
    name: 'David Okafor',
    role: 'Business Owner',
    text: 'I was skeptical at first, but Cardyork delivered beyond my expectations. Safe, secure, and very fast. Now I trade all my gift cards here with complete confidence.',
    avatar: 'DO'
  }
];

export default function TestimonialsSection() {
  return (
    <section className="section py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="chip chip-primary mb-4">Testimonials</span>
          <h2 className="display-sm">What Our <span className="gradient-text">Customers Say</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} className={`glass-card p-8 flex flex-col animate-fade-in delay-${i * 100} relative`}>
              <div className="text-primary/20 text-6xl font-serif absolute top-4 right-8 pointer-events-none">“</div>
              <p className="text-on-surface-variant text-base leading-relaxed mb-8 relative z-10 italic">
                {t.text}
              </p>
              <div className="mt-auto flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-sm">
                  {t.avatar}
                </div>
                <div className="flex flex-col">
                  <h4 className="text-on-surface font-bold text-base leading-tight">{t.name}</h4>
                  <span className="text-primary text-xs font-medium uppercase tracking-wider">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

