// Per-file source deep-link anchor helpers, shared by the live `DemoContent` and
// the eager SSR `DemoContentLoading` skeleton so both emit identical ids without
// coupling. The ids are FILENAME-based (e.g. `ComboBox.tsx`, `top100Films.ts`) to
// match the existing/shipped slugs — not the demo's anchor slug.

// Each file's base name gets an anchor per extension. A file's existing slugs are
// its own extension plus its JS-transform extension (`.tsx`+`.jsx`, `.ts`+`.js`);
// the other two are emitted as fallbacks so `#<File>.ts` / `#<File>.jsx` resolve
// too.
const SOURCE_ANCHOR_EXTENSIONS = ['tsx', 'ts', 'js', 'jsx'] as const;

/** Strip a file's extension, leaving its base name (e.g. `ComboBox.tsx` -> `ComboBox`). */
export function fileBaseName(fileName: string): string {
  const dotIndex = fileName.lastIndexOf('.');
  return dotIndex === -1 ? fileName : fileName.slice(0, dotIndex);
}

/**
 * The demo's identity anchor id for `#`-deep links: the root file's base name
 * with its extension chopped (e.g. `ContainedButtons.tsx` -> `ContainedButtons`),
 * matching the existing/shipped slugs in `master`. Returns `undefined` when
 * there's no root file to derive an id from.
 */
export function demoAnchorId(rootFileName: string | undefined): string | undefined {
  return rootFileName ? fileBaseName(rootFileName) : undefined;
}

/** All `<base>.{tsx,ts,js,jsx}` deep-link anchor ids for the given files, deduped. */
export function fileSourceAnchorIds(fileNames: Iterable<string>): string[] {
  const ids = new Set<string>();
  for (const fileName of fileNames) {
    const base = fileBaseName(fileName);
    for (const extension of SOURCE_ANCHOR_EXTENSIONS) {
      ids.add(`${base}.${extension}`);
    }
  }
  return Array.from(ids);
}

/** Language a source-anchor id selects: `.js`/`.jsx` -> JS, `.tsx`/`.ts` -> TS. */
export function sourceAnchorTransform(id: string): 'js' | null {
  return id.endsWith('.js') || id.endsWith('.jsx') ? 'js' : null;
}

// The JS transform rewrites a TS source name to its JS twin: `.tsx` -> `.jsx`,
// `.ts` -> `.js`. Used to build the copy-link JS anchor for the root file.
export function toJavascriptFileName(fileName: string): string {
  if (fileName.endsWith('.tsx')) {
    return `${fileName.slice(0, -4)}.jsx`;
  }
  if (fileName.endsWith('.ts')) {
    return `${fileName.slice(0, -3)}.js`;
  }
  return fileName;
}
