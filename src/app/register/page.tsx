'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { mockRegister, clearError } from '@/store/slices/authSlice';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [localError, setLocalError] = useState('');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuthenticated } = useAppSelector(s => s.auth);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
    return () => { dispatch(clearError()); };
  }, [isAuthenticated, router, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setLocalError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setLocalError('Passwords do not match.');
      return;
    }
    const result = await dispatch(mockRegister(formData));
    if (result.success) {
      router.push('/dashboard');
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6 py-20 relative overflow-hidden">
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-secondary/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="w-full max-w-[480px] relative z-10">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2.5 text-2xl font-extrabold tracking-tight no-underline mb-6">
            <span className="text-3xl bg-gradient-primary bg-clip-text text-transparent">⬡</span>
            <span className="text-on-surface">Card<span className="bg-gradient-primary bg-clip-text text-transparent">York</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-on-surface mb-2">Join the Vault</h1>
          <p className="text-on-surface-variant text-sm">Create an account to start trading at the best rates.</p>
        </div>

        <form className="glass-card p-8 flex flex-col gap-5" onSubmit={handleSubmit}>
          {(error || localError) && (
            <div className="chip chip-error w-full py-3 px-4 rounded-md justify-start gap-3">
              <span>⚠️</span> {error || localError}
            </div>
          )}

          <div className="input-group">
            <label className="input-label">Full Name</label>
            <input
              type="text"
              name="fullName"
              className="input-field"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input
              type="email"
              name="email"
              className="input-field"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Phone Number</label>
            <input
              type="tel"
              name="phone"
              className="input-field"
              placeholder="+234 ..."
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              name="password"
              className="input-field"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="input-field"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg w-full mt-4"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>

          <p className="text-center text-sm text-on-surface-variant mt-4">
            Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Sign in instead</Link>
          </p>
        </form>
      </div>
    </main>
  );
}

