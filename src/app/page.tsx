import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/landing/HeroSection';
import BrandsBar from '@/components/landing/BrandsBar';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import StatsSection from '@/components/landing/StatsSection';
import AppDownloadSection from '@/components/landing/AppDownloadSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CardYork — Best Site To Sell Gift Cards Fast At High Rate In Nigeria',
  description: 'Sell, Redeem, trade & Convert your iTunes, Steam, Amazon, Google, Apple Gift Cards etc to Naira in Nigeria at High rate and get paid instantly - cardyork.com',
};

export default function HomePage() {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      <HeroSection />
      <BrandsBar />
      <HowItWorksSection />
      <StatsSection />
      <AppDownloadSection />
      <FeaturesSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}
