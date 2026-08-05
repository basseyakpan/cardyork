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
    console.warn("Could not fetch posts from Prismic.", error);
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

  const featuredPost = posts[0];
  const listPosts = posts.slice(1);

  function extractPostData(post: any) {
    const firstSlice = post.data.slices?.[0];
    const primary = firstSlice?.primary as any;
    const title =
      post.data.meta_title ||
      (primary && "title" in primary ? primary.title?.[0]?.text : null) ||
      (primary && "post_heading" in primary
        ? primary.post_heading?.[0]?.text
        : null) ||
      post.slugs[0]?.replace(/-/g, " ") ||
      post.uid;
    const richTextSlice = post.data.slices?.find(
      (s: any) => s.slice_type === "rich_text",
    );
    const firstParagraph = richTextSlice?.primary?.paragraph_text?.find(
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
      (primary && "image" in primary ? primary.image?.url : null) ||
      (primary && "post_image" in primary ? primary.post_image?.url : null);
    const date = new Date(post.first_publication_date).toLocaleDateString(
      "en-US",
      { month: "short", day: "numeric", year: "numeric" },
    );
    return { title, excerpt, category, author, imageUrl, date };
  }

  return (
    <main className="bg-background min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Header */}
      <div className="border-b border-outline-variant">
        <div className="max-w-[1200px] mx-auto px-6 pt-32 pb-12">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
              Cardyork Publication
            </p>
            <h1
              className="text-[clamp(3rem,7vw,5.5rem)] font-black tracking-tight leading-none text-on-surface mb-6"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              The Blog
            </h1>
            <p className="text-on-surface-variant text-lg max-w-[500px] mx-auto leading-relaxed">
              Insights, guides, and updates on gift card trading in Nigeria.
            </p>
          </div>

          {/* Search + Tags Bar */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <form action="/blog" method="GET" className="relative w-full max-w-xs">
              {tagFilter && <input type="hidden" name="tag" value={tagFilter} />}
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search articles..."
                className="input-field py-2.5 pl-10 pr-4 text-sm"
              />
              <svg
                className="w-4 h-4 absolute left-3 top-3.5 text-on-surface-variant"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </form>

            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center">
                <Link
                  href={`/blog${query ? `?q=${query}` : ""}`}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide border transition-colors ${
                    !tagFilter
                      ? "bg-primary text-on-primary border-primary"
                      : "border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"
                  }`}
                >
                  All
                </Link>
                {allTags.map((tag: string) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${tag}${query ? `&q=${query}` : ""}`}
                    className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide border transition-colors ${
                      tagFilter === tag.toLowerCase()
                        ? "bg-primary text-on-primary border-primary"
                        : "border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary"
                    }`}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 py-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          {posts.length === 0 ? (
            <div className="py-24 text-center text-on-surface-variant">
              <p className="text-5xl mb-6">📰</p>
              <p className="text-xl font-semibold mb-2">No articles found</p>
              <p className="text-sm mb-6">Try adjusting your search or filter.</p>
              {(query || tagFilter) && (
                <Link href="/blog" className="btn btn-primary">
                  Clear Filters
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-12">
              {/* Main Feed */}
              <div className="lg:col-span-8">

                {/* Featured Post */}
                {featuredPost && !query && !tagFilter && (() => {
                  const { title, excerpt, category, author, imageUrl, date } =
                    extractPostData(featuredPost);
                  return (
                    <Link
                      href={`/blog/${featuredPost.uid}`}
                      className="no-underline block group mb-14 pb-14 border-b border-outline-variant"
                    >
                      {imageUrl && (
                        <div className="w-full aspect-[16/7] rounded-xl overflow-hidden mb-8 bg-surface-container flex items-center justify-center">
                          <img
                            src={imageUrl}
                            alt={title}
                            className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-700"
                          />
                        </div>
                      )}
                      <div className="flex items-center gap-3 mb-4 text-[11px] font-bold uppercase tracking-[0.2em]">
                        <span className="text-primary">{category}</span>
                        <span className="w-1 h-1 rounded-full bg-on-surface-variant/40" />
                        <span className="text-on-surface-variant">{date}</span>
                        <span className="ml-auto px-2 py-0.5 text-[10px] bg-primary/10 text-primary rounded-full border border-primary/20">
                          Featured
                        </span>
                      </div>
                      <h2
                        className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight text-on-surface group-hover:text-primary transition-colors mb-4"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {title}
                      </h2>
                      <p className="text-on-surface-variant leading-relaxed line-clamp-2 mb-5 text-base">
                        {excerpt}
                      </p>
                      <span className="text-sm font-semibold text-primary group-hover:underline">
                        Read article →
                      </span>
                    </Link>
                  );
                })()}

                {/* Post List */}
                <div className="flex flex-col divide-y divide-outline-variant">
                  {(featuredPost && !query && !tagFilter ? listPosts : posts).map(
                    (post: any) => {
                      const { title, excerpt, category, author, imageUrl, date } =
                        extractPostData(post);
                      return (
                        <Link
                          href={`/blog/${post.uid}`}
                          key={post.id}
                          className="no-underline group py-10 flex gap-6 md:gap-10 items-start"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-3 text-[10px] font-bold uppercase tracking-[0.2em]">
                              <span className="text-primary">{category}</span>
                              <span className="w-1 h-1 rounded-full bg-on-surface-variant/40" />
                              <span className="text-on-surface-variant">{date}</span>
                            </div>
                            <h3
                              className="text-xl md:text-2xl font-bold leading-tight text-on-surface group-hover:text-primary transition-colors mb-3"
                              style={{ fontFamily: "'Poppins', sans-serif" }}
                            >
                              {title}
                            </h3>
                            <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-2 mb-3">
                              {excerpt}
                            </p>
                            <span className="text-xs font-semibold text-on-surface-variant">
                              By {author}
                            </span>
                          </div>
                          {imageUrl && (
                            <div className="flex-shrink-0 w-28 h-20 md:w-40 md:h-28 rounded-lg overflow-hidden bg-surface-container flex items-center justify-center">
                              <img
                                src={imageUrl}
                                alt={title}
                                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                          )}
                        </Link>
                      );
                    },
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-4">
                <div className="sticky top-24 flex flex-col gap-10">

                  {/* Recent Posts */}
                  <div className="rounded-xl border border-outline-variant bg-surface-container-low p-6">
                    <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-on-surface-variant mb-6 pb-4 border-b border-outline-variant">Recent Posts</h3>
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
                        const date = new Date(
                          post.first_publication_date,
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        });
                        return (
                          <Link
                            href={`/blog/${post.uid}`}
                            key={post.id}
                            className="no-underline group flex gap-3 items-start"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-xs uppercase font-bold text-primary tracking-widest mb-1">
                                {category}
                              </p>
                              <h4
                                className="text-base font-semibold text-on-surface group-hover:text-primary transition-colors line-clamp-2 leading-snug"
                                style={{ fontFamily: "'Poppins', sans-serif" }}
                              >
                                {title}
                              </h4>
                              <p className="text-xs text-on-surface-variant mt-1">
                                {date}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Categories */}
                  {allTags.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-on-surface-variant mb-6 pb-4 border-b border-outline-variant">
                        Categories
                      </h3>
                      <div className="flex flex-col gap-2">
                        <Link
                          href={`/blog${query ? `?q=${query}` : ""}`}
                          className={`flex items-center justify-between py-2 text-sm font-medium transition-colors border-b border-outline-variant/40 ${
                            !tagFilter
                              ? "text-primary"
                              : "text-on-surface-variant hover:text-on-surface"
                          }`}
                        >
                          <span>All Articles</span>
                          <span className="text-xs text-on-surface-variant">
                            {prismicPosts.length}
                          </span>
                        </Link>
                        {allTags.map((tag: string) => {
                          const count = prismicPosts.filter((p: any) =>
                            p.tags?.includes(tag),
                          ).length;
                          return (
                            <Link
                              key={tag}
                              href={`/blog?tag=${tag}${query ? `&q=${query}` : ""}`}
                              className={`flex items-center justify-between py-2 text-sm font-medium transition-colors border-b border-outline-variant/40 ${
                                tagFilter === tag.toLowerCase()
                                  ? "text-primary"
                                  : "text-on-surface-variant hover:text-on-surface"
                              }`}
                            >
                              <span>{tag}</span>
                              <span className="text-xs text-on-surface-variant">
                                {count}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Newsletter */}
                  <div className="p-6 rounded-xl border border-outline-variant bg-surface-container-low">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface mb-2">
                      Newsletter
                    </h3>
                    <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                      Get the latest rates and trading tips delivered to your
                      inbox weekly.
                    </p>
                    <div className="flex flex-col gap-2">
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="input-field py-2 text-sm"
                      />
                      <button className="btn btn-secondary btn-sm w-full">
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </div>

      <BlogAppDownload />
      <Footer />
    </main>
  );
}
