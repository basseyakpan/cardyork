'use client';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { changePassword } from '@/store/slices/authSlice';

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
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen || !user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMsg('New passwords do not match');
      return;
    }
    
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    
    try {
      await dispatch(changePassword({
        id: user.userid || user.id,
        oldPassword,
        password: newPassword
      })).unwrap();
      
      setSuccessMsg('Password changed successfully');
      setTimeout(() => {
        onClose();
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setSuccessMsg('');
      }, 2000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to change password');
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
            <input 
              type="password" 
              className="input-field" 
              placeholder="Enter current password"
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              disabled={isLoading || !!successMsg}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">New Password</label>
            <input 
              type="password" 
              className="input-field" 
              placeholder="Enter new password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              disabled={isLoading || !!successMsg}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Confirm New Password</label>
            <input 
              type="password" 
              className="input-field" 
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              disabled={isLoading || !!successMsg}
              required
            />
          </div>

          {errorMsg && (
            <div className="text-sm text-error">{errorMsg}</div>
          )}
          {successMsg && (
            <div className="text-sm text-primary">{successMsg}</div>
          )}

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
              disabled={isLoading || !!successMsg || !oldPassword || !newPassword || !confirmPassword}
              className="flex-1 btn btn-primary py-3 flex justify-center items-center gap-2"
            >
              {isLoading && (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
