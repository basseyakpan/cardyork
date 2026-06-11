'use client';
import { useState } from 'react';
import { TradeGiftCard } from '@/components/trade/TradeGiftCard';
import { TradeCrypto } from '@/components/trade/TradeCrypto';
import { FiCreditCard, FiDollarSign } from 'react-icons/fi';

type Tab = 'cards' | 'crypto';

export default function TradeHubPage() {
  const [activeTab, setActiveTab] = useState<Tab>('cards');

  return (
    <div className="flex flex-col max-w-[1000px] w-full">
      {/* Segmented Control */}
      <div className="flex items-center justify-center mb-8 animate-fade-in-up">
        <div className="flex bg-surface-container rounded-full p-1 border border-primary/10 shadow-sm relative w-full max-w-[400px]">
          <div 
            className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-primary rounded-full transition-all duration-300 ease-out shadow-md"
            style={{ left: activeTab === 'cards' ? '4px' : 'calc(50% + 2px)' }}
          />
          <button
            onClick={() => setActiveTab('cards')}
            className={`flex-1 flex flex-col items-center justify-center py-2 px-4 rounded-full text-sm font-bold transition-colors z-10 ${
              activeTab === 'cards' ? 'text-white' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <div className="flex items-center gap-2">
              <FiCreditCard className="w-4 h-4" />
              Gift Cards
            </div>
          </button>
          <button
            onClick={() => setActiveTab('crypto')}
            className={`flex-1 flex flex-col items-center justify-center py-2 px-4 rounded-full text-sm font-bold transition-colors z-10 ${
              activeTab === 'crypto' ? 'text-white' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <div className="flex items-center gap-2">
              <FiDollarSign className="w-4 h-4" />
              Crypto
            </div>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="w-full">
        {activeTab === 'cards' ? <TradeGiftCard /> : <TradeCrypto />}
      </div>
    </div>
  );
}
