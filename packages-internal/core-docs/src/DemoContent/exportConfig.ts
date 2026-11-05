import type * as React from 'react';
import { exportVariant, exportVariantAsCra } from '@mui/internal-docs-infra/useDemo';
import type { ExportConfig } from '@mui/internal-docs-infra/useDemo';
import type { VariantCode } from '@mui/internal-docs-infra/CodeHighlighter/types';
import type { SandboxConfig } from '../DemoContext';

// ---------------------------------------------------------------------------
// Sandbox export configuration consumed by `useDemo` so StackBlitz /
// CodeSandbox previews resolve MUI packages and peer dependencies correctly.
// ---------------------------------------------------------------------------

const PACKAGES_WITH_BUNDLED_TYPES = [
  'date-fns',
  '@emotion/react',
  '@emotion/styled',
  'dayjs',
  'clsx',
  '@react-spring/web',
];
const MUI_NPM_ORGS = ['@mui', '@base-ui', '@pigment-css', '@toolpad'];

function isMuiPackage(name: string): boolean {
  return MUI_NPM_ORGS.some((org) => name === org || name.startsWith(`${org}/`));
}

function getTypesPackageName(name: string): string {
  // https://github.com/DefinitelyTyped/DefinitelyTyped#what-about-scoped-packages
  const resolved = name.startsWith('@') ? name.slice(1).replace('/', '__') : name;
  return `@types/${resolved}`;
}

/**
 * Build the MUI version map, mirroring `getMuiPackageVersion` in
 * docs/src/modules/sandbox/Dependencies.ts (including pkg.pr.new pinning when
 * a commit ref is available for material-ui PR previews).
 */
function buildMuiVersions(commitRef?: string): Record<string, string> {
  const muiPackageNames = [
    'material',
    'icons-material',
    'lab',
    'styled-engine',
    'system',
    'theming',
    'classnames',
    'base',
    'utils',
    'material-nextjs',
    'joy',
  ];

  const useCommitRef =
    commitRef !== undefined &&
    process.env.SOURCE_CODE_REPO === 'https://github.com/mui/material-ui';

  const versions: Record<string, string> = {};
  for (const shortName of muiPackageNames) {
    let fullName = `@mui/${shortName}`;
    if (shortName === 'theming') {
      fullName = '@mui/private-theming';
    } else if (shortName === 'classnames') {
      fullName = '@mui/private-classnames';
    }

    if (useCommitRef) {
      versions[fullName] = `https://pkg.pr.new/mui/material-ui/@mui/${shortName}@${commitRef}`;
    } else {
      // #npm-tag-reference
      // Pin to `latest` so exported demos resolve the same package versions
      // that the rendered docs page is built against. Using `next` would ship
      // prerelease canaries to CodeSandbox/StackBlitz and the demo could
      // drift from — or fail to compile against — what the user is viewing.
      versions[fullName] = 'latest';
    }
  }
  return versions;
}

interface SandboxResolvers {
  versions: Record<string, string>;
  resolveDependencies: NonNullable<ExportConfig['resolveDependencies']>;
}

/**
 * Build dependency resolvers for `useDemo`'s `ExportConfig`. The returned
 * `resolveDependencies` is called per-imported-package by `exportVariant`; it
 * injects MUI peer deps and `@types/*` packages for TypeScript variants.
 *
 * Note: `@types/*` are added to dependencies (rather than devDependencies)
 * because `ExportConfig` has no per-package devDep resolver. This is
 * functionally equivalent for StackBlitz/CodeSandbox install resolution.
 */
function buildSandboxResolvers(options: {
  csbConfig?: SandboxConfig;
  useTypescriptRef: React.RefObject<boolean>;
  commitRef?: string;
}): SandboxResolvers {
  const { csbConfig, useTypescriptRef, commitRef } = options;

  let versions: Record<string, string> = {
    react: 'latest',
    'react-dom': 'latest',
    '@emotion/react': 'latest',
    '@emotion/styled': 'latest',
    ...buildMuiVersions(commitRef),
  };

  if (csbConfig?.getVersions) {
    versions = csbConfig.getVersions(versions, { muiCommitRef: commitRef });
  }

  const resolveDependencies: NonNullable<ExportConfig['resolveDependencies']> = (packageName) => {
    const result: Record<string, string> = {};
    result[packageName] = versions[packageName] ?? 'latest';

    // Peer dep auto-injection.
    if (
      packageName === '@mui/lab' ||
      packageName === '@mui/icons-material' ||
      packageName === '@mui/x-data-grid'
    ) {
      result['@mui/material'] = versions['@mui/material'] ?? 'latest';
    }

    // TS variant: pull in `@types/*` for non-bundled, non-MUI deps.
    if (
      useTypescriptRef.current &&
      !PACKAGES_WITH_BUNDLED_TYPES.includes(packageName) &&
      !isMuiPackage(packageName)
    ) {
      result[getTypesPackageName(packageName)] = 'latest';
    }

    if (csbConfig?.postProcessImport) {
      const extra = csbConfig.postProcessImport(packageName);
      if (extra) {
        Object.assign(result, extra);
      }
    }

    return result;
  };

  return { versions, resolveDependencies };
}

/**
 * Build a `rootIndexTemplate` from the product-specific `getRootIndex`.
 * Substitutes the dynamic import string from `exportVariant` for the
 * placeholder `import Demo from './Demo'` line in the template.
 */
