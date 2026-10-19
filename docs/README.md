# PaddockView documentation

Initial planning baseline: **2026-10-18**. Audience: the project owner and future contributors.

PaddockView is a public motorsport dashboard, starting with F1. The owner clarified
that public content, SEO, and fast initial loads matter from the first release,
with personalized/authenticated or premium tools planned later. This supersedes
the initial personal-first audience assumption. **Vercel is the confirmed initial
host**; retain Next.js for the public-plus-private application. Supabase is the
preferred backend candidate, with its initial responsibilities still proposed.
The product vision remains in the [root README](../README.md).

## Read in this order

| Document                               | Purpose                                                               |
| -------------------------------------- | --------------------------------------------------------------------- |
| [Current state](current-state.md)      | What actually exists, stack versions, and evidence                    |
| [Requirements](requirements.md)        | First-release scope and observable acceptance criteria                |
| [User flows and routes](user-flows.md) | Frontend surfaces, navigation, states, and route ownership            |
| [Architecture](architecture.md)        | Proposed system design, boundaries, alternatives, and growth triggers |
| [Data contracts](data-contracts.md)    | Providers, domain concepts, service contracts, caching, and errors    |
| [Developer guide](development.md)      | Setup, validation, documentation maintenance, and Graphify workflow   |
| [Roadmap and decisions](roadmap.md)    | Delivery slices, unresolved choices, and when to decide them          |

## Status vocabulary

- **Observed**: verified in this checkout or a dated external source.
- **Confirmed direction**: explicitly agreed with the owner.
- **Proposed**: a design to review; it is neither implemented nor an approved commitment.
- **Deferred**: part of the vision, outside the first release.

The owner approved this documentation as the planning baseline on **2026-10-18**,
including the public dashboard homepage. Proposed requirements and architecture
describe the accepted direction, not shipped behavior. Explicit open choices such
as Supabase's first-slice responsibility remain unresolved. Only the app shell
exists today. This set is a design brief, not a task-by-task implementation plan.

## Keeping this useful

Keep each fact in one document and link to it elsewhere. A feature change updates
its requirements, route/data mapping, and relevant tests in the same change. Mark
proposals implemented only with a link to the actual source and validation evidence.
Record consequential decisions in the decision register; create a separate decision
record only when the explanation outgrows a short paragraph. Do not add a docs site,
generated API portal, or another tracking system yet.

The Graphify code graph complements these documents: it describes indexed code
relationships, while the docs explain intent and contracts. See the [indexing
workflow and current limitation](development.md#graphify-workflow).
