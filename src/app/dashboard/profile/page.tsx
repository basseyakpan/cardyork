export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto">
      <div>
        <h2 className="text-3xl font-extrabold text-on-surface mb-2">User Profile</h2>
        <p className="text-on-surface-variant">Update your personal details and preferences.</p>
      </div>

      <div className="glass-card p-6 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-4xl border-4 border-surface shadow-lg">
          👤
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-xl font-bold text-on-surface">John Doe</h3>
          <p className="text-on-surface-variant">john.doe@example.com</p>
          <div className="mt-3 flex justify-center sm:justify-start gap-2">
            <span className="chip chip-success">Verified</span>
            <span className="chip bg-surface-container text-on-surface-variant border-none">Level 2 Trader</span>
          </div>
        </div>
        <button className="btn btn-outline-primary">Change Avatar</button>
      </div>

      <div className="glass-card p-6 flex flex-col gap-6">
        <h3 className="text-lg font-bold text-on-surface border-b border-outline-variant pb-3">Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="input-group">
            <label className="input-label">Full Name</label>
            <input type="text" className="input-field" defaultValue="John Doe" />
          </div>
          <div className="input-group">
            <label className="input-label">Phone Number</label>
            <input type="tel" className="input-field" defaultValue="+234 800 123 4567" />
          </div>
          <div className="input-group sm:col-span-2">
            <label className="input-label">Email Address</label>
            <input type="email" className="input-field bg-surface-container/50 cursor-not-allowed" defaultValue="john.doe@example.com" disabled />
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <button className="btn btn-primary px-8">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
