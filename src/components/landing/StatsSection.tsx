import Image from 'next/image';

export default function StatsSection() {
  return (
    <section className="py-8 border-y border-primary/10 bg-[#0b1120] dark:bg-black">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col items-center">
        <p className="text-sm font-bold text-white/60 uppercase tracking-[0.2em] mb-4">
          As Mentioned On
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 lg:gap-32 opacity-80 hover:opacity-100 transition-opacity duration-300">
          <Image 
            src="/tribune.png" 
            alt="Tribune" 
            width={3000} 
            height={1000} 
            className="h-24 sm:h-20 lg:h-48 w-auto object-contain" 
          />
          <Image 
            src="/times.png" 
            alt="Premium Times" 
            width={300} 
            height={100} 
            className="h-10 sm:h-14 lg:h-48 w-auto object-contain" 
          />
          <Image 
            src="/punch.png" 
            alt="Punch" 
            width={300} 
            height={100} 
            className="h-10 sm:h-14 lg:h-48 w-auto object-contain" 
          />
        </div>
      </div>
    </section>
  );
}
