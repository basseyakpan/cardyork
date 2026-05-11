'use client';
import Link from 'next/link';
import { useState } from 'react';
import { MOCK_GIFT_CARDS } from '@/store/slices/tradeSlice';

export default function HeroSection() {
  const [amount, setAmount] = useState('100');
  const [selectedCard, setSelectedCard] = useState(MOCK_GIFT_CARDS[0]);
  const nairaValue = (parseFloat(amount) || 0) * selectedCard.ratePerDollar;

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-16 overflow-hidden">
      {/* Ambient background orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-[20%] left-[10%] w-[30%] h-[30%] bg-primary/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-16 relative z-10">
        <div className="flex flex-col items-start text-left">
          {/* Badge */}
          <div className="chip chip-primary animate-fade-in mb-6">
            <span>⚡</span> Payments in under 5 minutes
          </div>

          {/* Headline */}
          <h1 className="display-lg animate-fade-in delay-100 mb-6">
            Turn Gift Cards<br />
            into <span className="gradient-text">Instant Cash</span>
          </h1>

          <p className="body-lg animate-fade-in delay-200 mb-8 max-w-[540px] text-on-surface-variant">
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

        {/* Calculator Card */}
        <div className="relative">
          <div className="glass-card animate-fade-in delay-200 p-8 md:p-10 w-full max-w-[500px] mx-auto">
            <div className="flex items-center justify-between mb-8">
              <span className="text-xl font-bold text-on-surface">Calculate Your Payout</span>
              <span className="chip chip-success">Live Rates</span>
            </div>

            <div className="flex flex-col gap-6">
              {/* Card Select */}
              <div className="input-group">
                <label className="input-label">Select Gift Card</label>
                <select
                  className="input-field cursor-pointer"
                  value={selectedCard.id}
                  onChange={e => setSelectedCard(MOCK_GIFT_CARDS.find(c => c.id === e.target.value)!)}
                >
                  {MOCK_GIFT_CARDS.filter(c => c.popular).map(c => (
                    <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                  ))}
                </select>
              </div>

              {/* Amount */}
              <div className="input-group">
                <label className="input-label">Card Amount (USD)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold text-lg">$</span>
                  <input
                    type="number"
                    className="input-field pl-10 text-xl font-bold"
                    value={amount}
                    min="1"
                    onChange={e => setAmount(e.target.value)}
                    placeholder="100"
                  />
                </div>
              </div>

              {/* Rate display */}
              <div className="flex items-center justify-between p-4 rounded-md bg-surface-container-high/50 border border-primary/5">
                <span className="text-on-surface-variant text-sm font-medium">Rate</span>
                <span className="text-primary font-bold">₦{selectedCard.ratePerDollar.toLocaleString()} / $1</span>
              </div>

              {/* Payout */}
              <div className="p-6 rounded-md bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 text-center">
                <span className="block text-on-surface-variant text-xs uppercase tracking-widest font-bold mb-1">You Receive</span>
                <span className="block text-3xl font-extrabold text-primary">
                  ₦{nairaValue > 0 ? nairaValue.toLocaleString() : '0'}
                </span>
              </div>

              <Link href="/register" className="btn btn-primary w-full py-4 text-base mt-2 shadow-glow-primary">
                Sell Now — Get Paid in 5 min
              </Link>
            </div>
          </div>

          {/* Floating card icon */}
          <div className="absolute -top-6 -right-6 w-20 h-20 glass-card-sm flex items-center justify-center animate-float shadow-2xl">
            <span className="text-4xl">{selectedCard.icon}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

