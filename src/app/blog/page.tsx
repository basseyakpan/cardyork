import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogAppDownload from "@/components/blog/BlogAppDownload";
import { createClient } from "@/prismicio";

export const revalidate = 0;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; tag?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.q?.toLowerCase() || "";
  const tagFilter = resolvedSearchParams?.tag?.toLowerCase() || "";

  const client = createClient();
  let prismicPosts: any = [];

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

  // Get all unique tags before filtering
  const allTags = Array.from(
    new Set(prismicPosts.flatMap((post: any) => post.tags || [])),
  ) as string[];

  let posts = prismicPosts.length > 0 ? prismicPosts : [];

  if (query) {
    posts = posts.filter((post: any) => {
      const firstSlice = post.data.slices?.[0];
      const primary = firstSlice?.primary as any;
      const title = (post.data.meta_title ||
        (primary && "title" in primary ? primary.title?.[0]?.text : null) ||
        (primary && "post_heading" in primary
          ? primary.post_heading?.[0]?.text
          : null) ||
        post.slugs[0]?.replace(/-/g, " ") ||
        post.uid) as string;

      // Look through slices for rich_text paragraph content if meta_description isn't set
      const richTextSlice = post.data.slices?.find(
        (s: any) => s.slice_type === "rich_text",
      );
      const firstParagraph = richTextSlice?.primary?.paragraph_text?.find(
        (p: any) => p.type === "paragraph",
      )?.text as string | undefined;

      const excerpt = (post.data.meta_description ||
        (primary && "description" in primary
          ? primary.description?.[0]?.text
          : null) ||
        firstParagraph ||
        "") as string;

      return (
        title?.toLowerCase().includes(query) ||
        excerpt?.toLowerCase().includes(query)
      );
    });
  }

  if (tagFilter) {
    posts = posts.filter((post: any) => {
      const tags = post.tags?.map((t: string) => t.toLowerCase()) || [];
      return tags.includes(tagFilter);
    });
  }

  console.log(posts.slice(0, 2));

  return (
    <main className="bg-background min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 py-20 px-6">
        <div className="max-w-[1200px] mx-auto mt-12">
          <div className="text-center mb-20">
            <h1 className="display-md mb-6">Cardyork Blog</h1>
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
                  No blog posts found matching your criteria.
                  {(query || tagFilter) && (
                    <div className="mt-4">
                      <Link href="/blog" className="btn btn-primary">
                        Clear Filters
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                posts.map((post: any) => {
                  // Extract fields from Slice Machine structure
                  const firstSlice = post.data.slices?.[0];
                  const primary = firstSlice?.primary as any;

                  const title =
                    post.data.meta_title ||
                    (primary && "title" in primary
                      ? primary.title?.[0]?.text
                      : null) ||
                    (primary && "post_heading" in primary
                      ? primary.post_heading?.[0]?.text
                      : null) ||
                    post.slugs[0]?.replace(/-/g, " ") ||
                    post.uid;

                  // Look through slices for rich_text paragraph content if meta_description isn't set
                  const richTextSlice = post.data.slices?.find(
                    (s: any) => s.slice_type === "rich_text",
                  );
                  const firstParagraph =
                    richTextSlice?.primary?.paragraph_text?.find(
                      (p: any) => p.type === "paragraph",
                    )?.text;

                  const excerpt =
                    post.data.meta_description ||
                    (primary && "description" in primary
                      ? primary.description?.[0]?.text
                      : null) ||
                    firstParagraph ||
                    "Click to read more...";

                  const category = post.tags?.[0] || "Article";
                  const author =
                    (primary &&
                      "author_name" in primary &&
                      Array.isArray(primary.author_name) &&
                      primary.author_name[0]?.text) ||
                    "CardYork Team";

                  const imageUrl =
                    post.data.meta_image?.url ||
                    (primary && "image" in primary
                      ? primary.image?.url
                      : null) ||
                    (primary && "post_image" in primary
                      ? primary.post_image?.url
                      : null);

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
                          <div className="md:w-72 md:h-auto h-56 flex-shrink-0 relative overflow-hidden bg-surface-container flex items-center justify-center p-2">
                            <img
                              src={imageUrl}
                              alt={title}
                              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 rounded-md"
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
                <h3 className="text-lg font-bold mb-4 text-on-surface">
                  Search
                </h3>
                <form
                  action="/blog"
                  method="GET"
                  className="flex flex-col gap-3"
                >
                  {tagFilter && (
                    <input type="hidden" name="tag" value={tagFilter} />
                  )}
                  <div className="relative">
                    <input
                      type="text"
                      name="q"
                      defaultValue={query}
                      placeholder="Search posts..."
                      className="input-field py-2.5 pl-10 w-full"
                    />
                    <svg
                      className="w-4 h-4 absolute left-3 top-3.5 text-on-surface-variant"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm w-full"
                  >
                    Search
                  </button>
                </form>
              </div>

              {allTags.length > 0 && (
                <div className="glass-card p-6">
                  <h3 className="text-lg font-bold mb-4 text-on-surface">
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/blog${query ? `?q=${query}` : ""}`}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                        !tagFilter
                          ? "bg-primary text-on-primary"
                          : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
                      }`}
                    >
                      All
                    </Link>
                    {allTags.map((tag: string) => (
                      <Link
                        key={tag}
                        href={`/blog?tag=${tag}${query ? `&q=${query}` : ""}`}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                          tagFilter === tag.toLowerCase()
                            ? "bg-primary text-on-primary"
                            : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
                        }`}
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="glass-card p-6">
                <h3 className="text-lg font-bold mb-6 text-on-surface">
                  Recent Posts
                </h3>
                <div className="flex flex-col gap-6">
                  {prismicPosts.slice(0, 6).map((post: any) => {
                    const firstSlice = post.data.slices?.[0];
                    const primary = firstSlice?.primary as any;
                    const title =
                      post.data.meta_title ||
                      (primary && "title" in primary
                        ? primary.title?.[0]?.text
                        : null) ||
                      (primary && "post_heading" in primary
                        ? primary.post_heading?.[0]?.text
                        : null) ||
                      post.slugs[0]?.replace(/-/g, " ") ||
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
                  {prismicPosts.length === 0 && (
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
