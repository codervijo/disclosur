# TODO: server-side code to port

Framework-specific server code from `genai/` was dropped here as TODO
markers — it does not translate to Astro's static-output model.

## Source files in `genai/` that were not ported

- `genai/src/server.ts` — Cloudflare Worker entry that wraps
  `@tanstack/react-start/server-entry` with error normalization for h3's
  swallowed-throw behavior, plus a branded 500 HTML fallback.
- `genai/src/start.ts` — TanStack Start `createStart()` factory wiring an
  error middleware that catches unhandled handler throws and returns the
  branded 500 page.
- `genai/src/lib/error-capture.ts` — global `unhandledRejection` /
  `uncaughtException` capture helper used by `server.ts`.
- `genai/src/lib/error-page.ts` — HTML template for the branded 500 page
  rendered by `server.ts` and `start.ts`.
- `genai/src/router.tsx` — TanStack Router factory + QueryClient setup.
- `genai/src/routeTree.gen.ts` — generated TanStack route tree.

## TODO for Astro

- If a branded 500 page is needed, add `src/pages/500.astro` and rely on
  the deploy target's error-page convention (Pages, Workers, Netlify
  all support a static error page).
- No server middleware is required for the current static-only site.
- If interactive state from `checklist.tsx`, `questionnaire.tsx`, or the
  dashboard pages is needed, mount those as React islands (add
  `@astrojs/react`, `@astrojs/tailwind` integrations and port the
  components verbatim under `client:load` / `client:visible`).
