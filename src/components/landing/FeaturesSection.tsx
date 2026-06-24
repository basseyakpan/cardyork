import { FiZap, FiLock, FiHeadphones, FiTrendingUp, FiCheckCircle, FiShield } from 'react-icons/fi';

const FEATURES = [
  {
    Icon: FiZap,
    color: '#3fff8b',
    title: 'Lightning Payouts',
    desc: 'Funds dispatched to your local bank account or crypto wallet within 5 minutes of card confirmation.',
  },
  {
    Icon: FiLock,
    color: '#97a9ff',
    title: 'Secure Encryption',
    desc: 'Your assets are secured in the Luminous Archive. Bank-level encryption protects your data and transactions at all times.',
  },
  {
    Icon: FiHeadphones,
    color: '#ffa3e9',
    title: '24/7 Customer Support',
    desc: 'Our dedicated team is always available to help you at any time of the day, every day of the year.',
  },
  {
    Icon: FiTrendingUp,
    color: '#3fff8b',
    title: 'Best Market Rates',
    desc: 'We monitor the market in real-time to offer the most competitive exchange rates for all major gift card brands.',
  },
  {
    Icon: FiCheckCircle,
    color: '#97a9ff',
    title: 'Proven Track Record',
    desc: 'Years of experience and happy customers. Cardyork is built on integrity, trust, and customer satisfaction.',
  },
  {
    Icon: FiShield,
    color: '#ffa3e9',
    title: 'Fraud Protection',
    desc: 'Advanced fraud detection systems and manual verification ensure every trade is legitimate and secure.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="section py-20 bg-black/20" id="features">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16 max-w-[800px] mx-auto flex flex-col items-center">
          <span className="chip chip-primary mb-4">Why Choose CardYork</span>
          <h2 className="display-sm mb-6">
            The <span className="gradient-text">Vanguard Standard</span>
          </h2>
          <p className="text-on-surface-variant text-lg leading-relaxed">
            Exchanging gift cards doesn't have to be stressful. We've made it our mission to make the process simple, safe, and enjoyable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((f, i) => (
            <div key={f.title} className={`glass-card p-8 group animate-fade-in delay-${Math.min((i + 1) * 100, 500)}`}>
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-2xl transition-transform duration-300 group-hover:scale-110" 
                style={{ background: `${f.color}18`, border: `1px solid ${f.color}30` }}
              >
                <f.Icon style={{ color: f.color }} />
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-3">{f.title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
