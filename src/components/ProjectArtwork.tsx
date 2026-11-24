export type ProjectKind = "agents" | "rag" | "scheduling" | "events";

export function getProjectKind(slug: string): ProjectKind {
  if (slug.includes("ai-assisted")) return "agents";
  if (slug.includes("document-intelligence")) return "rag";
  if (slug.includes("scheduling")) return "scheduling";
  return "events";
}

function AgentArtwork() {
  return (
    <>
      <g className="project-art__connection"><path d="M114 170H210M322 170H370M370 86V254M370 86H398M370 170H510M370 254H398" /></g>
      <g className="project-art__node"><rect x="58" y="143" width="56" height="54" rx="8" /><path d="m76 161 8 9-8 9m13 0h9" /></g>
      <g className="project-art__central">
        <rect x="210" y="114" width="112" height="112" rx="20" />
        <path d="m250 149-10 21 10 21m32-42 10 21-10 21m-18-42-7 42" />
        <path className="project-art__pin" d="M234 104v10m21-10v10m22-10v10m21-10v10M234 226v10m21-10v10m22-10v10m21-10v10M200 138h10m-10 21h10m-10 22h10m-10 21h10M322 138h10m-10 21h10m-10 22h10m-10 21h10" />
      </g>
      <g className="project-art__node"><rect x="398" y="58" width="112" height="56" rx="8" /><rect x="510" y="142" width="80" height="56" rx="8" /><rect x="398" y="226" width="112" height="56" rx="8" /></g>
      <g className="project-art__code"><path d="M416 78h22m-22 8h47m-47 8h35M529 162h17m-17 8h41m-41 8h29M416 246h30m-30 8h48m-48 8h22" /></g>
      <circle className="project-art__signal" cx="167" cy="170" r="4" /><circle className="project-art__signal" cx="369" cy="170" r="4" />
      <text className="project-art__caption" x="266" y="269" textAnchor="middle">ORCHESTRATE</text><text className="project-art__caption" x="86" y="224" textAnchor="middle">CONTEXT</text><text className="project-art__caption" x="555" y="225" textAnchor="middle">REVIEW</text>
    </>
  );
}

function RetrievalArtwork() {
  return (
    <>
      <g className="project-art__connection"><path d="M197 170h67m112 0h67M320 114V72h123m-123 154v43h123" /></g>
      <g className="project-art__paper project-art__paper--back"><rect x="84" y="94" width="88" height="118" rx="6" transform="rotate(-12 128 153)" /></g>
      <g className="project-art__paper"><rect x="109" y="111" width="88" height="118" rx="6" /><path d="M128 136h34m-34 12h50m-50 12h50m-50 12h38m-38 25h22" /></g>
      <g className="project-art__central"><rect x="264" y="114" width="112" height="112" rx="20" /><ellipse cx="320" cy="149" rx="24" ry="10" /><path d="M296 149v37c0 5 11 10 24 10s24-5 24-10v-37m-48 18c0 5 11 10 24 10s24-5 24-10" /></g>
      <g className="project-art__node"><rect x="443" y="49" width="116" height="46" rx="7" /><rect x="443" y="147" width="116" height="46" rx="7" /><rect x="443" y="246" width="116" height="46" rx="7" /></g>
      <g className="project-art__code"><path d="M461 67h65m-65 10h43M461 165h45m-45 10h66M461 264h65m-65 10h32" /></g>
      <circle className="project-art__signal" cx="230" cy="170" r="4" /><circle className="project-art__signal" cx="409" cy="170" r="4" />
      <text className="project-art__caption" x="153" y="262" textAnchor="middle">LOCAL RECORDS</text><text className="project-art__caption" x="320" y="260" textAnchor="middle">RETRIEVE</text><text className="project-art__caption" x="501" y="222" textAnchor="middle">EVIDENCE</text>
    </>
  );
}

function SchedulingArtwork() {
  return (
    <>
      <g className="project-art__calendar"><rect x="84" y="65" width="254" height="210" rx="10" /><path d="M84 109h254M133 53v25m155-25v25" /></g>
      <g className="project-art__calendar-grid">{Array.from({ length: 4 }, (_, row) => Array.from({ length: 5 }, (_, column) => <rect key={`${row}-${column}`} x={104 + column * 45} y={130 + row * 32} width="31" height="20" rx="3" />))}</g>
      <g className="project-art__selected-slot"><rect x="194" y="162" width="31" height="20" rx="3" /><path d="m204 172 4 4 7-8" /></g>
      <g className="project-art__connection"><path d="M338 172h63m76-47v-39h52m-52 133v39h52" /></g>
      <g className="project-art__central"><circle cx="477" cy="172" r="47" /><circle cx="477" cy="172" r="33" /><path d="M477 151v22l15 9" /></g>
      <g className="project-art__node"><rect x="405" y="63" width="124" height="34" rx="6" /><rect x="405" y="247" width="124" height="34" rx="6" /></g>
      <text className="project-art__small-label" x="467" y="84" textAnchor="middle">AVAILABILITY</text><text className="project-art__small-label" x="467" y="268" textAnchor="middle">VALIDATE + BOOK</text>
      <circle className="project-art__signal" cx="370" cy="172" r="4" /><text className="project-art__caption" x="211" y="303" textAnchor="middle">FAST READS. CORRECT WRITES.</text>
    </>
  );
}

function EventArtwork() {
  return (
    <>
      <g className="project-art__connection"><path d="M113 170h85m244 0h81M320 117V78h130m-130 145v39h130" /></g>
      <g className="project-art__node"><rect x="57" y="142" width="56" height="56" rx="8" /><path d="m89 153-15 19h11l-5 15 17-21H85Z" /><rect x="450" y="56" width="104" height="44" rx="7" /><rect x="450" y="240" width="104" height="44" rx="7" /><rect x="523" y="148" width="56" height="44" rx="7" /></g>
      <g className="project-art__central"><rect x="198" y="117" width="244" height="106" rx="14" /></g>
      <g className="project-art__event-block">{[0, 1, 2, 3, 4, 5].map((index) => <rect key={index} x={215 + index * 35} y="149" width="25" height="42" rx="4" />)}</g>
      <g className="project-art__node-icon"><rect x="491" y="69" width="22" height="16" rx="2" /><path d="m491 70 11 8 11-8M493 252h18v14h-10l-5 5v-5h-3ZM542 160h18v15h-10l-5 5v-5h-3Z" /></g>
      <circle className="project-art__signal" cx="158" cy="170" r="4" /><circle className="project-art__signal" cx="483" cy="170" r="4" />
      <text className="project-art__caption" x="320" y="263" textAnchor="middle">EVENT STREAM</text><text className="project-art__caption" x="85" y="225" textAnchor="middle">PRODUCE</text>
    </>
  );
}

export function ProjectArtwork({ kind }: { kind: ProjectKind }) {
  return (
    <div className={`project-art project-art--${kind}`} aria-hidden="true">
      <div className="project-art__grid" />
      <svg viewBox="0 0 640 340" fill="none" focusable="false">
        {kind === "agents" && <AgentArtwork />}{kind === "rag" && <RetrievalArtwork />}{kind === "scheduling" && <SchedulingArtwork />}{kind === "events" && <EventArtwork />}
      </svg>
    </div>
  );
}
