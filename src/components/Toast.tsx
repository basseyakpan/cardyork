'use client';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearToast } from '@/store/slices/uiSlice';

export default function Toast() {
  const { toast } = useAppSelector(s => s.ui);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        dispatch(clearToast());
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, dispatch]);

  if (!toast) return null;

  const typeStyles = {
    success: 'bg-secondary/10 border-secondary/20 text-secondary',
    error: 'bg-error/10 border-error/20 text-error',
    info: 'bg-primary/10 border-primary/20 text-primary',
  };

  return (
    <div className={`fixed bottom-8 right-8 z-[200] glass-card px-6 py-4 flex items-center gap-4 animate-fade-in-up border-l-4 ${typeStyles[toast.type as keyof typeof typeStyles]}`}>
      <span className="text-xl">
        {toast.type === 'success' ? '✅' : toast.type === 'error' ? '❌' : 'ℹ️'}
      </span>
      <p className="text-sm font-semibold">{toast.message}</p>
      <button 
        className="ml-2 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer text-xl leading-none" 
        onClick={() => dispatch(clearToast())}
      >
        ×
      </button>
    </div>
  );
}

