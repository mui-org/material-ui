import path from 'path';
import { LANGUAGES } from '@mui/internal-core-docs/constants';
import type { ProjectSettings } from '@mui/internal-api-docs-builder';
import { findApiPages } from '@mui/internal-api-docs-builder';
import generateUtilityClass, { isGlobalState } from '@mui/utils/generateUtilityClass';
import { getSystemComponentInfo } from './getSystemComponentInfo';

export const projectSettings: ProjectSettings = {
  output: {
    apiManifestPath: path.join(process.cwd(), 'docs/data/system/pagesApi.js'),
  },
  typeScriptProjects: [
    {
      name: 'system',
      rootPath: path.join(process.cwd(), 'packages/mui-system'),
      entryPointPath: 'src/index.ts',
    },
  ],
  getApiPages: () => findApiPages('docs/pages/system/api'),
  getComponentInfo: getSystemComponentInfo,
  translationLanguages: LANGUAGES,
  skipComponent(filename) {
    return (
      filename.match(
        /(ThemeProvider|CssVarsProvider|DefaultPropsProvider|GlobalStyles|InitColorSchemeScript)/,
      ) !== null
    );
  },
  translationPagesDirectory: 'docs/translations/api-docs',
  generateClassName: generateUtilityClass,
  isGlobalClassName: isGlobalState,
};
