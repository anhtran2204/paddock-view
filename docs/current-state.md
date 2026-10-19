# Current implementation

**Observed 2026-10-18.** Source is the local working tree at base commit `a0e7f52`.
Existing uncommitted changes to `AGENTS.md` and `src/app/page.tsx` preceded the docs.
The working tree takes precedence over the older indexed snapshot.

## Stack and entry points

| Area             | Present today                                             | Evidence                                                                       |
| ---------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Framework        | Next.js `16.3.8`, App Router                              | [package.json](../package.json)                                                |
| UI               | React / React DOM `19.2.8`                                | [package.json](../package.json)                                                |
| Language         | TypeScript `^5`, strict mode, `@/*` maps to `src/*`       | [tsconfig.json](../tsconfig.json)                                              |
| Styling          | Tailwind CSS `^4`, PostCSS, global light/dark variables   | [globals.css](../src/app/globals.css), [PostCSS config](../postcss.config.mjs) |
| Tooling          | pnpm `12.10.1`, ESLint `^9`, Prettier `^3.9.9`            | [package.json](../package.json)                                                |
| Framework config | Empty options; Cache Components not enabled               | [next.config.ts](../next.config.ts)                                            |
| `/`              | `Home()` renders “Hello World!” in the local working tree | [page.tsx](../src/app/page.tsx)                                                |
| Root shell       | `RootLayout()`, Geist fonts, starter metadata             | [layout.tsx](../src/app/layout.tsx)                                            |

Caret versions above are manifest ranges, not claims about exact lockfile resolution.
The inspected environment reported Node `v24.21.0` and pnpm `12.10.1`; no Node
version is pinned in the repository. The bundled Next installation guide lists a
minimum of Node `20.9`; the chosen pnpm release has its own runtime requirements.

## Not implemented

No motorsport UI, provider adapter, data cache policy, API Route Handler, database,
authentication, worker, AI integration, or test suite was found in the source tree.
There is no checked-in CI workflow or deployment configuration. Installed tools
are not proof that a workflow is configured: for example, the ESLint config uses
Next's presets; additional installed plugins are not automatically active.

The `lint` script runs `eslint . --fix`, and `format` runs `prettier --write .`.
Use the non-mutating commands in the [developer guide](development.md) for review.

## Current system map

```mermaid
flowchart LR
    Browser --> Layout[RootLayout: fonts and global styles]
    Layout --> Home[Home: placeholder at /]
```

Graphify was queryable for `anhtran2204/paddock-view`, with 92 reported nodes and
indexed commit `a0e7f522864df024867e29415e84ea27c3930924`. Its query identified
`RootLayout`, metadata, and tooling configuration. Local file inspection confirmed
the small app shell and the absence of feature modules; absence from graph search
alone would not have established that.
