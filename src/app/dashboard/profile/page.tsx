'use client';
import { useAppSelector } from '@/store/hooks';
import { useState } from 'react';

export default function ProfilePage() {
  const { user } = useAppSelector(s => s.auth);

  if (!user) return null;

  const displayName = user.fullName || [user.firstname, user.lastname].filter(Boolean).join(' ') || user.username || 'User';

  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto">
      <div>
        <h2 className="text-3xl font-extrabold text-on-surface mb-2">User Profile</h2>
        <p className="text-on-surface-variant">View your personal details and account status.</p>
      </div>

      <div className="glass-card p-6 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center text-4xl border-4 border-surface shadow-lg text-white font-bold">
          {displayName.charAt(0)}
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-xl font-bold text-on-surface">{displayName}</h3>
          <p className="text-on-surface-variant">{user.email}</p>
          <div className="mt-3 flex justify-center sm:justify-start gap-2">
            {user.isVerified ? (
              <span className="chip chip-success">Verified</span>
            ) : (
              <span className="chip chip-pending">Unverified</span>
            )}
            {/* <span className="chip bg-surface-container text-on-surface-variant border-none">{user.accountTier || 'Basic'} Tier</span> */}
          </div>
        </div>
      </div>

      <div className="glass-card p-6 flex flex-col gap-6">
        <h3 className="text-lg font-bold text-on-surface border-b border-outline-variant pb-3">Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="input-group">
            <label className="input-label">First Name</label>
            <input type="text" className="input-field bg-surface-container/50 cursor-not-allowed" defaultValue={user.firstname || ''} disabled />
          </div>
          <div className="input-group">
            <label className="input-label">Last Name</label>
            <input type="text" className="input-field bg-surface-container/50 cursor-not-allowed" defaultValue={user.lastname || ''} disabled />
          </div>
          <div className="input-group">
            <label className="input-label">Phone Number</label>
            <input type="tel" className="input-field bg-surface-container/50 cursor-not-allowed" defaultValue={user.phoneNumber || user.phone || ''} disabled />
          </div>
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input type="email" className="input-field bg-surface-container/50 cursor-not-allowed" defaultValue={user.email || ''} disabled />
          </div>
        </div>
        <div className="flex justify-end mt-2">
          {/* Note: Update profile logic would go here, currently read-only placeholder to match mobile */}
        </div>
      </div>
    </div>
  );
}
