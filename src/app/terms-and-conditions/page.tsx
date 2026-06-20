import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsAndConditions() {
  return (
    <main className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-32 pb-20 max-w-[800px] w-full mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-on-surface">Terms of Service</h1>
        <div className="prose prose-invert max-w-none text-on-surface-variant">
          <p>By accessing or using Cardyork.com, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our website, mobile application, or services.</p>
          
          <h2 className="text-xl font-bold mt-8 mb-4 text-on-surface">1. General Terms</h2>
          <p>Cardyork.com is owned and operated by Cardyork Digital Solutions Limited ("Cardyork", "we", "us", or "our"). By accessing or using our website, mobile application, or any services provided by Cardyork, you agree to comply with and be bound by these Terms of Service.</p>
          
          <h2 className="text-xl font-bold mt-8 mb-4 text-on-surface">2. Governing Law</h2>
          <p>These Terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Failure to comply with these laws will result in immediate expulsion from this site, without necessitating any forewarning.</p>
          
          <h2 className="text-xl font-bold mt-8 mb-4 text-on-surface">3. Changes to These Terms</h2>
          <p>Cardyork may update these Terms from time to time.<br />Updated versions will be posted on Cardyork.com and within the application where applicable.<br />Continued use of the services after changes become effective constitutes acceptance of the updated Terms.</p>
          
          <h2 className="text-xl font-bold mt-8 mb-4 text-on-surface">4. Pricing &amp; Variations</h2>
          <p>All prices displayed on Cardyork.com are estimates and are provided for informational purposes only. Final transaction values may vary based on prevailing market rates, processing fees, commissions, and other applicable charges at the time a transaction is completed.</p>
          <p>Prices may change at any time without notice, and Cardyork shall not be held liable for any fluctuations or adjustments in pricing.</p>
          
          <h2 className="text-xl font-bold mt-8 mb-4 text-on-surface">5. Suspension and Termination</h2>
          <p>We reserve the right to suspend, restrict, or terminate access to our services at our sole discretion if a user violates these Terms or engages in any activity deemed unlawful, fraudulent, abusive, or harmful to our platform.</p>
          <p>We may also refuse, limit, or cancel transactions that do not meet our operational requirements or minimum and maximum transaction thresholds.</p>
          
          <h2 className="text-xl font-bold mt-8 mb-4 text-on-surface">6. Wallet Address and Account Information</h2>
          <p>Users are solely responsible for providing accurate wallet addresses, payment details, and account information. Cardyork shall not be liable for losses resulting from incorrect information submitted by users, including transfers made to incorrect wallet addresses.</p>
          
          <h2 className="text-xl font-bold mt-8 mb-4 text-on-surface">7. Limitation of Liability</h2>
          <p>To the fullest extent permitted by law, Cardyork shall not be liable for:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Delays caused by verification requirements.</li>
            <li>Errors resulting from inaccurate information supplied by users.</li>
            <li>Service interruptions beyond our reasonable control.</li>
            <li>Indirect, incidental, or consequential damages arising from use of the platform.</li>
          </ul>
          
          <h2 className="text-xl font-bold mt-8 mb-4 text-on-surface">8. Account Deletion</h2>
          <p>Users may request account deletion at any time through the Profile section of the mobile application or website, or by contacting our support team.</p>
          <p>Upon successful verification, account deletion requests will be processed within a reasonable period, subject to legal, regulatory, and compliance obligations that may require us to retain certain records.</p>
          <p>Deleted accounts cannot be restored, and users may lose access to transaction history and other account-related information.</p>
          
          <h2 className="text-xl font-bold mt-8 mb-4 text-on-surface">9. Service Availability</h2>
          <p>While we strive to maintain uninterrupted access to our services, we do not guarantee that the platform will always be available, secure, or error-free. Cardyork shall not be responsible for service interruptions, delays, maintenance periods, or technical issues beyond our reasonable control.</p>
          
          <h2 className="text-xl font-bold mt-8 mb-4 text-on-surface">10. Privacy</h2>
          <p>Your use of Cardyork is also governed by our Privacy Policy, available at: <a href="https://cardyork.com/privacy-policy" className="text-primary hover:underline">https://cardyork.com/privacy-policy</a></p>
          
          <h2 className="text-xl font-bold mt-8 mb-4 text-on-surface">11. Contact Information</h2>
          <p>If you have questions regarding these Terms, please contact:</p>
          <p>Cardyork Digital Solutions Limited<br />Email: <a href="mailto:support@cardyork.com" className="text-primary hover:underline">support@cardyork.com</a><br />Website: <a href="http://cardyork.com" className="text-primary hover:underline">Cardyork.com</a></p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
