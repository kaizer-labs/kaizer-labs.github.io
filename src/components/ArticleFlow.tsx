import { useId, useState } from "react";
import "../styles/article-flow.scss";

export type ArticleFlowKind = "regression-verdict" | "feedback-lifecycle" | "window-splitting";

type StageState = "pending" | "current" | "complete" | "blocked";
interface Stage { label: string; detail: string; state: StageState }

function ArrowMarker({ id }: { id: string }) {
  return <defs><marker id={id} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto" markerUnits="userSpaceOnUse"><path className="flow-edge" d="m1 1 5 2.5L1 6" /></marker></defs>;
}

function FlowDiagram({ stages, caption }: { stages: Stage[]; caption: string }) {
  const arrowId = useId();
  const width = stages.length === 6 ? 104 : 150;
  const gap = stages.length === 6 ? 22 : 42;
  const start = (760 - stages.length * width - (stages.length - 1) * gap) / 2;

  return <>
    <div className="article-flow__diagram" tabIndex={0} role="img" aria-label={stages.map((stage) => `${stage.label}: ${stage.state}`).join(". ")}>
      <svg viewBox="0 0 760 145" fill="none" aria-hidden="true" focusable="false">
        <ArrowMarker id={arrowId} />
        {stages.map((stage, index) => {
          const x = start + index * (width + gap);
          return <g key={stage.label}>
            {index < stages.length - 1 && <path className="flow-edge" markerEnd={`url(#${arrowId})`} d={`M${x + width} 60h${gap}`} />}
            <g className={`flow-node flow-node--${stage.state}`}><rect x={x} y="34" width={width} height="52" rx="8" /><text className="flow-label" x={x + width / 2} y="64" textAnchor="middle">{stage.label}</text></g>
            <text className="flow-caption" x={x + width / 2} y="112" textAnchor="middle">{stage.state === "complete" ? "Complete" : stage.state === "blocked" ? "Held" : stage.state === "current" ? "Current" : "Pending"}</text>
          </g>;
        })}
      </svg>
    </div>
    <p className="article-flow__caption">{caption}</p>
  </>;
}

function StageProgress({ stages }: { stages: Stage[] }) {
  return <ol className="article-flow__progress">{stages.map((stage) => <li key={stage.label} data-state={stage.state}><strong>{stage.label}</strong><span>{stage.detail}</span></li>)}</ol>;
}

type Verdict = "PASS" | "FAIL" | "INCONCLUSIVE" | "NOT_EXERCISED";
interface SampleRecord { accountId: string; version: number; trace?: string }
interface RegressionScenario {
  id: string;
  label: string;
  baseline: SampleRecord[];
  candidate: SampleRecord[] | null;
  completed: boolean;
  exercised: boolean;
  knownEmpty?: boolean;
}

const baselineRecords: SampleRecord[] = [
  { accountId: "acct_17", version: 2, trace: "baseline-a" },
  { accountId: "acct_17", version: 2, trace: "baseline-b" },
  { accountId: "acct_29", version: 1, trace: "baseline-c" },
];

const regressionScenarios: RegressionScenario[] = [
  { id: "parity", label: "Same records, different order", baseline: baselineRecords, candidate: [baselineRecords[2], { ...baselineRecords[0], trace: "candidate-a" }, baselineRecords[1]], completed: true, exercised: true },
  { id: "missing-artifact", label: "Candidate artifact is missing", baseline: baselineRecords, candidate: null, completed: false, exercised: true },
  { id: "stopped-read", label: "Candidate read stopped early", baseline: baselineRecords, candidate: [baselineRecords[0]], completed: false, exercised: true },
  { id: "new-duplicate", label: "Candidate emits an extra duplicate", baseline: baselineRecords, candidate: [...baselineRecords, baselineRecords[0]], completed: true, exercised: true },
  { id: "known-empty", label: "Both reads are known to be empty", baseline: [], candidate: [], completed: true, exercised: true, knownEmpty: true },
  { id: "unexercised", label: "No coverage was established", baseline: [], candidate: [], completed: true, exercised: false },
];

