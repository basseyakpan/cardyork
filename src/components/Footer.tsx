'use client';
import Link from 'next/link';

const FOOTER_LINKS = {
  support: [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Sell Gift Cards', href: '/sell-gift-cards' },
    { label: 'FAQs', href: '/faq' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms and Conditions', href: '/terms-and-conditions' },
  ],
  giftCards: [
    { label: 'Sell Steam Gift Card', href: '/sell-gift-cards/steam' },
    { label: 'Sell Apple Gift Card', href: '/sell-gift-cards/apple' },
    { label: 'Sell Google Play Gift Card', href: '/sell-gift-cards/google-play' },
    { label: 'Sell Sephora Gift Card', href: '/sell-gift-cards/sephora' },
    { label: 'Sell Amex Gift Card', href: '/sell-gift-cards/amex' },
    { label: 'Sell eBay Gift Card', href: '/sell-gift-cards/ebay' },
    { label: 'Sell Amazon Gift Card', href: '/sell-gift-cards/amazon' },
    { label: 'Sell Nike Gift Card', href: '/sell-gift-cards/nike' },
    { label: 'Sell Razer Gold Gift Card', href: '/sell-gift-cards/razer-gold' },
    { label: 'Sell Vanilla Gift Card', href: '/sell-gift-cards/vanilla' },
    { label: 'Sell Nordstrom Gift Card', href: '/sell-gift-cards/nordstrom' },
    { label: 'Sell Macy Gift Card', href: '/sell-gift-cards/macys' },
  ],
  social: [
    { label: 'Twitter / X', href: 'https://twitter.com/cardyork', icon: '✕' },
    { label: 'Instagram', href: 'https://instagram.com/cardyork', icon: '◉' },
    { label: 'Facebook', href: 'https://facebook.com/cardyork', icon: 'f' },
    { label: 'WhatsApp', href: 'https://api.whatsapp.com/send/?phone=2348026846656&text=Hello+Cardyork!', icon: '●' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-primary/5">
      {/* Newsletter */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border-y border-primary/5 py-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-on-surface mb-2">Stay Updated</h3>
              <p className="text-on-surface-variant text-base max-w-[480px]">Stay updated with recent happenings and announcements from Team CardYork</p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3 w-full max-w-[500px]" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email address"
                className="input-field bg-surface-container-high/50 border-primary/10 focus:bg-surface-container"
                aria-label="Email for newsletter"
              />
              <button type="submit" className="btn btn-primary px-8">Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="flex flex-col gap-6">
              <Link href="/" className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight no-underline">
                <span className="text-2xl bg-gradient-primary bg-clip-text text-transparent">⬡</span>
                <span className="text-on-surface">Card<span className="bg-gradient-primary bg-clip-text text-transparent">York</span></span>
              </Link>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Sell, trade &amp; convert your gift cards to Naira at the best rates in Nigeria. Safe, fast, and secure.
              </p>
              <div className="flex flex-col gap-4">
                <a href="mailto:support@cardyork.com" className="flex items-center gap-3 text-on-surface-variant text-sm hover:text-primary transition-colors duration-200">
                  <span className="text-lg">✉</span>
                  support@cardyork.com
                </a>
                <a href="https://wa.me/2348026846656" className="flex items-center gap-3 text-on-surface-variant text-sm hover:text-primary transition-colors duration-200" target="_blank" rel="noopener noreferrer">
                  <span className="text-lg">📱</span>
                  0802 684 6656
                </a>
                <div className="flex items-start gap-3 text-on-surface-variant text-sm">
                  <span className="text-lg mt-0.5">📍</span>
                  <span>Abayomi Shonuga Cres, Lekki Phase I, Lagos</span>
                </div>
              </div>
              {/* Social links */}
              <div className="flex items-center gap-3 mt-2">
                {FOOTER_LINKS.social.map(s => (
                  <a 
                    key={s.label} 
                    href={s.href} 
                    className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant border border-primary/10 hover:bg-primary hover:text-white hover:-translate-y-1 transition-all duration-300 no-underline" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Support Column */}
            <div className="flex flex-col gap-6">
              <h4 className="text-on-surface text-base font-bold uppercase tracking-wider">Support</h4>
              <ul className="flex flex-col gap-3 list-none">
                {FOOTER_LINKS.support.map(l => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-on-surface-variant text-sm hover:text-primary hover:translate-x-1 transition-all duration-200 inline-block no-underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Gift Cards Column */}
            <div className="flex flex-col gap-6">
              <h4 className="text-on-surface text-base font-bold uppercase tracking-wider">Gift Cards</h4>
              <ul className="flex flex-col gap-3 list-none">
                {FOOTER_LINKS.giftCards.slice(0, 6).map(l => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-on-surface-variant text-sm hover:text-primary hover:translate-x-1 transition-all duration-200 inline-block no-underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <h4 className="text-on-surface text-base font-bold uppercase tracking-wider">More Cards</h4>
              <ul className="flex flex-col gap-3 list-none">
                {FOOTER_LINKS.giftCards.slice(6).map(l => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-on-surface-variant text-sm hover:text-primary hover:translate-x-1 transition-all duration-200 inline-block no-underline">
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
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-on-surface-variant text-xs text-center md:text-left">
              © {new Date().getFullYear()} CardYork. All assets secured in the Luminous Archive.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6">
              <Link href="/privacy-policy" className="text-on-surface-variant text-xs hover:text-primary no-underline transition-colors duration-200">Privacy Policy</Link>
              <Link href="/terms-and-conditions" className="text-on-surface-variant text-xs hover:text-primary no-underline transition-colors duration-200">Terms & Conditions</Link>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}

