import { Link, useParams } from "react-router-dom";

import { getProjectBySlug, getProjectSiblings } from "../content";
import { ArchitectureDiagram } from "../components/ArchitectureDiagram";
import { Layout } from "../components/Layout";
import { MarkdownProse } from "../components/MarkdownProse";
import { TechTag } from "../components/TechTag";

export function ProjectDetailPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <Layout
        title="Project not found | Kaizer Charania"
        description="The requested project could not be found."
        frameClass="site-frame--home"
      >
        <section className="legal-page">
          <p className="section-kicker">Missing page</p>
          <h1>Project not found</h1>
          <p>The case study you requested is no longer available.</p>
        </section>
      </Layout>
    );
  }

  const { previous, next } = getProjectSiblings(project.slug);

  return (
    <Layout
      title={`${project.title} | Kaizer Charania`}
      description={project.summary}
      frameClass="site-frame--home"
    >
      <article className="project-detail">
        <Link className="back-link" to="/projects">
          ← Back to projects
        </Link>

        <header className="project-detail__hero">
          <div className="project-detail__hero-copy">
            <div className="project-detail__meta">
              <span>{project.year}</span>
              <span>{project.status}</span>
              <span>{project.role}</span>
            </div>
            <p className="section-kicker">Case study</p>
            <h1>{project.title}</h1>
            <p className="project-detail__subtitle">{project.subtitle}</p>
            <p>{project.summary}</p>
            <div className="tag-row">
              {project.tech.map((tag) => (
                <TechTag key={tag} label={tag} />
              ))}
            </div>
          </div>

          <aside className="project-detail__hero-brief">
            <div className="project-brief">
              <p className="project-brief__label">Problem</p>
              <p>{project.problem}</p>
            </div>
            <div className="project-brief">
              <p className="project-brief__label">Scope</p>
              <p>{project.scope}</p>
            </div>
          </aside>
        </header>

        <section className="detail-panel detail-panel--metrics">
          <div className="detail-panel__header">
            <p className="section-kicker">Impact</p>
            <h2>Key production outcomes</h2>
          </div>
          <div className="project-metric-strip">
            {project.metrics.map((metric) => (
              <div className="project-metric-strip__item" key={metric}>
                {metric}
              </div>
            ))}
          </div>
        </section>

        <ArchitectureDiagram
          title={project.architectureTitle}
          summary={project.architectureSummary}
          layers={project.architectureLayers}
        />

        <section className="detail-panel">
          <div className="detail-panel__header">
            <p className="section-kicker">Key decisions</p>
            <h2>Tradeoffs that shaped the final system</h2>
          </div>
          <div className="decision-grid">
            {project.decisions.map((item) => (
              <article className="decision-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="detail-panel prose-block">
          <div className="detail-panel__header">
            <p className="section-kicker">Deep dive</p>
            <h2>Technical narrative</h2>
          </div>
          <MarkdownProse content={project.body} />
        </section>

        <nav className="project-pagination" aria-label="Project navigation">
          {previous ? (
            <Link to={`/projects/${previous.slug}`}>← {previous.title}</Link>
          ) : (
            <span></span>
          )}
          {next ? <Link to={`/projects/${next.slug}`}>{next.title} →</Link> : <span></span>}
        </nav>
      </article>
    </Layout>
  );
}
