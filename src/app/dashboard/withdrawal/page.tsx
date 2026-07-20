'use client';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchWallet, fetchBankAccounts, fetchWithdrawals, initiateWithdrawal } from '@/store/slices/walletSlice';
import PinDialog from '@/components/PinDialog';
import AddBankAccountModal from '@/components/AddBankAccountModal';

export default function WithdrawalPage() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(s => s.auth);
  const { wallet, bankAccounts, withdrawals, isLoading } = useAppSelector(s => s.wallet);

  const [amount, setAmount] = useState<string>('');
  const [selectedAccountId, setSelectedAccountId] = useState<string>('');
  
  const [isPinDialogOpen, setIsPinDialogOpen] = useState(false);
  const [isAddBankModalOpen, setIsAddBankModalOpen] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const minimumWithdrawal = 500;
  const transactionFee = 0;

  useEffect(() => {
    if (user?.userid || user?.id) {
      const userId = user.userid || user.id;
      dispatch(fetchWallet(userId));
      dispatch(fetchBankAccounts(userId));
      dispatch(fetchWithdrawals({ userId }));
    }
  }, [dispatch, user]);

  const numAmount = parseFloat(amount) || 0;
  const balance = wallet?.balance || 0;
  // Allow proceed if wallet hasn't loaded yet but amount >= minimum
  const isAmountValid = numAmount >= minimumWithdrawal && (balance === 0 || numAmount <= balance);

  const handleWithdrawClick = () => {
    setErrorMsg('');
    if (!amount || numAmount < minimumWithdrawal) {
      setErrorMsg(`Minimum withdrawal amount is ₦${minimumWithdrawal.toLocaleString()}`);
      return;
    }
    if (balance > 0 && numAmount > balance) {
      setErrorMsg('Insufficient balance');
      return;
    }
    if (selectedAccountId === 'ADD_NEW') {
      setIsAddBankModalOpen(true);
      return;
    }
    if (!selectedAccountId) {
      setErrorMsg('Please select a destination bank account');
      return;
    }
    
    setIsPinDialogOpen(true);
  };

  const handlePinSubmit = async (pin: string) => {
    setIsPinDialogOpen(false);
    setErrorMsg('');
    setSuccessMsg('');
    setIsSubmitting(true);
    
    const account = bankAccounts.find(a => a._id === selectedAccountId);
    if (!account) { setIsSubmitting(false); return; }
    console.log('account', account);

    try {
      await dispatch(initiateWithdrawal({
        bankCode: account.data?.lenco || account.bankCode || '',
        bankName: account.bankName,
        bankAccountNumber: account.accountNumber,
        amount: Math.floor(numAmount), // mobile sends integer
        email: user?.email || '',
        user_id: user?.userid || user?.id || '',
        bankAccountName: account.accountName,
        name: `${user?.firstname || ''} ${user?.lastname || ''}`.trim(),
        id: user?.userid || user?.id || '',
        version: '5', // must match mobile VERSION_CODE (K.VERSION_CODE = "5")
        iOSVersion: null, // web is not iOS
        pin: pin
      })).unwrap();

      setSuccessMsg('Withdrawal processed successfully!');
      setAmount('');
      setSelectedAccountId('');
      
      // Refresh data
      const userId = user?.userid || user?.id;
      if (userId) {
        dispatch(fetchWallet(userId));
        dispatch(fetchWithdrawals({ userId }));
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Withdrawal failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto pb-10">
      <div>
        <h2 className="text-3xl font-extrabold text-on-surface mb-2">Withdrawal</h2>
        <p className="text-on-surface-variant">Withdraw your available balance securely to your bank account.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Balance Card */}
        <div className="glass-card p-6 flex flex-col justify-between bg-gradient-to-br from-surface-container-low to-surface-container shadow-lg relative overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
          
          <div>
            <span className="text-on-surface-variant text-sm font-medium">Available Balance</span>
            <h3 className="text-4xl font-extrabold text-on-surface mt-2">
              ₦ {balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </h3>
          </div>
          <div className="mt-8 flex justify-between items-center">
            <span className="chip chip-success">Ready to withdraw</span>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
          </div>
        </div>

        {/* Withdrawal Form */}
        <div className="glass-card p-6 flex flex-col gap-5">
          <div className="input-group">
            <label className="input-label">Amount (₦)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold">₦</span>
              <input 
                type="number" 
                placeholder="0.00" 
                className="input-field pl-10 text-xl font-bold" 
                value={amount}
                onChange={e => setAmount(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <span className="text-xs text-on-surface-variant mt-1 text-right">Min: ₦{minimumWithdrawal.toLocaleString()} | Max: ₦{balance.toLocaleString()}</span>
          </div>

          <div className="input-group">
            <label className="input-label">Destination Bank Account</label>
            <select 
              className="input-field"
              value={selectedAccountId}
              onChange={e => {
                if (e.target.value === 'ADD_NEW') {
                  setIsAddBankModalOpen(true);
                  // Don't actually select the 'ADD_NEW' option if we're opening the modal
                  setSelectedAccountId('');
                } else {
                  setSelectedAccountId(e.target.value);
                }
              }}
              disabled={isLoading}
            >
              <option key="default" value="">Select an account...</option>
              {bankAccounts.map(account => (
                <option key={account._id} value={account._id}>
                  {account.bankName} - {account.accountNumber}
                </option>
              ))}
              <option key="add-new" value="ADD_NEW">+ Add new bank account</option>
            </select>
          </div>

          {amount && isAmountValid && (
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex flex-col gap-2 mt-2">
              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant">Amount</span>
                <span className="font-semibold text-on-surface">₦{numAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant">Transaction Fee</span>
                <span className="font-semibold text-on-surface">- ₦{transactionFee}</span>
              </div>
              <div className="h-px bg-outline-variant/50 my-1"></div>
              <div className="flex justify-between font-bold">
                <span className="text-on-surface">You will receive</span>
                <span className="text-primary text-lg">₦{(numAmount - transactionFee).toLocaleString()}</span>
              </div>
            </div>
          )}

          {errorMsg && <div className="text-sm text-error font-medium">{errorMsg}</div>}
          {successMsg && <div className="text-sm text-success font-medium">{successMsg}</div>}

          <button 
            className="btn btn-primary w-full py-3.5 mt-auto"
            onClick={handleWithdrawClick}
            disabled={isSubmitting || !amount || !isAmountValid || !selectedAccountId}
          >
            {isSubmitting ? 'Processing...' : 'Proceed'}
          </button>
        </div>
      </div>

      {/* Recent Withdrawals */}
      <div className="mt-4">
        <h3 className="text-lg font-bold text-on-surface mb-4">Recent Withdrawals</h3>
        <div className="glass-card p-0 overflow-hidden">
          {withdrawals.length === 0 ? (
            <div className="p-8 text-center text-on-surface-variant">
              No recent withdrawals found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <tbody className="divide-y divide-outline-variant">
                  {withdrawals.map((w, index) => (
                    <tr key={w._id || index} className="hover:bg-surface-container-low/50">
                      <td className="p-4">
                        <div className="font-medium text-on-surface">{w.bankName} Withdrawal</div>
                        <div className="text-xs text-on-surface-variant">
                          {new Date(w.createdAt).toLocaleDateString()} • {new Date(w.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                      </td>
                      <td className="p-4 text-right font-semibold text-on-surface">
                        ₦ {w.amount.toLocaleString()}
                      </td>
                      <td className="p-4 text-right">
                        <span className={`chip chip-success`}>
                          {w.status || 'Success'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <PinDialog 
        isOpen={isPinDialogOpen}
        onClose={() => setIsPinDialogOpen(false)}
        onSubmit={handlePinSubmit}
        isLoading={isSubmitting}
      />
      
      <AddBankAccountModal 
        isOpen={isAddBankModalOpen} 
        onClose={() => setIsAddBankModalOpen(false)} 
        userId={user?.userid || user?.id || ''} 
      />
    </div>
  );
}
