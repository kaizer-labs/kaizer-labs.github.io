import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { ProfessionalTimeline } from "../components/ProfessionalTimeline";
import { ProjectCard } from "../components/ProjectCard";
import { SectionBlock } from "../components/SectionBlock";
import { featuredProjects } from "../content";
import { leadershipSignals, newsletterTopics, proofPoints, site, workTimeline } from "../data/site";

export function HomePage() {
  return (
    <Layout
      title="Kaizer Charania | Backend, Platform, and Systems Work"
      description="Selected backend, platform, and applied AI systems work by Kaizer Charania."
      frameClass="site-frame--home"
    >
      <section className="hero">
        <div className="hero__surface">
          <div className="hero__content">
            <div className="hero__content-inner">
              <p className="section-kicker">
                Backend • Platform • Systems
              </p>
              <h1 className="hero__headline-plain">{site.heroHeadline}</h1>
              <p className="hero__lede">{site.heroIntro}</p>
              <div className="tag-row">
                {proofPoints.slice(0, 3).map((item) => (
                  <span className="tech-tag" key={item.label}>
                    {item.value}
                  </span>
                ))}
              </div>
              <div className="hero__actions">
                <Link
                  className="button"
                  to="/projects"
                  data-analytics-event="projects_cta_click"
                  data-analytics-label="home_see_case_studies"
                >
                  See case studies
                </Link>
                <Link className="button button--ghost" to="/about">
                  About me
                </Link>
              </div>
            </div>
          </div>

          <div className="hero__visual" aria-hidden="true">
            <div className="hero__visual-glow hero__visual-glow--one"></div>
            <div className="hero__visual-glow hero__visual-glow--two"></div>
            <div className="hero__visual-grid"></div>
            <div className="hero__stars">
              {[1, 2, 3, 4, 5, 6].map((star) => (
                <span className={`hero__star hero__star--${star}`} key={star}></span>
              ))}
            </div>
            <div className="hero__signal-card">
              <p className="section-kicker">At a glance</p>
              <p className="hero__signal-copy">{site.workIntro}</p>
              <div className="hero__stack">
                <span className="tech-tag">7+ years</span>
                <span className="tech-tag">8-engineer team scope</span>
                <span className="tech-tag">Architecture + execution</span>
              </div>
            </div>
            <div className="hero__signal-path">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </section>

      <SectionBlock
        eyebrow="Newsletter"
        className="section-block--wide-title"
      >
        <div className="newsletter-strip">
          <div className="newsletter-strip__copy">
            <p className="newsletter-strip__summary">{site.newsletterIntro}</p>
            <p className="newsletter-strip__detail">{site.newsletterSnippet}</p>
          </div>
          <div className="newsletter-strip__actions">
            <div className="tag-row">
              {newsletterTopics.map((topic) => (
                <span className="tech-tag" key={topic}>
                  {topic}
                </span>
              ))}
            </div>
            <a
              className="button"
              href={site.newsletterUrl}
              target="_blank"
              rel="noreferrer"
              data-analytics-event="newsletter_subscribe_click"
              data-analytics-label="home_newsletter_subscribe"
            >
              Subscribe on LinkedIn
            </a>
          </div>
        </div>
      </SectionBlock>

      <SectionBlock
        eyebrow="Professional work"
        className="section-block--wide-title"
      >
        <ProfessionalTimeline items={workTimeline} />
      </SectionBlock>

      <SectionBlock
        eyebrow="Featured work"
        className="section-block--wide-title"
      >
        <div className="project-list">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        eyebrow="Leadership"
        className="section-block--wide-title"
      >
        <ol className="principle-list">
          {leadershipSignals.map((item, index) => (
            <li className="principle-list__item" key={item}>
              <span className="principle-list__index">0{index + 1}</span>
              <p>{item}</p>
            </li>
          ))}
        </ol>
      </SectionBlock>

      <section className="final-cta">
        <p className="section-kicker">Connect</p>
        <h2>{site.contactHeadline}</h2>
        <p>{site.contactBody}</p>
        <div className="hero__actions">
          <Link className="button" to="/contact" data-analytics-event="contact_click" data-analytics-label="home_final_cta_connect">
            Connect
          </Link>
          <Link className="button button--ghost" to="/projects">
            Explore projects
          </Link>
        </div>
      </section>
    </Layout>
  );
}
