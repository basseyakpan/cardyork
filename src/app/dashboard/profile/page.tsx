'use client';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchBankAccounts } from '@/store/slices/walletSlice';
import { logout } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';
import AddBankAccountModal from '@/components/AddBankAccountModal';
import ChangePasswordModal from '@/components/ChangePasswordModal';
import UpdatePinModal from '@/components/UpdatePinModal';

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  const { user } = useAppSelector(s => s.auth);
  const { bankAccounts, isLoading: isWalletLoading } = useAppSelector(s => s.wallet);

  const [isAddBankModalOpen, setIsAddBankModalOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isUpdatePinOpen, setIsUpdatePinOpen] = useState(false);
  
  const [is2FAEnabled, setIs2FAEnabled] = useState(false); // Default local state
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  useEffect(() => {
    if (user?.userid || user?.id) {
      dispatch(fetchBankAccounts(user.userid || user.id));
    }
  }, [dispatch, user]);

  if (!user) return null;

  const displayName = user.fullName || [user.firstname, user.lastname].filter(Boolean).join(' ') || user.username || 'User';
  const initials = displayName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  const handle2FAToggle = () => {
    setIs2FAEnabled(!is2FAEnabled);
    // In a full implementation, this would dispatch an action to API
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto pb-10">
      {/* Profile Hero */}
      <div className="glass-card overflow-hidden p-0">
        <div className="bg-gradient-primary p-8 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
          
          <div className="relative w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl border-2 border-white/40 shadow-lg text-white font-bold z-10">
            {initials}
          </div>
          
          <div className="flex-1 text-center sm:text-left z-10 text-white">
            <h3 className="text-2xl font-bold">{displayName}</h3>
            <p className="text-white/80">{user.email}</p>
            <p className="text-white/80 text-sm mt-1">@{user.username || 'user'}</p>
            <div className="mt-4 flex justify-center sm:justify-start gap-2">
              <button className="btn bg-white/20 hover:bg-white/30 text-white border border-white/30 text-sm py-2 px-4 backdrop-blur-md">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bank Details Section */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-bold text-primary tracking-widest uppercase ml-1">Bank Details</h3>
        <div className="glass-card p-6 flex flex-col gap-4">
          {bankAccounts.length === 0 ? (
            <button 
              onClick={() => setIsAddBankModalOpen(true)}
              className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-outline-variant rounded-xl text-on-surface-variant hover:border-primary hover:text-primary transition-colors bg-surface-container/30"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
              <span className="font-semibold">Add Bank Account</span>
            </button>
          ) : (
            <>
              {bankAccounts.map((account, index) => (
                <div key={account._id || index} className="flex items-center justify-between p-4 bg-surface-container rounded-xl border border-outline-variant">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                    </div>
                    <div>
                      <p className="font-bold text-on-surface">{account.bankName}</p>
                      <p className="text-sm text-on-surface-variant">{account.accountNumber} • {account.accountName}</p>
                    </div>
                  </div>
                </div>
              ))}
              <button 
                onClick={() => setIsAddBankModalOpen(true)}
                className="text-primary font-semibold text-sm hover:underline self-start"
              >
                + Add another bank account
              </button>
            </>
          )}
        </div>
      </div>

      {/* Security Section */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-bold text-primary tracking-widest uppercase ml-1">Security</h3>
        <div className="glass-card p-0 flex flex-col divide-y divide-outline-variant overflow-hidden">
          <button onClick={() => setIsUpdatePinOpen(true)} className="flex items-center gap-4 p-5 hover:bg-surface-container transition-colors text-left">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-on-surface">Update PIN</p>
            </div>
            <svg className="w-5 h-5 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
          
          <div className="flex items-center gap-4 p-5 text-left">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-on-surface">Push Notifications</p>
              <p className="text-xs text-on-surface-variant">Receive transaction updates</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={notificationsEnabled} onChange={() => setNotificationsEnabled(!notificationsEnabled)} />
              <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center gap-4 p-5 text-left">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-on-surface">2FA</p>
              <p className="text-xs text-on-surface-variant">Two-factor authentication</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={is2FAEnabled} onChange={handle2FAToggle} />
              <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <button onClick={() => setIsChangePasswordOpen(true)} className="flex items-center gap-4 p-5 hover:bg-surface-container transition-colors text-left">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-on-surface">Change Password</p>
            </div>
            <svg className="w-5 h-5 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </div>

      {/* Support Section */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-bold text-primary tracking-widest uppercase ml-1">Support</h3>
        <div className="glass-card p-0 flex flex-col divide-y divide-outline-variant overflow-hidden">
          <button className="flex items-center gap-4 p-5 hover:bg-surface-container transition-colors text-left">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-on-surface">Live Chat</p>
            </div>
            <svg className="w-5 h-5 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
          
          <button className="flex items-center gap-4 p-5 hover:bg-surface-container transition-colors text-left">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-on-surface">Direct Contact</p>
            </div>
            <svg className="w-5 h-5 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </div>

      <button 
        onClick={handleLogout}
        className="btn bg-error/10 text-error hover:bg-error/20 py-4 font-bold text-base mt-2"
      >
        Logout
      </button>

      {/* Modals */}
      <AddBankAccountModal 
        isOpen={isAddBankModalOpen} 
        onClose={() => setIsAddBankModalOpen(false)} 
        userId={user.userid || user.id} 
      />
      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      />
      <UpdatePinModal
        isOpen={isUpdatePinOpen}
        onClose={() => setIsUpdatePinOpen(false)}
      />
    </div>
  );
}
