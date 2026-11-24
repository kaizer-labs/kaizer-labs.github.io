import type { NewsletterPost } from "../data/newsletter";
import "../styles/newsletter.scss";

type NewsletterCardProps = {
  post: NewsletterPost;
  featured?: boolean;
  compact?: boolean;
};

function LetterGlyph({ visual }: { visual: NewsletterPost["visual"] }) {
  return (
    <svg className={`letter-glyph letter-glyph--${visual}`} viewBox="0 0 480 320" fill="none" focusable="false">
      {visual === "steps" && <>
        <path className="letter-glyph__line" d="M102 230h276M118 242h244"/>
        <g className="letter-glyph__surface"><path d="M125 230v-30a7 7 0 0 1 7-7h49v37m0 0v-72a7 7 0 0 1 7-7h49v79m0 0V110a7 7 0 0 1 7-7h49v127m0 0V70a7 7 0 0 1 7-7h49v167"/></g>
        <path className="letter-glyph__accent" d="m143 171 47-44 55-47 54-39m-19 1 19-1-2 20"/>
        <g className="letter-glyph__dot"><circle cx="143" cy="171" r="4"/><circle cx="190" cy="127" r="4"/><circle cx="245" cy="80" r="4"/></g>
      </>}
      {visual === "compass" && <>
        <circle className="letter-glyph__line" cx="240" cy="160" r="100" strokeDasharray="2 8"/>
        <circle className="letter-glyph__surface" cx="240" cy="160" r="77"/>
        <circle className="letter-glyph__line" cx="240" cy="160" r="60"/>
        <path className="letter-glyph__line" d="M240 71v25m0 128v25M151 160h25m128 0h25M177 97l17 17m92 92 17 17m-126 0 17-17m92-92 17-17"/>
        <path className="letter-glyph__needle" d="m274 126-20 49-48 19 20-48 48-20Z"/>
        <path className="letter-glyph__accent" d="m274 126-34 34m-14-14 28 29"/>
        <circle className="letter-glyph__dot" cx="240" cy="160" r="4"/>
      </>}
      {visual === "context" && <>
        <path className="letter-glyph__line" d="M160 160h65m32 0h47m0-80v160m0-160h37m-37 80h37m-37 80h37"/>
        <g className="letter-glyph__surface"><rect x="86" y="117" width="74" height="86" rx="7"/><rect x="341" y="56" width="57" height="48" rx="7"/><rect x="341" y="136" width="57" height="48" rx="7"/><rect x="341" y="216" width="57" height="48" rx="7"/></g>
        <path className="letter-glyph__line" d="M103 138h31m-31 12h40m-40 12h30m-30 20h20"/>
        <g className="letter-glyph__accent"><circle cx="240" cy="160" r="23"/><path d="M234 152a6 6 0 0 1 12 0c0 4-6 4-6 9m0 7v1M365 74a5 5 0 0 1 10 0c0 3-5 4-5 7m0 6v1m-5 66a5 5 0 0 1 10 0c0 3-5 4-5 7m0 6v1m-5 66a5 5 0 0 1 10 0c0 3-5 4-5 7m0 6v1"/></g>
      </>}
      {visual === "boundaries" && <>
        <rect className="letter-glyph__line" x="134" y="70" width="212" height="180" rx="14" strokeDasharray="3 7"/>
        <rect className="letter-glyph__surface" x="160" y="96" width="160" height="128" rx="9"/>
        <path className="letter-glyph__accent" d="M174 119v-9h9m114 0h9v9m0 82v9h-9m-114 0h-9v-9M240 138v44m-22-22h44"/>
        <circle className="letter-glyph__accent" cx="240" cy="160" r="36"/>
        <path className="letter-glyph__line" d="M78 160h66m192 0h66M240 36v43m0 162v43"/>
        <path className="letter-glyph__accent" d="M143 151v18m194-18v18M231 78h18m-18 164h18"/>
        <g className="letter-glyph__line"><circle cx="73" cy="160" r="5"/><circle cx="407" cy="160" r="5"/><circle cx="240" cy="31" r="5"/><circle cx="240" cy="289" r="5"/></g>
      </>}
      {visual === "review" && <>
        <rect className="letter-glyph__surface letter-glyph__paper-back" x="148" y="63" width="150" height="190" rx="9" transform="rotate(-8 223 158)"/>
        <path className="letter-glyph__surface" d="M185 72h103l35 35v144a8 8 0 0 1-8 8H185a8 8 0 0 1-8-8V80a8 8 0 0 1 8-8Z"/>
        <path className="letter-glyph__line" d="M288 72v27a8 8 0 0 0 8 8h27M198 126h73m-73 17h102m-102 17h75m-75 17h56m-56 53h25"/>
        <circle className="letter-glyph__check" cx="303" cy="207" r="39"/>
        <path className="letter-glyph__accent" d="m286 207 11 11 23-25"/>
      </>}
      {visual === "process" && <>
        <path className="letter-glyph__line" d="M180 80h142a35 35 0 0 1 35 35v70m-57 55H158a35 35 0 0 1-35-35v-70"/>
        <path className="letter-glyph__accent" d="m341 172 16 16 16-16M139 148l-16-16-16 16"/>
        <g className="letter-glyph__surface"><rect x="166" y="130" width="63" height="60" rx="8"/><rect x="251" y="130" width="63" height="60" rx="8"/></g>
        <path className="letter-glyph__accent" d="M229 160h22m-7-7 7 7-7 7m-61-19-6 12 6 12m25-24 6 12-6 12m-11-24-4 24m75-10 7 7 13-17"/>
        <circle className="letter-glyph__dot" cx="180" cy="80" r="4"/><circle className="letter-glyph__dot" cx="300" cy="240" r="4"/>
      </>}
    </svg>
  );
}

function formatPublishedAt(value: string) {
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date);
}

export function NewsletterCard({ post, featured = false, compact = false }: NewsletterCardProps) {
  const classes = ["letter-card", featured && "letter-card--featured", compact && "letter-card--compact"].filter(Boolean).join(" ");

  return (
    <a className={classes} href={post.url} target="_blank" rel="noopener noreferrer" data-analytics-event="newsletter_article_open" data-analytics-label={post.id}>
      <div className={`letter-card__cover letter-card__cover--${post.visual}`} aria-hidden="true">
        <div className="letter-card__cover-grid"/>
        <span className="letter-card__publication">BUILT WITH JUDGMENT</span>
        <LetterGlyph visual={post.visual}/>
        <span className="letter-card__cover-label">FIELD NOTES <span>/</span> {post.topic.toUpperCase()}</span>
      </div>
      <div className="letter-card__body">
        <div className="letter-card__meta"><span className="letter-card__topic">{post.topic}</span><div>{post.publishedAt && <time dateTime={post.publishedAt}>{formatPublishedAt(post.publishedAt)}</time>}<span>{post.readingMinutes} min read</span></div></div>
        <h3>{post.title}</h3>
        <p className="letter-card__summary">{post.summary}</p>
        <span className="letter-card__cta">Read on LinkedIn <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12"/></svg></span>
      </div>
    </a>
  );
}
