import Link from 'next/link';
import { FiCreditCard, FiUploadCloud, FiCheckCircle, FiArrowRight } from 'react-icons/fi';

const STEPS = [
  {
    num: '1',
    Icon: FiCreditCard,
    title: 'Select Gift Card',
    desc: 'Choose the gift card type and enter the amount.',
    color: 'bg-primary/10 border-primary/20',
    iconBg: 'bg-primary/10',
  },
  {
    num: '2',
    Icon: FiUploadCloud,
    title: 'Upload Card',
    desc: 'Upload clear pictures of your gift card for verification.',
    color: 'bg-primary/5 border-primary/10',
    iconBg: 'bg-primary/10',
  },
  {
    num: '3',
    Icon: FiCheckCircle,
    title: 'Get Paid Instantly',
    desc: 'Once verified, payment is sent instantly to your wallet or bank.',
    color: 'bg-green-50/80 dark:bg-secondary/5 border-green-200/50 dark:border-secondary/10',
    iconBg: 'bg-secondary/10',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 px-6 bg-background" id="how-it-works">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* Left: Text */}
        <div className="flex flex-col items-start">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary mb-3">HOW IT WORKS</span>
          <h2 className="display-sm mb-4">
            3 Simple Steps<br />
            <span className="gradient-text">To Get Paid</span>
          </h2>
          <p className="text-on-surface-variant text-base leading-relaxed mb-8 max-w-[360px]">
            Selling your gift cards on Cardyork is fast, easy and secure. Get started in minutes.
          </p>
          <Link href="/register" className="btn btn-primary">
            Get Started <FiArrowRight className="ml-2" />
          </Link>
        </div>

        {/* Right: Steps */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
          {STEPS.map((step, i) => (
            <div key={step.num} className="flex items-center gap-5">
              <div className={`flex-shrink-0 w-14 h-14 rounded-2xl border ${step.iconBg} ${step.color} flex items-center justify-center text-2xl shadow-sm`}>
                <step.Icon className="w-6 h-6 text-on-surface" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-2xl font-black text-primary/20">{step.num}</span>
                  <h3 className="font-bold text-on-surface text-base">{step.title}</h3>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">{step.desc}</p>
              </div>
              {i < STEPS.length - 1 && (
                <span className="hidden sm:block lg:hidden text-on-surface-variant/30 text-xl mx-2">
                  <FiArrowRight />
                </span>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
