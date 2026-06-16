'use client';
import { TradeCrypto } from '@/components/trade/TradeCrypto';
import { FiDollarSign } from 'react-icons/fi';

export default function CoinsPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <FiDollarSign className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-on-surface">Crypto & Coins</h1>
          <p className="text-sm text-on-surface-variant font-medium">Trade cryptocurrencies with the best rates.</p>
        </div>
      </div>
      
      <div className="w-full">
        <TradeCrypto />
      </div>
    </div>
  );
}
