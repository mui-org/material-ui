import type { SandboxConfig } from '../DemoContext/DemoContext';
import type { DemoData } from './types';
import { SandboxDependencies } from './Dependencies';
import { flattenRelativeImports } from './FlattenRelativeImports';

function getFileExtension(codeVariant: 'TS' | 'JS') {
  if (codeVariant === 'TS') {
    return 'tsx';
  }
  if (codeVariant === 'JS') {
    return 'jsx';
  }
  throw new Error(`Unsupported codeVariant: ${codeVariant}`);
}

export function createMuiChat(demoData: DemoData, csbConfig?: SandboxConfig) {
  const { title, githubLocation: description } = demoData;
  const ext = getFileExtension(demoData.codeVariant);

  // Get dependencies like StackBlitz
  const { dependencies } = SandboxDependencies(demoData, {
    commitRef: process.env.PULL_REQUEST_ID ? process.env.COMMIT_REF : undefined,
    csbConfig,
  });

  return {
    title,
    description,
    dependencies,
    openSandbox: async () => {
      const baseUrl = process.env.MUI_CHAT_API_BASE_URL;

      if (!baseUrl) {
        throw new Error(
          'Could not find the MUI Chat URL, please open a new issue on https://github.com/mui/material-ui/issues/new',
        );
      }

      // Use primaryPackage from context config, or fall back to legacy productId mapping
      let primaryPackage = csbConfig?.primaryPackage;
      if (!primaryPackage) {
        const productToPackage: Record<string, string> = {
          'material-ui': '@mui/material',
          'x-data-grid': '@mui/x-data-grid',
          'x-date-pickers': '@mui/x-date-pickers',
          'x-tree-view': '@mui/x-tree-view',
          'x-charts': '@mui/x-charts',
        };
        primaryPackage =
          (demoData.productId && productToPackage[demoData.productId]) || '@mui/material';
      }

      // Process files from demoData similar to StackBlitz
      const files = [
        {
          path: `${demoData.title}.${ext}`,
          content: flattenRelativeImports(demoData.raw),
          isEntry: true,
        },
        // Add relative modules if any
        ...(demoData.relativeModules || []).map((module) => ({
          path: module.module.replace(/^.*[\\/]/g, ''),
          content: flattenRelativeImports(module.raw),
        })),
      ];

      try {
        const response = await fetch(`${baseUrl}/v1/public/chat/open`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: demoData.title,
            description: document.title,
            files,
            type: 'mui-docs',
            package: {
              name: primaryPackage,
              version: dependencies[primaryPackage] || 'latest',
            },
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to open in MUI Chat');
        }

        const data = await response.json();
        window.open(data.nextUrl, '_blank');
      } catch (error) {
        console.error('Error opening MUI Chat:', error);
        throw error;
      }
    },
  };
}
