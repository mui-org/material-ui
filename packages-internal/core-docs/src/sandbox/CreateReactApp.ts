import type { SandboxConfig } from '../DemoContext/DemoContext';
import type { DemoData } from './types';

export const getHtml = ({
  title,
  language,
  raw,
  main,
}: {
  title: string;
  language: string;
  raw?: string;
  main?: string;
}) => {
  return `<!DOCTYPE html>
<html lang="${language}">
  <head>
    <meta charset="utf-8" />
    <title>${title}</title>
    <meta name="viewport" content="initial-scale=1, width=device-width" />
    <!-- Fonts to support Material Design -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
    />
    <!-- Icons to support Material Design -->
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons${
        raw?.includes('material-icons-two-tone') ? '+Two+Tone' : ''
      }"
    />
  </head>
  <body>
    <div id="root"></div>
    ${main ? `<script type="module" src="${main}"></script>` : ''}
  </body>
</html>`;
};

export function getRootIndex(demoData: DemoData, csbConfig?: SandboxConfig) {
  // If context provides a custom getRootIndex, use it
  if (csbConfig?.getRootIndex) {
    return csbConfig.getRootIndex(demoData.codeVariant);
  }

  // document.querySelector returns 'Element | null' but createRoot expects 'Element | DocumentFragment'.
  const type = demoData.codeVariant === 'TS' ? '!' : '';

  return `import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import Demo from './Demo';

ReactDOM.createRoot(document.querySelector("#root")${type}).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <Demo />
    </StyledEngineProvider>
  </React.StrictMode>
);`;
}

export const getTsconfig = () => `{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react"
  },
  "include": [
    "src"
  ]
}
`;
