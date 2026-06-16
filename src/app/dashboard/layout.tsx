'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import Link from 'next/link';
import Toast from '@/components/Toast';
import { FiMenu, FiX, FiLogOut, FiUser } from 'react-icons/fi';

const TOP_NAV_LINKS = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Trade History', href: '/dashboard/history' },
  { label: 'Withdrawal', href: '/dashboard/withdrawal' },
  { label: 'Support', href: '/dashboard/support' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated } = useAppSelector(s => s.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) return null;

  const displayName = user.fullName || [user.firstname, user.lastname].filter(Boolean).join(' ') || user.username || 'User';

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full bg-surface-container-low/80 backdrop-blur-lg border-b border-primary/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Desktop Nav */}
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-2.5 no-underline">
              <span className="text-3xl bg-gradient-primary bg-clip-text text-transparent flex-shrink-0">⬡</span>
              <span className="text-xl text-on-surface font-extrabold tracking-tight hidden sm:block">Card<span className="bg-gradient-primary bg-clip-text text-transparent">York</span></span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {TOP_NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    pathname === link.href 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                      : 'text-on-surface-variant hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Side Info */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Wallet Balance</span>
              <span className="text-lg font-black text-secondary">₦{(user.balance || 0).toLocaleString()}</span>
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
                  <span className="text-primary text-[10px] uppercase font-bold tracking-widest leading-tight">{user.accountTier || 'Basic'}</span>
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
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-colors">
                      <FiLogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden p-2 text-on-surface hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bottom-0 z-40 bg-background/95 backdrop-blur-xl border-t border-primary/10 animate-fade-in overflow-y-auto">
          <nav className="p-6 flex flex-col gap-2">
            <div className="p-4 mb-4 rounded-2xl bg-surface-container border border-primary/10 flex justify-between items-center">
              <span className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Wallet Balance</span>
              <span className="text-xl font-black text-secondary">₦{(user.balance || 0).toLocaleString()}</span>
            </div>
            
            {TOP_NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`p-4 rounded-xl text-base font-bold transition-all ${
                  pathname === link.href 
                    ? 'bg-primary/10 text-primary border border-primary/20' 
                    : 'text-on-surface hover:bg-surface-container'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px w-full bg-primary/10 my-4" />
            <Link href="/dashboard/profile" onClick={() => setMobileMenuOpen(false)} className="p-4 rounded-xl text-base font-bold text-on-surface hover:bg-surface-container">Profile Settings</Link>
            <Link href="/dashboard/security" onClick={() => setMobileMenuOpen(false)} className="p-4 rounded-xl text-base font-bold text-on-surface hover:bg-surface-container">Security</Link>
          </nav>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 min-w-0">
        {children}
        <Toast />
      </main>
    </div>
  );
}
