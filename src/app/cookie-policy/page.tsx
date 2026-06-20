import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CookiePolicy() {
  return (
    <main className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-32 pb-20 max-w-[800px] w-full mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-on-surface">Cookie Policy</h1>
        <div className="prose prose-invert max-w-none text-on-surface-variant">
          
          <h2 className="text-xl font-bold mt-8 mb-4 text-on-surface">1. What Are Cookies?</h2>
          <p>Cookies are small text files stored on your device when you visit a website. They help websites operate efficiently and enhance user experience.</p>
          
          <h2 className="text-xl font-bold mt-8 mb-4 text-on-surface">2. How We Use Cookies</h2>
          <p>We use cookies to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Maintain website functionality.</li>
            <li>Remember login sessions and preferences.</li>
            <li>Improve website performance.</li>
            <li>Analyze website traffic and usage patterns.</li>
            <li>Enhance security.</li>
            <li>Support marketing and promotional activities.</li>
          </ul>
          
          <h2 className="text-xl font-bold mt-8 mb-4 text-on-surface">3. Types of Cookies We Use</h2>
          
          <h3 className="font-bold mt-4 mb-2 text-on-surface">Essential Cookies</h3>
          <p>Required for core website functionality, security, authentication, and transaction processing.</p>
          
          <h3 className="font-bold mt-4 mb-2 text-on-surface">Analytics Cookies</h3>
          <p>Help us understand how users interact with our website and services.</p>
          
          <h3 className="font-bold mt-4 mb-2 text-on-surface">Functional Cookies</h3>
          <p>Remember user preferences and settings for a personalized experience.</p>
          
          <h3 className="font-bold mt-4 mb-2 text-on-surface">Marketing Cookies</h3>
          <p>Used to measure campaign effectiveness and provide relevant promotional content.</p>
          
          <h2 className="text-xl font-bold mt-8 mb-4 text-on-surface">4. Managing Cookies</h2>
          <p>Most web browsers allow users to control cookie settings, including blocking or deleting cookies.</p>
          <p>Please note that disabling certain cookies may affect the functionality and performance of our services.</p>
          
          <h2 className="text-xl font-bold mt-8 mb-4 text-on-surface">Contact Us</h2>
          <p>If you have any questions, concerns, or requests regarding this Cookie Policy, please contact us:</p>
          <p>Cardyork Digital Solutions Limited<br />Email: <a href="mailto:support@cardyork.com" className="text-primary hover:underline">support@cardyork.com</a><br />Website: <a href="http://cardyork.com" className="text-primary hover:underline">Cardyork.com</a></p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
