# Developer guide

## Local setup

Read [current state](current-state.md), then [AGENTS.md](../AGENTS.md). Use the
package-manager version declared in [package.json](../package.json): pnpm `12.10.1`.
The inspected environment has Node `24.21.0`; align a future checked-in runtime pin
with CI and hosting after verifying their support. Do not infer the runtime from
the `@types/node` development dependency.

From the repository root, with a compatible Node and pnpm already installed:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open `http://localhost:3000`. The current page is a placeholder. There are no
required application environment variables or running backend services today.
Do not add an empty `.env` file or provision infrastructure just to run the shell.
The app uses `next/font/google`; a clean build may need network access to fetch fonts.

These are the repository's setup commands, not evidence of a fresh install or
successful application build during this documentation-only planning pass.

## Validation commands

```sh
pnpm exec eslint .
pnpm exec next typegen
pnpm exec tsc --noEmit
pnpm build
```

Generate route types before standalone type checking because the existing layout
uses `LayoutProps`. For production smoke testing after a successful build, use
`pnpm start`. The manifest's `pnpm lint` and `pnpm format` commands modify files;
prefer non-mutating checks when reviewing someone else's work.

For documentation changes, scope formatting to edited documentation:

```sh
pnpm exec prettier --check README.md 'docs/**/*.md'
git diff --check
```

There is no test runner or `test` script yet. Add focused adapter/normalization tests
with the first feature; choose the smallest runner that suits the actual modules.
Add browser automation when the first complete journey exists. A Vitest-style unit
runner and Playwright are candidates, not installed requirements or choices already
made. Do not add a new runner solely to validate prose.

## Feature delivery workflow

1. Read the requirement and map the affected routes, service contracts, and source.
   Query Graphify first for behavior, definitions, dependencies, and related tests.
2. Review a focused spec and implementation plan for the delivery slice. Avoid
   turning the entire long-term roadmap into speculative implementation tasks.
3. Deliver one vertical slice: provider fixture → adapter/read function → UI → failure
   states → verification. Keep provider calls and secrets on the server.
4. Test important behavior: missing fields, pagination, malformed data, provider
   timeouts/429, publication delays, UTC/local display, and navigation as applicable.
   CI uses fixtures; separately record a bounded real-provider smoke check.
5. Update the relevant docs alongside the code. Review dependency, data, and security
   effects, then run appropriate non-mutating checks and the browser journey.
6. Refresh the local Graphify graph after changing code or docs. Verify hosted
   graph freshness separately once changes are available to its repository indexer.

Keep commits reviewable. Separate unrelated cleanups, do not overwrite another
contributor's working changes, and explain a new dependency with the concrete
requirement it satisfies. Before public access, add CI checks for lint, types,
build, and the tests that now exist. CI setup is not present today.

## Graphify workflow

Repository: `anhtran2204/paddock-view`.
Repository ID: `9948c7d9-e013-4dc8-85c2-2f9c7bd2d605`.

The available MCP tools use these operation names; prefixes vary by client:

| Need                                        | Operation                                             |
| ------------------------------------------- | ----------------------------------------------------- |
| Confirm connection and repository readiness | `list_repositories`, `graph_stats`                    |
| Locate behavior or a definition             | `query_graph`, `graphify_find`                        |
| Understand file coupling                    | `graphify_file_neighbors`, `graphify_imports_exports` |
| Scope a change and related tests            | `graphify_impact`, `graphify_tests_for`               |
| Retrieve or record planning context         | `memories_about`, `remember`, `recall`                |

**Before editing:** check the returned indexed commit against `git rev-parse HEAD`.
Even a matching commit excludes uncommitted work. Use the graph to locate code,
then inspect current files. For docs, literals, non-indexed content, and known source
paths, use local reads/search. Graph-linked tests are not evidence that tests pass.

**After a delivered slice:**

