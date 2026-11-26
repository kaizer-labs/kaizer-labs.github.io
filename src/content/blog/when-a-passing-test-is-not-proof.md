---
title: "A Passing Test Is Not Always Proof"
publishedAt: "2026-11-26"
summary: "A synthetic connector test hides an extra duplicate behind a passing comparison. I examine the evidence contract, equality model, resource costs, and failure checks needed to expose it."
readingTime: "9 min read"
featured: true
tags:
  - "AI-assisted engineering"
  - "Evaluation"
  - "Testing"
visual: "review"
order: 1
---

Consider a synthetic regression test for a connector change. Both reads finish. The candidate emits an extra duplicate, but a comparison using sets reports equality.

The command succeeds while its comparison misses the regression. Process completion answers whether the command finished. The engineer needs to know whether the records satisfy the intended contract.

Other cases create the same uncertainty. A comparison may have stopped early. A fixture may have returned nothing. The command may have read the wrong partition successfully. An agent can explain those outputs clearly without establishing the behavior that matters.

I want the result to answer one question: what evidence supports this change within the declared scope?

This design study uses synthetic records, illustrative code, and a local interactive example. It does not describe a production implementation or measured results.

## Define the claim before the verdict

Consider a connector change intended to recover a failing time window. A normal process exit establishes that the command completed. It does not establish that the candidate read the expected records, preserved duplicates, or covered the intended interval.

I would test this explicit claim:

> The candidate and reference read the same partition, bounded interval, and comparable input. They produce equivalent records under a declared normalization policy.

### Constraints the verifier must preserve

The claim gives the design five constraints:

- The input scope and implementation versions must identify the work.
- Both reads must use compatible input and normalization contracts.
- Completion evidence must establish that both reads finished.
- Separate coverage evidence must establish that they exercised the intended path.
- An incomplete comparison must never retain a default success value.

Normalization defines which differences the comparison ignores. Its version belongs in the evidence scope so a comparison cannot silently mix incompatible rules.

Two live API reads may disagree because the source data changes between reads. That difference may have no relation to the patch.

A frozen fixture or a snapshot supported by the source can strengthen the comparison. If neither is available, the report should state the limitation. It should not describe the comparison as a controlled experiment.

## Design the verdict around evidence

I would represent the evidence explicitly before comparing records. An evidence manifest records the scope and status of each read. This illustrative manifest could define the following fields:

```python
from dataclasses import dataclass
from enum import Enum

class Verdict(Enum):
    PASS = "pass"
    FAIL = "fail"
    INCONCLUSIVE = "inconclusive"
    NOT_EXERCISED = "not_exercised"

@dataclass(frozen=True)
class Scope:
    partition: str
    start: str
    end: str
    normalization_version: str

@dataclass(frozen=True)
class Evidence:
    scope: Scope
    complete: bool
    exercised: bool
    artifact_digest: str | None

def verdict(
    reference: Evidence,
    candidate: Evidence,
    records_equal: bool | None,
) -> Verdict:
    if reference.scope != candidate.scope:
        return Verdict.INCONCLUSIVE
    if not reference.complete or not candidate.complete:
        return Verdict.INCONCLUSIVE
    if not reference.artifact_digest or not candidate.artifact_digest:
        return Verdict.INCONCLUSIVE
    if not reference.exercised or not candidate.exercised:
        return Verdict.NOT_EXERCISED
    if records_equal is None:
        return Verdict.INCONCLUSIVE
    return Verdict.PASS if records_equal else Verdict.FAIL
```

The system must enforce the manifest's contract. It cannot trust booleans just because a producer reports them. A producer's `complete=True` flag proves little without the reader's actual termination conditions.

Completion alone does not establish coverage. The run must also exercise the intended path under the declared input contract.

An artifact digest identifies the evidence under review. It does not prove that the evidence is sufficient or that the implementation is correct. The verifier must compute `records_equal` from a completed comparison. A default value after an exception cannot establish equality.

The contract distinguishes four outcomes:

- `PASS`: both reads completed, exercised the intended path, and produced equivalent records under compatible input and comparison contracts.
- `FAIL`: comparable evidence exposes a record difference.
- `INCONCLUSIVE`: evidence is missing, interrupted, or unsuitable for the comparison.
- `NOT_EXERCISED`: the run completed but did not exercise the intended path.

The last two outcomes block a pass for different reasons. An execution error can still fail an explicit acceptance check. That classification does not prove a record mismatch.

The evidence should identify the revision that produced each artifact. Candidate and reference revisions may differ intentionally. Their input and comparison contracts still need to agree. Python annotations alone do not enforce this contract. Runtime parsing must check the fields.

I would save the verdict, reason, and coverage description together in a machine-readable report. A downstream agent should not need to infer success from prose. If report creation raises an exception, the report must not retain a default success value.

### Implement equality without losing duplicates

A set can seem suitable when output order does not matter. But a set removes duplicate counts. A reference with two copies and a candidate with one copy compare equal after conversion to sets.

For comparisons that ignore order but preserve duplicates, I would start with a multiset. A multiset records each value and its count:

```python
from collections import Counter

reference_counts = Counter(canonical_bytes(r) for r in reference_records)
candidate_counts = Counter(canonical_bytes(r) for r in candidate_records)
equal = reference_counts == candidate_counts
```

This comparison preserves counts and ignores order. It is unsuitable when the contract requires a specific sequence.

`canonical_bytes` needs its own specification. It converts normalized records to bytes for comparison. Sorting JSON object keys can remove irrelevant differences in field order. Rounding numbers, removing fields, or converting types can remove meaningful differences.

