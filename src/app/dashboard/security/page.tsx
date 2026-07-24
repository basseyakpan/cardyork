'use client';

import { useState } from 'react';
import { FiEye, FiEyeOff, FiLock } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { changePassword } from '@/store/slices/authSlice';
import { showToast } from '@/store/slices/uiSlice';

export default function SecurityPage() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setErrorMsg('User account not found. Please log in again.');
      return;
    }

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
      const res = await dispatch(
        changePassword({
          id: user.userid || user.id,
          oldPassword,
          password: newPassword,
        }),
      ).unwrap();

      const msg = res?.message || 'Password changed successfully ✅';
      setSuccessMsg(msg);
      dispatch(showToast({ message: msg, type: 'success' }));

      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      const errorText =
        typeof err === 'string' ? err : err?.message || 'Failed to change password';
      setErrorMsg(errorText);
      dispatch(showToast({ message: errorText, type: 'error' }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto pb-10">
      <div>
        <h2 className="text-3xl font-extrabold text-on-surface mb-2">Security Settings</h2>
        <p className="text-on-surface-variant">
          Manage your account security and authentication methods.
        </p>
      </div>

      {/* Change Password Form */}
      <div className="glass-card p-6 flex flex-col gap-6">
        <h3 className="text-lg font-bold text-on-surface border-b border-outline-variant pb-3">
          Change Password
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="input-group">
            <label className="input-label">Current Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
              <input
                type={showOld ? 'text' : 'password'}
                placeholder="Enter current password"
                className="input-field pl-10 pr-10"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                disabled={isLoading}
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
                type={showNew ? 'text' : 'password'}
                placeholder="Enter new password"
                className="input-field pl-10 pr-10"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                disabled={isLoading}
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
                type={showConfirm ? 'text' : 'password'}
                placeholder="Confirm new password"
                className="input-field pl-10 pr-10"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
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
            <div className="text-sm text-error bg-error/10 p-3 rounded-lg border border-error/20">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="text-sm text-primary bg-primary/10 p-3 rounded-lg border border-primary/20">
              {successMsg}
            </div>
          )}

          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading || !oldPassword || !newPassword || !confirmPassword}
            >
              {isLoading ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>

      {/* Two-Factor Authentication Info */}
      <div className="glass-card p-6 flex flex-col gap-6">
        <h3 className="text-lg font-bold text-on-surface border-b border-outline-variant pb-3">
          Two-Factor Authentication (2FA)
        </h3>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-medium text-on-surface">Email Verification / Authenticator</p>
            <p className="text-sm text-on-surface-variant mt-1">
              Receive 2FA codes during login to secure your account against unauthorized access.
            </p>
          </div>
        </div>
        <div className="p-4 bg-surface-container rounded-lg border border-outline-variant mt-2 flex items-start gap-3">
          <span className="text-xl">🛡️</span>
          <p className="text-sm text-on-surface-variant">
            We highly recommend keeping 2FA enabled to protect your account, especially when making withdrawals or changing security credentials.
          </p>
        </div>
      </div>
    </div>
  );
}
