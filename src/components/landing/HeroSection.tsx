'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative flex flex-col lg:min-h-screen lg:flex-row lg:items-center pt-32 pb-0 lg:pb-16 overflow-hidden">

      {/* ── Full right-half background image (stacked on mobile) ── */}
      <div className="relative w-full h-[400px] sm:h-[500px] order-last lg:order-none lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2 pointer-events-none select-none">
        <Image
          src="/cardYorkHero.png"
          alt="CardYork Premium Gift Card Trading"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-top lg:object-center"
        />
        {/* Soft left-edge fade — just enough to protect the text, image stays vivid */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent lg:bg-gradient-to-r lg:from-background lg:via-background/10 lg:to-transparent" />
        {/* Gentle bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent lg:from-background/20 lg:to-transparent" />
      </div>

      {/* ── Ambient glow orbs (left side) ── */}
      <div className="absolute top-[-10%] left-[-5%] w-[35%] h-[50%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[40%] bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 mb-8 lg:mb-0">
        <div className="flex flex-col items-start text-left max-w-[600px]">

          {/* Badge */}
          <div className="chip chip-primary animate-fade-in mb-6">
            <span>⚡</span> Payments in under 5 minutes
          </div>

          {/* Headline */}
          <h1 className="display-lg animate-fade-in delay-100 mb-6">
            Turn Gift Cards<br />
            into <span className="gradient-text">Instant Cash</span>
          </h1>

          <p className="body-lg animate-fade-in delay-200 mb-8 max-w-[520px] text-on-surface-variant">
            Trade your unused gift cards for Naira at Nigeria's best rates.
            Secure, lightning-fast, and built on vault-grade infrastructure.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto animate-fade-in delay-300 mb-12">
            <Link href="/register" className="btn btn-primary btn-lg">
              Start Trading Now →
            </Link>
            <Link href="/sell-gift-cards" className="btn btn-ghost btn-lg">
              View Rates
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 animate-fade-in delay-400">
            {['🔒 Bank-level security', '⚡ 5-min payouts', '🌟 50,000+ traders', '📞 24/7 support'].map(t => (
              <span key={t} className="text-on-surface-variant text-sm font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
