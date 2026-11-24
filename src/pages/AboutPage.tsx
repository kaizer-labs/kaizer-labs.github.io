import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AboutJourney, type AboutChapter } from "../components/AboutJourney";
import { Layout } from "../components/Layout";
import { site, skills, story, values } from "../data/site";
import "../styles/support.scss";

const chapters: AboutChapter[] = [
  {
    id: "adara",
    label: "ADARA",
    eyebrow: "2019–2022 / THE FOUNDATIONS",
    title: "Start with the connections.",
    summary: "Partner APIs, data pipelines, and the foundations of a backend engineering practice.",
    details: [
      "At ADARA, I worked across travel MarTech and AdTech, building Python services, ETL workflows, and integrations that connected data platforms with their partners.",
      "I grew from Backend Software Engineer to Software Engineer 2 and Lead Onboarding Engineer. Reusable service patterns and a configuration-driven adapter made complex integrations easier to work with."
    ],
    tech: ["Python", "Flask", "OpenAPI", "ETL", "Partner integrations"],
    link: { label: "Inside the adapter service", to: "/projects/integration-adapter-service" }
  },
  {
    id: "goodyear",
    label: "Goodyear",
    eyebrow: "2022–2026 / SYSTEMS & LEADERSHIP",
    title: "Scale the systems. Improve how they’re built.",
    summary: "Production platforms, technical direction for an eight-engineer team, and AI-assisted delivery.",
    details: [
      "At Goodyear, I worked across scheduling, notifications, service boundaries, and cloud applications for Virtual Tire Development. I grew into technical leadership for an eight-engineer team while staying hands-on with architecture, implementation, and production reliability.",
      "AI became part of that delivery work: repository-aware planning, test generation, review feedback, and RAG-based retrieval. The same principles applied to the software and the workflow: clear context, explicit boundaries, verification, and human ownership."
    ],
    tech: ["Python", "PostgreSQL", "Kafka / MSK", "AI-assisted SDLC", "RAG", "Technical leadership"],
    link: { label: "Inside the platform work", to: "/projects/platform-modernization" }
  },
  {
    id: "airbyte",
    label: "Airbyte",
    eyebrow: "SEPTEMBER 2026–PRESENT / THE CURRENT CHAPTER",
    title: "Build the system. Strengthen the workflow.",
    summary: "Senior Software Engineer at Airbyte. Backend systems, data integration, and AI-assisted engineering.",
    details: [
      "I joined Airbyte in September 2026, continuing a career across backend platforms, data integration, and hands-on technical leadership.",
      "My engineering approach brings agents into research, architecture planning, implementation, testing, and review. Orchestration, regression tests, evaluations, and continuous feedback make that assistance useful, while engineers keep ownership of the decisions and the result."
    ],
    tech: ["Data integration", "AI agents", "Evaluations", "Human review"],
    link: { label: "Let’s compare notes", to: "/contact" }
  }
];

const skillGroups = [
  { title: "The systems", items: skills.backend },
  { title: "The agent workflow", items: skills.ai },
  { title: "The delivery", items: skills.methodology.slice(0, -1) }
];

const pageSections = [
  { id: "about-story", label: "The story" },
  { id: "about-chapters", label: "The chapters" },
  { id: "about-principles", label: "The judgment" },
  { id: "about-toolkit", label: "The toolkit" }
];

