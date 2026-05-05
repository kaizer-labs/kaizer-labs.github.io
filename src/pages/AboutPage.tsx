import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { SectionBlock } from "../components/SectionBlock";
import { leadershipSignals, skills, story, timeline, values } from "../data/site";

export function AboutPage() {
  return (
    <Layout
      title="About | Kaizer Charania"
      description="About page for Kaizer Charania covering backend, platform, and engineering systems work."
      frameClass="site-frame--about"
    >
      <SectionBlock
        eyebrow="About"
        title="Backend depth, platform judgment, and execution leadership."
      >
        <div className="content-stack">
          {story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        eyebrow="Operating style"
        title="A few principles that show up repeatedly in my work."
        className="section-block--wide-title"
      >
        <div className="about-operating">
          <div className="about-operating__grid">
            {values.map((item, index) => (
              <article
                className={["about-operating__card", index === 0 ? "is-featured" : ""]
                  .filter(Boolean)
                  .join(" ")}
                key={item.title}
              >
                <p className="about-operating__index">0{index + 1}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </SectionBlock>

      <SectionBlock
        eyebrow="Career arc"
        title="How the work has expanded over time."
      >
        <div className="about-arc">
          {timeline.map((item, index) => (
            <article className="about-arc__item" key={item.title}>
              <div className="about-arc__rail">
                <span className="about-arc__dot"></span>
                {index < timeline.length - 1 ? (
                  <span className="about-arc__line"></span>
                ) : null}
              </div>
              <div className="about-arc__content">
                <p className="about-arc__step">Step 0{index + 1}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        eyebrow="Strengths"
        title="The mix of systems and habits I keep returning to."
      >
        <div className="about-strengths">
          <article className="about-strengths__hero">
            <p className="section-kicker">Leadership snapshot</p>
            <h3>Architecture, performance, and better engineering execution.</h3>
            <p>{leadershipSignals[0]}</p>
          </article>
          <article className="skill-group about-strengths__card">
            <h3>Backend systems</h3>
            <div className="tag-row">
              {skills.backend.map((item) => (
                <span className="tech-tag" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article className="skill-group about-strengths__card">
            <h3>Platform and execution</h3>
            <div className="tag-row">
              {skills.methodology.map((item) => (
                <span className="tech-tag" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </article>
          <article className="skill-group about-strengths__card">
            <h3>Supporting full-stack range</h3>
            <div className="tag-row">
              {skills.frontend.map((item) => (
                <span className="tech-tag" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </article>
        </div>
      </SectionBlock>

      <section className="final-cta">
        <p className="section-kicker">Next step</p>
        <h2>See the case studies behind the work.</h2>
        <div className="hero__actions">
          <Link className="button" to="/projects">
            Explore projects
          </Link>
          <Link className="button button--ghost" to="/contact">
            Connect
          </Link>
        </div>
      </section>
    </Layout>
  );
}
