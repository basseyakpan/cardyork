import type { Metadata } from 'next';
import './globals.css';
import ReduxProvider from '@/store/ReduxProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import { CookieManager } from '@/components/CookieManager';
import ComingSoonModal from '@/components/ComingSoonModal';

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/images/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/images/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/images/icon.png',
    apple: [
      { url: '/images/icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  title: 'CardYork — Turn Gift Cards into Instant Cash',
  description: 'Sell, trade & convert your iTunes, Steam, Amazon, Google, Apple Gift Cards etc to Naira in Nigeria at high rate and get paid instantly. Safe, fast, and secure.',
  keywords: 'sell gift cards, gift card trading, Nigeria, instant cash, Amazon gift card, iTunes, Steam',
  openGraph: {
    title: 'CardYork — Best Site To Sell Gift Cards Fast At High Rate In Nigeria',
    description: 'Get paid within 5 minutes. Secure, fast, and offering the best market rates.',
    url: 'https://cardyork.com',
    siteName: 'CardYork',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CardYork — Turn Gift Cards into Instant Cash',
    description: 'Trade your gift cards at the best rates in Nigeria.',
  },

};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ReduxProvider>
            {children}
            <CookieManager />
            <ComingSoonModal />
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
