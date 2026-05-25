import Link from 'next/link';

export default function AppDownloadSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-secondary/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text content */}
          <div className="flex flex-col items-start">
            <span className="chip chip-primary mb-6">📱 Mobile App</span>
            <h2 className="display-sm mb-6">
              Sell Gift Cards<br />
              <span className="gradient-text">On the Go</span>
            </h2>
            <p className="text-on-surface-variant text-lg leading-relaxed mb-8 max-w-[460px]">
              Get the CardYork app and sell your gift cards instantly from anywhere.
              Real-time rate notifications, one-tap submissions, and instant payouts — all in your pocket.
            </p>

            {/* Feature pills */}
            <ul className="flex flex-col gap-3 mb-10">
              {[
                { icon: '⚡', text: 'Instant rate alerts & notifications' },
                { icon: '🔒', text: 'Biometric login & bank-level security' },
                { icon: '💸', text: 'Track payouts in real time' },
              ].map(f => (
                <li key={f.text} className="flex items-center gap-3 text-on-surface-variant text-sm font-medium">
                  <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-base flex-shrink-0">{f.icon}</span>
                  {f.text}
                </li>
              ))}
            </ul>

            {/* Store badges */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="#"
                className="flex items-center gap-3 glass-card-sm px-5 py-3 hover:border-primary/40 hover:bg-primary/5 transition-all group"
              >
                <span className="text-2xl">🍎</span>
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] text-on-surface-variant font-medium uppercase tracking-widest">Download on the</span>
                  <span className="text-on-surface font-bold text-sm">App Store</span>
                </div>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 glass-card-sm px-5 py-3 hover:border-secondary/40 hover:bg-secondary/5 transition-all group"
              >
                <span className="text-2xl">▶️</span>
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] text-on-surface-variant font-medium uppercase tracking-widest">Get it on</span>
                  <span className="text-on-surface font-bold text-sm">Google Play</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Right: Phone mockup */}
          <div className="relative flex justify-center items-center">
            {/* Glow behind phone */}
            <div className="absolute w-72 h-72 bg-primary/15 blur-[80px] rounded-full" />

            {/* Phone frame */}
            <div className="relative z-10 w-[260px]">
              {/* Outer shell */}
              <div className="relative bg-surface-container rounded-[44px] p-[3px] shadow-[0_40px_80px_rgba(0,0,0,0.35)] border border-primary/20">
                {/* Inner bezel */}
                <div className="bg-surface-container-low rounded-[42px] overflow-hidden">
                  {/* Status bar */}
                  <div className="flex items-center justify-between px-6 pt-4 pb-2">
                    <span className="text-[10px] font-bold text-on-surface-variant">9:41</span>
                    <div className="w-20 h-5 bg-surface-container rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-3" />
                    <div className="flex gap-1 items-center">
                      <div className="flex gap-[2px] items-end h-3">
                        <div className="w-[3px] bg-on-surface-variant/60 rounded-sm" style={{ height: '40%' }} />
                        <div className="w-[3px] bg-on-surface-variant/60 rounded-sm" style={{ height: '60%' }} />
                        <div className="w-[3px] bg-on-surface-variant/60 rounded-sm" style={{ height: '80%' }} />
                        <div className="w-[3px] bg-on-surface rounded-sm" style={{ height: '100%' }} />
                      </div>
                    </div>
                  </div>

                  {/* App screen content */}
                  <div className="px-4 pb-6 pt-2 flex flex-col gap-3">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <p className="text-[10px] text-on-surface-variant font-medium">Good morning 👋</p>
                        <p className="text-sm font-extrabold text-on-surface">CardYork</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white text-xs font-bold">J</div>
                    </div>

                    {/* Balance card */}
                    <div className="rounded-2xl bg-gradient-to-br from-primary to-primary-dim p-4 text-white">
                      <p className="text-[9px] font-bold uppercase tracking-widest opacity-70 mb-0.5">Available Balance</p>
                      <p className="text-xl font-black">₦12,450,000</p>
                      <p className="text-[9px] opacity-60 mt-1">**** **** **** 4821</p>
                    </div>

                    {/* Quick actions */}
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { icon: '💳', label: 'Sell' },
                        { icon: '💸', label: 'Withdraw' },
                        { icon: '📊', label: 'Rates' },
                      ].map(a => (
                        <div key={a.label} className="flex flex-col items-center gap-1 p-2 rounded-xl bg-surface-container-high">
                          <span className="text-base">{a.icon}</span>
                          <span className="text-[9px] font-bold text-on-surface-variant">{a.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Recent transactions */}
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Recent</p>
                      <div className="flex flex-col gap-2">
                        {[
                          { name: 'Amazon Card', amount: '₦158,000', status: 'paid' },
                          { name: 'iTunes Card', amount: '₦81,000', status: 'paid' },
                          { name: 'Steam Card', amount: '₦46,200', status: 'pending' },
                        ].map(t => (
                          <div key={t.name} className="flex items-center justify-between py-1.5 border-b border-primary/5 last:border-0">
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[8px]">💳</div>
                              <span className="text-[9px] font-bold text-on-surface">{t.name}</span>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="text-[9px] font-extrabold text-secondary">{t.amount}</span>
                              <span className={`text-[7px] font-bold uppercase ${t.status === 'paid' ? 'text-secondary' : 'text-tertiary'}`}>{t.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Side buttons */}
              <div className="absolute -right-[4px] top-24 w-[3px] h-12 bg-surface-container-high rounded-r-full" />
              <div className="absolute -left-[4px] top-20 w-[3px] h-8 bg-surface-container-high rounded-l-full" />
              <div className="absolute -left-[4px] top-32 w-[3px] h-8 bg-surface-container-high rounded-l-full" />
              <div className="absolute -left-[4px] top-44 w-[3px] h-8 bg-surface-container-high rounded-l-full" />
            </div>

            {/* Floating notification bubble */}
            <div className="absolute -right-4 top-12 glass-card-sm px-4 py-2.5 flex items-center gap-2.5 shadow-xl border border-secondary/20 animate-float">
              <span className="text-secondary text-lg">💸</span>
              <div className="flex flex-col">
                <span className="text-[10px] font-extrabold text-on-surface">₦81,000 received!</span>
                <span className="text-[9px] text-on-surface-variant">iTunes Card • Just now</span>
              </div>
            </div>

            {/* Rating bubble */}
            <div className="absolute -left-6 bottom-16 glass-card-sm px-3 py-2 flex items-center gap-2 shadow-xl border border-primary/20 animate-float" style={{ animationDelay: '0.5s' }}>
              <span className="text-yellow-400">★★★★★</span>
              <span className="text-[9px] font-bold text-on-surface">50K+ users</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