export function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.revealState = "visible";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06 });
    const sections = pageRef.current.querySelectorAll<HTMLElement>("[data-about-reveal]");
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top > window.innerHeight * 0.95) {
        section.dataset.revealState = "waiting";
        observer.observe(section);
      }
    });
    return () => observer.disconnect();
  }, []);

  return (
    <Layout title="About — Kaizer Charania" description="Kaizer Charania: engineer at Airbyte, builder of backend platforms and AI-assisted engineering workflows, and writer of Built With Judgment." frameClass="site-frame--support">
      <div className="support-page support-about" ref={pageRef}>
        <header className="support-hero support-hero--split">
          <div>
            <p className="studio-eyebrow"><span className="status-dot"/> THE PERSON BEHIND THE BUILD</p>
            <h1>An engineer.<br/><span>A curious mind.</span></h1>
            <p className="support-lede">Drawn to complex problems.<br/>Intent on making them simpler.</p>
          </div>
          <div className="support-identity">
            <span className="support-identity__monogram" aria-hidden="true">Kz<span>.</span></span>
            <p>{site.name}</p><span>{site.role}</span><span>{site.location}</span>
            <a href={site.linkedin} target="_blank" rel="noreferrer">A little more on LinkedIn <span aria-hidden="true">↗</span></a>
          </div>
        </header>

        <nav className="about-section-nav" aria-label="On this page">
          {pageSections.map((section, index) => <a href={`#${section.id}`} key={section.id}><span>0{index + 1}</span>{section.label}</a>)}
        </nav>

        <section className="support-section support-narrative about-flow-section" id="about-story" aria-labelledby="about-story-title" data-about-reveal>
          <div className="about-section-heading"><h2 className="studio-eyebrow" id="about-story-title">01 / THE SHORT STORY</h2><p className="about-margin-note">Systems change.<br/>The through line stays.</p></div>
          <div>{story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        </section>

        <section className="about-chapters about-flow-section" id="about-chapters" aria-labelledby="chapters-title" data-about-reveal>
          <header className="about-chapters__header"><div><p className="studio-eyebrow">02 / FOLLOW THE THREAD</p><h2 id="chapters-title">Different problems.<br/><span>A connected story.</span></h2></div><p>From APIs and pipelines to platforms and agents.<br/>Explore a chapter to see what carried forward.</p></header>
          <AboutJourney chapters={chapters}/>
        </section>

        <section className="support-section support-operating about-flow-section" id="about-principles" aria-labelledby="operating-title" data-about-reveal>
          <div className="about-section-heading"><p className="studio-eyebrow">03 / THE JUDGMENT</p><h2 id="operating-title">How I approach<br/><span>the hard parts.</span></h2><p className="about-margin-note">A few things I come back to.<br/>Open one to look closer.</p></div>
          <div className="about-principles">{values.map((item, index) => <details key={item.title} open={index === 0}><summary><span className="support-index">0{index + 1}</span><span>{item.title}</span><span className="about-principles__toggle" aria-hidden="true">+</span></summary><div><p>{item.body}</p></div></details>)}</div>
        </section>

        <section className="support-section support-toolkit about-flow-section" id="about-toolkit" aria-labelledby="toolkit-title" data-about-reveal>
          <div className="about-section-heading"><p className="studio-eyebrow">04 / THE TOOLKIT</p><h2 id="toolkit-title">The right tools.<br/><span>For the actual problem.</span></h2></div>
          <div className="support-skills">{skillGroups.map((group) => <section key={group.title}><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></section>)}</div>
        </section>

        <section className="about-writing" aria-labelledby="about-writing-title" data-about-reveal>
          <div><p className="studio-eyebrow">THINKING IN PUBLIC</p><h2 id="about-writing-title">The build is only<br/><span>half the story.</span></h2></div>
          <div><p>I write <em>Built With Judgment</em> to work through the other half: how agents fit into engineering, what useful context looks like, and where human judgment makes the difference.</p><a className="studio-text-link" href={site.newsletterUrl} target="_blank" rel="noreferrer" data-analytics-event="newsletter_subscribe_click" data-analytics-label="about_build_with_judgment">Build with Judgment <span aria-hidden="true">↗</span></a></div>
        </section>

        <section className="support-closing"><div><p className="studio-eyebrow">A GOOD PROBLEM IS A GOOD PLACE TO START</p><h2>What are you thinking about building?</h2></div><Link className="studio-text-link" to="/contact">Let’s compare notes <span aria-hidden="true">↗</span></Link></section>
      </div>
    </Layout>
  );
}
