import type { ReactNode } from "react";

interface SectionBlockProps {
  eyebrow: string;
  title: string;
  description?: string;
  id?: string;
  className?: string;
  children: ReactNode;
}

export function SectionBlock({
  eyebrow,
  title,
  description,
  id,
  className,
  children,
}: SectionBlockProps) {
  return (
    <section className={["section-block", className].filter(Boolean).join(" ")} id={id}>
      <div className="section-block__header">
        <p className="section-kicker">{eyebrow}</p>
        <h2>{title}</h2>
        {description ? <p className="section-copy">{description}</p> : null}
      </div>
      <div className="section-block__content">{children}</div>
    </section>
  );
}

