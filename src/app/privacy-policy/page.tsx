'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-background min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 py-20 px-6">
        <div className="max-w-[800px] mx-auto">
          <h1 className="display-sm mb-8">Privacy <span className="gradient-text">Policy</span></h1>
          
          <div className="glass-card p-10 flex flex-col gap-8 text-on-surface-variant leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-on-surface mb-4">1. Information Collection</h2>
              <p>
                'Cardyork Traders' collects information from you when you register on our site or fill out a form. When ordering or registering on our site, as appropriate, you may be asked to enter your: name, e-mail address or phone number. This information is collected to provide you with a better, more personalized service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-on-surface mb-4">2. Cookies</h2>
              <p>
                A cookie is a small file which asks permission to be placed on your computer's hard drive. Once you agree, the file is added and the cookie helps analyze web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual. We use traffic log cookies to identify which pages are being used. This helps us analyze data about web page traffic and improve our website in order to tailor it to customer needs.
              </p>
              <p className="mt-4">
                You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-on-surface mb-4">3. Data Security</h2>
              <p>
                We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure, we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online. Your transactions are protected by industry-standard encryption protocols.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-on-surface mb-4">4. External Links</h2>
              <p>
                Our website may contain links to other websites of interest. However, once you have used these links to leave our site, you should note that we do not have any control over that other website. Therefore, we cannot be responsible for the protection and privacy of any information which you provide whilst visiting such sites and such sites are not governed by this privacy statement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-on-surface mb-4">5. User Control</h2>
              <p>
                We will not sell, distribute or lease your personal information to third parties unless we have your permission or are required by law to do so. You may request details of personal information which we hold about you under the Data Protection Act.
              </p>
              <p className="mt-4">
                If you believe that any information we are holding on you is incorrect or incomplete, please write to or email us as soon as possible. We will promptly correct any information found to be incorrect.
              </p>
            </section>
          </div>

          <div className="mt-12 text-center text-sm text-on-surface-variant">
            Last updated: December 2024
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
