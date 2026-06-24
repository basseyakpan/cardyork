'use client';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { sendPinOtp, setPin } from '@/store/slices/authSlice';

interface UpdatePinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UpdatePinModal({ isOpen, onClose }: UpdatePinModalProps) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  
  const [step, setStep] = useState<1 | 2>(1);
  const [password, setPassword] = useState('');
  const [pin, setPinValue] = useState('');
  const [otp, setOtp] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen || !user) return null;

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    
    try {
      await dispatch(sendPinOtp({
        id: user.userid || user.id,
        password
      })).unwrap();
      
      setStep(2);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to request code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    
    try {
      await dispatch(setPin({
        id: user.userid || user.id,
        pin,
        token: otp.toUpperCase()
      })).unwrap();
      
      setSuccessMsg('PIN updated successfully');
      setTimeout(() => {
        onClose();
        setStep(1);
        setPassword('');
        setPinValue('');
        setOtp('');
        setSuccessMsg('');
      }, 2000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to update PIN');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="glass-card w-full max-w-md p-6 flex flex-col animate-in fade-in zoom-in-95 duration-200">
        <h3 className="text-xl font-bold text-on-surface mb-6">Update PIN</h3>
        
        {step === 1 ? (
          <form onSubmit={handleRequestCode} className="flex flex-col gap-4">
            <p className="text-on-surface-variant text-sm mb-2">
              To update your PIN, please enter your password to receive an authorization code via email.
            </p>
            <div className="input-group">
              <label className="input-label">Current Password</label>
              <input 
                type="password" 
                className="input-field" 
                placeholder="Enter current password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            {errorMsg && <div className="text-sm text-error">{errorMsg}</div>}

            <div className="flex gap-3 w-full mt-4">
              <button 
                type="button"
                onClick={onClose}
                className="flex-1 btn bg-surface-container text-on-surface-variant hover:bg-surface-container-high py-3"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={isLoading || !password}
                className="flex-1 btn btn-primary py-3 flex justify-center items-center gap-2"
              >
                {isLoading && (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                Request Code
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleUpdatePin} className="flex flex-col gap-4">
            <div className="input-group">
              <label className="input-label">New PIN (4 Digits)</label>
              <input 
                type="password" 
                inputMode="numeric"
                maxLength={4}
                className="input-field text-center text-xl tracking-[0.5em]" 
                placeholder="••••"
                value={pin}
                onChange={e => setPinValue(e.target.value.replace(/\D/g, ''))}
                disabled={isLoading || !!successMsg}
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">Authorization Code</label>
              <input 
                type="text" 
                className="input-field uppercase" 
                placeholder="Enter code from email"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                disabled={isLoading || !!successMsg}
                required
              />
              <span className="text-xs text-primary mt-1 text-right">An OTP has been sent to your email.</span>
            </div>

            {errorMsg && <div className="text-sm text-error">{errorMsg}</div>}
            {successMsg && <div className="text-sm text-primary">{successMsg}</div>}

            <div className="flex gap-3 w-full mt-4">
              <button 
                type="button"
                onClick={onClose}
                className="flex-1 btn bg-surface-container text-on-surface-variant hover:bg-surface-container-high py-3"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={isLoading || !!successMsg || pin.length !== 4 || !otp}
                className="flex-1 btn btn-primary py-3 flex justify-center items-center gap-2"
              >
                {isLoading && (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                Update PIN
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
