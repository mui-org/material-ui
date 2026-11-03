'use client';

import { useDemoController } from '@mui/internal-docs-infra/useDemoController';
import { CodeControllerContext } from '@mui/internal-docs-infra/CodeControllerContext';
import type { CodeControllerProps } from '@mui/internal-docs-infra/CodeControllerContext';

// `useDemoController` owns the controlled code, lazy-loads its live-editing engine (a
// vendored `react-runner` runtime plus a `sucrase` transpiler running off the main thread
// in a Web Worker), runs each variant's source into a live preview, and collects
// per-variant errors — returning exactly the shape `CodeControllerContext` expects. The
// lazy preview suspends until its chunk resolves; `CodeHighlighterClient` renders it under
// a `Suspense` boundary that falls back to the build-time render, so editing never blanks
// the preview. A demo reads its variant's runtime error via `useDemo().error` (surfaced by
// `DemoErrorOverlay`).
function DemoController(props: CodeControllerProps) {
  // The hook returns exactly the `CodeControllerContext` shape; cast since its `setCode`
  // is a plain setter rather than a `Dispatch<SetStateAction>`.
  const value = useDemoController();

  return (
    <CodeControllerContext.Provider value={value}>{props.children}</CodeControllerContext.Provider>
  );
}

export default DemoController;
