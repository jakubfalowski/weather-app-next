# Weather Insights – Next.js Senior Demo

**Dual‑mode deployment**: Full SSR app for Node/Edge hosts + static export for **GitLab Pages**.

## Local dev
```bash
pnpm i
pnpm dev
```

## Full SSR (recommended for real demo)
```bash
pnpm build && pnpm start
# open http://localhost:3000
```

## GitLab Pages (static export)
Pages is static-only. This repo supports a static build that keeps the UX working by doing client-side fetches directly to Open‑Meteo.

### CI/CD
Pipeline is in `.gitlab-ci.yml` and:
- builds with `NEXT_PUBLIC_STATIC_EXPORT=1` and `NEXT_PUBLIC_BASE_PATH="/$CI_PROJECT_NAME"`,
- publishes `out/` as `public/` for Pages,
- adds `.nojekyll`.

> SSR-only features (Server Actions, Edge route handlers) are disabled in export build but remain in the codebase for real hosting.

## Env toggles
- `NEXT_PUBLIC_STATIC_EXPORT=1` → \tStatic export build (GitLab Pages)
- `NEXT_PUBLIC_BASE_PATH="/<project>"` → \tBase path for Pages assets
- `NEXT_PUBLIC_USE_PROXY=true` → \tRoute client fetches via `/api/*` (Edge, with cache). Set to `false` on Pages.

## Tech highlights
- App Router (Server + Client Components), Suspense/streaming
- Server Actions (cookies), Edge Route Handlers, ISR (`revalidate`)
- Tailwind, Recharts (dynamic import), SWR
