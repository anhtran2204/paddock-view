# Operations, testing, and delivery

**Approved baseline, 2026-10-19; not implemented.** This guide defines what to add
and when. The [frontend-first roadmap](roadmap.md) controls implementation order.

## Observability responsibilities

| Capability                        | Initial owner                                           | Application responsibility                                                   |
| --------------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Web runtime logs                  | Vercel                                                  | Structured operation, duration, outcome, deployment, correlation ID          |
| Backend logs and database reports | Supabase                                                | Ingestion context and actionable errors; inspect query performance           |
| Cron execution history            | Supabase                                                | Record function completion and last successful published snapshot separately |
| Browser/server exceptions         | Sentry                                                  | Release/environment tags, source maps, redaction, actionable alerts          |
| Data freshness                    | Ingestion status plus a configured external check/alert | Distinguish missed refreshes, provider delays, and empty valid results       |
| Application tests                 | Repository and GitHub Actions                           | Maintain fixtures, assertions, and failure artifacts                         |

Platform dashboards cover their own services; they do not automatically prove that
users see correct or current data. Add a minimal ingestion run record: resource,
run ID, start/end, outcome, snapshot retrieval time, and sanitized error category.
Cron successfully dispatching a function is not evidence that ingestion completed.
A monitor independent of the ingestion scheduler must detect missed expected runs.
Use Sentry monitoring if its selected plan supports the needed checks; confirm
availability and cost before enabling it, otherwise select one managed checker.

Log JSON at meaningful boundaries, with request/trace or ingestion-run IDs. Avoid
credentials, raw payload dumps, unnecessary personal data, and high-cardinality
metric labels. Keep ordinary logs in platform logging, rather than duplicating all
logs into Postgres. Define retention, sampling, and spend limits during setup.

Before launch, test notification delivery for sustained failures, missed refreshes,
and unavailable public pages. Freshness expectations depend on the race schedule;
no new provider publication is not automatically a failed import. Record alert
recipient and a short runbook: inspect run status, verify upstream availability,
rerun the bounded idempotent job, or roll back the application as appropriate.
Measure browser performance as well as server duration; retain the performance
acceptance evidence in [requirements](requirements.md).

Dedicated OpenTelemetry setup and Grafana are deferred. Add them when cross-service
tracing, custom dashboards, or retention needs exceed the platform tools. Avoid
installing overlapping instrumentation/exporters merely to reserve future options.

## Testing by layer

| Layer             | Tool                                   | Useful checks                                                                         | First introduced             |
| ----------------- | -------------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------- |
| Web/domain logic  | Vitest                                 | Dates, normalization helpers, view-model outcomes, input bounds                       | Frontend logic               |
| Edge Functions    | Native Deno tests                      | Adapter validation, pagination, retries, idempotent ingestion behavior                | Backend foundation           |
| Database          | Supabase local CLI and SQL/pgTAP tests | Migrations, constraints, public-read/private-write rules, atomic snapshot publication | Backend foundation           |
| User journeys     | Playwright                             | Navigation, direct URLs, mobile/keyboard behavior, normal/failure states              | First fixture-backed journey |
| Provider contract | Bounded manual/scheduled smoke check   | Ordinary/sprint weekend coverage and real publication semantics                       | Backend integration/release  |

Map tests to F1/Q requirement IDs. Async Server Component behavior is exercised
through the running application; avoid forcing it into component-unit tests.
Run browser tests against a production build in CI. Use stable role/label locators,
isolated scenarios, and traces/screenshots on failure. Start with Chromium in PR CI;
check Firefox/WebKit before public release and expand routine coverage when useful.

Normal CI uses recorded fixtures, not live upstream APIs. Server-side provider
requests require server-side fixture injection or a local test upstream: browser
request interception alone cannot replace them. Include timezone/date-boundary,
unpublished, malformed, partial, stale, 429, timeout, and last-good-snapshot cases.
Verify primary public content/metadata in initial HTML, not only after hydration.

