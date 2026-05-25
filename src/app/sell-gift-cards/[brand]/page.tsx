'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MOCK_GIFT_CARDS } from '@/store/slices/tradeSlice';
import BrandLogo from '@/components/BrandLogo';

export default function SellBrandPage() {
  const params = useParams();
  const brandSlug = params.brand as string;
  
  // Find the card in our mock data
  const card = MOCK_GIFT_CARDS.find(c => c.id.includes(brandSlug)) || MOCK_GIFT_CARDS[0];

  // Calculator state
  const [amount, setAmount] = useState(String(card.minAmount));
  const numAmount = parseFloat(amount) || 0;
  const nairaValue = numAmount * card.ratePerDollar;
  const isBelow = numAmount > 0 && numAmount < card.minAmount;
  const isAbove = numAmount > card.maxAmount;
  const isValid = numAmount >= card.minAmount && numAmount <= card.maxAmount;

  return (
    <main className="bg-background min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 py-20 px-6">
        <div className="max-w-[1000px] mx-auto">
          <div className="glass-card p-10 flex flex-col md:flex-row items-center gap-12 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <div className="w-40 h-40 rounded-3xl bg-surface-container-high flex items-center justify-center border border-primary/10 shadow-glow-primary animate-float">
              <BrandLogo id={card.id} fallback={card.icon} className="w-20 h-20" />
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

            {/* Interactive Payout Calculator */}
            <div className="glass-card p-8 bg-secondary/5 border-secondary/20">
              <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                <span className="text-secondary">📊</span> Payout Calculator
              </h3>
              <p className="text-xs text-on-surface-variant mb-6 uppercase tracking-widest font-semibold">
                Live rate · ₦{card.ratePerDollar.toLocaleString()} per $1
              </p>

              {/* Amount input */}
              <div className="input-group mb-4">
                <label className="input-label">Amount (USD)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold text-lg">$</span>
                  <input
                    id="calc-amount"
                    type="number"
                    min={card.minAmount}
                    max={card.maxAmount}
                    step="1"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    className={`input-field pl-10 text-xl font-bold ${
                      isBelow || isAbove
                        ? 'border-error/60 ring-2 ring-error/20'
                        : isValid
                        ? 'border-secondary/40 ring-2 ring-secondary/10'
                        : ''
                    }`}
                    placeholder={String(card.minAmount)}
                  />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[11px] text-on-surface-variant">
                    Min: <strong>${card.minAmount}</strong> · Max: <strong>${card.maxAmount.toLocaleString()}</strong>
                  </span>
                  {isBelow && (
                    <span className="text-[11px] text-error font-semibold">Below minimum</span>
                  )}
                  {isAbove && (
                    <span className="text-[11px] text-error font-semibold">Exceeds maximum</span>
                  )}
                </div>
              </div>

              {/* Live payout preview */}
              <div className={`rounded-xl p-5 mb-6 text-center transition-all duration-300 ${
                isValid
                  ? 'bg-gradient-to-br from-secondary/15 to-secondary/5 border border-secondary/20'
                  : 'bg-surface-container-high/50 border border-outline-variant'
              }`}>
                <span className="block text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-1">You Receive</span>
                <span className={`block text-4xl font-black transition-colors duration-300 ${
                  isValid ? 'text-secondary' : 'text-on-surface-variant'
                }`}>
                  {isValid ? `₦${nairaValue.toLocaleString()}` : '—'}
                </span>
              </div>

              <Link
                href={isValid ? '/register' : '#'}
                aria-disabled={!isValid}
                className={`btn w-full text-base ${
                  isValid
                    ? 'btn-secondary shadow-[0_4px_20px_rgba(63,255,139,0.3)]'
                    : 'btn-ghost opacity-50 cursor-not-allowed pointer-events-none'
                }`}
              >
                {isValid ? `Sell $${numAmount} — Get ₦${nairaValue.toLocaleString()}` : 'Enter a valid amount'}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
