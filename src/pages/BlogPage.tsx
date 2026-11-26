import { useState } from "react";
import { Layout } from "../components/Layout";
import { NewsletterCard } from "../components/NewsletterCard";
import { featuredWritingEntry, writingEntries } from "../data/writing";
import { site } from "../data/site";
import "../styles/writing.scss";

const filters = ["All notes", "Build in public", "AI & engineering"] as const;
type WritingFilter = (typeof filters)[number];

export function BlogPage() {
  const [filter, setFilter] = useState<WritingFilter>("All notes");
  const selectedPosts = writingEntries.filter((post) => filter === "All notes" || post.topic === filter);
  const featuredPost = selectedPosts.find((post) => post === featuredWritingEntry) ?? selectedPosts[0];
  const otherPosts = selectedPosts.filter((post) => post !== featuredPost);

  return (
    <Layout title="Writing — Built With Judgment | Kaizer Charania" description="Engineering notes and Built With Judgment essays on practical AI, product decisions, and the systems around software. Read articles here and newsletter editions on LinkedIn." frameClass="site-frame--writing">
      <div className="writing-page">
        <header className="writing-hero">
          <div><p className="studio-eyebrow"><span className="status-dot"/> NOTES FROM THE WORK</p><h1>Built With<br/><span>Judgment.</span></h1></div>
          <div className="writing-hero__aside"><p>What I build. What I question.<br/>What I learn along the way.</p><p>Articles on practical AI, product decisions, and the systems around the software. Read here, or explore the newsletter essays on LinkedIn.</p><a className="studio-text-link" href={site.newsletterUrl} target="_blank" rel="noopener noreferrer" data-analytics-event="newsletter_subscribe_click" data-analytics-label="writing_hero_newsletter">Explore the newsletter <span aria-hidden="true">↗</span></a><span className="writing-hero__byline">BY KAIZER CHARANIA <span>/</span> HERE & ON LINKEDIN</span></div>
        </header>

        <div className="writing-toolbar">
          <div className="writing-filters" role="group" aria-label="Filter articles and newsletter essays">{filters.map((item) => <button type="button" key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div>
          <p className="writing-count" role="status" aria-live="polite" aria-atomic="true">{String(selectedPosts.length).padStart(2, "0")} ESSAYS</p>
        </div>

        {featuredPost && <section className="writing-featured" aria-labelledby="featured-essay-title"><h2 className="writing-section-label" id="featured-essay-title">START HERE</h2><NewsletterCard post={featuredPost} featured key={featuredPost.id}/></section>}

        {otherPosts.length > 0 && <section className="writing-index" aria-labelledby="more-essays-title"><header className="writing-index__header"><h2 id="more-essays-title">Keep reading.</h2><p>Articles here. Newsletter essays on LinkedIn.</p></header><div className="writing-index__list">{otherPosts.map((post) => <NewsletterCard post={post} compact key={`${post.source}-${post.id}`}/>)}</div></section>}

        <section className="writing-subscribe" aria-labelledby="writing-subscribe-title"><div><p className="studio-eyebrow"><span className="status-dot"/> THE CONVERSATION CONTINUES</p><h2 id="writing-subscribe-title">The next note starts<br/><span>with the next problem.</span></h2></div><div><p>Follow Built With Judgment for more on agents, engineering, and the decisions that connect an idea to something useful.</p><a className="studio-button" href={site.newsletterUrl} target="_blank" rel="noopener noreferrer" data-analytics-event="newsletter_subscribe_click" data-analytics-label="writing_newsletter">Follow on LinkedIn <span aria-hidden="true">↗</span></a></div></section>
      </div>
    </Layout>
  );
}
