'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { markAsRead } from '@/store/slices/notificationSlice';

import BrandLogo from '@/components/BrandLogo';
import { FiEye, FiEyeOff, FiBell, FiLifeBuoy, FiArrowUpRight, FiCreditCard, FiDollarSign, FiArrowRight, FiClock } from 'react-icons/fi';

const getCurrencySymbol = (country: string) => {
  const c = (country || '').toLowerCase();
  if (c.includes('usa') || c.includes('us')) return '$';
  if (c.includes('uk') || c.includes('kingdom')) return '£';
  if (c.includes('euro') || c.includes('europe') || c.includes('germany') || c.includes('france')) return '€';
  if (c.includes('cad') || c.includes('canada')) return 'C$';
  if (c.includes('aud') || c.includes('australia')) return 'A$';
  if (c.includes('ghana')) return 'GH₵';
  if (c.includes('kenya')) return 'KSh';
  if (c.includes('nigeria') || c.includes('ngn')) return '₦';
  return '$'; // default to $ if not specified, since most gift cards are USD if not NGN
};

export default function DashboardHomePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const { trades } = useAppSelector(s => s.trade);
  const { notifications, unreadCount } = useAppSelector(s => s.notification);
  const { user } = useAppSelector(s => s.auth);
  const { wallet } = useAppSelector(s => s.wallet);
  const { assets, rates } = useAppSelector(s => s.assets);

  const sortedTrades = useMemo(() => {
    return [...(trades || [])].sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
  }, [trades]);

  console.log({trades})

  if (!user) return null;

  const topCards = useMemo(() => {
    const fixed = assets.filter(c => {
      const name = c.name.toLowerCase();
      return name.includes('apple') || name.includes('steam') || name.includes('razor');
    });

    const allowedRandoms = assets.filter(c => {
      const name = c.name.toLowerCase();
      return name.includes('footlocker') || name.includes('tremendous') || name.includes('sephora') || name.includes('macy');
    }).slice(0, 2);

    return [...fixed, ...allowedRandoms].slice(0, 5).map(asset => ({
      id: asset._id,
      brand: asset.name,
      icon: asset.vertical_image || asset.images?.[0] || '💳',
    }));
  }, [assets]);

  return (
    <div className="flex flex-col gap-6 md:gap-8 pb-8">
      
      {/* Header (Greeting & Icons) */}
      <div className="flex items-center justify-between lg:hidden mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            {user.firstname?.[0] || 'U'}
          </div>
          <h2 className="text-xl font-bold text-on-surface">Hi, {user.firstname || 'User'}!</h2>
        </div>
        <div className="flex items-center gap-4 text-primary relative">
          <button onClick={() => setIsNotifOpen(!isNotifOpen)} className="relative p-2 rounded-full hover:bg-primary/10 transition-colors focus:outline-none">
            <FiBell className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-background" />
            )}
          </button>
          
          {isNotifOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsNotifOpen(false)} />
              <div className="absolute top-full right-0 mt-2 w-80 rounded-2xl glass-card border border-primary/10 p-2 z-50 shadow-xl animate-fade-in max-h-96 overflow-y-auto">
                <div className="p-3 border-b border-primary/10 flex justify-between items-center">
                  <span className="font-bold text-on-surface">Notifications</span>
                  <span className="text-xs text-on-surface-variant">{unreadCount} unread</span>
                </div>
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-on-surface-variant text-sm">No new notifications</div>
                ) : (
                  <div className="flex flex-col">
                    {notifications.map(notif => (
                      <div 
                        key={notif._id} 
                        onClick={() => dispatch(markAsRead(notif._id))}
                        className={`p-3 border-b border-primary/5 hover:bg-primary/5 transition-colors cursor-pointer flex flex-col gap-1 ${!notif.isRead ? 'bg-primary/5' : ''}`}
                      >
                        <div className="flex justify-between items-start gap-2">
                          <span className="font-bold text-sm text-on-surface line-clamp-1">{notif.title}</span>
                          {!notif.isRead && <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />}
                        </div>
                        <span className="text-xs text-on-surface-variant line-clamp-2">{notif.message}</span>
                        <span className="text-[10px] text-on-surface-variant/70 mt-1">{new Date(notif.createdAt).toLocaleDateString()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          <Link href="/dashboard/support" className="p-2 rounded-full hover:bg-primary/10 transition-colors">
            <FiLifeBuoy className="w-6 h-6" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        
        <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8">
          {/* Wallet Hero Card */}
          <div className="relative overflow-hidden rounded-[24px] p-6 md:p-8 bg-gradient-to-br from-primary via-[#1c81f0] to-[#0a5ab0] shadow-xl shadow-primary/30 w-full">
            {/* Background elements */}
            <div className="absolute -top-16 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 right-8 w-28 h-28 bg-white/10 rounded-full blur-xl" />
            
            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => setIsBalanceVisible(!isBalanceVisible)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 transition-colors backdrop-blur-sm"
                >
                  {isBalanceVisible ? <FiEye className="w-4 h-4 text-white" /> : <FiEyeOff className="w-4 h-4 text-white" />}
                  <span className="text-sm text-white font-medium">Wallet Balance</span>
                </button>
              </div>

              <div className="flex items-end gap-3">
                <span className="text-4xl md:text-5xl font-black text-white tracking-tight">
                  {isBalanceVisible ? `₦${(wallet?.balance || user.balance || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '₦*******'}
                </span>
              </div>

              <button 
                onClick={() => router.push('/dashboard/withdrawal')}
                className="mt-2 w-full flex items-center justify-center gap-2 bg-white text-primary hover:bg-white/90 py-3.5 rounded-xl font-bold transition-colors shadow-sm"
              >
                Withdraw <FiArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Action Stack */}
          <div className="flex flex-col gap-4">
            <Link 
              href="/dashboard/cards"
              className="group flex items-center gap-4 p-4 md:p-5 rounded-[20px] bg-[#eef5ff] hover:bg-[#e0efff] transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-105 transition-transform">
                <FiCreditCard className="w-6 h-6" />
              </div>
              <div className="flex-1 flex flex-col">
                <span className="text-on-surface font-bold text-base">Sell your Giftcards</span>
                <span className="text-on-surface-variant text-xs">Convert your gift cards to cash</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <FiArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link 
              href="/dashboard/coins"
              className="group flex items-center gap-4 p-4 md:p-5 rounded-[20px] bg-primary text-white hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                <FiDollarSign className="w-6 h-6" />
              </div>
              <div className="flex-1 flex flex-col">
                <span className="font-bold text-base text-white">Trade your Coins</span>
                <span className="text-white/80 text-xs">Buy and sell crypto easily</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
                <FiArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-6 md:gap-8">
          
          {/* Hot Cards */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                <FiCreditCard className="text-primary w-5 h-5" /> Gift Cards
              </h3>
              <Link href="/dashboard/cards" className="text-primary text-sm font-bold hover:underline italic">See all</Link>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
              {topCards.map(card => (
                <div 
                  key={card.id} 
                  onClick={() => router.push(`/dashboard/cards?assetId=${card.id}`)}
                  className="shrink-0 w-28 flex flex-col gap-2 snap-center cursor-pointer group"
                >
                  <div className="w-28 h-28 rounded-2xl bg-surface-container flex items-center justify-center border border-primary/5 group-hover:border-primary/30 transition-colors shadow-sm overflow-hidden">
                    <BrandLogo id={card.id} fallback={card.icon} className="w-16 h-16 object-contain" />
                  </div>
                  <span className="text-sm font-bold text-on-surface text-center truncate px-1">{card.brand}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-lg font-bold text-on-surface">Recent Transactions</h3>
              <Link href="/dashboard/history" className="text-primary text-sm font-bold hover:underline italic">See all</Link>
            </div>
            
            <div className="glass-card overflow-hidden">
              {sortedTrades.length === 0 ? (
                <div className="p-8 flex flex-col items-center justify-center text-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center">
                    <FiClock className="w-5 h-5 text-on-surface-variant" />
                  </div>
                  <p className="text-on-surface-variant text-sm font-medium">No recent transactions.</p>
                </div>
              ) : (
                <div className="flex flex-col divide-y divide-primary/5">
                  {sortedTrades.slice(0, 4).map(trade => (
                    <div key={trade.id || trade._id} className="p-4 flex flex-col gap-2 hover:bg-primary/5 transition-colors cursor-pointer" onClick={() => router.push('/dashboard/history')}>
                      <div className="flex justify-between items-start">
                        <span className="text-on-surface font-bold text-sm capitalize">{trade.assetName || trade.cardName || 'Trade'}</span>
                        <span className={`chip chip-${(trade.status || '').toLowerCase()} text-[10px] py-0.5 px-2 min-w-0`}>{trade.status}</span>
                      </div>
                      <div className="flex justify-between items-end">
                        <span className="text-on-surface-variant text-xs font-medium">{new Date(trade.createdAt).toLocaleDateString()}</span>
                        <span className="text-secondary font-black text-sm">
                          {getCurrencySymbol(trade.country || trade.country_info?.name)}
                          {(trade.actualAmount || trade.userAmount || trade.amount || trade.nairaValue || trade.cost || 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

