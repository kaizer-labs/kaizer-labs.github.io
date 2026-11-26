import { Link, useParams } from "react-router-dom";
import { getBlogPostBySlug, getBlogPostSiblings } from "../content";
import { Layout } from "../components/Layout";
import { ArticleBody } from "../components/ArticleBody";
import { ArticleFlowPreview, getArticlePreviewKind } from "../components/ArticleFlowPreview";
import { formatWritingDate } from "../data/writing";
import "../styles/writing.scss";

export function BlogPostPage() {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return (
      <Layout title="Article not found | Kaizer Charania" description="The requested article could not be found." frameClass="site-frame--writing">
        <section className="legal-page">
          <p className="section-kicker">Missing page</p>
          <h1>Article not found</h1>
          <p>The article you requested is not available.</p>
          <Link className="studio-text-link" to="/blog">Explore all writing <span aria-hidden="true">→</span></Link>
        </section>
      </Layout>
    );
  }

  const { previous, next } = getBlogPostSiblings(post.slug);
  const previewKind = getArticlePreviewKind(post.body);

  return (
    <Layout title={`${post.title} | Kaizer Charania`} description={post.summary} frameClass="site-frame--writing" noindex={post.draft}>
      <article className="writing-article">
        <Link className="writing-article__back" to="/blog"><span aria-hidden="true">←</span> All writing</Link>
        <header className="writing-article__header">
          <div className="writing-article__meta">
            <span className="writing-article__topic">{post.topic}</span>
            <span>{post.readingTime}</span>
            {!post.draft && post.publishedAt && <time dateTime={post.publishedAt}>{formatWritingDate(post.publishedAt)}</time>}
          </div>
          <h1>{post.title}</h1>
          {previewKind && <ArticleFlowPreview key={`${post.slug}-${previewKind}`} kind={previewKind} />}
          <p className="writing-article__summary">{post.summary}</p>
          <div className="writing-article__byline"><span>BY KAIZER CHARANIA</span><span aria-hidden="true">/</span><span>BUILT WITH JUDGMENT</span></div>
          {post.tags.length > 0 && <ul className="writing-article__tags" aria-label="Article topics">{post.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>}
          {post.draft && <aside className="writing-article__draft" aria-label="Draft status"><span>Draft</span><p>For local review. Not published.</p></aside>}
        </header>
        <ArticleBody key={post.slug} content={post.body} />
        <nav className="writing-article__navigation" aria-label="Article navigation">
          {previous ? <Link to={`/blog/${previous.slug}`} rel="prev"><span>← Previous article</span><strong>{previous.title}</strong></Link> : <span />}
          {next ? <Link to={`/blog/${next.slug}`} rel="next"><span>Next article →</span><strong>{next.title}</strong></Link> : <span />}
        </nav>
      </article>
    </Layout>
  );
}
