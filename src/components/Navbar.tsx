'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import { toggleMobileMenu, setMobileMenuOpen } from '@/store/slices/uiSlice';
import { ThemeToggle } from './ThemeToggle';


const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Sell Gift Cards', href: '/sell-gift-cards' },
  { label: 'Gift Card Brands', href: '/gift-card-brands' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQs', href: '/faq' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector(s => s.auth);
  const displayName = user?.fullName || [user?.firstname, user?.lastname].filter(Boolean).join(' ') || user?.username || 'User';
  const { mobileMenuOpen } = useAppSelector(s => s.ui);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    dispatch(setMobileMenuOpen(false));
  }, [pathname, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? 'backdrop-blur-[20px] border-b border-primary/10' : 'bg-transparent'}`}
      style={scrolled ? { backgroundColor: 'color-mix(in srgb, var(--background) 85%, transparent)' } : {}}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-[72px] flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight no-underline">
          <span className="text-2xl bg-gradient-primary bg-clip-text text-transparent">⬡</span>
          <span className="text-on-surface">Card<span className="bg-gradient-primary bg-clip-text text-transparent">York</span></span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1 list-none flex-1 justify-center">
          {NAV_LINKS.map(l => (
            <li key={l.href}>
              <Link 
                href={l.href} 
                className={`px-3.5 py-2 rounded-full text-[0.9rem] font-medium transition-all duration-200 no-underline ${pathname === l.href ? 'text-primary bg-primary/10' : 'text-on-surface-variant hover:text-on-surface hover:bg-primary/10'}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth buttons & Theme */}
        <div className="hidden md:flex items-center gap-2.5">
          <ThemeToggle />
          {isAuthenticated && user ? (
            <>
              <Link href="/dashboard" className="btn btn-ghost btn-sm">Dashboard</Link>
              <div className="flex items-center gap-2 bg-surface-container rounded-full p-1 pl-3 pr-2 border border-primary/15 ml-4">
                <Link href="/dashboard" className="flex items-center gap-2 no-underline text-on-surface hover:text-primary transition-colors">
                  <span className="text-sm font-bold">{displayName.split(' ')[0]}</span>
                  <span className="w-7 h-7 rounded-full bg-gradient-primary flex items-center justify-center text-[0.8rem] font-bold text-white">{displayName.charAt(0)}</span>
                </Link>
                <div className="w-px h-4 bg-primary/20 mx-1"></div>
                <button onClick={handleLogout} className="bg-none border-none text-on-surface-variant cursor-pointer text-[1rem] p-1 transition-colors duration-200 hover:text-error" title="Sign out">↩</button>
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost btn-sm">Sign In</Link>
              <Link href="/register" className="btn btn-primary btn-sm">Get Started</Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 bg-none border-none cursor-pointer p-1"
          onClick={() => dispatch(toggleMobileMenu())}
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-on-surface-variant rounded-sm transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[8px] bg-primary' : ''}`} />
          <span className={`w-6 h-0.5 bg-on-surface-variant rounded-sm transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-on-surface-variant rounded-sm transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[8px] bg-primary' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-3xl border-b border-primary/10 px-6 py-4 pb-6 animate-fade-in-up">
          <ul className="list-none mb-5">
            {NAV_LINKS.map(l => (
              <li key={l.href}>
                <Link 
                  href={l.href} 
                  className={`block py-3.5 text-base font-medium no-underline border-b border-on-surface-variant/20 transition-colors duration-200 ${pathname === l.href ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2.5">
            <div className="flex justify-center mb-4">
              <ThemeToggle />
            </div>
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="btn btn-primary w-full">Dashboard</Link>
                <button onClick={handleLogout} className="btn btn-ghost w-full">Sign Out</button>
              </>
            ) : (
              <>
                <Link href="/login" className="btn btn-ghost w-full">Sign In</Link>
                <Link href="/register" className="btn btn-primary w-full">Create Account</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

