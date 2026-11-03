/**
 * LLM Documentation Generator
 *
 * This script generates LLM-optimized documentation by processing MUI component markdown files
 * and non-component documentation files to create comprehensive, standalone documentation.
 *
 * ## Main Workflow:
 *
 * 1. **Component Processing**:
 *    - Discovers all components using the API docs builder infrastructure
 *    - For each component, finds its markdown documentation and API JSON
 *    - Processes markdown by replacing `{{"demo": "filename.js"}}` syntax with actual code snippets
 *    - Appends API documentation (props, slots, CSS classes) to the markdown
 *    - Outputs to files like `material-ui/react-accordion.md`
 *
 * 2. **Non-Component Processing** (optional):
 *    - Processes markdown files from specified folders (e.g., `system`, `material/customization`)
 *    - Applies the same demo replacement logic
 *    - Uses URL transformation logic to maintain consistent paths with components
 *    - Outputs to files like `system/borders.md`, `material-ui/customization/color.md`
 *
 * 3. **Index Generation** (llms.txt):
 *    - Generates `llms.txt` index files for each top-level directory
 *    - Groups files by category (components, customization, getting-started, etc.)
 *    - Creates markdown-formatted lists with relative paths and descriptions
 *    - Outputs to files like `material-ui/llms.txt`, `system/llms.txt`
 *
 * ## Key Features:
 *
 * - **Demo Replacement**: Converts `{{"demo": "filename.js"}}` to actual JSX/TSX code snippets
 * - **API Integration**: Automatically includes component API documentation (props, slots, CSS)
 * - **Reusable**: Accepts project settings via CLI to work across different repositories
 * - **Filtering**: Supports grep patterns to process specific components/files
 * - **Path Consistency**: Uses existing URL transformation logic for consistent output structure
 * - **Auto-indexing**: Generates llms.txt files with categorized documentation listings
 *
 * ## Usage Examples:
 *
 * ```bash
 * # Process all Material UI components
 * pnpm tsx scripts/buildLlmsDocs/index.ts --projectSettings ./packages-internal/api-docs-builder-core/materialUi/projectSettings.ts
 *
 * # Process specific components with non-component docs
 * pnpm tsx scripts/buildLlmsDocs/index.ts \
 *   --projectSettings ./packages-internal/api-docs-builder-core/materialUi/projectSettings.ts \
 *   --nonComponentFolders system material/customization \
 *   --grep "Button|borders"
 * ```
 *
 * ## Output Structure:
 *
 * - **Components**: `material-ui/react-{component}.md` (e.g., `material-ui/react-button.md`)
 * - **Customization**: `material-ui/customization/{topic}.md` (e.g., `material-ui/customization/color.md`)
 * - **Getting Started**: `material-ui/getting-started/{topic}.md` (e.g., `material-ui/getting-started/installation.md`)
 * - **Index Files**: `{directory}/llms.txt` (e.g., `material-ui/llms.txt`, `system/llms.txt`)
 */

import * as fs from 'fs';
import * as path from 'path';
import { pathToFileURL } from 'node:url';
import type { ArgumentsCamelCase } from 'yargs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { kebabCase } from 'es-toolkit/string';
import { processMarkdownFile, processApiFile } from '@mui/internal-scripts/generate-llms-txt';
import type { ComponentInfo, ProjectSettings } from '@mui/internal-api-docs-builder';
import { findComponents, findPagesMarkdown } from '@mui/internal-api-docs-builder';
import { getHeaders } from '@mui/internal-markdown';

// Determine the host based on environment variables
let ORIGIN: string | undefined = 'https://mui.com';

if (process.env.CONTEXT === 'deploy-preview') {
  // ref: https://docs.netlify.com/build/configure-builds/environment-variables/
  ORIGIN = process.env.DEPLOY_PRIME_URL;
} else if (
  process.env.CONTEXT === 'branch-deploy' &&
  (process.env.HEAD === 'master' || process.env.HEAD === 'next' || process.env.HEAD?.match(/^v\d/))
) {
  if (process.env.HEAD === 'master') {
    ORIGIN = process.env.DEPLOY_PRIME_URL;
  } else {
    // https://next.mui.com, https://v6.mui.com, etc.
    ORIGIN = `https://${process.env.HEAD.replace('.x', '')}.mui.com`;
  }
}

