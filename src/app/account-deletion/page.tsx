import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AccountDeletion() {
  return (
    <main className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-32 pb-20 max-w-[800px] w-full mx-auto px-6">
        <div className="space-y-6">
          {/* Header Section */}
          <div className="glass-card p-8 md:p-12 rounded-2xl animate-fade-in-up text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-on-surface">Account Deletion Policy</h1>
            <p className="text-on-surface-variant max-w-2xl mx-auto">
              At Cardyork, we respect your right to control your personal information. This Account Deletion Policy explains how users can request the deletion of their Cardyork account and associated personal data.
            </p>
          </div>

          {/* Section 1 */}
          <div className="glass-card p-8 md:p-10 rounded-2xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-xl font-bold mb-4 text-on-surface">How to Delete Your Account</h2>
            <div className="prose prose-invert max-w-none text-on-surface-variant">
              <p>Users may request account deletion by:</p>
              <ol className="list-decimal pl-6 mb-4">
                <li>Logging into the Cardyork mobile application.</li>
                <li>Navigating to Profile &gt; Advance &gt; Delete Account.</li>
                <li>Following the on-screen instructions to confirm the deletion request.</li>
              </ol>
              <p>Alternatively, users may contact our support team for assistance at:<br />Email: <a href="mailto:support@cardyork.com" className="text-primary hover:underline">support@cardyork.com</a></p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="glass-card p-8 md:p-10 rounded-2xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-xl font-bold mb-4 text-on-surface">What Happens When You Delete Your Account</h2>
            <div className="prose prose-invert max-w-none text-on-surface-variant">
              <p>Upon receiving a valid account deletion request:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Your account will be deactivated.</li>
                <li>Access to the Cardyork platform will be removed.</li>
                <li>Personal information that is no longer required will be deleted or anonymized.</li>
                <li>Account deletion is permanent and irreversible. Upon deletion, your account and all related information, including transaction records and personal data will be permanently removed from our systems. We recommend reviewing your decision carefully before proceeding.</li>
              </ul>
            </div>
          </div>

          {/* Section 3 */}
          <div className="glass-card p-8 md:p-10 rounded-2xl animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-xl font-bold mb-4 text-on-surface">Processing Time</h2>
            <div className="prose prose-invert max-w-none text-on-surface-variant">
              <p>Account deletion requests are generally processed within 72 hours of verification.</p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="glass-card p-8 md:p-10 rounded-2xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-xl font-bold mb-4 text-on-surface">Contact Us</h2>
            <div className="prose prose-invert max-w-none text-on-surface-variant">
              <p>If you have questions regarding account deletion or your personal data, please contact:</p>
              <p>Cardyork Digital Solutions Limited<br />Email: <a href="mailto:support@cardyork.com" className="text-primary hover:underline">support@cardyork.com</a><br />Website: <a href="http://cardyork.com" className="text-primary hover:underline">Cardyork.com</a></p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
