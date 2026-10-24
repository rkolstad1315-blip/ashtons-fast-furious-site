Ashtons Fast & Fur-ious website rebuild. Spec and tickets in /docs.

## Scripts

- `npm run dev`, `npm run build`, `npm run start`, `npm run lint`
- `npm run perf`: Lighthouse mobile on every sitemap route against a running `next start` (see `docs/perf-report.md`)
- `npm run placeholders`: lists every `[PLACEHOLDER]` in `/content` and whether it is visible on an indexable page (after `npm run build`)

Launch steps, DNS records, and environment variables are in `LAUNCH.md`.

## Blog

Posts are Markdown files in `content/blog/` with typed frontmatter (`title`, `description`, `slug`, `publishedAt`, `updatedAt`, `author`, `primaryKeyword`, `relatedFaqIds`, `draft`). The build fails on a title of 60 characters or more, a description of 155 or more, a duplicate slug, an em or en dash, an H1 or skipped heading level in the body, a dead internal link, an image without alt text or a `"WxH"` size title, or a post that does not link to `/book/` and one of the service, safety, FAQ, or town pages. A production build leaves out any post with `draft: true` or a `[PLACEHOLDER]` and logs why. `/blog/` returns 404 and stays out of the sitemap and footer until one post is publishable. `BLOG_PREVIEW=true npm run build` renders drafts for review (the sitemap, footer, and FAQ links still ignore them).