function buildRootIndexTemplate(
  csbConfig: SandboxConfig | undefined,
): ExportConfig['rootIndexTemplate'] | undefined {
  if (!csbConfig?.getRootIndex) {
    return undefined;
  }
  const { getRootIndex } = csbConfig;
  return ({ importString, useTypescript }) => {
    const codeVariant = useTypescript ? 'TS' : 'JS';
    const template = getRootIndex(codeVariant);
    // Replace the placeholder `import Demo from './Demo';` line with the
    // dynamic entrypoint import emitted by `exportVariant`, then rename the
    // rendered `<Demo />` element to `<App />` (the `exportVariant` default).
    return template
      .replace(/^import\s+Demo\s+from\s+['"]\.\/Demo['"];?\s*$/m, importString)
      .replace(/<Demo\s*\/>/g, '<App />');
  };
}

/**
 * HTML template for exported sandboxes. Injects the Inter + Roboto + Material
 * Icons fonts so sandboxes match the rendered docs page.
 */
const buildHtmlTemplate: ExportConfig['htmlTemplate'] = ({
  language,
  title,
  entrypoint,
  variant,
}) => {
  const raw = typeof variant?.source === 'string' ? variant.source : '';
  const useTwoTone = raw.includes('material-icons-two-tone');
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
      href="https://fonts.googleapis.com/icon?family=Material+Icons${useTwoTone ? '+Two+Tone' : ''}"
    />
  </head>
  <body>
    <div id="root"></div>
    ${entrypoint ? `<script type="module" src="${entrypoint}"></script>` : ''}
  </body>
</html>`;
};

/**
 * The exporters derive the sandbox directory from the variant's URL, which
 * `createDemo` rewrites to a hosted Git URL — leaving the demo nested under
 * `src/mui/material-ui/tree/<ref>/docs/…`. Drop the URL and name the entry
 * `Demo.<ext>` so exported projects stay flat, as the published sandboxes are.
 */
function flattenVariantForExport(variant: VariantCode, useTypescript?: boolean): VariantCode {
  return { ...variant, url: undefined, fileName: `Demo.${useTypescript ? 'tsx' : 'jsx'}` };
}

/**
 * Build the full `ExportConfig` consumed by `useDemo`. Combines the resolver,
 * template, and dependency helpers above with the product-specific
 * `csbConfig` (theme injection, fallback dependency, etc.) so that demo
 * exports for both StackBlitz and CodeSandbox produce a runnable sandbox.
 */
export function buildExportConfig(options: {
  csbConfig: SandboxConfig | undefined;
  useTypescriptRef: React.RefObject<boolean>;
}): ExportConfig {
  const { csbConfig, useTypescriptRef } = options;
  const commitRef = process.env.PULL_REQUEST_ID ? process.env.COMMIT_REF : undefined;
  const { versions, resolveDependencies } = buildSandboxResolvers({
    csbConfig,
    useTypescriptRef,
    commitRef,
  });
  const config: ExportConfig = {
    versions,
    resolveDependencies,
    htmlTemplate: buildHtmlTemplate,
    exportFunction: (variant, exportOptions) =>
      exportVariant(flattenVariantForExport(variant, exportOptions.useTypescript), exportOptions),
    // Emotion is a peer dep always shipped with MUI demos (see
    // `includePeerDependencies` in docs/src/modules/sandbox/Dependencies.ts).
    // exportVariant only auto-seeds react/react-dom from `versions`, so add
    // emotion explicitly here.
    dependencies: {
      '@emotion/react': versions['@emotion/react'] ?? 'latest',
      '@emotion/styled': versions['@emotion/styled'] ?? 'latest',
    },
  };

  // fallbackDependency: ensure the product's primary package is always
  // present even when the demo doesn't import it directly. Match the version
  // produced by buildSandboxResolvers so we don't override pinning.
  if (csbConfig?.fallbackDependency) {
    const { name } = csbConfig.fallbackDependency;
    config.dependencies = {
      ...config.dependencies,
      [name]: versions[name] ?? csbConfig.fallbackDependency.version,
    };
  }

  const rootIndexTemplate = buildRootIndexTemplate(csbConfig);
  if (rootIndexTemplate) {
    config.rootIndexTemplate = rootIndexTemplate;
  }

  return config;
}

/**
 * Per-product CodeSandbox tsconfig override. CRA needs a node-style tsconfig
 * (not Vite's `moduleResolution: 'bundler'`) — mirror docs/src/modules/sandbox/
 * CreateReactApp.ts `getTsconfig`.
 */
export const codeSandboxTsconfigOverride = {
  exportFunction: (variant: VariantCode, exportOptions: ExportConfig) =>
    exportVariantAsCra(
      flattenVariantForExport(variant, exportOptions.useTypescript),
      exportOptions,
    ),
  tsconfigOptions: {
    target: 'es5',
    lib: ['dom', 'dom.iterable', 'esnext'],
    allowJs: true,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    forceConsistentCasingInFileNames: true,
    module: 'esnext',
    moduleResolution: 'node',
    jsx: 'react-jsx',
    // Drop Vite-only options merged in by exportVariant defaults.
    allowImportingTsExtensions: undefined,
    useDefineForClassFields: undefined,
    noUnusedLocals: undefined,
    noUnusedParameters: undefined,
  },
} as const;
