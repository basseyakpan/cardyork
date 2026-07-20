"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation"; // Import Next.js hooks
import { FiSmartphone, FiX } from "react-icons/fi";

export default function ComingSoonModal() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // 1. Listen for Next.js programmatic routing or direct hits
    if (pathname?.startsWith("/download")) {
      setIsOpen(true);
      // Optional: Push them back to the home page or previous page
      // so the URL doesn't stay stuck on /download while the modal is open
      router.replace("/");
    }

    // 2. Keep your <a> tag interceptor just in case there are static links on the page
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      if (link && link.getAttribute("href")?.startsWith("/download")) {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(true);
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [pathname, router]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-surface w-full max-w-sm rounded-3xl p-8 flex flex-col items-center text-center relative shadow-2xl border border-outline-variant animate-in zoom-in-95 duration-300">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface bg-surface-container hover:bg-surface-container-high p-2 rounded-full transition-colors"
        >
          <FiX className="w-5 h-5" />
        </button>

        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 animate-pulse">
          <FiSmartphone className="w-10 h-10" />
        </div>

        <h3 className="text-2xl font-bold text-on-surface mb-3">
          App Coming Soon!
        </h3>
        <p className="text-on-surface-variant mb-8">
          We're putting the finishing touches on our iOS app. It will be
          available on the Apple App Store soon. In the meantime, you can
          download Cardyork on Google Play.
        </p>

        <button
          onClick={() => setIsOpen(false)}
          className="w-full btn btn-primary py-3.5 rounded-xl font-bold text-base"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}
