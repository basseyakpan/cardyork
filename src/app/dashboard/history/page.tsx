export default function HistoryPage() {
  const mockTrades = [
    { id: '#TRD-8392', asset: 'Amazon Gift Card', amount: '₦45,000', status: 'Completed', date: 'Oct 24, 2023', icon: '🛒' },
    { id: '#TRD-8391', asset: 'Steam Wallet', amount: '₦12,500', status: 'Pending', date: 'Oct 23, 2023', icon: '🎮' },
    { id: '#TRD-8390', asset: 'iTunes Gift Card', amount: '₦85,000', status: 'Completed', date: 'Oct 21, 2023', icon: '🎵' },
    { id: '#TRD-8389', asset: 'Google Play', amount: '₦22,000', status: 'Failed', date: 'Oct 19, 2023', icon: '▶️' },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
      <div>
        <h2 className="text-3xl font-extrabold text-on-surface mb-2">Trade History</h2>
        <p className="text-on-surface-variant">View and manage your recent gift card trades.</p>
      </div>

      <div className="glass-card flex flex-col sm:flex-row gap-4 p-4 items-center justify-between">
         <div className="input-group w-full sm:w-72">
            <input type="text" placeholder="Search by ID or Asset..." className="input-field py-2.5 text-sm" />
         </div>
         <div className="flex items-center gap-2 w-full sm:w-auto">
            <button className="btn btn-ghost py-2.5 px-4 text-sm w-full sm:w-auto">Filter</button>
            <button className="btn btn-outline-primary py-2.5 px-4 text-sm w-full sm:w-auto">Export CSV</button>
         </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container-low">
                <th className="p-4 font-semibold text-on-surface-variant text-sm">Asset</th>
                <th className="p-4 font-semibold text-on-surface-variant text-sm">Trade ID</th>
                <th className="p-4 font-semibold text-on-surface-variant text-sm">Amount (₦)</th>
                <th className="p-4 font-semibold text-on-surface-variant text-sm">Date</th>
                <th className="p-4 font-semibold text-on-surface-variant text-sm">Status</th>
                <th className="p-4 font-semibold text-on-surface-variant text-sm text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {mockTrades.map((trade) => (
                <tr key={trade.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-lg">{trade.icon}</div>
                      <span className="font-medium text-on-surface">{trade.asset}</span>
                    </div>
                  </td>
                  <td className="p-4 text-on-surface-variant text-sm">{trade.id}</td>
                  <td className="p-4 font-semibold text-on-surface">{trade.amount}</td>
                  <td className="p-4 text-on-surface-variant text-sm">{trade.date}</td>
                  <td className="p-4">
                    <span className={`chip ${trade.status === 'Completed' ? 'chip-success' : trade.status === 'Pending' ? 'chip-pending' : 'chip-error'}`}>
                      {trade.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-primary hover:text-primary-container text-sm font-medium transition-colors">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
