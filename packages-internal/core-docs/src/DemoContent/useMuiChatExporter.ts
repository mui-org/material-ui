import * as React from 'react';
import { flattenCodeVariant, getFilenameFromVariant } from '@mui/internal-docs-infra/useDemo';
import type { ExportConfig } from '@mui/internal-docs-infra/useDemo';
import type {
  ContentProps,
  VariantCode,
  VariantExtraFiles,
} from '@mui/internal-docs-infra/CodeHighlighter/types';
import type { applyCodeTransform } from '@mui/internal-docs-infra/pipeline/loadIsomorphicCodeVariant';
import DemoContext from '../DemoContext';
import PageContext from '../PageContext';

type ApplyCodeTransform = typeof applyCodeTransform;

interface MuiChatConfig {
  baseUrl: string;
  packageName: string;
}

interface UseMuiChatExporterOptions {
  /** The full demo props — only `code` and `name` are read. */
  props: ContentProps<object>;
  /** The selected variant from `useDemo`. */
  selectedVariant: string;
  /**
   * The currently applied source transform from `useDemo` (e.g. `'js'`), or
   * `null`/`undefined` when the base (TypeScript) source is shown. The JS/TS
   * toggle is a transform — a delta applied to the source's hast — so it must
   * be applied here for the export to honor the user's preference.
   */
  selectedTransform: string | null | undefined;
  /** The fully built `ExportConfig` passed to `useDemo`. */
  exportConfig: ExportConfig;
}

/**
 * Swap an `extraFiles` key's basename for the transform's renamed filename
 * while preserving any leading directory, so a `./foo.ts` → `foo.js` rename
 * doesn't relocate the file. The transform's `fileName` is a basename.
 */
function renameKeyBasename(originalKey: string, transformFileName: string): string {
  const slash = originalKey.lastIndexOf('/');
  const directory = slash >= 0 ? originalKey.slice(0, slash + 1) : '';
  const base = transformFileName.slice(transformFileName.lastIndexOf('/') + 1);
  return `${directory}${base}`;
}

/**
 * Apply a source transform (the JS/TS delta) to every file in a variant,
 * returning a new `VariantCode` whose sources and filenames reflect the
 * transform. Mirrors `useCode`'s transform engine: each file is patched only
 * when it carries a manifest entry for `transformKey`, otherwise it passes
 * through untouched. The result is fed back through the same
 * `flattenCodeVariant` path so path resolution and decoding stay uniform with
 * the untransformed case.
 */
export function applyVariantTransform(
  variant: VariantCode,
  transformKey: string,
  applyCodeTransform: ApplyCodeTransform,
): VariantCode {
  const result: VariantCode = { ...variant };

  const variantTransforms = variant.transforms;
  if (variant.source !== undefined && variant.fileName && variantTransforms?.[transformKey]) {
    try {
      result.source = applyCodeTransform(
        variant.source,
        variantTransforms,
        transformKey,
        variant.fallback,
      );
      const renamed = variantTransforms[transformKey].fileName;
      if (renamed) {
        result.fileName = renamed;
      }
    } catch {
      // Keep the original source/filename if the patch fails.
    }
  }

  if (variant.extraFiles) {
    const extraFiles: VariantExtraFiles = {};
    for (const [key, fileData] of Object.entries(variant.extraFiles)) {
      const fileTransforms = typeof fileData === 'object' ? fileData.transforms : undefined;
      if (
        typeof fileData === 'object' &&
        fileData.source !== undefined &&
        fileTransforms?.[transformKey]
      ) {
        try {
          const transformedSource = applyCodeTransform(
            fileData.source,
            fileTransforms,
            transformKey,
            fileData.fallback,
          );
          const renamed = fileTransforms[transformKey].fileName;
          const newKey = renamed ? renameKeyBasename(key, renamed) : key;
          // Drop the now-stale manifest, `relativeUrl`, and `path` so
          // `flattenCodeVariant` recomputes the path from the (renamed) key.
          const { transforms, relativeUrl, path, ...rest } = fileData;
          extraFiles[newKey in extraFiles ? key : newKey] = {
            ...rest,
            source: transformedSource,
          };
        } catch {
          extraFiles[key] = fileData;
        }
      } else {
        extraFiles[key] = fileData;
      }
    }
    result.extraFiles = extraFiles;
  }

  // The manifest referenced the pre-transform sources; drop it.
  delete result.transforms;
  return result;
}

