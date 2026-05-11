"use client";

import { useState, useEffect } from "react";

export function CookieManager() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setShow(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "false");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 z-50 flex justify-center animate-fade-in-up">
      <div className="glass-card w-full max-w-4xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 border-primary/20 shadow-glow-primary bg-surface/95">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold text-on-surface">We value your privacy</h3>
          <p className="text-sm text-on-surface-variant">
            We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
          </p>
        </div>
        <div className="flex gap-4 shrink-0">
          <button onClick={declineCookies} className="btn btn-ghost btn-sm">Decline</button>
          <button onClick={acceptCookies} className="btn btn-primary btn-sm">Accept All</button>
        </div>
      </div>
    </div>
  );
}
