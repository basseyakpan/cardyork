import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
  return (
    <main className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-32 pb-20 max-w-[800px] w-full mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-on-surface">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none text-on-surface-variant">
          <p className="mb-6 font-medium">Last Updated: June 10, 2026</p>
          <p>At Cardyork.com, we are committed to protecting your privacy and safeguarding your personal information. This Privacy Policy explains how we collect, use, store, disclose, and protect your information when you use our website, mobile application, and related services.</p>
          <p>By accessing or using our services, you agree to the practices described in this Privacy Policy.</p>
          
          <h2 className="text-xl font-bold mt-8 mb-4 text-on-surface">1. Information We Collect</h2>
          <p>We may collect the following information when you use our services:</p>
          <h3 className="font-bold mt-4 mb-2 text-on-surface">Personal Information</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>Full Name</li>
            <li>Email Address</li>
            <li>Phone Number</li>
            <li>User ID</li>
            <li>Identity verification information</li>
            <li>Transaction details</li>
          </ul>
          <h3 className="font-bold mt-4 mb-2 text-on-surface">Technical Information</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>App Usage Data</li>
            <li>Crash Reports and Diagnostics</li>
            <li>Log Data and Performance Metrics</li>
          </ul>
          
          <h2 className="text-xl font-bold mt-8 mb-4 text-on-surface">2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="list-disc pl-6 mb-4">
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
          
          <h2 className="text-xl font-bold mt-8 mb-4 text-on-surface">3. Data Sharing and Disclosure</h2>
          <p>We may share your information with trusted third parties in the following circumstances:</p>
          <p><strong>Marketing and Advertising</strong>: Limited information may be shared with authorized marketing partners to provide relevant offers, promotions, and updates.</p>
          <p><strong>Technical and Service Providers</strong>: We may share necessary data, including diagnostic information and crash reports, with service providers who assist us in maintaining, securing, and improving our platform.</p>
          <p>We only share information when necessary and use appropriate security measures to protect your data. We do not sell, trade, or rent your personal information to third parties.</p>
          
          <h2 className="text-xl font-bold mt-8 mb-4 text-on-surface">4. Data Security</h2>
          <p>We take reasonable administrative, technical, and physical measures to safeguard your information against unauthorized access, disclosure, alteration, or destruction. These measures include data encryption, secure storage systems, and restricted access to sensitive information.</p>
          
          <h2 className="text-xl font-bold mt-8 mb-4 text-on-surface">5. Your Privacy Rights</h2>
          <p>Depending on applicable laws, you may have the right to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Access your personal information.</li>
            <li>Correct inaccurate or incomplete information.</li>
            <li>Request deletion of your personal data.</li>
            <li>Withdraw consent for data processing where applicable.</li>
          </ul>
          <p>To exercise any of these rights, please contact us at <a href="mailto:support@cardyork.com" className="text-primary hover:underline">support@cardyork.com</a> or use the "Delete Account" feature available in your account settings.</p>
          
          <h2 className="text-xl font-bold mt-8 mb-4 text-on-surface">6. Data Retention</h2>
          <p>We retain personal information only for as long as necessary to provide our services, comply with legal and regulatory requirements, resolve disputes, and enforce our agreements. When data is no longer required, it will be securely deleted, anonymized, or otherwise disposed of in accordance with applicable laws.</p>
          
          <h2 className="text-xl font-bold mt-8 mb-4 text-on-surface">7. Children's Privacy</h2>
          <p>Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from minors.</p>
          <p>If we become aware that personal information has been collected from a minor without appropriate consent, we will take reasonable steps to delete such information.</p>
          
          <h2 className="text-xl font-bold mt-8 mb-4 text-on-surface">8. Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy periodically to reflect changes in our services, legal requirements, or business practices.</p>
          <p>Any updates will be posted on this page, and the revised version will become effective immediately upon publication.</p>
          
          <h2 className="text-xl font-bold mt-8 mb-4 text-on-surface">9. Contact Us</h2>
          <p>If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us:</p>
          <p>Cardyork Digital Solutions Limited<br />Email: <a href="mailto:support@cardyork.com" className="text-primary hover:underline">support@cardyork.com</a><br />Website: <a href="http://cardyork.com" className="text-primary hover:underline">Cardyork.com</a></p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
