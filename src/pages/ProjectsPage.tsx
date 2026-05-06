import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { ProjectCard } from "../components/ProjectCard";
import { featuredProjects, secondaryProjects } from "../content";

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
        </div>
      </section>

      <section className="project-collection">
        <div className="project-collection__header">
          <h2 className="section-kicker section-kicker--standalone">Production systems</h2>
        </div>

        <div className="project-list">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="project-collection">
        <div className="project-collection__header">
          <h2 className="section-kicker section-kicker--standalone">Applied AI and platform enablement</h2>
        </div>

        <div className="project-list">
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
