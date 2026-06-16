'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/store/hooks';
import { mapAssetsToCards } from '@/lib/assetMapper';
import BrandLogo from '@/components/BrandLogo';
import { TradeGiftCard } from '@/components/trade/TradeGiftCard';
import { TradeCrypto } from '@/components/trade/TradeCrypto';
import { FiArrowRight, FiActivity, FiShield, FiCreditCard, FiDollarSign } from 'react-icons/fi';

type Tab = 'cards' | 'crypto';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('cards');
  const { trades } = useAppSelector(s => s.trade);
  const { user } = useAppSelector(s => s.auth);
  const { assets, rates } = useAppSelector(s => s.assets);

  if (!user) return null;

  const topCards = mapAssetsToCards(assets, rates).slice(0, 4);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12">
      
      {/* Main Column - Sell Flow */}
      <div className="xl:col-span-8 flex flex-col gap-8">
        
        {/* Segmented Control */}
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

        {activeTab === 'cards' ? <TradeGiftCard /> : <TradeCrypto />}
      </div>

      {/* Right Column - Dashboard Summary */}
      <div className="xl:col-span-4 flex flex-col gap-8">
        
        {/* Status Card */}
        <div className="glass-card p-6 flex flex-col gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2" />
          
          <div className="flex items-center justify-between z-10">
            <span className="chip chip-success">Account Active</span>
            <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center">
              <FiShield className="w-4 h-4 text-primary" />
            </div>
          </div>
          
          <div className="flex flex-col z-10">
            <span className="text-xs uppercase tracking-widest text-on-surface-variant font-bold mb-1">Total Cards Sold</span>
            <span className="text-4xl font-black text-on-surface">{user.totalTrades || 0}</span>
          </div>

          <div className="h-px w-full bg-primary/10 z-10" />

          <div className="flex flex-col gap-3 z-10">
            <div className="flex justify-between items-center text-sm font-bold">
              <span className="text-on-surface-variant">Progress to Elite Tier</span>
              <span className="text-primary">{Math.min(100, Math.round(((user.totalTrades || 0) / 50) * 100))}%</span>
            </div>
            <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-primary rounded-full transition-all duration-700"
                style={{ width: `${Math.min(100, ((user.totalTrades || 0) / 50) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Top Rates */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
            <FiActivity className="text-secondary" /> Top Rates Today
          </h3>
          <div className="flex flex-col gap-3">
            {topCards.map(card => (
              <div key={card.id} className="glass-card-sm p-4 flex items-center justify-between border-primary/5 hover:border-primary/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center border border-primary/5">
                    <BrandLogo id={card.id} fallback={card.icon} className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-on-surface font-bold text-sm leading-tight">{card.brand}</p>
                    <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest leading-tight">{card.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-secondary font-black text-base leading-tight">₦{card.ratePerDollar}</p>
                  <p className="text-on-surface-variant text-[10px] font-medium leading-tight">per $1</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Submissions Mini */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-on-surface">Recent Trades</h3>
            <Link href="/dashboard/history" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
              View All <FiArrowRight />
            </Link>
          </div>
          
          <div className="glass-card overflow-hidden">
            {trades.length === 0 ? (
              <div className="p-6 text-center text-on-surface-variant text-sm font-medium">
                No recent trades found.
              </div>
            ) : (
              <div className="flex flex-col divide-y divide-primary/5">
                {trades.slice(0, 3).map(trade => (
                  <div key={trade.id} className="p-4 flex flex-col gap-2 hover:bg-primary/5 transition-colors">
                    <div className="flex justify-between items-start">
                      <span className="text-on-surface font-bold text-sm">{trade.cardName}</span>
                      <span className={`chip chip-${trade.status} text-[10px] py-0.5 px-2 min-w-0`}>{trade.status}</span>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-on-surface-variant text-xs font-medium">{new Date(trade.createdAt).toLocaleDateString()}</span>
                      <span className="text-secondary font-black text-sm">₦{trade.nairaValue.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
