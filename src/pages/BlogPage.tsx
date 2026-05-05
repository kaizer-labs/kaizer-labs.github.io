import { Link } from "react-router-dom";
import { archiveBlogPosts, featuredBlogPost } from "../content";
import { Layout } from "../components/Layout";

export function BlogPage() {
  return (
    <Layout
      title="Blog | Kaizer Charania"
      description="Writing on prompt engineering, backend systems, platform work, and technical execution."
      frameClass="site-frame--home"
    >
      <section className="blog-hub">
        <div className="blog-hub__intro">
          <p className="section-kicker">Blog</p>
          <h1>Notes on backend, platform, and practical AI work.</h1>
        </div>
      </section>

      {featuredBlogPost ? (
        <section className="blog-collection">
          <div className="blog-collection__header">
            <p className="section-kicker">Featured post</p>
            <h2>Start here</h2>
          </div>

          <Link className="blog-card blog-card--featured" to={`/blog/${featuredBlogPost.slug}`}>
            <div className="blog-card__meta">
              <span>{featuredBlogPost.publishedAt}</span>
              <span>{featuredBlogPost.readingTime}</span>
            </div>
            <h3>{featuredBlogPost.title}</h3>
            <p>{featuredBlogPost.summary}</p>
            <div className="blog-card__tags">
              {featuredBlogPost.tags.map((tag) => (
                <span className="tech-tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        </section>
      ) : null}

      {archiveBlogPosts.length > 0 ? (
        <section className="blog-collection">
          <div className="blog-collection__header">
            <p className="section-kicker">More writing</p>
            <h2>Archive</h2>
          </div>

          <div className="blog-grid">
            {archiveBlogPosts.map((post) => (
              <Link className="blog-card" to={`/blog/${post.slug}`} key={post.slug}>
                <div className="blog-card__meta">
                  <span>{post.publishedAt}</span>
                  <span>{post.readingTime}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.summary}</p>
                <div className="blog-card__tags">
                  {post.tags.map((tag) => (
                    <span className="tech-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </Layout>
  );
}
