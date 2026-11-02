import * as fs from 'fs';
import * as path from 'path';
import { replaceFileComponentsWithSnippets } from './loadDemoSource';

interface DemoReplaceOptions {
  basePath?: string;
  includeTypeScript?: boolean;
  /**
   * Include each `file://` demo's extra files (helpers) alongside its entry file,
   * with a comment naming each file per block. Off by default. See `loadDemoSource`.
   */
  includeExtraFiles?: boolean;
}

/**
 * Removes {{"component": ...}} syntax from markdown content
 * @param markdownContent - The markdown content to clean
 * @returns The cleaned markdown content
 */
export function removeComponentSyntax(markdownContent: string): string {
  // Regular expression to match {{"component": "ComponentName"}} pattern
  const componentRegex = /\{\{\s*"component":\s*"[^"]+"\s*\}\}/g;
  return markdownContent.replace(componentRegex, '');
}

/**
 * Converts <p class="description"> HTML tags to plain text in markdown
 * @param markdownContent - The markdown content to clean
 * @returns The cleaned markdown content
 */
export function cleanDescriptionTags(markdownContent: string): string {
  // Replace <p class="description">...</p> with just the content
  return markdownContent.replace(/<p class="description">([^<]+)<\/p>/g, '$1');
}

/**
 * Parses markdown content and replaces demo syntax with code snippets
 * @param markdownContent - The markdown content to parse
 * @param markdownPath - The path to the markdown file (used to resolve relative demo paths)
 * @param options - Options for parsing
 * @returns The processed markdown with demo code snippets
 */
export function replaceDemoWithSnippet(
  markdownContent: string,
  markdownPath: string,
  options: DemoReplaceOptions = {},
): string {
  const { basePath = '' } = options;

  // Regular expression to match {{"demo": "filename.js"}} pattern
  const demoRegex = /\{\{\s*"demo":\s*"([^"]+)"(?:,\s*[^}]+)?\s*\}\}/g;

  return markdownContent.replace(demoRegex, (match, filename) => {
    try {
      // Extract the base filename without extension
      const baseFilename = filename.replace(/\.(js|tsx?)$/, '');

      // Get the directory of the markdown file
      const markdownDir = path.dirname(markdownPath);

      let codeSnippet = '';

      // Try to read TypeScript file before JavaScript file
      const tsPath = basePath
        ? path.join(basePath, `${baseFilename}.tsx`)
        : path.join(markdownDir, `${baseFilename}.tsx`);

      if (fs.existsSync(tsPath)) {
        const tsContent = fs.readFileSync(tsPath, 'utf-8');
        if (codeSnippet) {
          codeSnippet += '\n\n';
        }
        codeSnippet += `\`\`\`tsx\n${tsContent}\n\`\`\``;
      } else {
        // Try to read JavaScript file
        const jsPath = basePath
          ? path.join(basePath, `${baseFilename}.js`)
          : path.join(markdownDir, `${baseFilename}.js`);

        if (fs.existsSync(jsPath)) {
          const jsContent = fs.readFileSync(jsPath, 'utf-8');
          codeSnippet += `\`\`\`jsx\n${jsContent}\n\`\`\``;
        }
      }

      // If no files found, return original match
      if (!codeSnippet) {
        console.warn(`Demo file not found: ${filename}`);
        return match;
      }

      return codeSnippet;
    } catch (error) {
      console.error(`Error processing demo ${filename}:`, error);
      return match;
    }
  });
}

/**
 * Processes a markdown file and replaces demo syntax with code snippets
 * @param filePath - Path to the markdown file
 * @param options - Options for parsing
 * @returns The processed markdown content
 */
export async function processMarkdownFile(
  filePath: string,
  options: DemoReplaceOptions = {},
): Promise<string> {
  let content = fs.readFileSync(filePath, 'utf-8');
  const dir = path.dirname(filePath);

  // Set basePath relative to markdown file location if not provided
  const processOptions = {
    ...options,
    basePath: options.basePath || dir,
  };

  // First, expand `file://` demo components into their source code blocks, before
  // the remaining (non-demo) component markers are stripped below.
  content = await replaceFileComponentsWithSnippets(content, filePath, {
    includeExtraFiles: options.includeExtraFiles,
  });

  // Remove the remaining component syntax (e.g. `ComponentLinkHeader`)
  content = removeComponentSyntax(content);

  // Clean description HTML tags
  content = cleanDescriptionTags(content);

  // Then, replace demo syntax with code snippets
  return replaceDemoWithSnippet(content, filePath, processOptions);
}
