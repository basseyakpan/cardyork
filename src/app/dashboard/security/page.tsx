export default function SecurityPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto">
      <div>
        <h2 className="text-3xl font-extrabold text-on-surface mb-2">Security Settings</h2>
        <p className="text-on-surface-variant">Manage your account security and authentication methods.</p>
      </div>

      <div className="glass-card p-6 flex flex-col gap-6">
        <h3 className="text-lg font-bold text-on-surface border-b border-outline-variant pb-3">Change Password</h3>
        <div className="flex flex-col gap-4">
          <div className="input-group">
            <label className="input-label">Current Password</label>
            <input type="password" placeholder="Enter current password" className="input-field" />
          </div>
          <div className="input-group">
            <label className="input-label">New Password</label>
            <input type="password" placeholder="Enter new password" className="input-field" />
          </div>
          <div className="input-group">
            <label className="input-label">Confirm New Password</label>
            <input type="password" placeholder="Confirm new password" className="input-field" />
          </div>
          <div className="flex justify-end mt-2">
            <button className="btn btn-primary">Update Password</button>
          </div>
        </div>
      </div>

      <div className="glass-card p-6 flex flex-col gap-6">
        <h3 className="text-lg font-bold text-on-surface border-b border-outline-variant pb-3">Two-Factor Authentication (2FA)</h3>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-medium text-on-surface">Authenticator App</p>
            <p className="text-sm text-on-surface-variant mt-1">Use an app like Google Authenticator or Authy to generate verification codes.</p>
          </div>
          <button className="btn btn-outline-primary whitespace-nowrap">Enable 2FA</button>
        </div>
        <div className="p-4 bg-surface-container rounded-lg border border-outline-variant mt-2 flex items-start gap-3">
          <span className="text-xl">🛡️</span>
          <p className="text-sm text-on-surface-variant">We highly recommend enabling 2FA to protect your account from unauthorized access, especially when making withdrawals.</p>
        </div>
      </div>
    </div>
  );
}
