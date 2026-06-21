import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogAppDownload from "@/components/blog/BlogAppDownload";
import { createClient } from "@/prismicio";

export const revalidate = 0;

export default async function BlogPage() {
  const client = createClient();
  let prismicPosts: any = [];
  console.log({ prismicPosts });

  try {
    prismicPosts = await client.getAllByType("blog_page", {
      orderings: [
        { field: "document.first_publication_date", direction: "desc" },
      ],
    });
  } catch (error) {
    console.warn(
      "Could not fetch posts from Prismic. Make sure the custom type is 'blog_post'.",
      error,
    );
  }

  // Fallback if no posts are found
  const posts = prismicPosts.length > 0 ? prismicPosts : [];
  console.log({ posts });

  return (
    <main className="bg-background min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 py-20 px-6">
        <div className="max-w-[1200px] mx-auto mt-12">
          <div className="text-center mb-20">
            <span className="chip chip-primary mb-4">Cardyork Blog</span>
            <h1 className="display-sm mb-6">
              Insights from the{" "}
              <span className="gradient-text">Vanguard Archive</span>
            </h1>
            <p className="text-on-surface-variant text-lg max-w-[600px] mx-auto">
              Stay updated with the latest trends, guides, and tutorials in the
              world of gift card trading.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Feed */}
            <div className="lg:col-span-8 flex flex-col gap-10">
              {posts.length === 0 ? (
                <div className="glass-card p-12 text-center text-on-surface-variant">
                  No blog posts found. Publish some in Prismic!
                </div>
              ) : (
                posts.map((post: any) => {
                  // Extract fields from Slice Machine structure
                  const firstSlice = post.data.slices?.[0];
                  const primary = firstSlice?.primary as any;

                  const title = 
                    post.data.meta_title || 
                    (primary && "title" in primary ? primary.title?.[0]?.text : null) || 
                    post.slugs[0]?.replace(/-/g, ' ') || 
                    post.uid;
                    
                  const excerpt =
                    post.data.meta_description ||
                    (primary && "description" in primary ? primary.description?.[0]?.text : null) ||
                    "Click to read more...";
                    
                  const category = post.tags?.[0] || "Article";
                  const author = "CardYork Team";
                  
                  const imageUrl = 
                    post.data.meta_image?.url || 
                    (primary && "image" in primary ? primary.image?.url : null);

                  const date = new Date(
                    post.first_publication_date,
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });

                  return (
                    <Link
                      href={`/blog/${post.uid}`}
                      key={post.id}
                      className="no-underline"
                    >
                      <article className="glass-card overflow-hidden flex flex-col md:flex-row group cursor-pointer hover:border-primary/20">
                        {imageUrl ? (
                          <div className="md:w-64 h-48 flex-shrink-0 relative overflow-hidden bg-surface-container-high">
                            <img
                              src={imageUrl}
                              alt={title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        ) : (
                          <div className="md:w-64 h-48 bg-surface-container-high flex-shrink-0 flex items-center justify-center text-on-surface-variant text-4xl">
                            📰
                          </div>
                        )}
                        <div className="p-8 flex flex-col gap-4">
                          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-primary">
                            <span>{category}</span>
                            <span className="w-1 h-1 rounded-full bg-on-surface-variant" />
                            <span className="text-on-surface-variant">
                              {date}
                            </span>
                          </div>
                          <h2 className="text-2xl font-extrabold text-on-surface group-hover:text-primary transition-colors">
                            {title}
                          </h2>
                          <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-2">
                            {excerpt}
                          </p>
                          <div className="mt-2 flex items-center gap-4 text-xs font-bold text-on-surface-variant">
                            <span>By {author}</span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  );
                })
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 flex flex-col gap-8">
              <div className="glass-card p-6">
                <h3 className="text-lg font-bold mb-6 text-on-surface">
                  Recent Posts
                </h3>
                <div className="flex flex-col gap-6">
                  {posts.slice(0, 3).map((post: any) => {
                    const firstSlice = post.data.slices?.[0];
                    const primary = firstSlice?.primary as any;
                    const title = 
                      post.data.meta_title || 
                      (primary && "title" in primary ? primary.title?.[0]?.text : null) || 
                      post.slugs[0]?.replace(/-/g, ' ') || 
                      post.uid;
                    const category = post.tags?.[0] || "Article";
                    return (
                      <Link
                        href={`/blog/${post.uid}`}
                        key={post.id}
                        className="flex flex-col gap-1 cursor-pointer group no-underline"
                      >
                        <span className="text-[10px] uppercase font-bold text-primary tracking-widest">
                          {category}
                        </span>
                        <h4 className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                          {title}
                        </h4>
                      </Link>
                    );
                  })}
                  {posts.length === 0 && (
                    <span className="text-sm text-on-surface-variant">
                      No recent posts.
                    </span>
                  )}
                </div>
              </div>

              <div className="glass-card p-6 bg-gradient-to-br from-secondary/10 to-transparent border-secondary/10">
                <h3 className="text-lg font-bold mb-4 text-on-surface">
                  Newsletter
                </h3>
                <p className="text-xs text-on-surface-variant mb-6">
                  Get the latest rates and trading tips delivered to your inbox
                  weekly.
                </p>
                <div className="flex flex-col gap-3">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="input-field py-2"
                  />
                  <button className="btn btn-secondary btn-sm w-full">
                    Subscribe
                  </button>
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
