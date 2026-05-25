export default function HistoryPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="glass-card p-8 flex flex-col items-center gap-4 text-center mx-auto w-full max-w-2xl mt-12">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-3xl mb-2">🕒</div>
        <h2 className="text-3xl font-extrabold text-on-surface">Trade History</h2>
        <p className="text-on-surface-variant">View all your past gift card trades, track statuses, and download receipts. This page is currently under construction.</p>
        <div className="w-full h-48 bg-surface-container rounded-xl flex items-center justify-center border border-dashed border-primary/20 mt-4">
          <span className="text-on-surface-variant font-medium tracking-widest uppercase text-sm">Coming Soon</span>
        </div>
      </div>
    </div>
  );
}
