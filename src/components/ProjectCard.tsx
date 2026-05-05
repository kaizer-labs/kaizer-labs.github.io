import { Link } from "react-router-dom";

import type { ProjectEntry } from "../content";
import { TechTag } from "./TechTag";

interface ProjectCardProps {
  project: ProjectEntry;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      className="project-card"
      to={`/projects/${project.slug}`}
      data-analytics-event="project_open"
      data-analytics-label={project.title}
    >
      <div className="project-card__eyebrow">
        <span className="project-card__status">{project.status}</span>
      </div>
      <div className="project-card__top">
        <h3>{project.title}</h3>
        <p className="project-card__subtitle">{project.subtitle}</p>
      </div>
      <div className="project-card__metrics">
        {project.metrics.slice(0, 2).map((metric) => (
          <span key={metric}>{metric}</span>
        ))}
      </div>
      <div className="project-card__tags">
        {project.tech.slice(0, 4).map((tag) => (
          <TechTag key={tag} label={tag} />
        ))}
      </div>
      <p>{project.summary}</p>
    </Link>
  );
}
