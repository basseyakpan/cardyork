'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { toggleSidebar } from '@/store/slices/uiSlice';
import Link from 'next/link';
import Toast from '@/components/Toast';

const SIDEBAR_LINKS = [
  { icon: '📊', label: 'Dashboard', href: '/dashboard' },
  { icon: '💳', label: 'Trade Cards', href: '/dashboard/trade' },
  { icon: '🕒', label: 'Trade History', href: '/dashboard/history' },
  { icon: '🏦', label: 'Withdrawal', href: '/dashboard/withdrawal' },
  { icon: '👤', label: 'Profile', href: '/dashboard/profile' },
  { icon: '🛡️', label: 'Security', href: '/dashboard/security' },
  { icon: '💬', label: 'Support', href: '/dashboard/support' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector(s => s.auth);
  const { sidebarOpen } = useAppSelector(s => s.ui);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) return null;

  const displayName = user.fullName || [user.firstname, user.lastname].filter(Boolean).join(' ') || user.username || 'User';

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen z-50 bg-surface-container-low border-r border-primary/5 transition-all duration-300 flex flex-col ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-primary/5">
          <Link href="/" className="flex items-center gap-2.5 no-underline overflow-hidden">
            <span className="text-2xl bg-gradient-primary bg-clip-text text-transparent flex-shrink-0">⬡</span>
            {sidebarOpen && <span className="text-on-surface font-extrabold tracking-tight whitespace-nowrap">Card<span className="bg-gradient-primary bg-clip-text text-transparent">York</span></span>}
          </Link>
          <button onClick={() => dispatch(toggleSidebar())} className="text-on-surface-variant hover:text-primary transition-colors">
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        <nav className="flex-1 py-6 px-3 flex flex-col gap-1">
          {SIDEBAR_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-4 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-all no-underline group"
              title={!sidebarOpen ? link.label : ''}
            >
              <span className="text-xl group-hover:scale-110 transition-transform">{link.icon}</span>
              {sidebarOpen && <span className="font-medium whitespace-nowrap">{link.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-primary/5 bg-black/10">
          <div className="flex items-center gap-4 px-2">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold flex-shrink-0">{displayName.charAt(0)}</div>
            {sidebarOpen && (
              <div className="flex flex-col min-w-0">
                <span className="text-on-surface font-bold text-sm truncate">{displayName}</span>
                <span className="text-primary text-[10px] uppercase font-bold tracking-widest">{user.accountTier || 'Basic'} Tier</span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-surface-container-low border-b border-primary/5 flex items-center justify-between px-6 lg:px-8 flex-shrink-0">
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-on-surface">Dashboard</h1>
            <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-medium">CardYork <span className="text-secondary font-bold">Gift Card Platform</span></p>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-medium">Available Balance</span>
              <span className="text-lg font-extrabold text-secondary">₦{user.balance?.toLocaleString() || 0}.00</span>
            </div>
            {/* <button className="btn btn-primary btn-sm px-4">+ Fund Vault</button> */}
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </div>
        <Toast />
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => dispatch(toggleSidebar())}
        />
      )}
    </div>
  );
}

