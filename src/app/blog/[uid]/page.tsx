import { createClient } from "@/prismicio";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import Link from "next/link";

export const revalidate = 0;

export default async function BlogPost({
  params,
}: {
  params: { uid: string };
}) {
  const client = createClient();
  let page;

  try {
    page = await client.getByUID("blog_page", params.uid);
  } catch (error) {
    return (
      <main className="bg-background min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 py-32 px-6 flex items-center justify-center text-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <p className="text-on-surface-variant mb-8">
              The blog post you are looking for doesn't exist.
            </p>
            <Link href="/blog" className="btn btn-primary">
              Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const title = 
    page.data.meta_title || 
    page.data.slices?.[0]?.primary?.title?.[0]?.text || 
    page.slugs[0]?.replace(/-/g, ' ') || 
    page.uid;
    
  const category = page.tags?.[0] || "Article";
  const author = "CardYork Team";
  const date = new Date(page.first_publication_date).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  );

  const imageUrl = page.data.meta_image?.url || page.data.slices?.[0]?.primary?.image?.url;

  return (
    <main className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 py-24 px-6">
        <article className="max-w-[800px] mx-auto mt-12">
          <div className="mb-10 text-center flex flex-col items-center">
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-primary mb-6">
              <span>{category}</span>
              <span className="w-1 h-1 rounded-full bg-on-surface-variant" />
              <span className="text-on-surface-variant">{date}</span>
            </div>
            <h1 className="display-sm mb-6">{title}</h1>
            <div className="text-on-surface-variant text-sm font-bold">
              By {author}
            </div>
          </div>

          {imageUrl && (
            <div className="w-full h-64 md:h-[400px] bg-surface-container-high rounded-xl overflow-hidden mb-12 shadow-ambient">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="glass-card p-8 md:p-12">
            <div className="prose prose-invert max-w-none text-on-surface-variant leading-loose [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-on-surface [&>h2]:mt-10 [&>h2]:mb-4 [&>p]:mb-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>a]:text-primary [&>a]:underline">
              <SliceZone slices={page.data.slices} components={components} />
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <Link href="/blog" className="btn btn-ghost">
              ← Back to all posts
            </Link>
          </div>
        </article>
      </div>
      <Footer />
    </main>
  );
}
