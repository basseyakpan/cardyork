'use client';
import { Suspense } from 'react';
import { TradeGiftCard } from '@/components/trade/TradeGiftCard';
import { FiCreditCard, FiLoader } from 'react-icons/fi';

export default function CardsPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <FiCreditCard className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-on-surface">Gift Cards</h1>
          <p className="text-sm text-on-surface-variant font-medium">Trade your gift cards securely and get paid instantly.</p>
        </div>
      </div>
      
      <div className="w-full">
        <Suspense fallback={<div className="flex justify-center p-12"><FiLoader className="w-8 h-8 animate-spin text-primary" /></div>}>
          <TradeGiftCard />
        </Suspense>
      </div>
    </div>
  );
}
