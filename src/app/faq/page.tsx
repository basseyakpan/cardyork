'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const FAQS = [
  {
    question: 'What is CardYork?',
    answer: 'CardYork is a premium exchange platform where you can sell your gift cards for instant cash. We provide a secure, fast, and reliable way to convert unused gift cards from various retailers into Naira or Cryptocurrency.',
  },
  {
    question: 'How fast will I get paid?',
    answer: 'Payments at CardYork are nearly instant! Once your gift card is verified (usually within 5 minutes), funds are dispatched immediately to your local bank account or crypto wallet. Some specific cards like Sephora or Nordstrom may take slightly longer due to manual verification processes.',
  },
  {
    question: 'Which gift cards do you accept?',
    answer: 'We accept a wide variety of gift cards including Apple/iTunes, Steam, Google Play, Razer Gold, Sephora, Nordstrom, Nike, Xbox, Footlocker, Macy’s, Vanilla, Amex, Walmart, eBay, and many more.',
  },
  {
    question: 'How can I trust CardYork?',
    answer: 'CardYork is built on integrity, longevity, and consistency. With over 50,000 happy customers and years of experience in the market, we prioritize customer satisfaction and security above all else. Our platform uses bank-level encryption to protect your data.',
  },
  {
    question: 'Can I trade via WhatsApp?',
    answer: 'Yes! While our automated platform is the fastest way to trade, many of our customers prefer the personalized, one-on-one service provided through our WhatsApp trading channel. You can find the WhatsApp link in the footer or contact section.',
  },
  {
    question: 'What are your trading hours?',
    answer: 'We are available 24/7, 365 days a year. Our automated system and customer support team work around the clock to ensure you can trade whenever you need to.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="bg-background min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 py-20 px-6">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-16">
            <span className="chip chip-primary mb-4">FAQ</span>
            <h1 className="display-sm mb-6">Frequently Asked <span className="gradient-text">Questions</span></h1>
            <p className="text-on-surface-variant text-lg">Everything you need to know about trading on CardYork. Can't find what you're looking for? Contact our support team.</p>
          </div>

          <div className="flex flex-col gap-4">
            {FAQS.map((faq, i) => (
              <div 
                key={i} 
                className={`glass-card p-6 cursor-pointer transition-all ${openIndex === i ? 'border-primary/30 bg-primary/5' : 'hover:border-primary/10'}`}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-bold text-on-surface">{faq.question}</h3>
                  <span className={`text-2xl transition-transform duration-300 ${openIndex === i ? 'rotate-45 text-primary' : 'text-on-surface-variant'}`}>+</span>
                </div>
                {openIndex === i && (
                  <p className="mt-4 text-on-surface-variant leading-relaxed animate-fade-in">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 glass-card p-8 text-center bg-gradient-to-br from-primary/10 to-transparent">
            <h3 className="text-xl font-bold mb-4">Still have questions?</h3>
            <p className="text-on-surface-variant mb-8">Our team is available 24/7 to help you with any issues or inquiries.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="btn btn-primary">Chat on WhatsApp</button>
              <button className="btn btn-ghost">Contact Support</button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
