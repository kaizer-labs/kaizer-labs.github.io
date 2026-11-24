import { Link } from "react-router-dom";
import { AgentWorkflow } from "../components/AgentWorkflow";
import { Layout } from "../components/Layout";
import { NewsletterCard } from "../components/NewsletterCard";
import { WorkCard } from "../components/WorkCard";
import { projects } from "../content";
import { homepageNewsletterPosts } from "../data/newsletter";
import { site } from "../data/site";
import "../styles/writing.scss";

const selectedSlugs = ["ai-assisted-sdlc-operating-model", "local-first-document-intelligence", "dynamic-scheduling-engine", "event-driven-notification-platform"];
const selectedProjects = selectedSlugs.flatMap((slug) => projects.filter((project) => project.slug === slug));
const capabilities = [
  { number: "01", title: "Agentic engineering", text: "Repository context, parallel agents, and review loops. AI that fits into the engineering process.", tags: "Claude / Codex / MCP / LangGraph" },
  { number: "02", title: "Systems that hold up", text: "APIs, event streams, and data layers designed around correctness, reliability, and real production behavior.", tags: "Python / Kafka / PostgreSQL / Redis" },
  { number: "03", title: "Engineering with intent", text: "Clear boundaries. Explicit tradeoffs. Hands-on technical leadership that makes the next change easier.", tags: "Architecture / Platform / Delivery" },
];

export function HomePage() {
  return (
    <Layout title="Kaizer Charania — Systems, Agents & Engineering" description="Engineer and builder. Selected work in AI agents, backend platforms, distributed systems, and practical AI-assisted engineering." frameClass="site-frame--studio">
      <section className="studio-hero studio-container" aria-labelledby="hero-title">
        <div className="studio-hero__copy">
          <p className="studio-eyebrow"><span className="status-dot"/> KAIZER CHARANIA <span className="studio-eyebrow__divider">/</span> ENGINEER & BUILDER</p>
          <h1 id="hero-title">Systems thinker.<br/>Agent builder.<br/><span>Human at the helm.</span></h1>
          <p className="studio-hero__intro">I build backend systems that hold up, and AI workflows that move engineering forward. From the first API to the last review.</p>
          <div className="studio-hero__actions"><a className="studio-button" href="#selected-work">Explore my work <span aria-hidden="true">↗</span></a><Link className="studio-text-link" to="/about">A little about me <span aria-hidden="true">→</span></Link></div>
          <div className="studio-hero__footnote"><span>BASED IN {site.location.toUpperCase()}</span><a href={site.github} target="_blank" rel="noreferrer">GITHUB <span aria-hidden="true">↗</span></a></div>
        </div>
        <AgentWorkflow/>
      </section>

      <div className="studio-stack studio-container" aria-label="Engineering toolkit"><span className="studio-stack__label">THE BUILDING BLOCKS</span><div><span>Python</span><span>FastAPI</span><span>LangGraph</span><span>Claude & Codex</span><span>MCP</span><span>Kafka</span><span>PostgreSQL</span></div></div>

      <section className="studio-work studio-container" id="selected-work" aria-labelledby="work-title">
        <div className="studio-section-head"><div><p className="studio-eyebrow">01 / SELECTED WORK</p><h2 id="work-title">Ideas are good.<br/><span>Built is better.</span></h2></div><div className="studio-section-head__aside"><p>Agent workflows, local intelligence, and the production systems behind them.</p><Link className="studio-text-link" to="/projects">All projects <span aria-hidden="true">↗</span></Link></div></div>
        <div className="studio-work-grid">{selectedProjects.map((project, index) => <WorkCard project={project} index={index} key={project.slug}/>)}</div>
      </section>

      <section className="studio-approach studio-container" aria-labelledby="approach-title">
        <div className="studio-approach__intro"><p className="studio-eyebrow">02 / THE APPROACH</p><h2 id="approach-title">Curiosity in.<br/><span>Craft out.</span></h2><p>The tools keep changing.<br/>The engineering still matters.</p><Link className="studio-text-link" to="/about">How I think & build <span aria-hidden="true">↗</span></Link></div>
        <div className="studio-principles">{capabilities.map((item) => <article key={item.number}><span className="studio-principles__number">{item.number}</span><div><h3>{item.title}</h3><p>{item.text}</p><span className="studio-principles__tags">{item.tags}</span></div><span className="studio-principles__cross" aria-hidden="true">+</span></article>)}</div>
      </section>

      <section className="studio-writing studio-container" aria-labelledby="writing-title">
        <div className="studio-section-head"><div><p className="studio-eyebrow">03 / BUILT WITH JUDGMENT</p><h2 id="writing-title">Thinking out loud.</h2></div><Link className="studio-text-link" to="/blog">All writing <span aria-hidden="true">↗</span></Link></div>
        <div className="studio-writing__grid">{homepageNewsletterPosts.map((post) => <NewsletterCard post={post} key={post.id}/>)}</div>
        <div className="studio-writing__follow"><p>Short previews from the newsletter. The full thinking lives on LinkedIn.</p><a className="studio-text-link" href={site.newsletterUrl} target="_blank" rel="noopener noreferrer" data-analytics-event="newsletter_subscribe_click" data-analytics-label="home_writing_newsletter">Follow Built With Judgment <span aria-hidden="true">↗</span></a></div>
      </section>

      <section className="studio-connect studio-container" aria-labelledby="connect-title"><p className="studio-eyebrow"><span className="status-dot"/> GOOD WORK STARTS WITH A CONVERSATION</p><div><h2 id="connect-title">What are you<br/><span>building next?</span></h2><Link className="studio-connect__link" to="/contact" aria-label="Let’s talk about what you’re building" data-analytics-event="contact_click" data-analytics-label="home_final_cta_connect"><span aria-hidden="true">↗</span></Link></div><p>Systems, agents, or an interesting problem.<br/>I’d like to hear about it.</p></section>
    </Layout>
  );
}
