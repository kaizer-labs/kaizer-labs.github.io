import { Link } from "react-router-dom";
import { featuredProjects, secondaryProjects } from "../content";
import { Layout } from "../components/Layout";
import { ProjectCard } from "../components/ProjectCard";

export function ProjectsPage() {
  return (
    <Layout
      title="Projects | Kaizer Charania"
      description="Case studies for Kaizer Charania covering backend, platform, and distributed-systems work."
      frameClass="site-frame--home"
    >
      <section className="project-hub">
        <div className="project-hub__intro">
          <p className="section-kicker">Engineering case studies</p>
          <h1>Backend and platform case studies with measurable outcomes.</h1>
        </div>
      </section>

      <section className="project-collection">
        <div className="project-collection__header">
          <p className="section-kicker">Featured studies</p>
          <h2>Flagship technical stories</h2>
        </div>

        <div className="project-grid project-grid--editorial">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="project-collection">
        <div className="project-collection__header">
          <p className="section-kicker">Additional work</p>
          <h2>Adjacent technical exploration</h2>
        </div>

        <div className="project-grid project-grid--secondary">
          {secondaryProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="final-cta">
        <p className="section-kicker">Connect</p>
        <h2>If you want to talk through the work, let’s connect.</h2>
        <div className="hero__actions">
          <Link
            className="button"
            to="/contact"
            data-analytics-event="contact_click"
            data-analytics-label="projects_final_cta_connect"
          >
            Connect
          </Link>
          <Link className="button button--ghost" to="/about">
            About me
          </Link>
        </div>
      </section>
    </Layout>
  );
}
