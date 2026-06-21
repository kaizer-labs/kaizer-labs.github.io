---
title: "Personal Records Intelligence"
subtitle: "Local-first RAG built around source-backed answers and deterministic facts"
summary: "Built a personal local-first document intelligence system for ingesting records, retrieving source-backed answers, and keeping sensitive data under local control."
problem: "Personal records need useful retrieval and question answering without pushing sensitive documents through a cloud-first AI workflow or hiding where answers came from."
role: "Independent builder for an applied RAG and local-first backend project"
scope: "Document ingestion, chunking, embeddings, vector retrieval, fact normalization, LangGraph orchestration, evidence checks, incomplete-information handling, and local model boundaries"
year: "Personal project"
status: "Applied RAG"
featured: false
order: 7
tech:
  - "Python"
  - "FastAPI"
  - "DuckDB"
  - "LangGraph"
  - "LangChain"
  - "Ollama"
toolsTitle: "Built around local-first retrieval boundaries"
tools:
  - "FastAPI backend for document ingestion and retrieval workflows"
  - "DuckDB-backed local persistence"
  - "LangGraph and LangChain orchestration"
  - "Evidence checks, citations, and fallback behavior"
special:
  - "Kept sensitive records local instead of defaulting to hosted AI."
  - "Separated ingestion, retrieval, fact normalization, and answer orchestration."
  - "Used citations, evidence gaps, and deterministic calculations as trust features."
metrics:
  - "Local-first RAG"
  - "Source-backed answers"
  - "Deterministic facts"
audience:
  - "Applied AI"
  - "Document intelligence"
  - "Backend systems"
architectureTitle: "Local-first RAG pipeline"
architectureSummary: "The system keeps document acquisition, local persistence, retrieval, fact extraction, and answer orchestration separate so sensitive records stay inspectable and answers stay tied to evidence."
architectureLayers:
  - name: "Ingestion and persistence"
    description: "Documents are selected, ingested, parsed, and persisted under local control."
    bullets:
      - "FastAPI handles backend ingestion and workflow APIs"
      - "DuckDB keeps local structured state lightweight"
      - "Document handling stays explicit instead of ambient or cloud-first"
  - name: "Retrieval and fact layer"
    description: "Text extraction, chunking, embeddings, retrieval, and fact normalization are separate pipeline steps."
    bullets:
      - "Relevant chunks are retrieved before answer generation"
      - "Fact normalization supports deterministic calculations where possible"
      - "Evidence quality can be improved without rewriting the whole system"
  - name: "Answer orchestration and trust"
    description: "LangGraph/LangChain workflows compose answers with traceability and fallback behavior."
    bullets:
      - "Answers include source-backed evidence"
      - "Incomplete-information warnings avoid fake confidence"
      - "Fallback behavior handles insufficient retrieval context"
decisions:
  - title: "Keep the first version local-first"
    detail: "The point of the project was trust and inspectability, so local storage and local model boundaries mattered more than a faster cloud demo."
  - title: "Separate retrieval from answer composition"
    detail: "A RAG system is easier to debug when ingestion, chunking, retrieval, fact normalization, and answer orchestration can be inspected independently."
  - title: "Prefer deterministic logic where the facts support it"
    detail: "When structured facts can answer a question, deterministic calculation is more trustworthy than asking a model to infer a number from text."
---
## What I built

I built Personal Records Intelligence as a local-first document intelligence system for ingesting personal records and answering questions with retrieval-backed responses, source citations, deterministic calculations, and explicit fallback behavior.

This is a personal project, but it is still backend/platform work: ingestion APIs, local persistence, retrieval, orchestration, evidence validation, and trust boundaries.

## How I approached it

I designed the system as a pipeline:

- ingest records through a FastAPI backend
- persist local state in DuckDB
- extract text, chunk documents, and build retrieval context
- normalize typed facts where deterministic answers are possible
- orchestrate retrieval and answer generation through LangGraph and LangChain
- surface citations, evidence checks, incomplete-information warnings, and fallback behavior

The emphasis is not chat polish. The emphasis is whether the system can explain why an answer should be trusted.

## Tradeoffs and key decisions

The main tradeoff was convenience versus trust. A cloud-first workflow would have been faster to demo, but it would weaken the privacy and inspectability goals.

I kept the first version local-first and single-user so the hardest product question stayed visible: can the system retrieve the right evidence and avoid pretending confidence when context is insufficient?

## Results and impact

The project shows applied RAG as an engineering system rather than a prompt wrapper. It has ingestion, persistence, retrieval, orchestration, citations, evidence checks, and deterministic fact handling that can be inspected and improved layer by layer.
