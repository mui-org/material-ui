import path from 'path';
import { LANGUAGES } from '@mui/internal-core-docs/constants';
import type { ProjectSettings } from '@mui/internal-api-docs-builder';
import { findApiPages } from '@mui/internal-api-docs-builder';
import generateUtilityClass, { isGlobalState } from '@mui/utils/generateUtilityClass';
import { getMaterialUiComponentInfo } from './getMaterialUiComponentInfo';

const generateClassName = (componentName: string, slot: string, globalStatePrefix = 'Mui') => {
  if (componentName === 'MuiSwipeableDrawer') {
    // SwipeableDrawer uses Drawer classes without modifying them
    return generateUtilityClass('MuiDrawer', slot, globalStatePrefix);
  }

  return generateUtilityClass(componentName, slot, globalStatePrefix);
};

export const projectSettings: ProjectSettings = {
  output: {
    apiManifestPath: path.join(process.cwd(), 'docs/data/material/pagesApi.js'),
  },
  typeScriptProjects: [
    {
      name: 'material',
      rootPath: path.join(process.cwd(), 'packages/mui-material'),
      entryPointPath: [
        'src/index.d.ts',
        'src/PigmentStack/PigmentStack.tsx',
        'src/PigmentContainer/PigmentContainer.tsx',
        'src/PigmentGrid/PigmentGrid.tsx',
      ],
    },
    {
      name: 'lab',
      rootPath: path.join(process.cwd(), 'packages/mui-lab'),
      entryPointPath: 'src/index.ts',
    },
  ],
  getApiPages: () => findApiPages('docs/pages/material-ui/api'),
  getComponentInfo: getMaterialUiComponentInfo,
  translationLanguages: LANGUAGES,
  skipComponent(filename: string) {
    return (
      filename.match(/(ThemeProvider|CssVarsProvider|DefaultPropsProvider|RovingToggleButton)/) !==
      null
    );
  },
  translationPagesDirectory: 'docs/translations/api-docs',
  generateClassName,
  isGlobalClassName: isGlobalState,
  // #host-reference
  baseApiUrl: 'https://next.mui.com',
  pagesManifestPath: path.join(process.cwd(), 'docs/data/material/pages.ts'),
  nonComponentFolders: [
    'material/getting-started',
    'material/customization',
    'material/experimental-api',
    'material/guides',
    'material/integrations',
    'material/migration',
  ],
};
