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
        q: "How do I sell my gift card?",
        a: "Simply create an account, select the gift card brand you want to sell, enter the card details, upload images of your card, and submit. Our team will verify and process your trade within minutes.",
      },
      {
        q: "What gift cards do you accept?",
        a: "We accept over 200+ gift card brands including Amazon, iTunes, Google Play, Steam, PlayStation, Xbox, Walmart, Target, and many more. Check our Gift Cards page for the full list.",
      },
      {
        q: "How long does verification take?",
        a: "Most gift cards are verified within 5-15 minutes during business hours. Complex verifications may take up to 24 hours.",
      },
    ],
  },
  {
    category: "Payments & Rates",
    questions: [
      {
        q: "How do I receive payment?",
        a: "Payments are sent directly to your registered bank account. We support all major banks and payment methods.",
      },
      {
        q: "What determines the exchange rate?",
        a: "Rates vary based on the gift card brand, card value, and current market conditions. We always display the current rate before you confirm a trade.",
      },
      {
        q: "Is there a minimum or maximum trade amount?",
        a: "Minimum trade value is $10. Maximum depends on your account verification level. Fully verified accounts can trade up to $3,000 per transaction.",
      },
    ],
  },
  {
    category: "Security & Trust",
    questions: [
      {
        q: "Is my information safe?",
        a: "Absolutely. We use bank-level 256-bit encryption to protect your data. All transactions are secured and monitored for fraud.",
      },
      {
        q: "Why do I need to verify my identity?",
        a: "Identity verification helps us prevent fraud and ensures the safety of all users. It also unlocks higher trading limits for your account.",
      },
      {
        q: "What if my card is declined?",
        a: "If a card is declined, we'll notify you immediately with the reason. Common issues include invalid codes, already redeemed cards, or regional restrictions.",
      },
    ],
  },
  {
    category: "Account & Support",
    questions: [
      {
        q: "How do I contact support?",
        a: "You can reach our support team 24/7 via live chat on our platform, email at support@cardyork.com, or through our support ticket system.",
      },
      {
        q: "Can I cancel a trade?",
        a: "Trades can be cancelled before verification begins. Once verification starts, cancellation may not be possible. Contact support immediately if needed.",
      },
      {
        q: "How do I update my bank details?",
        a: "Go to your Profile page, navigate to Bank Details, and update your information. Changes may require re-verification for security.",
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
