import * as path from 'path';
import { pathToFileURL } from 'url';
import { loadServerCodeMeta } from '@mui/internal-docs-infra/pipeline/loadServerCodeMeta';
import {
  loadIsomorphicCodeVariant,
  flattenCodeVariant,
} from '@mui/internal-docs-infra/pipeline/loadIsomorphicCodeVariant';
import { createLoadServerCodeSource } from '@mui/internal-docs-infra/pipeline/loadServerCodeSource';

// Emphasis annotation comments (`// @focus-start`, `// @highlight`, `// @padding 2`,
// …) drive the live code-highlighter; they are noise in the static source shown
// to LLMs, so the source loader strips any comment starting with these prefixes.
const EMPHASIS_COMMENT_PREFIXES = ['@focus', '@highlight', '@padding'];

export interface LoadDemoSourceOptions {
  /**
   * Include the demo's extra files (helpers imported by the entry file) alongside
   * the main file. When enabled, each block is prefixed with a comment naming the
   * file so the files can be told apart. Off by default — the output is then just
   * the entry file's source, with no filename comment.
   */
  includeExtraFiles?: boolean;
}

/**
 * Maps a file path to the language token used for its fenced code block.
 */
function getLanguage(filePath: string): string {
  return path.extname(filePath).slice(1).toLowerCase() || 'tsx';
}

/**
 * Loads the source files of a `file://` demo and returns them as a markdown
 * string of fenced code blocks — one block per file, prefixed with the file name.
 *
 * Demos are referenced from markdown with a `{{"component": "file://./demos/<name>/index.ts"}}`
 * marker. The index file is a `createDemo(...)` call; the `@mui/internal-docs-infra`
 * server pipeline resolves the variants declared there (`loadServerCodeMeta`),
 * loads each variant's source (`loadIsomorphicCodeVariant`), and flattens it into
 * its individual files (`flattenCodeVariant`). This mirrors how the old demos
 * showed their code, generated statically for the LLM documentation.
 */
export async function loadDemoSource(
  markdownDir: string,
  componentUrl: string,
  options: LoadDemoSourceOptions = {},
): Promise<string> {
  const { includeExtraFiles = false } = options;

  const relative = componentUrl.slice('file://'.length);
  if (!relative.startsWith('./') && !relative.startsWith('../')) {
    throw new Error(
      `Unsupported "component" URL: "${componentUrl}". ` +
        `Only relative file URLs are supported (e.g. "file://./demos/simple/index.ts").`,
    );
  }

  const loadSource = createLoadServerCodeSource({
    removeCommentsWithPrefix: EMPHASIS_COMMENT_PREFIXES,
  });

  // The marker points directly at the demo's entry file (e.g. `index.ts`), so it
  // is read as-is — `loadServerCodeMeta` parses the `createDemo` call there and
  // resolves the variant source paths itself. (The reference demo-processor used
  // `resolveModulePathWithFs` only because its input was a directory.)
  const demoUrl = pathToFileURL(path.resolve(markdownDir, relative)).href;
  const codeMeta = await loadServerCodeMeta(demoUrl);

  const variantNames = Object.keys(codeMeta);
  if (variantNames.length === 0) {
    throw new Error(`No code variants found in demo at "${demoUrl}".`);
  }

  // Variants load in parallel; each resolves to its flattened files map.
  const variantFiles = await Promise.all(
    variantNames.map(async (variantName) => {
      const variant = codeMeta[variantName];
      if (!variant) {
        return {};
      }
      const variantSourceUrl = typeof variant === 'string' ? variant : variant.url;

      const { code: variantCode } = await loadIsomorphicCodeVariant(
        variantSourceUrl,
        variantName,
        variant,
        { loadSource, disableParsing: true },
      );

      return flattenCodeVariant(variantCode);
    }),
  );

  // Most demos have a single `Default` variant; de-duplicate shared files (e.g. a
  // helper imported by several variants) so each file is shown only once.
  const seen = new Set<string>();
  const blocks: string[] = [];
  for (const flattenedFiles of variantFiles) {
    // The entry file comes first; extra files (helpers) follow. Without
    // `includeExtraFiles`, show only the entry file and omit the filename comment.
    const entries = Object.entries(flattenedFiles).filter(([, fileData]) => !fileData.metadata);
    const filesToShow = includeExtraFiles ? entries : entries.slice(0, 1);
    for (const [filePath, fileData] of filesToShow) {
      if (seen.has(filePath)) {
        continue;
      }
      seen.add(filePath);
      const source = fileData.source.replace(/\n$/, '');
      const header = includeExtraFiles ? `/* ${filePath} */\n` : '';
      blocks.push(`\`\`\`${getLanguage(filePath)}\n${header}${source}\n\`\`\``);
    }
  }

  if (blocks.length === 0) {
    throw new Error(`No source files found for demo at "${demoUrl}".`);
  }

  return blocks.join('\n\n');
}

// Matches `{{"component": "file://…"}}` markers, with or without trailing options
// (e.g. `, "bg": true`). Captures the `file://` URL.
const fileComponentRegex = /\{\{\s*"component":\s*"(file:\/\/[^"]+)"(?:,\s*[^}]+)?\s*\}\}/g;

/**
 * Replaces every `{{"component": "file://…"}}` marker in the markdown with the
 * referenced demo's source code blocks. Markers that fail to load are dropped
 * (with a warning) so a single broken demo never leaves a raw marker — or aborts
 * the whole generation.
 *
 * @param markdownContent - The markdown content to process
 * @param markdownPath - The path to the markdown file (resolves relative demo paths)
 */
export async function replaceFileComponentsWithSnippets(
  markdownContent: string,
  markdownPath: string,
  options: LoadDemoSourceOptions = {},
): Promise<string> {
  const matches = Array.from(markdownContent.matchAll(fileComponentRegex));
  if (matches.length === 0) {
    return markdownContent;
  }

  const markdownDir = path.dirname(markdownPath);
  const snippets = await Promise.all(
    matches.map(async (match) => {
      const componentUrl = match[1];
      try {
        return await loadDemoSource(markdownDir, componentUrl, options);
      } catch (error) {
        console.warn(
          `Failed to load demo source for "${componentUrl}": ${(error as Error).message}`,
        );
        return '';
      }
    }),
  );

  // Rebuild by index so duplicate markers each get their own snippet.
  let result = '';
  let lastIndex = 0;
  matches.forEach((match, index) => {
    result += markdownContent.slice(lastIndex, match.index);
    result += snippets[index];
    lastIndex = (match.index ?? 0) + match[0].length;
  });
  result += markdownContent.slice(lastIndex);
  return result;
}
