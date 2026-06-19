'use client';
import Link from 'next/link';
import Image from 'next/image';
import { FiShield, FiZap, FiHeadphones } from 'react-icons/fi';

const TRUST_BADGES = [
  { Icon: FiShield, label: '100% Secure', sub: 'Your safety is our priority' },
  { Icon: FiZap, label: 'Instant Payment', sub: 'Get paid in minutes' },
  { Icon: FiHeadphones, label: '24/7 Support', sub: "We're always here to help you" },
];

export default function HeroSection() {
  return (
    <section className="relative lg:min-h-screen block lg:flex lg:items-center pt-20 lg:pt-28 pb-8 lg:pb-12 overflow-hidden bg-background">
      {/* Soft blue gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e8f0ff] via-[#f4f7ff] to-[#eaf3ff] dark:from-[#000822] dark:via-[#000f3a] dark:to-[#000822] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[55%] h-full bg-gradient-to-l from-blue-100/60 via-transparent to-transparent dark:from-primary/10 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 flex flex-col lg:flex-row items-center justify-between">

        {/* ── Left: Copy ── */}
        <div className="w-full lg:w-1/2 flex flex-col items-start pt-4 lg:pt-0 relative z-20">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/80 dark:bg-surface-container border border-primary/20 shadow-sm">
            <span className="text-xs text-on-surface-variant font-semibold">✦ Gift Card Trading Platform in Nigeria</span>
          </div>

          <h1 className="text-[clamp(2.4rem,5.5vw,4rem)] font-extrabold tracking-tight leading-[1.1] text-on-surface mb-5">
            Trade Gift Cards.<br />
            Get Paid <span className="text-primary">Instantly.</span>
          </h1>

          <p className="text-on-surface-variant text-lg leading-relaxed mb-8 max-w-[480px]">
            Sell your gift cards for the best rates and get paid instantly to your bank or wallet. Safe, fast and reliable.
          </p>

          <div className="flex flex-row w-full sm:w-auto items-center gap-3 sm:gap-4 mb-6">
            <Link href="/register" className="btn btn-primary flex-1 sm:flex-none px-4 sm:px-8 py-3.5 sm:py-4 text-[13px] sm:text-base justify-center">
              Start Trading <span className="hidden sm:inline">Now</span> →
            </Link>
            <Link
              href="/sell-gift-cards"
              className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 px-4 sm:px-8 py-3.5 sm:py-4 rounded-full text-[13px] sm:text-base font-semibold border border-primary/30 text-primary bg-white/60 dark:bg-surface-container hover:bg-primary/5 transition-all whitespace-nowrap"
            >
              Check Rates
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start w-full gap-6">
            {TRUST_BADGES.map(({ Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-on-surface">{label}</span>
                  <span className="text-[10px] text-on-surface-variant">{sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right: Hero PNG ── */}
      <div className="relative lg:absolute lg:top-0 lg:bottom-0 lg:right-0 flex justify-center lg:justify-end items-center w-full lg:w-1/2 h-[320px] sm:h-[400px] md:h-[500px] lg:h-full mt-4 lg:mt-0 pointer-events-none z-10 lg:pl-10">
          {/* Glow behind image */}
          <div className="absolute w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:left-[-4%] lg:w-[500px] lg:h-[500px] bg-primary/15 blur-[80px] lg:blur-[120px] rounded-full" />

          <div className="relative w-full h-full lg:scale-110 lg:translate-x-12 lg:translate-y-4">
            <Image
              src="/cardYorkHero.png"
              alt="CardYork Gift Card Trading App"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain object-center lg:object-right drop-shadow-2xl"
            />
          </div>
        </div>
    </section>
  );
}
