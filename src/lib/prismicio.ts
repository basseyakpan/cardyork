/**
 * Prismic CMS Configuration
 *
 * TODO: Complete setup when Prismic repository is ready.
 * 1. Run: npx @slicemachine/init@latest
 * 2. Set NEXT_PUBLIC_PRISMIC_ENVIRONMENT in .env.local
 * 3. Uncomment and configure the client below
 */

// import * as prismic from '@prismicio/client';
// import { enableAutoPreviews } from '@prismicio/next';

// export const repositoryName = process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT!;

// export function createClient(config?: prismic.ClientConfig) {
//   const client = prismic.createClient(repositoryName, {
//     ...config,
//   });
//   enableAutoPreviews({ client });
//   return client;
// }

// Placeholder types — extend once Prismic types are generated
export interface BlogPost {
  id: string;
  uid: string;
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  publishDate: string;
  readTime: number;
  category: string;
  tags: string[];
}

// Mock blog posts for UI placeholder
export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'bp_001',
    uid: 'how-to-sell-amazon-gift-cards',
    title: 'How to Sell Amazon Gift Cards for Instant Cash in Nigeria',
    excerpt: 'Step-by-step guide to converting your Amazon gift cards to Naira at the best rates using CardYork.',
    coverImage: '/blog/amazon-guide.jpg',
    author: 'CardYork Team',
    publishDate: '2024-12-10',
    readTime: 5,
    category: 'Guides',
    tags: ['Amazon', 'Gift Cards', 'Tutorial'],
  },
  {
    id: 'bp_002',
    uid: 'best-gift-cards-to-trade-in-nigeria',
    title: 'Best Gift Cards to Trade in Nigeria: 2024 Rate Guide',
    excerpt: 'Discover which gift card brands offer the highest exchange rates and quickest payouts in the Nigerian market.',
    coverImage: '/blog/rate-guide.jpg',
    author: 'CardYork Team',
    publishDate: '2024-12-05',
    readTime: 7,
    category: 'Market Insights',
    tags: ['Rates', 'Market', 'Guide'],
  },
  {
    id: 'bp_003',
    uid: 'stay-safe-trading-gift-cards',
    title: 'How to Stay Safe When Trading Gift Cards Online',
    excerpt: 'Essential security tips for safe gift card trading and how CardYork\'s vault-grade security protects your assets.',
    coverImage: '/blog/security.jpg',
    author: 'Security Team',
    publishDate: '2024-11-28',
    readTime: 4,
    category: 'Security',
    tags: ['Security', 'Safety', 'Tips'],
  },
];