/**
 * Build the MUI Chat "open in chat" handler.
 *
 * MUI Chat is gated on (a) an API base URL being configured at build time
 * (`MUI_CHAT_API_BASE_URL`), (b) the current page's `productId` being included
 * in `MUI_CHAT_SCOPES`, and (c) the surrounding docs context providing a
 * `primaryPackage` via `DemoContext`. When any of these conditions is not met
 * the hook returns `undefined`, which makes the toolbar button render nothing.
 *
 * The handler itself is built entirely in userspace from the public
 * `flattenCodeVariant` + `applyCodeTransform` helpers and the currently
 * selected variant/transform — the docs-infra package stays unaware of MUI
 * Chat.
 */
export function useMuiChatExporter(
  options: UseMuiChatExporterOptions,
): (() => Promise<void>) | undefined {
  const { props, selectedVariant, selectedTransform, exportConfig } = options;
  const csbContext = React.useContext(DemoContext);
  const csbConfig = csbContext?.csb;
  const pageContext = React.useContext(PageContext);

  const muiChatConfig = React.useMemo<MuiChatConfig | undefined>(() => {
    const baseUrl = process.env.MUI_CHAT_API_BASE_URL;
    const scopes = process.env.MUI_CHAT_SCOPES;
    if (!baseUrl || !scopes || !pageContext?.productId) {
      return undefined;
    }
    if (!scopes.split(',').includes(pageContext.productId)) {
      return undefined;
    }
    if (!csbConfig?.primaryPackage) {
      return undefined;
    }
    return {
      baseUrl,
      packageName: csbConfig.primaryPackage,
    };
  }, [csbConfig?.primaryPackage, pageContext?.productId]);

  return React.useMemo(() => {
    if (!muiChatConfig) {
      return undefined;
    }
    return async () => {
      const variantCode = props.code?.[selectedVariant];
      if (!variantCode || typeof variantCode === 'string') {
        throw new Error('No valid variant code available for MUI Chat');
      }
      const title = props.name || 'Demo';
      const description = `${title} demo`;

      // Honor the JS/TS toggle. It's a source transform (a delta applied to the
      // source's hast), so the raw variant always holds the base (TypeScript)
      // source — without applying the transform a JS selection would still ship
      // TS. The applier statically pulls `jsondiffpatch`, so load it lazily on
      // click to keep it out of the demo bundle (matching `useCode`'s lazy
      // transform engine).
      let sourceVariant = variantCode;
      if (selectedTransform) {
        const { applyCodeTransform } =
          await import('@mui/internal-docs-infra/pipeline/loadIsomorphicCodeVariant');
        sourceVariant = applyVariantTransform(variantCode, selectedTransform, applyCodeTransform);
      }

      // Send only the demo's own source files. MUI Chat scaffolds the
      // surrounding project (package.json, entrypoint, HTML, build config)
      // itself, so flatten the variant instead of running the full
      // `exportVariant` and shipping every generated file.
      const flattenedFiles = flattenCodeVariant(sourceVariant);
      const entryFileName = getFilenameFromVariant(sourceVariant);

      const files = Object.entries(flattenedFiles).map(([path, fileData]) => {
        const isEntry =
          entryFileName !== undefined &&
          (path === entryFileName || path.endsWith(`/${entryFileName}`));
        return {
          path,
          content: fileData.source,
          ...(isEntry ? { isEntry: true } : null),
        };
      });

      // Resolve the primary package version straight from the export config so
      // MUI Chat scaffolds against the same version the sandbox would, without
      // generating a `package.json` just to read it back.
      const packageVersion =
        exportConfig.resolveDependencies?.(muiChatConfig.packageName)?.[
          muiChatConfig.packageName
        ] ??
        exportConfig.versions?.[muiChatConfig.packageName] ??
        'latest';

      const response = await fetch(`${muiChatConfig.baseUrl}/v1/public/chat/open`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: title,
          description,
          files,
          type: 'mui-docs',
          package: { name: muiChatConfig.packageName, version: packageVersion },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to open in MUI Chat');
      }

      const data = (await response.json()) as { nextUrl?: string };
      if (!data.nextUrl) {
        throw new Error('MUI Chat response missing `nextUrl`');
      }
      window.open(data.nextUrl, '_blank');
    };
  }, [muiChatConfig, exportConfig, selectedVariant, selectedTransform, props.code, props.name]);
}
