export default function WithdrawalPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto">
      <div>
        <h2 className="text-3xl font-extrabold text-on-surface mb-2">Withdrawal</h2>
        <p className="text-on-surface-variant">Withdraw your available balance securely to your bank account.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Balance Card */}
        <div className="glass-card p-6 flex flex-col justify-between bg-gradient-to-br from-surface-container-low to-surface-container shadow-lg">
          <div>
            <span className="text-on-surface-variant text-sm font-medium">Available Balance</span>
            <h3 className="text-4xl font-extrabold text-on-surface mt-2">₦ 142,500.00</h3>
          </div>
          <div className="mt-8">
            <span className="chip chip-success">Ready to withdraw</span>
          </div>
        </div>

        {/* Withdrawal Form */}
        <div className="glass-card p-6 flex flex-col gap-6">
          <div className="input-group">
            <label className="input-label">Amount (₦)</label>
            <input type="number" placeholder="Enter amount..." className="input-field" defaultValue="50000" />
            <span className="text-xs text-on-surface-variant mt-1 text-right">Min: ₦1,000 | Max: ₦1,000,000</span>
          </div>

          <div className="input-group">
            <label className="input-label">Destination Bank Account</label>
            <select className="input-field appearance-none">
              <option>GTBank - 0123456789 - John Doe</option>
              <option>Access Bank - 9876543210 - John Doe</option>
              <option>+ Add new bank account</option>
            </select>
          </div>

          <button className="btn btn-secondary w-full py-3.5 mt-2">Withdraw Funds</button>
        </div>
      </div>

      {/* Recent Withdrawals */}
      <div className="mt-4">
        <h3 className="text-lg font-bold text-on-surface mb-4">Recent Withdrawals</h3>
        <div className="glass-card p-0 overflow-hidden">
          <table className="w-full text-left">
            <tbody className="divide-y divide-outline-variant">
              <tr className="hover:bg-surface-container-low/50">
                <td className="p-4">
                  <div className="font-medium text-on-surface">GTBank Withdrawal</div>
                  <div className="text-xs text-on-surface-variant">Oct 24, 2023 • 14:30</div>
                </td>
                <td className="p-4 text-right font-semibold text-on-surface">₦ 20,000</td>
                <td className="p-4 text-right"><span className="chip chip-success">Success</span></td>
              </tr>
              <tr className="hover:bg-surface-container-low/50">
                <td className="p-4">
                  <div className="font-medium text-on-surface">Access Bank Withdrawal</div>
                  <div className="text-xs text-on-surface-variant">Oct 20, 2023 • 09:15</div>
                </td>
                <td className="p-4 text-right font-semibold text-on-surface">₦ 45,000</td>
                <td className="p-4 text-right"><span className="chip chip-success">Success</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
