import { Children, isValidElement, lazy, Suspense, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ArticleFlowKind } from "./ArticleFlow";

const ArticleFlow = lazy(() => import("./ArticleFlow").then((module) => ({ default: module.ArticleFlow })));

interface ArticleSection {
  title: string;
  id: string;
  line: number;
}

function plainText(children: ReactNode): string {
  return Children.toArray(children).map((child) => {
    if (typeof child === "string" || typeof child === "number") return String(child);
    return isValidElement<{ children?: ReactNode }>(child) ? plainText(child.props.children) : "";
  }).join("");
}

function sectionId(title: string) {
  return title.toLowerCase().replace(/[`*_]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function articleSections(content: string): ArticleSection[] {
  const sections: ArticleSection[] = [];
  const seen = new Map<string, number>();
  let fence: string | undefined;
  content.split("\n").forEach((line, index) => {
    const marker = line.match(/^\s{0,3}(`{3,}|~{3,})/)?.[1];
    if (marker) {
      if (!fence) fence = marker;
      else if (marker[0] === fence[0] && marker.length >= fence.length) fence = undefined;
      return;
    }
    if (fence) return;
    const title = line.match(/^##\s+(.+?)(?:\s+#+)?$/)?.[1];
    if (!title) return;
    const cleanTitle = title.replace(/[`*_]/g, "");
    const baseId = sectionId(cleanTitle);
    const count = (seen.get(baseId) || 0) + 1;
    seen.set(baseId, count);
    sections.push({ title: cleanTitle, id: count === 1 ? baseId : `${baseId}-${count}`, line: index + 1 });
  });
  return sections;
}

const interactiveKinds = new Set<ArticleFlowKind>(["regression-verdict", "feedback-lifecycle", "window-splitting"]);

export function ArticleBody({ content }: { content: string }) {
  const sections = articleSections(content);

  return <>
    {sections.length > 0 && <details className="writing-article__contents">
      <summary>On this page <span>{sections.length} sections</span></summary>
      <nav aria-label="Article sections">
        <ol>{sections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}</ol>
      </nav>
    </details>}
    <div className="writing-article__body">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
        h2: ({ node, children }) => {
          const title = plainText(children);
          const id = sections.find((section) => section.line === node?.position?.start.line)?.id ?? sectionId(title);
          return <h2 id={id} tabIndex={-1}>{children}<a className="writing-article__heading-link" href={`#${id}`} aria-label={`Link to ${title}`}><span aria-hidden="true">#</span></a></h2>;
        },
        pre: ({ children }) => {
          const code = Children.toArray(children).find((child) => isValidElement(child));
          if (isValidElement<{ className?: string; children?: ReactNode }>(code) && code.props.className?.split(" ").includes("language-interactive")) {
            const kind = plainText(code.props.children).trim() as ArticleFlowKind;
            if (interactiveKinds.has(kind)) return <Suspense key={kind} fallback={<div className="writing-article__flow-loading" role="status">Loading interactive example…</div>}><ArticleFlow kind={kind} /></Suspense>;
          }
          return <pre tabIndex={0} role="region" aria-label="Code example">{children}</pre>;
        },
        table: ({ node, children }) => {
          const section = sections.filter((item) => item.line < (node?.position?.start.line ?? 0)).at(-1);
          const label = section ? `Table: ${section.title}` : "Article comparison table";
          return <figure className="writing-article__table">
            <div className="writing-article__table-wrap" tabIndex={0} role="region" aria-label={label}>
              <table><caption className="sr-only">{label}</caption>{children}</table>
            </div>
            <figcaption className="writing-article__table-hint">Scroll horizontally to compare columns.</figcaption>
          </figure>;
        },
        th: ({ children, style }) => <th scope="col" style={style}>{children}</th>,
        a: ({ href, children }) => /^https?:\/\//.test(href ?? "")
          ? <a href={href} target="_blank" rel="noopener noreferrer">{children}<span className="sr-only"> (opens in a new tab)</span></a>
          : <a href={href}>{children}</a>,
      }}>{content}</ReactMarkdown>
    </div>
  </>;
}
