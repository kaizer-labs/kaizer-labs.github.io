import { useEffect, useRef, useState } from "react";

const stages = [
  { title: "Context", detail: "Read the repository. Understand the boundaries. Give every agent the same starting point.", log: "context.load → repository, constraints, acceptance criteria", node: "context" },
  { title: "Orchestrate", detail: "An orchestrator breaks down the task and sends focused work to implementation, review, and test agents.", log: "agents.dispatch → implementation ∥ review ∥ tests", node: "orchestrate" },
  { title: "Verify", detail: "Bring the work together. Check the implementation against tests, architecture, and the original intent.", log: "verification.run → build, tests, review feedback", node: "verify" },
  { title: "Human review", detail: "The engineer owns the final decision. Review the evidence before anything is merged or deployed.", log: "handoff.ready → evidence attached; engineer decides", node: "human" },
];

export function AgentWorkflow() {
  const [stage, setStage] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isRunning) return;
    timer.current = setTimeout(() => {
      if (stage < stages.length - 1) setStage(stage + 1);
      else setIsRunning(false);
    }, 1400);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [isRunning, stage]);

  const selectStage = (index: number) => { setIsRunning(false); setStage(index); };

  return (
    <div className="agent-workflow" data-stage={stages[stage].node} data-running={isRunning}>
      <div className="agent-workflow__bar"><span><span className="status-dot"/> AGENT WORKSPACE</span><span>INTERACTIVE DEMO</span></div>
      <div className="agent-workflow__canvas">
        <div className="agent-workflow__coordinate agent-workflow__coordinate--top">01 / ORCHESTRATION</div>
        <svg className="agent-graph" viewBox="0 0 540 340" fill="none" role="img" aria-label="Repository context feeds an orchestrator that delegates to code, review, and test agents, with a final human review.">
          <defs><pattern id="graph-dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".7" fill="currentColor" opacity=".2"/></pattern></defs>
          <rect width="540" height="340" fill="url(#graph-dots)"/>
          <circle className="graph-orbit" cx="270" cy="151" r="88" stroke="currentColor" strokeDasharray="2 7"/>
          <circle className="graph-orbit graph-orbit--outer" cx="270" cy="151" r="112" stroke="currentColor" opacity=".35"/>
          <g className="graph-paths" stroke="currentColor" strokeWidth="1"><path d="M270 60V108"/><path d="M135 147h90m90 0h90"/><path d="M249 178v34H112v34m158-34v34m21-68v34h137v34"/><path d="M112 284v29h316v-29m-158-29v58"/></g>
          <g className="graph-packets" fill="currentColor"><circle className="graph-packet graph-packet--one" cx="270" cy="83" r="3"/><circle className="graph-packet graph-packet--two" cx="180" cy="147" r="3"/><circle className="graph-packet graph-packet--three" cx="360" cy="147" r="3"/></g>
          <g className="graph-node graph-node--context"><rect x="209" y="24" width="122" height="36" rx="5"/><path d="M224 36h10m-10 5h7m-7 5h10"/><text x="244" y="46">repo.context</text></g>
          <g className="graph-node graph-node--memory"><rect x="30" y="129" width="105" height="36" rx="5"/><path d="M43 141h11m-11 5h11m-11 5h7"/><text x="65" y="151">memory</text></g>
          <g className="graph-node graph-node--tools"><rect x="405" y="129" width="105" height="36" rx="5"/><path d="m418 141 5 5-5 5m10 0h5"/><text x="445" y="151">tools</text></g>
          <g className="graph-hub"><rect x="237" y="118" width="66" height="66" rx="16"/><path d="m270 132 15 9v18l-15 9-15-9v-18l15-9Z"/><path d="m255 141 15 9 15-9m-15 9v18"/><circle cx="270" cy="151" r="44" stroke="currentColor" strokeWidth=".75" opacity=".35"/></g>
          <g className="graph-node graph-node--agents"><rect x="55" y="246" width="114" height="38" rx="5"/><path d="m69 259-4 6 4 6m9-12 4 6-4 6m-5-14-2 16"/><text x="91" y="269">code</text><circle cx="154" cy="265" r="2.5"/></g>
          <g className="graph-node graph-node--agents"><rect x="213" y="246" width="114" height="38" rx="5"/><path d="m226 266 4 4 8-10"/><text x="249" y="269">review</text><circle cx="313" cy="265" r="2.5"/></g>
          <g className="graph-node graph-node--agents"><rect x="371" y="246" width="114" height="38" rx="5"/><path d="M387 257v7l-5 9h14l-5-9v-7m-6 0h8m-8 12h8"/><text x="407" y="269">tests</text><circle cx="470" cy="265" r="2.5"/></g>
          <text className="graph-label" x="270" y="102" textAnchor="middle">ORCHESTRATOR</text>
          <g className="graph-human"><rect x="218" y="301" width="104" height="26" rx="13"/><text x="270" y="318" textAnchor="middle">human.review</text></g>
        </svg>
        <span className="agent-workflow__coordinate agent-workflow__coordinate--bottom">BOUNDED AUTONOMY. EXPLICIT OWNERSHIP.</span>
      </div>
      <div className="agent-workflow__controls" role="group" aria-label="Explore workflow stages">
        {stages.map((item, index) => <button key={item.title} type="button" aria-pressed={stage === index} onClick={() => selectStage(index)}><span>0{index + 1}</span>{item.title}</button>)}
      </div>
      <div className="agent-workflow__detail" aria-live="polite" aria-atomic="true"><code><span>›</span> {stages[stage].log}</code><p>{stages[stage].detail}</p></div>
      <div className="agent-workflow__footer"><span>Illustrative workflow · no live model</span><button type="button" onClick={() => { if (isRunning) setIsRunning(false); else { setStage(0); setIsRunning(true); } }}><span aria-hidden="true">{isRunning ? "Ⅱ" : "▷"}</span> {isRunning ? "Pause" : "Run workflow"}</button></div>
    </div>
  );
}
