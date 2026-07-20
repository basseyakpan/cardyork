'use client';
import Link from 'next/link';
import Image from 'next/image';
import { FaApple, FaGooglePlay } from 'react-icons/fa';

export default function AppDownloadSection() {
  return (
    <section id="app-download" className="bg-background">
      <div className="w-full bg-surface-container-lowest dark:bg-background overflow-hidden flex flex-col md:flex-row items-center border-y border-primary/10 relative min-h-[400px]">
        {/* Left side: Phone placeholder */}
        <div className="w-full md:w-[45%] lg:w-1/2 h-64 md:h-full min-h-[450px] flex items-end justify-center pt-8 md:pt-16 bg-[#e8f0ff] dark:bg-surface-container relative overflow-hidden">
          {/* Phone Frame Image */}
          <div className="relative w-full h-[400px] md:h-[550px] flex items-end justify-center">
            <Image
              src="/phone_mock_a.png"
              alt="CardYork Mobile App"
              width={500}
              height={1000}
              className="w-auto h-full object-contain translate-y-0 drop-shadow-xl"
              priority
            />
          </div>
        </div>

        {/* Right side: Content */}
        <div className="w-full md:w-[55%] lg:w-1/2 p-8 md:p-12 lg:p-20 xl:p-32 flex flex-col justify-center bg-surface-container-lowest dark:bg-background">
          <h2 className="text-3xl md:text-4xl lg:text-[40px] leading-tight font-extrabold mb-5 text-on-surface">
            Download The App
          </h2>
          <p className="text-on-surface-variant mb-10 max-w-md text-[17px] leading-relaxed">
            Experience the best of CardYork on your phone or tablet. Available for iOS and Android operating systems.
          </p>

          <div className="flex flex-col xl:flex-row gap-4">
            <Link href={'/download'} className="flex items-center gap-4 bg-black text-white px-8 py-[18px] rounded-full hover:bg-black/80 transition-colors w-full xl:w-auto justify-center min-w-[240px] cursor-pointer border-none">
              <FaApple className="text-[26px]" />
              <span className="text-[19px] font-bold">Get on iPhone</span>
            </Link>

            <a href="https://play.google.com/store/apps/details?id=com.cardyork.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-primary text-white px-8 py-[18px] rounded-full hover:bg-primary/90 transition-colors w-full xl:w-auto justify-center min-w-[240px] no-underline">
              <FaGooglePlay className="text-2xl" />
              <span className="text-[19px] font-bold tracking-tight">Get on Android</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
