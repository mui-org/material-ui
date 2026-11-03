interface TableOfContentsEntry {
  children: TableOfContentsEntry[];
  hash: string;
  level: number;
  text: string;
}

export function createRender(context: {
  headingHashes?: Record<string, string>;
  toc?: TableOfContentsEntry[];
  location?: string[];
  userLanguage?: string;
  ignoreLanguagePages?: (path: string) => boolean;
  options: object;
}): (markdown: string) => string;

export interface MarkdownHeaders {
  packageName?: string;
  productId: string;
  githubLabel?: string;
  waiAria?: string;
  materialDesign?: string;
  components: string[];
  hooks?: string[];
  slug?: string;
  title?: string;
  description?: string;
  image?: string;
  tags?: string[];
  authors?: string[];
  date?: string;
  githubSource?: string;
}

export function getHeaders(markdown: string): MarkdownHeaders;

export function getTitle(markdown: string): string;

export function renderMarkdown(markdown: string): string;
