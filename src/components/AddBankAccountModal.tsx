'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchBanks, validateBankAccount, addBankAccount, fetchBankAccounts } from '@/store/slices/walletSlice';

interface AddBankAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

export default function AddBankAccountModal({ isOpen, onClose, userId }: AddBankAccountModalProps) {
  const dispatch = useAppDispatch();
  const { banks } = useAppSelector(state => state.wallet);
  
  const [selectedBankCode, setSelectedBankCode] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  
  const [isValidating, setIsValidating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [bankSearchQuery, setBankSearchQuery] = useState('');
  const [isBankDropdownOpen, setIsBankDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsBankDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && banks.length === 0) {
      dispatch(fetchBanks());
    }
    if (isOpen) {
      // Reset state on open
      setSelectedBankCode('');
      setAccountNumber('');
      setAccountName('');
      setErrorMsg('');
      setBankSearchQuery('');
      setIsBankDropdownOpen(false);
    }
  }, [isOpen, banks.length, dispatch]);

  useEffect(() => {
    if (accountNumber.length === 10 && selectedBankCode) {
      validateAccount();
    } else {
      setAccountName('');
    }
  }, [accountNumber, selectedBankCode]);

  const validateAccount = async () => {
    setIsValidating(true);
    setErrorMsg('');
    setAccountName('');
    try {
      const trackingReference = `TR-${Date.now()}`;
      const res = await dispatch(validateBankAccount({ 
        bankCode: selectedBankCode, 
        accountNumber, 
        trackingReference 
      })).unwrap();
      
      if (res && res.bankAccountName) {
        setAccountName(res.bankAccountName);
      } else {
        setErrorMsg('Could not verify account name.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to validate account.');
    } finally {
      setIsValidating(false);
    }
  };

  const handleSave = async () => {
    if (!accountName || !selectedBankCode || accountNumber.length !== 10) return;
    
    const bank = banks.find(b => b.code === selectedBankCode);
    if (!bank) return;

    setIsSaving(true);
    setErrorMsg('');
    
    try {
      await dispatch(addBankAccount({
        id: userId,
        bankName: bank.name,
        accountNumber,
        accountName,
        data: {
          lenco: bank.code
        }
      })).unwrap();
      
      // Refresh list
      await dispatch(fetchBankAccounts(userId));
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to save bank account.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  const filteredBanks = banks.filter(b => b.name.toLowerCase().includes(bankSearchQuery.toLowerCase()));
  const selectedBankName = banks.find(b => b.code === selectedBankCode)?.name || '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="glass-card w-full max-w-md p-6 flex flex-col animate-in fade-in zoom-in-95 duration-200">
        <h3 className="text-xl font-bold text-on-surface mb-6">Add Bank Account</h3>
        
        <div className="flex flex-col gap-4">
          <div className="input-group relative" ref={dropdownRef}>
            <label className="input-label">Select Bank</label>
            <div 
              className={`input-field flex items-center justify-between cursor-pointer ${isValidating || isSaving ? 'opacity-50 pointer-events-none' : ''}`}
              onClick={() => setIsBankDropdownOpen(!isBankDropdownOpen)}
            >
              <span className={selectedBankCode ? 'text-on-surface' : 'text-on-surface-variant'}>
                {selectedBankName || 'Select a bank...'}
              </span>
              <svg className={`w-5 h-5 transition-transform ${isBankDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
            
            {isBankDropdownOpen && (
              <div className="absolute z-10 top-[76px] left-0 right-0 bg-surface-container border border-outline-variant rounded-xl shadow-xl overflow-hidden flex flex-col max-h-60">
                <div className="p-2 border-b border-outline-variant sticky top-0 bg-surface-container">
                  <input
                    type="text"
                    className="w-full bg-surface-container-high text-on-surface p-2.5 rounded-lg outline-none text-sm border border-outline-variant focus:border-primary"
                    placeholder="Search banks..."
                    value={bankSearchQuery}
                    onChange={(e) => setBankSearchQuery(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    autoFocus
                  />
                </div>
                <div className="overflow-y-auto">
                  {filteredBanks.length === 0 ? (
                    <div className="p-4 text-center text-sm text-on-surface-variant">No banks found</div>
                  ) : (
                    filteredBanks.map(bank => (
                      <div
                        key={bank.code}
                        className={`p-3 text-sm cursor-pointer hover:bg-primary/10 ${selectedBankCode === bank.code ? 'bg-primary/5 text-primary font-medium' : 'text-on-surface'}`}
                        onClick={() => {
                          setSelectedBankCode(bank.code);
                          setIsBankDropdownOpen(false);
                          setBankSearchQuery('');
                        }}
                      >
                        {bank.name}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="input-group">
            <label className="input-label">Account Number</label>
            <input 
              type="text" 
              maxLength={10}
              className="input-field" 
              placeholder="Enter 10-digit account number"
              value={accountNumber}
              onChange={e => setAccountNumber(e.target.value.replace(/\D/g, ''))}
              disabled={isValidating || isSaving}
            />
          </div>

          {isValidating && (
            <div className="text-sm text-primary flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Validating account...
            </div>
          )}

          {accountName && !isValidating && (
            <div className="p-3 bg-surface-container rounded-lg border border-outline-variant">
              <span className="text-xs text-on-surface-variant block mb-1">Account Name</span>
              <span className="font-semibold text-on-surface">{accountName}</span>
            </div>
          )}

          {errorMsg && (
            <div className="text-sm text-error">{errorMsg}</div>
          )}
        </div>

        <div className="flex gap-3 w-full mt-8">
          <button 
            onClick={onClose}
            className="flex-1 btn bg-surface-container text-on-surface-variant hover:bg-surface-container-high py-3"
            disabled={isValidating || isSaving}
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={!accountName || isValidating || isSaving}
            className="flex-1 btn btn-primary py-3 flex justify-center items-center gap-2"
          >
            {isSaving && (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            Save Account
          </button>
        </div>
      </div>
    </div>
  );
}
