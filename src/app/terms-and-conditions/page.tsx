import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { FiFileText, FiGlobe, FiAlertTriangle, FiDollarSign, FiSlash, FiUserX, FiShield, FiXCircle } from 'react-icons/fi';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — CardYork',
  description: 'Cardyork Terms of Service. By accessing or using our website, mobile application, or any services provided by Cardyork, you agree to comply with and be bound by these Terms.',
};

export default function TermsAndConditions() {
  return (
    <main className="bg-background min-h-screen flex flex-col pt-24 pb-16">
      <Navbar />
      <div className="flex-1 max-w-4xl w-full mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-on-surface">Terms of Service</h1>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
            By accessing or using Cardyork.com, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our website, mobile application, or services.
          </p>
        </div>

        <div className="grid gap-6">
          <div className="glass-card p-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <FiFileText className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-on-surface">1. General Terms</h2>
            </div>
            <p className="text-on-surface-variant leading-relaxed">
              Cardyork.com is owned and operated by Cardyork Digital Solutions Limited ("Cardyork", "we", "us", or "our"). By accessing or using our website, mobile application, or any services provided by Cardyork, you agree to comply with and be bound by these Terms of Service.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card p-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <FiGlobe className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-on-surface">2. Governing Law</h2>
              </div>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Failure to comply with these laws will result in immediate expulsion from this site, without necessitating any forewarning.
              </p>
            </div>

            <div className="glass-card p-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <FiAlertTriangle className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-on-surface">3. Changes to These Terms</h2>
              </div>
              <ul className="list-disc pl-5 text-sm text-on-surface-variant space-y-2">
                <li>Cardyork may update these Terms from time to time.</li>
                <li>Updated versions will be posted on Cardyork.com and within the application where applicable.</li>
                <li>Continued use of the services after changes become effective constitutes acceptance of the updated Terms.</li>
              </ul>
            </div>

            <div className="glass-card p-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center text-success">
                  <FiDollarSign className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-on-surface">4. Pricing & Variations</h2>
              </div>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-2">
                All prices displayed on Cardyork.com are estimates and are provided for informational purposes only. Final transaction values may vary based on prevailing market rates, processing fees, commissions, and other applicable charges.
              </p>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Prices may change at any time without notice, and Cardyork shall not be held liable for any fluctuations or adjustments in pricing.
              </p>
            </div>

            <div className="glass-card p-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-error/10 flex items-center justify-center text-error">
                  <FiSlash className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-on-surface">5. Suspension & Termination</h2>
              </div>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-2">
                We reserve the right to suspend, restrict, or terminate access to our services at our sole discretion if a user violates these Terms or engages in any activity deemed unlawful, fraudulent, abusive, or harmful to our platform.
              </p>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                We may also refuse, limit, or cancel transactions that do not meet our operational requirements.
              </p>
            </div>
          </div>

          <div className="glass-card p-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <FiShield className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-on-surface">6. Wallet Address & Account Information</h2>
            </div>
            <p className="text-on-surface-variant leading-relaxed bg-surface-container p-4 rounded-xl border border-outline-variant hover:border-primary/30 transition-colors">
              Users are solely responsible for providing accurate wallet addresses, payment details, and account information. Cardyork shall not be liable for losses resulting from incorrect information submitted by users, including transfers made to incorrect wallet addresses.
            </p>
          </div>

          <div className="glass-card p-8 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                <FiXCircle className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-on-surface">7. Limitation of Liability</h2>
            </div>
            <p className="text-on-surface-variant mb-4">To the fullest extent permitted by law, Cardyork shall not be liable for:</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 bg-surface-container p-4 rounded-xl border border-outline-variant">
                <div className="w-2 h-2 mt-2 rounded-full bg-primary shrink-0"></div>
                <span className="text-on-surface-variant text-sm">Delays caused by verification requirements.</span>
              </div>
              <div className="flex items-start gap-3 bg-surface-container p-4 rounded-xl border border-outline-variant">
                <div className="w-2 h-2 mt-2 rounded-full bg-primary shrink-0"></div>
                <span className="text-on-surface-variant text-sm">Errors resulting from inaccurate information supplied by users.</span>
              </div>
              <div className="flex items-start gap-3 bg-surface-container p-4 rounded-xl border border-outline-variant">
                <div className="w-2 h-2 mt-2 rounded-full bg-primary shrink-0"></div>
                <span className="text-on-surface-variant text-sm">Service interruptions beyond our reasonable control.</span>
              </div>
              <div className="flex items-start gap-3 bg-surface-container p-4 rounded-xl border border-outline-variant">
                <div className="w-2 h-2 mt-2 rounded-full bg-primary shrink-0"></div>
                <span className="text-on-surface-variant text-sm">Indirect, incidental, or consequential damages arising from use of the platform.</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card p-8 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-error/10 flex items-center justify-center text-error">
                  <FiUserX className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-on-surface">8. Account Deletion</h2>
              </div>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-2">
                Users may request account deletion at any time through the Profile section of the mobile application or website, or by contacting our support team.
              </p>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Deleted accounts cannot be restored, and users may lose access to transaction history and other account-related information.
              </p>
            </div>

            <div className="glass-card p-8 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <FiGlobe className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-on-surface">9. Service Availability</h2>
              </div>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                While we strive to maintain uninterrupted access to our services, we do not guarantee that the platform will always be available, secure, or error-free. Cardyork shall not be responsible for technical issues beyond our control.
              </p>
            </div>
          </div>

          <div className="glass-card p-8 animate-fade-in-up text-center mt-4 bg-gradient-to-br from-surface-container to-surface" style={{ animationDelay: '0.9s' }}>
            <h2 className="text-2xl font-bold text-on-surface mb-4">Contact & Privacy</h2>
            <p className="text-on-surface-variant mb-6">
              Your use of Cardyork is also governed by our Privacy Policy. If you have questions regarding these Terms, please contact us.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/privacy-policy" className="btn btn-primary py-3 px-6">Read Privacy Policy</a>
              <a href="mailto:support@cardyork.com" className="btn bg-surface-container-high text-on-surface hover:bg-surface-container-highest py-3 px-6 transition-colors">Email Support</a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
