import React from 'react';
import { FaAmazon, FaApple, FaSteam, FaGooglePlay, FaEbay, FaShoppingBag } from 'react-icons/fa';
import { SiApplemusic, SiRazer, SiVisa, SiAmericanexpress } from 'react-icons/si';

interface BrandLogoProps {
  id: string;
  fallback: string;
  className?: string;
}

export default function BrandLogo({ id, fallback, className = "w-6 h-6" }: BrandLogoProps) {
  switch (id) {
    case 'gc_amazon':
      return <FaAmazon className={`${className} text-[#FF9900]`} />;
    case 'gc_itunes':
      // iTunes is closely associated with Apple Music/iTunes store - we use Apple Music brand colors
      return <SiApplemusic className={`${className} text-[#FC3C44]`} />;
    case 'gc_steam':
      // Steam color - steel/blue-dark
      return <FaSteam className={`${className} text-[#1b2838] dark:text-white`} />;
    case 'gc_google':
      return <FaGooglePlay className={`${className} text-[#4285F4]`} />;
    case 'gc_apple':
      return <FaApple className={`${className} text-[#A3AAAE] dark:text-white`} />;
    case 'gc_ebay':
      return <FaEbay className={`${className} text-[#E53238]`} />;
    case 'gc_razer':
      return <SiRazer className={`${className} text-[#00FF00]`} />;
    case 'gc_vanilla':
      // Vanilla is a Visa/Mastercard prepaid brand. We use Visa blue/gold
      return <SiVisa className={`${className} text-[#1A1F71] dark:text-white`} />;
    case 'gc_amex':
      return <SiAmericanexpress className={`${className} text-[#016FD0]`} />;
    case 'gc_nordstrom':
      return <FaShoppingBag className={`${className} text-[#1a1a1a] dark:text-white`} />;
    default:
      // Fallback to emoji if no icon matches
      return <span className="text-2xl select-none">{fallback}</span>;
  }
}