interface ComponentDocInfo {
  name: string;
  componentInfo: ComponentInfo;
  demos: Array<{ demoPageTitle: string; demoPathname: string }>;
  markdownPath?: string;
  apiJsonPath?: string;
}

interface GeneratedFile {
  outputPath: string;
  title: string;
  description: string;
  originalMarkdownPath: string;
  category: string;
  orderIndex?: number; // Track the order for non-component folders
}

type CommandOptions = {
  grep?: string;
  outputDir?: string;
  projectSettings?: string;
  includeExtraFiles?: boolean;
};

/**
 * Find all components using the API docs builder infrastructure
 */
async function findComponentsToProcess(
  projectSettings: ProjectSettings,
  grep: RegExp | null,
): Promise<ComponentDocInfo[]> {
  const components: ComponentDocInfo[] = [];

  // Iterate through TypeScript projects, using the same logic as buildApi.ts
  for (const project of projectSettings.typeScriptProjects) {
    const projectComponents = findComponents(path.join(project.rootPath, 'src')).filter(
      (component) => {
        if (projectSettings.skipComponent(component.filename)) {
          return false;
        }

        if (grep === null) {
          return true;
        }

        return grep.test(component.filename);
      },
    );

    for (const component of projectComponents) {
      // Get component info using the API docs builder
      const componentInfo = projectSettings.getComponentInfo(component.filename);

      // Skip if component should be skipped (internal, etc.)
      const fileInfo = componentInfo.readFile();
      if (fileInfo.shouldSkip) {
        continue;
      }

      // Get demos for this component
      const demos = componentInfo.getDemos();

      // Skip if no demos found (likely not a public component)
      if (demos.length === 0) {
        continue;
      }

      // Get API JSON path
      const apiJsonPath = path.join(
        componentInfo.apiPagesDirectory,
        `${path.basename(componentInfo.apiPathname)}.json`,
      );

      const primaryDemo = demos.find(
        (demo) =>
          demo.demoPathname.toLowerCase().includes(`/${kebabCase(componentInfo.name)}/`) ||
          demo.demoPathname.toLowerCase().includes(`/react-${kebabCase(componentInfo.name)}/`),
      );

      const demoToUse = primaryDemo || demos[0];
      const markdownPathToUse = demoToUse ? demoToUse.filePath : undefined;

      components.push({
        name: componentInfo.name,
        componentInfo,
        demos: primaryDemo ? [primaryDemo] : demos,
        markdownPath: markdownPathToUse,
        apiJsonPath: fs.existsSync(apiJsonPath) ? apiJsonPath : undefined,
      });
    }
  }

  return components;
}

/**
 * Extract title and description from markdown content
 */
