import Image from 'next/image';

export default function StatsSection() {
  return (
    <section className="py-8 border-y border-primary/10 bg-[#0b1120] dark:bg-black">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col items-center">
        <p className="text-sm font-bold text-white/60 uppercase tracking-[0.2em] mb-4">
          As Mentioned On
        </p>
        <div className="flex justify-center items-center gap-4 sm:gap-12 md:gap-24 lg:gap-32 opacity-80 hover:opacity-100 transition-opacity duration-300 w-full overflow-hidden">
          <Image 
            src="/tribune.png" 
            alt="Tribune" 
            width={3000} 
            height={1000} 
            className="h-16 sm:h-24 lg:h-32 w-auto object-contain shrink-0" 
          />
          <Image 
            src="/times.png" 
            alt="Premium Times" 
            width={300} 
            height={100} 
            className="h-16 sm:h-24 lg:h-32 w-auto object-contain shrink-0" 
          />
          <Image 
            src="/punch.png" 
            alt="Punch" 
            width={300} 
            height={100} 
            className="h-16 sm:h-24 lg:h-24 w-auto object-contain shrink-0" 
          />
        </div>
      </div>
    </section>
  );
}
