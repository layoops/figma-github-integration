# AGENTS.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Figma GitHub Integration — a Figma plugin with two distinct builds:
- **Widget** (`src/widget/`) — Figma custom element rendered inline on the canvas using `figma.widget.h` as JSX factory (not React.createElement)
- **Iframe** (`src/iframe/`) — Full React 19 web UI that opens in a Figma plugin panel

## Commands

```bash
# Development
npm run dev           # Run both widget and iframe in watch mode (parallel)
npm run widget:dev    # Watch widget only (vite)
npm run iframe:dev    # Watch iframe only (vite)

# Build
npm run build         # Production build (iframe + widget)
npm run widget:build  # Build widget only
npm run iframe:build  # Build iframe only

# Type checking
npm run tsc:dev       # Watch type-check both widget and iframe

# Code quality
npm run lint          # ESLint
npm run lint:fix      # ESLint auto-fix
npm run lint:tsc      # TypeScript compilation check
npm run format        # Prettier formatting
```

## Architecture

### Feature-Sliced Design (FSD)

Both `src/iframe/` and `src/widget/` follow FSD layers (strict import direction: shared → entities → features → pages → widgets → app):

- `shared/` — utilities, API clients, UI primitives, hooks
- `entities/` — domain models (issue, pull-request, project, repository, settings)
- `features/` — user-facing capabilities (auth, create, import, search)
- `pages/` — route-level views
- `widgets/` — layout compositions
- `app/` — entry point, providers, routing setup

ESLint enforces FSD boundaries via the `eslint-plugin-feature-sliced` plugin.

### Widget Build (Vite)

- Entry: `src/widget/app/app.tsx`
- JSX factory: `figma.widget.h` (configured in `src/widget/tsconfig.json`)
- Output: `dist/widget.js`
- No React DOM — uses Figma widget components from `@figma/widget-typings`

### Iframe Build (Vite + TanStack Router)

- Entry: `src/iframe/app/app.tsx` + `src/iframe/app/index.html`
- Routes are **file-based** via TanStack Router's Vite plugin — `routeTree.gen.ts` is auto-generated; do not edit manually
- Route files live in `src/iframe/app/routing/`
- Output: `dist/index.html`

### GitHub API

- REST: Octokit (`@octokit/core`) in `src/iframe/shared/api/`
- GraphQL: `graphql-request` + `@octokit/plugin-paginate-graphql`
- Auth token stored via Figma's `figma.clientStorage` and accessed through `src/iframe/shared/lib/auth/`

### Shared Global Code

`src/global-shared/` — shared between widget and iframe (primarily i18n/localization types and translation files).

### Key Tech

| Concern | Library |
|---|---|
| UI components | Primer React (GitHub design system) |
| Data fetching | TanStack React Query v5 |
| Routing | TanStack Router v1 |
| Forms | TanStack React Form + Valibot |
| Build (iframe) | Vite |
| Build (widget) | Vite |

### Code Style

- Prettier: 100 char line width, trailing commas
- Imports sorted by `eslint-plugin-simple-import-sort`
