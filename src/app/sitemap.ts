import { MetadataRoute } from "next";
import { createClient } from "@/prismicio";

const baseUrl = "https://cardyork.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = createClient();
  let blogEntries: MetadataRoute.Sitemap = [];

  try {
    const prismicPosts = await client.getAllByType("blog_page", {
      orderings: [
        { field: "document.first_publication_date", direction: "desc" },
      ],
    });

    blogEntries = prismicPosts.map((post: any) => ({
      url: `${baseUrl}/blog/${post.uid}`,
      lastModified: new Date(
        post.last_publication_date || post.first_publication_date || new Date(),
      ),
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch (error) {
    console.warn("Could not fetch posts from Prismic for sitemap.", error);
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sell-gift-cards`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // {
    //   url: `${baseUrl}/gift-cards-brands`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  return [...staticRoutes, ...blogEntries];
}
