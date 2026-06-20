import Link from 'next/link';
import Image from 'next/image';
import { FaApple, FaGooglePlay } from 'react-icons/fa';

const FOOTER_LINKS = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Blog', href: '/blog' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms-and-conditions' },
    { label: 'Account Deletion', href: '/account-deletion' },
  ],
  contact: [
    { label: '+234-802-684-6656', href: 'tel:+2348026846656' },
    { label: 'support@cardyork.com', href: 'mailto:support@cardyork.com' },
    { label: 'Partners@Cardyork.com', href: 'mailto:Partners@Cardyork.com' },
  ],
  giftCards: [
    { label: 'Steam', href: '/sell-gift-cards/steam' },
    { label: 'Apple', href: '/sell-gift-cards/apple' },
    { label: 'Razer gold', href: '/sell-gift-cards/razer-gold' },
    { label: 'Xbox', href: '/sell-gift-cards/xbox' },
    { label: 'Playstation', href: '/sell-gift-cards/playstation' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-primary/5">
      {/* Main Footer */}
      <div className="py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-12 lg:gap-8">
            {/* Brand Column */}
            <div className="flex flex-col gap-6 col-span-2 md:col-span-4 lg:col-span-2">
              <Link href="/" className="inline-block no-underline">
                <Image src="/logo.png" alt="CardYork Logo" width={140} height={40} className="object-contain" priority />
              </Link>
              <p className="text-on-surface-variant text-sm leading-relaxed max-w-[320px]">
                Cardyork is a technology-driven platform focused on simplifying gift card transactions through secure systems, transparent processes, and exceptional customer experience. We are dedicated to building trusted digital solutions that users can rely on every day.
              </p>
              
              <div className="mt-4">
                <h4 className="text-on-surface text-base font-bold mb-4">Trade on the Go</h4>
                <div className="flex flex-wrap gap-3">
                  <Link href="#" className="inline-flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity">
                    <FaApple className="text-2xl" />
                    <div className="flex flex-col leading-tight">
                      <span className="text-[8px] uppercase tracking-wider opacity-80">Download on</span>
                      <span className="text-xs font-bold">Apple</span>
                    </div>
                  </Link>
                  <Link href="#" className="inline-flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity">
                    <FaGooglePlay className="text-2xl" />
                    <div className="flex flex-col leading-tight">
                      <span className="text-[8px] uppercase tracking-wider opacity-80">GET IT ON</span>
                      <span className="text-xs font-bold">Google Play</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Links Columns */}
            <div className="flex flex-col gap-6">
              <h4 className="text-on-surface text-base font-bold uppercase tracking-wider">Company</h4>
              <ul className="flex flex-col gap-3 list-none">
                {FOOTER_LINKS.company.map(l => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-on-surface-variant text-sm hover:text-primary transition-colors no-underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <h4 className="text-on-surface text-base font-bold uppercase tracking-wider">Legal</h4>
              <ul className="flex flex-col gap-3 list-none">
                {FOOTER_LINKS.legal.map(l => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-on-surface-variant text-sm hover:text-primary transition-colors no-underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <h4 className="text-on-surface text-base font-bold uppercase tracking-wider">Contact</h4>
              <ul className="flex flex-col gap-3 list-none overflow-hidden">
                {FOOTER_LINKS.contact.map(l => (
                  <li key={l.href} className="truncate">
                    <a href={l.href} className="text-on-surface-variant text-sm hover:text-primary transition-colors no-underline">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <h4 className="text-on-surface text-base font-bold uppercase tracking-wider">Gift cards</h4>
              <ul className="flex flex-col gap-3 list-none">
                {FOOTER_LINKS.giftCards.map(l => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-on-surface-variant text-sm hover:text-primary transition-colors no-underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary/5 py-8 bg-black/20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col items-center justify-center text-center gap-2">
            <p className="text-on-surface-variant text-sm">
              © 2026 Cardyork Digital Solutions Limited.
            </p>
            <p className="text-on-surface-variant text-sm">
              All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
