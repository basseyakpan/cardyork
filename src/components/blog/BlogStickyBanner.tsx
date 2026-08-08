"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function BlogStickyBanner() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [buttonText, setButtonText] = useState("Download");
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userAgent =
        navigator.userAgent || navigator.vendor || (window as any).opera;
      if (/android/i.test(userAgent)) {
        setIsAndroid(true);
      }
    }

    const onScroll = () => {
      if (window.scrollY > 300) setVisible(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleDownloadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (typeof window === "undefined") return;

    const userAgent =
      navigator.userAgent || navigator.vendor || (window as any).opera;
    // Basic iOS detection
    const isIOS =
      /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
    // Mac OS Safari sometimes masks as desktop, but usually we just cover mobile iOS explicitly.
    const isMacWithTouch =
      /Macintosh/.test(userAgent) &&
      navigator.maxTouchPoints &&
      navigator.maxTouchPoints > 1;

    if (isIOS || isMacWithTouch) {
      setButtonText("iOS Coming Soon…");
      setTimeout(() => setButtonText("Download App"), 4000);
    } else {
      window.open(
        "https://play.google.com/store/apps/details?id=com.cardyork.app",
        "_blank",
        "noopener,noreferrer",
      );
    }
  };

  if (!isAndroid || dismissed) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 p-4 md:p-6 z-50 transition-transform duration-500 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {/* Blur backdrop for mobile */}
      <div className="relative bg-surface-container/95 border border-outline-variant rounded-2xl backdrop-blur-md shadow-[0_-8px_40px_rgba(0,0,0,0.12)] px-4 py-3 md:px-6 md:py-4">
        <div className="max-w-[1200px] mx-auto flex items-center gap-4 md:gap-8">
          {/* Icon */}
          <div className="flex w-10 h-10 flex-shrink-0 rounded-xl bg-primary/10 items-center justify-center text-primary text-xl">
            <Image src="/icon.png" alt="Cardyork Logo" width={40} height={40} />
          </div>

          {/* Copy */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-on-surface leading-tight">
              Download Cardyork App
            </p>
            <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
              Sell your gift cards at the best rates and get paid in seconds.
            </p>
          </div>

          {/* Download buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleDownloadClick}
              className="flex items-center gap-2 bg-primary text-on-primary text-xs font-semibold px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              <span>{buttonText}</span>
            </button>
          </div>

          {/* Dismiss */}
          {/* <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss"
            className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors text-lg leading-none"
          >
            ×
          </button> */}
        </div>
      </div>
    </div>
  );
}
