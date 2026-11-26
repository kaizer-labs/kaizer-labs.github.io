---
title: "Closing the Loop on AI-Assisted Engineering"
publishedAt: "2026-11-26"
summary: "A synthetic stopped read shows why feedback needs evidence and explicit gates. I examine candidate checks, human approval, durable guidance, and recovery."
readingTime: "9 min read"
featured: false
tags:
  - "AI-assisted engineering"
  - "Feedback loops"
  - "Engineering judgment"
visual: "process"
order: 2
---

Consider a synthetic rule, v1, that accepts a nonempty capture as a completed read. One fixture supplies one record from a read that stopped early. Rule v1 accepts it.

The immediate change could add a completion check. That still leaves a broader question: how should the workflow test, approve, and preserve the rule that future tasks will use?

I use this example to examine the engineering work between observing a gap and changing how the next task proceeds. Without evidence, ownership, and checks, a feedback loop can accumulate bad instructions efficiently.

The rule, fixtures, and transitions below are synthetic. They do not describe a production incident, a specific implementation, or measured adoption.

## Define what the feedback must preserve

I would use these constraints before designing the workflow:

- Retain the task, input scope, repository revision, and instruction version.
- Check current evidence before changing durable guidance.
- Test a specific candidate before human approval.
- Keep tests, approval, and publication tied to that candidate and base revision.
- Recognize repeated publication before creating another durable change.
- Preserve enough transition evidence to recover after a crash.
- Require a new review when later observations reveal drift.

The aim is a reviewable decision that survives the session. A new instruction alone does not establish that the next task will behave correctly.

## Trace the observation to its evidence

“The agent got confused” can start an investigation. It does not yet identify a reproducible claim.

Here, provenance means the source, versions, and input scope behind an observation. I would ask:

- What task did the agent attempt?
- Which repository revision and instruction version did the task use?
- What input scope did the task exercise?
- Which tool produced the result?
- Which evidence exposed the gap?

An illustrative record might separate those concerns:

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class EvidenceRef:
    artifact_digest: str
    repository_revision: str
    tool_version: str
    input_scope: str
    observed_at: str

@dataclass(frozen=True)
class Gap:
    boundary: str
    violated_invariant: str
    failure_class: str
    guidance_version: str
    evidence: tuple[EvidenceRef, ...]
```

An artifact is a stored result that supports a review. The workflow can store its location separately under appropriate access controls.

A digest is a value calculated from an artifact’s contents. It helps identify the artifact a reviewer examined. It does not establish that the observation is accurate.

This structure helps a reviewer distinguish four possibilities:

- A current problem.
- An old report.
- An environment limitation.
- A failure the system already handles.

Provenance also lets a reviewer correct a report later without changing the history of the original observation.

### Separate the problem from its evidence

Deduplication identifies reports that describe the same underlying problem. Different reports can describe that problem with different words. Identical error messages can also describe unrelated failures at different boundaries.

I would build a technical key from four fields:

- The affected boundary.
- The violated invariant, or condition the system must preserve.
- The failure class.
- The relevant contract version.

These fields need controlled meanings. Hashing an imprecise description does not create a stable identifier.

Evidence identity answers a different question: which artifact supports the report? The same artifact should not create repeated reports. A new artifact may add evidence for an existing gap.

Combining reports only because they use the same wording can hide a meaningful change in scope.

An agent can propose a match and summarize the evidence. Ambiguous matches should remain open for review.

A confidence label can help prioritize an investigation. It does not establish a calibrated probability that two reports are equivalent.

Rejection matters too. A report can be stale, out of scope, unsupported, or already covered. I would preserve that decision and its rationale instead of forcing every observation into a new rule.

## Give each transition an evidence contract

I find an explicit lifecycle easier to reason about than one “done” field:

```text
captured -> verified -> proposed -> tested -> approved -> published -> observed

Unsupported work can be rejected.
Changed assumptions can supersede a proposal.
Observed drift starts a new reviewable gap.
```

The base revision identifies the repository version on which the proposal depends. Each state needs evidence, and a changed assumption can invalidate an earlier decision.

| Gate | Evidence required | What invalidates or blocks it |
| --- | --- | --- |
| Verified | A reviewer checked the gap against current evidence. | The report is stale, unsupported, or unrelated. |
| Tested | A specific candidate, its base revision, and its check results. | The candidate or base changes. Required checks remain incomplete. |
| Approved | A human decision tied to the candidate and test report. | The proposal, base revision, or test report changes. |
| Published | Future work can access the intended durable change. | A revision change before publication breaks the checked relationship. |
| Observed | A later check with a declared scope and version references. | Drift creates a new review item. It grants no publication authority. |

These states describe different facts. An existing patch does not necessarily belong to a merged revision. A merged instruction does not necessarily appear in released tooling. An available change does not prove that anyone observed its intended behavior.

### Bind the candidate to its checks

In this example, candidate v2 requires a capture, a completed read, and known coverage. The weaker completion-only proposal still accepts the fixture with unknown coverage.

Both proposals reject the stopped read. Only the stronger proposal meets all four fixture expectations.

A useful human review identifies the candidate the reviewer approved.

For example, a publication gate could require an approval tied to three inputs:

- The proposal digest.
- The base revision.
- The test report.

```python
def require_publishable(change, proof, approval):
    if proof.proposal_digest != change.digest:
        raise ValueError("Tests cover a different proposal")
    if proof.base_revision != change.base_revision:
        raise ValueError("Tests cover a different base revision")
    if approval.proposal_digest != change.digest:
        raise ValueError("Approval covers a different proposal")
    if approval.base_revision != change.base_revision:
        raise ValueError("The approved base revision changed")
    if approval.test_report_digest != proof.digest:
        raise ValueError("Approval refers to different evidence")
    if not proof.required_checks_passed:
        raise ValueError("Required checks are incomplete")
