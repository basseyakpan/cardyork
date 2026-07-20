"use client";
import Link from "next/link";
import Image from "next/image";
import { FiShield, FiZap, FiHeadphones } from "react-icons/fi";
import { FaGooglePlay, FaApple } from "react-icons/fa";
import { useRouter } from "next/navigation";

const TRUST_BADGES = [
  { Icon: FiShield, label: "100% Secure", sub: "Your safety is our priority" },
  { Icon: FiZap, label: "Instant Payment", sub: "Get paid in minutes" },
  {
    Icon: FiHeadphones,
    label: "24/7 Support",
    sub: "We're always here to help you",
  },
];

export default function HeroSection() {
  const router = useRouter();
  const handleDownloadClick = () => {
    // @ts-ignore
    if (navigator.userAgentData) {
      // @ts-ignore
      navigator.userAgentData
        .getHighEntropyValues(["platform"])
        .then((ua: any) => {
          if (ua.platform === "Android") {
            router.push(
              "https://play.google.com/store/apps/details?id=com.cardyork.app",
            );
            console.log("User is on Android");
          } else if (ua.platform === "iOS") {
            console.log("User is on iPhone/iPad");
          }
        });
    } else {
      const os = getMobileOperatingSystem();
      if (os === "iOS") {
        window.location.href = "/download";
        // router.push("/download");
      } else {
        router.push(
          "https://play.google.com/store/apps/details?id=com.cardyork.app",
        );
      }
    }
  };

  function getMobileOperatingSystem() {
    const userAgent = navigator.userAgent || navigator.vendor;

    // Windows Phone check (just in case)
    if (/windows phone/i.test(userAgent)) {
      return "Windows Phone";
    }

    // Android check
    if (/android/i.test(userAgent)) {
      return "Android";
    }

    // iOS check (iPhone, iPod, iPad)
    // Note: iOS 13+ iPads sometimes masquerade as Macintoshes, handled below
    if (/iPad|iPhone|iPod/.test(userAgent)) {
      return "iOS";
    }

    // iPadOS 13+ detection (it reports as Macintosh but has touch capabilities)
    if (
      navigator.maxTouchPoints &&
      navigator.maxTouchPoints > 2 &&
      /Macintosh/.test(userAgent)
    ) {
      return "iOS";
    }

    return "unknown";
  }

  return (
    <section className="relative lg:min-h-screen block lg:flex lg:items-center pt-20 lg:pt-28 pb-8 lg:pb-12 overflow-hidden bg-background">
      {/* Soft blue gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e8f0ff] via-[#f4f7ff] to-[#eaf3ff] dark:from-[#000822] dark:via-[#000f3a] dark:to-[#000822] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[55%] h-full bg-gradient-to-l from-blue-100/60 via-transparent to-transparent dark:from-primary/10 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 flex flex-col lg:flex-row items-center justify-between">
        {/* ── Left: Copy ── */}
        <div className="w-full lg:w-1/2 flex flex-col items-start pt-4 lg:pt-0 relative z-20">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/80 dark:bg-surface-container border border-primary/20 shadow-sm">
            <span className="text-xs text-on-surface-variant font-semibold">
              ✦ Gift Card Trading Platform in Nigeria
            </span>
          </div>

          <h1 className="text-[clamp(2.4rem,5.5vw,4rem)] font-extrabold tracking-tight leading-[1.1] text-on-surface mb-5">
            Trade Gift Cards.
            <br />
            Get Paid <span className="text-primary">Instantly.</span>
          </h1>

          <p className="text-on-surface-variant text-lg leading-relaxed mb-8 max-w-[480px]">
            Sell your gift cards for the best rates and get paid instantly to
            your bank or wallet. Safe, fast and reliable.
          </p>

          <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center gap-3 sm:gap-4 mb-6">
            <Link
              href="#"
              onClick={handleDownloadClick}
              className="inline-flex items-center justify-center gap-3 bg-[#0d52ff] dark:bg-primary text-white rounded-full px-6 sm:px-8 py-3.5 sm:py-4 text-[13px] sm:text-base font-semibold hover:opacity-90 transition-opacity w-full sm:w-auto"
            >
              <div className="flex items-center gap-2.5">
                <FaGooglePlay className="text-[20px]" />
                <div className="w-px h-5 bg-white/40" />
                <FaApple className="text-[22px] mb-0.5" />
              </div>
              <span className="ml-1">Download App</span>
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-[13px] sm:text-base font-semibold border-[1.5px] border-primary/20 text-primary bg-white/60 dark:bg-surface-container hover:bg-primary/5 transition-all whitespace-nowrap w-full sm:w-auto"
            >
              Get Started{" "}
              <span className="font-bold text-lg leading-none mt-[1px]">→</span>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start w-full gap-6">
            {TRUST_BADGES.map(({ Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-on-surface">
                    {label}
                  </span>
                  <span className="text-[10px] text-on-surface-variant">
                    {sub}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Hero PNG ── */}
        <div className="relative flex justify-center lg:justify-end items-end w-full lg:w-[45%] mt-12 lg:mt-0 z-10 pointer-events-none">
          {/* Glow behind image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] lg:w-[450px] lg:h-[450px] bg-primary/15 blur-[100px] rounded-full -z-10" />

          <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] flex justify-center lg:justify-end">
            <Image
              src="/cardYorkHero.png"
              alt="CardYork Gift Card Trading App"
              width={750}
              height={1052}
              priority
              className="w-auto h-full object-contain object-bottom lg:object-right-bottom drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
