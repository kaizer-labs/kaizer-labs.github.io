---
title: "Split the Request. Preserve the State."
publishedAt: "2026-11-26"
summary: "A synthetic request for partition A becomes smaller child requests. The design study follows coverage, pagination, failure recovery, and the checkpoint decision that keeps unfinished work visible."
readingTime: "8 min read"
featured: false
tags:
  - "Backend systems"
  - "Data integration"
  - "State management"
visual: "context"
order: 3
---

Partition A needs the interval `[0, 8)` in this synthetic design study. With a maximum request span of four units, the request must split into `[0, 4)` and `[4, 8)`.

Now let the left child complete and the right child fail. The completed work looks useful, but the parent interval remains unfinished. The design must decide what its checkpoint can safely claim.

A checkpoint records progress for recovery. A successful retry can still skip records, repeat a range, reuse an invalid pagination token, or move that checkpoint past unfinished work. I treat splitting as a cursor and recovery contract, because a smaller request must still represent the same work.

The code and interactive flow use synthetic examples. They illustrate a design, not a production architecture or measured results. Partition B remains a separate scope throughout the example.

## Constraints and invariants

A partition defines a distinct scope of work. A half-open interval includes its start and excludes its end. If the API supports these intervals, splitting `[start, end)` into `[start, midpoint)` and `[midpoint, end)` creates no overlap or gap.

That statement depends on the API’s actual filtering rules. Inclusive bounds, timestamp rounding, or filters with coarser precision require an explicit translation rule. Some interfaces need overlapping intervals and a consistent rule for removing duplicates. They do not support exact half-open boundaries.

The design has four constraints:

- Both children retain the parent partition, their union equals the parent interval, and neither child is empty.
- Each child carries its own interval and starts with fresh pagination state.
- Completion evidence must identify the partition, interval, and generation of the requested work.
- Shared resource limits apply across child requests and retries.

The first constraint defines the split invariants, properties that must remain true. They deserve tests independently of request execution.

## Model the window before the request

For the illustrative model, use integer ticks at the provider’s supported precision:

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class Window:
    partition: str
    start: int
    end: int

    def __post_init__(self):
        if self.start >= self.end:
            raise ValueError("Window must be non-empty and ordered")

    def split(self) -> tuple["Window", "Window"]:
        middle = self.start + (self.end - self.start) // 2
        if not self.start < middle < self.end:
            raise ValueError("No representable interior boundary")
        return (
            Window(self.partition, self.start, middle),
            Window(self.partition, middle, self.end),
        )
```

The constructor rejects empty or reversed windows. The illustrative adapter should validate integer tick types at its boundary. A timestamp adapter also needs to handle timezone and precision deliberately before producing these ticks. Converting through floating-point values or silently truncating a boundary can change coverage.

## Give each child its complete request context

The cursor tracks progress and owns the boundary rules. The retriever sends requests and reads responses. It can recognize a supported condition that requires a smaller window and ask the cursor to split it.

Each child must carry its own interval through request construction, pagination, record processing, and completion tracking. Pagination means reading successive pages of results. Sending child filters while recording progress against a mutable parent slice creates a quiet state bug.

Each child needs fresh pagination state. A pagination token identifies progress through a request’s pages. A token from the parent’s filters may be invalid under the child’s filters, even when the API accepts it. The token belongs to that request context until the API contract says otherwise.

Partitions need the same care. Sharing one mutable “current partition” across concurrent reads can attach a successful response to the wrong checkpoint. Explicit slice context should retain the partition and interval without mutation. This makes the relationship between a response and its checkpoint easier to review.

## Stage a complete read before exposing its output

A request can fail after returning useful pages. The implementation may then retry the full interval through child windows. If it already emitted the earlier pages, it may emit those records again.

One conservative design stages each attempt, holding its output separately until completion. It only exposes a completed leaf, a window that needs no further splitting:

```python
def read_window(window, depth, budget):
    try:
        with staging_artifact(window) as stage:
            read_all_pages(
                window=window,
                initial_page_token=None,
                budget=budget,
                output=stage,
            )
            completed = stage.seal()
    except WindowTooLarge:
        require_split_allowed(window, depth, budget)
        for child in window.split():
            yield from read_window(child, depth + 1, budget)
    else:
        yield completed
