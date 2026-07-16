'use client';
import { useAppSelector } from '@/store/hooks';
import { useState } from 'react';
import { FiClock, FiCreditCard, FiDollarSign } from 'react-icons/fi';
import BrandLogo from '@/components/BrandLogo';

export default function HistoryPage() {
  const { trades, isLoading: tradesLoading } = useAppSelector(s => s.trade);
  const { cryptoTrades, isLoading: cryptoLoading } = useAppSelector(s => s.crypto);
  const { withdrawals, isLoading: walletLoading } = useAppSelector(s => s.wallet);
  
  const [activeTab, setActiveTab] = useState<'cards' | 'crypto' | 'withdrawals'>('cards');
  const [searchQuery, setSearchQuery] = useState('');

  const displayTrades = activeTab === 'cards' ? trades : activeTab === 'crypto' ? cryptoTrades : withdrawals;
  
  const filteredTrades = displayTrades.filter((trade: any) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const nameMatch = trade.cardName?.toLowerCase().includes(q) || trade.assetName?.toLowerCase().includes(q) || trade.bankName?.toLowerCase().includes(q);
    const idMatch = trade._id?.toLowerCase().includes(q) || trade.id?.toLowerCase().includes(q);
    return nameMatch || idMatch;
  });

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto">
      <div>
        <h2 className="text-3xl font-extrabold text-on-surface mb-2">Trade History</h2>
        <p className="text-on-surface-variant">View and manage your recent gift card and crypto trades.</p>
      </div>

      <div className="glass-card flex flex-col sm:flex-row gap-4 p-4 items-center justify-between">
        <div className="flex bg-surface-container rounded-xl p-1 gap-1">
          <button 
            onClick={() => setActiveTab('cards')}
            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'cards' ? 'bg-primary text-white shadow-md' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
          >
            <FiCreditCard className="w-4 h-4" /> Gift Cards
          </button>
          <button 
            onClick={() => setActiveTab('crypto')}
            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'crypto' ? 'bg-primary text-white shadow-md' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
          >
            <FiDollarSign className="w-4 h-4" /> Crypto
          </button>
          <button 
            onClick={() => setActiveTab('withdrawals')}
            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'withdrawals' ? 'bg-primary text-white shadow-md' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
          >
            <span className="w-4 h-4 text-center">🏦</span> Withdrawals
          </button>
        </div>

        <div className="input-group w-full sm:w-72">
          <input 
            type="text" 
            placeholder="Search by ID or Asset..." 
            className="input-field py-2.5 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container-low">
                <th className="p-4 font-semibold text-on-surface-variant text-sm">{activeTab === 'withdrawals' ? 'Bank / Account' : 'Asset'}</th>
                <th className="p-4 font-semibold text-on-surface-variant text-sm">ID</th>
                <th className="p-4 font-semibold text-on-surface-variant text-sm">Amount</th>
                <th className="p-4 font-semibold text-on-surface-variant text-sm">Date</th>
                <th className="p-4 font-semibold text-on-surface-variant text-sm">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {filteredTrades.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-on-surface-variant">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center">
                        <FiClock className="w-5 h-5 text-on-surface-variant" />
                      </div>
                      <p>No {activeTab} trades found.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredTrades.map((trade: any) => {
                  const tradeId = trade.id || trade._id || '';
                  const name = activeTab === 'withdrawals' ? trade.bankName : (trade.cardName || trade.assetName || 'Unknown');
                  const amount = trade.nairaValue || trade.actualAmount || trade.amount || 0;
                  const date = trade.createdAt ? new Date(trade.createdAt).toLocaleDateString() : 'N/A';
                  const icon = trade.assetImage?.[0] || trade.images?.[0] || '';

                  return (
                    <tr key={tradeId} className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center overflow-hidden shrink-0">
                            {activeTab === 'withdrawals' ? (
                              <span className="text-xl">🏦</span>
                            ) : (
                              <BrandLogo id={name} fallback={icon} className="w-6 h-6" />
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-on-surface">{name}</span>
                            {activeTab === 'withdrawals' && (
                              <span className="text-xs text-on-surface-variant">{trade.bankAccountNumber}</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-on-surface-variant text-sm">
                        {tradeId.substring(0, 8)}...
                      </td>
                      <td className="p-4 flex flex-col">
                        <span className="font-bold text-secondary">₦{amount.toLocaleString()}</span>
                        {activeTab === 'crypto' && trade.userAmount && (
                          <span className="text-xs font-semibold text-on-surface-variant">
                            {trade.userAmount} {trade.assetName || 'Coins'}
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-on-surface-variant text-sm">{date}</td>
                      <td className="p-4">
                        <span className={`chip chip-${trade.status} text-[10px] py-0.5 px-2`}>
                          {trade.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
