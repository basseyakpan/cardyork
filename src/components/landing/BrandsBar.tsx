const BRANDS = [
  { label: 'Amazon', logo: 'amazon' },
  { label: 'Apple', logo: 'apple' },
  { label: 'Google Play', logo: 'google-play' },
  { label: 'Steam', logo: 'steam' },
  { label: 'Sephora', logo: 'sephora' },
  { label: 'Nike', logo: 'nike' },
];

export default function BrandsBar() {
  return (
    <section className="py-8 border-y border-outline-variant bg-white/60 dark:bg-surface-container-low/40 backdrop-blur-sm">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="text-center text-sm text-on-surface-variant font-medium mb-6 uppercase tracking-widest">
          We accept all major gift cards
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {/* Amazon */}
          <div className="flex items-center gap-1 text-on-surface-variant hover:text-on-surface transition-colors">
            <span className="text-2xl font-black tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>amazon</span>
          </div>
          {/* Apple */}
          <div className="text-on-surface-variant hover:text-on-surface transition-colors">
            <span className="text-2xl">🍎</span>
          </div>
          {/* Google Play */}
          <div className="text-on-surface-variant hover:text-on-surface transition-colors">
            <span className="text-2xl">▶️</span>
          </div>
          {/* Steam */}
          <div className="flex items-center text-on-surface-variant hover:text-on-surface transition-colors">
            <span className="text-xl font-black tracking-widest uppercase">STEAM</span>
          </div>
          {/* Sephora */}
          <div className="flex items-center text-on-surface-variant hover:text-on-surface transition-colors">
            <span className="text-xl font-bold tracking-widest uppercase">SEPHORA</span>
          </div>
          {/* Nike */}
          <div className="text-on-surface-variant hover:text-on-surface transition-colors">
            <span className="text-3xl font-black italic" style={{ fontFamily: 'Georgia, serif' }}>✓</span>
          </div>
          <span className="text-on-surface-variant text-sm font-medium">… and more</span>
        </div>
      </div>
    </section>
  );
}