```

This sketch assumes the context manager discards an unsealed attempt on failure. It also assumes that sealing records completed coverage. Each child shares the same budget object. Copying a fresh budget into each recursive call would undermine the limit.

The yielded artifact establishes a completed leaf read. It does not by itself establish that the parent finished. The checkpoint decision still needs the parent’s coverage evidence.

## Put a barrier in front of the checkpoint

Completed child reads provide evidence of progress. They do not automatically permit the parent checkpoint to advance.

I choose a conservative whole-parent barrier for this example. Commit the parent interval only after all required leaves complete and their validated coverage reconstructs that parent.

The alternative changes the recovery state that the design must represent:

| Decision | When progress can advance | Recovery requirement |
| --- | --- | --- |
| Whole-parent barrier | All required leaves complete and validated coverage reconstructs the parent. | A restart may repeat the parent. Replay or duplicate removal must remain safe. |
| Contiguous-prefix checkpoint | A completed, uninterrupted range from the parent’s start could advance progress. | Remaining work needs durable representation and the same output/checkpoint guarantees. |

I prefer the parent barrier here because coverage and recovery center on one parent decision. Incremental progress adds durable remaining-work state. I would not add that complexity without a clear need.

The barrier must check more than “every scheduled task returned.” All leaves must belong to the correct partition and generation of the requested work. Their intervals must meet without gaps or overlaps and exactly cover the requested parent. Completion artifacts, which record finished work, must correspond to those intervals.

## Walk through the split and the failed child

The interactive example computes synthetic windows locally. With a four-unit request limit, each child starts at page 1 and completes through two page reads. A two-unit limit requires another split level. The one-unit option reaches the example’s maximum depth of two before it can satisfy the requested span.

Enable the failure option to stop the rightmost child once. The parent checkpoint should remain unchanged, even after another child succeeds. Retry the failed request to continue that child.

```interactive
window-splitting
```

Under this illustrative policy, A stays at 0 until every required child finishes. The successful run commits A at 8. B stays at 0. These outcomes describe the local example, not guarantees about production data.

## Recover without confusing retries and splits

Only a recognized error about data volume should trigger splitting. Rate limits usually call for delays before retries or fewer concurrent requests. Authentication failures and invalid queries should not trigger a tree of smaller requests that also fail.

If the right child fails after the left succeeds, a restart may repeat the parent. Replay means repeating work during recovery. That remains safe only under appropriate rules for replay or duplicate removal. Correct window splitting does not guarantee exactly-once delivery, where each record reaches the destination once.

Publishing output and advancing its durable checkpoint also need a consistent relationship. A transaction can provide one solution when the relevant state shares a transactional store. Other destinations need their own recovery protocol. An in-memory barrier alone cannot make separate writes atomic, so that all succeed together or none takes effect.

## Validate the state transitions

I would test the interval model before involving a network. Then I would exercise the workflow with a fake API that returns predictable results. The matrix specifies expected behavior, not measured test results:

| Case | What the check must establish |
| --- | --- |
| Generated valid windows | Children retain the partition, have strict interior boundaries, and exactly cover the parent. |
| No representable midpoint | The split rejects the window instead of allowing rounding to cause infinite recursion. |
| Parent and child both need splitting | The workflow preserves coverage through another split level. |
| New child request | Pagination starts fresh instead of reusing the parent token. |
| Failure after partial pagination | An unsealed attempt does not become a completed leaf. |
| Left child complete, right child failed | Incomplete coverage cannot advance the parent checkpoint. |
| Page requests and retries | Each actual request consumes the shared budget. |
| Concurrent partition completions | One partition cannot move another partition’s cursor. |
| Resource limit exhausted | The operation preserves recoverable state and does not report a successful full read. |

Where a trustworthy control exists, compare the complete resulting record multiset under declared normalization rules. A multiset retains the count of each duplicate. Normalization defines which differences the comparison ignores. A changing live source can make that comparison inconclusive. A stable fixture or snapshot makes the input assumptions easier to establish.

## Account for the costs and limits

Staging needs storage, input and output operations, cleanup, and time before records become available. Another design can emit records earlier if its recovery contract tolerates replay and the destination handles duplicates correctly. I want the design to state those rules explicitly.

Recursion needs explicit limits: minimum representable interval, maximum depth, request budget, retry policy, and storage budget. Charge the shared request budget for each actual page request, including retries. Charging once per logical window does not represent that work.

Depth alone cannot control the total cost. A branching split can create many leaves, each with its own pages. Parallel execution can also exceed an API budget while every individual worker stays within its local limits.

The coordinator therefore needs to govern total concurrency and requests. When the operation exhausts a limit, it should fail with a useful explanation and preserve recoverable state. It should not label the covered portion as a successful full read.

## Preserve the meaning of completion

Changing how the system reads an interval must not quietly change what it considers complete. That is the contract I want the split, the retry, and the checkpoint to preserve together.
