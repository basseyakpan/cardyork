const STATS = [
  { value: '50,000+', label: 'Happy Traders', icon: '👥' },
  { value: '₦2B+', label: 'Total Payouts', icon: '💰' },
  { value: '< 5 min', label: 'Avg. Payout Time', icon: '⚡' },
  { value: '99.9%', label: 'Uptime SLA', icon: '🛡️' },
];

export default function StatsSection() {
  return (
    <section className="py-12 bg-surface-container-low">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {STATS.map((s, i) => (
          <div key={s.label} className={`glass-card-sm p-6 flex flex-col items-center text-center animate-fade-in delay-${(i + 1) * 100}`}>
            <span className="text-2xl mb-3">{s.icon}</span>
            <span className="gradient-text text-2xl md:text-3xl font-extrabold mb-1 tracking-tight">{s.value}</span>
            <span className="text-on-surface-variant text-xs md:text-sm font-medium uppercase tracking-wider">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

