# Roadmap and decisions

**Status: approved sequencing, 2026-10-19; not implemented.** This is a direction-setting roadmap, not an
approved implementation plan or date commitment. The owner clarified public content
and search discovery from the first release, followed by personalized or premium tools.
Vercel is the confirmed initial host. The [architecture](architecture.md) is the
approved system direction.

## Delivery phases

| Phase                            | Work                                                                                                                              | Exit evidence                                                                                  |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| 0. Approved baseline             | Stack, ownership, route boundaries, frontend-first order                                                                          | Owner approval on 2026-10-19; this docs set                                                    |
| 1. Frontend foundation           | Public shell, homepage, calendar/results/standings routes, realistic fixtures, small frontend CI                                  | Main navigation and public journey work at mobile/desktop sizes                                |
| 2. Frontend states and contracts | Typed view models; loading, unpublished, empty, stale, partial/error states; keyboard behavior; initial Playwright tests          | Owner agrees on frontend outline and data needs; fixtures satisfy relevant acceptance criteria |
| 3. Backend foundation            | Supabase schema/RLS, generated types, Zod Jolpica adapter, bounded ingestion, private raw captures, logs; database/function tests | Calendar import is validated, atomic, repeatable, and preserves last good data on failure      |
| 4. Connect vertical slices       | Calendar first, results next, standings/overview next; verify cache/freshness; extend CI and backend deployment automation        | Each public journey works with stored real data and tested failures                            |
| 5. Public release infrastructure | Isolated environments, ordered production CI/CD, Sentry, freshness/failure alerts, smoke checks, restore/rollback                 | Public-release gate passes                                                                     |

Backend provisioning and backend CI/CD are not prerequisites for the frontend
outline. Small frontend CI starts early. Do not wait for all future frontend features
to be complete before connecting real data. Production automation is required before
launch; details live in [operations and testing](operations.md).

## Later feature roadmap

After the first public release, prioritize historical telemetry, AI-assisted
analysis, live sessions, news/highlights, fantasy, and another series as separately
reviewable slices. Each needs its own contracts, acceptance evidence, and runtime
budget. Add authentication and paid entitlements when the first private feature
needs them, not to browse public F1 content. Build live features against recorded
sessions before testing live sources. Select chart/AI/payment tooling with those
features rather than installing it during the public outline.

## Decision register

| ID   | Decision / recommendation                                                                            | Status                                                                             | Revisit when                                                               |
| ---- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| D-01 | Public content from the first release; future personalized or premium tools                          | Confirmed clarification by owner, 2026-10-18; supersedes personal-first assumption | Audience changes                                                           |
| D-02 | Calendar, results, and standings as first release                                                    | Approved planning direction, 2026-10-18; not implemented                           | Owner reviews release scope                                                |
| D-03 | Retain one Next.js app with public prerendered/server-rendered content and future protected surfaces | Approved planning direction, 2026-10-18; not implemented                           | A concrete deployment or product requirement warrants a change             |
| D-04 | Jolpica first; provider payloads isolated in one adapter                                             | Approved planning direction, 2026-10-18; not implemented                           | Coverage/contract check finds a blocking gap                               |
| D-05 | Current and previous year initially                                                                  | Approved planning direction, 2026-10-18; not implemented                           | Historical browsing is prioritized and coverage is checked                 |
| D-06 | Supabase owns durable validated F1 data, Cron/Edge ingestion, and private raw captures               | Approved 2026-10-19; implement after frontend outline                              | Measured persistence or runtime requirements change                        |
| D-07 | Keep existing cache model; explicitly cache stored-data reads with original freshness metadata       | Approved planning direction, 2026-10-18; not implemented                           | First slice proves insufficient, or Cache Components adoption is justified |
| D-08 | Keep docs in the repo; use Graphify for indexed structure and contextual pointers                    | Approved; local CLI covers docs; hosted graph has separate coverage limits         | Integration or team workflow changes                                       |
| D-09 | Vercel for initial hosting                                                                           | Confirmed by owner, 2026-10-18                                                     | Deployment constraints or measured workload justify reconsideration        |
| D-10 | Public dashboard homepage at `/`; future feature/pricing pages within the same app                   | Approved planning direction, 2026-10-18; not implemented                           | Review homepage purpose or premium conversion needs                        |
| D-11 | Frontend outline and fixtures before backend implementation; lightweight frontend CI early           | Approved 2026-10-19                                                                | Outline and contracts accepted                                             |
| D-12 | Public/auth/private route groups; domain-based feature modules; server-side authorization            | Approved 2026-10-19                                                                | First protected feature                                                    |
| D-13 | Platform logs plus Sentry; Vitest, Deno, database tests, Playwright; defer Grafana/OTel              | Approved 2026-10-19                                                                | Operational or testing needs exceed baseline                               |
| D-14 | One ordered production release workflow; backend CI/CD after outline                                 | Approved 2026-10-19                                                                | First hosted backend release                                               |

## Open decisions and when they matter

| Question                                                             | Working assumption / recommended next action                                                             | Needed by                                |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| What is the recurring spend ceiling?                                 | Start without paid data; do not purchase hosting or subscriptions during planning                        | Hosted deployment and later live/AI work |
| Which runtime and deployment settings?                               | Vercel selected; align Node versions and verify cache behavior, limits, and rollback                     | First hosted deployment                  |
| Can the selected provider meet schedule/results coverage needs?      | Check one ordinary weekend, one sprint weekend, and publication/missing-data behavior                    | Schedule/results adapter plan            |
| How will fetch timestamps and stale fallback be implemented?         | Persist retrieval timestamps and last good snapshots; verify page-cache lifetime separately              | Backend integration acceptance           |
| What triggers the hosted Graphify index, and are docs covered there? | Local assistant workflow covers Markdown; verify hosted trigger and coverage separately after publishing | First indexed delivery                   |

These are explicit unresolved choices, not hidden implementation tasks or approval
of a budget. Defaults let the docs stay concrete while leaving room for review.

## Public-release gate

Before the initial public release:

- Verify provider access, attribution, and permitted data/media use for that audience.
- Configure the selected Vercel hosting and a spend ceiling; measure cache misses and upstream request volume.
- Bound allowed query ranges and request rates so public traffic cannot multiply
  provider calls or exhaust the budget; verify behavior across deployed instances.
- Run first-release acceptance checks, accessibility journeys, production smoke
  tests, and provider-failure scenarios. Set up error visibility and rollback.
- Record required environment settings and deployment steps without secrets. Test
  backup/restore for the selected persisted-data setup.
- Verify docs and Graphify against the delivered commit, recording index lag honestly.

No public uptime promise, multi-region deployment, microservices migration, or
multi-user account model is needed for the initial public read-only release.
Future personalized or paid features require their own authorization and entitlement design.

## Next implementation plan

Detail **phase 1: public frontend foundation with realistic fixtures**, followed by
phase 2 states and contracts. Name exact public routes, fixture scenarios, visual
acceptance criteria, and frontend validation commands. Supabase responsibilities
are settled; provisioning, schema implementation, and backend CI/CD wait until the
frontend outline is accepted. Budget, region, runtime pins, and environment setup
must be resolved before their respective deployment steps.
