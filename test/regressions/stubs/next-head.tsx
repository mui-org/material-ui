// `AppLayoutHead` (a sibling of the `Frame`/`Item`/`Highlighter` exports we
// import from `@mui/internal-core-docs/AppLayout`) imports `next/head` at
// module scope. Stub it defensively so the barrel evaluates cleanly even if
// Vite doesn't tree-shake `AppLayoutHead` out.

export default function Head() {
  return null;
}
