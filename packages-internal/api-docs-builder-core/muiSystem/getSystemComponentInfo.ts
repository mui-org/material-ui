import fs from 'fs';
import path from 'path';
import { kebabCase } from 'es-toolkit/string';
import { getHeaders, getTitle } from '@mui/internal-markdown';
import type { ComponentInfo } from '@mui/internal-api-docs-builder';
import {
  extractPackageFile,
  getMuiName,
  parseFile,
  fixPathname,
  findPagesMarkdown,
} from '@mui/internal-api-docs-builder';

const migratedBaseComponents = [
  'Badge',
  'Button',
  'ClickAwayListener',
  'FocusTrap',
  'Input',
  'MenuItem',
  'Menu',
  'Modal',
  'NoSsr',
  'OptionGroup',
  'Option',
  'Popper',
  'Portal',
  'Select',
  'Slider',
  'Switch',
  'TablePagination',
  'TabPanel',
  'TabsList',
  'Tabs',
  'Tab',
];

export function getSystemComponentInfo(filename: string): ComponentInfo {
  const { name } = extractPackageFile(filename);
  let srcInfo: null | ReturnType<ComponentInfo['readFile']> = null;
  if (!name) {
    throw new Error(`Could not find the component name from: ${filename}`);
  }
  return {
    filename,
    name,
    muiName: getMuiName(name),
    apiPathname: `/system/api/${kebabCase(name)}/`,
    apiPagesDirectory: path.join(process.cwd(), `docs/pages/system/api`),
    isSystemComponent: true,
    readFile: () => {
      srcInfo = parseFile(filename);
      return srcInfo;
    },
    getInheritance() {
      return null;
    },
    getDemos: () => {
      const allMarkdowns = findPagesMarkdown()
        .filter((markdown) => {
          if (migratedBaseComponents.some((component) => filename.includes(component))) {
            return markdown.filename.match(/[\\/]data[\\/]system[\\/]/);
          }
          return true;
        })
        .map((markdown) => {
          const markdownContent = fs.readFileSync(markdown.filename, 'utf8');
          const markdownHeaders = getHeaders(markdownContent);

          return {
            ...markdown,
            markdownContent,
            components: markdownHeaders.components,
          };
        });
      return allMarkdowns
        .filter((page) => page.components.includes(name))
        .map((page) => ({
          filePath: page.filename, // pathname of the markdown file
          demoPageTitle: pathToSystemTitle({
            ...page,
            title: getTitle(page.markdownContent),
          }),
          demoPathname: fixPathname(page.pathname),
        }));
    },
  };
}

interface PageMarkdown {
  pathname: string;
  title: string;
  components: readonly string[];
}

function pathToSystemTitle(page: PageMarkdown) {
  const defaultTitle = page.title;
  if (page.pathname.startsWith('/material')) {
    return `${defaultTitle} (Material UI)`;
  }
  if (page.pathname.startsWith('/system')) {
    return `${defaultTitle} (MUI System)`;
  }
  return defaultTitle;
}
