import { CODE_VARIANTS } from '../constants/constants';
import type { SandboxConfig } from '../DemoContext/DemoContext';
import type { DemoData } from './types';

const packagesWithBundledTypes = [
  'date-fns',
  '@emotion/react',
  '@emotion/styled',
  'dayjs',
  'clsx',
  '@react-spring/web',
];
const muiNpmOrgs = ['@mui', '@base-ui', '@pigment-css', '@toolpad'];

/**
 * WARNING: Always uses `latest` typings.
 *
 * Adds dependencies to @types packages only for packages that are not listed
 * in packagesWithBundledTypes
 *
 * @param deps - list of dependency as `name => version`
 */
function addTypeDeps(deps: Record<string, string>, devDeps: Record<string, string>): void {
  const packagesWithDTPackage = Object.keys(deps)
    .filter((name) => !packagesWithBundledTypes.includes(name))
    // All the MUI packages come with bundled types
    .filter((name) => !muiNpmOrgs.some((org) => name.startsWith(org)));

  packagesWithDTPackage.forEach((name) => {
    let resolvedName = name;
    // scoped package?
    if (name.startsWith('@')) {
      // https://github.com/DefinitelyTyped/DefinitelyTyped#what-about-scoped-packages
      resolvedName = name.slice(1).replace('/', '__');
    }

    devDeps[`@types/${resolvedName}`] = 'latest';
  });
}

type Demo = Pick<DemoData, 'productId' | 'raw' | 'codeVariant' | 'relativeModules'>;

export function SandboxDependencies(
  demo: Demo,
  options: { commitRef?: string; devDeps?: Record<string, string>; csbConfig?: SandboxConfig } = {},
) {
  const { commitRef, devDeps = {}, csbConfig } = options;

  /**
   * @param packageName - The name of a package living inside this repository.
   * @return string - A valid version for a dependency entry in a package.json
   */
  function getMuiPackageVersion(packageName: string): string {
    if (
      commitRef === undefined ||
      process.env.SOURCE_CODE_REPO !== 'https://github.com/mui/material-ui'
    ) {
      // #npm-tag-reference
      return 'next';
    }
    return `https://pkg.pr.new/mui/material-ui/@mui/${packageName}@${commitRef}`;
  }

  function extractDependencies() {
    function includePeerDependencies(
      deps: Record<string, string>,
      versions: Record<string, string>,
    ): Record<string, string> {
      let newDeps: Record<string, string> = {
        ...deps,
        'react-dom': versions['react-dom'],
        react: versions.react,
        '@emotion/react': versions['@emotion/react'],
        '@emotion/styled': versions['@emotion/styled'],
      };

      if (newDeps['@mui/lab'] || newDeps['@mui/icons-material']) {
        newDeps['@mui/material'] = versions['@mui/material'];
      }

      if (newDeps['@mui/x-data-grid']) {
        newDeps['@mui/material'] = versions['@mui/material'];
      }

      // Allow product-specific peer dependencies via context config
      if (csbConfig?.includePeerDependencies) {
        newDeps = csbConfig.includePeerDependencies(newDeps, {
          versions,
        });
      }

      return newDeps;
    }
    let deps: Record<string, string> = {};
    let versions: Record<string, string> = {
      react: 'latest',
      'react-dom': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      '@mui/material': getMuiPackageVersion('material'),
      '@mui/icons-material': getMuiPackageVersion('icons-material'),
      '@mui/lab': getMuiPackageVersion('lab'),
      '@mui/styled-engine': getMuiPackageVersion('styled-engine'),
      '@mui/system': getMuiPackageVersion('system'),
      '@mui/private-theming': getMuiPackageVersion('theming'),
      '@mui/private-classnames': getMuiPackageVersion('classnames'),
      '@mui/utils': getMuiPackageVersion('utils'),
      '@mui/material-nextjs': getMuiPackageVersion('material-nextjs'),
    };

    // Allow product-specific version overrides via context config
    if (csbConfig?.getVersions) {
      versions = csbConfig.getVersions(versions, { muiCommitRef: commitRef });
    }

    const re = /^import\s'([^']+)'|import\s[\s\S]*?\sfrom\s+'([^']+)/gm;
    const extractImportedDependencies = (raw: string) => {
      let m: RegExpExecArray | null = null;
      // eslint-disable-next-line no-cond-assign
      while ((m = re.exec(raw))) {
        const fullName = m[2] ?? m[1];
        // handle scope names
        const name =
          fullName.charAt(0) === '@' ? fullName.split('/', 2).join('/') : fullName.split('/', 1)[0];

        if (!deps[name] && !name.startsWith('.')) {
          deps[name] = versions[name] ?? 'latest';
        }

        if (csbConfig?.postProcessImport) {
          const resolvedDep = csbConfig.postProcessImport(fullName);
          if (resolvedDep) {
            deps = { ...deps, ...resolvedDep };
          }
        }
      }
    };

    extractImportedDependencies(demo.raw);
    demo.relativeModules?.forEach(({ raw }) => extractImportedDependencies(raw));

    deps = includePeerDependencies(deps, versions);

    return deps;
  }

  const dependencies = extractDependencies();

  if (csbConfig?.fallbackDependency && !dependencies[csbConfig.fallbackDependency.name]) {
    dependencies[csbConfig.fallbackDependency.name] = csbConfig.fallbackDependency.version;
  }

  const devDependencies: Record<string, string> = { ...devDeps };

  if (demo.codeVariant === CODE_VARIANTS.TS) {
    addTypeDeps(dependencies, devDependencies);
    dependencies.typescript = 'latest';
  }

  return { dependencies, devDependencies };
}
