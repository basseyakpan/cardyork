import { createClient } from "@/prismicio";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SliceZone, PrismicRichText } from "@prismicio/react";
import { components } from "@/slices";
import Link from "next/link";
import BlogAppDownload from "@/components/blog/BlogAppDownload";
import BlogStickyBanner from "@/components/blog/BlogStickyBanner";

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
      limit: 7,
    });
    // Filter out current post
    recentPosts = allPosts
      .filter((p: any) => p.uid !== resolvedParams.uid)
      .slice(0, 6);
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
    (primary && "post_heading" in primary
      ? primary.post_heading?.[0]?.text
      : null) ||
    page.slugs[0]?.replace(/-/g, " ") ||
    page.uid;

  const category = page.tags?.[0] || "Article";
  const author =
    (primary &&
      "author_name" in primary &&
      Array.isArray(primary.author_name) &&
      primary.author_name[0]?.text) ||
    "CardYork Team";

  const date = new Date(page.first_publication_date).toLocaleDateString(
    "en-US",
    { month: "long", day: "numeric", year: "numeric" },
  );

  const imageUrl =
    page.data.meta_image?.url ||
    (primary && "image" in primary ? primary.image?.url : null) ||
    (primary && "post_image" in primary ? primary.post_image?.url : null);

  return (
    <main className="bg-background min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 pt-28 pb-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-16">

            {/* Blog Post Content */}
            <article className="lg:col-span-8">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-xs text-on-surface-variant mb-10">
                <Link href="/blog" className="hover:text-primary transition-colors">
                  Blog
                </Link>
                <span>/</span>
                <span className="text-primary font-medium">{category}</span>
              </nav>

              {/* Meta */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-5 text-[11px] font-bold uppercase tracking-[0.2em]">
                  <Link
                    href={`/blog?tag=${category}`}
                    className="text-primary hover:underline"
                  >
                    {category}
                  </Link>
                  <span className="w-1 h-1 rounded-full bg-on-surface-variant/40" />
                  <span className="text-on-surface-variant">{date}</span>
                </div>

                <h1
                  className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight text-on-surface mb-6"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 pb-8 border-b border-outline-variant">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                      {author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-on-surface">
                        {author}
                      </p>
                      <p className="text-xs text-on-surface-variant">Author</p>
                    </div>
                  </div>

                  {page.tags && page.tags.length > 0 && (
                    <div className="ml-auto flex gap-2 flex-wrap">
                      {page.tags.map((tag: string) => (
                        <Link
                          key={tag}
                          href={`/blog?tag=${tag}`}
                          className="px-3 py-1 rounded-full text-xs font-semibold border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Hero Image */}
              {imageUrl && (
                <div className="w-full aspect-[16/9] rounded-xl overflow-hidden mb-12 bg-surface-container flex items-center justify-center">
                  <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              {/* Article Body — no border, clean reading column */}
              <div
                className="
                  text-on-surface-variant leading-[1.9] text-[1.0625rem]
                  [&_h1]:font-bold [&_h1]:text-on-surface [&_h1]:text-3xl [&_h1]:mt-14 [&_h1]:mb-6 [&_h1]:leading-tight
                  [&_h2]:font-bold [&_h2]:text-on-surface [&_h2]:text-2xl [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:leading-tight
                  [&_h3]:font-bold [&_h3]:text-on-surface [&_h3]:text-xl [&_h3]:mt-10 [&_h3]:mb-3 [&_h3]:leading-tight
                  [&_h4]:font-bold [&_h4]:text-on-surface [&_h4]:text-lg [&_h4]:mt-8 [&_h4]:mb-2
                  [&_h5]:font-bold [&_h5]:text-on-surface [&_h5]:text-base [&_h5]:mt-6 [&_h5]:mb-2
                  [&_h6]:font-bold [&_h6]:text-on-surface [&_h6]:text-sm [&_h6]:mt-6 [&_h6]:mb-2
                  [&_p]:mb-7
                  [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-2
                  [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol]:space-y-2
                  [&_li]:leading-relaxed
                  [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:opacity-80
                  [&_strong]:text-on-surface [&_strong]:font-semibold
                  [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-6 [&_blockquote]:my-8 [&_blockquote]:text-on-surface-variant [&_blockquote]:italic [&_blockquote]:text-lg
                  [&_code]:bg-surface-container [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono [&_code]:text-primary
                  [&_pre]:bg-surface-container [&_pre]:rounded-xl [&_pre]:p-6 [&_pre]:my-6 [&_pre]:overflow-x-auto
                  [&_img]:rounded-lg [&_img]:my-6 [&_img]:max-w-full
                "
              >
                {page.data.slices?.map((slice: any, index: number) => {
                  if (slice.slice_type === "text_blog" || slice.slice_type === "rich_text") {
                    const textArray = slice.primary?.rich_text_editor || slice.primary?.paragraph_text;
                    if (textArray) {
                      return <PrismicRichText key={index} field={textArray} />;
                    }
                  }
                  return <SliceZone key={index} slices={[slice]} components={components} />;
                })}
              </div>

              {/* Footer Actions */}
              <div className="mt-16 pt-10 border-t border-outline-variant flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  {page.tags && page.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {page.tags.map((tag: string) => (
                        <Link
                          key={tag}
                          href={`/blog?tag=${tag}`}
                          className="px-3 py-1 rounded-full text-xs font-semibold border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                <Link href="/blog" className="btn btn-ghost btn-sm flex-shrink-0">
                  ← All Articles
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4 mt-12 lg:mt-0">
              <div className="sticky top-24 flex flex-col gap-10">

                {/* Recent Posts */}
                <div className="rounded-xl border border-outline-variant bg-surface-container-low p-6">
                  <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-on-surface-variant mb-6 pb-4 border-b border-outline-variant">
                    Recent Posts
                  </h3>
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
                      const postDate = new Date(
                        post.first_publication_date,
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                      return (
                        <Link
                          href={`/blog/${post.uid}`}
                          key={post.id}
                          className="no-underline group flex flex-col gap-1"
                        >
                          <p className="text-xs uppercase font-bold text-primary tracking-widest">
                            {postCategory}
                          </p>
                          <h4
                            className="text-base font-semibold text-on-surface group-hover:text-primary transition-colors line-clamp-2 leading-snug"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                          >
                            {postTitle}
                          </h4>
                          <p className="text-xs text-on-surface-variant">
                            {postDate}
                          </p>
                        </Link>
                      );
                    })}

                    {recentPosts.length === 0 && (
                      <span className="text-sm text-on-surface-variant">
                        No recent posts.
                      </span>
                    )}

                    {recentPosts.length > 0 && (
                      <div className="pt-2 border-t border-outline-variant">
                        <Link
                          href="/blog"
                          className="text-sm font-semibold text-primary hover:underline"
                        >
                          View all articles →
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                {/* About Card */}
                <div className="p-6 rounded-xl border border-outline-variant bg-surface-container-low">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface mb-2">
                    About Cardyork
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                    Nigeria&apos;s trusted platform for fast, secure gift card
                    trading. Sell at the best rates and get paid instantly.
                  </p>
                  <Link href="/" className="btn btn-primary btn-sm w-full">
                    Start Trading
                  </Link>
                </div>

              </div>
            </aside>

          </div>
        </div>
      </div>

      <BlogAppDownload />
      <Footer />
      <BlogStickyBanner />
    </main>
  );
}
