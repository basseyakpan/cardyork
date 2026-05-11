'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsAndConditionsPage() {
  return (
    <main className="bg-background min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 py-20 px-6">
        <div className="max-w-[800px] mx-auto">
          <h1 className="display-sm mb-8">Terms and <span className="gradient-text">Conditions</span></h1>
          
          <div className="glass-card p-10 flex flex-col gap-8 text-on-surface-variant leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-on-surface mb-4">1. Introduction</h2>
              <p>
                This website is operated by Cardyork Services. Throughout the site, the terms “we”, “us” and “our” refer to Cardyork Services. Cardyork Services offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-on-surface mb-4">2. Governing Law</h2>
              <p>
                Cardyork Services is a limited company based in Nigeria. These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-on-surface mb-4">3. User Responsibilities</h2>
              <p>
                By visiting our site and/ or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions. These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content.
              </p>
              <p className="mt-4">
                Failure to comply with these terms may lead to immediate suspension or expulsion from the site without prior notice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-on-surface mb-4">4. Service Usage</h2>
              <p>
                CardYork provides a platform for the purchase and sale of gift cards. You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the service is provided, without express written permission by us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-on-surface mb-4">5. Company Rights</h2>
              <p>
                We reserve the right to refuse service to anyone for any reason at any time. We also reserve the right to modify or discontinue the Service (or any part or content thereof) without notice at any time. We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-on-surface mb-4">6. Accuracy of Billing</h2>
              <p>
                We reserve the right to refuse any order you place with us. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time the order was made.
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
