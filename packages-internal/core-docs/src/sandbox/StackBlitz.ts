import { addHiddenInput } from '../utils/addHiddenInput';
import type { SandboxConfig } from '../DemoContext/DemoContext';
import { SandboxDependencies } from './Dependencies';
import { flattenRelativeImports } from './FlattenRelativeImports';
import * as CRA from './CreateReactApp';
import type { CodeVariant, DemoData } from './types';

function getFileExtension(codeVariant: 'TS' | 'JS') {
  if (codeVariant === 'TS') {
    return 'tsx';
  }
  if (codeVariant === 'JS') {
    return 'jsx';
  }
  throw new Error(`Unsupported codeVariant: ${codeVariant}`);
}

function ensureExtension(file: string, extension: string): string {
  return file.endsWith(`.${extension}`) ? file : `${file}.${extension}`;
}

const VITE_DEV_DEPENDENCIES = {
  // Pinned to major versions instead of `latest` to work around
  // https://github.com/stackblitz/webcontainer-core/issues/2104
  '@vitejs/plugin-react': '^5',
  vite: '^7',
};

function openStackBlitz({
  title,
  description,
  files,
  initialFile,
}: {
  title: string;
  description: string;
  files: Record<string, string>;
  initialFile: string;
}) {
  // ref: https://developer.stackblitz.com/docs/platform/post-api/
  const form = document.createElement('form');
  form.method = 'POST';
  form.target = '_blank';
  form.action = `https://stackblitz.com/run?file=${initialFile}`;
  addHiddenInput(form, 'project[template]', 'node');
  addHiddenInput(form, 'project[title]', title);
  addHiddenInput(form, 'project[description]', `# ${title}\n${description}`);
  Object.keys(files).forEach((key) => {
    const value = files[key];
    addHiddenInput(form, `project[files][${key}]`, value);
  });
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}

/**
 * Create a Vite project config for StackBlitz
 */
function createViteFiles(
  demoData: DemoData,
  dependencies: Record<string, string>,
  devDependencies: Record<string, string>,
  description: string,
): Record<string, string> {
  const ext = getFileExtension(demoData.codeVariant);
  return {
    [`vite.config.${demoData.codeVariant === 'TS' ? 'ts' : 'js'}`]: `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: { 'process.env': {} },
});`,
    'index.html': CRA.getHtml({ ...demoData, main: `/src/index.${ext}` }),
    'package.json': JSON.stringify(
      {
        private: true,
        description,
        type: 'module',
        scripts: {
          dev: 'vite',
          build: 'vite build',
          preview: 'vite preview',
        },
        dependencies,
        devDependencies,
      },
      null,
      2,
    ),
    ...(demoData.codeVariant === 'TS' && {
      'tsconfig.json': `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}`,
      'tsconfig.node.json': `{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}`,
    }),
  };
}

interface MaterialTemplate {
  title: string;
  files: Record<string, string>;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  replaceContent(updater: (content: string, filePath: string) => string): MaterialTemplate;
  openStackBlitz: (initialFile?: string) => void;
}

/**
 * Create a Material Template for StackBlitz using the SDK and Vite.
 */
function createMaterialTemplate(templateData: {
  title: string;
  files: Record<string, string>;
  githubLocation: string;
  codeVariant: CodeVariant;
}): MaterialTemplate {
  const ext = getFileExtension(templateData.codeVariant);
  const { title, githubLocation: description } = templateData;
  const raw = Object.entries(templateData.files ?? {}).reduce(
    (prev, curr) => `${prev}\n${curr}`,
    '',
  );

  const demoData: DemoData = { ...templateData, raw, language: 'en' };

  // Get dependencies
  const { dependencies, devDependencies } = SandboxDependencies(demoData, {
    commitRef: process.env.PULL_REQUEST_ID ? process.env.COMMIT_REF : undefined,
    devDeps: VITE_DEV_DEPENDENCIES,
  });

  // Create base Vite files with dependencies
  const viteFiles = createViteFiles(demoData, dependencies, devDependencies, description);

  // Restructure template files to be under src/
  const templateSourceFiles = templateData.files
    ? Object.fromEntries(
        Object.entries(templateData.files).map(([key, value]) => [`src/${key}`, value]),
      )
    : {};

  // Create a proper React 18 index file for Vite
  const indexContent = `
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')${templateData.codeVariant === 'TS' ? '!' : ''}).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </React.StrictMode>
);`;

  // Combine all files
  const files = {
    ...viteFiles,
    [`src/index.${ext}`]: indexContent,
    ...templateSourceFiles,
  };

  return {
    title,
    files,
    dependencies,
    devDependencies,
    replaceContent(updater: (content: string, filePath: string) => string) {
      Object.keys(files).forEach((filePath) => {
        files[filePath] = updater(files[filePath], filePath);
      });
      return this;
    },
    openStackBlitz: (initialFile: string = 'src/App') => {
      openStackBlitz({
        title,
        description,
        files,
        initialFile: ensureExtension(initialFile, ext),
      });
    },
  };
}

/**
 * Create a React App for StackBlitz using the SDK and Vite.
 * This maintains similar structure to the original createReactApp but uses Vite.
 */
function createReactApp(demoData: DemoData, csbConfig?: SandboxConfig) {
  const ext = getFileExtension(demoData.codeVariant);
  const { title, githubLocation: description } = demoData;

  // Get dependencies
  const { dependencies, devDependencies } = SandboxDependencies(demoData, {
    commitRef: process.env.PULL_REQUEST_ID ? process.env.COMMIT_REF : undefined,
    devDeps: VITE_DEV_DEPENDENCIES,
    csbConfig,
  });

  const viteFiles = createViteFiles(demoData, dependencies, devDependencies, description);

  const demoFiles: Record<string, string> = {
    [`src/Demo.${ext}`]: flattenRelativeImports(demoData.raw),
  };

  // Add relative modules if any
  const relativeModuleFiles = demoData.relativeModules
    ? demoData.relativeModules.reduce(
        (acc, curr) => ({
          ...acc,
          // Add files to src directory but preserve original names
          [`src/${curr.module.replace(/^.*[\\/]/g, '')}`]: flattenRelativeImports(curr.raw),
        }),
        {},
      )
    : {};

  // Combine all files
  const files = {
    ...viteFiles,
    [`src/index.${ext}`]: CRA.getRootIndex(demoData, csbConfig),
    ...demoFiles,
    ...relativeModuleFiles,
  };

  return {
    title,
    description,
    files,
    dependencies,
    devDependencies,
    openSandbox: (initialFile = 'src/Demo') => {
      openStackBlitz({
        title,
        description,
        files,
        initialFile: ensureExtension(initialFile, ext),
      });
    },
  };
}

export { createReactApp, createMaterialTemplate };
