import { Link } from "react-router-dom";

import type { ProjectEntry } from "../content";
import { TechTag } from "./TechTag";

interface ProjectCardProps {
  project: ProjectEntry;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      className="project-row"
      to={`/projects/${project.slug}`}
      data-analytics-event="project_open"
      data-analytics-label={project.title}
    >
      <div className="project-row__meta">
        <span className="project-row__status">{project.status}</span>
        <span className="project-row__year">{project.year}</span>
      </div>

      <div className="project-row__body">
        <h3>{project.title}</h3>
        <p className="project-row__subtitle">{project.subtitle}</p>
        <p className="project-row__summary">{project.summary}</p>
      </div>

      <div className="project-row__proof">
        <div className="project-row__metrics">
          {project.metrics.slice(0, 2).map((metric) => (
            <span key={metric}>{metric}</span>
          ))}
        </div>
        <div className="project-row__tags">
          {project.tech.slice(0, 4).map((tag) => (
            <TechTag key={tag} label={tag} />
          ))}
        </div>
        <span className="project-row__cta" aria-hidden="true">
          View case study
        </span>
      </div>
    </Link>
  );
}
