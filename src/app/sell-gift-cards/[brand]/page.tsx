'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MOCK_GIFT_CARDS } from '@/store/slices/tradeSlice';

export default function SellBrandPage() {
  const params = useParams();
  const brandSlug = params.brand as string;
  
  // Find the card in our mock data
  const card = MOCK_GIFT_CARDS.find(c => c.id.includes(brandSlug)) || MOCK_GIFT_CARDS[0];

  return (
    <main className="bg-background min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 py-20 px-6">
        <div className="max-w-[1000px] mx-auto">
          <div className="glass-card p-10 flex flex-col md:flex-row items-center gap-12 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <div className="w-40 h-40 rounded-3xl bg-surface-container-high flex items-center justify-center text-7xl border border-primary/10 shadow-glow-primary animate-float">
              {card.icon}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <span className="chip chip-primary mb-4">Sell {card.brand}</span>
              <h1 className="display-sm mb-4">Trade Your <span className="gradient-text">{card.brand} Gift Cards</span></h1>
              <p className="text-on-surface-variant text-lg mb-8 leading-relaxed">
                Looking for where to sell your {card.brand} gift card at the highest rate in Nigeria? CardYork Vanguard offers instant verification and payouts for all {card.brand} card types.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <Link href="/login" className="btn btn-primary btn-lg px-10">Trade Now</Link>
                <button className="btn btn-ghost btn-lg">View Today's Rate</button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="text-secondary">🛡️</span> Trading Security
              </h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                All {card.brand} trades are processed through our encrypted Luminous Archive. We ensure your codes are protected and payment is dispatched the moment verification is complete.
              </p>
              <ul className="flex flex-col gap-4">
                <li className="flex items-center gap-3 text-xs font-bold text-on-surface">
                  <span className="text-primary">⚡</span> Instant Verification
                </li>
                <li className="flex items-center gap-3 text-xs font-bold text-on-surface">
                  <span className="text-primary">💰</span> Best Market Rates
                </li>
                <li className="flex items-center gap-3 text-xs font-bold text-on-surface">
                  <span className="text-primary">🔄</span> 24/7 Availability
                </li>
              </ul>
            </div>

            <div className="glass-card p-8 bg-secondary/5 border-secondary/10">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="text-secondary">📊</span> Live Exchange Rate
              </h3>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-4xl font-black text-secondary">₦{card.ratePerDollar}</span>
                <span className="text-on-surface-variant font-bold mb-1">/ $1.00</span>
              </div>
              <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest mb-8">
                * Rates are dynamic and may vary based on card denomination.
              </p>
              <Link href="/register" className="btn btn-secondary w-full">Create Free Account</Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
