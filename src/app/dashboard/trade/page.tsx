'use client';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { MOCK_GIFT_CARDS, submitMockTrade } from '@/store/slices/tradeSlice';
import { showToast } from '@/store/slices/uiSlice';

export default function TradeCardsPage() {
  const [selectedId, setSelectedId] = useState(MOCK_GIFT_CARDS[0].id);
  const [amount, setAmount] = useState('');
  const dispatch = useAppDispatch();
  const { isSubmitting } = useAppSelector(s => s.trade);

  const selectedCard = MOCK_GIFT_CARDS.find(c => c.id === selectedId)!;
  const nairaValue = (parseFloat(amount) || 0) * selectedCard.ratePerDollar;

  const handleTrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;
    
    const result = await dispatch(submitMockTrade(selectedCard, parseFloat(amount)));
    if (result.success) {
      dispatch(showToast({ message: 'Trade request submitted successfully!', type: 'success' }));
      setAmount('');
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-[1000px]">
      <h2 className="text-2xl font-bold text-on-surface">Execute New Trade</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <form className="glass-card p-8 flex flex-col gap-8 lg:col-span-8" onSubmit={handleTrade}>
          <div className="input-group">
            <label className="input-label">Select Asset</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {MOCK_GIFT_CARDS.filter(c => c.popular).map(card => (
                <div 
                  key={card.id} 
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col items-center gap-2 relative ${selectedId === card.id ? 'bg-primary/10 border-primary shadow-lg shadow-primary/20 scale-[1.02]' : 'bg-surface-container-high border-primary/5 hover:border-primary/20'}`}
                  onClick={() => setSelectedId(card.id)}
                >
                  <span className="text-2xl">{card.icon}</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-on-surface">{card.brand}</span>
                  {selectedId === card.id && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] text-white animate-fade-in">✓</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Trade Amount (USD)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold">$</span>
              <input
                type="number"
                className="input-field pl-10"
                placeholder="0.00"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                min={selectedCard.minAmount}
                max={selectedCard.maxAmount}
                required
              />
            </div>
            <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mt-2 text-right">
              Min: <span className="text-on-surface">${selectedCard.minAmount}</span> | Max: <span className="text-on-surface">${selectedCard.maxAmount}</span>
            </p>
          </div>

          <div className="bg-surface-container/50 rounded-2xl p-6 flex flex-col gap-4 border border-primary/5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-on-surface-variant font-medium">Exchange Rate</span>
              <span className="text-sm font-bold text-secondary">₦{selectedCard.ratePerDollar.toLocaleString()} / $1</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-on-surface-variant font-medium">Processing Fee</span>
              <span className="text-sm font-bold text-on-surface">₦0.00 <span className="text-[10px] text-primary ml-1">(Vanguard Tier)</span></span>
            </div>
            <div className="h-px w-full bg-primary/10 my-1" />
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-on-surface">Total Payout</span>
              <span className="text-2xl font-black text-secondary tracking-tight">₦{nairaValue.toLocaleString()}.00</span>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-lg w-full" 
            disabled={isSubmitting || !amount}
          >
            {isSubmitting ? 'Processing Transaction...' : 'Confirm & Execute Trade'}
          </button>
        </form>

        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="glass-card p-6 flex flex-col gap-4">
            <h3 className="text-lg font-bold text-on-surface">Trading Security</h3>
            <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
              Every trade is encrypted and stored in the Luminous Archive. 
              Our team verifies transactions within seconds to ensure you get paid instantly.
            </p>
            <ul className="flex flex-col gap-3 mt-2">
              <li className="flex items-center gap-3 text-xs font-bold text-on-surface">
                <span className="text-secondary">⚡</span> Sub-5 minute processing
              </li>
              <li className="flex items-center gap-3 text-xs font-bold text-on-surface">
                <span className="text-secondary">🛡️</span> Anti-fraud protection
              </li>
              <li className="flex items-center gap-3 text-xs font-bold text-on-surface">
                <span className="text-secondary">💬</span> Real-time support tracking
              </li>
            </ul>
          </div>

          <div className="glass-card-sm p-5 flex items-center gap-4 bg-secondary/10 border-secondary/20">
            <span className="text-2xl animate-bounce">📈</span>
            <div>
              <h4 className="text-sm font-bold text-on-surface">Market Opportunity</h4>
              <p className="text-[10px] font-medium text-on-surface-variant leading-tight">
                {selectedCard.brand} rates are up 1.2% this hour. Now is an optimal time to liquidate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

