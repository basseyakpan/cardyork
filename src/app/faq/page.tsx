'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FiHelpCircle, FiMessageCircle, FiChevronDown } from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "How do I get started?",
        a: "Open a Cardyork account, choose the gift card you want to sell, provide the required information, upload your card images, and submit your trade. Our team will review and process your transaction promptly.",
      },
      {
        q: "Which gift cards are supported?",
        a: "We support more than 100 gift card brands, including Amazon, Apple, Google Play, Steam, PlayStation, Xbox, Walmart, Target, Sephora, Nike, and many others.",
      },
      {
        q: "How long does it take to verify my card?",
        a: "Most trades are verified within 5–15 minutes during business hours. Some cards may require additional checks and can take up to 24 hours.",
      },
    ],
  },
  {
    category: "Payments & Rates",
    questions: [
      {
        q: "How will I receive my payment?",
        a: "Once your trade is approved, your payment will be sent directly to your registered bank account. We support all major Nigerian banks for fast and secure payouts.",
      },
      {
        q: "How are exchange rates determined?",
        a: "Exchange rates are based on the gift card brand, card denomination, market demand, and current trading conditions. The applicable rate is displayed before you submit your trade.",
      },
      {
        q: "Is there a minimum or maximum trade amount?",
        a: "The minimum trade value is $10. Maximum trade limits depend on your account verification level. Verified users can enjoy higher trading limits.",
      },
      {
        q: "How long does it take to receive payment?",
        a: "Most payments are processed within minutes after your gift card has been successfully verified. In rare cases, additional verification may cause a slight delay.",
      },
    ],
  },
  {
    category: "Security & Trust",
    questions: [
      {
        q: "Is my information safe?",
        a: "Yes. Your privacy and security are our top priorities. We use industry-standard security measures, including 256-bit SSL encryption, to protect your personal information and keep every transaction secure.",
      },
      {
        q: "Why do I need to verify my identity?",
        a: "Identity verification helps protect your account, prevent fraud, and ensure compliance with our security standards. Verified users may also enjoy higher trading limits and a smoother trading experience.",
      },
      {
        q: "What happens if my gift card is declined?",
        a: "If your gift card cannot be accepted, we'll notify you with the reason whenever possible. Common reasons include invalid or incorrect card details, cards that have already been redeemed, unsupported card types, or region restrictions.",
      },
    ],
  },
  {
    category: "Account & Support",
    questions: [
      {
        q: "How can I contact Cardyork support?",
        a: "Our support team is available to assist you through live chat, email, or the support ticket system. We're committed to responding as quickly as possible.",
      },
      {
        q: "Can I cancel a trade?",
        a: "You may be able to cancel a trade if it has not yet entered the verification process. Once verification has started, cancellation may no longer be possible. If you need assistance, please contact our support team immediately.",
      },
      {
        q: "How do I update my bank account details?",
        a: "Log in to your Cardyork account, go to Profile > Bank Details, and update your banking information. For your security, you may be asked to complete an additional verification step before the changes take effect.",
      },
    ],
  },
];

function AccordionItem({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) {
  return (
    <div className={`border border-on-surface-variant/20 rounded-xl px-4 transition-colors ${isOpen ? 'bg-surface-container-high' : 'bg-surface-container'}`}>
      <button 
        onClick={onClick}
        className="w-full py-4 flex items-center justify-between text-left font-medium text-on-surface hover:text-primary transition-colors cursor-pointer bg-transparent border-none"
      >
        <span>{question}</span>
        <FiChevronDown className={`w-5 h-5 text-on-surface-variant transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-on-surface-variant leading-relaxed text-sm">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (categoryId: number, questionId: number) => {
    const key = `${categoryId}-${questionId}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <main className="bg-background min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-24 pb-20">
        {/* Hero Section */}
        <section className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <FiHelpCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Help Center</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-on-surface">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h1>
            <p className="text-lg text-on-surface-variant">
              Find answers to common questions about trading gift cards on CardYork.
              Can't find what you're looking for? Contact our support team.
            </p>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="max-w-[1200px] mx-auto px-6 pb-16 md:pb-24">
          <div className="max-w-4xl mx-auto space-y-8">
            {faqs.map((category, idx) => (
              <div key={idx} className="glass-card p-6 md:p-8 rounded-2xl animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                <h2 className="text-xl md:text-2xl font-bold mb-6 gradient-text">
                  {category.category}
                </h2>
                <div className="space-y-3">
                  {category.questions.map((faq, qIdx) => (
                    <AccordionItem
                      key={qIdx}
                      question={faq.q}
                      answer={faq.a}
                      isOpen={!!openItems[`${idx}-${qIdx}`]}
                      onClick={() => toggleItem(idx, qIdx)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="max-w-[1200px] mx-auto px-6 pb-16 md:pb-24">
          <div className="max-w-4xl mx-auto glass-card rounded-2xl p-8 md:p-12 text-center animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <FiMessageCircle className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-on-surface">
              Still have questions?
            </h3>
            <p className="text-on-surface-variant mb-8 max-w-lg mx-auto">
              Our support team is available 24/7 to help you with any questions or issues you might have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn btn-primary px-8 py-4">
                Contact Support
              </Link>
              <Link href="/register" className="btn btn-ghost border border-primary/20 px-8 py-4 bg-surface-container hover:bg-primary/5">
                Create Account
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
