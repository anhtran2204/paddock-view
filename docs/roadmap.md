# Roadmap and decisions

**Status: proposed sequencing.** This is a direction-setting roadmap, not an
approved implementation plan or date commitment. The owner clarified public content
and search discovery from the first release, followed by personalized or premium tools.
Vercel is the confirmed initial host. The [architecture](architecture.md) is the
initial written design for review.

## Delivery slices

| Slice                                | User outcome                                        | Technical work justified by it                                                                                      | Exit evidence                                                                                                               |
| ------------------------------------ | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| 0. Planning baseline                 | Contributors understand scope and boundaries        | This docs set; resolve first-slice decisions                                                                        | Review of requirements and architecture; confirmed first-slice scope                                                        |
| 1. Calendar and weekend schedule     | Find the next session in local time                 | Jolpica schedule adapter, validation, cache policy, calendar/weekend routes, overview schedule card                 | Ordinary and sprint weekend fixtures, missing times, daylight-saving display, provider outage and warm/cold cache checks    |
| 2. Results                           | Read race, qualifying, and sprint classifications   | Session-specific contracts and result tables                                                                        | Correct classification/status/timing; missing publication and unsupported-session states; source comparison for one weekend |
| 3. Standings and overview completion | Follow drivers and constructors                     | Standings reads, category navigation, overview summaries                                                            | As-of round and points match fixtures/source; first-release journeys pass                                                   |
| 4. Historical telemetry              | Compare selected laps                               | Evaluate OpenF1 against a concrete comparison; charting; bounded data windows; worker/storage only if measured need | Chosen laps, units, alignment, missing samples, payload/runtime budgets, and analysis limits verified                       |
| 5. AI-assisted analysis              | Ask a bounded question grounded in session data     | Read-only analysis tools over validated data; evidence links and usage limits                                       | Answers identify supporting session/lap data and admit missing evidence; cost and latency measured                          |
| 6. Live sessions                     | Follow current session updates                      | Confirm source access/budget; ingestion and reconnect semantics; freshness indicators                               | Delayed/disconnected/finished states, duplicates, ordering, load, and provider limits tested                                |
| 7. News and highlights               | Find source-linked coverage                         | Selected feeds, attribution, deduplication, validated media links                                                   | Broken feeds, duplicate items, unsafe markup, and unavailable videos handled                                                |
| 8. Fantasy                           | Participate in a defined fantasy workflow or league | Specify scoring rules, membership, persistence, and any paid access                                                 | Rule version, ownership, membership access, and scoring verified                                                            |
| 9. Another series                    | Use the dashboard for one additional championship   | Confirm source and series-specific model; reuse only proven shared UI                                               | Complete one journey with that series' session/scoring rules                                                                |

Slices 4–9 preserve the README's broad ordering but are independently reviewable;
their scope and priority may change after using the initial dashboard. Public
access requires the release gate below from the initial launch; browsing public
content does not require accounts.
Each later subsystem needs its own focused spec before adding dependencies.

## Decision register

| ID   | Decision / recommendation                                                                              | Status                                                                             | Revisit when                                                                |
| ---- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| D-01 | Public content from the first release; future personalized or premium tools                            | Confirmed clarification by owner, 2026-10-18; supersedes personal-first assumption | Audience changes                                                            |
| D-02 | Calendar, results, and standings as first release                                                      | Approved planning direction, 2026-10-18; not implemented                           | Owner reviews release scope                                                 |
| D-03 | Retain one Next.js app with public prerendered/server-rendered content and future protected surfaces   | Approved planning direction, 2026-10-18; not implemented                           | A concrete deployment or product requirement warrants a change              |
| D-04 | Jolpica first; provider payloads isolated in one adapter                                               | Approved planning direction, 2026-10-18; not implemented                           | Coverage/contract check finds a blocking gap                                |
| D-05 | Current and previous year initially                                                                    | Approved planning direction, 2026-10-18; not implemented                           | Historical browsing is prioritized and coverage is checked                  |
| D-06 | Supabase is the preferred backend candidate; define its first-slice responsibility before provisioning | Owner preference; integration details proposed                                     | Snapshot persistence, authentication, or another concrete need is specified |
| D-07 | Keep existing cache model; explicit revalidation and verified freshness metadata                       | Approved planning direction, 2026-10-18; not implemented                           | First slice proves insufficient, or Cache Components adoption is justified  |
| D-08 | Keep docs in the repo; use Graphify for indexed structure and contextual pointers                      | Approved; local CLI covers docs; hosted graph has separate coverage limits         | Integration or team workflow changes                                        |
| D-09 | Vercel for initial hosting                                                                             | Confirmed by owner, 2026-10-18                                                     | Deployment constraints or measured workload justify reconsideration         |
| D-10 | Public dashboard homepage at `/`; future feature/pricing pages within the same app                     | Approved planning direction, 2026-10-18; not implemented                           | Review homepage purpose or premium conversion needs                         |

## Open decisions and when they matter

| Question                                                             | Working assumption / recommended next action                                                                              | Needed by                                |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| What is the recurring spend ceiling?                                 | Start without paid data; do not purchase hosting or subscriptions during planning                                         | Hosted deployment and later live/AI work |
| Which runtime and deployment settings?                               | Vercel selected; align Node versions and verify cache behavior, limits, and rollback                                      | First hosted deployment                  |
| Can the selected provider meet schedule/results coverage needs?      | Check one ordinary weekend, one sprint weekend, and publication/missing-data behavior                                     | Schedule/results adapter plan            |
| How will fetch timestamps and stale fallback be implemented?         | Prototype the smallest framework-supported approach with failure fixtures; unavailable is valid when no good cache exists | First data slice acceptance              |
| What triggers the hosted Graphify index, and are docs covered there? | Local assistant workflow covers Markdown; verify hosted trigger and coverage separately after publishing                  | First indexed delivery                   |

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
- Record required environment settings and deployment steps without secrets. Add
  backup/restore checks only if persisted application data has been introduced.
- Verify docs and Graphify against the delivered commit, recording index lag honestly.

No public uptime promise, multi-region deployment, microservices migration, or
multi-user account model is needed for the initial public read-only release.
Future personalized or paid features require their own authorization and entitlement design.

## Next planning conversation

The planning baseline is approved. Resolve the Supabase role in D-06, then detail **slice 1:
calendar and weekend schedule** as the recommended first implementation plan.
That plan should name exact files, fixture cases, validation commands, and a small
delivery order. It should not pre-create future telemetry, AI, or live systems.
