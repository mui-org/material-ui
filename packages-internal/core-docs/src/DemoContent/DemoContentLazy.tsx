'use client';

import { LazyContent } from '@mui/internal-docs-infra/CoordinatedLazy';
import type { DemoContentProps } from './DemoContent';
import { loadDemoContent } from './loadDemoContent';

/**
 * Client wrapper that code-splits the heavy `DemoContent` (the live demo
 * surface: syntax highlighter, tabs, variant bar, toolbar, export config, AI
 * hero, ...) out of the initial bundle. `LazyContent` dynamically imports it and
 * renders it once the chunk loads, so `DemoContentLoading` paints its fallback
 * while the content streams in.
 *
 * The mounted loading fallback starts the cached import alongside deferred
 * precompute; this wrapper consumes it only once the full data is ready.
 */
export default function DemoContentLazy(props: DemoContentProps) {
  return <LazyContent<DemoContentProps> content={loadDemoContent} props={props} />;
}
