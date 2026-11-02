import { describe, it, expect } from 'vitest';
import * as StackBlitz from './StackBlitz';

const testCase = `import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons() {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </Stack>
  );
}
`;

describe('StackBlitz', () => {
  it('generate the correct JavaScript result', () => {
    const { openSandbox, ...result } = StackBlitz.createReactApp({
      title: 'BasicButtons Material Demo',
      githubLocation:
        'https://github.com/mui/material-ui/blob/v5.7.0/docs/data/material/components/buttons/BasicButtons.js',
      codeVariant: 'JS',
      language: 'en',
      raw: testCase,
    });
    expect(result).to.deep.equal({
      title: 'BasicButtons Material Demo',
      description:
        'https://github.com/mui/material-ui/blob/v5.7.0/docs/data/material/components/buttons/BasicButtons.js',
      files: {
        'index.html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>BasicButtons Material Demo</title>
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
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/index.jsx"></script>
  </body>
</html>`,
        'package.json': `{
  "private": true,
  "description": "https://github.com/mui/material-ui/blob/v5.7.0/docs/data/material/components/buttons/BasicButtons.js",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "latest",
    "@mui/material": "next",
    "react-dom": "latest",
    "@emotion/react": "latest",
    "@emotion/styled": "latest"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^5",
    "vite": "^7"
  }
}`,
        'src/Demo.jsx': `import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons() {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </Stack>
  );
}
`,
        'src/index.jsx': `import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import Demo from './Demo';

ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <Demo />
    </StyledEngineProvider>
  </React.StrictMode>
);`,
        'vite.config.js': `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: { 'process.env': {} },
});`,
      },
      dependencies: {
        react: 'latest',
        // #npm-tag-reference
        '@mui/material': 'next',
        'react-dom': 'latest',
        '@emotion/react': 'latest',
        '@emotion/styled': 'latest',
      },
      devDependencies: {
        '@vitejs/plugin-react': '^5',
        vite: '^7',
      },
    });
  });

  it('generate the correct TypeScript result', () => {
    const { openSandbox, ...result } = StackBlitz.createReactApp({
      title: 'BasicButtons Material Demo',
      githubLocation:
        'https://github.com/mui/material-ui/blob/v5.7.0/docs/data/material/components/buttons/BasicButtons.tsx',
      codeVariant: 'TS',
      language: 'en',
      raw: testCase,
    });
    expect(result).to.deep.equal({
      title: 'BasicButtons Material Demo',
      description:
        'https://github.com/mui/material-ui/blob/v5.7.0/docs/data/material/components/buttons/BasicButtons.tsx',
      files: {
        'index.html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>BasicButtons Material Demo</title>
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
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/index.tsx"></script>
  </body>
</html>`,
        'package.json': `{
  "private": true,
  "description": "https://github.com/mui/material-ui/blob/v5.7.0/docs/data/material/components/buttons/BasicButtons.tsx",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "latest",
    "@mui/material": "next",
    "react-dom": "latest",
    "@emotion/react": "latest",
    "@emotion/styled": "latest",
    "typescript": "latest"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^5",
    "vite": "^7",
    "@types/react": "latest",
    "@types/react-dom": "latest"
  }
}`,
        'src/Demo.tsx': `import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons() {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </Stack>
  );
}
`,
        'src/index.tsx': `import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import Demo from './Demo';

ReactDOM.createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <Demo />
    </StyledEngineProvider>
  </React.StrictMode>
);`,

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
        'vite.config.ts': `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: { 'process.env': {} },
});`,
      },
      dependencies: {
        react: 'latest',
        // #npm-tag-reference
        '@mui/material': 'next',
        'react-dom': 'latest',
        '@emotion/react': 'latest',
        '@emotion/styled': 'latest',
        typescript: 'latest',
      },
      devDependencies: {
        '@types/react': 'latest',
        '@types/react-dom': 'latest',
        '@vitejs/plugin-react': '^5',
        vite: '^7',
      },
    });
  });

  it('should generate the correct stylesheet font link in index.html for Material Two Tones icons', () => {
    const raw = `import * as React from 'react';
    import Icon from '@mui/material/Icon';

    export default function TwoToneIcons() {
      return <Icon baseClassName="material-icons-two-tone">add_circle</Icon>;
    }
    `;

    const result = StackBlitz.createReactApp({
      raw,
      codeVariant: 'JS',
    });

    expect(result.files['index.html']).to.contain(
      'https://fonts.googleapis.com/icon?family=Material+Icons+Two+Tone',
    );
  });
});
