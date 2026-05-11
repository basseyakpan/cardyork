"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MOCK_GIFT_CARDS } from "@/store/slices/tradeSlice";

export default function SellGiftCardsPage() {
  return (
    <main className="bg-background min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          <span className="chip chip-secondary mb-6">High Exchange Rates</span>
          <h1 className="display-md mb-6">
            Sell Your Gift Cards for{" "}
            <span className="gradient-text">Instant Cash</span>
          </h1>
          <p className="text-on-surface-variant text-lg max-w-[700px] mx-auto mb-10">
            Convert your Apple, Steam, Amazon, Google, and other gift cards to
            Naira or Crypto at the most competitive rates in Nigeria. Fast,
            secure, and available 24/7.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/login" className="btn btn-primary btn-lg">
              Start Trading Now
            </Link>
            <button className="btn btn-ghost btn-lg">Chat on WhatsApp</button>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 px-6 bg-surface-container-low">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="display-sm mb-4">
              How to{" "}
              <span className="gradient-text-green">Trade in 3 Steps</span>
            </h2>
            <p className="text-on-surface-variant">
              The fastest way to liquidate your digital assets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Visit Website",
                desc: "Go to our platform and create an account or sign in to your dashboard.",
              },
              {
                step: "02",
                title: "Enter Details",
                desc: "Select your card type, enter the amount, and upload the card images or codes.",
              },
              {
                step: "03",
                title: "Get Paid",
                desc: "Once verified, your funds are dispatched immediately to your linked bank account.",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="glass-card p-8 flex flex-col gap-4 relative overflow-hidden group"
              >
                <span className="text-5xl font-black text-primary/10 absolute top-2 right-2 group-hover:text-primary/20 transition-colors">
                  {s.step}
                </span>
                <h3 className="text-xl font-bold text-on-surface">{s.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="display-sm">
              Accepted <span className="gradient-text">Brands</span>
            </h2>
            <Link
              href="/gift-cards-brands"
              className="text-primary font-bold hover:underline"
            >
              View All Brands →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {MOCK_GIFT_CARDS.map((card) => (
              <Link
                key={card.id}
                href={`/login`}
                className="glass-card-sm p-6 flex flex-col items-center gap-3 hover:border-primary/30 hover:bg-primary/5 transition-all text-center group"
              >
                <span className="text-4xl group-hover:scale-110 transition-transform">
                  {card.icon}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                  {card.brand}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary/5 to-transparent">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="chip chip-primary mb-6">Why Choose Us</span>
            <h2 className="display-sm mb-6">
              Built on{" "}
              <span className="gradient-text">Trust and Integrity</span>
            </h2>
            <ul className="flex flex-col gap-6">
              {[
                {
                  title: "Best Market Rates",
                  desc: "We monitor market trends in real-time to ensure you always get the highest value for your cards.",
                },
                {
                  title: "Instant Payouts",
                  desc: "No long waits. Get your money within 5 minutes of verification.",
                },
                {
                  title: "Bank-Level Security",
                  desc: "Your data and transactions are protected by advanced encryption protocols.",
                },
                {
                  title: "24/7 Dedicated Support",
                  desc: "Our team is always here to help you through every step of your trade.",
                },
              ].map((f, i) => (
                <li key={i} className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-xs flex-shrink-0 mt-1">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface mb-1">
                      {f.title}
                    </h4>
                    <p className="text-on-surface-variant text-sm">{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-card p-2 aspect-video overflow-hidden rounded-2xl border-primary/20 shadow-glow-primary">
            <div className="w-full h-full bg-surface-container-high animate-pulse flex items-center justify-center text-on-surface-variant font-bold italic">
              [Vanguard Trading Terminal Preview]
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
