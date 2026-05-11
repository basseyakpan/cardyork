'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { mockLogin, clearError } from '@/store/slices/authSlice';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuthenticated } = useAppSelector(s => s.auth);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
    return () => { dispatch(clearError()); };
  }, [isAuthenticated, router, dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(mockLogin(email, password));
    if (result.success) {
      router.push('/dashboard');
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="w-full max-w-[440px] relative z-10">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2.5 text-2xl font-extrabold tracking-tight no-underline mb-6">
            <span className="text-3xl bg-gradient-primary bg-clip-text text-transparent">⬡</span>
            <span className="text-on-surface">Card<span className="bg-gradient-primary bg-clip-text text-transparent">York</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-on-surface mb-2">Welcome Back</h1>
          <p className="text-on-surface-variant text-sm">Enter your credentials to access the trading floor.</p>
        </div>

        <form className="glass-card p-8 flex flex-col gap-6" onSubmit={handleSubmit}>
          {error && (
            <div className="chip chip-error w-full py-3 px-4 rounded-md justify-start gap-3">
              <span>⚠️</span> {error}
            </div>
          )}

          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input
              type="email"
              className="input-field"
              placeholder="demo@cardyork.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <div className="flex items-center justify-between mb-1">
              <label className="input-label mb-0">Password</label>
              <Link href="/forgot-password" className="text-primary text-xs font-semibold hover:underline">Forgot password?</Link>
            </div>
            <input
              type="password"
              className="input-field"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg w-full mt-2"
            disabled={isLoading}
          >
            {isLoading ? 'Authenticating...' : 'Sign In'}
          </button>

          <p className="text-center text-sm text-on-surface-variant mt-4">
            Don't have an account? <Link href="/register" className="text-primary font-bold hover:underline">Create one now</Link>
          </p>
        </form>

        <div className="mt-8 p-4 bg-surface-container/50 border border-primary/5 rounded-lg text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Demo Access</p>
          <p className="text-sm text-on-surface">Email: <span className="font-mono text-primary">demo@cardyork.com</span></p>
          <p className="text-sm text-on-surface">Password: <span className="font-mono text-primary">Demo1234!</span></p>
        </div>
      </div>
    </main>
  );
}

