import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { site } from "../data/site";

export function ContactPage() {
  return (
    <Layout
      title="Connect | Kaizer Charania"
      description="Connect page for Kaizer Charania with profile links and current work context."
      frameClass="site-frame--home"
    >
      <section className="contact-page">
        <div className="contact-page__intro">
          <p className="section-kicker">Direct channels</p>
          <h1>Connect</h1>
        </div>

        <div className="contact-sheet">
          <div className="contact-list">
            <a
              className="contact-row"
              href={`mailto:${site.email}`}
              data-analytics-event="contact_link_click"
              data-analytics-label="email"
            >
              <span className="contact-row__label">Email</span>
              <span>{site.email}</span>
            </a>
            <a
              className="contact-row"
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              data-analytics-event="contact_link_click"
              data-analytics-label="linkedin"
            >
              <span className="contact-row__label">LinkedIn</span>
              <span>Professional profile</span>
            </a>
            <a
              className="contact-row"
              href={site.github}
              target="_blank"
              rel="noreferrer"
              data-analytics-event="contact_link_click"
              data-analytics-label="github"
            >
              <span className="contact-row__label">GitHub</span>
              <span>Code and systems notes</span>
            </a>
          </div>

          <div className="contact-sheet__meta">
            <span>{site.location}</span>
            <Link to="/projects">Start with case studies</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
