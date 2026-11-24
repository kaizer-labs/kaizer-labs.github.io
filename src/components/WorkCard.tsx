import { Link } from "react-router-dom";
import type { ProjectEntry } from "../content";
import { getProjectKind, ProjectArtwork } from "./ProjectArtwork";
import "../styles/work.scss";

interface WorkCardProps {
  project: ProjectEntry;
  index?: number;
  featured?: boolean;
}

const categories = { agents: "AI ENGINEERING", rag: "APPLIED AI / RAG", scheduling: "BACKEND SYSTEMS", events: "PLATFORM ENGINEERING" };

export function WorkCard({ project, index = 0, featured = false }: WorkCardProps) {
  const kind = getProjectKind(project.slug);

  return (
    <Link className={`work-card${featured ? " work-card--featured" : ""}`} to={`/projects/${project.slug}`} data-analytics-event="project_open" data-analytics-label={project.title}>
      <div className="work-card__visual">
        <span className="work-card__number">{String(index + 1).padStart(2, "0")}</span>
        <ProjectArtwork kind={kind} />
        <span className="work-card__visual-label">{project.year}</span>
        <span className="work-card__open" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 18 18 6M6 6h12v12" /></svg></span>
      </div>
      <div className="work-card__body">
        <span className="work-card__category">{categories[kind]}</span>
        <h3>{project.title}</h3>
        <p className="work-card__summary">{project.summary}</p>
        <div className="work-card__tags">{project.tech.slice(0, 3).map((tech) => <span key={tech}>{tech}</span>)}</div>
        <div className="work-card__footer"><span>Explore case study</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6" /></svg></div>
      </div>
    </Link>
  );
}
