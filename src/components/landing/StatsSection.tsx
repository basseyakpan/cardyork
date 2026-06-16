import { FiUsers, FiCreditCard, FiShield, FiHeadphones } from 'react-icons/fi';

const STATS = [
  { value: '150K+', label: 'Happy Users', sub: 'Across Nigeria and beyond', Icon: FiUsers },
  { value: '500K+', label: 'Successful Trades', sub: 'Completed with satisfaction', Icon: FiCreditCard },
  { value: '99.9%', label: 'Secure Transactions', sub: 'Safety and trust always guaranteed', Icon: FiShield },
  { value: '24/7', label: 'Customer Support', sub: 'We are here whenever you need us', Icon: FiHeadphones },
];

export default function StatsSection() {
  return (
    <section className="py-10 bg-primary">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {STATS.map((s) => (
          <div key={s.label} className="flex items-center gap-4 py-4">
            <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-xl flex-shrink-0">
              <s.Icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-white text-2xl font-extrabold leading-tight">{s.value}</span>
              <span className="text-white font-semibold text-sm leading-tight">{s.label}</span>
              <span className="text-white/60 text-[10px] leading-tight mt-0.5 hidden sm:block">{s.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