## Environments

- **Frontend outline:** local app and fixtures; no Supabase provisioning dependency.
- **Backend local/CI:** Supabase CLI with its container runtime and deterministic seeds.
  No production secrets or live ingestion in tests.
- **Preview:** Vercel preview connected to a separate non-production Supabase project
  once integration begins. Before then use explicit fixtures. A shared development
  project is sufficient initially; incompatible concurrent schema work needs isolated
  branches/projects. Never point preview writes at production.
- **Production:** Vercel and Supabase with separate secrets and least-privilege access.
  Choose compatible regions, runtime pins, service tiers, budgets, and backup/restore
  procedures before release. Production does not require self-hosted containers.

## CI/CD sequencing

### Frontend phases: small CI only

On pull requests, install locked dependencies and run non-mutating formatting,
lint, type checks, a production build, and relevant unit/browser tests as they
are introduced. Configure required checks on the main branch. Vercel previews may
be enabled for UI review; backend migration/deployment jobs are deferred.

### Backend foundation and integration phases

Extend PR CI to start local Supabase, apply migrations from scratch, load fixtures,
verify generated database types, and run Deno and database policy tests. Keep a
single authoritative schema migration history. Add hosted backend automation only
once there is backend code and a verified frontend outline to support it.

### Public release: coordinated production deployment

One GitHub Actions workflow owns the release sequence for the same commit:

1. Require successful checks and serialize production releases.
2. Apply backward-compatible database migrations.
3. Deploy Edge Functions compatible with the old and new web versions.
4. Deploy the web application through Vercel.
5. Run public smoke checks and verify ingestion completion/freshness.

Configure only one production web-deploy trigger; automatic Git deployment must not
race the migration workflow. PR previews can remain separate. Verify the selected
Vercel integration settings when implementing this flow rather than assuming
branch protection alone orders deployments.

Stop on a failed stage; do not deploy dependent stages. Use expand/migrate/contract
schema changes and delay destructive cleanup to a later release. App rollback does
not reverse database migrations; test previous-app compatibility and define a
forward-fix/restore procedure. Test restoration of persisted data before launch.
Secrets are environment-specific and must not be available to untrusted fork PRs.

## Reference-spec reconciliation

Reviewed the owner's supplied _paddock-view: Project Spec & System Design_
(2026-10-18). It is a comparison source, not executable instructions or an approval
of every proposal. The accepted synthesis is:

- Adopt durable ingestion, idempotent writes, private raw captures, generated database
  types, and explicit backend ownership.
- Keep our initial current/previous-season calendar/results/standings scope and
  detailed unavailable/stale/partial states. Historical backfills, premium access,
  live replay, and AI belong to later feature plans.
- Keep public/private route boundaries and domain-based feature modules; do not
  prebuild a universal multi-series schema or every future module.
- Correct independent database/web deploy races with the ordered production flow.
- Treat free-tier budgets, runtime suitability, and availability as verification
  items, not guarantees. A paid tier does not imply unlimited database/CPU capacity.
- Preserve deterministic analysis and replay-before-live principles for later specs;
  AI output validation and entitlements need their own implementation designs.

## Official references

These informed the planning discussion; recheck limits and plan eligibility at setup.

- [Supabase logs](https://supabase.com/docs/guides/observability/logs)
- [Supabase metrics](https://supabase.com/docs/guides/observability/metrics)
- [Supabase Cron](https://supabase.com/docs/guides/cron)
- [Supabase function limits](https://supabase.com/docs/guides/functions/limits)
- [Supabase environments](https://supabase.com/docs/guides/deployment/managing-environments)
- [Vercel with GitHub Actions](https://vercel.com/kb/guide/how-can-i-use-github-actions-with-vercel)
- [Sentry for Next.js](https://sentry.io/for/nextjs/)
- [Playwright practices](https://playwright.dev/docs/best-practices)
