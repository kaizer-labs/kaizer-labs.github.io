import type { ArchitectureLayer } from "../content";

interface ArchitectureDiagramProps {
  title: string;
  summary: string;
  layers: ArchitectureLayer[];
}

export function ArchitectureDiagram({
  title,
  summary,
  layers,
}: ArchitectureDiagramProps) {
  return (
    <section className="architecture-panel" aria-labelledby="architecture-title">
      <div className="architecture-panel__header">
        <p className="section-kicker">Architecture</p>
        <h2 id="architecture-title">{title}</h2>
        <p>{summary}</p>
      </div>

      <div className="architecture-diagram" aria-label={title}>
        {layers.map((layer, index) => (
          <article className="architecture-layer" key={layer.name}>
            <div className="architecture-layer__rail" aria-hidden="true">
              <span className="architecture-layer__dot"></span>
              {index < layers.length - 1 ? (
                <span className="architecture-layer__line"></span>
              ) : null}
            </div>
            <div className="architecture-layer__card">
              <p className="architecture-layer__index">Layer 0{index + 1}</p>
              <h3>{layer.name}</h3>
              <p>{layer.description}</p>
              <ul>
                {layer.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