function scopedCounts(records: SampleRecord[]) {
  const counts = new Map<string, number>();
  records.forEach((record) => {
    const key = `${record.accountId} / v${record.version}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  });
  return counts;
}

function compareScenario(scenario: RegressionScenario): { verdict: Verdict; stopAt: number; explanation: string } {
  if (!scenario.candidate) return { verdict: "INCONCLUSIVE", stopAt: 1, explanation: "The candidate artifact is missing. There is no captured output to compare." };
  if (!scenario.completed) return { verdict: "INCONCLUSIVE", stopAt: 2, explanation: "The candidate read did not finish. A partial artifact cannot establish parity or a complete regression result." };
  if (!scenario.exercised) return { verdict: "NOT_EXERCISED", stopAt: 3, explanation: "No coverage contract was established. Empty arrays alone do not show that the target behavior ran." };
  const baseline = scopedCounts(scenario.baseline);
  const candidate = scopedCounts(scenario.candidate);
  const keys = new Set([...baseline.keys(), ...candidate.keys()]);
  const matches = [...keys].every((key) => (baseline.get(key) ?? 0) === (candidate.get(key) ?? 0));
  return matches
    ? { verdict: "PASS", stopAt: 4, explanation: scenario.knownEmpty ? "Both reads completed and exercised the known-empty case. The expected-empty contract supports this result. The comparison passes within that scope." : "Both reads completed and exercised the target behavior. Every scoped record and its duplicate count match. The scope excludes record order and trace IDs." }
    : { verdict: "FAIL", stopAt: 4, explanation: "Both reads completed and exercised the target behavior. The candidate has a different duplicate count. A comparison using sets would hide this regression." };
}

const verdictLabels: Record<Verdict, string> = { PASS: "Pass", FAIL: "Fail", INCONCLUSIVE: "Inconclusive", NOT_EXERCISED: "Not exercised" };

function RegressionLab() {
  const id = useId();
  const [scenarioId, setScenarioId] = useState("parity");
  const [step, setStep] = useState(0);
  const scenario = regressionScenarios.find((item) => item.id === scenarioId)!;
  const outcome = compareScenario(scenario);
  const finished = step >= outcome.stopAt;
  const baseline = scopedCounts(scenario.baseline);
  const candidate = scenario.candidate ? scopedCounts(scenario.candidate) : null;
  const keys = [...new Set([...baseline.keys(), ...(candidate?.keys() ?? [])])].sort();
  const gateDetails = ["Both artifacts must exist.", "Both reads must finish.", "The target behavior must be exercised.", "Scoped values and counts must match."];
  const stages: Stage[] = ["Capture", "Completion", "Coverage", "Compare"].map((label, index) => ({
    label,
    detail: gateDetails[index],
    state: finished
      ? index < outcome.stopAt - 1 ? "complete" : index === outcome.stopAt - 1 ? outcome.verdict === "PASS" ? "complete" : "blocked" : "pending"
      : step > index ? "complete" : step === index ? "current" : "pending",
  }));

  return <section className="article-flow" data-flow-kind="regression-verdict" aria-labelledby={`${id}-title`}>
    <header className="article-flow__header"><p className="article-flow__eyebrow">Interactive example</p><h3 id={`${id}-title`}>What does this comparison prove?</h3><p>Choose an input. Each gate checks a required condition. Use Next step to follow the evidence.</p></header>
    <div className="article-flow__controls"><label htmlFor={`${id}-scenario`}><span id={`${id}-scenario-label`}> Comparison scenario </span><select aria-labelledby={`${id}-scenario-label`} id={`${id}-scenario`} value={scenarioId} onChange={(event) => { setScenarioId(event.target.value); setStep(0); }}>{regressionScenarios.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label></div>
    <FlowDiagram stages={stages} caption="A later gate cannot turn missing evidence into a passing result." />
    <StageProgress stages={stages} />
    <dl className="article-flow__facts"><div><dt>Baseline records</dt><dd>{scenario.baseline.length}</dd></div><div><dt>Candidate records</dt><dd>{scenario.candidate?.length ?? "Unavailable"}</dd></div><div><dt>Coverage</dt><dd>{scenario.exercised ? scenario.knownEmpty ? "Known empty" : "Exercised" : "Unknown"}</dd></div></dl>
    <div className="article-flow__table-wrap" tabIndex={0} role="region" aria-label="Scoped record counts"><table><caption>Scope: account_id + version. The comparison preserves duplicate counts. It ignores trace IDs and record order.</caption><thead><tr><th scope="col">Scoped record</th><th scope="col">Baseline count</th><th scope="col">Candidate count</th></tr></thead><tbody>{keys.length > 0 ? keys.map((key) => <tr key={key}><th scope="row"><code>{key}</code></th><td>{baseline.get(key) ?? 0}</td><td>{candidate ? candidate.get(key) ?? 0 : "Unavailable"}</td></tr>) : <tr><td colSpan={3}>No captured records. Check completion and coverage before assigning a verdict.</td></tr>}</tbody></table></div>
    <div className="article-flow__status" data-verdict={finished ? outcome.verdict : "PENDING"} role="status" aria-live="polite" aria-atomic="true"><strong>{finished ? verdictLabels[outcome.verdict] : "Pending"}</strong><p>{finished ? outcome.explanation : step === 0 ? "No verdict yet. Start with artifact capture." : `${stages[step].label} is the next gate. A final verdict has not been established.`}</p></div>
    <div className="article-flow__actions"><button className="article-flow__button" type="button" disabled={finished} onClick={() => setStep((current) => Math.min(current + 1, outcome.stopAt))}>Next step</button><button className="article-flow__button article-flow__button--secondary" type="button" onClick={() => setStep(0)}>Reset</button></div>
    <p className="article-flow__note">Synthetic records, compared locally. These gates do not call a connector, service, or model.</p>
  </section>;
}

interface RuleFixture { name: string; capture: boolean; completed: boolean; coverage: boolean; records: number; expected: boolean }
const ruleFixtures: RuleFixture[] = [
  { name: "Complete read", capture: true, completed: true, coverage: true, records: 3, expected: true },
  { name: "Stopped read", capture: true, completed: false, coverage: true, records: 1, expected: false },
  { name: "Known empty", capture: true, completed: true, coverage: true, records: 0, expected: true },
  { name: "Unknown coverage", capture: true, completed: true, coverage: false, records: 0, expected: false },
];
const applyRule = (fixture: RuleFixture, version: number) => version === 1 ? fixture.capture && fixture.records > 0 : fixture.capture && fixture.completed && fixture.coverage;
type ProposedRule = "complete-only" | "complete-and-coverage";
const applyCandidateRule = (fixture: RuleFixture, proposal: ProposedRule) => fixture.capture && fixture.completed && (proposal === "complete-only" || fixture.coverage);

function FeedbackLab() {
  const id = useId();
  const [evidence, setEvidence] = useState("current");
  const [duplicate, setDuplicate] = useState(false);
  const [proposal, setProposal] = useState<ProposedRule>("complete-and-coverage");
  const [phase, setPhase] = useState(0);
  const [attemptedStale, setAttemptedStale] = useState(false);
  const [deduplicated, setDeduplicated] = useState(false);
  const [decision, setDecision] = useState<"approved" | "rejected" | null>(null);
  const reset = () => { setPhase(0); setAttemptedStale(false); setDeduplicated(false); setDecision(null); };
  const currentEvidence = evidence === "current";
  const version = phase >= 5 ? 2 : 1;
  const matchingChecks = ruleFixtures.filter((fixture) => (version === 1 ? applyRule(fixture, 1) : applyCandidateRule(fixture, proposal)) === fixture.expected).length;
  const candidateChecks = ruleFixtures.map((fixture) => ({ fixture, result: applyCandidateRule(fixture, proposal) }));
  const candidateMatchCount = candidateChecks.filter(({ fixture, result }) => result === fixture.expected).length;
  const candidateChecksPass = candidateChecks.every(({ fixture, result }) => result === fixture.expected);
  const canApprove = phase === 3 && currentEvidence && candidateChecksPass;
  const complete = phase === 6;
  const stages: Stage[] = [
    { label: "Observe", detail: "A stopped read appeared complete." },
    { label: "Evidence", detail: "Check that the capture is current." },
    { label: "Deduplicate", detail: "Link repeated observations." },
    { label: "Review", detail: "Candidate fixture checks must pass before human approval." },
    { label: "Version", detail: "Publish a specific rule revision." },
    { label: "Recheck", detail: "Run fixtures after the version switch." },
  ].map((stage, index) => ({ ...stage, state: index < phase ? "complete" : index === phase && ((phase === 1 && attemptedStale && !currentEvidence) || (phase === 2 && deduplicated) || (phase === 3 && (decision === "rejected" || !candidateChecksPass))) ? "blocked" : index === phase ? "current" : "pending" }));
  const nextDisabled = complete || deduplicated || (phase === 3 && (decision !== "approved" || !canApprove));
  const next = () => {
    if (nextDisabled) return;
    if (phase === 1 && !currentEvidence) { setAttemptedStale(true); return; }
    if (phase === 2 && duplicate) { setDeduplicated(true); return; }
    setPhase((current) => Math.min(6, current + 1));
  };
  const message = complete ? `Rule v2 matches all ${matchingChecks} fixture expectations. Keep the evidence and review attached to this version.`
    : deduplicated ? "This observation matches OBS-07. Link its evidence to the existing observation. This action creates no second proposal or new rule version."
    : attemptedStale && !currentEvidence ? "The capture is stale. Refresh the evidence before deduplication, review, or a rule change can proceed."
    : phase === 3 && decision === "rejected" ? "The reviewer rejected the proposal. Rule v1 remains active. The pipeline cannot advance."
    : phase === 3 && decision === "approved" ? "The reviewer approved the proposal with this evidence. The next step creates the versioned rule."
    : phase === 3 && !candidateChecksPass ? `Candidate checks failed: ${candidateMatchCount} of ${candidateChecks.length} expectations match. Completion alone accepts the unknown-coverage fixture. Failed checks block approval and publication. Revise the proposed rule. Then check it again.`
    : phase === 3 ? `Candidate v2 passes all ${candidateChecks.length} fixture checks before publication. A human must still review the rule. Choose Approve rule or Reject rule.`
    : phase === 5 ? "Rule v2 is active in this local example. Run the post-release fixture check before calling the feedback loop complete."
    : phase === 4 ? "Approval is recorded. The next step changes the rule from v1 to v2."
    : phase === 2 ? "Check whether this observation is already tracked before creating a new rule proposal."
    : phase === 1 ? "Check the age of the evidence. A plausible observation is not enough to change a rule."
    : "Start with one observation: a partial read was mistaken for a completed read.";

  return <section className="article-flow" data-flow-kind="feedback-lifecycle" aria-labelledby={`${id}-title`}>
    <header className="article-flow__header"><p className="article-flow__eyebrow">Interactive example</p><h3 id={`${id}-title`}>From observation to a reviewed rule</h3><p>Follow one feedback item through evidence, deduplication, approval, and verification.</p></header>
    <div className="article-flow__controls"><label htmlFor={`${id}-evidence`}><span id={`${id}-evidence-label`}> Evidence freshness </span><select aria-labelledby={`${id}-evidence-label`} id={`${id}-evidence`} value={evidence} onChange={(event) => { setEvidence(event.target.value); reset(); }}><option value="current">Current capture</option><option value="stale">Stale capture</option></select></label><label htmlFor={`${id}-proposal`}><span id={`${id}-proposal-label`}> Proposed rule </span><select aria-labelledby={`${id}-proposal-label`} id={`${id}-proposal`} value={proposal} onChange={(event) => { setProposal(event.target.value as ProposedRule); reset(); }}><option value="complete-and-coverage">Require completion and known coverage</option><option value="complete-only">Require completion only</option></select></label><label className="article-flow__check"><input type="checkbox" checked={duplicate} onChange={(event) => { setDuplicate(event.target.checked); reset(); }} />Observation is already tracked</label></div>
    <FlowDiagram stages={stages} caption="Candidate checks run before human approval. Fixtures run again after the version switch. Changing the inputs resets the run and invalidates later approval." />
    <StageProgress stages={stages} />
    <dl className="article-flow__facts"><div><dt>Evidence</dt><dd>{currentEvidence ? "Current" : "Stale"}</dd></div><div><dt>Human review</dt><dd>{decision === "approved" ? "Approved" : decision === "rejected" ? "Rejected" : "Pending"}</dd></div><div><dt>Active rule</dt><dd>v{version}</dd></div>{phase >= 3 && <div><dt>Candidate checks</dt><dd>{candidateMatchCount} / {candidateChecks.length}</dd></div>}</dl>
    {phase === 3 && <div className="article-flow__review" role="group" aria-label="Human rule review"><button className="article-flow__button" type="button" disabled={!canApprove} aria-pressed={decision === "approved"} onClick={() => { if (canApprove) setDecision("approved"); }}>Approve rule</button><button className="article-flow__button article-flow__button--secondary" type="button" aria-pressed={decision === "rejected"} onClick={() => setDecision("rejected")}>Reject rule</button></div>}
    <div className="article-flow__table-wrap" tabIndex={0} role="region" aria-label="Rule fixture results"><table><caption>v1 accepts any nonempty capture. Candidate v2 requires {proposal === "complete-only" ? "completion only" : "completion and known coverage"}. Its checks run before approval and repeat after the version switch.</caption><thead><tr><th scope="col">Fixture</th><th scope="col">Expected</th><th scope="col">Baseline v1</th><th scope="col">Candidate v2</th></tr></thead><tbody>{candidateChecks.map(({ fixture, result }) => <tr key={fixture.name}><th scope="row">{fixture.name}</th><td>{fixture.expected ? "Accept" : "Hold"}</td><td>{applyRule(fixture, 1) ? "Accept" : "Hold"}</td><td>{phase >= 3 ? result ? "Accept" : "Hold" : "Not checked"}</td></tr>)}</tbody></table></div>
    <div className="article-flow__status" data-verdict={complete ? "PASS" : phase === 3 && !candidateChecksPass ? "FAIL" : deduplicated || attemptedStale || decision === "rejected" ? "INCONCLUSIVE" : "PENDING"} role="status" aria-live="polite" aria-atomic="true"><strong>{complete ? "Verified" : deduplicated ? "Duplicate linked" : decision === "rejected" ? "Rejected" : phase === 3 && !candidateChecksPass ? "Expectation checks failed" : phase === 3 && decision === null ? "Review required" : attemptedStale ? "Evidence held" : "In progress"}</strong><p>{message}</p></div>
    <div className="article-flow__actions"><button className="article-flow__button" type="button" disabled={nextDisabled} onClick={next}>Next step</button><button className="article-flow__button article-flow__button--secondary" type="button" onClick={reset}>Reset</button></div>
    <p className="article-flow__note">This example updates a versioned rule and its tests. It does not change model weights. The release switches versions locally. No service or model receives a request.</p>
  </section>;
}

interface WindowTask { start: number; end: number; depth: number; page: 1 | 2 }
interface WindowLog { task: WindowTask; result: string; kind: "split" | "read" | "failure" }
interface WindowRun {
  queue: WindowTask[];
  completed: { start: number; end: number }[];
  records: number[];
  failed: { task: WindowTask; reason: "request" | "depth" } | null;
  injected: boolean;
  log: WindowLog[];
}

const newWindowRun = (): WindowRun => ({ queue: [{ start: 0, end: 8, depth: 0, page: 1 }], completed: [], records: [], failed: null, injected: false, log: [] });
const windowLabel = (window: { start: number; end: number }) => `[${window.start}, ${window.end})`;

function requestNextWindow(run: WindowRun, threshold: number, injectFailure: boolean): WindowRun {
  if (run.failed || run.queue.length === 0) return run;
  const [task, ...pending] = run.queue;
  const span = task.end - task.start;
  if (span > threshold) {
    if (task.depth >= 2) return { ...run, failed: { task, reason: "depth" }, log: [...run.log, { task, kind: "failure", result: "Maximum split depth reached. Stop without advancing the checkpoint." }] };
    const middle = task.start + span / 2;
    const left: WindowTask = { start: task.start, end: middle, depth: task.depth + 1, page: 1 };
    const right: WindowTask = { start: middle, end: task.end, depth: task.depth + 1, page: 1 };
    return { ...run, queue: [left, right, ...pending], log: [...run.log, { task, kind: "split", result: `Known window limit. Split into ${windowLabel(left)} and ${windowLabel(right)}. Each child starts at page 1.` }] };
  }
  if (injectFailure && !run.injected && task.end === 8 && task.page === 1) {
    return { ...run, injected: true, failed: { task, reason: "request" }, log: [...run.log, { task, kind: "failure", result: "Injected request failure. Keep this child queued. Retry the failed request." }] };
  }
  const middle = task.start + Math.ceil(span / 2);
  const pageStart = task.page === 1 ? task.start : middle;
  const pageEnd = task.page === 1 ? middle : task.end;
  const records = Array.from({ length: pageEnd - pageStart }, (_, index) => pageStart + index);
  const completed = task.page === 2 ? [...run.completed, { start: task.start, end: task.end }] : run.completed;
  return {
    ...run,
    queue: task.page === 1 ? [{ ...task, page: 2 }, ...pending] : pending,
    completed,
    records: [...run.records, ...records],
    log: [...run.log, { task, kind: "read", result: task.page === 1 ? `${records.length} records buffered. Continue to this child's page 2. The parent checkpoint stays unchanged.` : `${records.length} records buffered. This child is complete. Commit the parent only after all its children finish.` }],
  };
}

function hasCoverage(start: number, end: number, completed: WindowRun["completed"]) {
  return Array.from({ length: end - start }, (_, index) => start + index).every((position) => completed.some((window) => position >= window.start && position < window.end));
}

function WindowDiagram({ run, threshold }: { run: WindowRun; threshold: number }) {
  const arrowId = useId();
  const nodes = [
    { start: 0, end: 8, x: 380, y: 22 },
    { start: 0, end: 4, x: 200, y: 101 },
    { start: 4, end: 8, x: 560, y: 101 },
    ...(threshold <= 2 ? [{ start: 0, end: 2, x: 110, y: 180 }, { start: 2, end: 4, x: 290, y: 180 }, { start: 4, end: 6, x: 470, y: 180 }, { start: 6, end: 8, x: 650, y: 180 }] : []),
  ];
  const stateOf = (node: { start: number; end: number }): StageState => hasCoverage(node.start, node.end, run.completed) ? "complete" : run.failed && run.failed.task.start >= node.start && run.failed.task.end <= node.end ? "blocked" : run.queue[0] && run.queue[0].start >= node.start && run.queue[0].end <= node.end ? "current" : "pending";

  return <>
    <div className="article-flow__diagram" tabIndex={0} role="img" aria-label={`Partition A request tree. ${nodes.map((node) => `${windowLabel(node)}: ${stateOf(node)}`).join(". ")}. Complete means read coverage, not a durable child checkpoint.`}>
      <svg viewBox={`0 0 760 ${threshold <= 2 ? 250 : 180}`} fill="none" aria-hidden="true" focusable="false">
        <ArrowMarker id={arrowId} />
        <path className="flow-edge" d="M380 66v17" />
        <path className="flow-edge" markerEnd={`url(#${arrowId})`} d="M380 83H200v18" />
        <path className="flow-edge" markerEnd={`url(#${arrowId})`} d="M380 83h180v18" />
        {threshold <= 2 && <>
          <path className="flow-edge" d="M200 145v17m360-17v17" />
          <path className="flow-edge" markerEnd={`url(#${arrowId})`} d="M200 162h-90v18" />
          <path className="flow-edge" markerEnd={`url(#${arrowId})`} d="M200 162h90v18" />
          <path className="flow-edge" markerEnd={`url(#${arrowId})`} d="M560 162h-90v18" />
          <path className="flow-edge" markerEnd={`url(#${arrowId})`} d="M560 162h90v18" />
        </>}
        {nodes.map((node) => <g className={`flow-node flow-node--${stateOf(node)}`} key={windowLabel(node)}><rect x={node.x - 62} y={node.y} width="124" height="44" rx="7" /><text className="flow-label" x={node.x} y={node.y + 27} textAnchor="middle">{windowLabel(node)}</text></g>)}
      </svg>
    </div>
    <p className="article-flow__caption">Half-open windows avoid overlapping boundaries. A completed child records read coverage. The durable checkpoint belongs to the parent.</p>
  </>;
}

function WindowLab() {
  const id = useId();
  const [threshold, setThreshold] = useState(4);
  const [injectFailure, setInjectFailure] = useState(true);
  const [run, setRun] = useState<WindowRun>(newWindowRun);
  const complete = run.queue.length === 0 && !run.failed && hasCoverage(0, 8, run.completed);
  const durableCursor = complete ? 8 : 0;
  const uniqueRecords = new Set(run.records).size;
  const nextTask = run.queue[0];
  const message = complete ? `All descendants of [0, 8) completed. Commit partition A at 8 with ${uniqueRecords} unique records. Partition B stays at 0.`
    : run.failed?.reason === "depth" ? `${windowLabel(run.failed.task)} still exceeds the ${threshold}-unit span at maximum depth 2. This split budget cannot reduce it further. A retry cannot resolve the limit. Durable A and B stay at 0. Reset or change the span budget to start a new run.`
    : run.failed ? `${windowLabel(run.failed.task)} page ${run.failed.task.page} failed. Durable A remains 0. Retry the failed child before the parent can complete.`
    : run.log.length === 0 ? "Start with partition A's root request [0, 8). Its span exceeds the chosen limit, so the first request will split it."
    : `${run.completed.length} child windows complete. ${uniqueRecords} records buffered. Durable A remains 0 until the whole parent interval completes.`;

  return <section className="article-flow" data-flow-kind="window-splitting" aria-labelledby={`${id}-title`}>
    <header className="article-flow__header"><p className="article-flow__eyebrow">Interactive example</p><h3 id={`${id}-title`}>Split the request. Keep the checkpoint.</h3><p>Follow synthetic requests for partition A. The example buffers child records. It commits the parent interval only after all child reads complete.</p></header>
    <div className="article-flow__controls"><label htmlFor={`${id}-threshold`}><span id={`${id}-threshold-label`}> Maximum request span </span><select aria-labelledby={`${id}-threshold-label`} id={`${id}-threshold`} value={threshold} onChange={(event) => { setThreshold(Number(event.target.value)); setRun(newWindowRun()); }}><option value={4}>4 units — one split level</option><option value={2}>2 units — two split levels</option><option value={1}>1 unit — depth limit reached</option></select></label><label className="article-flow__check"><input type="checkbox" checked={injectFailure} onChange={(event) => { setInjectFailure(event.target.checked); setRun(newWindowRun()); }} />Fail the rightmost child once</label></div>
    <WindowDiagram run={run} threshold={threshold} />
    <dl className="article-flow__facts"><div><dt>Durable A cursor</dt><dd data-flow-cursor="A">{durableCursor}</dd></div><div><dt>Durable B cursor</dt><dd data-flow-cursor="B">0</dd></div><div><dt>Buffered records</dt><dd>{complete ? 0 : uniqueRecords}</dd></div><div><dt>Committed records</dt><dd>{complete ? uniqueRecords : 0}</dd></div><div><dt>Complete child reads</dt><dd>{run.completed.length}</dd></div><div><dt>Next request</dt><dd>{nextTask ? <code>{windowLabel(nextTask)} · Page {nextTask.page}</code> : "None"}</dd></div></dl>
    <div className="article-flow__status" data-verdict={complete ? "PASS" : run.failed ? "INCONCLUSIVE" : "PENDING"} role="status" aria-live="polite" aria-atomic="true"><strong>{complete ? "Parent committed" : run.failed?.reason === "depth" ? "Split limit reached" : run.failed ? "Retry required" : "Checkpoint held"}</strong><p>{message}</p></div>
    <div className="article-flow__actions"><button className="article-flow__button" type="button" disabled={complete || Boolean(run.failed)} onClick={() => setRun((current) => requestNextWindow(current, threshold, injectFailure))}>Next step</button>{run.failed?.reason === "request" && <button className="article-flow__button" type="button" onClick={() => setRun((current) => requestNextWindow({ ...current, failed: null }, threshold, injectFailure))}>Retry failed request</button>}<button className="article-flow__button article-flow__button--secondary" type="button" onClick={() => setRun(newWindowRun())}>Reset</button></div>
    {run.log.length > 0 && <ol className="article-flow__log" aria-label="Partition A request trace">{run.log.map((entry, index) => <li key={index}><code>A {windowLabel(entry.task)} · Page {entry.task.page} · Depth {entry.task.depth}</code><span>{entry.result}</span></li>)}</ol>}
    <p className="article-flow__note">This example uses a synthetic checkpoint policy. Only a known window-limit response triggers a split. A retry keeps the same child. Maximum depth is 2. Each new child starts at page 1.</p>
  </section>;
}

export function ArticleFlow({ kind }: { kind: ArticleFlowKind }) {
  if (kind === "regression-verdict") return <RegressionLab />;
  if (kind === "feedback-lifecycle") return <FeedbackLab />;
  return <WindowLab />;
}
