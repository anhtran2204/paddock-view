# Data sources and contracts

**Status: proposed.** None of these integrations or services exists yet. External
documentation was checked on **2026-10-18**; access rules and coverage can change.

## Provider allocation

| Provider      | Proposed responsibility                                                | Evidence and constraints                                                                                                                                                       |
| ------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Jolpica-F1    | First-release calendar, results, driver/constructor standings          | [Official endpoint documentation](https://github.com/jolpica/jolpica-f1/blob/main/docs/README.md) lists these resources, pagination, and an identifying User-Agent requirement |
| OpenF1        | Later session timing and telemetry; evaluate before adding Python      | [Official documentation](https://openf1.org/docs/) says historical data starts in 2023 and needs no authentication; real-time access requires a subscription                   |
| FastF1        | Later Python-based session analysis if HTTP data alone is insufficient | [Official project](https://github.com/theOehrly/Fast-F1) provides Python access and analysis tools for results, schedules, timing, and telemetry                               |
| RSS / YouTube | Later headlines and official video discovery                           | Mentioned in the README; feed selection, quotas, embedding, and permitted use have not been evaluated                                                                          |

Jolpica currently documents an unauthenticated burst limit of four requests/second
and sustained limit of 500/hour, with possible future changes. Budget below those
ceilings across all requests, including pagination and retries; they are not a
target throughput. See its [rate-limit documentation](https://github.com/jolpica/jolpica-f1/blob/main/docs/rate_limits.md).

Before public release, verify the selected providers' current access and permitted
data/media use, record attribution, and keep the project's unofficial disclaimer.
An open-source software license does not itself establish permission for every
underlying data or media use. This planning pass has not completed that review.

## Domain concepts

These are application contracts, not a proposed database schema. Keep only fields
required by a surface; add fields when a feature consumes them.

| Concept              | Identity and essential meaning                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------ |
| Season               | F1 plus year; supported years are explicit                                                             |
| Weekend              | Season plus round; provider reference, name, circuit, date, available sessions                         |
| Session              | Weekend plus session kind; start instant when known; availability independent of result publication    |
| Driver / constructor | Stable provider identifier and display name; never join on display name or car number alone            |
| Result               | Session plus driver; classification, constructor at that event, points, status, optional timing fields |
| Standings snapshot   | Season plus provider's as-of round and category; provider-ranked entries                               |

Use UTC ISO timestamps for instants, retain date-only values without inventing
times, and use milliseconds for normalized durations. Preserve meaningful status
strings alongside optional numeric classifications. Points may be fractional.
Missing is `null` or an explicit unavailable field, not zero. Race and sprint result
rows differ from qualifying segment times; avoid forcing them into one loose row
with dozens of optional fields.

When a second provider arrives, introduce an explicit crosswalk for weekends,
sessions, drivers, and constructors. OpenF1 session keys and Jolpica season/round
identifiers are not interchangeable. Document ambiguous matches instead of fuzzy
joining silently.

## Internal read contracts

| Proposed function | Inputs                                                     | Output                               | Primary consumer                 |
| ----------------- | ---------------------------------------------------------- | ------------------------------------ | -------------------------------- |
| `getSchedule`     | Supported season                                           | Weekend/session summaries            | Calendar, overview, weekend page |
| `getResults`      | Supported season, known round, allowed result session kind | Session-specific classification rows | Results page and overview        |
| `getStandings`    | Supported season, drivers/constructors category            | Ranked snapshot with as-of round     | Standings page and overview      |

Each successful read returns data plus provider, fetched-at timestamp, optional
provider-updated-at timestamp, and freshness/coverage metadata. `fetchedAt` is the
time of the original upstream retrieval, not every render. Cache that timestamp
with the payload; a cached render must not claim the data was just refreshed.

Use discriminated outcomes: `available` (data and fresh/stale/partial metadata),
`unavailable` (not-published, not-supported, or unknown reason), and `failed`
(timeout, rate-limited, upstream, or invalid-payload). A missing record alone cannot
always distinguish unsupported from not-published; preserve `unknown` when evidence
is insufficient. Malformed local input is rejected before transport.

The adapter owns transport, bounded pagination, parsing, and normalization; query
functions own resource selection and domain outcomes. Start with direct functions
and narrow parsers. Consider a schema-validation library only when the real payload
contracts make handwritten validation harder to maintain.

### Upstream mapping

Use the HTTPS Jolpica API base `https://api.jolpi.ca/ergast/f1/`. The intended
resources are season races/calendar, season-and-round results/qualifying/sprint,
and season standings. Verify exact request shapes and publication behavior using
the official [calendar](https://github.com/jolpica/jolpica-f1/blob/main/docs/endpoints/races.md)
and [result](https://github.com/jolpica/jolpica-f1/blob/main/docs/endpoints/results.md)
references during the first adapter slice. Handle `limit`, `offset`, and total
counts instead of assuming a single response is complete. Include a versioned
PaddockView User-Agent as required by the provider.

## Freshness and failure policy

These are proposed cache ages to validate, not provider publication guarantees or
background polling schedules. Expiry makes data eligible for revalidation on use.

| Resource                           | Proposed revalidation age | Maximum stale age for fallback display            |
| ---------------------------------- | ------------------------- | ------------------------------------------------- |
| Current-year schedule              | 1 hour                    | 24 hours with warning                             |
| Current-year results and standings | 15 minutes                | 24 hours with warning                             |
| Previous-year data                 | 24 hours                  | 7 days with warning                               |
| Empty/not-published result         | 5 minutes                 | Do not keep serving an old empty state as current |

Keep validation failures out of successful domain results. Verify whether cached
transport data can still fail parsing and prevent it from being labelled usable.
When revalidation fails, show a previously validated response only if it exists and
is within the permitted stale age. If the selected cache implementation cannot
expose the needed timestamp/last-good behavior, use an explicit unavailable state
and resolve the cache mechanism in the first slice; do not claim resilience the
framework has not demonstrated. Cache loss has no durability guarantee.

Initial reads have a five-second timeout and no automatic retry. User-triggered
retry remains subject to cache and provider backoff. Never loop on 429; use any
provider retry guidance. Do not automatically fall back to a different provider
with different semantics. Expose stale or unavailable data clearly instead.

## HTTP API boundary

**Current API routes: none. Proposed mandatory first-release API routes: none.**
Server-rendered pages use the internal contracts above. When polling or another
client requires HTTP, add a Route Handler under `src/app/api/` over the same reads,
and document its method, path, validation, example response, freshness metadata,
status codes, and authentication at that time. Do not create unused endpoints now.

Future HTTP semantics should distinguish invalid input (400), unknown resource
(404), upstream failure/timeout (502/504), and local throttling (429). A known session
awaiting results is a valid resource with an unavailable data state. Browser retries
must honor server backoff; internal errors and secrets never appear in responses.
