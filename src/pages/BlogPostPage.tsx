import { Link, useParams } from "react-router-dom";

import { getBlogPostBySlug, getBlogPostSiblings } from "../content";
import { Layout } from "../components/Layout";
import { MarkdownProse } from "../components/MarkdownProse";

export function BlogPostPage() {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return (
      <Layout
        title="Post not found | Kaizer Charania"
        description="The requested blog post could not be found."
        frameClass="site-frame--home"
      >
        <section className="legal-page">
          <p className="section-kicker">Missing page</p>
          <h1>Post not found</h1>
          <p>The blog post you requested is no longer available.</p>
        </section>
      </Layout>
    );
  }

  const { previous, next } = getBlogPostSiblings(post.slug);

  return (
    <Layout
      title={`${post.title} | Kaizer Charania`}
      description={post.summary}
      frameClass="site-frame--home"
    >
      <article className="blog-post">
        <Link className="back-link" to="/blog">
          ← Back to blog
        </Link>

        <header className="blog-post__hero">
          <div className="blog-post__meta">
            <span>{post.publishedAt}</span>
            <span>{post.readingTime}</span>
          </div>
          <p className="section-kicker">Blog post</p>
          <h1>{post.title}</h1>
          <p className="blog-post__summary">{post.summary}</p>
          <div className="blog-card__tags">
            {post.tags.map((tag) => (
              <span className="tech-tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </header>

        <section className="detail-panel prose-block blog-post__body">
          <MarkdownProse content={post.body} />
        </section>

        <nav className="project-pagination" aria-label="Blog navigation">
          {previous ? (
            <Link to={`/blog/${previous.slug}`}>← {previous.title}</Link>
          ) : (
            <span></span>
          )}
          {next ? <Link to={`/blog/${next.slug}`}>{next.title} →</Link> : <span></span>}
        </nav>
      </article>
    </Layout>
  );
}

