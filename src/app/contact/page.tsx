import React from 'react';
import { Metadata } from 'next';
import { FiMail, FiPhone, FiGlobe, FiMessageSquare } from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Contact Us — CardYork',
  description: 'Get in touch with Cardyork for any transaction-related inquiries, account assistance, technical support, or business partnerships.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-extrabold text-on-background mb-4">Contact Us</h1>
            <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
              At Cardyork, customer satisfaction is at the heart of everything we do. Whether you need assistance with a transaction, have questions about your account, or would like to learn more about our services, we're here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Customer Support Container */}
            <div className="glass-card p-8 flex flex-col items-center text-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <FiMessageSquare className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-on-surface mb-3">Customer Support</h2>
              <p className="text-on-surface-variant mb-6 flex-1">
                For transaction-related inquiries, account assistance, technical support, or general questions, please contact our support team.
              </p>
              <div className="flex flex-col gap-3 w-full">
                <a href="mailto:support@cardyork.com" className="flex items-center justify-center gap-3 p-4 bg-surface-container rounded-xl hover:bg-surface-container-high transition-colors">
                  <FiMail className="text-primary w-5 h-5" />
                  <span className="font-semibold text-on-surface">support@cardyork.com</span>
                </a>
                <a href="tel:+2348026846656" className="flex items-center justify-center gap-3 p-4 bg-surface-container rounded-xl hover:bg-surface-container-high transition-colors">
                  <FiPhone className="text-primary w-5 h-5" />
                  <span className="font-semibold text-on-surface">+234-802-684-6656</span>
                </a>
              </div>
            </div>

            {/* Business & Partnership Container */}
            <div className="glass-card p-8 flex flex-col items-center text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-6">
                <FiGlobe className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-on-surface mb-3">Business & Partnerships</h2>
              <p className="text-on-surface-variant mb-6 flex-1">
                For business partnerships, collaborations, media inquiries, or other corporate matters, please contact us through our official business channel.
              </p>
              <div className="flex flex-col gap-3 w-full">
                <a href="mailto:partners@cardyork.com" className="flex items-center justify-center gap-3 p-4 bg-surface-container rounded-xl hover:bg-surface-container-high transition-colors">
                  <FiMail className="text-secondary w-5 h-5" />
                  <span className="font-semibold text-on-surface">partners@cardyork.com</span>
                </a>
                <a href="https://Cardyork.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 p-4 bg-surface-container rounded-xl hover:bg-surface-container-high transition-colors">
                  <FiGlobe className="text-secondary w-5 h-5" />
                  <span className="font-semibold text-on-surface">Cardyork.com</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 glass-card p-8 text-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <p className="text-on-surface-variant text-lg max-w-2xl mx-auto font-medium">
              We are committed to providing reliable support and responding to inquiries promptly. If you need assistance, don't hesitate to reach out to us.
            </p>
            <p className="text-primary font-bold text-xl mt-4">
              Thank you for choosing Cardyork.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
