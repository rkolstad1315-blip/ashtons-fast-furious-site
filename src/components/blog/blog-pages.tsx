import { Link } from "@/components/link";
import { Markdown } from "@/components/blog/markdown";
import { formatPostDate, postPath, relatedPosts, type BlogPost } from "@/lib/blog";
import { blogPage } from "../../../content/blog-page";

function PostMeta({ post }: { post: BlogPost }) {
  return (
    <p className="m-0 mt-3 text-sm text-slate-600">
      <span>{blogPage.publishedLabel} </span>
      <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
      {post.updatedAt !== post.publishedAt ? (
        <>
          <span>. {blogPage.updatedLabel} </span>
          <time dateTime={post.updatedAt}>{formatPostDate(post.updatedAt)}</time>
        </>
      ) : null}
    </p>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <li className="card min-w-0 rounded-card">
      <article className="flex h-full flex-col rounded-card border border-slate-200 bg-white p-5">
        <h2 className="m-0 font-display text-2xl leading-tight">
          <Link href={postPath(post.slug)} className="text-navy no-underline hover:text-brand">
            {post.title}
          </Link>
        </h2>
        <p className="m-0 mt-2 flex-1 text-slate-700">{post.description}</p>
        <PostMeta post={post} />
      </article>
    </li>
  );
}

export function BlogIndex({ posts }: { posts: readonly BlogPost[] }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 md:py-14">
      <h1 className="m-0 max-w-4xl font-display text-4xl font-extrabold leading-none md:text-6xl">
        {blogPage.h1}
      </h1>
      <p className="m-0 mt-4 max-w-3xl text-lg leading-snug text-slate-700">{blogPage.intro}</p>
      <ul className="m-0 mt-8 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </ul>
    </div>
  );
}

function PostCta() {
  const { cta } = blogPage;
  return (
    <section className="mt-12 rounded-card bg-navy p-6 text-white md:p-8" aria-labelledby="post-cta-heading">
      <h2 id="post-cta-heading" className="m-0 font-display text-3xl leading-none md:text-4xl">
        {cta.heading}
      </h2>
      <p className="m-0 mt-3 max-w-xl text-slate-200">{cta.body}</p>
      <Link
        href={cta.bookHref}
        className="btn-accent mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-pill bg-accent px-5 font-bold text-navy no-underline sm:w-auto"
      >
        {cta.bookLabel}
      </Link>
      <p className="m-0 mt-3">
        <a href={cta.callHref} className="text-sm font-semibold text-slate-200 underline-offset-4 hover:underline">
          {cta.callLabel}
        </a>
      </p>
    </section>
  );
}

export function BlogPostPage({ post }: { post: BlogPost }) {
  const related = relatedPosts(post);
  return (
    <article className="mx-auto w-full max-w-6xl px-4 py-10 md:py-14">
      <p className="m-0">
        <Link href={blogPage.path} className="text-sm font-semibold text-navy hover:text-brand">
          {blogPage.backLabel}
        </Link>
      </p>
      <h1 className="m-0 mt-4 max-w-4xl font-display text-4xl font-extrabold leading-none md:text-6xl">
        {post.title}
      </h1>
      <PostMeta post={post} />
      <Markdown tokens={post.tokens} />
      <PostCta />
      {related.length > 0 ? (
        <section className="mt-12" aria-labelledby="related-posts-heading">
          <h2 id="related-posts-heading" className="m-0 font-display text-3xl leading-none md:text-4xl">
            {blogPage.relatedHeading}
          </h2>
          <ul className="m-0 mt-6 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2">
            {related.map((item) => (
              <PostCard key={item.slug} post={item} />
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
