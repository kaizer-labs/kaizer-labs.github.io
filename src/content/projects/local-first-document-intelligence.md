---
title: "Local-first document intelligence"
subtitle: "Private retrieval built around evidence, typed facts, and local model boundaries"
summary: "Built a local-first document intelligence system for ingesting records, retrieving source-backed answers, and keeping sensitive data under local control."
problem: "Sensitive document workflows need useful retrieval without forcing every record through a cloud-first AI path."
role: "Independent builder for a local-first AI retrieval workflow"
scope: "Document ingestion, chunking, embeddings, retrieval quality, local model integration, typed fact extraction, and citation-backed answer design"
year: "Recent work"
status: "Exploration"
featured: false
order: 7
tech:
  - "FastAPI"
  - "DuckDB"
  - "Ollama"
  - "Vector retrieval"
  - "Docker"
  - "Local embeddings"
toolsTitle: "Built around local-first retrieval boundaries"
tools:
  - "Browser-driven folder and document ingestion"
  - "DuckDB-backed local persistence and indexing"
  - "Retrieval, fact extraction, and answer validation services"
  - "Source-backed evidence inspection for answer trust"
special:
  - "Kept indexed files and structured data local instead of pushing trust-sensitive records to a hosted AI workflow."
  - "Separated retrieval, fact extraction, and answer composition so each layer could stay inspectable."
  - "Treated citations and deterministic calculations as trust features, not UI polish."
metrics:
  - "Local-first AI"
  - "Citation-backed answers"
  - "DuckDB + Ollama"
audience:
  - "Private AI workflows"
  - "Document intelligence"
  - "Retrieval systems"
architectureTitle: "Local-first document intelligence pipeline"
architectureSummary: "The system keeps document acquisition, local persistence, retrieval, fact extraction, and answer generation separate so sensitive records stay private, inspectable, and evidence-backed."
architectureLayers:
  - name: "Acquisition and persistence layer"
    description: "Documents are selected in the browser, uploaded in bounded batches, and persisted locally through a FastAPI backend backed by DuckDB."
    bullets:
      - "Browser-side folder and file selection stays explicit"
      - "Indexed files and local data remain under local storage boundaries"
      - "DuckDB keeps the first version lightweight without adding a separate database service"
  - name: "Retrieval and fact layer"
    description: "Text extraction, chunking, embeddings, retrieval, and typed fact extraction are separated into services so evidence quality can be improved without rewriting the entire stack."
    bullets:
      - "Relevant chunks and typed facts are retrieved before answer composition"
      - "Fact extraction is treated as a distinct capability from answer generation"
      - "Ranking and evidence building narrow the answer path to trusted source material"
  - name: "Answer and trust layer"
    description: "Final responses are generated from local evidence with validation steps that protect against citation mismatch and unsupported numeric claims."
    bullets:
      - "Answer generation stays grounded in retrieved evidence"
      - "Validation checks make unsupported responses easier to catch"
      - "Deterministic calculation can be used when facts are structured enough to support it"
decisions:
  - title: "Keep the first version local-first and single-user"
    detail: "The product was intentionally scoped around local trust and inspectability instead of rushing into a multi-user cloud architecture before the retrieval model was solid."
  - title: "Treat evidence quality as the core product"
    detail: "The goal was not chat polish. It was whether the system could show where an answer came from and make the answer path understandable enough to trust."
  - title: "Separate retrieval from deterministic reasoning"
    detail: "When a question can be answered through typed facts and calculation, the system should prefer explicit logic over a purely generative response."
---

## What I built

I built a local-first document intelligence system for ingesting records, retrieving grounded answers, and keeping sensitive material under explicit local control. The workflow was designed around retrieval quality, evidence, and privacy from the start.

## How I approached it

The design treated document intelligence as a pipeline:

- acquire files explicitly through browser-driven uploads
- store structured state locally through FastAPI and DuckDB
- extract text, chunk it, embed it, and retrieve relevant evidence
- separate fact extraction from final answer generation
- validate the final response so unsupported claims are easier to catch

That structure keeps the system inspectable. Each layer can be improved without turning the whole product into an opaque prompt wrapper.

## Tradeoffs and key decisions

The main tradeoff was convenience versus trust. A cloud-first path would have been faster to demo, but it would have weakened the privacy and inspectability goals that made the project worthwhile.

So the design biased toward:

- local data storage instead of hosted record pipelines
- explicit evidence and citations instead of ungrounded answers
- typed facts and deterministic reasoning where the source material supports it

## Results and impact

The system makes the answer path inspectable: ingestion is explicit, retrieval is source-backed, structured facts can support deterministic calculations, and unsupported answers have to surface evidence gaps instead of pretending confidence.
