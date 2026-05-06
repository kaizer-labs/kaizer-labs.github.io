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
            <h2 className="section-kicker section-kicker--standalone">Start here</h2>
          </div>

          <Link className="writing-row writing-row--lead" to={`/blog/${featuredBlogPost.slug}`}>
            <div className="writing-row__meta">
              <span>{featuredBlogPost.publishedAt}</span>
              <span>{featuredBlogPost.readingTime}</span>
            </div>
            <div className="writing-row__body">
              <h3>{featuredBlogPost.title}</h3>
              <p>{featuredBlogPost.summary}</p>
            </div>
            <span className="writing-row__cta">Read essay</span>
          </Link>
        </section>
      ) : null}

      {archiveBlogPosts.length > 0 ? (
        <section className="blog-collection">
          <div className="blog-collection__header">
            <h2 className="section-kicker section-kicker--standalone">Archive</h2>
          </div>

          <div className="writing-list">
            {archiveBlogPosts.map((post) => (
              <Link className="writing-row" to={`/blog/${post.slug}`} key={post.slug}>
                <div className="writing-row__meta">
                  <span>{post.publishedAt}</span>
                  <span>{post.readingTime}</span>
                </div>
                <div className="writing-row__body">
                  <h3>{post.title}</h3>
                  <p>{post.summary}</p>
                </div>
                <span className="writing-row__cta">Read essay</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </Layout>
  );
}
