import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import "../styles/journey.scss";

export type AboutChapter = {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  summary: string;
  details: string[];
  tech: string[];
  link?: { label: string; to: string };
};

export function AboutJourney({ chapters }: { chapters: AboutChapter[] }) {
  const instanceId = useId();
  const [selectedId, setSelectedId] = useState(chapters[0]?.id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const selectedIndex = Math.max(0, chapters.findIndex((chapter) => chapter.id === selectedId));

  if (!chapters.length) return null;

  const selectChapter = (index: number, moveFocus = false) => {
    setSelectedId(chapters[index].id);
    if (moveFocus) {
      tabRefs.current[index]?.focus({ preventScroll: true });
      tabRefs.current[index]?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "instant" });
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number;
    switch (event.key) {
      case "ArrowRight": nextIndex = (index + 1) % chapters.length; break;
      case "ArrowLeft": nextIndex = (index - 1 + chapters.length) % chapters.length; break;
      case "Home": nextIndex = 0; break;
      case "End": nextIndex = chapters.length - 1; break;
      default: return;
    }
    event.preventDefault();
    selectChapter(nextIndex, true);
  };

  return (
    <div className="about-journey">
      <div className="about-journey__navigation" role="tablist" aria-label="Explore my engineering journey" aria-orientation="horizontal">
        {chapters.map((chapter, index) => (
          <button
            key={chapter.id}
            ref={(node) => { tabRefs.current[index] = node; }}
            type="button"
            role="tab"
            id={`${instanceId}-tab-${chapter.id}`}
            aria-controls={`${instanceId}-panel-${chapter.id}`}
            aria-selected={selectedIndex === index}
            tabIndex={selectedIndex === index ? 0 : -1}
            onClick={() => selectChapter(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            <span className="about-journey__step">{String(index + 1).padStart(2, "0")}</span>
            <span className="about-journey__label">{chapter.label}</span>
            <span className="about-journey__indicator" aria-hidden="true" />
          </button>
        ))}
      </div>

      {chapters.map((chapter, index) => (
        <div
          key={chapter.id}
          className="about-journey__panel"
          id={`${instanceId}-panel-${chapter.id}`}
          role="tabpanel"
          aria-labelledby={`${instanceId}-tab-${chapter.id}`}
          hidden={selectedIndex !== index}
          tabIndex={0}
        >
          <div className="about-journey__heading">
            <p className="about-journey__eyebrow">{chapter.eyebrow}</p>
            <h3>{chapter.title}</h3>
            <p className="about-journey__summary">{chapter.summary}</p>
          </div>
          <div className="about-journey__body">
            <div className="about-journey__details">
              {chapter.details.map((detail) => <p key={detail}>{detail}</p>)}
            </div>
            {chapter.tech.length > 0 && <ul className="about-journey__tools" aria-label="Tools and disciplines">{chapter.tech.map((tool) => <li key={tool}>{tool}</li>)}</ul>}
            {chapter.link && <Link className="studio-text-link about-journey__link" to={chapter.link.to}>{chapter.link.label}<span aria-hidden="true">↗</span></Link>}
          </div>
        </div>
      ))}
      <p className="about-journey__hint"><span aria-hidden="true">↔</span> Select a chapter to follow the thread.</p>
    </div>
  );
}