The policy must address timestamp precision, missing fields, explicit nulls, and numeric representations.

For normalized JSON-compatible records, deterministic serialization might use sorted keys and fixed separators. It might also reject non-finite numbers. Those choices still need a defined normalization policy. The serializer should not silently change the behavior that the verifier expects.

The comparison policy must stay separate from accidental serializer behavior. Otherwise, the verifier can hide the difference it needs to detect.

## Explore the verdict boundary

The interactive flow connects the evidence gates to the record comparison. The example compares account ID and version. It ignores trace IDs and record order.

The synthetic baseline contains two copies of `acct_17 / v2`. The extra-duplicate scenario adds a third copy in the candidate. Both sets contain the same values, but the multisets differ.

Choose that scenario. Use Next step to inspect the gates. Then compare the result with a missing artifact or an interrupted read.

```interactive
regression-verdict
```

The example computes outcomes locally and has no connection to production systems. A later gate cannot replace evidence that an earlier gate lacks.

An empty result needs the same checks. An independently justified contract can establish the expected empty result. A completed read must also support that result before the case counts as exercised.

`exercised=True` does not require a positive record count. An empty result alone cannot distinguish an empty source from a path that the run never exercised.

## Choose the resource and equality tradeoffs

The multiset solves the duplicate problem, but its representation affects memory, storage, and the strength of the comparison.

| Approach | Information retained | Cost or limitation |
|---|---|---|
| In-memory `Counter` | Each distinct canonical record and its count. | Memory grows with the number and size of distinct records. |
| External sort | Canonical records in sorted groups on disk. | Bounded sorting buffers still require disk space, I/O, and temporary-file management. |
| Counts on disk | Canonical record keys and their counts on disk. | Caches, transaction sizes, record sizes, and storage limits still affect resource use. |
| Record digests | Hash values representing canonical records. | Digest equality depends on collision assumptions unless matching groups receive an exact byte comparison. |

These options address different costs. Replacing records with digests also changes the equality assumptions.

### Streaming input does not guarantee bounded memory

The `Counter` example retains each distinct canonical record and its count. Its memory use grows with their number and size. A generator changes how input arrives, but does not reduce the memory that the counter retains.

The relevant question is what the comparison retains while the stream advances.

For larger inputs, an external sort is one option:

1. Write canonical records into bounded buffers.
2. Sort each buffer.
3. Write each sorted group to disk.
4. Merge the groups while comparing values and duplicate counts.

This design trades memory pressure for disk space, I/O, temporary files, and additional failure cases.

A count store on disk is another option. It moves much of the retained state outside application memory. Caching, transaction size, record size, and storage limits still affect resource use. I would state those limits instead of describing the entire workflow as constant-memory.

A shared read or storage budget must affect the verdict. A limit can leave useful partial evidence. That evidence cannot establish equivalence for the full requested scope. The result must identify the portion without evidence and remain inconclusive.

### Fingerprints introduce another assumption

Replacing canonical records with digests can reduce retained data. A digest is a hash value computed from the record bytes. This replacement also changes the strength of the equality claim.

Different records can share a hash. A strong cryptographic digest makes accidental collisions extremely unlikely under suitable assumptions. It does not make collisions impossible. A non-cryptographic hash has different risks, especially when an adversary can influence the input.

If the contract requires exact equality, retain a way to compare canonical bytes within matching digest groups. If the contract accepts digest equality as probabilistic evidence, state that assumption. Both approaches still depend on correct normalization. A normalization bug can make distinct records identical before hashing.

I would distinguish digests that detect artifact corruption from digests that represent records. They answer different questions.

## Validate failures before accepting a pass

I would check the verifier with explicit evidence failures as well as matching records. The following matrix defines expected behavior under the declared contract.

| Scenario | Required result | Reason |
|---|---|---|
| Matching complete reads with exercised coverage | `PASS` | Comparable evidence establishes equivalent records within scope. |
| Candidate adds a duplicate | `FAIL` | The record counts differ even when sets match. |
| Artifact missing or read interrupted | `INCONCLUSIVE` | The evidence cannot support a complete comparison. |
| Independently justified empty case, complete reads | `PASS` | Zero records can still satisfy an exercised contract. |
| Completed run without intended-path coverage | `NOT_EXERCISED` | Completion alone does not establish coverage. |
| Incompatible normalization versions | `INCONCLUSIVE` | The scopes disagree about comparison rules. |
| Read or storage budget exhausted before completion | `INCONCLUSIVE` | Partial evidence cannot establish equivalence for the full scope. |

The local flow demonstrates the record and evidence cases. It does not exercise external sorting, disk failures, source snapshots, or real reader termination conditions. Those mechanisms need separate tests before a real verifier can rely on them.

### Make the result inspectable

A useful report records:

- The declared scope and evidence versions.
- The completion conditions and comparison policy.
- The observed differences and resource limits.
- The unresolved assumptions.

The verdict should identify the artifacts that support it.

The design also needs explicit retention and access rules. Review does not require indefinite storage of every raw record.

A verifier that accepts incomplete evidence can overstate certainty across the entire test workflow.

## Keep the conclusion inside the evidence

In the opening example, preserving duplicate counts exposes a difference that a set comparison hides. That result depends on comparable inputs, declared normalization, completed reads, and exercised coverage.

It does not establish correctness outside that scope. A changing live source can still make the comparison inconclusive. A normalization bug can still hide a meaningful difference. A resource limit can still interrupt the work.

The agent can collect evidence and explain it. The engineer still needs to understand the claim under review. I want a result I can inspect: these checks established this behavior within this scope.
