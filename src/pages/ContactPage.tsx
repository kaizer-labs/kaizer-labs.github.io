import { Layout } from "../components/Layout";
import { SectionBlock } from "../components/SectionBlock";
import { site } from "../data/site";

export function ContactPage() {
  return (
    <Layout
      title="Connect | Kaizer Charania"
      description="Connect page for Kaizer Charania with profile links and current work context."
      frameClass="site-frame--home"
    >
      <SectionBlock
        eyebrow="Connect"
        title="Reach me here."
        className="section-block--wide-title"
      >
        <div className="contact-showcase">
          <article className="contact-showcase__intro">
            <p className="section-kicker">Current profile</p>
            <h3>Backend, platform, and applied AI systems.</h3>
            <p>{site.contactBody}</p>
            <div className="contact-links">
              <a href={site.linkedin} target="_blank" rel="noreferrer" data-analytics-event="contact_link_click" data-analytics-label="linkedin">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6.94 8.5V19H3.5V8.5h3.44ZM5.22 3C6.32 3 7.2 3.88 7.2 4.98S6.32 6.96 5.22 6.96 3.24 6.08 3.24 4.98 4.12 3 5.22 3ZM20.76 12.58V19h-3.42v-5.56c0-1.33-.48-2.24-1.68-2.24-.92 0-1.46.62-1.7 1.22-.08.22-.1.52-.1.82V19h-3.42s.04-9.38 0-10.36h3.42v1.47c.46-.7 1.28-1.7 3.12-1.7 2.28 0 3.78 1.48 3.78 4.17Z" fill="currentColor" />
                </svg>
                <span>LinkedIn</span>
              </a>
              <a href={site.github} target="_blank" rel="noreferrer" data-analytics-event="contact_link_click" data-analytics-label="github">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.1.82-.25.82-.57v-2.17c-3.34.73-4.04-1.41-4.04-1.41-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.23 1.84 1.23 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.92 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.53.12-3.18 0 0 1-.32 3.3 1.23a11.44 11.44 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.6-2.8 5.61-5.48 5.91.43.37.81 1.1.81 2.23v3.3c0 .32.22.68.83.57A12 12 0 0 0 12 .5Z" fill="currentColor" />
                </svg>
                <span>GitHub</span>
              </a>
              <a href={site.website} target="_blank" rel="noreferrer" data-analytics-event="contact_link_click" data-analytics-label="website">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19Zm6.98 8h-3.02a15.7 15.7 0 0 0-1.48-5.1 8.03 8.03 0 0 1 4.5 5.1ZM12 4.08c.96 1.14 1.8 3.3 2.09 6.42H9.91C10.2 7.38 11.04 5.22 12 4.08ZM4.98 13.5h3.03c.1 1.8.58 3.54 1.47 5.1a8.03 8.03 0 0 1-4.5-5.1Zm3.03-3H4.98a8.03 8.03 0 0 1 4.5-5.1A15.65 15.65 0 0 0 8 10.5Zm1.9 3h4.18c-.28 3.12-1.13 5.28-2.09 6.42-.96-1.14-1.8-3.3-2.09-6.42Zm0-3c.28-3.12 1.13-5.28 2.09-6.42.96 1.14 1.8 3.3 2.09 6.42H9.91Zm4.6 8.1c.89-1.56 1.37-3.3 1.47-5.1h3.03a8.03 8.03 0 0 1-4.5 5.1Zm1.47-8.1c-.1-1.8-.58-3.54-1.47-5.1a8.03 8.03 0 0 1 4.5 5.1h-3.03Z" fill="currentColor" />
                </svg>
                <span>Website</span>
              </a>
            </div>
          </article>

          <div className="contact-showcase__side">
            <article className="contact-showcase__card">
              <p className="section-kicker">Location</p>
              <h3>{site.location}</h3>
              <p>
                Based in the Bay Area.
              </p>
            </article>
            <article className="contact-showcase__card">
              <p className="section-kicker">Focus</p>
              <p>{site.contactGuidance}</p>
            </article>
            <article className="contact-showcase__card">
              <p className="section-kicker">Snapshot</p>
              <p>{site.workIntro}</p>
            </article>
          </div>
        </div>
      </SectionBlock>
    </Layout>
  );
}
