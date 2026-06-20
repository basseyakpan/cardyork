import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';
import { 
  FiUsers, FiCreditCard, FiShield, FiHeadphones, 
  FiLock, FiUser, FiZap, FiTrendingUp, FiTarget, 
  FiEye, FiCheckCircle, FiBell 
} from 'react-icons/fi';
import { FaApple, FaAmazon, FaSteam, FaGooglePlay } from 'react-icons/fa';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Us — CardYork | Trusted Gift Card Trading Platform in Nigeria',
  description: 'Learn about Cardyork — Nigeria\'s most trusted gift card trading platform. We provide fast, secure and reliable gift card to cash conversions at the best rates.',
};

const STATS = [
  { value: '150K+', label: 'Happy Users', sub: 'Across Nigeria and beyond', Icon: FiUsers },
  { value: '500K+', label: 'Successful Trades', sub: 'Completed with satisfaction', Icon: FiCreditCard },
  { value: '99.9%', label: 'Secure Transactions', sub: 'Safety and trust always guaranteed', Icon: FiShield },
  { value: '24/7', label: 'Customer Support', sub: 'We are here whenever you need us', Icon: FiHeadphones },
];

const CORE_VALUES = [
  { Icon: FiLock, title: 'Integrity', desc: 'We operate with honesty, transparency and fairness in everything we do.' },
  { Icon: FiShield, title: 'Security', desc: 'We prioritize the safety of our users and their transactions.' },
  { Icon: FiUser, title: 'Customer First', desc: 'We listen, support and deliver the best experience to our users.' },
  { Icon: FiZap, title: 'Speed', desc: 'We value your time and provide fast and instant solutions.' },
  { Icon: FiTrendingUp, title: 'Excellence', desc: 'We are committed to continuous improvement and innovation.' },
];

const TRUST_POINTS = [
  'Fast and easy gift card trading',
  'Best exchange rates in the market',
  'Secure platform with strong verification',
  'Instant withdrawals to bank or wallet',
  'Simple, transparent and reliable',
];

export default function AboutPage() {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />

      {/* ── Hero Section ── */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Blue gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#e8f0ff] via-[#f4f7ff] to-[#eaf3ff] dark:from-[#000822] dark:via-[#000f3a] dark:to-[#000822] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[55%] h-full bg-gradient-to-l from-blue-100/60 via-transparent to-transparent dark:from-primary/8 pointer-events-none" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[520px]">

          {/* Left: Text */}
          <div className="flex flex-col items-start">
            <div className="px-3 py-1 rounded-full border border-primary/20 bg-white/70 dark:bg-surface-container mb-6 inline-flex">
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">About Us</span>
            </div>
            <h1 className="text-[clamp(2.4rem,5vw,3.8rem)] font-extrabold tracking-tight leading-[1.1] text-on-surface mb-6">
              About <span className="text-primary">Cardyork</span>
            </h1>
            <div className="w-12 h-1 bg-primary rounded-full mb-6" />
            <p className="text-on-surface-variant text-lg leading-relaxed mb-10 max-w-[480px]">
              Cardyork is a secure and reliable gift card trading platform that helps you turn your unused gift cards
              into instant cash. We are committed to providing fast payments, competitive rates and an exceptional
              experience for every user.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-8">
              {[
                { Icon: FiShield, label: '100% Secure', sub: 'Your safety is our priority' },
                { Icon: FiZap, label: 'Instant Payment', sub: 'Get paid in minutes after approval' },
                { Icon: FiHeadphones, label: '24/7 Support', sub: "We're always here to help you" },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl flex-shrink-0">
                    <item.Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-surface">{item.label}</p>
                    <p className="text-xs text-on-surface-variant">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Phone mockup */}
          <div className="relative flex justify-center items-center">
            <div className="absolute w-72 h-72 bg-primary/15 blur-[100px] rounded-full" />

            {/* Phone mockup */}
            <div className="relative z-10 w-[280px] sm:w-[320px] lg:w-[400px]">
              <Image src="/phone_mock_c.png" alt="CardYork App Mockup" width={400} height={800} className="w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] object-contain" priority />
            </div>
          </div>
        </div>
      </section>

      {/* ── Who We Are ── */}
      <section className="py-20 px-6 bg-white dark:bg-surface-container-low">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Photo placeholder */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 dark:from-surface-container dark:to-surface-container-high relative">
              <Image 
                src="/phone-smile-businessman.avif" 
                alt="Happy CardYork User" 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Trust badge overlay */}
              <div className="absolute bottom-4 left-4 flex items-center gap-3 bg-primary text-white px-4 py-2.5 rounded-xl shadow-lg z-10">
                <FiShield className="w-6 h-6" />
                <span className="text-xs font-semibold leading-tight">Trusted by thousands<br />of users across Nigeria</span>
              </div>
            </div>
          </div>

          {/* Right: Text */}
          <div className="flex flex-col items-start">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary mb-3">WHO WE ARE</span>
            <h2 className="display-sm mb-5">
              Your Trusted Partner in<br />
              <span className="text-on-surface">Gift Card Trading</span>
            </h2>
            <p className="text-on-surface-variant text-base leading-relaxed mb-8 max-w-[480px]">
              We understand the value of your gift cards and the importance of trust in every transaction. That's why we
              use advanced security systems and a dedicated support team to ensure a smooth and worry-free experience.
            </p>
            <ul className="flex flex-col gap-3 mb-8">
              {TRUST_POINTS.map(point => (
                <li key={point} className="flex items-center gap-3 text-on-surface-variant text-sm font-medium">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-[10px] font-black">✓</span>
                  </div>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      {/* <section className="py-10 bg-primary">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {STATS.map(s => (
            <div key={s.label} className="flex items-center gap-4 py-4">
              <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                <s.Icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-white text-2xl font-extrabold leading-tight">{s.value}</span>
                <span className="text-white font-semibold text-sm leading-tight">{s.label}</span>
                <span className="text-white/60 text-[10px] leading-tight mt-0.5 hidden sm:block">{s.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* ── Mission & Vision ── */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mission */}
          <div className="glass-card p-8 flex gap-5">
            <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <FiTarget className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-on-surface mb-3">Our Mission</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                To provide a fast, secure and reliable platform that makes gift card trading simple and efficient while
                delivering the best value to our users.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="glass-card p-8 flex gap-5">
            <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <FiEye className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-on-surface mb-3">Our Vision</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                To become Africa's most trusted digital exchange platform for gift cards and other digital assets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="py-16 px-6 bg-surface-container-low">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-center text-[10px] uppercase tracking-[0.25em] font-bold text-primary mb-10">OUR CORE VALUES</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {CORE_VALUES.map(val => (
              <div key={val.title} className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/15 flex items-center justify-center">
                  <val.Icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-bold text-on-surface text-sm">{val.title}</h4>
                <p className="text-on-surface-variant text-xs leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-16 px-6 bg-primary">
        <div className="max-w-[900px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
              <FiCheckCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-white text-xl font-bold mb-1">Join thousands of happy users</h3>
              <p className="text-white/70 text-sm">Trade your gift cards with confidence on Cardyork and get paid instantly.</p>
            </div>
          </div>
          <Link
            href="/register"
            className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-primary font-bold text-base hover:bg-blue-50 transition-all shadow-lg whitespace-nowrap"
          >
            Start Trading Now →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
