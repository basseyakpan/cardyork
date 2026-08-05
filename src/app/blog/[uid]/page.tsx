import { createClient } from "@/prismicio";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import Link from "next/link";
import BlogAppDownload from "@/components/blog/BlogAppDownload";

export const revalidate = 0;

export default async function BlogPost({
  params,
}: {
  params: Promise<{ uid: string }> | { uid: string };
}) {
  const resolvedParams = await params;
  const client = createClient();
  let page: any;
  let recentPosts: any = [];

  try {
    page = await client.getByUID("blog_page", resolvedParams.uid);
    
    // Fetch recent posts
    const allPosts = await client.getAllByType("blog_page", {
      orderings: [
        { field: "document.first_publication_date", direction: "desc" },
      ],
      limit: 5,
    });
    // Filter out current post
    recentPosts = allPosts.filter((p: any) => p.uid !== resolvedParams.uid).slice(0, 4);
  } catch (error) {
    return (
      <main className="bg-background min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 py-32 px-6 flex items-center justify-center text-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <p className="text-on-surface-variant mb-8">
              The blog post you are looking for doesn&apos;t exist.
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

  const firstSlice = page.data.slices?.[0];
  const primary = firstSlice?.primary as any;

  const title =
    page.data.meta_title ||
    (primary && "title" in primary ? primary.title?.[0]?.text : null) ||
    (primary && "post_heading" in primary ? primary.post_heading?.[0]?.text : null) ||
    page.slugs[0]?.replace(/-/g, " ") ||
    page.uid;

  const category = page.tags?.[0] || "Article";
  const author =
    (primary && "author_name" in primary && Array.isArray(primary.author_name) && primary.author_name[0]?.text) ||
    "CardYork Team";

  const date = new Date(page.first_publication_date).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  );

  const imageUrl =
    page.data.meta_image?.url ||
    (primary && "image" in primary ? primary.image?.url : null) ||
    (primary && "post_image" in primary ? primary.post_image?.url : null);

  return (
    <main className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 py-24 px-6">
        <div className="max-w-[1200px] mx-auto mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Blog Post Content */}
            <article className="lg:col-span-8">
              <div className="mb-10 text-center flex flex-col items-center">
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-primary mb-6">
                  <span>{category}</span>
                  <span className="w-1 h-1 rounded-full bg-on-surface-variant" />
                  <span className="text-on-surface-variant">{date}</span>
                </div>
                <h1 className="display-sm mb-6">{title}</h1>
                <div className="text-on-surface-variant text-sm font-bold flex flex-wrap gap-4 items-center justify-center">
                  <span>By {author}</span>
                  {page.tags && page.tags.length > 0 && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-on-surface-variant" />
                      <div className="flex gap-2">
                        {page.tags.map((tag: string) => (
                          <Link 
                            key={tag} 
                            href={`/blog?tag=${tag}`}
                            className="text-primary hover:underline"
                          >
                            #{tag}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {imageUrl && (
                <div className="w-full h-64 md:h-[400px] bg-surface-container rounded-xl overflow-hidden mb-12 shadow-ambient flex items-center justify-center p-4">
                  <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
              )}

              <div className="glass-card p-8 md:p-12">
                <div className="prose prose-invert max-w-none text-on-surface-variant leading-loose [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-on-surface [&>h2]:mt-10 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-on-surface [&>h3]:mt-8 [&>h3]:mb-3 [&>h4]:text-lg [&>h4]:font-bold [&>h4]:text-on-surface [&>h4]:mt-6 [&>h4]:mb-2 [&>p]:mb-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>a]:text-primary [&>a]:underline">
                  <SliceZone slices={page.data.slices} components={components} />
                </div>
              </div>

              <div className="mt-12 flex justify-center">
                <Link href="/blog" className="btn btn-ghost">
                  ← Back to all posts
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4 flex flex-col gap-8">
              <div className="sticky top-24">
                <div className="glass-card p-6">
                  <h3 className="text-lg font-bold mb-6 text-on-surface">Recent Posts</h3>
                  <div className="flex flex-col gap-6">
                    {recentPosts.map((post: any) => {
                      const firstSlice = post.data.slices?.[0];
                      const primary = firstSlice?.primary as any;
                      const postTitle =
                        post.data.meta_title ||
                        (primary && "title" in primary
                          ? primary.title?.[0]?.text
                          : null) ||
                        (primary && "post_heading" in primary
                          ? primary.post_heading?.[0]?.text
                          : null) ||
                        post.slugs[0]?.replace(/-/g, " ") ||
                        post.uid;
                      const postCategory = post.tags?.[0] || "Article";
                      return (
                        <Link
                          href={`/blog/${post.uid}`}
                          key={post.id}
                          className="flex flex-col gap-1 cursor-pointer group no-underline"
                        >
                          <span className="text-[10px] uppercase font-bold text-primary tracking-widest">
                            {postCategory}
                          </span>
                          <h4 className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                            {postTitle}
                          </h4>
                        </Link>
                      );
                    })}
                    {recentPosts.length === 0 && (
                      <span className="text-sm text-on-surface-variant">No recent posts.</span>
                    )}
                  </div>
                </div>
              </div>
            </aside>
            
          </div>
        </div>
      </div>
      <BlogAppDownload />
      <Footer />
    </main>
  );
}
