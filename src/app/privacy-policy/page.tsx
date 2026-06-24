import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FiShield, FiLock, FiEye, FiServer, FiUserCheck, FiClock, FiTrash2 } from 'react-icons/fi';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — CardYork',
  description: 'At Cardyork.com, we are committed to protecting your privacy and safeguarding your personal information.',
};

export default function PrivacyPolicy() {
  return (
    <main className="bg-background min-h-screen flex flex-col pt-24 pb-16">
      <Navbar />
      <div className="flex-1 max-w-4xl w-full mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-on-surface">Privacy Policy</h1>
          <p className="mb-6 font-medium text-primary">Last Updated: June 10, 2026</p>
          <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
            At Cardyork.com, we are committed to protecting your privacy and safeguarding your personal information. This Privacy Policy explains how we collect, use, store, disclose, and protect your information.
          </p>
        </div>

        <div className="grid gap-6">
          <div className="glass-card p-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <FiUserCheck className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-on-surface">1. Information We Collect</h2>
            </div>
            <div className="text-on-surface-variant">
              <p className="mb-4">We may collect the following information when you use our services:</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold mb-2 text-on-surface">Personal Information</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Full Name</li>
                    <li>Email Address & Phone Number</li>
                    <li>User ID</li>
                    <li>Identity verification information</li>
                    <li>Transaction details</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-on-surface">Technical Information</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>App Usage Data</li>
                    <li>Crash Reports and Diagnostics</li>
                    <li>Log Data and Performance Metrics</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                <FiServer className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-on-surface">2. How We Use Your Information</h2>
            </div>
            <div className="text-on-surface-variant">
              <p className="mb-4">We use your information to:</p>
              <ul className="grid md:grid-cols-2 gap-x-6 gap-y-2 list-disc pl-6">
                <li>Provide and maintain our services.</li>
                <li>Process transactions.</li>
                <li>Verify user identities and prevent fraud.</li>
                <li>Improve website and application performance.</li>
                <li>Respond to customer support requests.</li>
                <li>Send service-related notifications and updates.</li>
                <li>Conduct analytics and improve user experience.</li>
                <li>Comply with legal and regulatory obligations.</li>
                <li>Communicate promotional offers where permitted by law.</li>
              </ul>
            </div>
          </div>

          <div className="glass-card p-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <FiEye className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-on-surface">3. Data Sharing and Disclosure</h2>
            </div>
            <div className="text-on-surface-variant space-y-4">
              <p>We may share your information with trusted third parties in the following circumstances:</p>
              <div className="bg-surface-container p-4 rounded-xl border border-outline-variant hover:border-primary/30 transition-colors">
                <p><strong>Marketing and Advertising:</strong> Limited information may be shared with authorized marketing partners to provide relevant offers, promotions, and updates.</p>
              </div>
              <div className="bg-surface-container p-4 rounded-xl border border-outline-variant hover:border-primary/30 transition-colors">
                <p><strong>Technical and Service Providers:</strong> We may share necessary data, including diagnostic information and crash reports, with service providers who assist us in maintaining, securing, and improving our platform.</p>
              </div>
              <p className="font-medium text-on-surface mt-4">We do not sell, trade, or rent your personal information to third parties.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card p-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center text-success">
                  <FiShield className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-on-surface">4. Data Security</h2>
              </div>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                We take reasonable administrative, technical, and physical measures to safeguard your information against unauthorized access, disclosure, alteration, or destruction. These measures include data encryption, secure storage systems, and restricted access to sensitive information.
              </p>
            </div>

            <div className="glass-card p-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <FiLock className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-on-surface">5. Your Privacy Rights</h2>
              </div>
              <p className="text-on-surface-variant text-sm mb-3">Depending on applicable laws, you may have the right to:</p>
              <ul className="list-disc pl-5 text-sm text-on-surface-variant space-y-1 mb-4">
                <li>Access your personal information.</li>
                <li>Correct inaccurate or incomplete information.</li>
                <li>Request deletion of your personal data.</li>
                <li>Withdraw consent for data processing where applicable.</li>
              </ul>
            </div>

            <div className="glass-card p-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <FiClock className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-on-surface">6. Data Retention</h2>
              </div>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                We retain personal information only for as long as necessary to provide our services, comply with legal and regulatory requirements, resolve disputes, and enforce our agreements. When data is no longer required, it will be securely deleted or anonymized.
              </p>
            </div>

            <div className="glass-card p-8 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-error/10 flex items-center justify-center text-error">
                  <FiTrash2 className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-on-surface">7. Children's Privacy</h2>
              </div>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from minors. If we become aware that personal information has been collected from a minor without appropriate consent, we will take reasonable steps to delete such information.
              </p>
            </div>
          </div>

          <div className="glass-card p-8 animate-fade-in-up text-center mt-4 bg-gradient-to-br from-surface-container to-surface" style={{ animationDelay: '0.8s' }}>
            <h2 className="text-2xl font-bold text-on-surface mb-4">Questions or Concerns?</h2>
            <p className="text-on-surface-variant mb-6">
              If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="mailto:support@cardyork.com" className="btn btn-primary py-3 px-6">Email Support</a>
              <a href="/contact" className="btn bg-surface-container-high text-on-surface hover:bg-surface-container-highest py-3 px-6 transition-colors">Contact Us Page</a>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </main>
  );
}
