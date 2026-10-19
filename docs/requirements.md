# Product requirements

**Status: proposed**, except the confirmed public-facing audience and Vercel hosting direction. Scope derives
from the [README vision](../README.md). The first release should answer three
questions reliably: **when is the next session, what happened, and where does the
championship stand?**

## First-release scope

Public F1 content, read-only, no sign-in required to browse. Proposed supported seasons: the current calendar
year and the previous year, with explicit unavailable states if the provider has
not published a season. Broader historical browsing follows a coverage check.
All supported routes must work from a direct link as well as navigation.

| ID    | Requirement                                                                               | Acceptance evidence                                                                                                                                                                        |
| ----- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| F1-01 | Overview links to the next scheduled session, latest available race result, and standings | With fixtures for preseason, midseason, and postseason, show the correct summaries or an explicit absence; never imply results are live                                                    |
| F1-02 | Season calendar and weekend session schedule                                              | Display available practice, qualifying, sprint, and race times chronologically; identify missing times without inventing midnight starts                                                   |
| F1-03 | Local time display                                                                        | Store instants in UTC; show a named display time zone; verify a daylight-saving transition and a session crossing the viewer's calendar date; use labelled UTC until browser zone is known |
| F1-04 | Race, qualifying, and sprint results where available                                      | Preserve provider classification, points, gaps, and finish status; DNF, DNS, DSQ, missing timing, and non-sprint weekends have distinct presentations                                      |
| F1-05 | Driver and constructor standings                                                          | Show provider rank, points, and the round through which standings apply; do not recompute championships from a partial local dataset                                                       |
| F1-06 | Durable navigation state                                                                  | Season, weekend, session kind, and standings category survive refresh, back/forward, and copied URLs                                                                                       |
| F1-07 | Trustworthy data states                                                                   | Loading, not yet published, unsupported, stale, partial, and failed states remain distinguishable; show provider and retrieval time; an outage cannot look like an empty championship      |
| F1-08 | Responsive and accessible core journeys                                                   | Complete calendar → weekend → result and standings journeys by keyboard at mobile and desktop sizes; tables have headers, focus is visible, and status is not conveyed only by color       |

“Latest result” means latest **available** race classification in the supported
season, not a guess that the most recently scheduled race has finished. An ended
session can still be awaiting publication. A scheduled start passing is not proof
that a session is live, completed, or cancelled.

### Public discovery and initial rendering

Proposed requirement **F1-09**: public pages expose meaningful primary content and
crawlable links in server-rendered or prerendered HTML, with page-specific titles,
descriptions, canonical URLs, and appropriate HTTP status codes. Include intended
public canonical URLs in a sitemap. Verify representative homepage, calendar,
results, and standings responses without relying on browser-side data fetching to
produce their primary content. Measure initial content display and browser JavaScript
alongside Q-04; rendering strategy alone does not guarantee speed or search ranking.

The proposed homepage is a public overview with a short product introduction and
useful race information. Its content hierarchy and future premium routes are in
[user flows](user-flows.md#homepage-and-future-premium-surfaces).

## Quality requirements

| ID   | Requirement                                                                      | Verification                                                                                                                                                                              |
| ---- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Q-01 | Provider access stays on the server, with bounded inputs and response validation | Malformed season/round/session inputs do not trigger arbitrary upstream requests; provider secrets and raw errors do not reach browser bundles                                            |
| Q-02 | Useful failures and bounded waiting                                              | A provider call has a proposed five-second timeout; initial reads make no automatic retry; a failed section offers a safe retry and leaves unrelated sections usable                      |
| Q-03 | Requests respect provider capacity                                               | Repeated reads reuse the configured cache; pagination is bounded; a 429 stops retries and respects provider retry guidance                                                                |
| Q-04 | Measure performance before adding infrastructure                                 | Record cold and warm page latency, upstream calls per page, and transferred bytes for the first slice; provisional goal: warm page usable within two seconds on the documented test setup |
| Q-05 | Reproducible, small delivery increments                                          | Each slice passes non-mutating lint, types/build, relevant fixture tests, and its browser journey; CI does not depend on live provider availability                                       |
| Q-06 | Operational visibility without a platform project                                | Log request duration, provider outcome, cache behavior where observable, and a correlation ID; redact credentials and avoid raw payload dumps                                             |

The performance goal is a planning target, not a measured service-level promise.
Provider publication latency and access restrictions are outside the app's control.

## Deferred scope

Historical telemetry, AI explanations, live timing, news/highlights, fantasy, and
other series remain in the vision. Each gets a focused spec when prioritized.
Personalized telemetry, analytics, and fantasy tools are candidates for future
authentication or paid access. Exact free-versus-paid boundaries are undecided.
Accounts and payments are not prerequisites for browsing the first release.
Supabase is the preferred backend candidate; select a concrete role such as durable
provider snapshots before making a database mandatory for the first slice.

## Release readiness

The first release is useful when F1-01 through F1-09 pass their applicable checks against normal and failure
fixtures, one real supported weekend has been checked against its source, and
freshness behavior has been exercised on Vercel. The initial public release
requires the [public-release gate](roadmap.md#public-release-gate). Documentation
and graph evidence should identify the delivered commit and any remaining gaps.
