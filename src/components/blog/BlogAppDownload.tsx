import Link from 'next/link';
import Image from 'next/image';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import { FiSmartphone } from 'react-icons/fi';

export default function BlogAppDownload() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-[1000px] mx-auto bg-surface-container-low dark:bg-surface-container rounded-[32px] border border-primary/10 shadow-lg overflow-hidden relative group">
          
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-primary/15 rounded-full blur-[80px] group-hover:bg-primary/25 transition-all duration-700 pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px] group-hover:bg-blue-500/20 transition-all duration-700 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-12 lg:p-16 gap-10">
            
            {/* Text Content */}
            <div className="flex-1 text-center md:text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 mb-2">
                <FiSmartphone className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Trade on the go</span>
              </div>
              
              <h2 className="text-[clamp(2.2rem,4vw,3.5rem)] font-extrabold tracking-tight leading-[1.1] text-on-surface">
                Trade On <span className="text-primary">The Go</span>
              </h2>
              
              <p className="text-on-surface-variant text-lg max-w-xl mx-auto md:mx-0 leading-relaxed">
                Download the Cardyork app and trade anytime, anywhere. Experience the best rates and instant payouts right from your pocket.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                <Link
                  href="/download/ios"
                  className="flex items-center justify-center gap-3 bg-black text-white px-6 py-3.5 rounded-xl hover:opacity-90 transition-opacity shadow-lg"
                >
                  <FaApple className="text-2xl" />
                  <div className="flex flex-col leading-tight text-left">
                    <span className="text-[9px] font-medium uppercase tracking-widest opacity-70">Download on the</span>
                    <span className="font-bold text-sm">App Store</span>
                  </div>
                </Link>
                <Link
                  href="/download/android"
                  className="flex items-center justify-center gap-3 bg-black text-white px-6 py-3.5 rounded-xl hover:opacity-90 transition-opacity shadow-lg"
                >
                  <FaGooglePlay className="text-2xl" />
                  <div className="flex flex-col leading-tight text-left">
                    <span className="text-[9px] font-medium uppercase tracking-widest opacity-70">GET IT ON</span>
                    <span className="font-bold text-sm">Google Play</span>
                  </div>
                </Link>
              </div>
            </div>
            
            {/* Visual/Image Side */}
            <div className="flex-1 w-full max-w-[280px] md:max-w-md relative flex justify-center mt-8 md:mt-0">
                 <Image 
                   src="/phone_mock_a.png" 
                   alt="CardYork Mobile App" 
                   width={400}
                   height={800}
                   className="w-auto h-[400px] md:h-[500px] lg:h-[540px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:scale-105 transition-transform duration-700"
                   priority
                 />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
