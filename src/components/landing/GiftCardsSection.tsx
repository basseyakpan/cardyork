'use client';
import Link from 'next/link';
import { MOCK_GIFT_CARDS } from '@/store/slices/tradeSlice';

export default function GiftCardsSection() {
  const popularCards = MOCK_GIFT_CARDS.filter(c => c.popular);

  return (
    <section className="section py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
          <div className="flex flex-col items-start text-left">
            <span className="chip chip-secondary mb-4">Best Rates</span>
            <h2 className="display-sm">Trending <span className="gradient-text-green">Gift Cards</span></h2>
            <p className="text-on-surface-variant text-base mt-2 max-w-[480px]">Check out our current rates for the most traded cards in the vault.</p>
          </div>
          <Link href="/sell-gift-cards" className="btn btn-ghost hidden md:inline-flex">View All Brands</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularCards.map((card, i) => (
            <div key={card.id} className={`glass-card p-6 flex flex-col gap-8 animate-fade-in delay-${i * 100}`}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-2xl border border-primary/10">{card.icon}</div>
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold text-on-surface">{card.name}</h3>
                  <span className="text-xs uppercase tracking-widest text-on-surface-variant font-medium">{card.category}</span>
                </div>
              </div>
              
              <div className="flex items-end justify-between">
                <div className="flex flex-col">
                  <span className="text-xs text-on-surface-variant font-medium uppercase mb-1">Current Rate</span>
                  <span className="text-xl font-extrabold text-secondary">₦{card.ratePerDollar.toLocaleString()} / $1</span>
                </div>
                <div className="flex items-center gap-1 text-secondary text-sm font-bold bg-secondary/10 px-2 py-1 rounded-md">
                  <span className="text-lg leading-none">↗</span>
                  <span>+2.4%</span>
                </div>
              </div>

              <Link href={`/sell-gift-cards/${card.id}`} className="btn btn-outline-primary w-full group">
                Trade {card.brand}
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          ))}
        </div>

        <div className="md:hidden mt-8 text-center">
          <Link href="/sell-gift-cards" className="btn btn-ghost w-full">View All Brands</Link>
        </div>
      </div>
    </section>
  );
}

