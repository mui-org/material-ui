import fs from 'fs';
import path from 'path';
import { kebabCase } from 'es-toolkit/string';
import { getHeaders, getTitle } from '@mui/internal-markdown';
import type { ComponentInfo } from '@mui/internal-api-docs-builder';
import {
  extractPackageFile,
  fixPathname,
  getMuiName,
  getSystemComponents,
  parseFile,
  findPagesMarkdown,
} from '@mui/internal-api-docs-builder';

export function getMaterialUiComponentInfo(filename: string): ComponentInfo {
  const { name } = extractPackageFile(filename);
  let srcInfo: null | ReturnType<ComponentInfo['readFile']> = null;
  if (!name) {
    throw new Error(`Could not find the component name from: ${filename}`);
  }
  return {
    filename,
    name,
    muiName: getMuiName(name),
    apiPathname: `/material-ui/api/${kebabCase(name)}/`,
    apiPagesDirectory: path.join(process.cwd(), `docs/pages/material-ui/api`),
    isSystemComponent: getSystemComponents().includes(name),
    readFile: () => {
      srcInfo = parseFile(filename);
      return srcInfo;
    },
    getInheritance: (inheritedComponent = srcInfo?.inheritedComponent) => {
      if (!inheritedComponent) {
        return null;
      }
      // `inheritedComponent` node is coming from test files.
      // `inheritedComponent` must include `Unstyled` suffix for parser to recognise that the component inherits Base UI component
      // e.g., Joy Menu inherits Base UI Popper, and its test file uses the name `PopperUnstyled` so that we can recognise here that
      // Joy Menu is inheriting a base component. In terms of documentation, we should no longer use the name `PopperUnstyled`, and hence
      // we remove the suffix here.
      return {
        name: inheritedComponent.replace(/unstyled/i, ''),
        apiPathname:
          inheritedComponent === 'Transition'
            ? 'https://reactcommunity.org/react-transition-group/transition/#Transition-props'
            : `/${
                inheritedComponent.match(/unstyled/i) ? 'base-ui' : 'material-ui'
              }/api/${kebabCase(inheritedComponent.replace(/unstyled/i, ''))}/`,
      };
    },
    getDemos: () => {
      const allMarkdowns = findPagesMarkdown().map((markdown) => {
        const markdownContent = fs.readFileSync(markdown.filename, 'utf8');
        const markdownHeaders = getHeaders(markdownContent);

        return {
          ...markdown,
          markdownContent,
          components: markdownHeaders.components,
        };
      });
      return allMarkdowns
        .filter((page) => page.pathname.startsWith('/material') && page.components.includes(name))
        .map((page) => ({
          filePath: page.filename, // pathname of the markdown file
          demoPageTitle: getTitle(page.markdownContent),
          demoPathname: fixPathname(page.pathname),
        }));
    },
  };
}
