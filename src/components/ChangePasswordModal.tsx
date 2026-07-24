'use client';
import React, { useState } from 'react';
import { FiEye, FiEyeOff, FiLock } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { changePassword } from '@/store/slices/authSlice';
import { showToast } from '@/store/slices/uiSlice';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen || !user) return null;

  const handleClose = () => {
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setErrorMsg('');
    setSuccessMsg('');
    setShowOld(false);
    setShowNew(false);
    setShowConfirm(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMsg('Confirm password does not match new password');
      return;
    }

    if (newPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long');
      return;
    }
    
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    
    try {
      const res = await dispatch(changePassword({
        id: user.userid || user.id,
        oldPassword,
        password: newPassword
      })).unwrap();
      
      const msg = res?.message || 'Password changed successfully ✅';
      setSuccessMsg(msg);
      dispatch(showToast({ message: msg, type: 'success' }));
      
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err: any) {
      const errorText = typeof err === 'string' ? err : err?.message || 'Failed to change password';
      setErrorMsg(errorText);
      dispatch(showToast({ message: errorText, type: 'error' }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="glass-card w-full max-w-md p-6 flex flex-col animate-in fade-in zoom-in-95 duration-200">
        <h3 className="text-xl font-bold text-on-surface mb-6">Change Password</h3>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="input-group">
            <label className="input-label">Current Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
              <input 
                type={showOld ? "text" : "password"} 
                className="input-field pl-10 pr-10" 
                placeholder="Enter current password"
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
                disabled={isLoading || !!successMsg}
                required
              />
              <button
                type="button"
                onClick={() => setShowOld(!showOld)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
              >
                {showOld ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">New Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
              <input 
                type={showNew ? "text" : "password"} 
                className="input-field pl-10 pr-10" 
                placeholder="Enter new password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                disabled={isLoading || !!successMsg}
                required
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
              >
                {showNew ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Confirm New Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
              <input 
                type={showConfirm ? "text" : "password"} 
                className="input-field pl-10 pr-10" 
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                disabled={isLoading || !!successMsg}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
              >
                {showConfirm ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="text-sm text-error bg-error/10 p-3 rounded-lg border border-error/20">{errorMsg}</div>
          )}
          {successMsg && (
            <div className="text-sm text-primary bg-primary/10 p-3 rounded-lg border border-primary/20">{successMsg}</div>
          )}

          <div className="flex gap-3 w-full mt-4">
            <button 
              type="button"
              onClick={handleClose}
              className="flex-1 btn bg-surface-container text-on-surface-variant hover:bg-surface-container-high py-3"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isLoading || !!successMsg || !oldPassword || !newPassword || !confirmPassword}
              className="flex-1 btn btn-primary py-3 flex justify-center items-center gap-2"
            >
              {isLoading ? "Updating..." : "Proceed"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
