import Link from 'next/link';
import { FaApple, FaGooglePlay, FaAmazon, FaSteam } from 'react-icons/fa';
import { FiSearch, FiZap, FiBell, FiMusic, FiCreditCard } from 'react-icons/fi';

export default function AppDownloadSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-[#e8f0ff] via-transparent to-transparent dark:from-primary/5 pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left: Phone mockup showing rates */}
        <div className="relative flex justify-center items-center order-last lg:order-first">
          <div className="absolute w-64 h-64 bg-primary/15 blur-[80px] rounded-full" />

          <div className="relative z-10 w-[240px] sm:w-[260px]">
            <div className="relative bg-gray-900 rounded-[44px] p-[3px] shadow-[0_40px_100px_rgba(30,91,255,0.2),0_20px_40px_rgba(0,0,0,0.3)] border border-primary/30">
              <div className="bg-[#0b1120] rounded-[42px] overflow-hidden">
                {/* Notch */}
                <div className="flex items-center justify-between px-5 pt-3 pb-1">
                  <span className="text-[9px] font-bold text-white/60">9:41</span>
                  <div className="w-14 h-3 bg-black rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-2" />
                </div>

                <div className="px-4 pb-6 pt-1">
                  {/* Rates header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[12px] font-extrabold text-white">Rates</span>
                    <div className="flex items-center gap-2 bg-[#141e35] rounded-lg px-2 py-1">
                      <FiSearch className="w-3 h-3 text-white/50" />
                      <span className="text-[9px] text-white/50">Search Gift Card</span>
                    </div>
                  </div>

                  {/* Balance reminder */}
                  <div className="rounded-xl bg-gradient-to-br from-primary to-blue-700 p-3 mb-3 text-white flex justify-between items-center">
                    <div>
                      <p className="text-[7px] opacity-60 uppercase tracking-widest">Available</p>
                      <p className="text-[13px] font-black">₦245,680</p>
                    </div>
                    <span className="text-[10px] opacity-50">→</span>
                  </div>

                  {/* Rates list */}
                  <div className="flex flex-col gap-2">
                    {[
                      { name: 'Amazon', Icon: FaAmazon, rate: '₦1,450', bg: 'from-[#ff9900] to-[#ff6600]', grade: '$1' },
                      { name: 'iTunes', Icon: FiMusic, rate: '₦1,430', bg: 'from-pink-500 to-rose-600', grade: '$1' },
                      { name: 'Steam', Icon: FaSteam, rate: '₦1,300', bg: 'from-gray-700 to-slate-900', grade: '$1' },
                      { name: 'Google Play', Icon: FaGooglePlay, rate: '₦1,380', bg: 'from-green-600 to-emerald-700', grade: '$1' },
                      { name: 'Sephora', Icon: undefined, textIcon: 'S', rate: '₦1,200', bg: 'from-black to-gray-800', grade: '$1' },
                    ].map(item => (
                      <div key={item.name} className="flex items-center justify-between bg-[#141e35] rounded-xl px-3 py-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${item.bg} flex items-center justify-center text-white font-bold text-[10px]`}>
                            {item.Icon ? <item.Icon className="w-3 h-3" /> : item.textIcon}
                          </div>
                          <div>
                            <p className="text-[9px] font-bold text-white">{item.name}</p>
                            <p className="text-[7px] text-white/40">Store</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-extrabold text-green-400">{item.rate}/{item.grade}</span>
                          <span className="text-[7px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full font-bold">Sell</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -right-[4px] top-24 w-[3px] h-12 bg-gray-700 rounded-r-full" />
            <div className="absolute -left-[4px] top-20 w-[3px] h-8 bg-gray-700 rounded-l-full" />
            <div className="absolute -left-[4px] top-32 w-[3px] h-8 bg-gray-700 rounded-l-full" />
          </div>
        </div>

        {/* Right: Text */}
        <div className="flex flex-col items-start">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary mb-3">MOBILE APP</span>
          <h2 className="display-sm mb-6">
            Trade On{' '}
            <span className="gradient-text">The Go</span>
          </h2>
          <p className="text-on-surface-variant text-lg leading-relaxed mb-8 max-w-[460px]">
            Download the Cardyork app and trade anytime, anywhere.
          </p>

          {/* Store badges */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="#"
              className="flex items-center gap-3 bg-black text-white px-5 py-3 rounded-xl hover:opacity-90 transition-opacity shadow-lg"
            >
              <FaApple className="text-2xl" />
              <div className="flex flex-col leading-tight">
                <span className="text-[9px] font-medium uppercase tracking-widest opacity-70">Download on the</span>
                <span className="font-bold text-sm">App Store</span>
              </div>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 bg-black text-white px-5 py-3 rounded-xl hover:opacity-90 transition-opacity shadow-lg"
            >
              <FaGooglePlay className="text-2xl" />
              <div className="flex flex-col leading-tight">
                <span className="text-[9px] font-medium uppercase tracking-widest opacity-70">GET IT ON</span>
                <span className="font-bold text-sm">Google Play</span>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
