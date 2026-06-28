'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchAssets, fetchRates } from '@/store/slices/assetSlice';
import { fetchUserProfile, logout } from '@/store/slices/authSlice';
import { fetchTrades } from '@/store/slices/tradeSlice';
import { fetchCryptoTrades } from '@/store/slices/cryptoSlice';
import { fetchWallet } from '@/store/slices/walletSlice';
import Link from 'next/link';
import Image from 'next/image';
import Toast from '@/components/Toast';
import { FiHome, FiCreditCard, FiDollarSign, FiClock, FiUser, FiLogOut, FiMenu, FiX } from 'react-icons/fi';

const NAV_LINKS = [
  { label: 'Home', href: '/dashboard', icon: FiHome },
  { label: 'Cards', href: '/dashboard/cards', icon: FiCreditCard },
  { label: 'Coins', href: '/dashboard/coins', icon: FiDollarSign },
  { label: 'History', href: '/dashboard/history', icon: FiClock },
  { label: 'Profile', href: '/dashboard/profile', icon: FiUser },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated } = useAppSelector(s => s.auth);
  const { wallet } = useAppSelector(s => s.wallet);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const dispatch = useAppDispatch();

  const userId = user?.userid || user?.id;

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else if (userId) {
      dispatch(fetchAssets(userId));
      dispatch(fetchRates(userId));
      dispatch(fetchUserProfile(userId));
      dispatch(fetchWallet(userId));
      dispatch(fetchTrades({ id: userId, start: 0, sort: 'DESC', filter: { status: 'All' } }));
      dispatch(fetchCryptoTrades({ id: userId, start: '0', sort: 'DESC', filter: { status: 'All' } }));
    }
  }, [isAuthenticated, router, userId, dispatch]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (!isAuthenticated || !user) return null;

  const displayName = user.fullName || [user.firstname, user.lastname].filter(Boolean).join(' ') || user.username || 'User';

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20 lg:pb-0">
      {/* Top Navigation Bar (Desktop) & Top Header (Mobile) */}
      <header className="sticky top-0 z-50 w-full bg-surface-container-low/80 backdrop-blur-lg border-b border-primary/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Desktop Nav */}
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight no-underline">
              <Image src="/logo.png" alt="CardYork Logo" width={140} height={40} className="object-contain" priority />
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map(link => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                      isActive 
                        ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                        : 'text-on-surface-variant hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Side Info */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Wallet Balance</span>
              <span className="text-lg font-black text-secondary">₦{(wallet?.balance || user.balance || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-3 p-1.5 pr-4 rounded-full bg-surface-container border border-primary/10 hover:border-primary/30 transition-colors focus:outline-none"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold flex-shrink-0">
                  {displayName.charAt(0)}
                </div>
                <div className="hidden sm:flex flex-col items-start min-w-[80px]">
                  <span className="text-on-surface font-bold text-sm truncate max-w-[100px] leading-tight">{displayName}</span>
                  <span className="text-primary text-[10px] uppercase font-bold tracking-widest leading-tight">{user.accountTier || ''}</span>
                </div>
              </button>

              {profileDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setProfileDropdownOpen(false)} />
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl glass-card border border-primary/10 p-2 z-50 shadow-xl animate-fade-in">
                    <div className="p-3 mb-2 border-b border-primary/10">
                      <p className="font-bold text-on-surface truncate">{displayName}</p>
                      <p className="text-xs text-on-surface-variant truncate">{user.email}</p>
                    </div>
                    <Link href="/dashboard/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-colors" onClick={() => setProfileDropdownOpen(false)}>
                      <FiUser className="w-4 h-4" /> Profile Settings
                    </Link>
                    <Link href="/dashboard/security" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-colors" onClick={() => setProfileDropdownOpen(false)}>
                      <span className="w-4 h-4 text-center">🛡️</span> Security
                    </Link>
                    <div className="h-px w-full bg-primary/10 my-1" />
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-colors">
                      <FiLogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 min-w-0">
        {children}
        <Toast />
      </main>

      {/* Bottom Navigation Bar (Mobile) */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-surface-container-low border-t border-primary/10 z-50 pb-safe">
        <div className="flex items-center justify-around p-2">
          {NAV_LINKS.map(link => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex flex-col items-center gap-1 p-2 min-w-[64px]"
              >
                <link.icon className={`w-6 h-6 ${isActive ? 'text-primary' : 'text-on-surface-variant'}`} />
                <span className={`text-[10px] font-bold ${isActive ? 'text-primary' : 'text-on-surface-variant'}`}>
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

