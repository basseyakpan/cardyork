'use client';
import Link from 'next/link';
import { useAppSelector } from '@/store/hooks';
import { MOCK_GIFT_CARDS } from '@/store/slices/tradeSlice';
import BrandLogo from '@/components/BrandLogo';

export default function DashboardPage() {
  const { trades } = useAppSelector(s => s.trade);
  const { user } = useAppSelector(s => s.auth);

  if (!user) return null;

  const topCards = MOCK_GIFT_CARDS.slice(0, 4);

  return (
    <div className="flex flex-col gap-8">

      {/* Welcome Banner */}
      <div className="glass-card p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/5 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2" />

        <div className="flex flex-col items-start gap-3 relative z-10">
          <span className="chip chip-success">⚡ Platform Online</span>
          <h2 className="text-3xl font-extrabold text-on-surface leading-tight">
            Welcome back, {user.fullName.split(' ')[0]} 👋
          </h2>
          <p className="text-on-surface-variant text-base max-w-[480px]">
            Your account is active and ready. Submit your gift cards and get paid in minutes.
          </p>
          {/* Available Balance inline */}
          <div className="flex items-center gap-2 mt-1 px-4 py-2.5 rounded-xl bg-secondary/10 border border-secondary/20">
            <span className="text-xl font-black text-secondary">₦{user.balance.toLocaleString()}.00</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full md:w-auto relative z-10">
          <div className="glass-card-sm p-5 flex flex-col items-center justify-center min-w-[140px]">
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">Cards Sold</span>
            <span className="text-2xl font-extrabold text-on-surface tracking-tight">{user.totalTrades}</span>
          </div>
          <div className="glass-card-sm p-5 flex flex-col items-center justify-center min-w-[140px]">
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-1">Account Security</span>
            <span className="text-2xl font-extrabold text-secondary tracking-tight">Active</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

        {/* Recent Submissions */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-on-surface">Recent Submissions</h3>
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

        {/* Sidebar */}
        <div className="xl:col-span-4 flex flex-col gap-8">

          {/* Top Gift Card Rates */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold text-on-surface">Today's Best Rates</h3>
            <div className="flex flex-col gap-3">
              {topCards.map(card => (
                <Link
                  key={card.id}
                  href={`/sell-gift-cards/${card.id}`}
                  className="glass-card-sm p-4 flex items-center justify-between hover:border-primary/30 hover:bg-primary/5 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-surface-container-high flex items-center justify-center border border-primary/10">
                      <BrandLogo id={card.id} fallback={card.icon} className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-on-surface font-bold text-sm leading-tight">{card.brand}</p>
                      <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest leading-tight">{card.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-secondary font-extrabold text-sm leading-tight">₦{card.ratePerDollar.toLocaleString()}</p>
                    <p className="text-on-surface-variant text-[10px] font-medium leading-tight">per $1</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Sell Now CTA */}
          <div className="glass-card p-6 flex flex-col gap-4 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
            <h4 className="text-lg font-bold text-on-surface">Sell More, Earn More</h4>
            <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
              Complete {Math.max(0, 50 - user.totalTrades)} more sales to unlock Elite Tier — higher rates and 0% withdrawal fees.
            </p>
            <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-primary rounded-full transition-all duration-700"
                style={{ width: `${Math.min(100, (user.totalTrades / 50) * 100)}%` }}
              />
            </div>
            <Link href="/dashboard/trade" className="btn btn-primary btn-sm w-full font-bold">
              Sell a Gift Card →
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