1. Update docs with actual file/symbol references and validation results.
2. Use the repository's configured Graphify indexing mechanism after the code is
   available to it. Confirm its trigger in the Graphify integration; do not assume
   every local save, commit, or push automatically causes indexing.
3. Query Graphify for a changed named symbol, then inspect the returned commit and
   source location. Check one dependency or test relationship relevant to the change.
4. Verify document discovery separately with a distinctive document title if the
   configured index supports Markdown. If it does not, retain repository docs as
   the source of truth and save a concise contextual pointer with `remember`.
5. Record the delivered commit, indexed commit, verification query, and any coverage
   gaps in the delivery/PR notes. If indexing lags, report it as pending.

### Local indexing: code and documentation

The [official open-source Graphify CLI](https://github.com/Graphify-Labs/graphify)
indexes supported local code and documents, including uncommitted Markdown. This
is separate from the hosted account's indexing plan. Code uses structural AST
extraction; documentation uses semantic extraction by the coding assistant (or a
configured model backend). A code-only extraction does not index document content.

Install the official package, whose name has a double `y`:

```sh
pipx install graphifyy
graphify install
```

Then, in an assistant with the installed Graphify skill, run:

```text
/graphify .
/graphify . --update
```

These slash commands invoke the assistant workflow; they are not shell commands.
The first builds the graph; the second refreshes changed files. Run from the project
root. The workflow produces `graphify-out/graph.json`, `graph.html`, and
`GRAPH_REPORT.md`, with source locations and extraction provenance. Check that every
changed document has nodes in the graph and verify a distinctive concept:

```sh
graphify explain "Vercel"
graphify explain "Public dashboard homepage"
```

The initial local run uses Graphify `0.9.92` in an isolated temporary Python
environment, without adding application dependencies. Its executable is
`/tmp/paddock-view-graphify-venv/bin/graphify`; use the installation above for a
persistent developer setup. Temporary runtime paths are machine-specific. Generated
outputs and extraction caches live in ignored `graphify-out/`; regenerate them from
versioned source docs rather than treating them as a second source of truth.
Semantic extraction is a model interpretation, not a completeness guarantee. Check
source references, preserve proposed-versus-implemented distinctions, and inspect
`GRAPH_REPORT.md` for coverage and integrity limitations.

### Hosted graph and planning memory

The connected MCP graph was ready at commit
`a0e7f522864df024867e29415e84ea27c3930924`, indexed at
`2026-10-18T20:34:56.732684Z`. It returned app-shell and configuration definitions.
The connected tool set exposes no indexing/rebuild operation.

Inspection of [Graphify Repositories](https://app.graphify.com/phan-s-workspace/repositories)
on 2026-10-18 showed code-and-README coverage on the hosted account and advertised
full repository-document indexing on Pro. **That hosted-plan restriction does not
prevent local CLI indexing.** The local graph is independent; building it does not
refresh the connected hosted MCP graph or upload local files. Verify the hosted
integration's trigger and document coverage separately after publishing changes.

A planning-context pointer was submitted on 2026-10-18; Graphify acknowledged
`stored: true` and `publication_policy: review_required`. It is pending processing
and review, not confirmed published memory and not a document index. An authorized
member can review it in [Graphify Memory](https://app.graphify.com/phan-s-workspace/memory?repo=9948c7d9-e013-4dc8-85c2-2f9c7bd2d605).

## Documentation ownership

The author of a feature updates its docs; the reviewer checks that proposed and
implemented states remain accurate. Update [current state](current-state.md) when
new capabilities actually ship. Update [routes](user-flows.md) for new surfaces and
[data contracts](data-contracts.md) for new reads or APIs. Record consequential
trade-offs in the [decision register](roadmap.md#decision-register).

Keep historical design rationale only while it explains current choices. Avoid
duplicated endpoint lists, copied provider manuals, generated dependency inventories,
or a second task tracker inside Markdown. Source code and verified graph relationships
answer structural questions; these docs answer why and what users can expect.
