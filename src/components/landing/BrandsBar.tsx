'use client';

import Link from 'next/link';

export default function BrandsBar() {
  const brandList = [
    {
      id: 'apple',
      el: (
        <span className="text-3xl font-medium tracking-tight" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          Apple
        </span>
      ),
    },
    {
      id: 'razer',
      el: (
        <span className="text-2xl font-bold tracking-widest uppercase border-2 border-current px-3 py-1 rounded-sm" style={{ fontFamily: 'Courier New, monospace' }}>
          RAZER GOLD
        </span>
      ),
    },
    {
      id: 'footlocker',
      el: (
        <span className="text-3xl font-black uppercase tracking-tighter" style={{ fontFamily: 'Impact, sans-serif' }}>
          FOOTLOCKER
        </span>
      ),
    },
    {
      id: 'sephora',
      el: (
        <span className="text-3xl font-normal tracking-[0.3em] uppercase" style={{ fontFamily: 'Optima, "Times New Roman", serif' }}>
          SEPHORA
        </span>
      ),
    },
    {
      id: 'steam',
      el: (
        <span className="text-3xl font-extrabold tracking-[0.2em] uppercase" style={{ fontFamily: 'Trebuchet MS, sans-serif' }}>
          STEAM
        </span>
      ),
    },
    {
      id: 'xbox',
      el: (
        <span className="text-3xl font-black tracking-tighter uppercase" style={{ fontFamily: 'Impact, Arial Black, sans-serif' }}>
          XBOX
        </span>
      ),
    },
    {
      id: 'macys',
      el: (
        <span className="text-3xl font-bold uppercase tracking-wider" style={{ fontFamily: 'Georgia, serif' }}>
          MACY'S
        </span>
      ),
    },
    {
      id: 'nordstrom',
      el: (
        <span className="text-3xl font-semibold tracking-widest uppercase" style={{ fontFamily: 'Futura, "Trebuchet MS", sans-serif' }}>
          NORDSTROM
        </span>
      ),
    },
    {
      id: 'playstation',
      el: (
        <span className="text-3xl font-black italic tracking-tight" style={{ fontFamily: 'Verdana, sans-serif' }}>
          PlayStation
        </span>
      ),
    },
    {
      id: 'nike',
      el: (
        <span className="text-3xl font-black italic uppercase tracking-tighter" style={{ fontFamily: '"Arial Black", sans-serif' }}>
          NIKE
        </span>
      ),
    },
  ];

  // Duplicate 4 times to ensure seamless infinite loop
  const marqueeItems = [...brandList, ...brandList, ...brandList, ...brandList];

  return (
    <section className="py-8 border-y border-outline-variant bg-white/60 dark:bg-surface-container-low/40 backdrop-blur-sm overflow-hidden">
      {/* Scoped CSS animation to guarantee execution */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 20s linear infinite !important;
          will-change: transform;
        }
        .marquee-track:hover {
          animation-play-state: paused !important;
        }
      `}</style>

      <div className="max-w-[1200px] mx-auto px-6 mb-6">
        <p className="text-center text-sm text-on-surface-variant font-medium uppercase tracking-widest">
          We accept all major gift cards
        </p>
      </div>

      {/* Infinite Marquee Wrapper */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="marquee-track items-center gap-12 md:gap-20 whitespace-nowrap py-3">
          {marqueeItems.map((brand, idx) => (
            <div
              key={`${brand.id}-${idx}`}
              className="flex items-center text-on-surface-variant hover:text-on-surface transition-colors opacity-80 hover:opacity-100 flex-shrink-0 cursor-pointer"
            >
              {brand.el}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="text-primary hover:text-primary-dark text-sm font-bold uppercase tracking-widest no-underline hover:underline transition-colors inline-block"
        >
          See More Brands →
        </Link>
      </div>
    </section>
  );
}
