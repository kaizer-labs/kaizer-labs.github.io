import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { WorkCard } from "../components/WorkCard";
import { projects } from "../content";

type WorkFilter = "all" | "ai" | "backend";

const filters: { id: WorkFilter; label: string }[] = [
  { id: "all", label: "All work" },
  { id: "ai", label: "AI & agents" },
  { id: "backend", label: "Backend systems" },
];
const isAIProject = (slug: string) => slug.includes("ai-assisted") || slug.includes("document-intelligence");
const orderedProjects = [...projects].sort((left, right) => Number(isAIProject(right.slug)) - Number(isAIProject(left.slug)) || left.order - right.order);

export function ProjectsPage() {
  const [filter, setFilter] = useState<WorkFilter>("all");
  const visibleProjects = orderedProjects.filter((project) => filter === "all" || (filter === "ai" ? isAIProject(project.slug) : !isAIProject(project.slug)));

  return (
    <Layout
      title="Selected work | Kaizer Charania"
      description="AI agents, local-first RAG, and production backend systems. Explore engineering case studies by Kaizer Charania."
      frameClass="site-frame--work"
    >
      <section className="work-hub" aria-labelledby="work-title">
        <div className="work-hub__intro">
          <p className="work-hub__eyebrow"><span /> THE ENGINEERING BEHIND THE INTERFACE</p>
          <h1 id="work-title">Systems built.<br /><span>Decisions made.</span></h1>
          <p className="work-hub__description">A collection of AI workflows and production platforms. The problems, the architecture, and the decisions that made them work.</p>
        </div>
        <div className="work-hub__toolbar">
          <div className="work-hub__filters" role="group" aria-label="Filter engineering work">
            {filters.map((item) => <button key={item.id} type="button" aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>{item.label}</button>)}
          </div>
          <p className="work-hub__count" role="status" aria-live="polite" aria-atomic="true">{String(visibleProjects.length).padStart(2, "0")} PROJECTS</p>
        </div>
        <div className="work-hub__grid">
          {visibleProjects.map((project, index) => <WorkCard key={project.slug} project={project} index={index} />)}
        </div>
        <div className="work-hub__contact">
          <div><p className="work-hub__eyebrow">LET’S COMPARE NOTES</p><h2>Have a complex problem in mind?</h2></div>
          <Link to="/contact" data-analytics-event="contact_click" data-analytics-label="work_hub_contact">Let’s talk <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </Layout>
  );
}
