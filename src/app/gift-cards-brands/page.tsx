'use client';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MOCK_GIFT_CARDS } from '@/store/slices/tradeSlice';

const BRAND_DETAILS = {
  'iTunes/Apple': 'Apple and iTunes gift cards are consistently among the highest-paying cards on CardYork. Whether it’s a physical card or an E-code, you can trade them instantly for top Naira rates.',
  'Amazon': 'Amazon gift cards are incredibly versatile and in high demand. We accept all types, including Cash Receipt, Debit Receipt, and E-codes. Amazon rates remain stable and competitive.',
  'Steam': 'Used primarily by the gaming community, Steam gift cards offer some of the best exchange rates in the market. We process physical Steam cards and wallet codes within minutes.',
  'Google Play': 'Google Play gift cards are a staple in the trading world. While some retailers struggle with these, CardYork provides a smooth experience with instant verification.',
  'Razer Gold': 'Razer Gold is a global virtual credit for gamers. It has gained massive popularity in Nigeria due to its consistently high rates and instant liquidation potential.',
  'Sephora/Nordstrom': 'These retail-specific cards often command premium rates because of their niche market value. If you have these, you’re sitting on high-value digital assets.',
};

export default function GiftCardBrandsPage() {
  return (
    <main className="bg-background min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <span className="chip chip-secondary mb-4">Market Inventory</span>
            <h1 className="display-sm mb-6">Best Gift Cards to <span className="gradient-text">Sell in Nigeria</span></h1>
            <p className="text-on-surface-variant text-lg max-w-[700px] mx-auto">Explore our extensive list of accepted brands. We offer the best market rates for every card type in the vault.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_GIFT_CARDS.map((card) => (
              <div key={card.id} className="glass-card p-8 flex flex-col gap-6 group hover:border-primary/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-surface-container-high flex items-center justify-center text-3xl border border-primary/5 group-hover:scale-110 transition-transform">
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-on-surface">{card.brand}</h3>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-primary">{card.category}</span>
                  </div>
                </div>

                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {BRAND_DETAILS[card.brand as keyof typeof BRAND_DETAILS] || `Trade your ${card.brand} gift cards for instant cash at the best market rates. We accept various denominations and formats.`}
                </p>

                <div className="mt-auto pt-6 border-t border-primary/5 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest">Rate</span>
                    <span className="text-lg font-black text-secondary">₦{card.ratePerDollar}/$</span>
                  </div>
                  <Link href="/login" className="btn btn-outline-primary btn-sm">Trade Now</Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="glass-card p-12 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10">
              <h2 className="text-2xl font-bold mb-6">Don't see your card on the list?</h2>
              <p className="text-on-surface-variant mb-8 max-w-[600px] mx-auto">We accept over 50+ different gift card brands. Contact our WhatsApp support if you have a card that isn't listed here.</p>
              <button className="btn btn-primary btn-lg">Check Other Rates</button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
