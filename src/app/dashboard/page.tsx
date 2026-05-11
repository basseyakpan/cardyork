'use client';
import { useAppSelector } from '@/store/hooks';

export default function DashboardPage() {
  const { trades } = useAppSelector(s => s.trade);
  const { user } = useAppSelector(s => s.auth);

  if (!user) return null;

  return (
    <div className="flex flex-col gap-8">
      {/* Welcome Banner */}
      <div className="glass-card p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
        
        <div className="flex flex-col items-start gap-4 relative z-10">
          <span className="chip chip-primary">Market Status: Open</span>
          <h2 className="text-3xl font-extrabold text-on-surface leading-tight">Welcome back, {user.fullName.split(' ')[0]}</h2>
          <p className="text-on-surface-variant text-base max-w-[500px]">Vanguard Tier liquidity is stable. Your trades are prioritized for instant payout.</p>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full md:w-auto relative z-10">
          <div className="glass-card-sm p-5 flex flex-col items-center justify-center min-w-[140px]">
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">Total Trades</span>
            <span className="text-2xl font-extrabold text-on-surface tracking-tight">{user.totalTrades}</span>
          </div>
          <div className="glass-card-sm p-5 flex flex-col items-center justify-center min-w-[140px]">
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">Vault Security</span>
            <span className="text-2xl font-extrabold text-secondary tracking-tight">Active</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Recent Trades */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-on-surface">Recent Trading Activity</h3>
            <button className="text-sm font-bold text-primary hover:underline uppercase tracking-wider">View All</button>
          </div>
          
          <div className="glass-card overflow-hidden">
            <div className="flex flex-col divide-y divide-primary/5">
              {trades.map(trade => (
                <div key={trade.id} className="p-5 flex items-center justify-between hover:bg-primary/5 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-xl border border-primary/5 group-hover:scale-110 transition-transform">💳</div>
                    <div className="flex flex-col">
                      <span className="text-on-surface font-bold">{trade.cardName}</span>
                      <span className="text-on-surface-variant text-xs font-medium">{new Date(trade.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 text-right">
                    <div className="flex flex-col">
                      <span className="text-on-surface font-extrabold">₦{trade.nairaValue.toLocaleString()}</span>
                      <span className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest">${trade.amount}</span>
                    </div>
                    <span className={`chip chip-${trade.status} min-w-[100px]`}>{trade.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Market Performers */}
        <div className="xl:col-span-4 flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-bold text-on-surface">Top Market Performers</h3>
            <div className="flex flex-col gap-4">
              {[
                { name: 'Bitcoin', symbol: 'BTC', price: '$64,230.50', change: '+5.2%', color: '#F7931A' },
                { name: 'Ethereum', symbol: 'ETH', price: '$3,410.20', change: '+1.8%', color: '#627EEA' },
                { name: 'Solana', symbol: 'SOL', price: '$145.10', change: '+8.4%', color: '#14F195' },
                { name: 'Tether', symbol: 'USDT', price: '$1.00', change: '0.0%', color: '#26A17B' },
              ].map(coin => (
                <div key={coin.symbol} className="glass-card-sm p-4 flex items-center justify-between hover:border-primary/20 transition-all cursor-default">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black shadow-lg" style={{ background: coin.color }}>{coin.symbol[0]}</div>
                    <div className="flex flex-col">
                      <p className="text-on-surface font-bold text-sm leading-tight">{coin.name}</p>
                      <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest leading-tight">{coin.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-on-surface font-extrabold text-sm leading-tight">{coin.price}</p>
                    <p className={`text-[10px] font-bold leading-tight ${coin.change.startsWith('+') ? 'text-secondary' : 'text-on-surface-variant'}`}>{coin.change}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 flex flex-col gap-4 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
            <h4 className="text-lg font-bold text-on-surface">Elite Tier Upgrade</h4>
            <p className="text-xs text-on-surface-variant font-medium leading-relaxed">Complete 50 more trades to unlock the Elite Tier rates and 0% withdrawal fees.</p>
            <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
              <div className="h-full bg-gradient-primary" style={{ width: '70%' }} />
            </div>
            <button className="btn btn-ghost btn-sm w-full font-bold">View Requirements</button>
          </div>
        </div>
      </div>
    </div>
  );
}