function extractMarkdownInfo(markdownPath: string): { title: string; description: string } {
  try {
    const content = fs.readFileSync(markdownPath, 'utf-8');
    const headers = getHeaders(content);

    // Get title from frontmatter or first h1
    const title =
      headers.title || content.match(/^# (.+)$/m)?.[1] || path.basename(markdownPath, '.md');

    // Extract description from the first paragraph with class="description"
    const descriptionMatch = content.match(/<p class="description">([^<]+)<\/p>/);
    let description = '';

    if (descriptionMatch) {
      description = descriptionMatch[1].trim();
    } else {
      // Fallback: get first paragraph after title (excluding headers)
      const paragraphMatch = content.match(/^# .+\n\n(?!#)(.+?)(?:\n\n|$)/m);
      if (paragraphMatch && !paragraphMatch[1].startsWith('#')) {
        description = paragraphMatch[1].trim();
      }
    }

    return { title, description };
  } catch (error) {
    return {
      title: path.basename(markdownPath, '.md'),
      description: '',
    };
  }
}

/**
 * Find all non-component markdown files from specified folders
 */
function findNonComponentMarkdownFiles(
  projectSettings: ProjectSettings,
  grep: RegExp | null,
): Array<{ markdownPath: string; outputPath: string }> {
  if (!projectSettings.pagesManifestPath) {
    return [];
  }
  const pagesContent = fs.readFileSync(projectSettings.pagesManifestPath, 'utf-8');

  // Extract all pathname strings using regex
  const pathnameRegex = /pathname:\s*['"`]([^'"`]+)['"`]/g;
  const matches = Array.from(pagesContent.matchAll(pathnameRegex));

  // Get all markdown files using the existing findPagesMarkdown utility
  const allMarkdownFiles = findPagesMarkdown();

  const files: Array<{ markdownPath: string; outputPath: string }> = [];

  for (const match of matches) {
    const pathname = match[1];
    const parsedPathname = pathname
      .replace('/material-ui/', '/material/')
      .replace('/react-', '/components/');
    // Apply grep filter if specified
    if (grep) {
      const fileName = path.basename(parsedPathname);
      if (!grep.test(fileName) && !grep.test(parsedPathname)) {
        continue;
      }
    }

    const ignoredPaths = [
      '/material-ui/experimental-api/',
      '/material-ui/migration/migrating-to-pigment-css',
      '/material-ui/about-the-lab',
    ];

    // Filter out external links and special patterns
    if (
      pathname.startsWith('/material-ui/') &&
      !ignoredPaths.some((ignored) => pathname.startsWith(ignored))
    ) {
      // findPagesMarkdown returns the file's parent directory as its pathname. Match the
      // filename too to avoid collisions between files in the same directory (for example,
      // upgrade-to-v7.md and upgrade-to-native-color.md).
      const lastSegment = path.posix.basename(parsedPathname);
      const findPage = (expectedPathname: string) =>
        allMarkdownFiles.find((page) => {
          const fileBasename = path.basename(page.filename).replace(/\.mdx?$/, '');
          return fileBasename === lastSegment && page.pathname === expectedPathname;
        });

      // First support the directory-named layout, where nextjs/nextjs.md has the pathname
      // /material/integrations/nextjs. Then support the sibling-file layout, where
      // css-theme-variables/overview.md has the pathname /material/customization/css-theme-variables.
      const page = findPage(parsedPathname) ?? findPage(path.posix.dirname(parsedPathname));

      if (page) {
        files.push({
          markdownPath: page.filename,
          outputPath: `${pathname.startsWith('/') ? pathname.slice(1) : pathname}.md`,
        });
      }
    }
  }

  return files;
}

/**
 * Process a single component
 */
async function processComponent(
  component: ComponentDocInfo,
  options: { includeExtraFiles?: boolean } = {},
): Promise<string | null> {
  // Processing component: ${component.name}

  // Skip if no markdown file found
  if (!component.markdownPath) {
    console.error(`Warning: No markdown file found for component: ${component.name}`);
    return null;
  }

  // Process the markdown file with demo replacement
  let processedMarkdown = await processMarkdownFile(component.markdownPath, options);

  // Read the frontmatter to get all components listed in this markdown file
  const markdownContent = fs.readFileSync(component.markdownPath, 'utf-8');
  const headers = getHeaders(markdownContent);
  const componentsInPage = headers.components || [];

  // Add API sections for all components listed in the frontmatter
  if (componentsInPage.length > 0) {
    for (const componentName of componentsInPage) {
      // Construct the API JSON path based on the project settings
      const apiJsonPath = path.join(
        component.componentInfo.apiPagesDirectory,
        `${kebabCase(componentName)}.json`,
      );

      const apiMarkdown = processApiFile(apiJsonPath, { origin: ORIGIN });
      processedMarkdown += `\n\n${apiMarkdown}`;
    }
  } else if (component.apiJsonPath) {
    const apiMarkdown = processApiFile(component.apiJsonPath, { origin: ORIGIN });
    processedMarkdown += `\n\n${apiMarkdown}`;
  }

  return processedMarkdown;
}

/**
 * Convert kebab-case to Title Case
 */
function toTitleCase(kebabCaseStr: string): string {
  return kebabCaseStr
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Wrap inline HTML tags (e.g. `<button>`) in backticks so they render as code
 * in markdown instead of being interpreted as HTML.
 */
function inlineCodeHtmlTags(text: string): string {
  return text.replace(/<\/?[a-zA-Z][^>]*>/g, '`$&`');
}

/**
 * Generate llms.txt content for a specific directory.
 *
 * When `relative` is true, links are emitted as relative paths (e.g.
 * `./react-button.md`) instead of absolute URLs, so the file can be shipped
 * inside the package and browsed offline. This is used to generate `index.md`.
 */
function generateLlmsTxt(
  generatedFiles: GeneratedFile[],
  projectName: string,
  baseDir: string,
  origin?: string,
  relative = false,
): string {
  // Group files by category
  const groupedByCategory: Record<string, GeneratedFile[]> = {};

  for (const file of generatedFiles) {
    const category = file.category;
    if (!groupedByCategory[category]) {
      groupedByCategory[category] = [];
    }
    groupedByCategory[category].push(file);
  }

  // Generate content
  let content = `# ${projectName}\n\n`;
  content += `This is the documentation for the ${projectName} package.\n`;
  content += `It contains comprehensive guides, components, and utilities for building user interfaces.\n\n`;

  // Add sections for each category
  // Sort categories to ensure components appear first, then by orderIndex for non-component folders
  const sortedCategories = Object.keys(groupedByCategory).sort((a, b) => {
    if (a === 'components') {
      return -1;
    }
    if (b === 'components') {
      return 1;
    }

    // For non-component categories, check if they have orderIndex
    const filesA = groupedByCategory[a];
    const filesB = groupedByCategory[b];
    const orderIndexA = filesA[0]?.orderIndex ?? Number.MAX_SAFE_INTEGER;
    const orderIndexB = filesB[0]?.orderIndex ?? Number.MAX_SAFE_INTEGER;

    if (orderIndexA !== orderIndexB) {
      return orderIndexA - orderIndexB;
    }

    return a.localeCompare(b);
  });

  for (const category of sortedCategories) {
    const files = groupedByCategory[category];
    if (files.length === 0) {
      continue;
    }

    const sectionTitle = toTitleCase(category);
    content += `## ${sectionTitle}\n\n`;

    // Sort files by title (components) or maintain original order (non-components)
    if (category === 'components') {
      files.sort((a, b) => a.title.localeCompare(b.title));
    }
    // Non-component files are already in the order they were discovered

    for (const file of files) {
      // Path of the file relative to baseDir, e.g. `react-button.md` or
      // `customization/color.md`.
      const pathWithinBaseDir = file.outputPath.startsWith(`${baseDir}/`)
        ? file.outputPath.substring(baseDir.length + 1)
        : file.outputPath;
      let url;
      if (relative) {
        // Relative link to a sibling file, so the index can be browsed from
        // within the shipped `docs/` folder.
        url = `./${pathWithinBaseDir}`;
      } else {
        const absolutePath = file.outputPath.startsWith(`${baseDir}/`)
          ? `/${baseDir}/${pathWithinBaseDir}`
          : `/${pathWithinBaseDir}`;
        url = origin ? new URL(absolutePath, origin).href : absolutePath;
      }
      content += `- [${file.title}](${url})`;
      if (file.description) {
        content += `: ${inlineCodeHtmlTags(file.description)}`;
      }
      content += '\n';
    }
    content += '\n';
  }

  return content.trim();
}

/**
 * Deletes the markdown and txt files a previous run wrote anywhere under `dir`.
 * Files of any other type are kept, and emptied directories stay behind.
 */
function removeGeneratedFiles(dir: string): void {
  for (const entry of fs.globSync(['**/*.md', '**/*.txt'], { cwd: dir })) {
    fs.rmSync(path.join(dir, entry));
  }
}

/**
 * Main build function
 */
async function buildLlmsDocs(argv: ArgumentsCamelCase<CommandOptions>): Promise<void> {
  const grep = argv.grep ? new RegExp(argv.grep) : null;
  const outputDir = argv.outputDir || path.join(process.cwd(), 'docs/public');
  const demoOptions = { includeExtraFiles: argv.includeExtraFiles ?? false };

  if (!grep) {
    removeGeneratedFiles(path.join(outputDir, 'material-ui'));
  }

  // Load project settings from the specified path
  if (!argv.projectSettings) {
    throw new Error('--projectSettings is required');
  }

  let projectSettings: ProjectSettings;
  try {
    const settingsPath = path.resolve(argv.projectSettings);
    const settingsUrl = pathToFileURL(settingsPath).href;
    const settingsModule = await import(settingsUrl);
    projectSettings = settingsModule.projectSettings || settingsModule.default || settingsModule;
  } catch (error) {
    throw new Error(`Failed to load project settings from ${argv.projectSettings}: ${error}`);
  }

  // Find all components
  const components = await findComponentsToProcess(projectSettings, grep);

  // Found ${components.length} components to process

  // Find non-component markdown files if specified in project settings
  const nonComponentFolders = (projectSettings as any).nonComponentFolders;
  const nonComponentFiles = findNonComponentMarkdownFiles(projectSettings, grep);

  // Track generated files for llms.txt
  const generatedFiles: GeneratedFile[] = [];
  const generatedComponentRecord: Record<string, boolean> = {};

  // Process each component
  let processedCount = 0;
  for (const component of components) {
    // eslint-disable-next-line no-await-in-loop
    const processedMarkdown = await processComponent(component, demoOptions);

    if (!processedMarkdown) {
      continue;
    }

    // Use the component's demo pathname to create the output structure
    // e.g., /material-ui/react-accordion/ -> material-ui/react-accordion.md
    const outputFileName = component.demos[0]
      ? `${component.demos[0].demoPathname.replace(/^\//, '').replace(/\/$/, '')}.md`
      : `${component.componentInfo.apiPathname.replace(/^\//, '').replace(/\/$/, '')}.md`;

    const outputPath = path.join(outputDir, outputFileName);

    // Check if this file has already been generated (avoid duplicates for components that share the same markdown file)
    const existingFile = generatedFiles.find((f) => f.outputPath === outputFileName);
    if (!existingFile) {
      // Ensure the directory exists
      const outputDirPath = path.dirname(outputPath);
      if (!fs.existsSync(outputDirPath)) {
        fs.mkdirSync(outputDirPath, { recursive: true });
      }

      fs.writeFileSync(outputPath, processedMarkdown, 'utf-8');
      // ✓ Generated: ${outputFileName}
      processedCount += 1;

      // Track this file for llms.txt
      if (component.markdownPath) {
        const { title, description } = extractMarkdownInfo(component.markdownPath);
        generatedFiles.push({
          outputPath: outputFileName,
          title,
          description,
          originalMarkdownPath: component.markdownPath,
          category: 'components',
        });
        generatedComponentRecord[outputFileName] = true;
      }
    }
  }

  // Process non-component markdown files
  for (const file of nonComponentFiles) {
    if (generatedComponentRecord[file.outputPath]) {
      // Skip files that have already been generated as component docs
      continue;
    }
    // Processing non-component file: ${path.relative(process.cwd(), file.markdownPath)}

    // Process the markdown file with demo replacement
    // eslint-disable-next-line no-await-in-loop
    const processedMarkdown = await processMarkdownFile(file.markdownPath, demoOptions);

    const outputPath = path.join(outputDir, file.outputPath);

    // Ensure the directory exists
    const outputDirPath = path.dirname(outputPath);
    if (!fs.existsSync(outputDirPath)) {
      fs.mkdirSync(outputDirPath, { recursive: true });
    }

    fs.writeFileSync(outputPath, processedMarkdown, 'utf-8');
    // ✓ Generated: ${file.outputPath}
    processedCount += 1;

    // Track this file for llms.txt
    const { title, description } = extractMarkdownInfo(file.markdownPath);

    // Extract category from the file path
    // e.g., "material-ui/customization/color.md" -> "customization"
    // e.g., "getting-started/installation.md" -> "getting-started"
    const pathParts = file.outputPath.split('/');
    const category = pathParts.reverse()[1];

    // Find the order index based on which folder this file belongs to
    let orderIndex = -1;
    if (nonComponentFolders) {
      for (let i = 0; i < nonComponentFolders.length; i += 1) {
        if (file.markdownPath.includes(`/${nonComponentFolders[i]}/`)) {
          orderIndex = i;
          break;
        }
      }
    }

    generatedFiles.push({
      outputPath: file.outputPath,
      title,
      description,
      originalMarkdownPath: file.markdownPath,
      category,
      orderIndex,
    });
  }

  // Generate llms.txt files
  if (generatedFiles.length > 0) {
    const groupedByFirstDir: Record<string, GeneratedFile[]> = {};

    for (const file of generatedFiles) {
      const firstDir = file.outputPath.split('/')[0];
      if (!groupedByFirstDir[firstDir]) {
        groupedByFirstDir[firstDir] = [];
      }
      groupedByFirstDir[firstDir].push(file);
    }

    for (const [dirName, files] of Object.entries(groupedByFirstDir)) {
      let projectName;
      if (dirName === 'material-ui') {
        projectName = 'Material UI';
      } else if (dirName === 'system') {
        projectName = 'MUI System';
      } else {
        projectName = dirName.charAt(0).toUpperCase() + dirName.slice(1);
      }

      const llmsContent = generateLlmsTxt(files, projectName, dirName, ORIGIN)
        .replace(/Ui/g, 'UI')
        .replace(/Api/g, 'API');
      const llmsPath = path.join(outputDir, dirName, 'llms.txt');

      // Ensure directory exists
      const llmsDirPath = path.dirname(llmsPath);
      if (!fs.existsSync(llmsDirPath)) {
        fs.mkdirSync(llmsDirPath, { recursive: true });
      }

      fs.writeFileSync(llmsPath, llmsContent, 'utf-8');
      // ✓ Generated: ${dirName}/llms.txt
      processedCount += 1;

      // Generate an `index.md` with relative links so the generated docs can be
      // shipped inside the package and browsed offline (llms.txt uses absolute
      // website URLs and is a .txt, so it isn't shipped).
      const indexContent = generateLlmsTxt(files, projectName, dirName, undefined, true)
        .replace(/Ui/g, 'UI')
        .replace(/Api/g, 'API');
      const indexPath = path.join(outputDir, dirName, 'index.md');
      fs.writeFileSync(indexPath, indexContent, 'utf-8');
      // ✓ Generated: ${dirName}/index.md
      processedCount += 1;
    }
  }

  // eslint-disable-next-line no-console
  console.log(`\nCompleted! Generated ${processedCount} files in ${outputDir}`);
}

/**
 * CLI setup
 */
yargs()
  .command({
    command: '$0',
    describe: 'Generates LLM-optimized documentation for MUI components.',
    builder: (command: any) => {
      return command
        .option('grep', {
          description:
            'Only generate files for components matching the pattern. The string is treated as a RegExp.',
          type: 'string',
        })
        .option('outputDir', {
          description: 'Output directory for generated markdown files.',
          type: 'string',
          default: './docs/public',
        })
        .option('projectSettings', {
          description:
            'Path to the project settings module that exports ProjectSettings interface.',
          type: 'string',
          demandOption: true,
        })
        .option('includeExtraFiles', {
          description:
            "Include each demo's extra files (helpers) alongside its entry file, each labelled with a filename comment. Disabled by default.",
          type: 'boolean',
          default: false,
        });
    },
    handler: buildLlmsDocs,
  })
  .help()
  .strict(true)
  .version(false)
  .parse(hideBin(process.argv));