```

The function illustrates validation logic. It does not implement a complete authorization system. A real gate also needs:

- A trustworthy source of approvals.
- A reviewer with appropriate authority.
- Integrity for the referenced artifacts.

## Version the rule and its regression checks

Consider a generic setup omission. The immediate fix makes a test exercise the intended behavior. The reusable improvement may be a preflight check and a clearer acceptance criterion.

I would review those changes as one proposal. A regression fixture should expose the original failure. The new instruction should describe a specific action at the relevant boundary.

Changing the test only to match the generated implementation would weaken the evidence.

The durable learning consists of repository guidance, executable checks, and recorded decisions. Updating those artifacts does not train model weights.

## Exercise the candidate before publication

This interactive flow uses synthetic state and local calculations. Change a proposal after its tests finish or a reviewer approves it. The question is whether old evidence still authorizes the next transition.

```interactive
feedback-lifecycle
```

If the proposal changes, previous tests may no longer apply. An earlier approval may no longer cover the relevant assumptions if the base revision changes.

A workflow should show that invalidation instead of retaining a reassuring badge. In this local example, changing the proposal resets the checks, approval, and active rule to v1.

## Recover without repeating a durable change

The gate should check the actual current candidate. Publishing a different revision after the check would create a time-of-check/time-of-use gap. In that gap, the published revision differs from the revision the gate checked.

The publish operation needs a revision condition or another mechanism that preserves the checked relationship.

Retries also need a contract. A repeated transition should recognize a candidate that the workflow already published. It should not create another change.

An operation key can identify the intended publication from the proposal and target version. A conditional write changes state only if its required condition still holds. It prevents competing workers from advancing the same state independently.

If a worker crashes after publication but before recording completion, the next attempt should reconcile the durable result before acting. Here, reconcile means use the durable result to determine what already happened before repeating the operation. An in-memory status board cannot establish that relationship by itself.

The transition record should retain four details so recovery can explain what happened:

- The candidate.
- The evidence.
- The decision.
- The resulting version.

## Check the gates with explicit scenarios

The following matrix states expected behavior in the synthetic flow. It does not report production results.

| Synthetic input | Expected behavior | Boundary checked |
| --- | --- | --- |
| Current evidence and complete candidate | Checks pass 4/4. Wait for human approval. | Tests do not grant approval. |
| Stale capture | Stop at the evidence gate. | Old evidence cannot authorize this run. |
| Known duplicate | Link the evidence to the existing observation. Create no second proposal. | Technical deduplication. |
| Completion-only candidate | Three of four checks pass. Block approval. | Unknown coverage still requires a hold. |
| Approved proposal changes before publication | Reset checks and approval. Retain v1. | Approval identifies a specific candidate. |
| Approved complete candidate | Activate v2 after 4/4 checks. Repeat checks after the version change. | Publication and observation remain distinct. |

The local flow does not exercise competing workers, durable writes, or crash recovery. I would test those conditions separately against durable state:

- Repeat publication of the same candidate.
- Change the revision between its check and publication.
- Interrupt the transition after publication and before it records completion.
- Resume from the durable result without creating another change.

These checks would need the same candidate and evidence references as the publication gate.

## Bound guidance and its authority

Placement matters. A setup rule belongs near setup. An interface constraint belongs with its interface. General instructions should remain short enough to use.

If each incident adds another universal paragraph, context becomes harder to apply and easier to contradict.

Dependencies, tooling, fixtures, and contracts change after publication. A later check can test whether an accepted rule’s assumptions still hold.

That check needs a declared scope and references to versions. It might show that an interface no longer matches its documented contract. It might show that an expected verification step no longer runs.

The check should produce evidence and a new item for review. It should not silently rewrite the rule that failed.

An observation does not authorize another publication. A new proposal needs the same checks and approval discipline as the first proposal.

A team also needs a way to retire guidance. A rule can become obsolete, duplicate another check, or impose unnecessary work after the system changes.

Version history lets the team remove stale instructions while preserving the reason those instructions once existed.

## Preserve a decision the next engineer can inspect

More reports do not necessarily mean better observation. More instructions do not necessarily mean better context. Several agents may agree because they share a prompt, tool, or mistaken assumption.

I want the loop to leave a clearer contract, stronger evidence, and an identifiable owner. The next engineer should understand which versions a rule applies to. They should understand why the rule exists and how to check it.

That is the improvement worth preserving after the conversation ends.
