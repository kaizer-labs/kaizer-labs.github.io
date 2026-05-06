import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { SectionBlock } from "../components/SectionBlock";
import { skills, story, timeline, values } from "../data/site";

export function AboutPage() {
  return (
    <Layout
      title="About | Kaizer Charania"
      description="About page for Kaizer Charania covering backend, platform, and engineering systems work."
      frameClass="site-frame--about"
    >
      <SectionBlock
        eyebrow="About"
      >
        <div className="content-stack">
          {story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        eyebrow="How I operate"
        className="section-block--wide-title"
      >
        <div className="operating-dossier">
          <ol className="principle-list">
            {values.map((item, index) => (
              <li className="principle-list__item" key={item.title}>
                <span className="principle-list__index">0{index + 1}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="capability-columns">
            <section className="capability-columns__group">
              <p className="section-kicker">Backend systems</p>
              <div className="tag-row">
                {skills.backend.map((item) => (
                  <span className="tech-tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </section>
            <section className="capability-columns__group">
              <p className="section-kicker">Platform and execution</p>
              <div className="tag-row">
                {skills.methodology.map((item) => (
                  <span className="tech-tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </section>
            <section className="capability-columns__group">
              <p className="section-kicker">Supporting range</p>
              <div className="tag-row">
                {skills.frontend.map((item) => (
                  <span className="tech-tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </SectionBlock>

      <SectionBlock
        eyebrow="Career arc"
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
