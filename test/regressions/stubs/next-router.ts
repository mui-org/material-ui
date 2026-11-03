// Stub for `next/router` so docs composites that import it (directly or
// transitively via `@mui/internal-core-docs/Link`) render without a Next.js
// host. Returns safe defaults; nothing in the regression bundle actually
// needs to navigate.
//
// The real `next/router` exposes the router as BOTH the default export (the
// singleton, `import Router from 'next/router'` — used by
// `MarkdownLinks.ts` for `Router.events`) and via the named `useRouter`
// hook. Mirror both so either consumer works.

const router = {
  pathname: '/',
  asPath: '/',
  route: '/',
  query: {},
  basePath: '',
  isLocaleDomain: false,
  isReady: true,
  isPreview: false,
  isFallback: false,
  push: () => Promise.resolve(true),
  replace: () => Promise.resolve(true),
  prefetch: () => Promise.resolve(),
  back: () => {},
  forward: () => {},
  reload: () => {},
  beforePopState: () => {},
  events: { on: () => {}, off: () => {}, emit: () => {} },
};

export function useRouter() {
  return router;
}

export default router;
